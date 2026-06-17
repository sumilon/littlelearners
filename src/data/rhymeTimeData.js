// Rhyme Time Module Data

// Rhyming word pairs for learning
export const rhymingPairs = [
  // Easy level
  { id: 1, word1: 'cat', word2: 'hat', emoji1: '🐱', emoji2: '🎩', difficulty: 'easy' },
  { id: 2, word1: 'dog', word2: 'frog', emoji1: '🐶', emoji2: '🐸', difficulty: 'easy' },
  { id: 3, word1: 'bee', word2: 'tree', emoji1: '🐝', emoji2: '🌳', difficulty: 'easy' },
  { id: 4, word1: 'sun', word2: 'fun', emoji1: '☀️', emoji2: '🎉', difficulty: 'easy' },
  { id: 5, word1: 'car', word2: 'star', emoji1: '🚗', emoji2: '⭐', difficulty: 'easy' },
  { id: 6, word1: 'moon', word2: 'spoon', emoji1: '🌙', emoji2: '🥄', difficulty: 'easy' },
  
  // Medium level
  { id: 7, word1: 'house', word2: 'mouse', emoji1: '🏠', emoji2: '🐭', difficulty: 'medium' },
  { id: 8, word1: 'ball', word2: 'wall', emoji1: '⚽', emoji2: '🧱', difficulty: 'medium' },
  { id: 9, word1: 'ring', word2: 'sing', emoji1: '💍', emoji2: '🎤', difficulty: 'medium' },
  { id: 10, word1: 'boat', word2: 'coat', emoji1: '⛵', emoji2: '🧥', difficulty: 'medium' },
  { id: 11, word1: 'cake', word2: 'lake', emoji1: '🎂', emoji2: '🏞️', difficulty: 'medium' },
  { id: 12, word1: 'train', word2: 'rain', emoji1: '🚂', emoji2: '🌧️', difficulty: 'medium' },
  
  // Hard level
  { id: 13, word1: 'light', word2: 'kite', emoji1: '💡', emoji2: '🪁', difficulty: 'hard' },
  { id: 14, word1: 'flower', word2: 'tower', emoji1: '🌸', emoji2: '🗼', difficulty: 'hard' },
  { id: 15, word1: 'crown', word2: 'clown', emoji1: '👑', emoji2: '🤡', difficulty: 'hard' },
  { id: 16, word1: 'whale', word2: 'tail', emoji1: '🐋', emoji2: '🦎', difficulty: 'hard' }
];

// Word families for phonics learning
export const wordFamilies = [
  {
    id: 1,
    family: '-at',
    words: [
      { word: 'cat', emoji: '🐱' },
      { word: 'hat', emoji: '🎩' },
      { word: 'bat', emoji: '🦇' },
      { word: 'rat', emoji: '🐀' },
      { word: 'mat', emoji: '🧘' },
      { word: 'sat', emoji: '🪑' }
    ],
    description: 'Words ending in -at'
  },
  {
    id: 2,
    family: '-an',
    words: [
      { word: 'can', emoji: '🥫' },
      { word: 'fan', emoji: '🪭' },
      { word: 'man', emoji: '👨' },
      { word: 'pan', emoji: '🍳' },
      { word: 'ran', emoji: '🏃' },
      { word: 'van', emoji: '🚐' }
    ],
    description: 'Words ending in -an'
  },
  {
    id: 3,
    family: '-et',
    words: [
      { word: 'net', emoji: '🥅' },
      { word: 'pet', emoji: '🐕' },
      { word: 'wet', emoji: '💧' },
      { word: 'jet', emoji: '✈️' },
      { word: 'set', emoji: '📦' },
      { word: 'vet', emoji: '👨‍⚕️' }
    ],
    description: 'Words ending in -et'
  },
  {
    id: 4,
    family: '-ig',
    words: [
      { word: 'big', emoji: '🐘' },
      { word: 'pig', emoji: '🐷' },
      { word: 'dig', emoji: '⛏️' },
      { word: 'fig', emoji: '🫐' },
      { word: 'wig', emoji: '💇' },
      { word: 'jig', emoji: '💃' }
    ],
    description: 'Words ending in -ig'
  },
  {
    id: 5,
    family: '-op',
    words: [
      { word: 'hop', emoji: '🐇' },
      { word: 'top', emoji: '🔝' },
      { word: 'mop', emoji: '🧹' },
      { word: 'pop', emoji: '🎈' },
      { word: 'stop', emoji: '🛑' },
      { word: 'drop', emoji: '💧' }
    ],
    description: 'Words ending in -op'
  },
  {
    id: 6,
    family: '-ug',
    words: [
      { word: 'bug', emoji: '🐛' },
      { word: 'hug', emoji: '🤗' },
      { word: 'mug', emoji: '☕' },
      { word: 'rug', emoji: '🧶' },
      { word: 'tug', emoji: '🚢' },
      { word: 'jug', emoji: '🏺' }
    ],
    description: 'Words ending in -ug'
  }
];

