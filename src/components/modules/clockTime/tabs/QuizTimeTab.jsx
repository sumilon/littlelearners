import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trophy, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, confetti } from '../../../../utils/animationUtils';
import { timeQuizQuestions, getClockHandPositions } from '../../../../data/clockTimeData';

const QuizTimeTab = () => {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    startQuiz();
  }, [difficulty]);

  const startQuiz = () => {
    const filtered = timeQuizQuestions.filter(q => q.difficulty === difficulty);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    
    playSound('click');
    setSelectedAnswer(answer);
    setShowResult(true);

    const question = questions[currentQuestion];
    const isCorrect = answer === question.answer;

    if (isCorrect) {
      playSound('correct');
      speakEnglish('Correct!');
      setScore(score + 1);
    } else {
      playSound('wrong');
      speakEnglish(`Wrong! The correct answer is ${question.answer}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      
      const percentage = (score / questions.length) * 100;
      let stars = 0;
      if (percentage >= 80) stars = 5;
      else if (percentage >= 60) stars = 4;
      else if (percentage >= 40) stars = 3;
      else if (percentage >= 20) stars = 2;
      else stars = 1;

      addStars(stars);
      playSound('star');
      logActivity('Clock Time', 'Quiz Time', `Score: ${score}/${questions.length} (${difficulty})`);
      speakEnglish(`Quiz complete! You scored ${score} out of ${questions.length}!`);
    }
  };

  if (questions.length === 0) return null;

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <motion.div
        variants={confetti}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div
          variants={scaleIn}
          className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-12 shadow-2xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-9xl mb-6"
          >
            🏆
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-6">Quiz Complete!</h2>
          <div className="text-8xl font-bold text-white mb-6">
            {score}/{questions.length}
          </div>
          <div className="text-3xl font-semibold text-white/90 mb-8">
            {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Great Job!' : percentage >= 40 ? 'Good Try!' : 'Keep Practicing!'}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startQuiz}
            className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
          >
            <RotateCcw className="w-8 h-8" />
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const { hourAngle, minuteAngle } = getClockHandPositions(question.hour, question.minute);

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Progress */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Question</p>
            <p className="text-3xl font-bold text-blue-600">
              {currentQuestion + 1}/{questions.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-3xl font-bold text-green-600">{score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Difficulty</p>
            <p className="text-2xl font-bold text-purple-600 capitalize">{difficulty}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
          />
        </div>
      </motion.div>

      {/* Difficulty Selector */}
      {currentQuestion === 0 && !showResult && (
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDifficulty('easy')}
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
            onClick={() => setDifficulty('medium')}
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
            onClick={() => setDifficulty('hard')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              difficulty === 'hard'
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-700'
            }`}
          >
            🔥 Hard
          </motion.button>
        </div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit={{ scale: 0, opacity: 0 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {question.question}
          </h3>

          {/* Clock Display */}
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full border-8 border-blue-500 shadow-xl">
              {/* Clock Numbers */}
              {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, idx) => {
                const angle = (idx * 30 - 90) * (Math.PI / 180);
                const x = 50 + 40 * Math.cos(angle);
                const y = 50 + 40 * Math.sin(angle);
                return (
                  <div
                    key={num}
                    className="absolute font-bold text-blue-700 text-lg"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {num}
                  </div>
                );
              })}

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 z-30" />

              {/* Hour Hand */}
              <div
                className="absolute top-1/2 left-1/2"
                style={{
                  width: '6px',
                  height: '60px',
                  background: 'linear-gradient(to top, #1e40af, #3b82f6)',
                  borderRadius: '3px',
                  transformOrigin: 'center bottom',
                  transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
                }}
              />

              {/* Minute Hand */}
              <div
                className="absolute top-1/2 left-1/2"
                style={{
                  width: '4px',
                  height: '85px',
                  background: 'linear-gradient(to top, #0e7490, #06b6d4)',
                  borderRadius: '2px',
                  transformOrigin: 'center bottom',
                  transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
                }}
              />
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {question.options.map((option, index) => {
              let buttonClass = 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-xl';
              
              if (showResult) {
                if (option === question.answer) {
                  buttonClass = 'bg-gradient-to-r from-green-500 to-emerald-500 text-white ring-4 ring-green-300';
                } else if (option === selectedAnswer) {
                  buttonClass = 'bg-gradient-to-r from-red-500 to-pink-500 text-white ring-4 ring-red-300';
                } else {
                  buttonClass = 'bg-gray-300 text-gray-500';
                }
              }

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: showResult ? 1 : 1.02 }}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`px-8 py-4 rounded-2xl font-bold text-2xl shadow-lg transition-all ${buttonClass}`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
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
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Quiz Instructions:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>👀 Look at the clock and read the time</li>
              <li>🎯 Select the correct time from the options</li>
              <li>✅ Green = Correct, Red = Wrong</li>
              <li>⭐ Score 80%+ for maximum stars!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizTimeTab;
