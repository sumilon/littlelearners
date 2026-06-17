// Mystery Letters Module Data

// Emoji-to-Letter Cipher (A-Z)
export const emojiCipher = {
  A: { emoji: '🍎', name: 'Apple' },
  B: { emoji: '🐝', name: 'Bee' },
  C: { emoji: '🐱', name: 'Cat' },
  D: { emoji: '🐕', name: 'Dog' },
  E: { emoji: '🥚', name: 'Egg' },
  F: { emoji: '🐟', name: 'Fish' },
  G: { emoji: '🍇', name: 'Grapes' },
  H: { emoji: '🏠', name: 'House' },
  I: { emoji: '🍦', name: 'Ice cream' },
  J: { emoji: '🧃', name: 'Juice' },
  K: { emoji: '🔑', name: 'Key' },
  L: { emoji: '🦁', name: 'Lion' },
  M: { emoji: '🌙', name: 'Moon' },
  N: { emoji: '🥜', name: 'Nut' },
  O: { emoji: '🐙', name: 'Octopus' },
  P: { emoji: '🐧', name: 'Penguin' },
  Q: { emoji: '👑', name: 'Queen' },
  R: { emoji: '🌈', name: 'Rainbow' },
  S: { emoji: '⭐', name: 'Star' },
  T: { emoji: '🌳', name: 'Tree' },
  U: { emoji: '☂️', name: 'Umbrella' },
  V: { emoji: '🎻', name: 'Violin' },
  W: { emoji: '🌊', name: 'Wave' },
  X: { emoji: '❌', name: 'X mark' },
  Y: { emoji: '🧶', name: 'Yarn' },
  Z: { emoji: '🦓', name: 'Zebra' }
};

// Helper function to encode text to emojis
export const encodeToEmojis = (text) => {
  return text.toUpperCase().split('').map(char => {
    if (char === ' ') return { emoji: '   ', letter: ' ' };
    return { emoji: emojiCipher[char]?.emoji || '❓', letter: char };
  });
};

// Helper function to get random letters for multiple choice
export const getRandomLetters = (correctLetter, count = 4) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const letters = [correctLetter];
  
  while (letters.length < count) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (!letters.includes(randomLetter)) {
      letters.push(randomLetter);
    }
  }
  
  // Shuffle the letters
  return letters.sort(() => Math.random() - 0.5);
};

