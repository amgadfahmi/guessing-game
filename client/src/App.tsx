import { MouseEventHandler, useEffect, useState } from 'react';
import { connect, Socket } from 'socket.io-client';
import Chart from './components/chart';
import Chat from './components/chat';
import CurrentRound from './components/current-round';
import InfoBar from './components/info';
import Login from './components/login';
import Multiplayer from './components/multiplayer';
import Points from './components/points';
import Ranks from './components/ranks';
import Speed from './components/speed';
import { ChatMessage, PlayerConfig, Rank, Round } from './types';

let socket: Socket;

const getSocket = () => {
  if (socket) return socket;
  socket = connect('http://localhost:5000');
  return socket;
};

function App() {
  const [playerId, setPlayerId] = useState<string | undefined>();
  const [players, setPlayers] = useState<PlayerConfig[] | undefined>();
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundProgress, setRoundProgress] = useState<number[]>([]);
  const [displayRoundProgress, setDisplayRoundProgress] =
    useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isRoundInProgress, setIsRoundInProgress] = useState<boolean>(false);
  const [roundPlayerResult, setRoundPlayerResult] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  function selfPlayer(): PlayerConfig | undefined {
    return players?.filter((x) => x.id === playerId)[0];
  }

  function selfPlayerScore(ranks: Rank[]) {
    const selfRank = ranks?.filter(
      (x) => x.playerName === sessionStorage.getItem('playerName')
    )[0];
    setRoundPlayerResult(selfRank?.score);
  }

  function handleLogin(user: string) {
    sessionStorage.setItem('playerName', user);
    socket.emit('login', { playername: user }, (data: PlayerConfig[]) => {
      const selfId = data.filter((x) => x.name === user)[0].id;
      setPlayerId(selfId);
      setPlayers(data);
    });
  }

  function handlePointsChange(points: number) {
    const temp = players?.map((player) => {
      if (player.id === playerId) {
        player.points = points;
      }
      return player;
    });
    setPlayers(temp);
  }

  function handleMultiplayerChange(multiplayer: number) {
    const temp = players?.map((player) => {
      if (player.id === playerId) {
        player.multiplayer = multiplayer;
      }
      return player;
    });
    setPlayers(temp);
  }

  function handleSpeedChange(speed: number) {
    setSpeed(speed);
  }

  function handleStart() {
    const player = selfPlayer();
    setIsStarted(true);
    setIsRoundInProgress(true);
    setDisplayRoundProgress(true);
    setRoundPlayerResult(0);
    socket.emit(
      'start',
      {
        playerId: player?.id,
        points: player?.points,
        multiplayer: player?.multiplayer,
        speed: speed,
      },
      (data: any) => {
        setPlayers(data);
      }
    );
  }

  function handleNextRound() {
    handleStart();
  }

  function handleProgress(data: number[]) {
    setRoundProgress(data);
  }

  function handleRoundComplete(data: any) {
    console.log('round complete ', data);
    setIsRoundInProgress(false);
    selfPlayerScore(data?.ranks);
    setCurrentRound(data?.currentRound);
    setRanks(data?.ranks);
  }

  function handleChat(data: any) {
    setChatMessages((prev) => [...prev, data]);
  }

  function handleSendMessage(message: string) {
    socket.emit('message', { message, playerName: selfPlayer()?.name });
  }

  useEffect(() => {
    const socket = getSocket();

    socket.on('connect', () => {
      console.log('connected');
    });
  }, [socket]);

  useEffect(() => {
    socket.on('progress', (data: any) => {
      handleProgress(data);
    });

    socket.on('round-complete', (data: any) => {
      handleRoundComplete(data);
    });

    socket.on('chat', (data: any) => {
      handleChat(data);
    });
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col w-full h-screen p-4 gap-2">
        <div className="grid grid-cols-3 w-full h-[70%]">
          <div className="col-span-1  w-full">
            {selfPlayer()?.id ? (
              <div className="flex flex-col  gap-y-5">
                <div className="flex flex-row ">
                  <div className="w-1/2  text-center">
                    <label className="text-lg text-gray-300">Points</label>
                    <Points onPointsChange={handlePointsChange} />
                  </div>
                  <div className="w-1/2  text-center">
                    <label className="text-lg text-gray-300">Multiplayer</label>
                    <Multiplayer
                      onMultiplayerChange={handleMultiplayerChange}
                    />
                  </div>
                </div>
                {currentRound === 1 ? (
                  <button
                    className="btn btn-warning mx-9"
                    onClick={handleStart}
                    disabled={isRoundInProgress}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="btn btn-warning mx-9"
                    onClick={handleNextRound}
                  >
                    Next
                  </button>
                )}
                <div className="flex flex-col gap-y-5">
                  <div className="flex flex-row text-orange-600 gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <label className="text-lg text-gray-300">
                      Current Round
                      <span className="font-bold px-2 text-orange-600">
                        [{currentRound}]
                      </span>
                    </label>
                  </div>
                  <CurrentRound
                    round={currentRound}
                    players={players}
                    selfId={playerId}
                  />

                  <div className="flex flex-row text-orange-600 gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                      />
                    </svg>

                    <label className=" text-lg text-gray-300">Speed</label>
                  </div>

                  <Speed
                    onSpeedChange={handleSpeedChange}
                    disabled={isRoundInProgress}
                  />
                </div>
              </div>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </div>
          <div className="col-span-2 gap-2 relative">
            <InfoBar
              score={roundPlayerResult}
              name={selfPlayer()?.name}
              startTimer={isStarted}
            />
            <h1 className="absolute font-bold text-7xl text-orange-700 z-30 left-1/2 bottom-1/2">
              {displayRoundProgress
                ? roundProgress[roundProgress.length - 1]
                : ''}
            </h1>
            <div className="">
              <Chart currentRound={currentRound} data={roundProgress} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 w-full ">
          <div className=" w-full">
            <Ranks selfName={selfPlayer()?.name} ranks={ranks} />
          </div>
          <div className=" w-full">
            <Chat messages={chatMessages} onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
