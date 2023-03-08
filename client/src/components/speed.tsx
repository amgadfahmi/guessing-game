import { useState } from 'react';

interface SpeedProps {
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

const Speed = ({ onSpeedChange, disabled }: SpeedProps) => {
  const [speed, setSpeed] = useState<number>(1);
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value));
    onSpeedChange(parseInt(e.target.value));
  };

  return (
    <div className="bg-zinc-900 py-3 pl-3 mr-3 rounded-lg shadow-md">
      <input
        type="range"
        min="1"
        max="5"
        defaultValue="1"
        className="range range-warning w-11/12"
        step="1"
        onChange={handleSpeedChange}
        disabled={disabled}
      />
      <div className="w-11/12 flex justify-between text-xs px-2">
        <span>1x</span>
        <span>2x</span>
        <span>3x</span>
        <span>4x</span>
        <span>5x</span>
      </div>
    </div>
  );
};

export default Speed;
