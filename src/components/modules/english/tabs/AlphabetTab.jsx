import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star } from 'lucide-react';
import { alphabet } from '../../../../data/englishData';
import { speakEnglish } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, wiggle } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';

const AlphabetTab = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);
  const [learnedLetters, setLearnedLetters] = useState(new Set());

  const handleLetterClick = (letter) => {
    playSound('click');
    setSelectedLetter(letter);
    
    // Speak the letter name
    speakEnglish(`${letter.letter}. ${letter.letter} for ${letter.example}`);
    
    // Award star on first click of each letter
    if (!learnedLetters.has(letter.letter)) {
      playSound('star');
      addStars(1);
      setLearnedLetters(prev => new Set([...prev, letter.letter]));
      logActivity('english', 'alphabet', `Learned letter ${letter.letter}`);
    }
  };

  const speakAll = () => {
    playSound('click');
    const allLetters = alphabet.map(l => l.letter).join(', ');
    speakEnglish(`The English alphabet: ${allLetters}`);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-180px)] flex flex-col px-3 py-2">
      {/* Header - Compact */}
      <motion.div 
        className="flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 mb-3"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-blue-600">
            Learn Alphabet (A-Z)
          </h2>
          
          <button
            onClick={speakAll}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all hover:scale-105 active:scale-95 text-xs"
          >
            <Volume2 size={14} />
            <span className="font-bold">Sing ABC</span>
          </button>
        </div>

        <div className="text-gray-600 text-xs">
          Click any letter to learn! {learnedLetters.size}/26 learned
        </div>
      </motion.div>

      {/* Alphabet Grid - Fit to screen */}
      <motion.div 
        className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 overflow-hidden"
        layout
      >
        <div className="h-full grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 gap-2 content-center">
          {alphabet.map((letter, index) => {
            const isLearned = learnedLetters.has(letter.letter);
            
            return (
              <motion.button
                key={letter.letter}
                onClick={() => handleLetterClick(letter)}
                className={`
                  relative aspect-square flex items-center justify-center
                  rounded-xl font-bold transition-all
                  ${selectedLetter?.letter === letter.letter
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl scale-110 z-10'
                    : isLearned
                    ? 'bg-gradient-to-br from-green-100 to-teal-100 text-green-800 hover:shadow-lg'
                    : 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-800 hover:shadow-lg'
                  }
                `}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl">{letter.letter}</span>
                
                {/* Learned indicator */}
                {isLearned && (
                  <motion.div
                    className="absolute top-0.5 right-0.5 text-yellow-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Star size={16} fill="currentColor" />
                  </motion.div>
                )}

                {/* Sound icon indicator */}
                <motion.div
                  className="absolute bottom-0.5 right-0.5"
                  animate={selectedLetter?.letter === letter.letter ? {
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5, repeat: selectedLetter?.letter === letter.letter ? Infinity : 0 }}
                >
                  <Volume2 
                    size={16} 
                    className={selectedLetter?.letter === letter.letter ? 'text-white' : 'text-blue-600'}
                  />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Letter Display */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-2xl shadow-2xl p-8 text-center"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Uppercase and Lowercase */}
              <div>
                <motion.div
                  className="text-9xl font-bold text-white mb-4"
                  variants={wiggle}
                  animate="animate"
                >
                  {selectedLetter.letter}
                </motion.div>
                
                <div className="text-7xl text-white/80 mb-4">
                  {selectedLetter.lowercase}
                </div>
                
                <div className="text-2xl text-white font-semibold">
                  ({selectedLetter.phonics})
                </div>
              </div>

              {/* Right: Example Word */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-8xl mb-4">
                  {selectedLetter.emoji}
                </div>
                
                <div className="text-4xl font-bold text-white mb-2">
                  {selectedLetter.letter} for {selectedLetter.example}
                </div>
                
                <button
                  onClick={() => {
                    playSound('click');
                    speakEnglish(`${selectedLetter.letter}. ${selectedLetter.letter} for ${selectedLetter.example}`);
                  }}
                  className="mt-4 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                >
                  <Volume2 size={28} />
                  <span>Listen Again</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div 
        className="bg-blue-100 rounded-2xl p-4 text-center"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <p className="text-blue-800 font-semibold flex items-center justify-center gap-2">
          <Star size={20} className="text-yellow-500" />
          Click on letters to learn the alphabet! Earn 1 star per letter!
        </p>
      </motion.div>
    </div>
  );
};

export default AlphabetTab;
