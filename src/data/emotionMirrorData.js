// Emotion Mirror Module Data

// Core Emotions with Visual Representations
export const emotions = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    color: '#FCD34D',
    backgroundColor: 'from-yellow-200 via-yellow-300 to-yellow-400',
    description: 'Feeling good, joyful, and pleased',
    intensity: 'positive',
    physicalSigns: ['Smiling', 'Relaxed body', 'Bright eyes', 'Feeling light'],
    triggers: ['Playing with friends', 'Getting a treat', 'Achieving something', 'Having fun'],
    copingStrategies: [
      'Share your happiness with others',
      'Do things that make you smile',
      'Save happy memories in your mind',
      'Spread joy by being kind'
    ]
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    color: '#60A5FA',
    backgroundColor: 'from-blue-200 via-blue-300 to-blue-400',
    description: 'Feeling down, unhappy, or disappointed',
    intensity: 'negative',
    physicalSigns: ['Frowning', 'Tears', 'Low energy', 'Quiet voice'],
    triggers: ['Losing something', 'Missing someone', 'Getting hurt', 'Things not working out'],
    copingStrategies: [
      'Talk to someone you trust',
      'Give yourself a hug',
      'It\'s okay to cry - tears help',
      'Think of happy memories',
      'Ask for a hug from someone you love'
    ]
  },
  {
    id: 'angry',
    name: 'Angry',
    emoji: '😠',
    color: '#EF4444',
    backgroundColor: 'from-red-200 via-red-300 to-red-400',
    description: 'Feeling mad, frustrated, or upset',
    intensity: 'negative',
    physicalSigns: ['Tight fists', 'Hot face', 'Fast heartbeat', 'Tense muscles'],
    triggers: ['Unfair situations', 'Someone breaking a rule', 'Not getting your way', 'Being interrupted'],
    copingStrategies: [
      'Take 5 deep breaths',
      'Count to 10 slowly',
      'Walk away and cool down',
      'Use words to express feelings',
      'Squeeze a stress ball or pillow'
    ]
  },
  {
    id: 'scared',
    name: 'Scared',
    emoji: '😨',
    color: '#A78BFA',
    backgroundColor: 'from-purple-200 via-purple-300 to-purple-400',
    description: 'Feeling afraid, worried, or nervous',
    intensity: 'negative',
    physicalSigns: ['Wide eyes', 'Fast breathing', 'Shaky feeling', 'Want to hide'],
    triggers: ['Loud noises', 'Being alone', 'New situations', 'Darkness'],
    copingStrategies: [
      'Remember you are safe',
      'Talk to a grown-up',
      'Take slow deep breaths',
      'Think brave thoughts',
      'Hold a favorite toy or blanket'
    ]
  },
  {
    id: 'excited',
    name: 'Excited',
    emoji: '🤩',
    color: '#F97316',
    backgroundColor: 'from-orange-200 via-orange-300 to-orange-400',
    description: 'Feeling eager, thrilled, and full of energy',
    intensity: 'positive',
    physicalSigns: ['Lots of energy', 'Can\'t sit still', 'Big smile', 'Want to jump around'],
    triggers: ['Birthday party', 'Going somewhere fun', 'Getting a gift', 'Special event'],
    copingStrategies: [
      'Channel energy into movement',
      'Jump up and down',
      'Share your excitement',
      'Use your energy for something fun',
      'Dance or wiggle it out'
    ]
  },
  {
    id: 'surprised',
    name: 'Surprised',
    emoji: '😲',
    color: '#22D3EE',
    backgroundColor: 'from-cyan-200 via-cyan-300 to-cyan-400',
    description: 'Feeling amazed by something unexpected',
    intensity: 'neutral',
    physicalSigns: ['Open mouth', 'Wide eyes', 'Gasping', 'Frozen for a moment'],
    triggers: ['Unexpected events', 'Getting a surprise', 'Something shocking', 'Magic tricks'],
    copingStrategies: [
      'Take a moment to understand what happened',
      'Ask questions if confused',
      'Share your surprise with others',
      'It\'s okay to be surprised'
    ]
  },
  {
    id: 'calm',
    name: 'Calm',
    emoji: '😌',
    color: '#34D399',
    backgroundColor: 'from-green-200 via-green-300 to-green-400',
    description: 'Feeling peaceful, relaxed, and content',
    intensity: 'positive',
    physicalSigns: ['Relaxed body', 'Slow breathing', 'Gentle smile', 'Comfortable'],
    triggers: ['Quiet time', 'Being in nature', 'After rest', 'Feeling safe'],
    copingStrategies: [
      'Enjoy the peaceful feeling',
      'Take slow, gentle breaths',
      'Notice calm things around you',
      'This is a great feeling to remember'
    ]
  },
  {
    id: 'confused',
    name: 'Confused',
    emoji: '😕',
    color: '#A3A3A3',
    backgroundColor: 'from-gray-200 via-gray-300 to-gray-400',
    description: 'Feeling puzzled or not understanding',
    intensity: 'neutral',
    physicalSigns: ['Tilted head', 'Frowning', 'Thinking hard', 'Scratching head'],
    triggers: ['Hard problems', 'New instructions', 'Too much information', 'Unexpected changes'],
    copingStrategies: [
      'Ask questions',
      'Ask for help',
      'It\'s okay not to understand right away',
      'Take your time to figure it out'
    ]
  }
];

