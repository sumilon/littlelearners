// Story Builder Module Data
// Interactive story creation elements

export const storyCharacters = [
  { id: 'boy', name: 'Boy', emoji: '👦', type: 'character' },
  { id: 'girl', name: 'Girl', emoji: '👧', type: 'character' },
  { id: 'cat', name: 'Cat', emoji: '🐱', type: 'character' },
  { id: 'dog', name: 'Dog', emoji: '🐶', type: 'character' },
  { id: 'princess', name: 'Princess', emoji: '👸', type: 'character' },
  { id: 'prince', name: 'Prince', emoji: '🤴', type: 'character' },
  { id: 'wizard', name: 'Wizard', emoji: '🧙', type: 'character' },
  { id: 'fairy', name: 'Fairy', emoji: '🧚', type: 'character' },
  { id: 'robot', name: 'Robot', emoji: '🤖', type: 'character' },
  { id: 'alien', name: 'Alien', emoji: '👽', type: 'character' },
  { id: 'monster', name: 'Monster', emoji: '👹', type: 'character' },
  { id: 'superhero', name: 'Superhero', emoji: '🦸', type: 'character' }
];

export const storySettings = [
  { id: 'forest', name: 'Forest', emoji: '🌲', type: 'setting' },
  { id: 'castle', name: 'Castle', emoji: '🏰', type: 'setting' },
  { id: 'beach', name: 'Beach', emoji: '🏖️', type: 'setting' },
  { id: 'space', name: 'Space', emoji: '🚀', type: 'setting' },
  { id: 'city', name: 'City', emoji: '🏙️', type: 'setting' },
  { id: 'school', name: 'School', emoji: '🏫', type: 'setting' },
  { id: 'park', name: 'Park', emoji: '🎡', type: 'setting' },
  { id: 'mountain', name: 'Mountain', emoji: '⛰️', type: 'setting' },
  { id: 'ocean', name: 'Ocean', emoji: '🌊', type: 'setting' },
  { id: 'garden', name: 'Garden', emoji: '🌺', type: 'setting' }
];

export const storyActions = [
  { id: 'found', text: 'found', emoji: '🔍' },
  { id: 'lost', text: 'lost', emoji: '❓' },
  { id: 'helped', text: 'helped', emoji: '🤝' },
  { id: 'played', text: 'played with', emoji: '🎮' },
  { id: 'saved', text: 'saved', emoji: '🦸' },
  { id: 'met', text: 'met', emoji: '👋' },
  { id: 'explored', text: 'explored', emoji: '🗺️' },
  { id: 'discovered', text: 'discovered', emoji: '✨' },
  { id: 'chased', text: 'chased', emoji: '🏃' },
  { id: 'taught', text: 'taught', emoji: '📚' }
];

export const storyObjects = [
  { id: 'treasure', name: 'treasure', emoji: '💎', type: 'object' },
  { id: 'book', name: 'magic book', emoji: '📖', type: 'object' },
  { id: 'key', name: 'golden key', emoji: '🔑', type: 'object' },
  { id: 'crown', name: 'crown', emoji: '👑', type: 'object' },
  { id: 'wand', name: 'magic wand', emoji: '🪄', type: 'object' },
  { id: 'star', name: 'shining star', emoji: '⭐', type: 'object' },
  { id: 'balloon', name: 'balloon', emoji: '🎈', type: 'object' },
  { id: 'flower', name: 'beautiful flower', emoji: '🌸', type: 'object' },
  { id: 'rainbow', name: 'rainbow', emoji: '🌈', type: 'object' },
  { id: 'cake', name: 'birthday cake', emoji: '🎂', type: 'object' }
];

export const storyEndings = [
  { id: 'happy', text: 'and they lived happily ever after!', emoji: '😊' },
  { id: 'friends', text: 'and became best friends forever!', emoji: '🤗' },
  { id: 'learn', text: 'and learned something special!', emoji: '🌟' },
  { id: 'celebrate', text: 'and celebrated together!', emoji: '🎉' },
  { id: 'home', text: 'and went home with a smile!', emoji: '🏡' },
  { id: 'adventure', text: 'and started a new adventure!', emoji: '🗺️' }
];

export const storyTemplates = [
  {
    id: 'template-1',
    name: 'Classic Adventure',
    structure: ['character', 'setting', 'action', 'object', 'ending'],
    example: 'A [character] went to a [setting] and [action] a [object]. [ending]'
  },
  {
    id: 'template-2',
    name: 'Friendship Tale',
    structure: ['character', 'character', 'setting', 'action', 'ending'],
    example: 'A [character] and a [character] [action] at the [setting]. [ending]'
  },
  {
    id: 'template-3',
    name: 'Discovery Story',
    structure: ['character', 'setting', 'action', 'object', 'ending'],
    example: 'One day, a [character] was in the [setting] and [action] a magical [object]. [ending]'
  }
];

export const sentenceStarters = [
  'Once upon a time',
  'One sunny day',
  'Long ago',
  'In a faraway land',
  'One magical morning',
  'Yesterday'
];

export default {
  storyCharacters,
  storySettings,
  storyActions,
  storyObjects,
  storyEndings,
  storyTemplates,
  sentenceStarters
};
