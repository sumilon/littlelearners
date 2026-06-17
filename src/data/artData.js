// Art Studio Module Data

// Colors with mixing info
export const colors = [
  { 
    name: 'Red', 
    emoji: '🔴', 
    hex: '#FF0000',
    category: 'Primary',
    examples: ['Apple 🍎', 'Tomato 🍅', 'Rose 🌹'],
    fact: 'Color of love and energy'
  },
  { 
    name: 'Blue', 
    emoji: '🔵', 
    hex: '#0000FF',
    category: 'Primary',
    examples: ['Sky ☁️', 'Ocean 🌊', 'Blueberry 🫐'],
    fact: 'Color of sky and sea'
  },
  { 
    name: 'Yellow', 
    emoji: '🟡', 
    hex: '#FFFF00',
    category: 'Primary',
    examples: ['Sun ☀️', 'Banana 🍌', 'Sunflower 🌻'],
    fact: 'Color of sunshine'
  },
  { 
    name: 'Green', 
    emoji: '🟢', 
    hex: '#00FF00',
    category: 'Secondary',
    madeFrom: ['Blue', 'Yellow'],
    examples: ['Grass 🌱', 'Leaf 🍃', 'Frog 🐸'],
    fact: 'Blue + Yellow = Green'
  },
  { 
    name: 'Orange', 
    emoji: '🟠', 
    hex: '#FFA500',
    category: 'Secondary',
    madeFrom: ['Red', 'Yellow'],
    examples: ['Orange 🍊', 'Carrot 🥕', 'Sunset 🌅'],
    fact: 'Red + Yellow = Orange'
  },
  { 
    name: 'Purple', 
    emoji: '🟣', 
    hex: '#800080',
    category: 'Secondary',
    madeFrom: ['Red', 'Blue'],
    examples: ['Grapes 🍇', 'Lavender 💜', 'Eggplant 🍆'],
    fact: 'Red + Blue = Purple'
  },
  { 
    name: 'Pink', 
    emoji: '💗', 
    hex: '#FFC0CB',
    category: 'Tint',
    examples: ['Flower 🌸', 'Flamingo 🦩', 'Cotton Candy 🍭'],
    fact: 'Mix of red and white'
  },
  { 
    name: 'Brown', 
    emoji: '🟤', 
    hex: '#A52A2A',
    category: 'Tertiary',
    examples: ['Chocolate 🍫', 'Wood 🪵', 'Bear 🐻'],
    fact: 'Mix of many colors'
  },
  { 
    name: 'Black', 
    emoji: '⚫', 
    hex: '#000000',
    category: 'Neutral',
    examples: ['Night 🌙', 'Shadow 👤', 'Crow 🐦‍⬛'],
    fact: 'Darkest color'
  },
  { 
    name: 'White', 
    emoji: '⚪', 
    hex: '#FFFFFF',
    category: 'Neutral',
    examples: ['Cloud ☁️', 'Snow ❄️', 'Milk 🥛'],
    fact: 'Lightest color'
  }
];

// Shapes with properties
export const shapes = [
  { 
    name: 'Circle', 
    emoji: '⭕', 
    sides: 0,
    description: 'Round shape with no corners',
    examples: ['Ball ⚽', 'Pizza 🍕', 'Sun ☀️'],
    drawSteps: ['Draw a round line that connects back']
  },
  { 
    name: 'Square', 
    emoji: '🟦', 
    sides: 4,
    description: 'Four equal sides and corners',
    examples: ['Box 📦', 'Window 🪟', 'Dice 🎲'],
    drawSteps: ['Draw 4 equal lines', 'Make 4 corners', 'All sides same length']
  },
  { 
    name: 'Triangle', 
    emoji: '🔺', 
    sides: 3,
    description: 'Three sides and three corners',
    examples: ['Mountain ⛰️', 'Pizza Slice 🍕', 'Pyramid 🔺'],
    drawSteps: ['Draw 3 lines', 'Make 3 corners', 'Connect all points']
  },
  { 
    name: 'Rectangle', 
    emoji: '🟩', 
    sides: 4,
    description: 'Four sides, opposite sides equal',
    examples: ['Door 🚪', 'Book 📖', 'Phone 📱'],
    drawSteps: ['Draw 2 long lines', 'Draw 2 short lines', 'Connect all corners']
  },
  { 
    name: 'Star', 
    emoji: '⭐', 
    sides: 5,
    description: 'Five pointed shape',
    examples: ['Star ⭐', 'Starfish 🌟', 'Sheriff Badge 👮'],
    drawSteps: ['Draw 5 points', 'Connect points', 'Make it pointy']
  },
  { 
    name: 'Heart', 
    emoji: '❤️', 
    sides: 0,
    description: 'Love shape with curves',
    examples: ['Love ❤️', 'Valentine 💝', 'Like 👍'],
    drawSteps: ['Draw 2 bumps on top', 'Point at bottom', 'Make it curvy']
  },
  { 
    name: 'Oval', 
    emoji: '🥚', 
    sides: 0,
    description: 'Stretched circle shape',
    examples: ['Egg 🥚', 'Face 😊', 'Mirror 🪞'],
    drawSteps: ['Draw like circle', 'Make it longer', 'Smooth curves']
  },
  { 
    name: 'Diamond', 
    emoji: '💎', 
    sides: 4,
    description: 'Square turned on point',
    examples: ['Gem 💎', 'Kite 🪁', 'Card Suit ♦️'],
    drawSteps: ['Draw 4 equal lines', 'Point top and bottom', 'Wide at middle']
  }
];

