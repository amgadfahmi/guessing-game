enum GameSpeed {
  '1x' = 1,
  '2x' = 2,
  '3x' = 3,
  '4x' = 4,
  '5x' = 5,
}

class Round {
  public id: number;
  public points: number;
  public multiplayer: number;
  public roundScore = 0;

  constructor(id: number, points: number, multiplayer: number) {
    this.id = id;
    this.points = points;
    this.multiplayer = multiplayer;
  }
}

class PlayerConfig {
  public id?: string;
  public name?: string;
  public points?: number;
  public multiplayer?: number;
  public rounds? = new Array<Round>();
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  public addRound = (round: Round) => {
    this.rounds.push(round);
  };
}

class Game {
  public id: string;
  public speed: GameSpeed;
  public players = new Array<PlayerConfig>();
  public currentRound: number;
  public ranks = new Array<Rank>();

  constructor(id: string, speed: GameSpeed, currentRound: number) {
    this.id = id;
    this.speed = speed;
    this.currentRound = currentRound;
  }

  public addPlayer(player: PlayerConfig) {
    this.players.push(player);
  }
  public removePlayer(playerId: string) {
    this.players = this.players.filter((player) => player.id !== playerId);
  }
  public nextRound() {
    this.currentRound++;
  }
  public setRanks(ranks: Rank[]) {
    this.ranks = ranks;
  }
}

class Rank {
  public id: string;
  public playerId: string;
  public playerName: string;
  public score: number;

  constructor(id: string, playerId: string, playerName: string, score: number) {
    this.id = id;
    this.playerId = playerId;
    this.playerName = playerName;
    this.score = score;
  }
}

class ChatMessage {
  public id?: string;
  public message?: string;
  public sender?: string;

  constructor(id: string, message: string, sender: string) {
    this.id = id;
    this.message = message;
    this.sender = sender;
  }
}

export { Game, GameSpeed, Round, PlayerConfig, Rank, ChatMessage };
