// Web Audio API utilities for sound effects

let audioContext = null;

// Initialize AudioContext lazily (required for user interaction)
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Play a tone with specified parameters
export const playTone = (frequency, duration, type = 'sine', volume = 0.3) => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.error('Error playing tone:', error);
  }
};

// Predefined sound effects
export const playClick = () => {
  playTone(800, 0.08, 'square', 0.2);
};

export const playCorrect = () => {
  playTone(523, 0.15, 'sine', 0.3);
  setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 150);
};

export const playWrong = () => {
  playTone(200, 0.3, 'sawtooth', 0.3);
};

export const playStar = () => {
  const frequencies = [523, 659, 784];
  frequencies.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'sine', 0.25), i * 120);
  });
};

export const playSuccess = () => {
  const melody = [
    { freq: 523, time: 0 },
    { freq: 659, time: 150 },
    { freq: 784, time: 300 },
    { freq: 1047, time: 450 },
  ];
  melody.forEach((note) => {
    setTimeout(() => playTone(note.freq, 0.2, 'sine', 0.3), note.time);
  });
};

// Piano notes (for Mini Piano module)
export const pianoNotes = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.0,
  A: 440.0,
  B: 493.88,
  C5: 523.25,
};

export const playPianoNote = (note) => {
  const frequency = pianoNotes[note];
  if (frequency) {
    playTone(frequency, 0.5, 'sine', 0.4);
  }
};

// Initialize audio context on first user interaction
export const initAudio = () => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  } else {
    getAudioContext();
  }
};

// Generic sound player - maps sound names to functions
export const playSound = (soundName) => {
  const soundMap = {
    click: playClick,
    correct: playCorrect,
    wrong: playWrong,
    star: playStar,
    success: playSuccess,
  };
  
  const soundFunction = soundMap[soundName];
  if (soundFunction) {
    soundFunction();
  } else {
    console.warn(`Unknown sound: ${soundName}`);
  }
};
