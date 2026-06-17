// Jigsaw Puzzle Module Data
// Simple grid-based puzzles for kids

export const puzzleCategories = {
  animals: {
    name: 'Animals',
    emoji: '🐾',
    color: 'from-orange-400 to-yellow-400',
    puzzles: [
      { id: 'cat', emoji: '🐱', name: 'Cat', gridSize: 2 },
      { id: 'dog', emoji: '🐶', name: 'Dog', gridSize: 2 },
      { id: 'lion', emoji: '🦁', name: 'Lion', gridSize: 3 },
      { id: 'elephant', emoji: '🐘', name: 'Elephant', gridSize: 3 },
      { id: 'monkey', emoji: '🐵', name: 'Monkey', gridSize: 3 },
      { id: 'tiger', emoji: '🐯', name: 'Tiger', gridSize: 4 }
    ]
  },
  fruits: {
    name: 'Fruits',
    emoji: '🍎',
    color: 'from-red-400 to-pink-400',
    puzzles: [
      { id: 'apple', emoji: '🍎', name: 'Apple', gridSize: 2 },
      { id: 'banana', emoji: '🍌', name: 'Banana', gridSize: 2 },
      { id: 'orange', emoji: '🍊', name: 'Orange', gridSize: 3 },
      { id: 'grapes', emoji: '🍇', name: 'Grapes', gridSize: 3 },
      { id: 'watermelon', emoji: '🍉', name: 'Watermelon', gridSize: 3 },
      { id: 'pineapple', emoji: '🍍', name: 'Pineapple', gridSize: 4 }
    ]
  },
  vehicles: {
    name: 'Vehicles',
    emoji: '🚗',
    color: 'from-blue-400 to-cyan-400',
    puzzles: [
      { id: 'car', emoji: '🚗', name: 'Car', gridSize: 2 },
      { id: 'bus', emoji: '🚌', name: 'Bus', gridSize: 2 },
      { id: 'train', emoji: '🚂', name: 'Train', gridSize: 3 },
      { id: 'airplane', emoji: '✈️', name: 'Airplane', gridSize: 3 },
      { id: 'boat', emoji: '🚢', name: 'Boat', gridSize: 3 },
      { id: 'rocket', emoji: '🚀', name: 'Rocket', gridSize: 4 }
    ]
  },
  nature: {
    name: 'Nature',
    emoji: '🌳',
    color: 'from-green-400 to-teal-400',
    puzzles: [
      { id: 'sun', emoji: '☀️', name: 'Sun', gridSize: 2 },
      { id: 'moon', emoji: '🌙', name: 'Moon', gridSize: 2 },
      { id: 'tree', emoji: '🌳', name: 'Tree', gridSize: 3 },
      { id: 'flower', emoji: '🌸', name: 'Flower', gridSize: 3 },
      { id: 'rainbow', emoji: '🌈', name: 'Rainbow', gridSize: 3 },
      { id: 'mountain', emoji: '⛰️', name: 'Mountain', gridSize: 4 }
    ]
  }
};

// Difficulty levels
export const difficultyLevels = {
  easy: { gridSize: 2, name: 'Easy', pieces: 4, stars: 2 },
  medium: { gridSize: 3, name: 'Medium', pieces: 9, stars: 3 },
  hard: { gridSize: 4, name: 'Hard', pieces: 16, stars: 5 }
};

// Generate puzzle pieces based on grid size
export const generatePuzzlePieces = (emoji, gridSize) => {
  const pieces = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      pieces.push({
        id: `piece-${row}-${col}`,
        row,
        col,
        correctPosition: row * gridSize + col,
        emoji: emoji
      });
    }
  }
  return pieces;
};

// Helper messages
export const encouragementMessages = [
  "Great job! 🎉",
  "You're doing amazing! ⭐",
  "Keep going! 💪",
  "Wonderful! 🌟",
  "Fantastic work! 🎊",
  "You're a puzzle master! 🏆",
  "Brilliant! ✨",
  "Perfect! 👏"
];

export default {
  puzzleCategories,
  difficultyLevels,
  generatePuzzlePieces,
  encouragementMessages
};
