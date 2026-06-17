// Plant Life Cycle Module Data

export const growthStages = [
  {
    id: 'seed',
    name: 'Seed',
    emoji: '🌰',
    description: 'A tiny seed is planted in the soil. It contains everything the plant needs to start growing!',
    requirements: { water: 0, sun: 0, soil: 100 },
    facts: [
      'Seeds can stay dormant for years until conditions are right!',
      'Every seed contains a baby plant called an embryo.',
      'Seeds need water, air, and the right temperature to germinate.'
    ],
    duration: 0
  },
  {
    id: 'sprout',
    name: 'Sprout',
    emoji: '🌱',
    description: 'The seed has germinated! A tiny sprout pushes through the soil reaching for sunlight.',
    requirements: { water: 30, sun: 20, soil: 100 },
    facts: [
      'The first leaves are called cotyledons or seed leaves.',
      'Roots grow down while the stem grows up!',
      'Sprouting is called germination in science.'
    ],
    duration: 30
  },
  {
    id: 'seedling',
    name: 'Seedling',
    emoji: '🌿',
    description: 'The young plant is growing! It has small leaves and needs lots of water and sunlight.',
    requirements: { water: 60, sun: 50, soil: 100 },
    facts: [
      'Seedlings are very delicate and need extra care.',
      'Leaves use sunlight to make food through photosynthesis.',
      'Roots absorb water and nutrients from the soil.'
    ],
    duration: 60
  },
  {
    id: 'young',
    name: 'Young Plant',
    emoji: '🪴',
    description: 'The plant is getting stronger! It has more leaves and a thicker stem.',
    requirements: { water: 80, sun: 70, soil: 100 },
    facts: [
      'The plant is making its own food from sunlight now!',
      'More leaves mean more energy for growth.',
      'Strong roots help the plant stand tall.'
    ],
    duration: 80
  },
  {
    id: 'mature',
    name: 'Mature Plant',
    emoji: '🌻',
    description: 'The plant is fully grown and blooming! Beautiful flowers attract bees and butterflies.',
    requirements: { water: 100, sun: 100, soil: 100 },
    facts: [
      'Flowers help plants make seeds for new plants.',
      'Bees and butterflies help spread pollen between flowers.',
      'Each flower can become a fruit or seed pod!'
    ],
    duration: 100
  },
  {
    id: 'fruit',
    name: 'Fruiting',
    emoji: '🍎',
    description: 'The plant has produced fruit! Inside are new seeds that can grow into more plants.',
    requirements: { water: 100, sun: 100, soil: 100 },
    facts: [
      'Fruits protect seeds and help them spread.',
      'Animals eat the fruit and spread seeds far away!',
      'The life cycle begins again with new seeds!'
    ],
    duration: 100
  }
];

export const plantTypes = [
  {
    id: 'sunflower',
    name: 'Sunflower',
    emoji: '🌻',
    description: 'A tall, bright flower that turns to face the sun!',
    color: 'from-yellow-400 to-orange-400',
    backgroundColor: 'from-yellow-100 via-orange-100 to-green-100',
    stages: [
      { stage: 'seed', emoji: '🟤', size: 'small', color: 'brown' },
      { stage: 'sprout', emoji: '🌱', size: 'small', color: 'green' },
      { stage: 'seedling', emoji: '🌿', size: 'medium', color: 'green' },
      { stage: 'young', emoji: '🪴', size: 'medium', color: 'green' },
      { stage: 'mature', emoji: '🌻', size: 'large', color: 'yellow' },
      { stage: 'fruit', emoji: '🌻', size: 'large', color: 'yellow' }
    ],
    growthTime: 60, // days
    waterNeed: 'medium',
    sunNeed: 'high',
    facts: [
      'Sunflowers can grow up to 12 feet tall!',
      'They always face the sun during the day.',
      'Each sunflower head contains hundreds of seeds.',
      'Sunflower seeds are healthy and delicious to eat!',
      'They are native to North America.'
    ],
    harvest: { name: 'Sunflower Seeds', emoji: '🌻', count: 10 }
  },
  {
    id: 'mango',
    name: 'Mango Tree',
    emoji: '🥭',
    description: 'A tropical fruit tree that grows sweet, juicy mangoes!',
    color: 'from-green-500 to-yellow-500',
    backgroundColor: 'from-green-100 via-yellow-100 to-orange-100',
    stages: [
      { stage: 'seed', emoji: '🟫', size: 'small', color: 'brown' },
      { stage: 'sprout', emoji: '🌱', size: 'small', color: 'green' },
      { stage: 'seedling', emoji: '🌿', size: 'medium', color: 'green' },
      { stage: 'young', emoji: '🌳', size: 'large', color: 'green' },
      { stage: 'mature', emoji: '🌳', size: 'large', color: 'green' },
      { stage: 'fruit', emoji: '🥭', size: 'large', color: 'orange' }
    ],
    growthTime: 1460, // days (~4 years)
    waterNeed: 'high',
    sunNeed: 'high',
    facts: [
      'Mango trees can live for over 100 years!',
      'Mangoes are called the "King of Fruits".',
      'One tree can produce hundreds of mangoes.',
      'Mango trees have deep roots to find water.',
      'They grow best in warm, tropical climates.'
    ],
    harvest: { name: 'Mangoes', emoji: '🥭', count: 8 }
  },
  {
    id: 'cactus',
    name: 'Cactus',
    emoji: '🌵',
    description: 'A desert plant that stores water and has beautiful flowers!',
    color: 'from-green-600 to-green-400',
    backgroundColor: 'from-yellow-100 via-orange-100 to-green-100',
    stages: [
      { stage: 'seed', emoji: '⚫', size: 'tiny', color: 'black' },
      { stage: 'sprout', emoji: '🌱', size: 'small', color: 'green' },
      { stage: 'seedling', emoji: '🌵', size: 'small', color: 'green' },
      { stage: 'young', emoji: '🌵', size: 'medium', color: 'green' },
      { stage: 'mature', emoji: '🌵', size: 'large', color: 'green' },
      { stage: 'fruit', emoji: '🌺', size: 'large', color: 'pink' }
    ],
    growthTime: 365, // days (1 year)
    waterNeed: 'low',
    sunNeed: 'very high',
    facts: [
      'Cacti can survive months without water!',
      'They store water in their thick stems.',
      'Spines protect them from thirsty animals.',
      'Some cacti can live for 200 years!',
      'Beautiful flowers bloom in spring.'
    ],
    harvest: { name: 'Cactus Flowers', emoji: '🌺', count: 5 }
  }
];

