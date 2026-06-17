import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { hindiWords } from '../../../../data/hindiData';
import { speakHindi } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, slideIn, wiggle, confetti } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';

const ShikshakTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);
  const [learnedWords, setLearnedWords] = useState(new Set());

  const currentWord = hindiWords[currentIndex];

  useEffect(() => {
    // Auto-speak when word changes
    if (currentWord) {
      speakHindi(currentWord.word);
    }
  }, [currentIndex]);

  const handleNext = () => {
    playSound('click');
    if (currentIndex < hindiWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      
      // Award star for learning a new word
      if (!learnedWords.has(currentIndex + 1)) {
        playSound('star');
        addStars(2);
        setLearnedWords(prev => new Set([...prev, currentIndex + 1]));
        logActivity('hindi', 'shikshak', `Learned word: ${hindiWords[currentIndex + 1].word}`);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }
  };

  const handlePrevious = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSpeak = () => {
    playSound('click');
    speakHindi(currentWord.word);
  };

  const progress = ((currentIndex + 1) / hindiWords.length) * 100;

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
            Word {currentIndex + 1} of {hindiWords.length}
          </span>
          <span className="text-sm font-bold text-orange-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
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
          className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
          variants={slideIn}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, x: -100 }}
        >
          {/* Confetti effect */}
          {showConfetti && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              variants={confetti}
              initial="hidden"
              animate="visible"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`
                  }}
                  animate={{
                    y: ['0vh', '120vh'],
                    rotate: [0, 360],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    ease: 'easeOut'
                  }}
                >
                  {['⭐', '🌟', '✨', '🎉'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Emoji */}
          <motion.div
            className="text-9xl md:text-[12rem] text-center mb-6"
            variants={wiggle}
            animate="animate"
          >
            {currentWord.emoji}
          </motion.div>

          {/* Hindi Word */}
          <motion.div
            className="text-6xl md:text-8xl font-bold text-center text-orange-600 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {currentWord.word}
          </motion.div>

          {/* English Meaning */}
          <motion.div
            className="text-2xl md:text-3xl text-center text-gray-700 font-semibold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ({currentWord.meaning})
          </motion.div>

          {/* Listen Button */}
          <motion.button
            onClick={handleSpeak}
            className="mx-auto flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-xl hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 size={28} />
            <span>Listen Again</span>
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
              : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl hover:scale-105'
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
          disabled={currentIndex === hindiWords.length - 1}
          className={`
            flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all
            ${currentIndex === hindiWords.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-xl hover:scale-105'
            }
          `}
          whileHover={currentIndex !== hindiWords.length - 1 ? { scale: 1.05 } : {}}
          whileTap={currentIndex !== hindiWords.length - 1 ? { scale: 0.95 } : {}}
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
          Learn new Hindi words! Earn 2 stars for each new word!
        </p>
      </motion.div>
    </div>
  );
};

export default ShikshakTab;
