// Hindi Learning Data
// Contains Varnamala (alphabet), words, matras (vowel modifiers), and word-image pairs

// Varnamala - Hindi Alphabet (vowels and consonants)
export const varnamala = {
  vowels: [
    { letter: 'अ', english: 'a' },
    { letter: 'आ', english: 'aa' },
    { letter: 'इ', english: 'i' },
    { letter: 'ई', english: 'ee' },
    { letter: 'उ', english: 'u' },
    { letter: 'ऊ', english: 'oo' },
    { letter: 'ए', english: 'e' },
    { letter: 'ऐ', english: 'ai' },
    { letter: 'ओ', english: 'o' },
    { letter: 'औ', english: 'au' },
    { letter: 'अं', english: 'am' },
    { letter: 'अः', english: 'ah' }
  ],
  consonants: [
    { letter: 'क', english: 'ka' },
    { letter: 'ख', english: 'kha' },
    { letter: 'ग', english: 'ga' },
    { letter: 'घ', english: 'gha' },
    { letter: 'च', english: 'cha' },
    { letter: 'छ', english: 'chha' },
    { letter: 'ज', english: 'ja' },
    { letter: 'झ', english: 'jha' },
    { letter: 'ट', english: 'ta' },
    { letter: 'ठ', english: 'tha' },
    { letter: 'ड', english: 'da' },
    { letter: 'ढ', english: 'dha' },
    { letter: 'ण', english: 'na' },
    { letter: 'त', english: 'ta' },
    { letter: 'थ', english: 'tha' },
    { letter: 'द', english: 'da' },
    { letter: 'ध', english: 'dha' },
    { letter: 'न', english: 'na' },
    { letter: 'प', english: 'pa' },
    { letter: 'फ', english: 'pha' },
    { letter: 'ब', english: 'ba' },
    { letter: 'भ', english: 'bha' },
    { letter: 'म', english: 'ma' },
    { letter: 'य', english: 'ya' },
    { letter: 'र', english: 'ra' },
    { letter: 'ल', english: 'la' },
    { letter: 'व', english: 'va' },
    { letter: 'श', english: 'sha' },
    { letter: 'ष', english: 'sha' },
    { letter: 'स', english: 'sa' },
    { letter: 'ह', english: 'ha' },
    { letter: 'क्ष', english: 'ksha' },
    { letter: 'त्र', english: 'tra' },
    { letter: 'ज्ञ', english: 'gya' }
  ]
};

// Matras - Vowel modifiers
export const matras = [
  { matra: 'ा', name: 'आ की मात्रा', example: 'का', sound: 'aa' },
  { matra: 'ि', name: 'इ की मात्रा', example: 'कि', sound: 'i' },
  { matra: 'ी', name: 'ई की मात्रा', example: 'की', sound: 'ee' },
  { matra: 'ु', name: 'उ की मात्रा', example: 'कु', sound: 'u' },
  { matra: 'ू', name: 'ऊ की मात्रा', example: 'कू', sound: 'oo' },
  { matra: 'े', name: 'ए की मात्रा', example: 'के', sound: 'e' },
  { matra: 'ै', name: 'ऐ की मात्रा', example: 'कै', sound: 'ai' },
  { matra: 'ो', name: 'ओ की मात्रा', example: 'को', sound: 'o' },
  { matra: 'ौ', name: 'औ की मात्रा', example: 'कौ', sound: 'au' },
  { matra: 'ं', name: 'अनुस्वार', example: 'कं', sound: 'am' },
  { matra: 'ः', name: 'विसर्ग', example: 'कः', sound: 'ah' }
];