export const plantNeeds = [
  {
    id: 'water',
    name: 'Water',
    emoji: '💧',
    description: 'Plants need water to grow strong and healthy!',
    color: 'blue-500',
    facts: [
      'Water carries nutrients from soil to all parts of the plant.',
      'Plants need water to make their food.',
      'Too much water can drown plant roots!',
      'Most plants are 80-90% water.'
    ]
  },
  {
    id: 'sun',
    name: 'Sunlight',
    emoji: '☀️',
    description: 'Plants use sunlight to make food through photosynthesis!',
    color: 'yellow-500',
    facts: [
      'Sunlight gives plants energy to grow.',
      'Green leaves capture sunlight.',
      'Plants turn sunlight into food and oxygen!',
      'Different plants need different amounts of sun.'
    ]
  },
  {
    id: 'soil',
    name: 'Soil',
    emoji: '🪨',
    description: 'Soil provides nutrients and supports plant roots!',
    color: 'brown-500',
    facts: [
      'Soil contains minerals that plants need.',
      'Roots anchor plants in the soil.',
      'Good soil is full of tiny organisms.',
      'Soil holds water for plant roots to drink.'
    ]
  }
];

export const harvestChallenges = [
  {
    id: 1,
    plant: 'sunflower',
    target: 10,
    timeLimit: 15,
    difficulty: 'easy',
    message: 'Harvest 10 sunflower seeds!'
  },
  {
    id: 2,
    plant: 'mango',
    target: 8,
    timeLimit: 12,
    difficulty: 'medium',
    message: 'Harvest 8 juicy mangoes!'
  },
  {
    id: 3,
    plant: 'cactus',
    target: 5,
    timeLimit: 10,
    difficulty: 'easy',
    message: 'Harvest 5 cactus flowers!'
  },
  {
    id: 4,
    plant: 'sunflower',
    target: 15,
    timeLimit: 20,
    difficulty: 'medium',
    message: 'Harvest 15 sunflower seeds!'
  },
  {
    id: 5,
    plant: 'mango',
    target: 12,
    timeLimit: 15,
    difficulty: 'hard',
    message: 'Harvest 12 mangoes quickly!'
  }
];

export const gardeningTips = [
  {
    id: 1,
    tip: 'Water plants in the morning for best results!',
    emoji: '💧',
    category: 'water'
  },
  {
    id: 2,
    tip: 'Plants need 6-8 hours of sunlight each day.',
    emoji: '☀️',
    category: 'sun'
  },
  {
    id: 3,
    tip: 'Good soil is dark and crumbly, not too hard.',
    emoji: '🪨',
    category: 'soil'
  },
  {
    id: 4,
    tip: 'Overwatering kills more plants than underwatering!',
    emoji: '💧',
    category: 'water'
  },
  {
    id: 5,
    tip: 'Plants grow faster in warm weather.',
    emoji: '🌡️',
    category: 'general'
  },
  {
    id: 6,
    tip: 'Talk to your plants - they love attention!',
    emoji: '💬',
    category: 'general'
  }
];

export const lifeCycleSteps = [
  {
    step: 1,
    name: 'Seed',
    description: 'The life cycle begins with a seed planted in soil',
    emoji: '🌰',
    color: 'brown'
  },
  {
    step: 2,
    name: 'Germination',
    description: 'Water and warmth wake up the seed',
    emoji: '🌱',
    color: 'lightgreen'
  },
  {
    step: 3,
    name: 'Growth',
    description: 'Roots grow down, stems grow up',
    emoji: '🌿',
    color: 'green'
  },
  {
    step: 4,
    name: 'Maturity',
    description: 'The plant is fully grown with flowers',
    emoji: '🌻',
    color: 'yellow'
  },
  {
    step: 5,
    name: 'Reproduction',
    description: 'Flowers make seeds for new plants',
    emoji: '🌸',
    color: 'pink'
  },
  {
    step: 6,
    name: 'New Cycle',
    description: 'Seeds spread and the cycle starts again!',
    emoji: '🔄',
    color: 'blue'
  }
];
