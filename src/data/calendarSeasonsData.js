// Calendar & Seasons Module Data

export const daysOfWeek = [
  { name: 'Sunday', short: 'Sun', emoji: '☀️', color: 'from-yellow-400 to-orange-400' },
  { name: 'Monday', short: 'Mon', emoji: '🌙', color: 'from-blue-400 to-indigo-400' },
  { name: 'Tuesday', short: 'Tue', emoji: '🔥', color: 'from-red-400 to-pink-400' },
  { name: 'Wednesday', short: 'Wed', emoji: '🌳', color: 'from-green-400 to-emerald-400' },
  { name: 'Thursday', short: 'Thu', emoji: '⚡', color: 'from-purple-400 to-violet-400' },
  { name: 'Friday', short: 'Fri', emoji: '🎉', color: 'from-pink-400 to-rose-400' },
  { name: 'Saturday', short: 'Sat', emoji: '🎮', color: 'from-cyan-400 to-blue-400' }
];

export const months = [
  { 
    name: 'January', 
    short: 'Jan', 
    number: 1, 
    days: 31, 
    season: 'Winter',
    emoji: '❄️',
    color: 'from-blue-300 to-cyan-300',
    description: 'The first month of the year, often cold and snowy'
  },
  { 
    name: 'February', 
    short: 'Feb', 
    number: 2, 
    days: 28, 
    season: 'Winter',
    emoji: '💝',
    color: 'from-pink-300 to-red-300',
    description: 'The shortest month, with Valentine\'s Day'
  },
  { 
    name: 'March', 
    short: 'Mar', 
    number: 3, 
    days: 31, 
    season: 'Spring',
    emoji: '🌷',
    color: 'from-green-300 to-lime-300',
    description: 'Spring begins! Flowers start to bloom'
  },
  { 
    name: 'April', 
    short: 'Apr', 
    number: 4, 
    days: 30, 
    season: 'Spring',
    emoji: '🌧️',
    color: 'from-blue-300 to-green-300',
    description: 'April showers bring May flowers'
  },
  { 
    name: 'May', 
    short: 'May', 
    number: 5, 
    days: 31, 
    season: 'Spring',
    emoji: '🌺',
    color: 'from-pink-300 to-purple-300',
    description: 'Beautiful flowers everywhere!'
  },
  { 
    name: 'June', 
    short: 'Jun', 
    number: 6, 
    days: 30, 
    season: 'Summer',
    emoji: '☀️',
    color: 'from-yellow-300 to-orange-300',
    description: 'Summer begins! School is out!'
  },
  { 
    name: 'July', 
    short: 'Jul', 
    number: 7, 
    days: 31, 
    season: 'Summer',
    emoji: '🎆',
    color: 'from-red-300 to-blue-300',
    description: 'Hot summer days and fireworks'
  },
  { 
    name: 'August', 
    short: 'Aug', 
    number: 8, 
    days: 31, 
    season: 'Summer',
    emoji: '🏖️',
    color: 'from-orange-300 to-yellow-300',
    description: 'Beach time and summer fun!'
  },
  { 
    name: 'September', 
    short: 'Sep', 
    number: 9, 
    days: 30, 
    season: 'Fall',
    emoji: '🍂',
    color: 'from-orange-300 to-red-300',
    description: 'Fall begins! Back to school!'
  },
  { 
    name: 'October', 
    short: 'Oct', 
    number: 10, 
    days: 31, 
    season: 'Fall',
    emoji: '🎃',
    color: 'from-orange-400 to-red-400',
    description: 'Leaves change colors and Halloween!'
  },
  { 
    name: 'November', 
    short: 'Nov', 
    number: 11, 
    days: 30, 
    season: 'Fall',
    emoji: '🦃',
    color: 'from-yellow-400 to-brown-400',
    description: 'Thanksgiving and giving thanks'
  },
  { 
    name: 'December', 
    short: 'Dec', 
    number: 12, 
    days: 31, 
    season: 'Winter',
    emoji: '🎄',
    color: 'from-red-400 to-green-400',
    description: 'Winter holidays and snow!'
  }
];

