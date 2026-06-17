// Mini Piano Module Data
// Musical notes and songs for kids

export const pianoKeys = [
  { note: 'C', name: 'Do', color: 'white', frequency: 261.63, position: 0, emoji: '🎵' },
  { note: 'C#', name: 'Do#', color: 'black', frequency: 277.18, position: 0.5, emoji: '🎶' },
  { note: 'D', name: 'Re', color: 'white', frequency: 293.66, position: 1, emoji: '🎵' },
  { note: 'D#', name: 'Re#', color: 'black', frequency: 311.13, position: 1.5, emoji: '🎶' },
  { note: 'E', name: 'Mi', color: 'white', frequency: 329.63, position: 2, emoji: '🎵' },
  { note: 'F', name: 'Fa', color: 'white', frequency: 349.23, position: 3, emoji: '🎵' },
  { note: 'F#', name: 'Fa#', color: 'black', frequency: 369.99, position: 3.5, emoji: '🎶' },
  { note: 'G', name: 'Sol', color: 'white', frequency: 392.00, position: 4, emoji: '🎵' },
  { note: 'G#', name: 'Sol#', color: 'black', frequency: 415.30, position: 4.5, emoji: '🎶' },
  { note: 'A', name: 'La', color: 'white', frequency: 440.00, position: 5, emoji: '🎵' },
  { note: 'A#', name: 'La#', color: 'black', frequency: 466.16, position: 5.5, emoji: '🎶' },
  { note: 'B', name: 'Ti', color: 'white', frequency: 493.88, position: 6, emoji: '🎵' },
  { note: 'C2', name: 'Do (High)', color: 'white', frequency: 523.25, position: 7, emoji: '🎵' }
];

export const simpleSongs = [
  {
    id: 'twinkle',
    name: 'Twinkle Twinkle',
    emoji: '⭐',
    difficulty: 'easy',
    notes: ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C'],
    durations: [500, 500, 500, 500, 500, 500, 1000, 500, 500, 500, 500, 500, 500, 1000]
  },
  {
    id: 'mary-lamb',
    name: 'Mary Had A Little Lamb',
    emoji: '🐑',
    difficulty: 'easy',
    notes: ['E', 'D', 'C', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'E', 'G', 'G'],
    durations: [500, 500, 500, 500, 500, 500, 1000, 500, 500, 1000, 500, 500, 1000]
  },
  {
    id: 'happy-birthday',
    name: 'Happy Birthday',
    emoji: '🎂',
    difficulty: 'medium',
    notes: ['C', 'C', 'D', 'C', 'F', 'E', 'C', 'C', 'D', 'C', 'G', 'F'],
    durations: [400, 400, 800, 800, 800, 1200, 400, 400, 800, 800, 800, 1200]
  },
  {
    id: 'jingle-bells',
    name: 'Jingle Bells',
    emoji: '🔔',
    difficulty: 'medium',
    notes: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'G', 'C', 'D', 'E'],
    durations: [500, 500, 1000, 500, 500, 1000, 500, 500, 500, 500, 1500]
  },
  {
    id: 'hot-cross-buns',
    name: 'Hot Cross Buns',
    emoji: '🥐',
    difficulty: 'easy',
    notes: ['E', 'D', 'C', 'E', 'D', 'C', 'C', 'C', 'C', 'C', 'D', 'D', 'D', 'D', 'E', 'D', 'C'],
    durations: [500, 500, 1000, 500, 500, 1000, 250, 250, 250, 250, 250, 250, 250, 250, 500, 500, 1000]
  },
  {
    id: 'baa-baa-black-sheep',
    name: 'Baa Baa Black Sheep',
    emoji: '🐑',
    difficulty: 'easy',
    notes: ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C'],
    durations: [500, 500, 500, 500, 500, 500, 1000, 500, 500, 500, 500, 500, 500, 1000]
  },
  {
    id: 'old-macdonald',
    name: 'Old MacDonald',
    emoji: '🚜',
    difficulty: 'medium',
    notes: ['C', 'C', 'C', 'G', 'A', 'A', 'G', 'E', 'E', 'D', 'D', 'C'],
    durations: [500, 500, 500, 500, 500, 500, 1000, 500, 500, 500, 500, 1000]
  },
  {
    id: 'row-your-boat',
    name: 'Row Row Your Boat',
    emoji: '🚣',
    difficulty: 'easy',
    notes: ['C', 'C', 'C', 'D', 'E', 'E', 'D', 'E', 'F', 'G'],
    durations: [500, 500, 400, 400, 800, 400, 400, 400, 400, 1200]
  },
  {
    id: 'wheels-on-bus',
    name: 'The Wheels On The Bus',
    emoji: '🚌',
    difficulty: 'medium',
    notes: ['C', 'C', 'C', 'D', 'E', 'E', 'E', 'D', 'E', 'F', 'G'],
    durations: [500, 500, 500, 500, 800, 500, 500, 500, 500, 500, 1000]
  },
  {
    id: 'itsy-bitsy-spider',
    name: 'Itsy Bitsy Spider',
    emoji: '🕷️',
    difficulty: 'medium',
    notes: ['G', 'C', 'C', 'C', 'D', 'E', 'E', 'E', 'D', 'C', 'D', 'E', 'C'],
    durations: [600, 400, 400, 400, 400, 800, 400, 400, 400, 400, 400, 400, 1000]
  },
  {
    id: 'london-bridge',
    name: 'London Bridge',
    emoji: '🌉',
    difficulty: 'easy',
    notes: ['G', 'A', 'G', 'F', 'E', 'F', 'G', 'D', 'E', 'F', 'E', 'F', 'G'],
    durations: [500, 500, 500, 500, 500, 500, 1000, 500, 500, 1000, 500, 500, 1000]
  },
  {
    id: 'rain-rain',
    name: 'Rain Rain Go Away',
    emoji: '🌧️',
    difficulty: 'easy',
    notes: ['G', 'E', 'G', 'E', 'G', 'A', 'G', 'E', 'G', 'E', 'D'],
    durations: [500, 500, 500, 500, 500, 500, 1000, 500, 500, 500, 1000]
  }
];

