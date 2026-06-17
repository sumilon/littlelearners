// Helper functions for games and quizzes

// Fisher-Yates shuffle algorithm
export const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Alias for shuffleArray (for backward compatibility)
export const shuffleArray = shuffle;

// Get random item from array
export const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Get multiple random items from array (without duplicates)
export const randomItems = (array, count) => {
  const shuffled = shuffle(array);
  return shuffled.slice(0, count);
};

// Generate wrong answers for multiple choice
export const generateWrongAnswers = (correctAnswer, allOptions, count = 3) => {
  const wrongOptions = allOptions.filter(option => option !== correctAnswer);
  return randomItems(wrongOptions, count);
};

// Create multiple choice options
export const createMultipleChoice = (correctAnswer, wrongAnswers) => {
  const options = [correctAnswer, ...wrongAnswers];
  return shuffle(options);
};

// Check if two arrays are equal (for sorting games)
export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
};

// Generate random number in range
export const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate simple math problem
export const generateMathProblem = (type = 'addition', maxNumber = 10) => {
  const num1 = randomRange(1, maxNumber);
  const num2 = randomRange(1, maxNumber);

  switch (type) {
    case 'addition':
      return {
        num1,
        num2,
        operator: '+',
        answer: num1 + num2,
        question: `${num1} + ${num2}`,
      };
    case 'subtraction':
      // Ensure result is positive
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      return {
        num1: larger,
        num2: smaller,
        operator: '-',
        answer: larger - smaller,
        question: `${larger} - ${smaller}`,
      };
    default:
      return null;
  }
};

// Format time (for activity log)
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

// Format date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Clamp value between min and max
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

// Get emoji for score/performance
export const getPerformanceEmoji = (percentage) => {
  if (percentage >= 90) return '🌟';
  if (percentage >= 75) return '⭐';
  if (percentage >= 60) return '👍';
  if (percentage >= 50) return '👌';
  return '💪';
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Chunk array into smaller arrays
export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Get random mascot emoji
export const getRandomMascot = () => {
  const mascots = ['🦉', '🐯', '🦁', '🐸', '🦋', '🐬', '🦊', '🐨', '🐼', '🦄'];
  return randomItem(mascots);
};

// Get congratulatory message
export const getCongratulationMessage = () => {
  const messages = [
    'Amazing! 🎉',
    'Fantastic! 🌟',
    'Well done! 👏',
    'Brilliant! ✨',
    'Superb! 🏆',
    'Excellent! 💯',
    'Outstanding! 🎊',
    'Wonderful! 🎈',
  ];
  return randomItem(messages);
};

// Get encouragement message
export const getEncouragementMessage = () => {
  const messages = [
    'Keep trying! 💪',
    'You can do it! 🌈',
    'Don\'t give up! ⭐',
    'Try again! 🎯',
    'Almost there! 🚀',
    'One more time! 🌟',
  ];
  return randomItem(messages);
};
