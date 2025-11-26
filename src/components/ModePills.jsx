import React from 'react';
import { Coffee, Flame, MoonStar } from 'lucide-react';
import { TIMER_PRESETS } from '../constants/pomodoro';

const MODE_ICONS = {
  focus: Flame,
  shortBreak: Coffee,
  longBreak: MoonStar,
};

export default function ModePills({ activeMode, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(TIMER_PRESETS).map(([mode, preset]) => {
        const Icon = MODE_ICONS[mode];
        const isActive = activeMode === mode;

        return (
          <button
            key={mode}
            onClick={() => onSelect(mode)}
            className={`mode-pill ${isActive ? 'mode-pill--active' : ''}`}
            style={
              isActive
                ? {
                    borderColor: preset.accent,
                    boxShadow: `0 15px 40px ${preset.accent}30`,
                  }
                : undefined
            }
            aria-pressed={isActive}
          >
            <div className="flex items-center gap-2">
              <span className="mode-dot" style={{ background: preset.gradient }} />
              <span className="font-semibold">{preset.label}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Icon size={18} />
              <span>{Math.round(preset.seconds / 60)} min</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
