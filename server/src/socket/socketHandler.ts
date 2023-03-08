import { logger } from '@config/logger';
import { ChatMessage, Game, GameSpeed, PlayerConfig, Rank, Round } from '@models/index';
import { randomDecimal, randomMultiplayer, randomNumber, roundToDecimal } from '@utils/index';
import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';

let timer = null;

const initialGame = (speed: GameSpeed) => {
  logger.info('initialGame');
  const game = new Game(uuid(), speed, 1);
  return game;
};

const mockCpuPlayer = (number, game) => {
  const player = new PlayerConfig(uuid(), `CPU${number}`);
  game.addPlayer(player);
  return player;
};

const mockCpuConfig = (playerConfig) => {
  playerConfig.points = randomNumber(100, 1000);
  playerConfig.multiplayer = randomDecimal(1, 10);
  return playerConfig;
};

const login = (payload, callback, socket, game: Game) => {
  logger.info('login');
  const { playername } = payload;
  const player = new PlayerConfig(uuid(), playername);
  game.addPlayer(player);
  Array.from(Array(4).keys()).forEach((number) => mockCpuPlayer(number, game));
  createRandomChatMessage(socket);
  callback(game.players);
};

const start = (payload, callback, socket, game: Game) => {
  logger.info('start');
  const { playerId, points, multiplayer, speed } = payload;

  game.speed = speed;
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.points = points;
      player.multiplayer = multiplayer;
    } else mockCpuConfig(player);
  });

  createRound(playerId, game);
  startProgress(game, socket);

  callback(game.players);
};

const createRound = (playerId: string, game: Game) => {
  logger.info('createRound');
  game.players.forEach((player) => {
    const round = new Round(game.currentRound, player.points, player.multiplayer);
    player.addRound(round);
  });
};

const startProgress = (game: Game, socket) => {
  logger.info('startProgress');

  let multiplayer = 0;
  let counter = 1;
  const progressValues = new Array<number>();
  timer = setInterval(() => {
    const value = roundProgress(multiplayer);
    progressValues.push(value);
    multiplayer = value;
    if (counter > 10) {
      clearInterval(timer);
      roundComplete(game, multiplayer, socket);
    }
    socket.emit('progress', progressValues);
    counter++;
  }, 1000 / game.speed);
};

const roundProgress = (min) => {
  return randomMultiplayer(min, min + 1);
};

const roundComplete = (game: Game, result: number, socket) => {
  logger.info('roundComplete', result);
  game.players.forEach((player) => {
    const round = player.rounds.find((round) => round.id === game.currentRound);
    round.roundScore = Math.round(result) === Math.round(round.multiplayer) ? round.multiplayer * round.points : 0;
  });
  game.setRanks(updateRanks(game.players));
  game.currentRound++;
  socket.emit('round-complete', { currentRound: game.currentRound, result, ranks: game.ranks });
};

const updateRanks = (players: PlayerConfig[]) => {
  const ranks = new Array<Rank>();
  players.forEach((player) => {
    let totalScore = 0;
    player.rounds.forEach((round) => {
      totalScore += round.roundScore;
    });
    const rank = new Rank(uuid(), player.id, player.name, roundToDecimal(totalScore, 2));
    ranks.push(rank);
  });
  return ranks.sort((a, b) => b.score - a.score);
};

const chat = (payload, callback, socket: Socket) => {
  logger.info('chat');
  const { playerName, message } = payload;
  const msg = new ChatMessage(uuid(), message, playerName);
  socket.emit('chat', msg);
};

const createRandomChatMessage = (socket: Socket) => {
  setInterval(() => {
    const randomPlayer = randomNumber(1, 5);
    const randomMessage = ['Cool!', 'Nice!', 'Awesome!', 'Great!', 'Amazing!'][randomNumber(0, 4)];
    const msg = new ChatMessage(uuid(), `${randomMessage}`, `CPU${randomPlayer}`);
    socket.emit('chat', msg);
  }, 30000);
};

export { initialGame, login, start, chat };
