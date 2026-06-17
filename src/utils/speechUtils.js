// Web Speech API utilities for text-to-speech

import useStore from '../store/useStore';

// Cache for loaded voices
let voicesLoaded = false;
let availableVoices = [];

// Load voices and cache them
const loadVoices = () => {
  return new Promise((resolve) => {
    if (voicesLoaded) {
      resolve(availableVoices);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      availableVoices = voices;
      voicesLoaded = true;
      resolve(voices);
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        availableVoices = window.speechSynthesis.getVoices();
        voicesLoaded = true;
        resolve(availableVoices);
      });
    }
  });
};

// Cancel any ongoing speech
export const cancelSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Speak text in Hindi
export const speakHindi = async (text, rate = 0.8) => {
  if (!useStore.getState().soundEnabled) return;
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  cancelSpeech();

  // Wait for voices to load
  const voices = await loadVoices();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN';
  utterance.rate = rate;
  utterance.pitch = 1.1; // Slightly higher pitch for kids
  utterance.volume = 1.0;

  // Try to find a Hindi voice
  const hindiVoice = voices.find(voice => 
    voice.lang === 'hi-IN' || voice.lang.startsWith('hi')
  );
  
  if (hindiVoice) {
    utterance.voice = hindiVoice;
  } else {
    console.warn('No Hindi voice found, using default voice');
  }

  window.speechSynthesis.speak(utterance);
};

// Speak text in English
export const speakEnglish = async (text, rate = 0.8) => {
  if (!useStore.getState().soundEnabled) return;
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  cancelSpeech();

  // Wait for voices to load
  const voices = await loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  utterance.rate = rate;
  utterance.pitch = 1.1;
  utterance.volume = 1.0;

  // Try to find an English-India voice
  const englishVoice = voices.find(voice => 
    voice.lang === 'en-IN' || voice.lang.startsWith('en')
  );
  
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};

// Speak with custom language
export const speak = async (text, lang = 'en-IN', rate = 0.8) => {
  if (!useStore.getState().soundEnabled) return;
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  cancelSpeech();

  // Wait for voices to load
  const voices = await loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1.1;
  utterance.volume = 1.0;

  // Try to find a voice matching the language
  const matchingVoice = voices.find(voice => voice.lang === lang || voice.lang.startsWith(lang.split('-')[0]));
  
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  window.speechSynthesis.speak(utterance);
};

// Get available voices (useful for debugging)
export const getVoices = () => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.getVoices();
  }
  return [];
};

// Check if speech synthesis is supported
export const isSpeechSupported = () => {
  return 'speechSynthesis' in window;
};
