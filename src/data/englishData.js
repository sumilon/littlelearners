// English Learning Data
// Contains alphabet, phonics, words, and spelling content

// English Alphabet with phonics sounds
export const alphabet = [
  { letter: 'A', lowercase: 'a', phonics: 'ay', example: 'Apple', emoji: '🍎' },
  { letter: 'B', lowercase: 'b', phonics: 'bee', example: 'Ball', emoji: '⚽' },
  { letter: 'C', lowercase: 'c', phonics: 'see', example: 'Cat', emoji: '🐱' },
  { letter: 'D', lowercase: 'd', phonics: 'dee', example: 'Dog', emoji: '🐕' },
  { letter: 'E', lowercase: 'e', phonics: 'ee', example: 'Egg', emoji: '🥚' },
  { letter: 'F', lowercase: 'f', phonics: 'eff', example: 'Fish', emoji: '🐟' },
  { letter: 'G', lowercase: 'g', phonics: 'jee', example: 'Grape', emoji: '🍇' },
  { letter: 'H', lowercase: 'h', phonics: 'aych', example: 'House', emoji: '🏠' },
  { letter: 'I', lowercase: 'i', phonics: 'eye', example: 'Ice', emoji: '🧊' },
  { letter: 'J', lowercase: 'j', phonics: 'jay', example: 'Jam', emoji: '🍓' },
  { letter: 'K', lowercase: 'k', phonics: 'kay', example: 'Kite', emoji: '🪁' },
  { letter: 'L', lowercase: 'l', phonics: 'ell', example: 'Lion', emoji: '🦁' },
  { letter: 'M', lowercase: 'm', phonics: 'em', example: 'Moon', emoji: '🌙' },
  { letter: 'N', lowercase: 'n', phonics: 'en', example: 'Nest', emoji: '🪺' },
  { letter: 'O', lowercase: 'o', phonics: 'oh', example: 'Orange', emoji: '🍊' },
  { letter: 'P', lowercase: 'p', phonics: 'pee', example: 'Pig', emoji: '🐷' },
  { letter: 'Q', lowercase: 'q', phonics: 'queue', example: 'Queen', emoji: '👸' },
  { letter: 'R', lowercase: 'r', phonics: 'are', example: 'Rose', emoji: '🌹' },
  { letter: 'S', lowercase: 's', phonics: 'ess', example: 'Sun', emoji: '☀️' },
  { letter: 'T', lowercase: 't', phonics: 'tee', example: 'Tree', emoji: '🌳' },
  { letter: 'U', lowercase: 'u', phonics: 'you', example: 'Umbrella', emoji: '☂️' },
  { letter: 'V', lowercase: 'v', phonics: 'vee', example: 'Van', emoji: '🚐' },
  { letter: 'W', lowercase: 'w', phonics: 'double-you', example: 'Water', emoji: '💧' },
  { letter: 'X', lowercase: 'x', phonics: 'ex', example: 'Xylophone', emoji: '🎵' },
  { letter: 'Y', lowercase: 'y', phonics: 'why', example: 'Yo-yo', emoji: '🪀' },
  { letter: 'Z', lowercase: 'z', phonics: 'zee', example: 'Zebra', emoji: '🦓' }
];

// Phonics patterns (short and long vowels, consonant blends)
export const phonicsPatterns = [
  {
    pattern: 'Short A',
    sound: 'æ (as in cat)',
    words: [
      { word: 'cat', emoji: '🐱' },
      { word: 'bat', emoji: '🦇' },
      { word: 'hat', emoji: '🎩' },
      { word: 'rat', emoji: '🐀' },
      { word: 'mat', emoji: '🧘' }
    ]
  },
  {
    pattern: 'Short E',
    sound: 'ɛ (as in bed)',
    words: [
      { word: 'bed', emoji: '🛏️' },
      { word: 'red', emoji: '🔴' },
      { word: 'hen', emoji: '🐔' },
      { word: 'pen', emoji: '🖊️' },
      { word: 'ten', emoji: '🔟' }
    ]
  },
  {
    pattern: 'Short I',
    sound: 'ɪ (as in pig)',
    words: [
      { word: 'pig', emoji: '🐷' },
      { word: 'big', emoji: '🔵' },
      { word: 'pin', emoji: '📌' },
      { word: 'win', emoji: '🏆' },
      { word: 'sit', emoji: '💺' }
    ]
  },
  {
    pattern: 'Short O',
    sound: 'ɒ (as in dog)',
    words: [
      { word: 'dog', emoji: '🐕' },
      { word: 'log', emoji: '🪵' },
      { word: 'hot', emoji: '🔥' },
      { word: 'pot', emoji: '🍲' },
      { word: 'box', emoji: '📦' }
    ]
  },
  {
    pattern: 'Short U',
    sound: 'ʌ (as in sun)',
    words: [
      { word: 'sun', emoji: '☀️' },
      { word: 'run', emoji: '🏃' },
      { word: 'cup', emoji: '☕' },
      { word: 'bus', emoji: '🚌' },
      { word: 'hug', emoji: '🤗' }
    ]
  }
];