// Progressive Word Lists by Difficulty
export const wordsByLevel = {
  easy: {
    level: 1,
    name: 'Easy Detective',
    description: '3-letter words',
    words: [
      { word: 'CAT', hint: 'A furry pet that says meow', category: 'animal' },
      { word: 'DOG', hint: 'A pet that barks and wags its tail', category: 'animal' },
      { word: 'SUN', hint: 'Bright and yellow in the sky', category: 'nature' },
      { word: 'BAT', hint: 'Flies at night', category: 'animal' },
      { word: 'BED', hint: 'You sleep in this', category: 'furniture' },
      { word: 'BUS', hint: 'A vehicle that carries many people', category: 'vehicle' },
      { word: 'CAR', hint: 'A vehicle with four wheels', category: 'vehicle' },
      { word: 'CUP', hint: 'You drink from this', category: 'object' },
      { word: 'EGG', hint: 'Chickens lay these', category: 'food' },
      { word: 'HAT', hint: 'You wear this on your head', category: 'clothing' },
      { word: 'PEN', hint: 'You write with this', category: 'object' },
      { word: 'PIE', hint: 'A sweet dessert', category: 'food' },
      { word: 'RAT', hint: 'A small rodent', category: 'animal' },
      { word: 'TEN', hint: 'The number after nine', category: 'number' },
      { word: 'TOY', hint: 'Something to play with', category: 'object' }
    ],
    badgeEmoji: '🔍',
    badgeName: 'Junior Detective'
  },
  
  medium: {
    level: 2,
    name: 'Medium Detective',
    description: '4-letter words',
    words: [
      { word: 'BIRD', hint: 'An animal that flies and has feathers', category: 'animal' },
      { word: 'BOOK', hint: 'You read this', category: 'object' },
      { word: 'BALL', hint: 'Round toy you can bounce', category: 'toy' },
      { word: 'BEAR', hint: 'A big furry animal', category: 'animal' },
      { word: 'BIKE', hint: 'Two-wheeled vehicle you pedal', category: 'vehicle' },
      { word: 'CAKE', hint: 'Sweet food for birthdays', category: 'food' },
      { word: 'DUCK', hint: 'A bird that swims and quacks', category: 'animal' },
      { word: 'FISH', hint: 'Lives in water and has fins', category: 'animal' },
      { word: 'FROG', hint: 'Green animal that hops and says ribbit', category: 'animal' },
      { word: 'GAME', hint: 'Something fun to play', category: 'activity' },
      { word: 'MOON', hint: 'Shines at night in the sky', category: 'nature' },
      { word: 'RAIN', hint: 'Water that falls from clouds', category: 'weather' },
      { word: 'TREE', hint: 'A tall plant with leaves and branches', category: 'nature' },
      { word: 'STAR', hint: 'Twinkles in the night sky', category: 'nature' },
      { word: 'KITE', hint: 'Flies high in the wind', category: 'toy' }
    ],
    badgeEmoji: '🕵️',
    badgeName: 'Secret Agent'
  },
  
  hard: {
    level: 3,
    name: 'Hard Detective',
    description: '5-letter words',
    words: [
      { word: 'APPLE', hint: 'A red or green fruit', category: 'food' },
      { word: 'BREAD', hint: 'Made from flour, you eat it', category: 'food' },
      { word: 'CHAIR', hint: 'Furniture you sit on', category: 'furniture' },
      { word: 'CLOUD', hint: 'White and fluffy in the sky', category: 'nature' },
      { word: 'CLOCK', hint: 'Tells you what time it is', category: 'object' },
      { word: 'CROWN', hint: 'A king or queen wears this', category: 'object' },
      { word: 'DRESS', hint: 'Clothing girls often wear', category: 'clothing' },
      { word: 'EAGLE', hint: 'A large bird that soars high', category: 'animal' },
      { word: 'GRASS', hint: 'Green plants on the ground', category: 'nature' },
      { word: 'HEART', hint: 'A symbol of love', category: 'shape' },
      { word: 'HOUSE', hint: 'A building where people live', category: 'building' },
      { word: 'LEMON', hint: 'A sour yellow fruit', category: 'food' },
      { word: 'OCEAN', hint: 'Very large body of salt water', category: 'nature' },
      { word: 'PIANO', hint: 'Musical instrument with black and white keys', category: 'instrument' },
      { word: 'PIZZA', hint: 'Round food with cheese and toppings', category: 'food' }
    ],
    badgeEmoji: '🎖️',
    badgeName: 'Master Detective'
  },
  
  expert: {
    level: 4,
    name: 'Expert Detective',
    description: '6-letter words',
    words: [
      { word: 'BANANA', hint: 'A yellow fruit monkeys love', category: 'food' },
      { word: 'BOTTLE', hint: 'Container that holds liquids', category: 'object' },
      { word: 'BUTTON', hint: 'You press this or sew it on clothes', category: 'object' },
      { word: 'CASTLE', hint: 'A big building where kings and queens live', category: 'building' },
      { word: 'CHEESE', hint: 'Yellow food made from milk', category: 'food' },
      { word: 'COOKIE', hint: 'Sweet baked treat', category: 'food' },
      { word: 'DRAGON', hint: 'Mythical creature that breathes fire', category: 'fantasy' },
      { word: 'FLOWER', hint: 'Pretty plant with colorful petals', category: 'nature' },
      { word: 'GARDEN', hint: 'Place where plants and flowers grow', category: 'place' },
      { word: 'HAMMER', hint: 'Tool used to hit nails', category: 'tool' },
      { word: 'KITTEN', hint: 'A baby cat', category: 'animal' },
      { word: 'MONKEY', hint: 'Animal that swings from trees', category: 'animal' },
      { word: 'PARROT', hint: 'Colorful bird that can talk', category: 'animal' },
      { word: 'PENCIL', hint: 'You write or draw with this', category: 'object' },
      { word: 'RABBIT', hint: 'Fluffy animal with long ears', category: 'animal' }
    ],
    badgeEmoji: '🏆',
    badgeName: 'Code Breaker Champion'
  }
};

