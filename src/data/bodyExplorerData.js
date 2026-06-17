// Body Explorer Module Data
// Learning about human body parts

export const bodyParts = {
  head: [
    { id: 'eyes', name: 'Eyes', emoji: '👀', function: 'We see with our eyes', sound: 'eyes' },
    { id: 'nose', name: 'Nose', emoji: '👃', function: 'We smell with our nose', sound: 'nose' },
    { id: 'ears', name: 'Ears', emoji: '👂', function: 'We hear with our ears', sound: 'ears' },
    { id: 'mouth', name: 'Mouth', emoji: '👄', function: 'We eat and talk with our mouth', sound: 'mouth' },
    { id: 'tongue', name: 'Tongue', emoji: '👅', function: 'We taste with our tongue', sound: 'tongue' },
    { id: 'teeth', name: 'Teeth', emoji: '🦷', function: 'We chew food with our teeth', sound: 'teeth' },
    { id: 'hair', name: 'Hair', emoji: '💇', function: 'Hair grows on our head', sound: 'hair' },
    { id: 'face', name: 'Face', emoji: '😊', function: 'Our face shows emotions', sound: 'face' }
  ],
  body: [
    { id: 'heart', name: 'Heart', emoji: '❤️', function: 'Pumps blood through our body', sound: 'heart' },
    { id: 'lungs', name: 'Lungs', emoji: '🫁', function: 'Help us breathe air', sound: 'lungs' },
    { id: 'stomach', name: 'Stomach', emoji: '🫃', function: 'Digests our food', sound: 'stomach' },
    { id: 'brain', name: 'Brain', emoji: '🧠', function: 'Controls our whole body', sound: 'brain' },
    { id: 'bones', name: 'Bones', emoji: '🦴', function: 'Support our body structure', sound: 'bones' }
  ],
  limbs: [
    { id: 'hands', name: 'Hands', emoji: '✋', function: 'We hold and touch things', sound: 'hands' },
    { id: 'fingers', name: 'Fingers', emoji: '👆', function: 'Help us grip and point', sound: 'fingers' },
    { id: 'arms', name: 'Arms', emoji: '💪', function: 'Connect hands to body', sound: 'arms' },
    { id: 'legs', name: 'Legs', emoji: '🦵', function: 'Help us walk and run', sound: 'legs' },
    { id: 'feet', name: 'Feet', emoji: '🦶', function: 'Support us when standing', sound: 'feet' },
    { id: 'toes', name: 'Toes', emoji: '🦶', function: 'Help with balance', sound: 'toes' }
  ]
};

export const senses = [
  {
    id: 'sight',
    name: 'Sight',
    emoji: '👁️',
    bodyPart: 'Eyes',
    description: 'We use our eyes to see colors, shapes, and everything around us!',
    examples: ['See a rainbow 🌈', 'Watch TV 📺', 'Read books 📚']
  },
  {
    id: 'hearing',
    name: 'Hearing',
    emoji: '👂',
    bodyPart: 'Ears',
    description: 'We use our ears to hear sounds like music, voices, and nature!',
    examples: ['Listen to music 🎵', 'Hear birds 🐦', 'Talk to friends 🗣️']
  },
  {
    id: 'smell',
    name: 'Smell',
    emoji: '👃',
    bodyPart: 'Nose',
    description: 'We use our nose to smell flowers, food, and many other things!',
    examples: ['Smell flowers 🌸', 'Smell cookies 🍪', 'Fresh air 🌬️']
  },
  {
    id: 'taste',
    name: 'Taste',
    emoji: '👅',
    bodyPart: 'Tongue',
    description: 'We use our tongue to taste sweet, salty, sour, and bitter flavors!',
    examples: ['Taste ice cream 🍦', 'Yummy fruits 🍓', 'Delicious food 🍕']
  },
  {
    id: 'touch',
    name: 'Touch',
    emoji: '✋',
    bodyPart: 'Hands',
    description: 'We use our hands to feel soft, hard, hot, cold, and more!',
    examples: ['Soft teddy 🧸', 'Hot cup ☕', 'Cold ice 🧊']
  }
];

export const healthyHabits = [
  { id: 'wash-hands', habit: 'Wash your hands', emoji: '🧼', description: 'Keep germs away by washing hands often!' },
  { id: 'brush-teeth', habit: 'Brush your teeth', emoji: '🪥', description: 'Brush twice daily for healthy teeth!' },
  { id: 'eat-healthy', habit: 'Eat healthy food', emoji: '🥗', description: 'Fruits and vegetables make us strong!' },
  { id: 'exercise', habit: 'Exercise daily', emoji: '🏃', description: 'Move your body to stay fit!' },
  { id: 'sleep-well', habit: 'Sleep well', emoji: '😴', description: 'Get 8-10 hours of sleep every night!' },
  { id: 'drink-water', habit: 'Drink water', emoji: '💧', description: 'Stay hydrated throughout the day!' },
  { id: 'cover-cough', habit: 'Cover when you cough', emoji: '🤧', description: 'Use your elbow to cover coughs!' },
  { id: 'wear-helmet', habit: 'Wear a helmet', emoji: '🪖', description: 'Protect your head when cycling!' }
];

export const bodyQuiz = [
  { question: 'Which body part do we see with?', options: ['Eyes 👀', 'Nose 👃', 'Ears 👂'], answer: 'Eyes 👀' },
  { question: 'Which body part do we hear with?', options: ['Eyes 👀', 'Ears 👂', 'Mouth 👄'], answer: 'Ears 👂' },
  { question: 'Which body part do we smell with?', options: ['Nose 👃', 'Tongue 👅', 'Feet 🦶'], answer: 'Nose 👃' },
  { question: 'Which body part pumps blood?', options: ['Heart ❤️', 'Stomach 🫃', 'Brain 🧠'], answer: 'Heart ❤️' },
  { question: 'Which body part helps us think?', options: ['Brain 🧠', 'Hand ✋', 'Leg 🦵'], answer: 'Brain 🧠' },
  { question: 'Which body part do we use to walk?', options: ['Arms 💪', 'Legs 🦵', 'Eyes 👀'], answer: 'Legs 🦵' },
  { question: 'How many fingers do we have?', options: ['8', '10', '12'], answer: '10' },
  { question: 'Which helps us breathe?', options: ['Lungs 🫁', 'Heart ❤️', 'Stomach 🫃'], answer: 'Lungs 🫁' }
];

export const funFacts = [
  { fact: 'Your heart beats about 100,000 times per day!', emoji: '❤️' },
  { fact: 'You blink about 15-20 times every minute!', emoji: '👁️' },
  { fact: 'Your brain is more active at night than during the day!', emoji: '🧠' },
  { fact: 'Bones are stronger than steel of the same size!', emoji: '🦴' },
  { fact: 'Your nose can remember 50,000 different scents!', emoji: '👃' },
  { fact: 'You have about 10,000 taste buds!', emoji: '👅' },
  { fact: 'Your fingernails grow faster than your toenails!', emoji: '💅' },
  { fact: 'You are taller in the morning than at night!', emoji: '📏' }
];

export default {
  bodyParts,
  senses,
  healthyHabits,
  bodyQuiz,
  funFacts
};