// Simple 3-letter words for word building
export const simpleWords = [
  // Animals
  { word: 'cat', emoji: '🐱', category: 'animals', hint: 'A pet that says meow' },
  { word: 'dog', emoji: '🐕', category: 'animals', hint: 'A pet that barks' },
  { word: 'pig', emoji: '🐷', category: 'animals', hint: 'Pink farm animal' },
  { word: 'bee', emoji: '🐝', category: 'animals', hint: 'Makes honey' },
  { word: 'ant', emoji: '🐜', category: 'animals', hint: 'Small insect' },
  { word: 'fox', emoji: '🦊', category: 'animals', hint: 'Orange wild animal' },
  
  // Objects
  { word: 'sun', emoji: '☀️', category: 'nature', hint: 'Shines in the sky' },
  { word: 'box', emoji: '📦', category: 'objects', hint: 'Used for storage' },
  { word: 'cup', emoji: '☕', category: 'objects', hint: 'For drinking' },
  { word: 'hat', emoji: '🎩', category: 'objects', hint: 'Wear on head' },
  { word: 'pen', emoji: '🖊️', category: 'objects', hint: 'For writing' },
  { word: 'bag', emoji: '👜', category: 'objects', hint: 'Carry things in it' },
  
  // Food
  { word: 'egg', emoji: '🥚', category: 'food', hint: 'From a chicken' },
  { word: 'jam', emoji: '🍓', category: 'food', hint: 'Sweet spread' },
  { word: 'pie', emoji: '🥧', category: 'food', hint: 'Sweet dessert' },
  
  // Actions
  { word: 'run', emoji: '🏃', category: 'actions', hint: 'Move fast' },
  { word: 'hop', emoji: '🦘', category: 'actions', hint: 'Jump on one leg' },
  { word: 'sit', emoji: '💺', category: 'actions', hint: 'Rest on a chair' },
  
  // Body parts
  { word: 'eye', emoji: '👁️', category: 'body', hint: 'Used for seeing' },
  { word: 'ear', emoji: '👂', category: 'body', hint: 'Used for hearing' },
  { word: 'leg', emoji: '🦵', category: 'body', hint: 'Used for walking' }
];

// Spelling game words (4-5 letters)
export const spellingWords = [
  { word: 'apple', emoji: '🍎', difficulty: 'easy', hint: 'Red fruit' },
  { word: 'house', emoji: '🏠', difficulty: 'easy', hint: 'Where we live' },
  { word: 'water', emoji: '💧', difficulty: 'easy', hint: 'We drink this' },
  { word: 'happy', emoji: '😊', difficulty: 'easy', hint: 'Feeling joyful' },
  { word: 'sunny', emoji: '☀️', difficulty: 'easy', hint: 'Bright day' },
  { word: 'flower', emoji: '🌸', difficulty: 'medium', hint: 'Grows in garden' },
  { word: 'rabbit', emoji: '🐰', difficulty: 'medium', hint: 'Hops and eats carrots' },
  { word: 'school', emoji: '🏫', difficulty: 'medium', hint: 'Where we learn' },
  { word: 'friend', emoji: '👫', difficulty: 'medium', hint: 'Someone you like' },
  { word: 'garden', emoji: '🌻', difficulty: 'medium', hint: 'Plants grow here' },
  { word: 'rainbow', emoji: '🌈', difficulty: 'hard', hint: 'Colorful in sky after rain' },
  { word: 'elephant', emoji: '🐘', difficulty: 'hard', hint: 'Large animal with trunk' },
  { word: 'butterfly', emoji: '🦋', difficulty: 'hard', hint: 'Colorful flying insect' }
];

// Common sight words for early readers
export const sightWords = [
  'the', 'and', 'is', 'to', 'it', 'in', 'you', 'of', 'for', 'on',
  'are', 'as', 'with', 'his', 'they', 'at', 'be', 'this', 'from', 'or',
  'one', 'had', 'by', 'but', 'not', 'what', 'all', 'were', 'when', 'we'
];

// Letter tracing patterns (for future drawing feature)
export const letterPaths = {
  A: 'Draw two slanted lines meeting at top, then a horizontal line across',
  B: 'Vertical line down, two bumps on the right',
  C: 'Curved line like a smile sideways',
  // ... can add more detailed paths
};
