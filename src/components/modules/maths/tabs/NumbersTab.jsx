import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { numbers } from '../../../../data/mathsData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, confetti } from '../../../../utils/animationUtils';

export default function NumbersTab() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedNumbers, setLearnedNumbers] = useState(new Set());
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const currentNumber = numbers[currentIndex];

  // Speak number when changed
  useEffect(() => {
    speakNumber();
  }, [currentIndex]);

  const speakNumber = () => {
    const text = `${currentNumber.number}, ${currentNumber.word}`;
    speakEnglish(text);
  };

  const handleNext = () => {
    if (currentIndex < numbers.length - 1) {
      playSound('click');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSound('click');
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLearnNumber = () => {
    const numValue = currentNumber.number;
    
    if (!learnedNumbers.has(numValue)) {
      playSound('correct');
      playSound('star');
      addStars(1);
      setLearnedNumbers(new Set([...learnedNumbers, numValue]));
      logActivity('maths', 'numbers', `Learned number ${numValue}`);
    } else {
      playSound('click');
    }
    
    speakNumber();
  };

  // Generate visual counter emojis
  const renderCounter = () => {
    if (currentNumber.number === 0) {
      return <div className="text-6xl">⭕</div>;
    }
    
    const emojis = [];
    for (let i = 0; i < currentNumber.number; i++) {
      emojis.push(
        <motion.span
          key={i}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={{ delay: i * 0.1 }}
          className="text-4xl inline-block m-1"
        >
          {currentNumber.countEmoji}
        </motion.span>
      );
    }
    return emojis;
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="text-center text-gray-600">
        <p className="text-lg font-semibold">
          Learned: {learnedNumbers.size} / {numbers.length}
        </p>
      </div>

      {/* Number Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center space-y-6"
        >
          {/* Number Emoji */}
          <div className="text-8xl mb-4">{currentNumber.emoji}</div>

          {/* Number and Word */}
          <div className="space-y-2">
            <h3 className="text-7xl font-bold text-purple-600">
              {currentNumber.number}
            </h3>
            <p className="text-3xl font-semibold text-gray-700">
              {currentNumber.word}
            </p>
            <p className="text-xl text-gray-500 italic">
              ({currentNumber.pronunciation})
            </p>
          </div>

          {/* Visual Counter */}
          <div className="bg-white rounded-xl p-6 min-h-[120px] flex flex-wrap justify-center items-center gap-2">
            {renderCounter()}
          </div>

          {/* Learn Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLearnNumber}
            className={`w-full py-4 rounded-xl text-xl font-bold transition-colors flex items-center justify-center gap-2 ${
              learnedNumbers.has(currentNumber.number)
                ? 'bg-green-500 text-white'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            {learnedNumbers.has(currentNumber.number) ? 'Learned!' : 'Learn This Number'}
            {learnedNumbers.has(currentNumber.number) && ' ⭐'}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
            currentIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-center text-gray-600 font-semibold">
          {currentIndex + 1} / {numbers.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === numbers.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
            currentIndex === numbers.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <span className="font-bold">⭐ Tap "Learn This Number"</span> to hear and earn 1 star!
        </p>
      </div>

      {/* Confetti on milestones */}
      {(learnedNumbers.size === 10 || learnedNumbers.size === 21) && (
        <motion.div
          variants={confetti}
          initial="initial"
          animate="animate"
          className="fixed inset-0 pointer-events-none"
        >
          <div className="text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            🎉🎊✨
          </div>
        </motion.div>
      )}
    </div>
  );
}
