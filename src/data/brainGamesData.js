// Brain Games Module Data

// Memory card pairs for matching game
export const memoryCards = [
  // Easy level - 6 pairs (12 cards)
  { id: 1, emoji: '🍎', name: 'Apple', level: 'easy' },
  { id: 2, emoji: '🍌', name: 'Banana', level: 'easy' },
  { id: 3, emoji: '🍊', name: 'Orange', level: 'easy' },
  { id: 4, emoji: '🍇', name: 'Grapes', level: 'easy' },
  { id: 5, emoji: '🍓', name: 'Strawberry', level: 'easy' },
  { id: 6, emoji: '🍉', name: 'Watermelon', level: 'easy' },
  
  // Medium level - 8 pairs (16 cards)
  { id: 7, emoji: '🐶', name: 'Dog', level: 'medium' },
  { id: 8, emoji: '🐱', name: 'Cat', level: 'medium' },
  { id: 9, emoji: '🐭', name: 'Mouse', level: 'medium' },
  { id: 10, emoji: '🐰', name: 'Rabbit', level: 'medium' },
  { id: 11, emoji: '🦊', name: 'Fox', level: 'medium' },
  { id: 12, emoji: '🐻', name: 'Bear', level: 'medium' },
  { id: 13, emoji: '🐼', name: 'Panda', level: 'medium' },
  { id: 14, emoji: '🐨', name: 'Koala', level: 'medium' },
  
  // Hard level - 10 pairs (20 cards)
  { id: 15, emoji: '⚽', name: 'Soccer', level: 'hard' },
  { id: 16, emoji: '🏀', name: 'Basketball', level: 'hard' },
  { id: 17, emoji: '🎾', name: 'Tennis', level: 'hard' },
  { id: 18, emoji: '🏐', name: 'Volleyball', level: 'hard' },
  { id: 19, emoji: '🏈', name: 'Football', level: 'hard' },
  { id: 20, emoji: '⚾', name: 'Baseball', level: 'hard' },
  { id: 21, emoji: '🎱', name: 'Pool', level: 'hard' },
  { id: 22, emoji: '🏓', name: 'Ping Pong', level: 'hard' },
  { id: 23, emoji: '🏸', name: 'Badminton', level: 'hard' },
  { id: 24, emoji: '🥏', name: 'Frisbee', level: 'hard' }
];

// Logic puzzles
export const logicPuzzles = [
  {
    id: 1,
    question: 'If you have 3 apples and give away 1, how many do you have?',
    options: ['1', '2', '3', '4'],
    answer: '2',
    difficulty: 'easy',
    explanation: '3 - 1 = 2 apples left'
  },
  {
    id: 2,
    question: 'What comes after Monday?',
    options: ['Sunday', 'Tuesday', 'Wednesday', 'Thursday'],
    answer: 'Tuesday',
    difficulty: 'easy',
    explanation: 'The days go: Monday → Tuesday → Wednesday'
  },
  {
    id: 3,
    question: 'Which one is bigger: 5 or 3?',
    options: ['3', '5', 'Same', 'None'],
    answer: '5',
    difficulty: 'easy',
    explanation: '5 is greater than 3'
  },
  {
    id: 4,
    question: 'A cat has 4 legs. How many legs do 2 cats have?',
    options: ['4', '6', '8', '10'],
    answer: '8',
    difficulty: 'medium',
    explanation: '4 legs × 2 cats = 8 legs'
  },
  {
    id: 5,
    question: 'If today is Wednesday, what day was yesterday?',
    options: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    answer: 'Tuesday',
    difficulty: 'medium',
    explanation: 'The day before Wednesday is Tuesday'
  },
  {
    id: 6,
    question: 'I have 2 hands and I tell time. What am I?',
    options: ['Clock', 'Person', 'Watch', 'Both Clock and Watch'],
    answer: 'Both Clock and Watch',
    difficulty: 'medium',
    explanation: 'Both clocks and watches have 2 hands and tell time'
  },
  {
    id: 7,
    question: 'What is 10 - 4 + 2?',
    options: ['6', '8', '10', '12'],
    answer: '8',
    difficulty: 'hard',
    explanation: '10 - 4 = 6, then 6 + 2 = 8'
  },
  {
    id: 8,
    question: 'Which shape has 3 sides?',
    options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
    answer: 'Triangle',
    difficulty: 'easy',
    explanation: 'A triangle always has exactly 3 sides'
  },
  {
    id: 9,
    question: 'If all cats are animals, and Fluffy is a cat, then Fluffy is a...?',
    options: ['Dog', 'Animal', 'Bird', 'Fish'],
    answer: 'Animal',
    difficulty: 'hard',
    explanation: 'Since all cats are animals and Fluffy is a cat, Fluffy must be an animal'
  },
  {
    id: 10,
    question: 'What number comes between 7 and 9?',
    options: ['6', '7', '8', '9'],
    answer: '8',
    difficulty: 'easy',
    explanation: 'The sequence is 7, 8, 9'
  }
];

