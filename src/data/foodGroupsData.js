// Food Groups & Nutrition Data - MyPlate Model
// 5 Food Groups: Fruits, Vegetables, Grains, Protein, Dairy

export const foodGroups = [
  {
    id: 'fruits',
    name: 'Fruits',
    emoji: '🍎',
    color: '#EF4444', // Red
    description: 'Sweet and juicy! Fruits give you vitamins and energy.',
    benefits: [
      'Full of vitamins to keep you healthy',
      'Natural sugars give you energy',
      'Help your body fight sickness',
      'Good for your skin and eyes'
    ],
    funFact: 'An apple a day keeps the doctor away! 🍎'
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    emoji: '🥦',
    color: '#10B981', // Green
    description: 'Crunchy or soft, veggies make you strong!',
    benefits: [
      'Make your muscles and bones strong',
      'Help you grow tall',
      'Keep your tummy happy',
      'Give you energy to play'
    ],
    funFact: 'Carrots help you see better in the dark! 🥕'
  },
  {
    id: 'grains',
    name: 'Grains',
    emoji: '🍞',
    color: '#F59E0B', // Orange
    description: 'Bread, rice, and pasta give you energy all day!',
    benefits: [
      'Give you energy to run and play',
      'Help your brain think better',
      'Keep you full longer',
      'Help your body work properly'
    ],
    funFact: 'Whole grain bread has tiny seeds inside! 🌾'
  },
  {
    id: 'protein',
    name: 'Protein',
    emoji: '🍗',
    color: '#8B5CF6', // Purple
    description: 'Meat, beans, and nuts help build strong muscles!',
    benefits: [
      'Build strong muscles',
      'Help cuts and scrapes heal',
      'Make you feel full and strong',
      'Help you grow bigger'
    ],
    funFact: 'Your body uses protein like building blocks! 🧱'
  },
  {
    id: 'dairy',
    name: 'Dairy',
    emoji: '🥛',
    color: '#3B82F6', // Blue
    description: 'Milk, cheese, and yogurt make your bones super strong!',
    benefits: [
      'Make your bones and teeth strong',
      'Help you grow taller',
      'Give you energy',
      'Keep your body healthy'
    ],
    funFact: 'Milk helps build strong bones for jumping high! 🦴'
  }
];