// Feeling Scenarios - Situations Kids Can Relate To
export const scenarios = [
  // Happy scenarios
  {
    id: 1,
    emotion: 'happy',
    situation: 'Your best friend gives you a big hug and wants to play your favorite game!',
    question: 'How do you feel?',
    emoji: '🤗',
    followUp: 'Happiness is wonderful! Share your joy by smiling and having fun together.'
  },
  {
    id: 2,
    emotion: 'happy',
    situation: 'You just learned to ride your bike without training wheels!',
    question: 'How do you feel?',
    emoji: '🚲',
    followUp: 'Being proud of yourself makes you happy! Celebrate your achievement!'
  },
  {
    id: 3,
    emotion: 'happy',
    situation: 'It\'s your birthday and everyone is singing to you!',
    question: 'How do you feel?',
    emoji: '🎂',
    followUp: 'Birthdays are special! Enjoy being celebrated and loved.'
  },

  // Sad scenarios
  {
    id: 4,
    emotion: 'sad',
    situation: 'You dropped your ice cream cone on the ground before you could eat it.',
    question: 'How do you feel?',
    emoji: '🍦',
    followUp: 'It\'s okay to feel sad. Disappointments happen. Maybe you can get another treat another day.'
  },
  {
    id: 5,
    emotion: 'sad',
    situation: 'Your favorite toy broke and can\'t be fixed.',
    question: 'How do you feel?',
    emoji: '💔',
    followUp: 'Losing something special makes us sad. It\'s okay to cry. Remember the good times with it.'
  },
  {
    id: 6,
    emotion: 'sad',
    situation: 'Your best friend is moving to a different city.',
    question: 'How do you feel?',
    emoji: '📦',
    followUp: 'Missing people we love is hard. You can still be friends and talk on the phone!'
  },

  // Angry scenarios
  {
    id: 7,
    emotion: 'angry',
    situation: 'Someone cut in line in front of you when it was your turn.',
    question: 'How do you feel?',
    emoji: '🚶',
    followUp: 'Unfair things can make us angry. Take deep breaths and calmly tell a grown-up.'
  },
  {
    id: 8,
    emotion: 'angry',
    situation: 'Your sibling broke your tower that took forever to build.',
    question: 'How do you feel?',
    emoji: '🏗️',
    followUp: 'It\'s okay to be upset. Use words to say how you feel instead of hitting.'
  },
  {
    id: 9,
    emotion: 'angry',
    situation: 'You have to stop playing your game right when it was getting fun.',
    question: 'How do you feel?',
    emoji: '🎮',
    followUp: 'Being interrupted can be frustrating. Take a breath and you can play again later.'
  },

  // Scared scenarios
  {
    id: 10,
    emotion: 'scared',
    situation: 'You hear a loud thunderstorm at night.',
    question: 'How do you feel?',
    emoji: '⛈️',
    followUp: 'Loud noises can be scary. You are safe inside. Thunder is just a sound from clouds!'
  },
  {
    id: 11,
    emotion: 'scared',
    situation: 'You\'re starting at a new school and don\'t know anyone yet.',
    question: 'How do you feel?',
    emoji: '🏫',
    followUp: 'New things can feel scary. You\'re brave! Soon you\'ll make new friends.'
  },
  {
    id: 12,
    emotion: 'scared',
    situation: 'A big dog barks loudly when you walk by.',
    question: 'How do you feel?',
    emoji: '🐕',
    followUp: 'Loud barking can be scary. The dog might just be saying hello! Stay calm and walk away.'
  },

  // Excited scenarios
  {
    id: 13,
    emotion: 'excited',
    situation: 'Tomorrow you\'re going to an amusement park!',
    question: 'How do you feel?',
    emoji: '🎢',
    followUp: 'It\'s great to look forward to fun things! Your excitement shows you\'re happy!'
  },
  {
    id: 14,
    emotion: 'excited',
    situation: 'You just found out you\'re getting a puppy!',
    question: 'How do you feel?',
    emoji: '🐶',
    followUp: 'New pets are exciting! Channel that energy into learning how to care for your puppy.'
  },
  {
    id: 15,
    emotion: 'excited',
    situation: 'Your family is having a movie night with popcorn!',
    question: 'How do you feel?',
    emoji: '🍿',
    followUp: 'Special family time is exciting! Enjoy the moment together.'
  },

  // Surprised scenarios
  {
    id: 16,
    emotion: 'surprised',
    situation: 'You open your lunchbox and find your favorite snack!',
    question: 'How do you feel?',
    emoji: '🎁',
    followUp: 'Happy surprises are wonderful! Someone wanted to make you smile.'
  },
  {
    id: 17,
    emotion: 'surprised',
    situation: 'Everyone jumped out yelling "Surprise!" at your party.',
    question: 'How do you feel?',
    emoji: '🎉',
    followUp: 'Surprise parties can startle us! Once you know what\'s happening, you can enjoy it.'
  },

  // Calm scenarios
  {
    id: 18,
    emotion: 'calm',
    situation: 'You\'re lying in the grass watching clouds float by.',
    question: 'How do you feel?',
    emoji: '☁️',
    followUp: 'Peaceful moments help us feel calm. This is your body and mind resting.'
  },
  {
    id: 19,
    emotion: 'calm',
    situation: 'You just finished your bath and you\'re in cozy pajamas.',
    question: 'How do you feel?',
    emoji: '🛁',
    followUp: 'Being clean and comfortable helps us feel calm and ready for sleep.'
  },

  // Confused scenarios
  {
    id: 20,
    emotion: 'confused',
    situation: 'The teacher is explaining a math problem but you don\'t understand yet.',
    question: 'How do you feel?',
    emoji: '🧮',
    followUp: 'It\'s okay to be confused! Raise your hand and ask for help. That\'s how we learn.'
  }
];

