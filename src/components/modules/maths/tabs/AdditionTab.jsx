import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Volume2 } from 'lucide-react';
import { additionProblems } from '../../../../data/mathsData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';

export default function AdditionTab() {
  const [problems, setProblems] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  // Initialize problems
  useEffect(() => {
    setProblems(shuffle([...additionProblems]));
  }, []);

  const currentProblem = problems[currentProblemIndex];

  // Speak problem when changed
  useEffect(() => {
    if (currentProblem) {
      setTimeout(() => {
        speakProblem();
      }, 500);
    }
  }, [currentProblemIndex]);

  const speakProblem = () => {
    if (currentProblem) {
      speakEnglish(`${currentProblem.num1} plus ${currentProblem.num2} equals?`);
    }
  };

  const handleSubmit = () => {
    if (!userAnswer || showResult) return;
    
    const answer = parseInt(userAnswer);
    setAttempts(attempts + 1);
    
    if (answer === currentProblem.answer) {
      // Correct!
      playSound('correct');
      playSound('star');
      setIsCorrect(true);
      setShowResult(true);
      setScore(score + 1);
      addStars(3);
      logActivity('maths', 'addition', `Solved ${currentProblem.num1} + ${currentProblem.num2} = ${currentProblem.answer}`);
      speakEnglish(`Correct! ${currentProblem.num1} plus ${currentProblem.num2} equals ${currentProblem.answer}!`);
      
      // Auto-advance to next problem after 3 seconds
      setTimeout(() => {
        handleNext();
      }, 3000);
    } else {
      // Wrong
      playSound('wrong');
      setIsCorrect(false);
      setShowResult(true);
      speakEnglish(`Try again! ${currentProblem.num1} plus ${currentProblem.num2} equals ${currentProblem.answer}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      // Reshuffle for new round
      setProblems(shuffle([...additionProblems]));
      setCurrentProblemIndex(0);
    }
    
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleTryAgain = () => {
    playSound('click');
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    speakProblem();
  };

  // Render visual emojis for numbers
  const renderEmojis = (count, emoji) => {
    const emojis = [];
    for (let i = 0; i < count; i++) {
      emojis.push(
        <motion.span
          key={i}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={{ delay: i * 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl inline-block m-0.5 md:m-1"
        >
          {emoji}
        </motion.span>
      );
    }
    return emojis;
  };

  if (!currentProblem) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="space-y-4 md:space-y-6 max-h-[calc(100vh-140px)] overflow-y-auto px-2">
      {/* Stats */}
      <div className="flex justify-between items-center text-sm md:text-base">
        <div className="text-base md:text-lg font-semibold text-gray-600">
          Problem: {currentProblemIndex + 1} / {problems.length}
        </div>
        <div className="text-base md:text-lg font-semibold text-purple-600">
          Score: {score} ⭐
        </div>
        <div className="text-base md:text-lg font-semibold text-blue-600">
          {accuracy}% ✓
        </div>
      </div>

      {/* Problem Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProblemIndex}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl md:rounded-2xl p-3 md:p-6 space-y-3 md:space-y-6"
        >
          {/* Visual Representation */}
          <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 space-y-2 md:space-y-4">
            {/* First Number */}
            <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 min-h-[50px] md:min-h-[60px]">
              {renderEmojis(currentProblem.num1, currentProblem.emoji)}
            </div>
            
            {/* Plus Sign */}
            <div className="text-4xl md:text-5xl lg:text-6xl text-center text-green-600 font-bold">+</div>
            
            {/* Second Number */}
            <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 min-h-[50px] md:min-h-[60px]">
              {renderEmojis(currentProblem.num2, currentProblem.emoji)}
            </div>
          </div>

          {/* Math Expression */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg md:rounded-xl p-3 md:p-6 text-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {currentProblem.num1} + {currentProblem.num2} = ?
            </p>
          </div>

          {/* Answer Input */}
          {!showResult && (
            <div className="space-y-3 md:space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Your answer"
                className="w-full text-2xl md:text-3xl lg:text-4xl text-center font-bold py-3 md:py-4 rounded-lg md:rounded-xl border-4 border-purple-300 focus:border-purple-500 focus:outline-none"
                autoFocus
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!userAnswer}
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl text-lg md:text-xl font-bold transition-colors ${
                  userAnswer
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Check Answer ✓
              </motion.button>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <motion.div
              variants={isCorrect ? confetti : wiggle}
              initial="initial"
              animate="animate"
              className={`rounded-lg md:rounded-xl p-4 md:p-6 text-center text-white ${
                isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {isCorrect ? '🎉 Correct!' : '❌ Try Again!'}
              </p>
              <p className="text-xl md:text-2xl mb-3 md:mb-4">
                {currentProblem.num1} + {currentProblem.num2} = {currentProblem.answer}
              </p>
              {isCorrect && <p className="text-lg md:text-xl">+3 Stars ⭐⭐⭐</p>}
              
              <div className="flex gap-3 md:gap-4 mt-4 md:mt-6">
                {!isCorrect && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTryAgain}
                    className="flex-1 bg-white text-red-600 py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                    Try Again
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="flex-1 bg-white text-green-600 py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-bold hover:bg-gray-100 transition-colors"
                >
                  Next Problem →
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Speak Button */}
      <button
        onClick={speakProblem}
        className="w-full bg-purple-100 text-purple-600 py-3 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-semibold flex items-center justify-center gap-2 hover:bg-purple-200 transition-colors"
      >
        <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
        Repeat Problem
      </button>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg md:rounded-xl p-3 md:p-4 text-center">
        <p className="text-gray-700 text-sm md:text-base">
          <span className="font-bold">⭐ Count the emojis</span> and type the answer. Get 3 stars for each correct answer!
        </p>
      </div>
    </div>
  );
}
