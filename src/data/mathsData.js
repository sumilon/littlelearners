// Maths Module Data

// Numbers 0-20 with pronunciations and emoji representations
export const numbers = [
  { number: 0, word: 'Zero', emoji: '⭕', pronunciation: 'zee-roh' },
  { number: 1, word: 'One', emoji: '1️⃣', countEmoji: '🍎', pronunciation: 'wun' },
  { number: 2, word: 'Two', emoji: '2️⃣', countEmoji: '🍎', pronunciation: 'too' },
  { number: 3, word: 'Three', emoji: '3️⃣', countEmoji: '🍎', pronunciation: 'three' },
  { number: 4, word: 'Four', emoji: '4️⃣', countEmoji: '⭐', pronunciation: 'for' },
  { number: 5, word: 'Five', emoji: '5️⃣', countEmoji: '⭐', pronunciation: 'five' },
  { number: 6, word: 'Six', emoji: '6️⃣', countEmoji: '⭐', pronunciation: 'six' },
  { number: 7, word: 'Seven', emoji: '7️⃣', countEmoji: '🌸', pronunciation: 'sev-en' },
  { number: 8, word: 'Eight', emoji: '8️⃣', countEmoji: '🌸', pronunciation: 'ate' },
  { number: 9, word: 'Nine', emoji: '9️⃣', countEmoji: '🌸', pronunciation: 'nine' },
  { number: 10, word: 'Ten', emoji: '🔟', countEmoji: '🎈', pronunciation: 'ten' },
  { number: 11, word: 'Eleven', emoji: '1️⃣1️⃣', countEmoji: '🎈', pronunciation: 'ee-lev-en' },
  { number: 12, word: 'Twelve', emoji: '1️⃣2️⃣', countEmoji: '🎈', pronunciation: 'twelv' },
  { number: 13, word: 'Thirteen', emoji: '1️⃣3️⃣', countEmoji: '🍓', pronunciation: 'thur-teen' },
  { number: 14, word: 'Fourteen', emoji: '1️⃣4️⃣', countEmoji: '🍓', pronunciation: 'for-teen' },
  { number: 15, word: 'Fifteen', emoji: '1️⃣5️⃣', countEmoji: '🍓', pronunciation: 'fif-teen' },
  { number: 16, word: 'Sixteen', emoji: '1️⃣6️⃣', countEmoji: '🦋', pronunciation: 'six-teen' },
  { number: 17, word: 'Seventeen', emoji: '1️⃣7️⃣', countEmoji: '🦋', pronunciation: 'sev-en-teen' },
  { number: 18, word: 'Eighteen', emoji: '1️⃣8️⃣', countEmoji: '🦋', pronunciation: 'ate-teen' },
  { number: 19, word: 'Nineteen', emoji: '1️⃣9️⃣', countEmoji: '🌻', pronunciation: 'nine-teen' },
  { number: 20, word: 'Twenty', emoji: '2️⃣0️⃣', countEmoji: '🌻', pronunciation: 'twen-tee' }
];

// Counting objects with different emojis
export const countingObjects = [
  { emoji: '🍎', name: 'Apples', color: 'red' },
  { emoji: '⭐', name: 'Stars', color: 'yellow' },
  { emoji: '🌸', name: 'Flowers', color: 'pink' },
  { emoji: '🎈', name: 'Balloons', color: 'blue' },
  { emoji: '🍓', name: 'Strawberries', color: 'red' },
  { emoji: '🦋', name: 'Butterflies', color: 'purple' },
  { emoji: '🌻', name: 'Sunflowers', color: 'yellow' },
  { emoji: '🐝', name: 'Bees', color: 'orange' },
  { emoji: '🍌', name: 'Bananas', color: 'yellow' },
  { emoji: '🎁', name: 'Gifts', color: 'green' }
];