export const foodItems = [
  // Fruits
  {
    id: 1,
    name: 'Apple',
    emoji: '🍎',
    group: 'fruits',
    nutritionTip: 'Apples have fiber to keep your tummy happy and vitamins for healthy skin!',
    servingSize: '1 medium apple'
  },
  {
    id: 2,
    name: 'Banana',
    emoji: '🍌',
    group: 'fruits',
    nutritionTip: 'Bananas give you quick energy and help your muscles work better!',
    servingSize: '1 banana'
  },
  {
    id: 3,
    name: 'Orange',
    emoji: '🍊',
    group: 'fruits',
    nutritionTip: 'Oranges are full of Vitamin C to help you fight off colds!',
    servingSize: '1 orange'
  },
  {
    id: 4,
    name: 'Strawberry',
    emoji: '🍓',
    group: 'fruits',
    nutritionTip: 'Strawberries are packed with antioxidants that keep you healthy!',
    servingSize: '8 strawberries'
  },
  {
    id: 5,
    name: 'Grapes',
    emoji: '🍇',
    group: 'fruits',
    nutritionTip: 'Grapes are a fun snack that give you energy and water!',
    servingSize: '1 cup'
  },
  {
    id: 6,
    name: 'Watermelon',
    emoji: '🍉',
    group: 'fruits',
    nutritionTip: 'Watermelon is mostly water and keeps you hydrated on hot days!',
    servingSize: '1 slice'
  },
  {
    id: 7,
    name: 'Pineapple',
    emoji: '🍍',
    group: 'fruits',
    nutritionTip: 'Pineapple helps your body digest food better!',
    servingSize: '1 cup chunks'
  },
  {
    id: 8,
    name: 'Peach',
    emoji: '🍑',
    group: 'fruits',
    nutritionTip: 'Peaches are sweet and full of vitamins for healthy eyes!',
    servingSize: '1 medium peach'
  },

  // Vegetables
  {
    id: 9,
    name: 'Carrot',
    emoji: '🥕',
    group: 'vegetables',
    nutritionTip: 'Carrots help you see better and have a vitamin that makes your eyes sparkle!',
    servingSize: '1 medium carrot'
  },
  {
    id: 10,
    name: 'Broccoli',
    emoji: '🥦',
    group: 'vegetables',
    nutritionTip: 'Broccoli is like a tiny tree full of vitamins to make you super strong!',
    servingSize: '1 cup'
  },
  {
    id: 11,
    name: 'Tomato',
    emoji: '🍅',
    group: 'vegetables',
    nutritionTip: 'Tomatoes help keep your heart healthy and strong!',
    servingSize: '1 medium tomato'
  },
  {
    id: 12,
    name: 'Corn',
    emoji: '🌽',
    group: 'vegetables',
    nutritionTip: 'Corn gives you energy and fiber to keep you full!',
    servingSize: '1 ear of corn'
  },
  {
    id: 13,
    name: 'Lettuce',
    emoji: '🥬',
    group: 'vegetables',
    nutritionTip: 'Lettuce is crunchy and full of water to keep you hydrated!',
    servingSize: '2 cups'
  },
  {
    id: 14,
    name: 'Pepper',
    emoji: '🫑',
    group: 'vegetables',
    nutritionTip: 'Peppers come in many colors and each color has different vitamins!',
    servingSize: '1 medium pepper'
  },
  {
    id: 15,
    name: 'Cucumber',
    emoji: '🥒',
    group: 'vegetables',
    nutritionTip: 'Cucumbers are cool and refreshing, perfect for hot days!',
    servingSize: '1 cup slices'
  },
  {
    id: 16,
    name: 'Potato',
    emoji: '🥔',
    group: 'vegetables',
    nutritionTip: 'Potatoes give you energy and important minerals for your body!',
    servingSize: '1 medium potato'
  },

  // Grains
  {
    id: 17,
    name: 'Bread',
    emoji: '🍞',
    group: 'grains',
    nutritionTip: 'Whole grain bread gives you lasting energy for playing and learning!',
    servingSize: '1 slice'
  },
  {
    id: 18,
    name: 'Rice',
    emoji: '🍚',
    group: 'grains',
    nutritionTip: 'Rice is a great source of energy that fuels your whole day!',
    servingSize: '1 cup'
  },
  {
    id: 19,
    name: 'Pasta',
    emoji: '🍝',
    group: 'grains',
    nutritionTip: 'Pasta gives athletes energy to run fast and play hard!',
    servingSize: '1 cup'
  },
  {
    id: 20,
    name: 'Cereal',
    emoji: '🥣',
    group: 'grains',
    nutritionTip: 'Whole grain cereal is a great way to start your morning with energy!',
    servingSize: '1 cup'
  },
  {
    id: 21,
    name: 'Pancakes',
    emoji: '🥞',
    group: 'grains',
    nutritionTip: 'Pancakes made with whole grains give you energy for morning adventures!',
    servingSize: '2 medium pancakes'
  },
  {
    id: 22,
    name: 'Bagel',
    emoji: '🥯',
    group: 'grains',
    nutritionTip: 'Bagels are chewy and filling, perfect for breakfast or lunch!',
    servingSize: '1 small bagel'
  },
  {
    id: 23,
    name: 'Popcorn',
    emoji: '🍿',
    group: 'grains',
    nutritionTip: 'Popcorn is a whole grain snack that\'s fun to eat!',
    servingSize: '3 cups popped'
  },
  {
    id: 24,
    name: 'Tortilla',
    emoji: '🫓',
    group: 'grains',
    nutritionTip: 'Whole wheat tortillas wrap up yummy and healthy ingredients!',
    servingSize: '1 tortilla'
  },

  // Protein
  {
    id: 25,
    name: 'Chicken',
    emoji: '🍗',
    group: 'protein',
    nutritionTip: 'Chicken builds strong muscles to help you run, jump, and play!',
    servingSize: '3 ounces'
  },
  {
    id: 26,
    name: 'Fish',
    emoji: '🐟',
    group: 'protein',
    nutritionTip: 'Fish makes your brain super smart and helps you think clearly!',
    servingSize: '3 ounces'
  },
  {
    id: 27,
    name: 'Egg',
    emoji: '🥚',
    group: 'protein',
    nutritionTip: 'Eggs are protein powerhouses that help you grow strong!',
    servingSize: '1 egg'
  },
  {
    id: 28,
    name: 'Beans',
    emoji: '🫘',
    group: 'protein',
    nutritionTip: 'Beans are plant protein that give you energy and fiber!',
    servingSize: '1/2 cup'
  },
  {
    id: 29,
    name: 'Peanuts',
    emoji: '🥜',
    group: 'protein',
    nutritionTip: 'Peanuts and peanut butter are packed with protein and healthy fats!',
    servingSize: '1 ounce'
  },
  {
    id: 30,
    name: 'Steak',
    emoji: '🥩',
    group: 'protein',
    nutritionTip: 'Beef has iron that carries oxygen through your body!',
    servingSize: '3 ounces'
  },
  {
    id: 31,
    name: 'Bacon',
    emoji: '🥓',
    group: 'protein',
    nutritionTip: 'Bacon has protein but eat it sometimes, not every day!',
    servingSize: '2 slices'
  },
  {
    id: 32,
    name: 'Tofu',
    emoji: '🍥',
    group: 'protein',
    nutritionTip: 'Tofu is plant protein that can taste like anything you cook it with!',
    servingSize: '1/2 cup'
  },

  // Dairy
  {
    id: 33,
    name: 'Milk',
    emoji: '🥛',
    group: 'dairy',
    nutritionTip: 'Milk has calcium that builds super strong bones and teeth!',
    servingSize: '1 cup'
  },
  {
    id: 34,
    name: 'Cheese',
    emoji: '🧀',
    group: 'dairy',
    nutritionTip: 'Cheese is full of calcium and protein for strong bones and muscles!',
    servingSize: '1 ounce'
  },
  {
    id: 35,
    name: 'Yogurt',
    emoji: '🍦',
    group: 'dairy',
    nutritionTip: 'Yogurt has good bacteria that keep your tummy healthy and happy!',
    servingSize: '1 cup'
  },
  {
    id: 36,
    name: 'Ice Cream',
    emoji: '🍨',
    group: 'dairy',
    nutritionTip: 'Ice cream has calcium but lots of sugar, so it\'s a special treat!',
    servingSize: '1/2 cup'
  },
  {
    id: 37,
    name: 'Butter',
    emoji: '🧈',
    group: 'dairy',
    nutritionTip: 'Butter comes from milk and adds flavor, but use just a little!',
    servingSize: '1 tablespoon'
  },
  {
    id: 38,
    name: 'Cottage Cheese',
    emoji: '🥛',
    group: 'dairy',
    nutritionTip: 'Cottage cheese is packed with protein and calcium!',
    servingSize: '1/2 cup'
  }
];