// Detective Badges/Achievements
export const badges = [
  {
    id: 'first-decode',
    name: 'First Case Solved',
    emoji: '🔓',
    description: 'Decode your first secret message!',
    requirement: 'Complete 1 word'
  },
  {
    id: 'junior-detective',
    name: 'Junior Detective',
    emoji: '🔍',
    description: 'Master all 3-letter words!',
    requirement: 'Complete all Easy level words'
  },
  {
    id: 'secret-agent',
    name: 'Secret Agent',
    emoji: '🕵️',
    description: 'Crack the 4-letter codes!',
    requirement: 'Complete all Medium level words'
  },
  {
    id: 'master-detective',
    name: 'Master Detective',
    emoji: '🎖️',
    description: 'Solve the toughest mysteries!',
    requirement: 'Complete all Hard level words'
  },
  {
    id: 'code-breaker',
    name: 'Code Breaker Champion',
    emoji: '🏆',
    description: 'The ultimate cipher expert!',
    requirement: 'Complete all Expert level words'
  },
  {
    id: 'message-creator',
    name: 'Message Creator',
    emoji: '✉️',
    description: 'Create your first secret message!',
    requirement: 'Create 1 custom message'
  },
  {
    id: 'speed-decoder',
    name: 'Speed Decoder',
    emoji: '⚡',
    description: 'Decode 10 words in a row without mistakes!',
    requirement: 'Complete 10 words perfectly'
  },
  {
    id: 'alphabet-master',
    name: 'Alphabet Master',
    emoji: '📚',
    description: 'Learn all 26 cipher symbols!',
    requirement: 'View all letters in cipher guide'
  }
];

// Detective Tips and Fun Facts
export const detectiveTips = [
  {
    id: 1,
    tip: 'Real detectives use codes to send secret messages!',
    emoji: '🔐'
  },
  {
    id: 2,
    tip: 'The first letter of each emoji\'s name is your clue!',
    emoji: '💡'
  },
  {
    id: 3,
    tip: 'Start with short words to become a better code breaker!',
    emoji: '📝'
  },
  {
    id: 4,
    tip: 'Practice makes you a faster detective!',
    emoji: '⏱️'
  },
  {
    id: 5,
    tip: 'Spies used ciphers just like this in real life!',
    emoji: '🕵️‍♀️'
  },
  {
    id: 6,
    tip: 'Create secret messages for your friends!',
    emoji: '✉️'
  }
];

// Cipher categories for learning
export const cipherCategories = {
  vowels: {
    name: 'Vowels',
    emoji: '🗣️',
    letters: ['A', 'E', 'I', 'O', 'U'],
    description: 'The singing letters!'
  },
  consonants: {
    name: 'Consonants',
    emoji: '🔤',
    letters: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
    description: 'All the other letters!'
  },
  animals: {
    name: 'Animal Emojis',
    emoji: '🦁',
    letters: ['B', 'C', 'D', 'F', 'L', 'O', 'P', 'Z'],
    description: 'Letters represented by animals'
  },
  food: {
    name: 'Food Emojis',
    emoji: '🍎',
    letters: ['A', 'E', 'G', 'I', 'J', 'N'],
    description: 'Yummy letter symbols!'
  },
  nature: {
    name: 'Nature Emojis',
    emoji: '🌳',
    letters: ['M', 'R', 'S', 'T', 'W'],
    description: 'Letters from nature'
  }
};

// Sample messages for inspiration
export const sampleMessages = [
  'HI',
  'BYE',
  'LOVE',
  'PLAY',
  'HAPPY',
  'SMILE',
  'FRIEND',
  'HELLO',
  'THANK YOU',
  'GOOD JOB',
  'BE KIND',
  'HAVE FUN'
];
