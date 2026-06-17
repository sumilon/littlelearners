// Odd One Out Module Data
// Find the different item puzzles

export const oddOneOutPuzzles = {
  easy: [
    {
      id: 'animals-1',
      items: ['🐱', '🐶', '🐭', '🚗'],
      oddOne: '🚗',
      category: 'Animals',
      explanation: 'Car is not an animal!'
    },
    {
      id: 'fruits-1',
      items: ['🍎', '🍌', '🍊', '⚽'],
      oddOne: '⚽',
      category: 'Fruits',
      explanation: 'Ball is not a fruit!'
    },
    {
      id: 'colors-1',
      items: ['🔴', '🔵', '🟢', '🔢'],
      oddOne: '🔢',
      category: 'Colors',
      explanation: 'Numbers are not a color!'
    },
    {
      id: 'shapes-1',
      items: ['⭐', '🔺', '⭕', '🐕'],
      oddOne: '🐕',
      category: 'Shapes',
      explanation: 'Dog is not a shape!'
    },
    {
      id: 'vehicles-1',
      items: ['🚗', '🚌', '🚂', '🌸'],
      oddOne: '🌸',
      category: 'Vehicles',
      explanation: 'Flower is not a vehicle!'
    },
    {
      id: 'food-1',
      items: ['🍕', '🍔', '🌭', '📚'],
      oddOne: '📚',
      category: 'Food',
      explanation: 'Book is not food!'
    }
  ],
  medium: [
    {
      id: 'size-1',
      items: ['🐘', '🦒', '🦏', '🐜'],
      oddOne: '🐜',
      category: 'Size',
      explanation: 'Ant is much smaller!'
    },
    {
      id: 'numbers-1',
      items: ['2️⃣', '4️⃣', '6️⃣', '3️⃣'],
      oddOne: '3️⃣',
      category: 'Even Numbers',
      explanation: '3 is an odd number!'
    },
    {
      id: 'weather-1',
      items: ['☀️', '⛅', '🌤️', '🌊'],
      oddOne: '🌊',
      category: 'Weather',
      explanation: 'Wave is not weather!'
    },
    {
      id: 'fly-1',
      items: ['🐦', '🦅', '✈️', '🐕'],
      oddOne: '🐕',
      category: 'Can Fly',
      explanation: 'Dog cannot fly!'
    },
    {
      id: 'hot-1',
      items: ['☀️', '🔥', '🌶️', '❄️'],
      oddOne: '❄️',
      category: 'Hot Things',
      explanation: 'Snowflake is cold!'
    },
    {
      id: 'water-1',
      items: ['🐟', '🐙', '🦈', '🦁'],
      oddOne: '🦁',
      category: 'Sea Animals',
      explanation: 'Lion lives on land!'
    }
  ],
  hard: [
    {
      id: 'plural-1',
      items: ['cats', 'dogs', 'birds', 'fish'],
      oddOne: 'fish',
      category: 'Plural Words',
      explanation: 'Fish is both singular and plural!'
    },
    {
      id: 'vowels-1',
      items: ['A', 'E', 'I', 'B'],
      oddOne: 'B',
      category: 'Vowels',
      explanation: 'B is a consonant!'
    },
    {
      id: 'summer-1',
      items: ['☀️', '🏖️', '🍦', '⛄'],
      oddOne: '⛄',
      category: 'Summer',
      explanation: 'Snowman is for winter!'
    },
    {
      id: 'round-1',
      items: ['⚽', '🏀', '⭕', '📏'],
      oddOne: '📏',
      category: 'Round Things',
      explanation: 'Ruler is straight!'
    },
    {
      id: 'edible-1',
      items: ['🍎', '🍕', '🍰', '🪑'],
      oddOne: '🪑',
      category: 'Edible',
      explanation: 'Chair cannot be eaten!'
    },
    {
      id: 'prime-1',
      items: ['2', '3', '5', '4'],
      oddOne: '4',
      category: 'Prime Numbers',
      explanation: '4 is not a prime number!'
    }
  ]
};

export const categories = [
  { name: 'Animals', emoji: '🐾', color: 'from-orange-400 to-yellow-400' },
  { name: 'Fruits', emoji: '🍎', color: 'from-red-400 to-pink-400' },
  { name: 'Colors', emoji: '🎨', color: 'from-purple-400 to-pink-400' },
  { name: 'Shapes', emoji: '🔷', color: 'from-blue-400 to-cyan-400' },
  { name: 'Vehicles', emoji: '🚗', color: 'from-green-400 to-teal-400' },
  { name: 'Food', emoji: '🍕', color: 'from-yellow-400 to-orange-400' }
];

export const encouragementPhrases = [
  "You found it! 🎉",
  "Perfect! ⭐",
  "Great detective work! 🔍",
  "Brilliant! ✨",
  "You're amazing! 🌟",
  "Excellent! 👏",
  "Super smart! 🧠",
  "Fantastic! 🎊"
];

export default {
  oddOneOutPuzzles,
  categories,
  encouragementPhrases
};