// Pattern sequences for recognition game
export const patterns = [
  { 
    sequence: ['🔴', '🔵', '🔴', '🔵', '?'],
    answer: '🔴',
    options: ['🔴', '🔵', '🟡', '🟢'],
    difficulty: 'easy',
    type: 'color'
  },
  { 
    sequence: ['⭕', '🟦', '⭕', '🟦', '?'],
    answer: '⭕',
    options: ['⭕', '🟦', '🔺', '⭐'],
    difficulty: 'easy',
    type: 'shape'
  },
  { 
    sequence: ['🍎', '🍌', '🍎', '🍌', '?'],
    answer: '🍎',
    options: ['🍎', '🍌', '🍊', '🍇'],
    difficulty: 'easy',
    type: 'object'
  },
  { 
    sequence: ['🔴', '🟡', '🔵', '🔴', '🟡', '?'],
    answer: '🔵',
    options: ['🔴', '🟡', '🔵', '🟢'],
    difficulty: 'medium',
    type: 'color'
  },
  { 
    sequence: ['⭕', '🟦', '🔺', '⭕', '🟦', '?'],
    answer: '🔺',
    options: ['⭕', '🟦', '🔺', '⭐'],
    difficulty: 'medium',
    type: 'shape'
  },
  { 
    sequence: ['🌸', '🌸', '🌻', '🌸', '🌸', '?'],
    answer: '🌻',
    options: ['🌸', '🌻', '🌹', '🌷'],
    difficulty: 'medium',
    type: 'object'
  },
  { 
    sequence: ['🔴', '🔴', '🔵', '🔴', '🔴', '🔵', '?'],
    answer: '🔴',
    options: ['🔴', '🔵', '🟡', '🟢'],
    difficulty: 'hard',
    type: 'color'
  },
  { 
    sequence: ['⭕', '🟦', '🟦', '⭕', '🟦', '🟦', '?'],
    answer: '⭕',
    options: ['⭕', '🟦', '🔺', '⭐'],
    difficulty: 'hard',
    type: 'shape'
  },
  { 
    sequence: ['🎈', '🎈', '🎈', '🎁', '🎈', '🎈', '🎈', '?'],
    answer: '🎁',
    options: ['🎈', '🎁', '🎊', '🎉'],
    difficulty: 'hard',
    type: 'object'
  },
  { 
    sequence: ['⭐', '⭕', '⭐', '⭐', '⭕', '⭐', '⭐', '⭐', '?'],
    answer: '⭕',
    options: ['⭐', '⭕', '🔺', '🟦'],
    difficulty: 'hard',
    type: 'shape'
  }
];

// Color mixing quiz
export const colorMixing = [
  {
    question: 'What color do you get when you mix Blue + Yellow?',
    color1: 'Blue',
    color2: 'Yellow',
    answer: 'Green',
    options: ['Green', 'Orange', 'Purple', 'Brown']
  },
  {
    question: 'What color do you get when you mix Red + Yellow?',
    color1: 'Red',
    color2: 'Yellow',
    answer: 'Orange',
    options: ['Green', 'Orange', 'Purple', 'Pink']
  },
  {
    question: 'What color do you get when you mix Red + Blue?',
    color1: 'Red',
    color2: 'Blue',
    answer: 'Purple',
    options: ['Green', 'Orange', 'Purple', 'Brown']
  },
  {
    question: 'Blue and Yellow make...',
    color1: 'Blue',
    color2: 'Yellow',
    answer: 'Green',
    options: ['Green', 'Orange', 'Purple', 'Pink']
  },
  {
    question: 'Red and Yellow make...',
    color1: 'Red',
    color2: 'Yellow',
    answer: 'Orange',
    options: ['Green', 'Orange', 'Purple', 'Brown']
  }
];

// Drawing tools/colors for canvas
export const drawingColors = [
  { name: 'Red', hex: '#FF0000', emoji: '🔴' },
  { name: 'Orange', hex: '#FFA500', emoji: '🟠' },
  { name: 'Yellow', hex: '#FFFF00', emoji: '🟡' },
  { name: 'Green', hex: '#00FF00', emoji: '🟢' },
  { name: 'Blue', hex: '#0000FF', emoji: '🔵' },
  { name: 'Purple', hex: '#800080', emoji: '🟣' },
  { name: 'Pink', hex: '#FFC0CB', emoji: '💗' },
  { name: 'Brown', hex: '#A52A2A', emoji: '🟤' },
  { name: 'Black', hex: '#000000', emoji: '⚫' },
  { name: 'White', hex: '#FFFFFF', emoji: '⚪' }
];

// Brush sizes
export const brushSizes = [
  { name: 'Thin', size: 2, emoji: '✏️' },
  { name: 'Medium', size: 5, emoji: '🖊️' },
  { name: 'Thick', size: 10, emoji: '🖍️' },
  { name: 'Very Thick', size: 20, emoji: '🖌️' }
];

// Drawing prompts
export const drawingPrompts = [
  { prompt: 'Draw a happy sun ☀️', emoji: '☀️' },
  { prompt: 'Draw a smiling face 😊', emoji: '😊' },
  { prompt: 'Draw a colorful flower 🌸', emoji: '🌸' },
  { prompt: 'Draw a house 🏠', emoji: '🏠' },
  { prompt: 'Draw a tree 🌳', emoji: '🌳' },
  { prompt: 'Draw a rainbow 🌈', emoji: '🌈' },
  { prompt: 'Draw a heart ❤️', emoji: '❤️' },
  { prompt: 'Draw a star ⭐', emoji: '⭐' },
  { prompt: 'Draw a car 🚗', emoji: '🚗' },
  { prompt: 'Draw anything you like! 🎨', emoji: '🎨' }
];
