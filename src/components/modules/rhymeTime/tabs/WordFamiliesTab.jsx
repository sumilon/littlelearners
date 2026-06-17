import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Volume2 } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn, confetti } from '../../../../utils/animationUtils';
import { wordFamilies } from '../../../../data/rhymeTimeData';

const WordFamiliesTab = () => {
  const { addStars, logActivity } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedFamilies, setLearnedFamilies] = useState(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const currentFamily = wordFamilies[currentIndex];

  const handlePlayFamily = () => {
    playSound('click');
    speakEnglish(`${currentFamily.family} family: ${currentFamily.words.map(w => w.word).join(', ')}`);
  };

  const handlePlayWord = (word) => {
    playSound('click');
    speakEnglish(word);
  };

  const handleLearnFamily = () => {
    if (!learnedFamilies.has(currentFamily.family)) {
      setLearnedFamilies(new Set([...learnedFamilies, currentFamily.family]));
      addStars(3);
      playSound('star');
      logActivity('rhymeTime', 'wordFamilies', `Learned word family: ${currentFamily.family}`);
      
      if (learnedFamilies.size + 1 === wordFamilies.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < wordFamilies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            variants={confetti}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: 0,
                  transition: { duration: 2, ease: 'easeOut' }
                }}
              >
                {['📖', '⭐', '🎉', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Families Learned:</span>
          <span className="text-purple-600 font-bold">{learnedFamilies.size} / {wordFamilies.length}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(learnedFamilies.size / wordFamilies.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Family Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFamily.family}
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Family Header */}
          <div className="text-center mb-6">
            <motion.h2 
              className="text-4xl font-bold text-purple-600 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {currentFamily.family} family
            </motion.h2>
            <button
              onClick={handlePlayFamily}
              className="flex items-center gap-2 mx-auto px-6 py-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
            >
              <Volume2 size={20} className="text-purple-600" />
              <span className="text-purple-600 font-semibold">Hear All Words</span>
            </button>
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {currentFamily.words.map((wordObj, index) => (
              <motion.button
                key={index}
                onClick={() => handlePlayWord(wordObj.word)}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-2">{wordObj.emoji}</div>
                <div className="text-2xl font-bold text-purple-600">{wordObj.word}</div>
              </motion.button>
            ))}
          </div>

          {/* Learn Button */}
          <div className="text-center">
            <motion.button
              onClick={handleLearnFamily}
              disabled={learnedFamilies.has(currentFamily.family)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                learnedFamilies.has(currentFamily.family)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
              }`}
              whileHover={!learnedFamilies.has(currentFamily.family) ? { scale: 1.05 } : {}}
              whileTap={!learnedFamilies.has(currentFamily.family) ? { scale: 0.95 } : {}}
            >
              {learnedFamilies.has(currentFamily.family) ? (
                <>
                  <Star className="inline mr-2" size={24} />
                  Learned! +3 ⭐
                </>
              ) : (
                'Mark as Learned'
              )}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={24} />
          Previous
        </button>

        <span className="text-gray-600 font-semibold">
          {currentIndex + 1} / {wordFamilies.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === wordFamilies.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <Star className="inline text-yellow-500" size={20} />
          <span className="font-semibold ml-2">Tap each word to hear it! Complete the family to earn 3 stars!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default WordFamiliesTab;
