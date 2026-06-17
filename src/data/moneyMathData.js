// Money Math Module Data
// Learning about money and currency (Indian Rupees)

export const indianCurrency = [
  { value: 1, name: '1 Rupee', type: 'coin', emoji: '🪙', color: 'from-yellow-600 to-yellow-400' },
  { value: 2, name: '2 Rupees', type: 'coin', emoji: '🪙', color: 'from-gray-400 to-gray-300' },
  { value: 5, name: '5 Rupees', type: 'coin', emoji: '🪙', color: 'from-yellow-500 to-yellow-300' },
  { value: 10, name: '10 Rupees', type: 'coin', emoji: '🪙', color: 'from-yellow-600 to-yellow-400' },
  { value: 10, name: '10 Rupees', type: 'note', emoji: '💵', color: 'from-orange-300 to-orange-200' },
  { value: 20, name: '20 Rupees', type: 'note', emoji: '💵', color: 'from-red-300 to-red-200' },
  { value: 50, name: '50 Rupees', type: 'note', emoji: '💵', color: 'from-purple-300 to-purple-200' },
  { value: 100, name: '100 Rupees', type: 'note', emoji: '💵', color: 'from-blue-300 to-blue-200' },
  { value: 200, name: '200 Rupees', type: 'note', emoji: '💵', color: 'from-yellow-300 to-yellow-200' },
  { value: 500, name: '500 Rupees', type: 'note', emoji: '💵', color: 'from-green-300 to-green-200' }
];

export const moneyProblems = {
  easy: [
    { question: 'Count the money', coins: [1, 1, 1], total: 3, options: [2, 3, 4], emoji: '🪙' },
    { question: 'Count the money', coins: [2, 2], total: 4, options: [3, 4, 5], emoji: '🪙' },
    { question: 'Count the money', coins: [5, 1], total: 6, options: [5, 6, 7], emoji: '🪙' },
    { question: 'Count the money', coins: [5, 5], total: 10, options: [8, 10, 12], emoji: '🪙' },
    { question: 'Count the money', coins: [10, 5], total: 15, options: [12, 15, 18], emoji: '🪙' },
    { question: 'Count the money', notes: [10, 10], total: 20, options: [15, 20, 25], emoji: '💵' }
  ],
  medium: [
    { question: 'Add the money', coins: [10, 5, 2, 1], total: 18, options: [16, 18, 20], emoji: '🪙' },
    { question: 'Add the money', notes: [20, 10, 5], total: 35, options: [30, 35, 40], emoji: '💵' },
    { question: 'Add the money', notes: [50, 10, 10], total: 70, options: [60, 70, 80], emoji: '💵' },
    { question: 'How much change?', problem: 'Buy for ₹15, gave ₹20', answer: 5, options: [3, 5, 7], emoji: '💰' },
    { question: 'How much change?', problem: 'Buy for ₹30, gave ₹50', answer: 20, options: [15, 20, 25], emoji: '💰' },
    { question: 'How much change?', problem: 'Buy for ₹45, gave ₹100', answer: 55, options: [50, 55, 60], emoji: '💰' }
  ],
  hard: [
    { question: 'Add the money', notes: [100, 50, 20, 10], total: 180, options: [170, 180, 190], emoji: '💵' },
    { question: 'Add the money', notes: [200, 100, 50], total: 350, options: [300, 350, 400], emoji: '💵' },
    { question: 'How much change?', problem: 'Buy for ₹175, gave ₹200', answer: 25, options: [20, 25, 30], emoji: '💰' },
    { question: 'How much change?', problem: 'Buy for ₹285, gave ₹500', answer: 215, options: [200, 215, 225], emoji: '💰' },
    { question: 'Shopping problem', problem: 'Buy 3 items: ₹50, ₹30, ₹20', answer: 100, options: [90, 100, 110], emoji: '🛒' },
    { question: 'Shopping problem', problem: 'Total ₹450, have ₹300. Need?', answer: 150, options: [120, 150, 180], emoji: '🛒' }
  ]
};

export const shoppingItems = [
  { id: 'apple', name: 'Apple', emoji: '🍎', price: 10 },
  { id: 'banana', name: 'Banana', emoji: '🍌', price: 5 },
  { id: 'candy', name: 'Candy', emoji: '🍬', price: 2 },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', price: 20 },
  { id: 'ice-cream', name: 'Ice Cream', emoji: '🍦', price: 30 },
  { id: 'juice', name: 'Juice', emoji: '🧃', price: 15 },
  { id: 'cookie', name: 'Cookie', emoji: '🍪', price: 5 },
  { id: 'cake', name: 'Cake', emoji: '🍰', price: 50 },
  { id: 'pizza', name: 'Pizza Slice', emoji: '🍕', price: 40 },
  { id: 'burger', name: 'Burger', emoji: '🍔', price: 35 },
  { id: 'pencil', name: 'Pencil', emoji: '✏️', price: 5 },
  { id: 'book', name: 'Book', emoji: '📚', price: 50 },
  { id: 'toy-car', name: 'Toy Car', emoji: '🚗', price: 100 },
  { id: 'ball', name: 'Ball', emoji: '⚽', price: 80 },
  { id: 'teddy', name: 'Teddy Bear', emoji: '🧸', price: 150 }
];

export const savingGoals = [
  { name: 'Toy Car', emoji: '🚗', cost: 100, description: 'Save to buy a toy car!' },
  { name: 'Bicycle', emoji: '🚲', cost: 500, description: 'Save for a new bicycle!' },
  { name: 'Video Game', emoji: '🎮', cost: 300, description: 'Buy your favorite game!' },
  { name: 'Books', emoji: '📚', cost: 200, description: 'Get new story books!' },
  { name: 'Football', emoji: '⚽', cost: 150, description: 'Get a new football!' }
];

export const moneyLessons = [
  { title: 'Earning', emoji: '💼', lesson: 'We earn money by doing work or chores!' },
  { title: 'Saving', emoji: '🏦', lesson: 'Save money for things you want in the future!' },
  { title: 'Spending', emoji: '🛍️', lesson: 'Spend money wisely on things you need!' },
  { title: 'Sharing', emoji: '🤝', lesson: 'Help others by sharing and donating!' },
  { title: 'Counting', emoji: '🔢', lesson: 'Always count your money carefully!' },
  { title: 'Budget', emoji: '📊', lesson: 'Plan how to use your money before spending!' }
];

export const earnMoneyActivities = [
  { activity: 'Help with dishes', emoji: '🍽️', earn: 10 },
  { activity: 'Clean your room', emoji: '🧹', earn: 20 },
  { activity: 'Water plants', emoji: '🌱', earn: 15 },
  { activity: 'Feed pets', emoji: '🐕', earn: 10 },
  { activity: 'Help with laundry', emoji: '👕', earn: 15 },
  { activity: 'Study well', emoji: '📖', earn: 50 },
  { activity: 'Help parents', emoji: '❤️', earn: 25 }
];

export default {
  indianCurrency,
  moneyProblems,
  shoppingItems,
  savingGoals,
  moneyLessons,
  earnMoneyActivities
};