// Number and letter sequences
export const sequences = [
  {
    id: 1,
    sequence: [1, 2, 3, 4, '?'],
    answer: 5,
    options: [4, 5, 6, 7],
    type: 'number',
    difficulty: 'easy',
    rule: 'Count up by 1'
  },
  {
    id: 2,
    sequence: [2, 4, 6, 8, '?'],
    answer: 10,
    options: [9, 10, 11, 12],
    type: 'number',
    difficulty: 'easy',
    rule: 'Count up by 2 (even numbers)'
  },
  {
    id: 3,
    sequence: ['A', 'B', 'C', 'D', '?'],
    answer: 'E',
    options: ['D', 'E', 'F', 'G'],
    type: 'letter',
    difficulty: 'easy',
    rule: 'Alphabet sequence'
  },
  {
    id: 4,
    sequence: [10, 9, 8, 7, '?'],
    answer: 6,
    options: [5, 6, 7, 8],
    type: 'number',
    difficulty: 'medium',
    rule: 'Count down by 1'
  },
  {
    id: 5,
    sequence: [1, 3, 5, 7, '?'],
    answer: 9,
    options: [8, 9, 10, 11],
    type: 'number',
    difficulty: 'medium',
    rule: 'Odd numbers (count up by 2)'
  },
  {
    id: 6,
    sequence: [5, 10, 15, 20, '?'],
    answer: 25,
    options: [22, 24, 25, 30],
    type: 'number',
    difficulty: 'medium',
    rule: 'Count up by 5'
  },
  {
    id: 7,
    sequence: ['Z', 'Y', 'X', 'W', '?'],
    answer: 'V',
    options: ['U', 'V', 'W', 'X'],
    type: 'letter',
    difficulty: 'hard',
    rule: 'Alphabet backwards'
  },
  {
    id: 8,
    sequence: [1, 2, 4, 8, '?'],
    answer: 16,
    options: [10, 12, 16, 20],
    type: 'number',
    difficulty: 'hard',
    rule: 'Double each time (×2)'
  },
  {
    id: 9,
    sequence: [100, 90, 80, 70, '?'],
    answer: 60,
    options: [50, 60, 65, 70],
    type: 'number',
    difficulty: 'hard',
    rule: 'Count down by 10'
  },
  {
    id: 10,
    sequence: ['A', 'C', 'E', 'G', '?'],
    answer: 'I',
    options: ['H', 'I', 'J', 'K'],
    type: 'letter',
    difficulty: 'hard',
    rule: 'Skip one letter each time'
  }
];

// Visual puzzles (spot the difference, which one doesn't belong, etc.)
export const visualPuzzles = [
  {
    id: 1,
    type: 'odd-one-out',
    items: [
      { emoji: '🍎', name: 'Apple', category: 'fruit' },
      { emoji: '🍌', name: 'Banana', category: 'fruit' },
      { emoji: '🥕', name: 'Carrot', category: 'vegetable' },
      { emoji: '🍊', name: 'Orange', category: 'fruit' }
    ],
    answer: '🥕',
    difficulty: 'easy',
    explanation: 'Carrot is a vegetable, others are fruits'
  },
  {
    id: 2,
    type: 'odd-one-out',
    items: [
      { emoji: '🐶', name: 'Dog', category: 'animal' },
      { emoji: '🐱', name: 'Cat', category: 'animal' },
      { emoji: '🦊', name: 'Fox', category: 'animal' },
      { emoji: '🚗', name: 'Car', category: 'vehicle' }
    ],
    answer: '🚗',
    difficulty: 'easy',
    explanation: 'Car is a vehicle, others are animals'
  },
  {
    id: 3,
    type: 'odd-one-out',
    items: [
      { emoji: '⭕', name: 'Circle', category: 'round' },
      { emoji: '🔵', name: 'Blue Circle', category: 'round' },
      { emoji: '🟦', name: 'Square', category: 'square' },
      { emoji: '⚪', name: 'White Circle', category: 'round' }
    ],
    answer: '🟦',
    difficulty: 'medium',
    explanation: 'Square has corners, others are round shapes'
  },
  {
    id: 4,
    type: 'odd-one-out',
    items: [
      { emoji: '1️⃣', name: 'One', category: 'number' },
      { emoji: '2️⃣', name: 'Two', category: 'number' },
      { emoji: '🅰️', name: 'Letter A', category: 'letter' },
      { emoji: '3️⃣', name: 'Three', category: 'number' }
    ],
    answer: '🅰️',
    difficulty: 'medium',
    explanation: 'A is a letter, others are numbers'
  },
  {
    id: 5,
    type: 'odd-one-out',
    items: [
      { emoji: '🔴', name: 'Red', category: 'color' },
      { emoji: '🔵', name: 'Blue', category: 'color' },
      { emoji: '🟢', name: 'Green', category: 'color' },
      { emoji: '⭐', name: 'Star', category: 'shape' }
    ],
    answer: '⭐',
    difficulty: 'hard',
    explanation: 'Star is a shape, others are colors'
  },
  {
    id: 6,
    type: 'odd-one-out',
    items: [
      { emoji: '☀️', name: 'Sun', category: 'hot' },
      { emoji: '🔥', name: 'Fire', category: 'hot' },
      { emoji: '❄️', name: 'Snow', category: 'cold' },
      { emoji: '🌶️', name: 'Pepper', category: 'hot' }
    ],
    answer: '❄️',
    difficulty: 'hard',
    explanation: 'Snow is cold, others are hot things'
  }
];

// Brain teaser riddles for kids
export const riddles = [
  {
    id: 1,
    riddle: 'I have hands but cannot clap. What am I?',
    answer: 'Clock',
    hint: 'I tell time',
    difficulty: 'easy'
  },
  {
    id: 2,
    riddle: 'What has a face and two hands but no arms or legs?',
    answer: 'Clock',
    hint: 'You look at me to know the time',
    difficulty: 'easy'
  },
  {
    id: 3,
    riddle: 'What goes up but never comes down?',
    answer: 'Age',
    hint: 'You get older',
    difficulty: 'medium'
  },
  {
    id: 4,
    riddle: 'I have keys but no locks. I have space but no room. What am I?',
    answer: 'Keyboard',
    hint: 'You type on me',
    difficulty: 'hard'
  }
];