// Pre-built healthy meal examples
export const healthyMealExamples = [
  {
    id: 1,
    name: 'Breakfast Champion',
    emoji: '🌅',
    foods: [
      { group: 'grains', emoji: '🥞', name: 'Pancakes' },
      { group: 'fruits', emoji: '🍓', name: 'Strawberries' },
      { group: 'protein', emoji: '🥚', name: 'Scrambled Eggs' },
      { group: 'dairy', emoji: '🥛', name: 'Milk' }
    ],
    rating: 'Excellent!',
    feedback: 'This breakfast has everything you need to start your day strong!'
  },
  {
    id: 2,
    name: 'Lunch Power',
    emoji: '☀️',
    foods: [
      { group: 'grains', emoji: '🍞', name: 'Whole Wheat Bread' },
      { group: 'protein', emoji: '🍗', name: 'Chicken' },
      { group: 'vegetables', emoji: '🥬', name: 'Lettuce' },
      { group: 'fruits', emoji: '🍎', name: 'Apple' },
      { group: 'dairy', emoji: '🧀', name: 'Cheese' }
    ],
    rating: 'Perfect!',
    feedback: 'All 5 food groups! You\'re a nutrition superstar!'
  },
  {
    id: 3,
    name: 'Dinner Delight',
    emoji: '🌙',
    foods: [
      { group: 'grains', emoji: '🍚', name: 'Brown Rice' },
      { group: 'protein', emoji: '🐟', name: 'Fish' },
      { group: 'vegetables', emoji: '🥦', name: 'Broccoli' },
      { group: 'vegetables', emoji: '🥕', name: 'Carrots' },
      { group: 'dairy', emoji: '🥛', name: 'Milk' }
    ],
    rating: 'Excellent!',
    feedback: 'Great balance with lots of veggies!'
  }
];

