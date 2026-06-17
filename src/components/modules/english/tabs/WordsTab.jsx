import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Star, Lightbulb } from 'lucide-react';
import { simpleWords } from '../../../../data/englishData';
import { speakEnglish } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, slideIn, wiggle } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';

const WordsTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);
  const [learnedWords, setLearnedWords] = useState(new Set());

  const currentWord = simpleWords[currentIndex];

  const handleNext = () => {
    playSound('click');
    if (currentIndex < simpleWords.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setShowHint(false);
      
      // Award star for learning a new word
      if (!learnedWords.has(nextIndex)) {
        playSound('star');
        addStars(2);
        setLearnedWords(prev => new Set([...prev, nextIndex]));
        logActivity('english', 'words', `Learned word: ${simpleWords[nextIndex].word}`);
      }
      
      // Auto-speak the word
      speakEnglish(simpleWords[nextIndex].word);
    }
  };

  const handlePrevious = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowHint(false);
      speakEnglish(simpleWords[currentIndex - 1].word);
    }
  };

  const handleSpeak = () => {
    playSound('click');
    speakEnglish(currentWord.word);
  };

  const toggleHint = () => {
    playSound('click');
    setShowHint(!showHint);
    if (!showHint) {
      speakEnglish(currentWord.hint);
    }
  };

  const progress = ((currentIndex + 1) / simpleWords.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-700">
            Word {currentIndex + 1} of {simpleWords.length}
          </span>
          <span className="text-sm font-bold text-blue-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Word Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
          variants={slideIn}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, x: -100 }}
        >
          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl text-sm font-bold text-purple-600">
            {currentWord.category}
          </div>

          {/* Emoji */}
          <motion.div
            className="text-9xl md:text-[12rem] text-center mb-6"
            variants={wiggle}
            animate="animate"
          >
            {currentWord.emoji}
          </motion.div>

          {/* Word Display */}
          <motion.div
            className="text-center space-y-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {/* Word in large letters */}
            <div className="space-y-2">
              {currentWord.word.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-6xl md:text-8xl font-bold text-blue-600 mx-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Hint Button and Display */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={toggleHint}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-yellow-900 rounded-xl font-bold hover:bg-yellow-500 transition-all hover:scale-105"
              >
                <Lightbulb size={20} />
                <span>{showHint ? 'Hide' : 'Show'} Hint</span>
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    className="text-xl md:text-2xl text-gray-700 font-semibold bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    💡 {currentWord.hint}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Listen Button */}
          <motion.button
            onClick={handleSpeak}
            className="mx-auto mt-8 flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-xl hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 size={28} />
            <span>Hear the Word</span>
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div 
        className="flex items-center justify-between gap-4"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`
            flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all
            ${currentIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl hover:scale-105'
            }
          `}
          whileHover={currentIndex !== 0 ? { scale: 1.05 } : {}}
          whileTap={currentIndex !== 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft size={24} />
          <span>Previous</span>
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex === simpleWords.length - 1}
          className={`
            flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all
            ${currentIndex === simpleWords.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-xl hover:scale-105'
            }
          `}
          whileHover={currentIndex !== simpleWords.length - 1 ? { scale: 1.05 } : {}}
          whileTap={currentIndex !== simpleWords.length - 1 ? { scale: 0.95 } : {}}
        >
          <span>Next</span>
          <ChevronRight size={24} />
        </motion.button>
      </motion.div>

      {/* Instructions */}
      <motion.div 
        className="bg-blue-100 rounded-2xl p-4 text-center"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <p className="text-blue-800 font-semibold flex items-center justify-center gap-2">
          <Star size={20} className="text-yellow-500" />
          Learn simple words with pictures and hints! Earn 2 stars per word!
        </p>
      </motion.div>
    </div>
  );
};

export default WordsTab;
