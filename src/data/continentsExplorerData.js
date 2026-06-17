// Continents Explorer Module Data

export const continents = [
  {
    id: 'africa',
    name: 'Africa',
    emoji: '🌍',
    color: '#F59E0B',
    backgroundColor: 'from-yellow-200 via-orange-200 to-red-200',
    position: { x: 480, y: 280 },
    animals: [
      { name: 'Lion', emoji: '🦁', description: 'The king of the jungle!' },
      { name: 'Elephant', emoji: '🐘', description: 'The largest land animal.' },
      { name: 'Giraffe', emoji: '🦒', description: 'The tallest animal on Earth.' },
      { name: 'Zebra', emoji: '🦓', description: 'Black and white striped horse.' }
    ],
    landmarks: [
      { name: 'Pyramids of Giza', emoji: '🏛️', country: 'Egypt' },
      { name: 'Mount Kilimanjaro', emoji: '⛰️', country: 'Tanzania' },
      { name: 'Victoria Falls', emoji: '💦', country: 'Zimbabwe/Zambia' }
    ],
    facts: [
      'Africa is the second largest continent in the world.',
      'The Sahara Desert is the largest hot desert on Earth!',
      'More than 2,000 languages are spoken in Africa.',
      'Africa has 54 different countries.',
      'The Nile River is the longest river in the world.'
    ],
    countries: 54,
    population: '1.3 billion',
    size: '30.37 million km²'
  },
  {
    id: 'asia',
    name: 'Asia',
    emoji: '🌏',
    color: '#EF4444',
    backgroundColor: 'from-red-200 via-pink-200 to-purple-200',
    position: { x: 680, y: 200 },
    animals: [
      { name: 'Panda', emoji: '🐼', description: 'Cute black and white bear from China.' },
      { name: 'Tiger', emoji: '🐯', description: 'Powerful striped big cat.' },
      { name: 'Elephant', emoji: '🐘', description: 'Asian elephants have smaller ears.' },
      { name: 'Monkey', emoji: '🐵', description: 'Playful tree climbers.' }
    ],
    landmarks: [
      { name: 'Great Wall of China', emoji: '🏯', country: 'China' },
      { name: 'Taj Mahal', emoji: '🕌', country: 'India' },
      { name: 'Mount Everest', emoji: '🏔️', country: 'Nepal/Tibet' }
    ],
    facts: [
      'Asia is the largest and most populated continent!',
      'Mount Everest is the highest mountain in the world.',
      'China and India are the two most populated countries.',
      'Asia has 48 countries.',
      'The Great Wall of China is over 13,000 miles long!'
    ],
    countries: 48,
    population: '4.6 billion',
    size: '44.58 million km²'
  },
  {
    id: 'europe',
    name: 'Europe',
    emoji: '🇪🇺',
    color: '#3B82F6',
    backgroundColor: 'from-blue-200 via-indigo-200 to-purple-200',
    position: { x: 480, y: 140 },
    animals: [
      { name: 'Fox', emoji: '🦊', description: 'Smart and cunning red fox.' },
      { name: 'Bear', emoji: '🐻', description: 'Brown bears live in forests.' },
      { name: 'Deer', emoji: '🦌', description: 'Graceful forest animals.' },
      { name: 'Wolf', emoji: '🐺', description: 'Pack hunters of the wild.' }
    ],
    landmarks: [
      { name: 'Eiffel Tower', emoji: '🗼', country: 'France' },
      { name: 'Big Ben', emoji: '🕰️', country: 'United Kingdom' },
      { name: 'Colosseum', emoji: '🏛️', country: 'Italy' }
    ],
    facts: [
      'Europe has more than 40 countries.',
      'The European Union uses the Euro currency.',
      'Many famous artists and scientists came from Europe.',
      'Europe has beautiful castles and ancient buildings.',
      'The Vatican City is the smallest country in the world!'
    ],
    countries: 44,
    population: '746 million',
    size: '10.18 million km²'
  },
  {
    id: 'northAmerica',
    name: 'North America',
    emoji: '🗽',
    color: '#10B981',
    backgroundColor: 'from-green-200 via-emerald-200 to-teal-200',
    position: { x: 180, y: 160 },
    animals: [
      { name: 'Bald Eagle', emoji: '🦅', description: 'Symbol of the United States.' },
      { name: 'Bear', emoji: '🐻', description: 'Grizzly and black bears.' },
      { name: 'Bison', emoji: '🦬', description: 'Large buffalo of the plains.' },
      { name: 'Raccoon', emoji: '🦝', description: 'Masked night creature.' }
    ],
    landmarks: [
      { name: 'Statue of Liberty', emoji: '🗽', country: 'USA' },
      { name: 'Niagara Falls', emoji: '💦', country: 'Canada/USA' },
      { name: 'Grand Canyon', emoji: '🏜️', country: 'USA' }
    ],
    facts: [
      'North America has 23 countries.',
      'The United States, Canada, and Mexico are the largest.',
      'The Grand Canyon is over 277 miles long!',
      'Many Native American tribes lived here first.',
      'North America connects to South America by Panama.'
    ],
    countries: 23,
    population: '579 million',
    size: '24.71 million km²'
  },
  {
    id: 'southAmerica',
    name: 'South America',
    emoji: '🦜',
    color: '#8B5CF6',
    backgroundColor: 'from-purple-200 via-pink-200 to-rose-200',
    position: { x: 280, y: 340 },
    animals: [
      { name: 'Sloth', emoji: '🦥', description: 'Slow-moving tree dweller.' },
      { name: 'Parrot', emoji: '🦜', description: 'Colorful tropical bird.' },
      { name: 'Jaguar', emoji: '🐆', description: 'Spotted big cat of the jungle.' },
      { name: 'Llama', emoji: '🦙', description: 'Fluffy mountain animal.' }
    ],
    landmarks: [
      { name: 'Machu Picchu', emoji: '🏔️', country: 'Peru' },
      { name: 'Christ the Redeemer', emoji: '⛪', country: 'Brazil' },
      { name: 'Amazon Rainforest', emoji: '🌳', country: 'Brazil' }
    ],
    facts: [
      'South America has 12 countries.',
      'The Amazon Rainforest is the largest in the world!',
      'Angel Falls in Venezuela is the tallest waterfall.',
      'Brazil is the largest country in South America.',
      'Many ancient civilizations lived here, like the Incas.'
    ],
    countries: 12,
    population: '430 million',
    size: '17.84 million km²'
  },
  {
    id: 'australia',
    name: 'Australia/Oceania',
    emoji: '🦘',
    color: '#EC4899',
    backgroundColor: 'from-pink-200 via-rose-200 to-orange-200',
    position: { x: 780, y: 380 },
    animals: [
      { name: 'Kangaroo', emoji: '🦘', description: 'Hopping marsupial with a pouch.' },
      { name: 'Koala', emoji: '🐨', description: 'Cute tree-hugging bear.' },
      { name: 'Platypus', emoji: '🦫', description: 'Duck-billed egg-laying mammal.' },
      { name: 'Emu', emoji: '🦤', description: 'Large flightless bird.' }
    ],
    landmarks: [
      { name: 'Sydney Opera House', emoji: '🎭', country: 'Australia' },
      { name: 'Great Barrier Reef', emoji: '🐠', country: 'Australia' },
      { name: 'Uluru (Ayers Rock)', emoji: '🪨', country: 'Australia' }
    ],
    facts: [
      'Australia is the smallest continent.',
      'Oceania includes thousands of islands in the Pacific!',
      'The Great Barrier Reef is the largest coral reef.',
      'Australia has unique animals found nowhere else.',
      'New Zealand is part of Oceania and has kiwi birds!'
    ],
    countries: 14,
    population: '43 million',
    size: '8.56 million km²'
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    emoji: '🐧',
    color: '#06B6D4',
    backgroundColor: 'from-cyan-200 via-blue-200 to-white',
    position: { x: 450, y: 480 },
    animals: [
      { name: 'Penguin', emoji: '🐧', description: 'Tuxedo bird that cannot fly.' },
      { name: 'Seal', emoji: '🦭', description: 'Aquatic mammal of icy waters.' },
      { name: 'Whale', emoji: '🐋', description: 'Giant mammals of the ocean.' },
      { name: 'Albatross', emoji: '🕊️', description: 'Large seabird with huge wings.' }
    ],
    landmarks: [
      { name: 'South Pole', emoji: '🧭', country: 'Antarctica' },
      { name: 'Ice Shelves', emoji: '🧊', country: 'Antarctica' },
      { name: 'Research Stations', emoji: '🏢', country: 'International' }
    ],
    facts: [
      'Antarctica is the coldest continent on Earth!',
      'It is covered in thick ice and snow year-round.',
      'No countries own Antarctica - it\'s for science!',
      'Penguins and seals are the main animals here.',
      'Antarctica has no permanent human residents.'
    ],
    countries: 0,
    population: '1,000-5,000 (researchers)',
    size: '14.2 million km²'
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: 'Where do kangaroos live?',
    emoji: '🦘',
    correctAnswer: 'australia',
    hint: 'This continent is also a country!'
  },
  {
    id: 2,
    question: 'Where can you find lions?',
    emoji: '🦁',
    correctAnswer: 'africa',
    hint: 'The second largest continent.'
  },
  {
    id: 3,
    question: 'Where do pandas live?',
    emoji: '🐼',
    correctAnswer: 'asia',
    hint: 'The largest continent in the world!'
  },
  {
    id: 4,
    question: 'Where do penguins live?',
    emoji: '🐧',
    correctAnswer: 'antarctica',
    hint: 'The coldest place on Earth!'
  },
  {
    id: 5,
    question: 'Where can you find llamas?',
    emoji: '🦙',
    correctAnswer: 'southAmerica',
    hint: 'Home to the Amazon Rainforest.'
  },
  {
    id: 6,
    question: 'Where is the Eiffel Tower?',
    emoji: '🗼',
    correctAnswer: 'europe',
    hint: 'A continent with many old castles.'
  },
  {
    id: 7,
    question: 'Where is the Statue of Liberty?',
    emoji: '🗽',
    correctAnswer: 'northAmerica',
    hint: 'Contains the USA and Canada.'
  },
  {
    id: 8,
    question: 'Where do sloths live?',
    emoji: '🦥',
    correctAnswer: 'southAmerica',
    hint: 'Connected to North America.'
  },
  {
    id: 9,
    question: 'Where can you find tigers?',
    emoji: '🐯',
    correctAnswer: 'asia',
    hint: 'Has Mount Everest, the tallest mountain.'
  },
  {
    id: 10,
    question: 'Where is the Great Pyramid?',
    emoji: '🏛️',
    correctAnswer: 'africa',
    hint: 'Home to the Sahara Desert.'
  },
  {
    id: 11,
    question: 'Where do koalas live?',
    emoji: '🐨',
    correctAnswer: 'australia',
    hint: 'Has the Great Barrier Reef.'
  },
  {
    id: 12,
    question: 'Where do polar bears live near?',
    emoji: '🐻‍❄️',
    correctAnswer: 'antarctica',
    hint: 'Actually, trick question! They live in the Arctic (North), but close to Antarctica concept.'
  }
];

