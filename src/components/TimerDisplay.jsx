import React, { useMemo } from 'react';
import { Clock3 } from 'lucide-react';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${secs}`;
};

export default function TimerDisplay({ secondsLeft, totalSeconds, accent, label }) {
  const progress = useMemo(
    () => Math.min(1, (totalSeconds - secondsLeft) / totalSeconds),
    [secondsLeft, totalSeconds]
  );

  const ringStyle = {
    background: `conic-gradient(${accent} ${progress * 100}%, rgba(255,255,255,0.08) ${progress * 100}%)`,
  };

  return (
    <div className="timer-display">
      <div className="timer-ring" style={ringStyle}>
        <div className="timer-inner">
          <p className="text-sm uppercase tracking-[0.12em] text-slate-300">{label}</p>
          <p className="font-mono text-6xl sm:text-7xl font-semibold">{formatTime(secondsLeft)}</p>
          <p className="text-xs text-slate-400">remaining</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 text-slate-300 text-sm">
        <Clock3 size={16} />
        <span>{Math.max(0, Math.ceil(secondsLeft / 60))} minutes left</span>
      </div>
    </div>
  );
}
