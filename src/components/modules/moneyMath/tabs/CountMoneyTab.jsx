import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { indianCurrency, moneyProblems } from '../../../../data/moneyMathData';
import { shuffleArray } from '../../../../utils/gameHelpers';

function CountMoneyTab() {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [problems, setProblems] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const startGame = () => {
    playSound('click');
    const problemSet = moneyProblems[difficulty];
    const shuffled = shuffleArray([...problemSet]);
    setProblems(shuffled);
    setCurrentProblem(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameStarted(true);
    
    setTimeout(() => {
      speakEnglish(shuffled[0].question);
    }, 500);
  };

  const handleAnswerSelect = (answer) => {
    if (showResult) return;

    playSound('click');
    setSelectedAnswer(answer);
    setShowResult(true);

    const problem = problems[currentProblem];
    const correctAnswer = problem.total || problem.answer;
    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
      playSound('correct');
      setScore(score + 1);
      addStars(3);
      playSound('star');
      speakEnglish('Correct! Well done!');
      logActivity('Money Math', 'Count Money', `Solved ${difficulty} problem correctly`);
    } else {
      playSound('wrong');
      speakEnglish(`Wrong! The answer is ${correctAnswer} rupees`);
    }
  };

  const handleNext = () => {
    playSound('click');
    cancelSpeech();

    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      
      setTimeout(() => {
        speakEnglish(problems[currentProblem + 1].question);
      }, 300);
    } else {
      setGameStarted(false);
      setTimeout(() => {
        speakEnglish(`Great job! You scored ${score + 1} out of ${problems.length}`);
      }, 500);
    }
  };

  if (!gameStarted && problems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {/* Instructions */}
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Learn to Count Money!</h3>
                <p className="text-gray-700">
                  Practice counting Indian Rupees - coins and notes! 💰
                </p>
              </div>
            </div>
          </div>

          {/* Currency Reference */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Indian Currency:</h3>
            <div className="space-y-2">
              {indianCurrency.slice(0, 6).map((curr) => (
                <div key={`${curr.value}-${curr.type}`} className={`flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r ${curr.color}`}>
                  <span className="text-2xl">{curr.emoji}</span>
                  <span className="font-bold text-gray-800">{curr.name}</span>
                  <span className="ml-auto text-sm font-semibold">₹{curr.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Choose Difficulty
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => { setDifficulty('easy'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'easy'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌟 Easy (Small amounts)
              </button>
              <button
                onClick={() => { setDifficulty('medium'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'medium'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⭐ Medium (With change)
              </button>
              <button
                onClick={() => { setDifficulty('hard'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'hard'
                    ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔥 Hard (Big amounts)
              </button>
            </div>

            <button
              onClick={startGame}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-yellow-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Start Counting! 🚀
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!gameStarted && problems.length > 0) {
    const percentage = (score / problems.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="text-8xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Great Work!</h2>
            
            <div className="text-6xl font-bold text-green-600 my-6">
              {score}/{problems.length}
            </div>
            
            <p className="text-xl text-gray-700 mb-6">
              {percentage >= 80
                ? 'Excellent counting skills! 🎉'
                : percentage >= 60
                ? 'Good job! Keep practicing! 👍'
                : 'Nice try! Practice more! 💪'}
            </p>

            <button
              onClick={() => { setProblems([]); setGameStarted(false); }}
              className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
            >
              <RotateCcw className="w-6 h-6" />
              Play Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const problem = problems[currentProblem];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 p-4 pb-20">
      {/* Progress */}
      <motion.div
        className="bg-white rounded-xl p-4 mb-6 shadow-lg"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Problem {currentProblem + 1} of {problems.length}
          </span>
          <span className="text-sm font-bold text-green-600">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Problem Card */}
      <motion.div
        className="bg-white rounded-xl shadow-xl p-6 mb-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{problem.emoji}</div>
          <h3 className="text-xl font-bold text-gray-800">{problem.question}</h3>
        </div>

        {/* Show money items */}
        {problem.coins && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {problem.coins.map((coin, i) => (
              <div key={i} className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg">
                ₹{coin}
              </div>
            ))}
          </div>
        )}

        {problem.notes && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {problem.notes.map((note, i) => {
              const curr = indianCurrency.find(c => c.value === note && c.type === 'note');
              return (
                <div key={i} className={`bg-gradient-to-br ${curr?.color || 'from-green-400 to-green-600'} text-white rounded-lg px-4 py-2 font-bold text-lg shadow-lg`}>
                  ₹{note}
                </div>
              );
            })}
          </div>
        )}

        {problem.problem && (
          <div className="bg-blue-100 rounded-lg p-4 mb-4 text-center">
            <p className="font-semibold text-gray-800">{problem.problem}</p>
          </div>
        )}

        {/* Answer Options */}
        <div className="space-y-3">
          {problem.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const correctAnswer = problem.total || problem.answer;
            const isCorrectAnswer = option === correctAnswer;
            const shouldHighlight = showResult && (isSelected || isCorrectAnswer);

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-center font-bold text-xl transition-all ${
                  shouldHighlight
                    ? isCorrectAnswer
                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                      : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                ₹{option}
                {showResult && isCorrectAnswer && <span className="ml-2">✓</span>}
                {showResult && isSelected && !isCorrectAnswer && <span className="ml-2">✗</span>}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Next Button */}
      {showResult && (
        <motion.button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {currentProblem < problems.length - 1 ? 'Next Problem →' : 'See Results 🏆'}
        </motion.button>
      )}
    </div>
  );
}

export default CountMoneyTab;