export const musicTheory = [
  { concept: 'Note C (Do)', description: 'The first note of the scale', emoji: '🎵', sound: 'C' },
  { concept: 'Note D (Re)', description: 'The second note of the scale', emoji: '🎵', sound: 'D' },
  { concept: 'Note E (Mi)', description: 'The third note of the scale', emoji: '🎵', sound: 'E' },
  { concept: 'Note F (Fa)', description: 'The fourth note of the scale', emoji: '🎵', sound: 'F' },
  { concept: 'Note G (Sol)', description: 'The fifth note of the scale', emoji: '🎵', sound: 'G' },
  { concept: 'Note A (La)', description: 'The sixth note of the scale', emoji: '🎵', sound: 'A' },
  { concept: 'Note B (Ti)', description: 'The seventh note of the scale', emoji: '🎵', sound: 'B' },
  { concept: 'White Keys', description: 'Natural notes without sharps or flats', emoji: '⬜', sound: null },
  { concept: 'Black Keys', description: 'Sharp and flat notes', emoji: '⬛', sound: null },
  { concept: 'Octave', description: 'Eight notes from C to C', emoji: '🎼', sound: null }
];

export const rhythmPatterns = [
  { name: 'Steady Beat', pattern: ['👏', '👏', '👏', '👏'], emoji: '🥁' },
  { name: 'Fast Beat', pattern: ['👏', '👏', '👏', '👏', '👏', '👏', '👏', '👏'], emoji: '⚡' },
  { name: 'Slow Beat', pattern: ['👏', '  ', '👏', '  '], emoji: '🐌' },
  { name: 'Pattern 1', pattern: ['👏', '👏', '  ', '👏'], emoji: '🎵' },
  { name: 'Pattern 2', pattern: ['👏', '  ', '👏', '👏'], emoji: '🎶' }
];

// Helper function to play a note using Web Audio API
export const playNote = (frequency, duration = 500) => {
  // This will be implemented using audioUtils
  return { frequency, duration };
};

export default {
  pianoKeys,
  simpleSongs,
  musicTheory,
  rhythmPatterns,
  playNote
};