export const continentSvgPaths = {
  africa: 'M480,280 q20,-40 60,-30 t50,40 q10,50 -10,80 t-60,40 q-40,10 -60,-20 t-20,-60 q0,-30 40,-50z',
  asia: 'M680,200 q80,-20 120,20 t40,80 q0,60 -50,100 t-100,20 q-60,-20 -80,-80 t0,-100 q20,-40 70,-40z',
  europe: 'M480,140 q30,-20 60,0 t40,40 q10,30 -10,50 t-50,10 q-30,-10 -40,-40 t0,-60z',
  northAmerica: 'M180,160 q40,-40 80,-20 t60,60 q20,50 -10,90 t-70,40 q-50,0 -70,-50 t10,-120z',
  southAmerica: 'M280,340 q30,-30 60,-10 t40,50 q10,40 -20,70 t-60,20 q-40,-10 -50,-60 t30,-70z',
  australia: 'M780,380 q40,-20 70,10 t20,60 q-10,40 -50,50 t-60,-20 q-30,-30 -10,-70 t30,-30z',
  antarctica: 'M450,480 q100,-30 150,0 t50,40 q0,30 -50,50 t-150,0 q-100,-20 -100,-50 t100,-40z'
};

export const geographyFacts = [
  {
    id: 1,
    fact: 'Earth has 7 continents and 5 oceans!',
    emoji: '🌍',
    category: 'general'
  },
  {
    id: 2,
    fact: 'Asia is home to over half of the world\'s population.',
    emoji: '🌏',
    category: 'asia'
  },
  {
    id: 3,
    fact: 'Antarctica is a desert - it rarely snows there!',
    emoji: '🐧',
    category: 'antarctica'
  },
  {
    id: 4,
    fact: 'Africa has the longest river (Nile) and hottest desert (Sahara).',
    emoji: '🦁',
    category: 'africa'
  },
  {
    id: 5,
    fact: 'Australia is the only continent that is also a country!',
    emoji: '🦘',
    category: 'australia'
  },
  {
    id: 6,
    fact: 'South America has the Amazon - the world\'s largest rainforest.',
    emoji: '🌳',
    category: 'southAmerica'
  }
];

export const oceanNames = [
  { name: 'Pacific Ocean', emoji: '🌊', size: 'Largest' },
  { name: 'Atlantic Ocean', emoji: '🌊', size: 'Second Largest' },
  { name: 'Indian Ocean', emoji: '🌊', size: 'Third Largest' },
  { name: 'Southern Ocean', emoji: '🌊', size: 'Fourth Largest' },
  { name: 'Arctic Ocean', emoji: '🌊', size: 'Smallest' }
];
