import { useEffect, useState } from 'react';

interface InfoBarProps {
  score?: number;
  name?: string;
  startTimer?: boolean;
}

const InfoBar = ({ score = 0, name, startTimer }: InfoBarProps) => {
  const [time, setTime] = useState({ m: 0, s: 0 });

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  useEffect(() => {
    if (!startTimer) return;
    const timer = setInterval(() => {
      if (time.s === 59) {
        setTime({ m: time.m + 1, s: 0 });
      } else {
        setTime({ m: time.m, s: time.s + 1 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTimer, time.s, time.m]);
  return (
    <>
      <div className="grid grid-cols-3 h-16 gap-5 mb-3">
        <div className="w-full flex justify-center items-center gap-2 bg-zinc-900 rounded-xl shadow-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-9 h-9 text-yellow-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <span className="text-2xl">{score}</span>
        </div>
        <div className="w-full flex justify-center items-center gap-2 bg-zinc-900 rounded-xl shadow-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-9 h-9 text-violet-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-2xl">{name?.toUpperCase()}</span>
        </div>
        <div className="w-full flex justify-center items-center text-center gap-2 bg-zinc-900 rounded-xl shadow-md ">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content h-16">
            <span className="countdown font-mon text-3xl">
              {formatNumber(time.m)}
            </span>
            min
          </div>
          :
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content h-16">
            <span className="countdown font-mon text-3xl">
              {formatNumber(time.s)}
            </span>
            sec
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
