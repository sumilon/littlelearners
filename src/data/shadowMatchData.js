// Shadow Match Module Data
// Matching objects with their shadows

export const shadowPuzzles = {
  easy: [
    {
      id: 'cat',
      object: { emoji: '🐱', name: 'Cat' },
      shadows: ['🐱', '🐶', '🐭'],
      correctIndex: 0,
      category: 'Animals'
    },
    {
      id: 'apple',
      object: { emoji: '🍎', name: 'Apple' },
      shadows: ['🍌', '🍎', '🍊'],
      correctIndex: 1,
      category: 'Fruits'
    },
    {
      id: 'star',
      object: { emoji: '⭐', name: 'Star' },
      shadows: ['⭐', '⭕', '🔺'],
      correctIndex: 0,
      category: 'Shapes'
    },
    {
      id: 'car',
      object: { emoji: '🚗', name: 'Car' },
      shadows: ['🚌', '🚗', '🚂'],
      correctIndex: 1,
      category: 'Vehicles'
    },
    {
      id: 'tree',
      object: { emoji: '🌳', name: 'Tree' },
      shadows: ['🌳', '🌸', '🌺'],
      correctIndex: 0,
      category: 'Nature'
    },
    {
      id: 'house',
      object: { emoji: '🏠', name: 'House' },
      shadows: ['🏫', '🏠', '🏰'],
      correctIndex: 1,
      category: 'Buildings'
    }
  ],
  medium: [
    {
      id: 'elephant',
      object: { emoji: '🐘', name: 'Elephant' },
      shadows: ['🐘', '🦏', '🦒', '🦛'],
      correctIndex: 0,
      category: 'Animals'
    },
    {
      id: 'airplane',
      object: { emoji: '✈️', name: 'Airplane' },
      shadows: ['🚁', '🚀', '✈️', '🛩️'],
      correctIndex: 2,
      category: 'Vehicles'
    },
    {
      id: 'guitar',
      object: { emoji: '🎸', name: 'Guitar' },
      shadows: ['🎹', '🎸', '🎺', '🥁'],
      correctIndex: 1,
      category: 'Instruments'
    },
    {
      id: 'umbrella',
      object: { emoji: '☂️', name: 'Umbrella' },
      shadows: ['⛱️', '☂️', '🏖️', '🌂'],
      correctIndex: 1,
      category: 'Objects'
    },
    {
      id: 'crown',
      object: { emoji: '👑', name: 'Crown' },
      shadows: ['🎩', '👑', '⛑️', '🎓'],
      correctIndex: 1,
      category: 'Objects'
    },
    {
      id: 'rocket',
      object: { emoji: '🚀', name: 'Rocket' },
      shadows: ['✈️', '🛸', '🚀', '🛩️'],
      correctIndex: 2,
      category: 'Space'
    }
  ],
  hard: [
    {
      id: 'butterfly',
      object: { emoji: '🦋', name: 'Butterfly' },
      shadows: ['🦋', '🐝', '🪲', '🐛', '🪰'],
      correctIndex: 0,
      category: 'Insects'
    },
    {
      id: 'castle',
      object: { emoji: '🏰', name: 'Castle' },
      shadows: ['🏛️', '🏰', '🕌', '⛪', '🏯'],
      correctIndex: 1,
      category: 'Buildings'
    },
    {
      id: 'dragon',
      object: { emoji: '🐉', name: 'Dragon' },
      shadows: ['🦎', '🐊', '🐉', '🦖', '🐍'],
      correctIndex: 2,
      category: 'Fantasy'
    },
    {
      id: 'trophy',
      object: { emoji: '🏆', name: 'Trophy' },
      shadows: ['🥇', '🏅', '🏆', '🎖️', '🥈'],
      correctIndex: 2,
      category: 'Awards'
    },
    {
      id: 'volcano',
      object: { emoji: '🌋', name: 'Volcano' },
      shadows: ['⛰️', '🏔️', '🌋', '🗻', '⛱️'],
      correctIndex: 2,
      category: 'Nature'
    },
    {
      id: 'diamond',
      object: { emoji: '💎', name: 'Diamond' },
      shadows: ['💍', '📿', '💎', '👑', '⭐'],
      correctIndex: 2,
      category: 'Treasures'
    }
  ]
};

export const categories = [
  { name: 'Animals', emoji: '🐾', color: 'from-orange-400 to-yellow-400' },
  { name: 'Fruits', emoji: '🍎', color: 'from-red-400 to-pink-400' },
  { name: 'Vehicles', emoji: '🚗', color: 'from-blue-400 to-cyan-400' },
  { name: 'Shapes', emoji: '🔷', color: 'from-purple-400 to-pink-400' },
  { name: 'Nature', emoji: '🌳', color: 'from-green-400 to-teal-400' },
  { name: 'Objects', emoji: '🎁', color: 'from-yellow-400 to-orange-400' }
];

export const animalShadows = [
  { animal: '🐱', shadow: '⬛', name: 'Cat' },
  { animal: '🐶', shadow: '⬛', name: 'Dog' },
  { animal: '🐘', shadow: '⬛', name: 'Elephant' },
  { animal: '🦒', shadow: '⬛', name: 'Giraffe' },
  { animal: '🦁', shadow: '⬛', name: 'Lion' },
  { animal: '🐯', shadow: '⬛', name: 'Tiger' },
  { animal: '🐼', shadow: '⬛', name: 'Panda' },
  { animal: '🐻', shadow: '⬛', name: 'Bear' },
  { animal: '🐰', shadow: '⬛', name: 'Rabbit' },
  { animal: '🦊', shadow: '⬛', name: 'Fox' }
];

export const shapeShadows = [
  { shape: '⭐', name: 'Star', sides: 5 },
  { shape: '⭕', name: 'Circle', sides: 0 },
  { shape: '🔺', name: 'Triangle', sides: 3 },
  { shape: '🟦', name: 'Square', sides: 4 },
  { shape: '❤️', name: 'Heart', sides: 0 },
  { shape: '💎', name: 'Diamond', sides: 4 }
];

export const encouragement = [
  "Perfect match! 🎉",
  "You found it! ⭐",
  "Great work! ✨",
  "Excellent! 👏",
  "Amazing! 🌟",
  "Brilliant! 💫",
  "Superb! 🎊",
  "Fantastic! 🏆"
];

export const timeBasedChallenges = [
  { name: 'Morning Shadows', time: 'morning', description: 'Shadows are long in the morning!', emoji: '🌅' },
  { name: 'Noon Shadows', time: 'noon', description: 'Shadows are shortest at noon!', emoji: '☀️' },
  { name: 'Evening Shadows', time: 'evening', description: 'Shadows grow long in the evening!', emoji: '🌆' },
  { name: 'Night Time', time: 'night', description: 'Shadows need light to appear!', emoji: '🌙' }
];

export const silhouetteGames = [
  {
    id: 'guess-animal',
    title: 'Guess the Animal',
    type: 'silhouette',
    items: ['🐱', '🐶', '🐘', '🦁', '🐯', '🦒']
  },
  {
    id: 'guess-fruit',
    title: 'Guess the Fruit',
    type: 'silhouette',
    items: ['🍎', '🍌', '🍊', '🍇', '🍉', '🍓']
  },
  {
    id: 'guess-vehicle',
    title: 'Guess the Vehicle',
    type: 'silhouette',
    items: ['🚗', '🚌', '✈️', '🚂', '🚢', '🚀']
  }
];

export default {
  shadowPuzzles,
  categories,
  animalShadows,
  shapeShadows,
  encouragement,
  timeBasedChallenges,
  silhouetteGames
};
