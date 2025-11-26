import { useEffect, useMemo, useReducer } from 'react';
import { STORAGE_KEY, TIMER_PRESETS } from '../constants/pomodoro';

const defaultState = {
  mode: 'focus',
  secondsLeft: TIMER_PRESETS.focus.seconds,
  isRunning: false,
  completed: 0,
};

const getInitialState = () => {
  if (typeof window === 'undefined') return defaultState;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;

    const parsed = JSON.parse(saved);
    const mode = TIMER_PRESETS[parsed.mode] ? parsed.mode : defaultState.mode;
    const secondsLeft = Number.isFinite(parsed.secondsLeft)
      ? parsed.secondsLeft
      : TIMER_PRESETS[mode].seconds;
    const completed = Number.isFinite(parsed.completed) ? parsed.completed : 0;

    return {
      ...defaultState,
      ...parsed,
      mode,
      secondsLeft,
      completed,
      isRunning: false, // never auto-start after reload
    };
  } catch {
    return defaultState;
  }
};

const nextModeAfterFocus = (completedCount) =>
  completedCount > 0 && completedCount % 4 === 0 ? 'longBreak' : 'shortBreak';

const advanceState = (state, shouldCount = true) => {
  if (state.mode === 'focus') {
    const nextCompleted = shouldCount ? state.completed + 1 : state.completed;
    const mode = nextModeAfterFocus(nextCompleted);
    return {
      ...state,
      completed: nextCompleted,
      mode,
      secondsLeft: TIMER_PRESETS[mode].seconds,
      isRunning: false,
    };
  }

  return {
    ...state,
    mode: 'focus',
    secondsLeft: TIMER_PRESETS.focus.seconds,
    isRunning: false,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_RUNNING':
      return {
        ...state,
        isRunning: state.secondsLeft === 0 ? true : !state.isRunning,
        secondsLeft:
          state.secondsLeft === 0
            ? TIMER_PRESETS[state.mode].seconds
            : state.secondsLeft,
      };

    case 'RESET':
      return {
        ...state,
        isRunning: false,
        secondsLeft: TIMER_PRESETS[state.mode].seconds,
      };

    case 'TICK':
      if (!state.isRunning || state.secondsLeft === 0) return state;
      return {
        ...state,
        secondsLeft: Math.max(0, state.secondsLeft - 1),
      };

    case 'SWITCH_MODE':
      if (!TIMER_PRESETS[action.mode]) return state;
      return {
        ...state,
        mode: action.mode,
        isRunning: false,
        secondsLeft: TIMER_PRESETS[action.mode].seconds,
      };

    case 'COMPLETE':
      return advanceState(state, action.shouldCount);

    case 'SKIP':
      return advanceState(state, false);

    default:
      return state;
  }
};

export default function usePomodoro() {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  const preset = useMemo(() => TIMER_PRESETS[state.mode], [state.mode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.isRunning) return undefined;

    const intervalId = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.isRunning]);

  useEffect(() => {
    if (state.secondsLeft === 0 && state.isRunning) {
      dispatch({ type: 'COMPLETE', shouldCount: true });
    }
  }, [state.secondsLeft, state.isRunning]);

  return {
    state,
    preset,
    toggleRunning: () => dispatch({ type: 'TOGGLE_RUNNING' }),
    reset: () => dispatch({ type: 'RESET' }),
    switchMode: (mode) => dispatch({ type: 'SWITCH_MODE', mode }),
    skip: () => dispatch({ type: 'SKIP' }),
  };
}
