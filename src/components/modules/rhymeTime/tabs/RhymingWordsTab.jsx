import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn, confetti } from '../../../../utils/animationUtils';
import { rhymingPairs } from '../../../../data/rhymeTimeData';

const RhymingWordsTab = () => {
  const { addStars, logActivity } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [learnedPairs, setLearnedPairs] = useState(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const filteredPairs = rhymingPairs.filter(pair => pair.difficulty === difficulty);
  const currentPair = filteredPairs[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setLearnedPairs(new Set());
  }, [difficulty]);

  const handlePlaySound = () => {
    playSound('click');
    if (currentPair) {
      speakEnglish(`${currentPair.word1} rhymes with ${currentPair.word2}`);
    }
  };

  const handleLearnPair = () => {
    if (!learnedPairs.has(currentPair.id)) {
      setLearnedPairs(new Set([...learnedPairs, currentPair.id]));
      addStars(2);
      playSound('star');
      logActivity('rhymeTime', 'rhymingWords', `Learned rhyming pair: ${currentPair.word1} - ${currentPair.word2}`);
      
      if (learnedPairs.size + 1 === filteredPairs.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < filteredPairs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
  };

  if (!currentPair) {
    return <div className="text-center text-gray-600">No rhyming pairs available</div>;
  }

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
                {['🎵', '⭐', '🎉', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Progress:</span>
          <span className="text-pink-600 font-bold">{learnedPairs.size} / {filteredPairs.length}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(learnedPairs.size / filteredPairs.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="flex justify-center gap-3">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${
              difficulty === level
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Current Pair Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPair.id}
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="text-center space-y-6">
            {/* Word 1 */}
            <motion.div
              className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
              onClick={handlePlaySound}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-6xl mb-3">{currentPair.emoji1}</div>
              <div className="text-3xl font-bold text-pink-600">{currentPair.word1}</div>
            </motion.div>

            {/* Rhymes With */}
            <div className="text-2xl font-bold text-purple-600">
              rhymes with
            </div>

            {/* Word 2 */}
            <motion.div
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
              onClick={handlePlaySound}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-6xl mb-3">{currentPair.emoji2}</div>
              <div className="text-3xl font-bold text-purple-600">{currentPair.word2}</div>
            </motion.div>

            {/* Learn Button */}
            <motion.button
              onClick={handleLearnPair}
              disabled={learnedPairs.has(currentPair.id)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                learnedPairs.has(currentPair.id)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg'
              }`}
              whileHover={!learnedPairs.has(currentPair.id) ? { scale: 1.05 } : {}}
              whileTap={!learnedPairs.has(currentPair.id) ? { scale: 0.95 } : {}}
            >
              {learnedPairs.has(currentPair.id) ? (
                <>
                  <Star className="inline mr-2" size={24} />
                  Learned! +2 ⭐
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
          {currentIndex + 1} / {filteredPairs.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredPairs.length - 1}
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
          <span className="font-semibold ml-2">Tap the words to hear them! Mark each pair as learned to earn 2 stars!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default RhymingWordsTab;
