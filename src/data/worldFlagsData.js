// World Flags Module Data
// Countries, flags, and geography for kids

export const worldCountries = [
  // Popular countries kids should know
  { id: 'india', name: 'India', flag: '🇮🇳', capital: 'New Delhi', continent: 'Asia', emoji: '🐘', fact: 'Home to the Taj Mahal!' },
  { id: 'usa', name: 'United States', flag: '🇺🇸', capital: 'Washington DC', continent: 'North America', emoji: '🗽', fact: 'Has the Statue of Liberty!' },
  { id: 'china', name: 'China', flag: '🇨🇳', capital: 'Beijing', continent: 'Asia', emoji: '🐼', fact: 'Home to pandas and the Great Wall!' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', capital: 'London', continent: 'Europe', emoji: '👑', fact: 'Has Big Ben and Buckingham Palace!' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', capital: 'Tokyo', continent: 'Asia', emoji: '🗾', fact: 'Land of cherry blossoms!' },
  { id: 'france', name: 'France', flag: '🇫🇷', capital: 'Paris', continent: 'Europe', emoji: '🗼', fact: 'Home to the Eiffel Tower!' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', capital: 'Berlin', continent: 'Europe', emoji: '🏰', fact: 'Known for beautiful castles!' },
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷', capital: 'Brasília', continent: 'South America', emoji: '⚽', fact: 'Famous for football and carnival!' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', capital: 'Canberra', continent: 'Oceania', emoji: '🦘', fact: 'Home to kangaroos and koalas!' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', capital: 'Ottawa', continent: 'North America', emoji: '🍁', fact: 'Known for maple syrup!' },
  { id: 'russia', name: 'Russia', flag: '🇷🇺', capital: 'Moscow', continent: 'Europe', emoji: '❄️', fact: 'The largest country in the world!' },
  { id: 'italy', name: 'Italy', flag: '🇮🇹', capital: 'Rome', continent: 'Europe', emoji: '🍕', fact: 'Birthplace of pizza!' },
  { id: 'spain', name: 'Spain', flag: '🇪🇸', capital: 'Madrid', continent: 'Europe', emoji: '💃', fact: 'Known for flamenco dancing!' },
  { id: 'mexico', name: 'Mexico', flag: '🇲🇽', capital: 'Mexico City', continent: 'North America', emoji: '🌮', fact: 'Home to ancient pyramids!' },
  { id: 'egypt', name: 'Egypt', flag: '🇪🇬', capital: 'Cairo', continent: 'Africa', emoji: '🐪', fact: 'Land of the Pyramids!' },
  { id: 'south-africa', name: 'South Africa', flag: '🇿🇦', capital: 'Pretoria', continent: 'Africa', emoji: '🦁', fact: 'Home to many wild animals!' },
  { id: 'south-korea', name: 'South Korea', flag: '🇰🇷', capital: 'Seoul', continent: 'Asia', emoji: '🎮', fact: 'Known for technology and K-pop!' },
  { id: 'argentina', name: 'Argentina', flag: '🇦🇷', capital: 'Buenos Aires', continent: 'South America', emoji: '🥩', fact: 'Famous for tango dancing!' },
  { id: 'thailand', name: 'Thailand', flag: '🇹🇭', capital: 'Bangkok', continent: 'Asia', emoji: '🐘', fact: 'Land of elephants!' },
  { id: 'greece', name: 'Greece', flag: '🇬🇷', capital: 'Athens', continent: 'Europe', emoji: '🏛️', fact: 'Birthplace of the Olympics!' }
];

export const continents = [
  { name: 'Asia', emoji: '🌏', color: 'from-orange-400 to-red-400', countries: 7 },
  { name: 'Europe', emoji: '🌍', color: 'from-blue-400 to-purple-400', countries: 7 },
  { name: 'Africa', emoji: '🌍', color: 'from-yellow-400 to-orange-400', countries: 2 },
  { name: 'North America', emoji: '🌎', color: 'from-green-400 to-blue-400', countries: 3 },
  { name: 'South America', emoji: '🌎', color: 'from-pink-400 to-red-400', countries: 2 },
  { name: 'Oceania', emoji: '🌏', color: 'from-cyan-400 to-blue-400', countries: 1 }
];

export const landmarks = [
  { country: 'India', landmark: 'Taj Mahal', emoji: '🕌', description: 'A beautiful white marble monument' },
  { country: 'France', landmark: 'Eiffel Tower', emoji: '🗼', description: 'An iconic iron tower in Paris' },
  { country: 'United States', landmark: 'Statue of Liberty', emoji: '🗽', description: 'A symbol of freedom' },
  { country: 'China', landmark: 'Great Wall', emoji: '🏯', description: 'The longest wall in the world' },
  { country: 'Egypt', landmark: 'Pyramids', emoji: '🔺', description: 'Ancient Egyptian tombs' },
  { country: 'Australia', landmark: 'Sydney Opera House', emoji: '🎭', description: 'A unique performing arts center' },
  { country: 'Italy', landmark: 'Leaning Tower of Pisa', emoji: '🗼', description: 'A famous tilted tower' },
  { country: 'United Kingdom', landmark: 'Big Ben', emoji: '🕰️', description: 'A historic clock tower' }
];

export const flagQuiz = [
  { question: 'Which country has this flag? 🇮🇳', options: ['India', 'Ireland', 'Italy'], answer: 'India', difficulty: 'easy' },
  { question: 'Which country has this flag? 🇺🇸', options: ['UK', 'USA', 'Australia'], answer: 'USA', difficulty: 'easy' },
  { question: 'Which country has this flag? 🇯🇵', options: ['Japan', 'China', 'Korea'], answer: 'Japan', difficulty: 'easy' },
  { question: 'Which country has this flag? 🇫🇷', options: ['France', 'Russia', 'Netherlands'], answer: 'France', difficulty: 'medium' },
  { question: 'Which country has this flag? 🇦🇺', options: ['Austria', 'Australia', 'Argentina'], answer: 'Australia', difficulty: 'medium' },
  { question: 'Which country has this flag? 🇧🇷', options: ['Brazil', 'Belgium', 'Bulgaria'], answer: 'Brazil', difficulty: 'medium' },
  { question: 'Which country has this flag? 🇨🇦', options: ['China', 'Canada', 'Chile'], answer: 'Canada', difficulty: 'medium' },
  { question: 'Which country has this flag? 🇲🇽', options: ['Mexico', 'Malaysia', 'Monaco'], answer: 'Mexico', difficulty: 'hard' },
  { question: 'Which country has this flag? 🇩🇪', options: ['Denmark', 'Germany', 'Greece'], answer: 'Germany', difficulty: 'hard' },
  { question: 'Which country has this flag? 🇿🇦', options: ['Zimbabwe', 'Zambia', 'South Africa'], answer: 'South Africa', difficulty: 'hard' }
];

export const culturalFacts = [
  { country: 'India', fact: 'People celebrate colorful festivals like Diwali and Holi!', emoji: '🎆' },
  { country: 'Japan', fact: 'People greet each other by bowing!', emoji: '🙇' },
  { country: 'Mexico', fact: 'Celebrates Day of the Dead with colorful decorations!', emoji: '💀' },
  { country: 'China', fact: 'Chinese New Year is celebrated with dragon dances!', emoji: '🐉' },
  { country: 'Brazil', fact: 'Has the biggest carnival celebration in the world!', emoji: '🎭' },
  { country: 'Italy', fact: 'People love to eat pasta and gelato!', emoji: '🍝' },
  { country: 'Egypt', fact: 'Ancient Egyptians built amazing pyramids!', emoji: '🔺' },
  { country: 'Australia', fact: 'Home to unique animals not found anywhere else!', emoji: '🦘' }
];

export default {
  worldCountries,
  continents,
  landmarks,
  flagQuiz,
  culturalFacts
};