// Hindi words with emoji representations for Shikshak (Teacher) mode
export const hindiWords = [
  { word: 'आम', emoji: '🥭', meaning: 'Mango' },
  { word: 'केला', emoji: '🍌', meaning: 'Banana' },
  { word: 'सेब', emoji: '🍎', meaning: 'Apple' },
  { word: 'अंगूर', emoji: '🍇', meaning: 'Grapes' },
  { word: 'नारियल', emoji: '🥥', meaning: 'Coconut' },
  { word: 'तरबूज', emoji: '🍉', meaning: 'Watermelon' },
  
  { word: 'गाय', emoji: '🐄', meaning: 'Cow' },
  { word: 'कुत्ता', emoji: '🐕', meaning: 'Dog' },
  { word: 'बिल्ली', emoji: '🐈', meaning: 'Cat' },
  { word: 'हाथी', emoji: '🐘', meaning: 'Elephant' },
  { word: 'शेर', emoji: '🦁', meaning: 'Lion' },
  { word: 'बंदर', emoji: '🐵', meaning: 'Monkey' },
  { word: 'मछली', emoji: '🐟', meaning: 'Fish' },
  { word: 'चिड़िया', emoji: '🐦', meaning: 'Bird' },
  { word: 'तितली', emoji: '🦋', meaning: 'Butterfly' },
  
  { word: 'घर', emoji: '🏠', meaning: 'House' },
  { word: 'किताब', emoji: '📚', meaning: 'Book' },
  { word: 'गाड़ी', emoji: '🚗', meaning: 'Car' },
  { word: 'साइकिल', emoji: '🚲', meaning: 'Bicycle' },
  { word: 'फूल', emoji: '🌸', meaning: 'Flower' },
  { word: 'पेड़', emoji: '🌳', meaning: 'Tree' },
  { word: 'सूरज', emoji: '☀️', meaning: 'Sun' },
  { word: 'चाँद', emoji: '🌙', meaning: 'Moon' },
  { word: 'तारा', emoji: '⭐', meaning: 'Star' },
  { word: 'बादल', emoji: '☁️', meaning: 'Cloud' },
  
  { word: 'पानी', emoji: '💧', meaning: 'Water' },
  { word: 'दूध', emoji: '🥛', meaning: 'Milk' },
  { word: 'रोटी', emoji: '🫓', meaning: 'Roti/Bread' },
  { word: 'चावल', emoji: '🍚', meaning: 'Rice' },
  { word: 'आइसक्रीम', emoji: '🍦', meaning: 'Ice Cream' },
  
  { word: 'बॉल', emoji: '⚽', meaning: 'Ball' },
  { word: 'खिलौना', emoji: '🧸', meaning: 'Toy' },
  { word: 'रंग', emoji: '🎨', meaning: 'Color' },
  { word: 'स्कूल', emoji: '🏫', meaning: 'School' },
  { word: 'बस', emoji: '🚌', meaning: 'Bus' }
];

// Shabd Khel - Word matching game pairs
export const wordMatchingPairs = [
  { hindi: 'आम', emoji: '🥭' },
  { hindi: 'केला', emoji: '🍌' },
  { hindi: 'सेब', emoji: '🍎' },
  { hindi: 'गाय', emoji: '🐄' },
  { hindi: 'कुत्ता', emoji: '🐕' },
  { hindi: 'बिल्ली', emoji: '🐈' },
  { hindi: 'घर', emoji: '🏠' },
  { hindi: 'फूल', emoji: '🌸' },
  { hindi: 'सूरज', emoji: '☀️' },
  { hindi: 'चाँद', emoji: '🌙' },
  { hindi: 'पानी', emoji: '💧' },
  { hindi: 'बॉल', emoji: '⚽' }
];

// Practice words for matra exercises
export const matraWords = {
  'aa': ['बाल', 'काम', 'नाम', 'राम', 'पान', 'खान'],
  'i': ['दिन', 'चिड़िया', 'गिलास', 'किताब', 'पिता'],
  'ee': ['नीम', 'मीठा', 'पीला', 'भीम', 'सीता'],
  'u': ['गुलाब', 'कुत्ता', 'मुर्गा', 'फुल', 'सुबह'],
  'oo': ['भूल', 'धूप', 'दूध', 'सूरज', 'फूल'],
  'e': ['मेज', 'केला', 'देश', 'रेल', 'खेल'],
  'ai': ['मैदान', 'कैसा', 'भैंस', 'पैसा', 'बैठा'],
  'o': ['रोटी', 'बोतल', 'सोना', 'मोर', 'दोस्त'],
  'au': ['कौन', 'मौसम', 'औरत', 'कौआ', 'पौधा']
};