export const seasons = [
  {
    name: 'Winter',
    emoji: '❄️',
    months: ['December', 'January', 'February'],
    color: 'from-blue-400 to-cyan-400',
    description: 'Cold weather, snow, and cozy days',
    activities: ['Build snowmen', 'Drink hot cocoa', 'Celebrate holidays']
  },
  {
    name: 'Spring',
    emoji: '🌸',
    months: ['March', 'April', 'May'],
    color: 'from-green-400 to-pink-400',
    description: 'Flowers bloom, warmer weather arrives',
    activities: ['Plant gardens', 'See baby animals', 'Fly kites']
  },
  {
    name: 'Summer',
    emoji: '☀️',
    months: ['June', 'July', 'August'],
    color: 'from-yellow-400 to-orange-400',
    description: 'Hot sunny days, vacation time',
    activities: ['Go swimming', 'Have picnics', 'Play outside']
  },
  {
    name: 'Fall',
    emoji: '🍁',
    months: ['September', 'October', 'November'],
    color: 'from-orange-400 to-red-400',
    description: 'Leaves change colors, cooler weather',
    activities: ['Jump in leaves', 'Pick apples', 'Wear sweaters']
  }
];

export const daysQuiz = [
  {
    question: 'What day comes after Monday?',
    options: ['Tuesday', 'Wednesday', 'Sunday', 'Friday'],
    correct: 'Tuesday'
  },
  {
    question: 'What day comes before Friday?',
    options: ['Thursday', 'Saturday', 'Wednesday', 'Monday'],
    correct: 'Thursday'
  },
  {
    question: 'What is the first day of the week?',
    options: ['Sunday', 'Monday', 'Saturday', 'Tuesday'],
    correct: 'Sunday'
  },
  {
    question: 'What is the last day of the week?',
    options: ['Saturday', 'Sunday', 'Friday', 'Thursday'],
    correct: 'Saturday'
  },
  {
    question: 'What day comes after Wednesday?',
    options: ['Thursday', 'Tuesday', 'Friday', 'Saturday'],
    correct: 'Thursday'
  },
  {
    question: 'What day comes before Sunday?',
    options: ['Saturday', 'Friday', 'Monday', 'Thursday'],
    correct: 'Saturday'
  },
  {
    question: 'Which day is in the middle of the week?',
    options: ['Wednesday', 'Thursday', 'Tuesday', 'Friday'],
    correct: 'Wednesday'
  },
  {
    question: 'What day comes after Saturday?',
    options: ['Sunday', 'Monday', 'Friday', 'Thursday'],
    correct: 'Sunday'
  }
];

export const timeWords = [
  { word: 'Yesterday', emoji: '⏮️', definition: 'The day before today' },
  { word: 'Today', emoji: '📅', definition: 'This day, right now' },
  { word: 'Tomorrow', emoji: '⏭️', definition: 'The day after today' },
  { word: 'Week', emoji: '📆', definition: '7 days in a row' },
  { word: 'Weekend', emoji: '🎉', definition: 'Saturday and Sunday' },
  { word: 'Year', emoji: '🗓️', definition: '12 months or 365 days' },
  { word: 'Birthday', emoji: '🎂', definition: 'The day you were born' },
  { word: 'Holiday', emoji: '🎈', definition: 'A special celebration day' }
];

export const calendarFacts = [
  'There are 7 days in a week! 🗓️',
  'There are 12 months in a year! 📅',
  'Most months have 30 or 31 days! 📆',
  'February is the shortest month with 28 days! 💝',
  'A year has 365 days! 🎉',
  'There are 4 seasons that repeat every year! 🌍',
  'Sunday is the first day of the week! ☀️',
  'Saturday is the last day of the week! 🎮',
  'Each season lasts about 3 months! 🍂',
  'Your birthday comes once every year! 🎂'
];