// Simple poems and nursery rhymes
export const poems = [
  {
    id: 1,
    title: 'Twinkle Twinkle',
    lines: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!',
      'Up above the world so high,',
      'Like a diamond in the sky.'
    ],
    emoji: '⭐',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'Humpty Dumpty',
    lines: [
      'Humpty Dumpty sat on a wall,',
      'Humpty Dumpty had a great fall.',
      'All the king\'s horses and all the king\'s men,',
      'Couldn\'t put Humpty together again!'
    ],
    emoji: '🥚',
    difficulty: 'easy'
  },
  {
    id: 3,
    title: 'Jack and Jill',
    lines: [
      'Jack and Jill went up the hill,',
      'To fetch a pail of water.',
      'Jack fell down and broke his crown,',
      'And Jill came tumbling after.'
    ],
    emoji: '⛰️',
    difficulty: 'easy'
  },
  {
    id: 4,
    title: 'Little Miss Muffet',
    lines: [
      'Little Miss Muffet sat on a tuffet,',
      'Eating her curds and whey.',
      'Along came a spider,',
      'Who sat down beside her,',
      'And frightened Miss Muffet away!'
    ],
    emoji: '🕷️',
    difficulty: 'medium'
  },
  {
    id: 5,
    title: 'Hickory Dickory',
    lines: [
      'Hickory, dickory, dock,',
      'The mouse ran up the clock.',
      'The clock struck one,',
      'The mouse ran down,',
      'Hickory, dickory, dock.'
    ],
    emoji: '🕐',
    difficulty: 'medium'
  },
  {
    id: 6,
    title: 'Mary Had a Little Lamb',
    lines: [
      'Mary had a little lamb,',
      'Little lamb, little lamb.',
      'Mary had a little lamb,',
      'Its fleece was white as snow.'
    ],
    emoji: '🐑',
    difficulty: 'easy'
  },
  {
    id: 7,
    title: 'Baa Baa Black Sheep',
    lines: [
      'Baa, baa, black sheep,',
      'Have you any wool?',
      'Yes sir, yes sir,',
      'Three bags full!'
    ],
    emoji: '🐏',
    difficulty: 'easy'
  },
  {
    id: 8,
    title: 'Row Row Row Your Boat',
    lines: [
      'Row, row, row your boat,',
      'Gently down the stream.',
      'Merrily, merrily, merrily, merrily,',
      'Life is but a dream.'
    ],
    emoji: '🚣',
    difficulty: 'easy'
  }
];