// Breathing Exercises
export const breathingExercises = [
  {
    id: 'bubble-breath',
    name: 'Bubble Breathing',
    emoji: '🫧',
    description: 'Breathe slowly like you\'re blowing bubbles',
    steps: [
      'Sit comfortably',
      'Breathe in through your nose (4 counts)',
      'Hold your breath gently (2 counts)',
      'Breathe out slowly through your mouth like blowing a bubble (6 counts)',
      'Repeat 5 times'
    ],
    duration: 12, // seconds per cycle
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'balloon-breath',
    name: 'Balloon Breathing',
    emoji: '🎈',
    description: 'Fill your belly like a balloon',
    steps: [
      'Put your hands on your belly',
      'Breathe in and feel your belly get big like a balloon (4 counts)',
      'Hold (2 counts)',
      'Breathe out and feel your belly get small (4 counts)',
      'Repeat 5 times'
    ],
    duration: 10,
    color: 'from-pink-400 to-purple-400'
  },
  {
    id: 'star-breath',
    name: 'Five-Point Star Breathing',
    emoji: '⭐',
    description: 'Trace a star while breathing',
    steps: [
      'Hold up one hand like a star',
      'Use your other finger to trace up one side: breathe in',
      'Trace down: breathe out',
      'Keep going around all 5 points',
      'Do this 2 times around'
    ],
    duration: 15,
    color: 'from-yellow-400 to-orange-400'
  },
  {
    id: 'rainbow-breath',
    name: 'Rainbow Breathing',
    emoji: '🌈',
    description: 'Breathe colors of the rainbow',
    steps: [
      'Close your eyes',
      'Breathe in and imagine breathing in a beautiful rainbow color (4 counts)',
      'Hold the color in your body (2 counts)',
      'Breathe out and send the color through your whole body (6 counts)',
      'Try different colors each time'
    ],
    duration: 12,
    color: 'from-red-400 via-yellow-400 to-blue-400'
  }
];

