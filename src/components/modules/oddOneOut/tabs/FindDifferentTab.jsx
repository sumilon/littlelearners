import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { oddOneOutPuzzles, encouragementPhrases } from '../../../../data/oddOneOutData';

const FindDifferentTab = () => {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [shuffledItems, setShuffledItems] = useState([]);

  const puzzles = oddOneOutPuzzles[difficulty];
  const puzzle = puzzles[currentPuzzle];

  useEffect(() => {
    // Shuffle items when puzzle changes
    setShuffledItems([...puzzle.items].sort(() => Math.random() - 0.5));
    setShowExplanation(false);
    setSelectedItem(null);
  }, [currentPuzzle, difficulty]);

  const handleItemClick = (item) => {
    if (showExplanation) return;

    playSound('click');
    setSelectedItem(item);
    setAttempts(attempts + 1);

    if (item === puzzle.oddOne) {
      playSound('correct');
      playSound('star');
      const encouragement = encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)];
      speakEnglish(`${encouragement} ${puzzle.explanation}`);
      setScore(score + 1);
      setShowExplanation(true);
      
      const starsToAdd = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
      addStars(starsToAdd);
      logActivity('Odd One Out', 'Find Different', `Correct: ${puzzle.category}`);
    } else {
      playSound('wrong');
      speakEnglish('Try again! Look carefully.');
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
    } else {
      setCurrentPuzzle(0);
    }
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
    setCurrentPuzzle(0);
    setScore(0);
    setAttempts(0);
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Stats */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-3xl font-bold text-green-600">{score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Attempts</p>
            <p className="text-3xl font-bold text-blue-600">{attempts}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">
              {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-3xl font-bold text-orange-600">
              {currentPuzzle + 1}/{puzzles.length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Selector */}
      <div className="flex gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDifficultyChange('easy')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            difficulty === 'easy'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
              : 'bg-white text-gray-700'
          }`}
        >
          😊 Easy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDifficultyChange('medium')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            difficulty === 'medium'
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
              : 'bg-white text-gray-700'
          }`}
        >
          🤔 Medium
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDifficultyChange('hard')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            difficulty === 'hard'
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
              : 'bg-white text-gray-700'
          }`}
        >
          🔥 Hard
        </motion.button>
      </div>

      {/* Puzzle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPuzzle}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit={{ scale: 0, opacity: 0 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              Which one is different?
            </h2>
            <p className="text-2xl text-gray-700">Category: <span className="font-bold">{puzzle.category}</span></p>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            {shuffledItems.map((item, index) => {
              const isOddOne = item === puzzle.oddOne;
              const isSelected = item === selectedItem;
              const isCorrect = showExplanation && isOddOne;
              const isWrong = isSelected && !isOddOne && !showExplanation;

              return (
                <motion.button
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                  variants={isCorrect ? confetti : wiggle}
                  whileHover={{ scale: showExplanation ? 1 : 1.05, y: showExplanation ? 0 : -5 }}
                  whileTap={{ scale: showExplanation ? 1 : 0.95 }}
                  onClick={() => handleItemClick(item)}
                  disabled={showExplanation}
                  className={`aspect-square rounded-3xl p-8 text-8xl shadow-xl transition-all ${
                    isCorrect
                      ? 'bg-gradient-to-br from-green-400 to-emerald-400 ring-4 ring-green-300'
                      : isWrong
                      ? 'bg-gradient-to-br from-red-400 to-pink-400 ring-4 ring-red-300'
                      : 'bg-gradient-to-br from-purple-100 to-pink-100 hover:shadow-2xl'
                  }`}
                >
                  <motion.div
                    animate={!showExplanation ? {
                      rotate: [0, 2, 0, -2, 0],
                      scale: [1, 1.02, 1]
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {item}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-green-800 mb-2">
                    {encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)]}
                  </p>
                  <p className="text-2xl text-green-700">{puzzle.explanation}</p>
                </div>

                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                  >
                    Next Puzzle
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">How to Play:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>🔍 Look at all four items carefully</li>
              <li>🤔 Think about what makes them similar</li>
              <li>✨ Find the one that doesn't belong</li>
              <li>⭐ Earn more stars on harder levels!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FindDifferentTab;