// Rhyme matching game questions
export const rhymeQuestions = [
  {
    id: 1,
    targetWord: 'cat',
    emoji: '🐱',
    options: [
      { word: 'hat', emoji: '🎩', rhymes: true },
      { word: 'dog', emoji: '🐶', rhymes: false },
      { word: 'car', emoji: '🚗', rhymes: false },
      { word: 'bat', emoji: '🦇', rhymes: true }
    ],
    difficulty: 'easy'
  },
  {
    id: 2,
    targetWord: 'sun',
    emoji: '☀️',
    options: [
      { word: 'fun', emoji: '🎉', rhymes: true },
      { word: 'moon', emoji: '🌙', rhymes: false },
      { word: 'run', emoji: '🏃', rhymes: true },
      { word: 'star', emoji: '⭐', rhymes: false }
    ],
    difficulty: 'easy'
  },
  {
    id: 3,
    targetWord: 'tree',
    emoji: '🌳',
    options: [
      { word: 'bee', emoji: '🐝', rhymes: true },
      { word: 'bird', emoji: '🐦', rhymes: false },
      { word: 'see', emoji: '👁️', rhymes: true },
      { word: 'leaf', emoji: '🍃', rhymes: false }
    ],
    difficulty: 'easy'
  },
  {
    id: 4,
    targetWord: 'house',
    emoji: '🏠',
    options: [
      { word: 'mouse', emoji: '🐭', rhymes: true },
      { word: 'door', emoji: '🚪', rhymes: false },
      { word: 'blouse', emoji: '👚', rhymes: true },
      { word: 'roof', emoji: '🏘️', rhymes: false }
    ],
    difficulty: 'medium'
  },
  {
    id: 5,
    targetWord: 'ring',
    emoji: '💍',
    options: [
      { word: 'sing', emoji: '🎤', rhymes: true },
      { word: 'dance', emoji: '💃', rhymes: false },
      { word: 'king', emoji: '👑', rhymes: true },
      { word: 'crown', emoji: '👸', rhymes: false }
    ],
    difficulty: 'medium'
  },
  {
    id: 6,
    targetWord: 'cake',
    emoji: '🎂',
    options: [
      { word: 'lake', emoji: '🏞️', rhymes: true },
      { word: 'cookie', emoji: '🍪', rhymes: false },
      { word: 'bake', emoji: '🧁', rhymes: true },
      { word: 'sweet', emoji: '🍬', rhymes: false }
    ],
    difficulty: 'medium'
  },
  {
    id: 7,
    targetWord: 'light',
    emoji: '💡',
    options: [
      { word: 'kite', emoji: '🪁', rhymes: true },
      { word: 'lamp', emoji: '🪔', rhymes: false },
      { word: 'night', emoji: '🌙', rhymes: true },
      { word: 'bright', emoji: '✨', rhymes: true }
    ],
    difficulty: 'hard'
  },
  {
    id: 8,
    targetWord: 'flower',
    emoji: '🌸',
    options: [
      { word: 'tower', emoji: '🗼', rhymes: true },
      { word: 'garden', emoji: '🏡', rhymes: false },
      { word: 'power', emoji: '⚡', rhymes: true },
      { word: 'petal', emoji: '🌺', rhymes: false }
    ],
    difficulty: 'hard'
  }
];

// Fill in the rhyme challenges
export const fillInRhyme = [
  {
    id: 1,
    sentence: 'I wear a ___ on my head, just like a ___!',
    word1: 'hat',
    word2: 'cat',
    blank: 'hat',
    options: ['hat', 'shoe', 'coat', 'sock'],
    emoji: '🎩',
    difficulty: 'easy'
  },
  {
    id: 2,
    sentence: 'The ___ jumped over the log!',
    rhymesWith: 'frog',
    blank: 'dog',
    options: ['dog', 'cat', 'fish', 'bird'],
    emoji: '🐶',
    difficulty: 'easy'
  },
  {
    id: 3,
    sentence: 'I see the ___ shining bright, twinkling in the ___!',
    word1: 'star',
    word2: 'night',
    blank: 'star',
    options: ['moon', 'star', 'cloud', 'sun'],
    emoji: '⭐',
    difficulty: 'medium'
  }
];