// Emotion Management Tips by Category
export const copingCategories = [
  {
    id: 'calm-down',
    name: 'When You Need to Calm Down',
    emoji: '🧘',
    color: 'from-green-400 to-teal-400',
    strategies: [
      {
        title: 'Deep Breathing',
        icon: '🫁',
        description: 'Take 5 slow, deep breaths',
        whenToUse: 'When feeling angry, scared, or overwhelmed'
      },
      {
        title: 'Count to 10',
        icon: '🔢',
        description: 'Count slowly and calmly',
        whenToUse: 'When you want to react quickly to something'
      },
      {
        title: 'Safe Space',
        icon: '🏠',
        description: 'Find a quiet, cozy corner',
        whenToUse: 'When you need a break from everything'
      },
      {
        title: 'Squeeze and Release',
        icon: '✊',
        description: 'Squeeze your fists tight, then let go',
        whenToUse: 'When your body feels tense'
      }
    ]
  },
  {
    id: 'express-feelings',
    name: 'Express Your Feelings',
    emoji: '💬',
    color: 'from-blue-400 to-indigo-400',
    strategies: [
      {
        title: 'Use Words',
        icon: '🗣️',
        description: 'Say "I feel..." and explain',
        whenToUse: 'Instead of hitting or yelling'
      },
      {
        title: 'Draw It Out',
        icon: '🎨',
        description: 'Draw how you feel',
        whenToUse: 'When words are hard to find'
      },
      {
        title: 'Talk to Someone',
        icon: '👥',
        description: 'Share with a trusted grown-up',
        whenToUse: 'When feelings are too big to handle alone'
      },
      {
        title: 'Write or Journal',
        icon: '📝',
        description: 'Write down your feelings',
        whenToUse: 'When you want to remember or process'
      }
    ]
  },
  {
    id: 'feel-better',
    name: 'Ways to Feel Better',
    emoji: '✨',
    color: 'from-yellow-400 to-pink-400',
    strategies: [
      {
        title: 'Move Your Body',
        icon: '🏃',
        description: 'Jump, dance, or run around',
        whenToUse: 'When you have big energy or emotions'
      },
      {
        title: 'Hug It Out',
        icon: '🤗',
        description: 'Ask for a hug or hug a stuffed animal',
        whenToUse: 'When you need comfort'
      },
      {
        title: 'Listen to Music',
        icon: '🎵',
        description: 'Play your favorite happy song',
        whenToUse: 'When you want to change your mood'
      },
      {
        title: 'Think Happy Thoughts',
        icon: '💭',
        description: 'Remember a happy memory',
        whenToUse: 'When feeling sad or worried'
      }
    ]
  },
  {
    id: 'ask-for-help',
    name: 'When to Ask for Help',
    emoji: '🆘',
    color: 'from-orange-400 to-red-400',
    strategies: [
      {
        title: 'Big Feelings',
        icon: '😰',
        description: 'When emotions feel too big',
        whenToUse: 'Tell a parent, teacher, or counselor'
      },
      {
        title: 'Don\'t Understand',
        icon: '❓',
        description: 'When you\'re confused',
        whenToUse: 'It\'s okay to ask questions'
      },
      {
        title: 'Someone Is Hurt',
        icon: '🤕',
        description: 'When you or someone else is hurt',
        whenToUse: 'Get an adult immediately'
      },
      {
        title: 'Feeling Unsafe',
        icon: '🚨',
        description: 'When something doesn\'t feel right',
        whenToUse: 'Always tell a trusted grown-up'
      }
    ]
  }
];

// Emotion Quiz Questions - Multiple Choice
export const emotionQuizzes = emotions.map(emotion => ({
  emotionId: emotion.id,
  emoji: emotion.emoji,
  correctAnswer: emotion.name,
  // Will generate wrong answers dynamically
}));

// Positive Affirmations by Emotion
export const affirmations = {
  happy: [
    'I spread joy to others!',
    'My smile brightens the world!',
    'I celebrate good things!'
  ],
  sad: [
    'It\'s okay to feel sad',
    'My feelings are important',
    'I can ask for help when I need it'
  ],
  angry: [
    'I can calm down',
    'I use my words, not my hands',
    'I am learning to control my feelings'
  ],
  scared: [
    'I am brave',
    'I am safe',
    'I can face my fears with help'
  ],
  excited: [
    'I can use my energy for good things',
    'My excitement is wonderful!',
    'I share my enthusiasm with others'
  ],
  surprised: [
    'I can handle unexpected things',
    'Surprises can be fun!',
    'I stay flexible'
  ],
  calm: [
    'I am peaceful',
    'I can relax and rest',
    'Calmness is my superpower'
  ],
  confused: [
    'It\'s okay not to know everything',
    'I can ask questions',
    'I am learning every day'
  ]
};

// Helper function to get random emotions for multiple choice
export const getRandomEmotions = (correctEmotion, count = 4) => {
  const options = [correctEmotion];
  const otherEmotions = emotions.filter(e => e.id !== correctEmotion.id);
  
  while (options.length < count && otherEmotions.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherEmotions.length);
    options.push(otherEmotions[randomIndex]);
    otherEmotions.splice(randomIndex, 1);
  }
  
  // Shuffle
  return options.sort(() => Math.random() - 0.5);
};
