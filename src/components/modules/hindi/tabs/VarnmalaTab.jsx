import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star } from 'lucide-react';
import { varnamala } from '../../../../data/hindiData';
import { speakHindi } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, wiggle } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';

const VarnmalaTab = () => {
  const [selectedType, setSelectedType] = useState('vowels'); // vowels or consonants
  const [selectedLetter, setSelectedLetter] = useState(null);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const letters = selectedType === 'vowels' ? varnamala.vowels : varnamala.consonants;

  const handleLetterClick = (letter) => {
    playSound('click');
    setSelectedLetter(letter);
    
    // Speak the letter in Hindi
    speakHindi(letter.letter);
    
    // Award star on first click of each letter
    if (!letter.clicked) {
      playSound('star');
      addStars(1);
      letter.clicked = true;
      logActivity('hindi', 'varnamala', `Learned letter ${letter.letter}`);
    }
  };

  const speakAll = () => {
    playSound('click');
    const allLetters = letters.map(l => l.letter).join(' ');
    speakHindi(allLetters);
  };

  return (
    <div className="relative min-h-[50vh] max-h-[calc(100vh-180px)] flex flex-col px-3 py-2">
      {/* Type Selector - Compact */}
      <motion.div 
        className="flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-2 mb-3"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-orange-600">
            {selectedType === 'vowels' ? 'स्वर (Vowels)' : 'व्यंजन (Consonants)'}
          </h2>
          
          <button
            onClick={speakAll}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 text-xs"
          >
            <Volume2 size={14} />
            <span className="font-bold">Speak All</span>
          </button>
        </div>

        {/* Toggle Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              playSound('click');
              setSelectedType('vowels');
              setSelectedLetter(null);
            }}
            className={`
              px-3 py-2 rounded-lg font-bold text-sm transition-all
              ${selectedType === 'vowels'
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            स्वर (Vowels)
          </button>
          
          <button
            onClick={() => {
              playSound('click');
              setSelectedType('consonants');
              setSelectedLetter(null);
            }}
            className={`
              px-3 py-2 rounded-lg font-bold text-sm transition-all
              ${selectedType === 'consonants'
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            व्यंजन (Consonants)
          </button>
        </div>
      </motion.div>

      {/* Letters Grid - Fit to screen with scroll */}
      <motion.div 
        className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 overflow-y-auto"
        layout
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedType}
            className={`grid gap-2 pb-4 ${
              selectedType === 'vowels' 
                ? 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6' 
                : 'grid-cols-5 sm:grid-cols-6 md:grid-cols-7'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {letters.map((letter, index) => (
              <motion.button
                key={letter.letter}
                onClick={() => handleLetterClick(letter)}
                className={`
                  relative aspect-square flex flex-col items-center justify-center
                  rounded-xl font-bold transition-all
                  ${selectedLetter?.letter === letter.letter
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl z-20'
                    : 'bg-gradient-to-br from-orange-100 to-pink-100 text-orange-800 hover:shadow-lg z-0'
                  }
                `}
                whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: selectedLetter?.letter === letter.letter ? 1.05 : 1,
                  zIndex: selectedLetter?.letter === letter.letter ? 20 : 0
                }}
                transition={{ delay: index * 0.02 }}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl">{letter.letter}</span>
                <span className="text-[10px] sm:text-xs text-gray-600 mt-1">{letter.english}</span>
                
                {/* Sound icon indicator */}
                <motion.div
                  className="absolute top-1 right-1"
                  animate={selectedLetter?.letter === letter.letter ? {
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5, repeat: selectedLetter?.letter === letter.letter ? Infinity : 0 }}
                >
                  <Volume2 
                    size={12} 
                    className={`${selectedLetter?.letter === letter.letter ? 'text-white' : 'text-orange-400'}`}
                  />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Selected Letter Display - Floating Overlay */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-xl shadow-2xl p-6 md:p-8 text-center max-w-md w-full"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all hover:scale-110"
                aria-label="Close letter display"
              >
                ×
              </button>

              <motion.div
                className="text-7xl md:text-8xl lg:text-9xl mb-4"
                variants={wiggle}
                animate="animate"
              >
                {selectedLetter.letter}
              </motion.div>
              
              <div className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                {selectedLetter.english}
              </div>
              
              <button
                onClick={() => {
                  playSound('click');
                  speakHindi(selectedLetter.letter);
                }}
                className="mt-4 px-6 md:px-8 py-3 md:py-4 bg-white text-orange-600 rounded-xl font-bold text-lg md:text-xl lg:text-2xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-lg"
              >
                <Volume2 size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
                <span>Listen Again</span>
              </button>
              
              <p className="mt-4 text-white/80 text-sm">
                Click outside or the × to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VarnmalaTab;
