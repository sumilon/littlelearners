import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, RefreshCw, Star, Lightbulb } from 'lucide-react';
import { visualPuzzles } from '../../../../data/brainGamesData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, wiggle } from '../../../../utils/animationUtils';

const PuzzleTab = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const filteredPuzzles = visualPuzzles.filter(p => p.difficulty === difficulty);
  const currentPuzzle = filteredPuzzles[currentPuzzleIndex];

  useEffect(() => {
    if (currentPuzzle) {
      speakEnglish(`Which one is different? Find the odd one out!`);
    }
  }, [currentPuzzleIndex, difficulty]);

  const handleItemSelect = (item) => {
    if (showResult) return;

    playSound('click');
    setSelectedItem(item.emoji);
    setAttempts(attempts + 1);

    const correct = item.emoji === currentPuzzle.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('correct');
      playSound('star');
      const starsEarned = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
      addStars(starsEarned);
      setScore(score + 1);
      logActivity('brainGames', 'puzzle', `Solved ${difficulty} odd-one-out puzzle`);
      speakEnglish(`Correct! ${currentPuzzle.explanation}`);
    } else {
      playSound('wrong');
      speakEnglish('Not quite! Look carefully at what makes each item special.');
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentPuzzleIndex < filteredPuzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    } else {
      setCurrentPuzzleIndex(0);
    }
    resetQuestion();
  };

  const handleTryAgain = () => {
    playSound('click');
    resetQuestion();
  };

  const resetQuestion = () => {
    setSelectedItem(null);
    setIsCorrect(null);
    setShowResult(false);
    setShowExplanation(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    playSound('click');
    setDifficulty(newDifficulty);
    setCurrentPuzzleIndex(0);
    setScore(0);
    setAttempts(0);
    resetQuestion();
  };

  const handleShowExplanation = () => {
    playSound('click');
    setShowExplanation(true);
    speakEnglish(currentPuzzle.explanation);
  };

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="space-y-6 pb-24">
      {/* Score Display */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{attempts}</div>
            <div className="text-sm text-gray-600">Attempts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Selector */}
      <motion.div 
        className="flex gap-3"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        {['easy', 'medium', 'hard'].map((level) => (
          <motion.button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg capitalize transition-all ${
              difficulty === level
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 border-2 border-purple-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level === 'easy' && '😊'} {level === 'medium' && '🤔'} {level === 'hard' && '🧠'} {level}
          </motion.button>
        ))}
      </motion.div>

      {/* Visual Puzzle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${difficulty}-${currentPuzzleIndex}`}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {/* Question Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">
              <Eye className="inline text-blue-500" size={28} /> Find the Odd One Out
            </h3>
            <p className="text-lg text-gray-600">
              Puzzle {currentPuzzleIndex + 1} / {filteredPuzzles.length}
            </p>
          </div>

          {/* Instruction */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6 text-center">
            <p className="text-xl font-semibold text-purple-700">
              🤔 Which one doesn't belong?
            </p>
          </div>

          {/* Items Grid */}
          {!showResult && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentPuzzle.items.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleItemSelect(item)}
                  className="bg-white border-4 border-purple-300 rounded-2xl p-8 hover:bg-purple-50 transition-all shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={scaleIn}
                  initial="initial"
                  animate="animate"
                  custom={idx}
                >
                  <div className="text-6xl mb-3">{item.emoji}</div>
                  <div className="text-lg font-semibold text-gray-700">{item.name}</div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Result Display with Items */}
          {showResult && (
            <>
              {/* Show all items with correct/incorrect indication */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currentPuzzle.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className={`rounded-2xl p-8 text-center border-4 ${
                      item.emoji === currentPuzzle.answer
                        ? 'bg-gradient-to-br from-green-400 to-green-500 border-green-600'
                        : item.emoji === selectedItem && !isCorrect
                        ? 'bg-gradient-to-br from-red-400 to-red-500 border-red-600'
                        : 'bg-white border-gray-300'
                    }`}
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    custom={idx}
                  >
                    <div className="text-6xl mb-3">{item.emoji}</div>
                    <div className="text-lg font-semibold text-gray-700">{item.name}</div>
                    {item.emoji === currentPuzzle.answer && (
                      <div className="text-white font-bold mt-2">✓ ODD ONE!</div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Result Message */}
              <motion.div
                variants={isCorrect ? scaleIn : wiggle}
                initial="initial"
                animate="animate"
                className={`p-6 rounded-2xl mb-6 text-center ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-green-400 to-green-500' 
                    : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
              >
                <div className="text-4xl mb-2">
                  {isCorrect ? '🎉' : '🤔'}
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {isCorrect ? 'Correct!' : 'Not quite!'}
                </div>
                <div className="text-xl text-white mb-4">
                  {isCorrect 
                    ? `+${difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4} stars ⭐`
                    : 'Try again or see the explanation!'
                  }
                </div>
                
                {/* Explanation */}
                {(isCorrect || showExplanation) && (
                  <div className="bg-white/20 rounded-xl p-4 mt-4">
                    <div className="text-white font-semibold mb-2">💡 Explanation:</div>
                    <div className="text-white text-lg">{currentPuzzle.explanation}</div>
                  </div>
                )}

                {!isCorrect && !showExplanation && (
                  <motion.button
                    onClick={handleShowExplanation}
                    className="mt-4 py-2 px-6 rounded-xl bg-white/30 text-white font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Lightbulb className="inline mr-2" size={20} />
                    Show Explanation
                  </motion.button>
                )}
              </motion.div>
            </>
          )}

          {/* Action Buttons */}
          {showResult && (
            <div className="flex gap-4">
              {!isCorrect && (
                <motion.button
                  onClick={handleTryAgain}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="inline mr-2" size={24} />
                  Try Again
                </motion.button>
              )}
              <motion.button
                onClick={handleNext}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Puzzle ➡️
              </motion.button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <motion.div 
        className="bg-yellow-100 rounded-2xl p-4 text-center"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <p className="text-lg text-gray-700">
          <Star className="inline text-yellow-500" size={20} /> 
          Find which item doesn't belong with the others! Earn {difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4} stars per correct answer!
        </p>
      </motion.div>
    </div>
  );
};

export default PuzzleTab;
