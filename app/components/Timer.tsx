'use client'

interface TimerProps {
  seconds: number;
}

export default function Timer({ seconds }: TimerProps) {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-mono">
      {formatTime(seconds)}
    </div>
  );
}