// Addition problems (single digit, result <= 10)
export const additionProblems = [
  { num1: 1, num2: 1, answer: 2, emoji: '🍎' },
  { num1: 1, num2: 2, answer: 3, emoji: '⭐' },
  { num1: 2, num2: 2, answer: 4, emoji: '🌸' },
  { num1: 2, num2: 3, answer: 5, emoji: '🎈' },
  { num1: 3, num2: 3, answer: 6, emoji: '🍓' },
  { num1: 3, num2: 4, answer: 7, emoji: '🦋' },
  { num1: 4, num2: 4, answer: 8, emoji: '🌻' },
  { num1: 4, num2: 5, answer: 9, emoji: '🐝' },
  { num1: 5, num2: 5, answer: 10, emoji: '🍌' },
  { num1: 1, num2: 3, answer: 4, emoji: '🎁' },
  { num1: 2, num2: 4, answer: 6, emoji: '🍎' },
  { num1: 3, num2: 5, answer: 8, emoji: '⭐' },
  { num1: 1, num2: 4, answer: 5, emoji: '🌸' },
  { num1: 2, num2: 5, answer: 7, emoji: '🎈' },
  { num1: 4, num2: 3, answer: 7, emoji: '🍓' },
  { num1: 5, num2: 4, answer: 9, emoji: '🦋' },
  { num1: 5, num2: 3, answer: 8, emoji: '🌻' },
  { num1: 5, num2: 2, answer: 7, emoji: '🐝' },
  { num1: 4, num2: 2, answer: 6, emoji: '🍌' },
  { num1: 3, num2: 2, answer: 5, emoji: '🎁' }
];

// Subtraction problems (simple, no negatives)
export const subtractionProblems = [
  { num1: 2, num2: 1, answer: 1, emoji: '🍎' },
  { num1: 3, num2: 1, answer: 2, emoji: '⭐' },
  { num1: 4, num2: 2, answer: 2, emoji: '🌸' },
  { num1: 5, num2: 2, answer: 3, emoji: '🎈' },
  { num1: 6, num2: 3, answer: 3, emoji: '🍓' },
  { num1: 7, num2: 3, answer: 4, emoji: '🦋' },
  { num1: 8, num2: 4, answer: 4, emoji: '🌻' },
  { num1: 9, num2: 4, answer: 5, emoji: '🐝' },
  { num1: 10, num2: 5, answer: 5, emoji: '🍌' },
  { num1: 5, num2: 1, answer: 4, emoji: '🎁' },
  { num1: 6, num2: 2, answer: 4, emoji: '🍎' },
  { num1: 7, num2: 2, answer: 5, emoji: '⭐' },
  { num1: 8, num2: 3, answer: 5, emoji: '🌸' },
  { num1: 9, num2: 3, answer: 6, emoji: '🎈' },
  { num1: 10, num2: 4, answer: 6, emoji: '🍓' },
  { num1: 7, num2: 4, answer: 3, emoji: '🦋' },
  { num1: 8, num2: 5, answer: 3, emoji: '🌻' },
  { num1: 9, num2: 5, answer: 4, emoji: '🐝' },
  { num1: 10, num2: 3, answer: 7, emoji: '🍌' },
  { num1: 6, num2: 4, answer: 2, emoji: '🎁' }
];

// Shapes data
export const shapes = [
  { name: 'Circle', emoji: '⭕', sides: 0, color: 'red' },
  { name: 'Square', emoji: '🟦', sides: 4, color: 'blue' },
  { name: 'Triangle', emoji: '🔺', sides: 3, color: 'red' },
  { name: 'Rectangle', emoji: '🟩', sides: 4, color: 'green' },
  { name: 'Star', emoji: '⭐', sides: 5, color: 'yellow' },
  { name: 'Heart', emoji: '❤️', sides: 0, color: 'red' }
];

// Number comparison words
export const comparisonWords = [
  { word: 'Greater', symbol: '>', emoji: '🔼' },
  { word: 'Smaller', symbol: '<', emoji: '🔽' },
  { word: 'Equal', symbol: '=', emoji: '⚖️' }
];
