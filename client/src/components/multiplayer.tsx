import { useEffect, useState } from 'react';

interface MultiplayerProps {
  onMultiplayerChange: (multiplayer: number) => void;
}

const Multiplayer = ({ onMultiplayerChange }: MultiplayerProps) => {
  const [multiplayer, setMultiplayer] = useState(0);

  const handleMultiplayerChange = (value: number) => {
    if (multiplayer + value < 0) return;
    setMultiplayer(multiplayer + value);
    onMultiplayerChange(value);
  };

  useEffect(() => {
    onMultiplayerChange(multiplayer);
  }, [multiplayer]);

  return (
    <div className="grid grid-cols-5 gap-1 px-4 py-1">
      <button
        className="col-span-1  bg-zinc-900 rounded-lg flex justify-center items-center"
        onClick={(e) => handleMultiplayerChange(-0.25)}
        aria-label="Remove 0.25 point"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-11 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <label className="col-span-3 h-12 text-xl bg-zinc-900 rounded-lg flex justify-center items-center">
        {multiplayer}
      </label>
      <button
        className="col-span-1 bg-zinc-900 rounded-lg flex justify-center items-center"
        onClick={(e) => handleMultiplayerChange(0.25)}
        aria-label="Add 0.25 point"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-11 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Multiplayer;
