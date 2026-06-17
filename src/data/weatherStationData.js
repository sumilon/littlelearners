// Weather Station Module Data

export const weatherTypes = [
  {
    id: 'sunny',
    name: 'Sunny',
    emoji: '☀️',
    description: 'The sun is shining brightly! It\'s a beautiful day.',
    temperature: 'hot',
    correctClothes: ['tshirt', 'shorts', 'sunglasses', 'hat'],
    backgroundColor: 'from-yellow-300 via-orange-200 to-blue-300',
    facts: [
      'Sunny days are great for playing outside!',
      'The sun gives us light and warmth.',
      'Always wear sunscreen on sunny days!'
    ]
  },
  {
    id: 'rainy',
    name: 'Rainy',
    emoji: '🌧️',
    description: 'It\'s raining! Water is falling from the clouds.',
    temperature: 'cool',
    correctClothes: ['raincoat', 'boots', 'umbrella'],
    backgroundColor: 'from-gray-400 via-blue-300 to-gray-500',
    facts: [
      'Rain helps plants grow big and strong!',
      'Raindrops form in clouds high in the sky.',
      'Rain fills rivers, lakes, and oceans.'
    ]
  },
  {
    id: 'snowy',
    name: 'Snowy',
    emoji: '❄️',
    description: 'Snow is falling! Everything is covered in white.',
    temperature: 'cold',
    correctClothes: ['jacket', 'scarf', 'gloves', 'boots'],
    backgroundColor: 'from-white via-blue-100 to-gray-200',
    facts: [
      'Snowflakes are made of ice crystals.',
      'Every snowflake has a unique shape!',
      'Snow keeps the ground warm in winter.'
    ]
  },
  {
    id: 'cloudy',
    name: 'Cloudy',
    emoji: '☁️',
    description: 'The sky is covered with clouds today.',
    temperature: 'mild',
    correctClothes: ['sweater', 'pants'],
    backgroundColor: 'from-gray-300 via-gray-400 to-blue-200',
    facts: [
      'Clouds are made of tiny water droplets.',
      'Cloudy days can be cool and comfortable.',
      'Clouds can block the sun\'s heat.'
    ]
  },
  {
    id: 'windy',
    name: 'Windy',
    emoji: '💨',
    description: 'The wind is blowing strongly today!',
    temperature: 'cool',
    correctClothes: ['jacket', 'pants'],
    backgroundColor: 'from-blue-200 via-gray-300 to-blue-400',
    facts: [
      'Wind is moving air that we can feel.',
      'Wind can help fly kites and turn windmills!',
      'Strong winds can move clouds across the sky.'
    ]
  }
];

export const clothingItems = [
  { id: 'tshirt', name: 'T-Shirt', emoji: '👕', category: 'top' },
  { id: 'sweater', name: 'Sweater', emoji: '🧥', category: 'top' },
  { id: 'jacket', name: 'Jacket', emoji: '🧥', category: 'top' },
  { id: 'raincoat', name: 'Raincoat', emoji: '🧥', category: 'top' },
  { id: 'shorts', name: 'Shorts', emoji: '🩳', category: 'bottom' },
  { id: 'pants', name: 'Pants', emoji: '👖', category: 'bottom' },
  { id: 'boots', name: 'Boots', emoji: '🥾', category: 'shoes' },
  { id: 'sunglasses', name: 'Sunglasses', emoji: '🕶️', category: 'accessory' },
  { id: 'hat', name: 'Hat', emoji: '🧢', category: 'accessory' },
  { id: 'scarf', name: 'Scarf', emoji: '🧣', category: 'accessory' },
  { id: 'gloves', name: 'Gloves', emoji: '🧤', category: 'accessory' },
  { id: 'umbrella', name: 'Umbrella', emoji: '☂️', category: 'accessory' }
];