// Meal balance rating system
export const rateMeal = (selectedFoods) => {
  const groupCounts = {
    fruits: 0,
    vegetables: 0,
    grains: 0,
    protein: 0,
    dairy: 0
  };

  selectedFoods.forEach(food => {
    groupCounts[food.group]++;
  });

  const groupsRepresented = Object.values(groupCounts).filter(count => count > 0).length;
  const totalFoods = selectedFoods.length;

  let rating = '';
  let emoji = '';
  let feedback = '';
  let stars = 0;

  if (groupsRepresented === 5 && totalFoods >= 5) {
    rating = 'Perfect Balance!';
    emoji = '⭐⭐⭐⭐⭐';
    feedback = 'Wow! You included all 5 food groups! This is a super healthy meal!';
    stars = 5;
  } else if (groupsRepresented === 4 && totalFoods >= 4) {
    rating = 'Great Job!';
    emoji = '⭐⭐⭐⭐';
    feedback = 'Almost perfect! Try adding one more food group next time!';
    stars = 4;
  } else if (groupsRepresented === 3 && totalFoods >= 3) {
    rating = 'Good Try!';
    emoji = '⭐⭐⭐';
    feedback = 'Nice! Add a couple more food groups to make it even healthier!';
    stars = 3;
  } else if (groupsRepresented === 2) {
    rating = 'Getting Started';
    emoji = '⭐⭐';
    feedback = 'You can do better! Try to include more different food groups!';
    stars = 2;
  } else {
    rating = 'Keep Learning!';
    emoji = '⭐';
    feedback = 'A healthy meal needs foods from different groups. Try again!';
    stars = 1;
  }

  return {
    rating,
    emoji,
    feedback,
    stars,
    groupCounts,
    groupsRepresented,
    totalFoods
  };
};

// Quiz questions about food groups
export const quizQuestions = [
  {
    id: 1,
    question: 'Which food group makes your bones super strong?',
    emoji: '🦴',
    options: ['Fruits', 'Dairy', 'Grains', 'Protein'],
    correctAnswer: 'Dairy',
    explanation: 'Dairy foods like milk and cheese have calcium that builds strong bones!'
  },
  {
    id: 2,
    question: 'What food group does an apple belong to?',
    emoji: '🍎',
    options: ['Vegetables', 'Grains', 'Fruits', 'Dairy'],
    correctAnswer: 'Fruits',
    explanation: 'Apples are fruits! They\'re sweet, juicy, and full of vitamins!'
  },
  {
    id: 3,
    question: 'Which food helps build strong muscles?',
    emoji: '💪',
    options: ['Chicken', 'Bread', 'Apple', 'Milk'],
    correctAnswer: 'Chicken',
    explanation: 'Chicken is protein! Protein foods help build and repair your muscles!'
  },
  {
    id: 4,
    question: 'What food group gives you energy to run and play?',
    emoji: '⚡',
    options: ['Grains', 'Dairy', 'Vegetables', 'Fruits'],
    correctAnswer: 'Grains',
    explanation: 'Grains like bread and rice give you long-lasting energy!'
  },
  {
    id: 5,
    question: 'Which food group is broccoli part of?',
    emoji: '🥦',
    options: ['Fruits', 'Grains', 'Vegetables', 'Protein'],
    correctAnswer: 'Vegetables',
    explanation: 'Broccoli is a vegetable! Veggies make you strong and healthy!'
  },
  {
    id: 6,
    question: 'How many food groups should you eat every day?',
    emoji: '🍽️',
    options: ['2 groups', '3 groups', '5 groups', '10 groups'],
    correctAnswer: '5 groups',
    explanation: 'Try to eat from all 5 food groups every day for a balanced diet!'
  },
  {
    id: 7,
    question: 'Which food is a protein?',
    emoji: '🤔',
    options: ['Banana', 'Egg', 'Bread', 'Carrot'],
    correctAnswer: 'Egg',
    explanation: 'Eggs are full of protein to help you grow strong!'
  },
  {
    id: 8,
    question: 'What color is the vegetable section on MyPlate?',
    emoji: '🎨',
    options: ['Red', 'Green', 'Orange', 'Blue'],
    correctAnswer: 'Green',
    explanation: 'The vegetable section is green, just like many veggies!'
  },
  {
    id: 9,
    question: 'Which food group does cheese belong to?',
    emoji: '🧀',
    options: ['Dairy', 'Protein', 'Grains', 'Fruits'],
    correctAnswer: 'Dairy',
    explanation: 'Cheese is made from milk, so it\'s in the dairy group!'
  },
  {
    id: 10,
    question: 'Fish is part of which food group?',
    emoji: '🐟',
    options: ['Dairy', 'Vegetables', 'Protein', 'Grains'],
    correctAnswer: 'Protein',
    explanation: 'Fish is protein! It makes your brain smart and muscles strong!'
  }
];

// Helper function to get random foods for sorting game
export const getRandomFoods = (count = 8) => {
  const shuffled = [...foodItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get foods by group
export const getFoodsByGroup = (groupId) => {
  return foodItems.filter(food => food.group === groupId);
};

// Helper function to shuffle array
export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
