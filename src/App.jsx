import React from 'react';
import { Clock3, Coffee, Flame, Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import usePomodoro from './hooks/usePomodoro';
import { TIMER_PRESETS } from './constants/pomodoro';
import ModePills from './components/ModePills';
import TimerDisplay from './components/TimerDisplay';
import StatCard from './components/StatCard';

export default function App() {
  const { state, preset, toggleRunning, reset, switchMode, skip } = usePomodoro();
  const totalSeconds = TIMER_PRESETS[state.mode].seconds;

  const upcomingLabel =
    state.mode === 'focus'
      ? (state.completed + 1) % 4 === 0
        ? 'Long break is next'
        : 'Short break is next'
      : 'Focus is next';

  return (
    <div className="app-bg">
      <div className="gradient-blob gradient-blob--pink" />
      <div className="gradient-blob gradient-blob--blue" />

      <main className="relative z-10 container mx-auto px-4 py-10 sm:py-14">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Pomodoro Timer</p>
            <h1 className="text-3xl sm:text-4xl font-semibold">Stay in flow, stay on time.</h1>
          </div>
          <div className="tag">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sessions auto-cycle with your rhythm</span>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="glass-card">
            <div className="glass-body">
              <ModePills activeMode={state.mode} onSelect={switchMode} />

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
                <TimerDisplay
                  secondsLeft={state.secondsLeft}
                  totalSeconds={totalSeconds}
                  accent={preset.accent}
                  label={preset.label}
                />

                <div className="flex flex-col gap-4">
                  <div className="panel">
                    <p className="text-sm text-slate-300 mb-1">Upcoming</p>
                    <p className="text-lg font-semibold">{upcomingLabel}</p>
                  </div>

                  <div className="panel">
                    <p className="text-sm text-slate-300 mb-1">Status</p>
                    <p className="text-lg font-semibold">
                      {state.isRunning ? 'Running' : 'Paused'}
                      <span className="ml-2 text-slate-400 text-sm">
                        {state.isRunning ? 'Stay on task' : 'Ready when you are'}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      className="action-button action-button--primary"
                      onClick={toggleRunning}
                      style={{ background: preset.gradient }}
                    >
                      {state.isRunning ? <Pause size={18} /> : <Play size={18} />}
                      <span>{state.isRunning ? 'Pause' : 'Start'}</span>
                    </button>
                    <button className="action-button" onClick={reset}>
                      <RotateCcw size={18} />
                      <span>Reset</span>
                    </button>
                    <button className="action-button" onClick={skip}>
                      <SkipForward size={18} />
                      <span>Skip</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 h-full">
            <StatCard label="Focus blocks completed" value={state.completed} icon={Flame} />
            <StatCard
              label="Current rhythm"
              value={
                state.mode === 'focus'
                  ? 'Deep work'
                  : state.mode === 'shortBreak'
                  ? 'Micro rest'
                  : 'Recharge'
              }
              icon={Clock3}
            />
            <StatCard
              label="Cycle hint"
              value={upcomingLabel}
              icon={state.mode === 'focus' ? Coffee : Flame}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