export const seasons = [
  {
    id: 'spring',
    name: 'Spring',
    emoji: '🌸',
    months: ['March', 'April', 'May'],
    description: 'Spring is when flowers bloom and the weather gets warmer!',
    backgroundColor: 'from-pink-200 via-green-200 to-yellow-200',
    weatherTypes: ['rainy', 'sunny', 'cloudy'],
    facts: [
      'Trees grow new leaves in spring.',
      'Many baby animals are born in spring.',
      'Days get longer and warmer.',
      'Flowers bloom and gardens grow.',
      'Birds return from their winter homes.'
    ],
    temperature: 'mild',
    activities: ['Plant flowers', 'Watch butterflies', 'Fly kites']
  },
  {
    id: 'summer',
    name: 'Summer',
    emoji: '☀️',
    months: ['June', 'July', 'August'],
    description: 'Summer is the hottest season with long sunny days!',
    backgroundColor: 'from-yellow-300 via-orange-300 to-red-200',
    weatherTypes: ['sunny', 'cloudy'],
    facts: [
      'Summer is the warmest season of the year.',
      'The sun shines for the longest time.',
      'Perfect for swimming and outdoor fun!',
      'Fruits like watermelon ripen in summer.',
      'Many families go on summer vacations.'
    ],
    temperature: 'hot',
    activities: ['Go swimming', 'Have a picnic', 'Eat ice cream']
  },
  {
    id: 'autumn',
    name: 'Autumn',
    emoji: '🍂',
    months: ['September', 'October', 'November'],
    description: 'Autumn is when leaves change colors and fall from trees!',
    backgroundColor: 'from-orange-300 via-red-300 to-yellow-200',
    weatherTypes: ['windy', 'cloudy', 'rainy'],
    facts: [
      'Leaves turn beautiful colors like red, orange, and yellow.',
      'Trees drop their leaves to prepare for winter.',
      'The weather gets cooler and crisp.',
      'Harvest time for apples, pumpkins, and corn.',
      'Animals prepare for winter by storing food.'
    ],
    temperature: 'cool',
    activities: ['Jump in leaf piles', 'Pick apples', 'Harvest pumpkins']
  },
  {
    id: 'winter',
    name: 'Winter',
    emoji: '⛄',
    months: ['December', 'January', 'February'],
    description: 'Winter is the coldest season, sometimes with snow!',
    backgroundColor: 'from-blue-100 via-white to-blue-200',
    weatherTypes: ['snowy', 'cloudy', 'windy'],
    facts: [
      'Winter is the coldest season of the year.',
      'Some places get snow and ice.',
      'Days are shorter with less sunlight.',
      'Animals like bears hibernate in winter.',
      'Perfect for hot chocolate and warm clothes!'
    ],
    temperature: 'cold',
    activities: ['Build a snowman', 'Go sledding', 'Drink hot cocoa']
  }
];

export const rainCycleSteps = [
  {
    id: 'evaporation',
    name: 'Evaporation',
    emoji: '💧➡️☁️',
    description: 'The sun heats water in oceans, lakes, and rivers. The water turns into water vapor and rises into the sky!',
    position: 1,
    animation: 'upward'
  },
  {
    id: 'condensation',
    name: 'Condensation',
    emoji: '☁️',
    description: 'Water vapor cools down high in the sky and forms tiny water droplets. These droplets join together to make clouds!',
    position: 2,
    animation: 'gathering'
  },
  {
    id: 'precipitation',
    name: 'Precipitation',
    emoji: '🌧️',
    description: 'When clouds get heavy with water droplets, they fall back to Earth as rain, snow, or hail!',
    position: 3,
    animation: 'downward'
  },
  {
    id: 'collection',
    name: 'Collection',
    emoji: '🌊',
    description: 'Rain collects in rivers, lakes, and oceans. Then the water cycle starts all over again!',
    position: 4,
    animation: 'gathering'
  }
];

export const temperatureRanges = [
  { min: 0, max: 20, label: 'Very Cold', emoji: '🥶', color: 'blue-500', weather: ['snowy'] },
  { min: 21, max: 40, label: 'Cold', emoji: '❄️', color: 'blue-400', weather: ['snowy', 'windy'] },
  { min: 41, max: 60, label: 'Cool', emoji: '😊', color: 'green-400', weather: ['rainy', 'cloudy', 'windy'] },
  { min: 61, max: 80, label: 'Warm', emoji: '☀️', color: 'yellow-400', weather: ['sunny', 'cloudy'] },
  { min: 81, max: 100, label: 'Hot', emoji: '🔥', color: 'red-400', weather: ['sunny'] }
];

export const weatherChallenges = [
  {
    id: 1,
    weather: 'sunny',
    question: 'It\'s a hot sunny day! What should you wear?',
    correctAnswers: ['tshirt', 'shorts', 'sunglasses', 'hat'],
    minCorrect: 2
  },
  {
    id: 2,
    weather: 'rainy',
    question: 'It\'s raining outside! What do you need?',
    correctAnswers: ['raincoat', 'boots', 'umbrella'],
    minCorrect: 2
  },
  {
    id: 3,
    weather: 'snowy',
    question: 'It\'s snowing and very cold! Dress warmly!',
    correctAnswers: ['jacket', 'scarf', 'gloves', 'boots'],
    minCorrect: 3
  },
  {
    id: 4,
    weather: 'cloudy',
    question: 'It\'s a cloudy, mild day. What\'s comfortable?',
    correctAnswers: ['sweater', 'pants'],
    minCorrect: 2
  },
  {
    id: 5,
    weather: 'windy',
    question: 'It\'s very windy today! Stay warm!',
    correctAnswers: ['jacket', 'pants'],
    minCorrect: 2
  }
];
