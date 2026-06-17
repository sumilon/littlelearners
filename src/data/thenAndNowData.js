// Then & Now - Historical Comparisons Data

export const categories = [
  { id: 'communication', name: 'Communication', emoji: '📞', color: '#3B82F6' },
  { id: 'transportation', name: 'Transportation', emoji: '🚗', color: '#10B981' },
  { id: 'home', name: 'Home & Living', emoji: '🏠', color: '#F59E0B' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎮', color: '#8B5CF6' },
  { id: 'learning', name: 'Learning & Work', emoji: '📚', color: '#EC4899' }
];

export const timePeriods = [
  { id: 'ancient', name: 'Ancient Times', emoji: '🏛️', yearRange: 'Before 1500s' },
  { id: 'old', name: 'Old Days', emoji: '📜', yearRange: '1500s - 1800s' },
  { id: 'vintage', name: 'Grandparents\' Time', emoji: '📻', yearRange: '1900s - 1950s' },
  { id: 'modern', name: 'Parents\' Time', emoji: '💾', yearRange: '1960s - 2000s' },
  { id: 'today', name: 'Today', emoji: '📱', yearRange: '2000s - Now' }
];

export const historicalItems = [
  // Communication
  {
    id: 1,
    category: 'communication',
    then: {
      name: 'Smoke Signals',
      emoji: '💨',
      description: 'People sent messages by creating patterns of smoke from fires',
      timePeriod: 'ancient',
      funFact: 'Native Americans used smoke signals to communicate across long distances!'
    },
    now: {
      name: 'Text Messages',
      emoji: '💬',
      description: 'We send instant messages to anyone in the world with our phones',
      funFact: 'Over 23 billion text messages are sent every day!'
    },
    comparison: 'From smoke in the sky to messages on screens in seconds!'
  },
  {
    id: 2,
    category: 'communication',
    then: {
      name: 'Carrier Pigeon',
      emoji: '🐦',
      description: 'Birds carried written messages tied to their legs',
      timePeriod: 'old',
      funFact: 'Pigeons were used in wars to send secret messages!'
    },
    now: {
      name: 'Email',
      emoji: '📧',
      description: 'Electronic mail arrives instantly anywhere in the world',
      funFact: 'More than 300 billion emails are sent every day!'
    },
    comparison: 'From flying birds to flying data!'
  },
  {
    id: 3,
    category: 'communication',
    then: {
      name: 'Letter & Quill',
      emoji: '🪶',
      description: 'People wrote letters with feather pens dipped in ink',
      timePeriod: 'old',
      funFact: 'Quill pens were made from large bird feathers!'
    },
    now: {
      name: 'Smartphone',
      emoji: '📱',
      description: 'We type, call, video chat, and do so much more on one device',
      funFact: 'There are more smartphones on Earth than people!'
    },
    comparison: 'From one letter a week to hundreds of messages a day!'
  },
  {
    id: 4,
    category: 'communication',
    then: {
      name: 'Telegraph',
      emoji: '📟',
      description: 'Sent coded messages using beeps through wires',
      timePeriod: 'vintage',
      funFact: 'The telegraph used Morse code - dots and dashes!'
    },
    now: {
      name: 'Video Call',
      emoji: '📹',
      description: 'Talk to and see people anywhere with video calls',
      funFact: 'You can video call someone on the other side of the world!'
    },
    comparison: 'From hearing beeps to seeing faces in real-time!'
  },

  // Transportation
  {
    id: 5,
    category: 'transportation',
    then: {
      name: 'Walking',
      emoji: '🚶',
      description: 'People walked everywhere - it could take days to travel!',
      timePeriod: 'ancient',
      funFact: 'Ancient people walked 10-20 miles every day!'
    },
    now: {
      name: 'Airplane',
      emoji: '✈️',
      description: 'Fly across continents in just hours',
      funFact: 'Planes can fly faster than the speed of sound!'
    },
    comparison: 'From walking for days to flying in hours!'
  },
  {
    id: 6,
    category: 'transportation',
    then: {
      name: 'Horse & Cart',
      emoji: '🐴',
      description: 'Horses pulled carts and wagons to carry people and goods',
      timePeriod: 'old',
      funFact: 'Horses were the fastest way to travel for thousands of years!'
    },
    now: {
      name: 'Car',
      emoji: '🚗',
      description: 'Drive anywhere in comfortable, fast vehicles',
      funFact: 'There are over 1 billion cars in the world today!'
    },
    comparison: 'From horse power to engine power!'
  },
  {
    id: 7,
    category: 'transportation',
    then: {
      name: 'Sailing Ship',
      emoji: '⛵',
      description: 'Ships used wind in sails to cross oceans slowly',
      timePeriod: 'old',
      funFact: 'It took months to sail across the ocean!'
    },
    now: {
      name: 'Cruise Ship',
      emoji: '🚢',
      description: 'Huge ships with engines, pools, and restaurants',
      funFact: 'Modern cruise ships can hold over 6,000 people!'
    },
    comparison: 'From wind power to giant floating cities!'
  },
  {
    id: 8,
    category: 'transportation',
    then: {
      name: 'Steam Train',
      emoji: '🚂',
      description: 'Trains powered by burning coal and steam',
      timePeriod: 'vintage',
      funFact: 'Steam trains changed the world in the 1800s!'
    },
    now: {
      name: 'Bullet Train',
      emoji: '🚄',
      description: 'Super-fast electric trains that seem to fly on tracks',
      funFact: 'Bullet trains can go over 300 miles per hour!'
    },
    comparison: 'From steam and smoke to electric speed!'
  },

  // Home & Living
  {
    id: 9,
    category: 'home',
    then: {
      name: 'Oil Lamp',
      emoji: '🪔',
      description: 'Burned oil in lamps to create light at night',
      timePeriod: 'old',
      funFact: 'People had to be very careful not to start fires!'
    },
    now: {
      name: 'Light Bulb',
      emoji: '💡',
      description: 'Flip a switch and instantly have bright, safe light',
      funFact: 'LED bulbs can last for 25 years or more!'
    },
    comparison: 'From dangerous flames to instant safe light!'
  },
  {
    id: 10,
    category: 'home',
    then: {
      name: 'Ice Box',
      emoji: '🧊',
      description: 'Kept food cold with big blocks of ice',
      timePeriod: 'vintage',
      funFact: 'The ice man delivered ice to homes every day!'
    },
    now: {
      name: 'Refrigerator',
      emoji: '🧊',
      description: 'Electric fridge keeps food cold and fresh all the time',
      funFact: 'Modern fridges can even connect to the internet!'
    },
    comparison: 'From melting ice to always-cold convenience!'
  },
  {
    id: 11,
    category: 'home',
    then: {
      name: 'Wood Stove',
      emoji: '🪵',
      description: 'Cooked food by burning wood in a stove',
      timePeriod: 'old',
      funFact: 'Cooking a meal could take hours of work!'
    },
    now: {
      name: 'Microwave',
      emoji: '📦',
      description: 'Heat food in minutes with invisible microwaves',
      funFact: 'Microwaves were invented by accident!'
    },
    comparison: 'From hours of fire-tending to minutes of beeping!'
  },
  {
    id: 12,
    category: 'home',
    then: {
      name: 'Washboard',
      emoji: '🧺',
      description: 'Scrubbed clothes by hand on a bumpy board',
      timePeriod: 'vintage',
      funFact: 'Laundry day was the hardest day of the week!'
    },
    now: {
      name: 'Washing Machine',
      emoji: '🌀',
      description: 'Machine washes, rinses, and spins clothes automatically',
      funFact: 'Modern washers can even detect how dirty your clothes are!'
    },
    comparison: 'From scrubbing for hours to pressing a button!'
  },

  // Entertainment
  {
    id: 13,
    category: 'entertainment',
    then: {
      name: 'Shadow Puppets',
      emoji: '✋',
      description: 'Made stories with hand shadows on walls',
      timePeriod: 'ancient',
      funFact: 'Shadow puppets are thousands of years old!'
    },
    now: {
      name: 'Movies',
      emoji: '🎬',
      description: 'Watch amazing stories with sound, color, and special effects',
      funFact: 'Some movies cost over $300 million to make!'
    },
    comparison: 'From hand shadows to 3D blockbusters!'
  },
  {
    id: 14,
    category: 'entertainment',
    then: {
      name: 'Gramophone',
      emoji: '📯',
      description: 'Played music from spinning records with a horn speaker',
      timePeriod: 'vintage',
      funFact: 'You had to wind it up like a clock to make it work!'
    },
    now: {
      name: 'Music Streaming',
      emoji: '🎵',
      description: 'Listen to millions of songs instantly on your device',
      funFact: 'You can access over 100 million songs online!'
    },
    comparison: 'From one scratchy record to millions of songs!'
  },
  {
    id: 15,
    category: 'entertainment',
    then: {
      name: 'Board Games',
      emoji: '🎲',
      description: 'Played games with boards, dice, and pieces',
      timePeriod: 'vintage',
      funFact: 'Chess is over 1,500 years old!'
    },
    now: {
      name: 'Video Games',
      emoji: '🎮',
      description: 'Play interactive games on screens with amazing graphics',
      funFact: 'Over 3 billion people play video games worldwide!'
    },
    comparison: 'From rolling dice to virtual reality!'
  },
  {
    id: 16,
    category: 'entertainment',
    then: {
      name: 'Radio',
      emoji: '📻',
      description: 'Listened to shows and music on radio broadcasts',
      timePeriod: 'vintage',
      funFact: 'Families gathered around the radio like we watch TV today!'
    },
    now: {
      name: 'Streaming TV',
      emoji: '📺',
      description: 'Watch any show or movie anytime you want',
      funFact: 'You can pause live TV and watch shows from anywhere!'
    },
    comparison: 'From scheduled broadcasts to watch-whatever-whenever!'
  },

  // Learning & Work
  {
    id: 17,
    category: 'learning',
    then: {
      name: 'Scroll',
      emoji: '📜',
      description: 'Wrote on long rolls of paper or animal skin',
      timePeriod: 'ancient',
      funFact: 'Some ancient scrolls were over 100 feet long!'
    },
    now: {
      name: 'Tablet',
      emoji: '📱',
      description: 'Read thousands of books on one thin electronic device',
      funFact: 'A tablet can hold an entire library in your hands!'
    },
    comparison: 'From heavy scrolls to lightweight screens!'
  },
  {
    id: 18,
    category: 'learning',
    then: {
      name: 'Abacus',
      emoji: '🧮',
      description: 'Counted with beads on wires to do math',
      timePeriod: 'ancient',
      funFact: 'People could calculate very fast with an abacus!'
    },
    now: {
      name: 'Calculator',
      emoji: '🔢',
      description: 'Solves math problems instantly with buttons',
      funFact: 'Your phone is more powerful than computers that sent people to the moon!'
    },
    comparison: 'From sliding beads to instant calculations!'
  },
  {
    id: 19,
    category: 'learning',
    then: {
      name: 'Chalkboard',
      emoji: '📋',
      description: 'Wrote with chalk on black boards in classrooms',
      timePeriod: 'vintage',
      funFact: 'Clapping erasers was a special classroom job!'
    },
    now: {
      name: 'Smart Board',
      emoji: '🖥️',
      description: 'Touch-screen boards that connect to the internet',
      funFact: 'Smart boards can show videos, games, and websites!'
    },
    comparison: 'From dusty chalk to interactive screens!'
  },
  {
    id: 20,
    category: 'learning',
    then: {
      name: 'Typewriter',
      emoji: '⌨️',
      description: 'Typed letters on paper by hitting mechanical keys',
      timePeriod: 'vintage',
      funFact: 'You couldn\'t fix mistakes easily - no backspace button!'
    },
    now: {
      name: 'Computer',
      emoji: '💻',
      description: 'Type, edit, save, and share documents digitally',
      funFact: 'Computers can do billions of calculations per second!'
    },
    comparison: 'From mechanical clacking to silent typing!'
  }
];

// Quiz questions
export const quizQuestions = [
  {
    id: 1,
    question: 'What did people use before telephones?',
    emoji: '📞',
    options: ['Carrier Pigeons', 'Text Messages', 'Video Calls', 'Computers'],
    correctAnswer: 'Carrier Pigeons',
    explanation: 'Before phones, people sent messages with birds that flew home!'
  },
  {
    id: 2,
    question: 'How did people travel before cars were invented?',
    emoji: '🚗',
    options: ['Horses & Carts', 'Airplanes', 'Trains', 'Bicycles'],
    correctAnswer: 'Horses & Carts',
    explanation: 'Horses pulled carts and wagons for thousands of years!'
  },
  {
    id: 3,
    question: 'What did people use to light their homes before light bulbs?',
    emoji: '💡',
    options: ['Oil Lamps', 'Flashlights', 'Phone Lights', 'LED Bulbs'],
    correctAnswer: 'Oil Lamps',
    explanation: 'Oil lamps with burning flames gave light at night!'
  },
  {
    id: 4,
    question: 'What did students write on before computers?',
    emoji: '💻',
    options: ['Typewriters', 'Tablets', 'Smartphones', 'Smart Boards'],
    correctAnswer: 'Typewriters',
    explanation: 'Typewriters were mechanical machines that typed on paper!'
  },
  {
    id: 5,
    question: 'How did people listen to music before streaming services?',
    emoji: '🎵',
    options: ['Gramophones & Records', 'Spotify', 'YouTube', 'Podcasts'],
    correctAnswer: 'Gramophones & Records',
    explanation: 'Gramophones played music from spinning vinyl records!'
  },
  {
    id: 6,
    question: 'What did people use before refrigerators to keep food cold?',
    emoji: '🧊',
    options: ['Ice Boxes', 'Freezers', 'Coolers', 'Air Conditioners'],
    correctAnswer: 'Ice Boxes',
    explanation: 'Ice boxes used big blocks of ice delivered by the ice man!'
  },
  {
    id: 7,
    question: 'How did people send long-distance messages before email?',
    emoji: '📧',
    options: ['Letters with Quill Pens', 'Text Messages', 'Phone Calls', 'Emojis'],
    correctAnswer: 'Letters with Quill Pens',
    explanation: 'People wrote letters with feather pens and sent them by mail!'
  },
  {
    id: 8,
    question: 'What did people do for math before calculators?',
    emoji: '🔢',
    options: ['Abacus with Beads', 'Phone Calculator', 'Computer', 'Watch Calculator'],
    correctAnswer: 'Abacus with Beads',
    explanation: 'The abacus used sliding beads to count and calculate!'
  },
  {
    id: 9,
    question: 'How did people wash clothes before washing machines?',
    emoji: '🌀',
    options: ['Washboard by Hand', 'Dry Cleaner', 'Dishwasher', 'Robot'],
    correctAnswer: 'Washboard by Hand',
    explanation: 'People scrubbed clothes by hand on bumpy washboards!'
  },
  {
    id: 10,
    question: 'What did people watch before TVs and movies?',
    emoji: '🎬',
    options: ['Shadow Puppets', 'Netflix', 'YouTube', 'Video Games'],
    correctAnswer: 'Shadow Puppets',
    explanation: 'Shadow puppets made stories with hand shapes on walls!'
  },
  {
    id: 11,
    question: 'How fast were the fastest trains in the old days?',
    emoji: '🚂',
    options: ['Much slower than today', 'Same speed', 'Faster than today', 'Speed of light'],
    correctAnswer: 'Much slower than today',
    explanation: 'Steam trains were slow compared to today\'s bullet trains!'
  },
  {
    id: 12,
    question: 'What did people read before tablets and e-books?',
    emoji: '📱',
    options: ['Paper Scrolls & Books', 'Websites', 'Text Messages', 'Apps'],
    correctAnswer: 'Paper Scrolls & Books',
    explanation: 'Ancient people wrote on scrolls, then paper books were invented!'
  }
];

// Helper functions
export const getItemsByCategory = (categoryId) => {
  return historicalItems.filter(item => item.category === categoryId);
};

export const getItemsByTimePeriod = (periodId) => {
  return historicalItems.filter(item => item.then.timePeriod === periodId);
};

export const getRandomItems = (count = 6) => {
  const shuffled = [...historicalItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
