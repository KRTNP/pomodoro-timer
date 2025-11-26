export const TIMER_PRESETS = {
  focus: {
    label: 'Focus',
    seconds: 25 * 60,
    accent: '#ff6b6b',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #f53844 100%)',
  },
  shortBreak: {
    label: 'Short Break',
    seconds: 5 * 60,
    accent: '#5dd39e',
    gradient: 'linear-gradient(135deg, #5dd39e 0%, #48b180 100%)',
  },
  longBreak: {
    label: 'Long Break',
    seconds: 15 * 60,
    accent: '#5aa9e6',
    gradient: 'linear-gradient(135deg, #5aa9e6 0%, #4070f4 100%)',
  },
};

export const STORAGE_KEY = 'pomodoro-timer:v1';
