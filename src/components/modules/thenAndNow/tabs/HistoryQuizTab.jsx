import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { quizQuestions, shuffleArray } from '../../../../data/thenAndNowData';

const HistoryQuizTab = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startQuiz = () => {
    const shuffledQuestions = shuffleArray(quizQuestions).slice(0, 6);
    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizComplete(false);
    setHasStarted(true);
    playSound('success');
    speak('Let\'s test your history knowledge! What did people use before modern inventions?');
  };

  const handleAnswerClick = (answer) => {
    if (showFeedback) return;

    const currentQuestion = questions[currentIndex];
    const correct = answer === currentQuestion.correctAnswer;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (correct) {
      playSound('success');
      setScore(score + 1);
      speak(`Correct! ${currentQuestion.explanation}`);
    } else {
      playSound('error');
      speak(`Not quite. ${currentQuestion.explanation}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizComplete(true);
      const percentage = ((score + (selectedAnswer === questions[currentIndex].correctAnswer ? 1 : 0)) / questions.length) * 100;
      if (percentage === 100) {
        speak('Perfect score! You\'re a history expert!');
      } else if (percentage >= 80) {
        speak('Excellent! You know a lot about how things have changed!');
      } else if (percentage >= 60) {
        speak('Good job! Keep learning about history!');
      } else {
        speak('Nice try! Explore the timeline to learn more!');
      }
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-6">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl text-center max-w-2xl"
        >
          <div className="text-8xl mb-6">🎓</div>
          <h2 className="text-4xl font-bold text-white mb-4">History Quiz</h2>
          <p className="text-xl text-white/80 mb-8">
            Test your knowledge about how things have changed over time!
          </p>
          <motion.button
            onClick={startQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-bold text-2xl shadow-2xl"
          >
            Start Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (quizComplete) {
    const finalScore = score + (selectedAnswer === questions[currentIndex].correctAnswer ? 1 : 0);
    const percentage = (finalScore / questions.length) * 100;
    
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl text-center max-w-2xl"
        >
          <div className="text-8xl mb-6">
            {percentage === 100 ? '🏆' : percentage >= 80 ? '⭐' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h3 className="text-4xl font-bold text-white mb-4">
            {percentage === 100 ? 'History Master!' : percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
          </h3>
          <p className="text-3xl text-white/90 mb-8">
            You got {finalScore} out of {questions.length} correct!
          </p>
          <div className="text-2xl text-white/80 mb-8">
            Score: {percentage.toFixed(0)}%
          </div>
          <motion.button
            onClick={startQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-2xl shadow-2xl"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex flex-col p-6 overflow-hidden">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col"
      >
        {/* Header with Progress */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            🎓 History Quiz
          </h2>
          <div className="text-xl text-white/80">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            Score: {score} / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            className="bg-gradient-to-r from-amber-600 to-orange-600 h-3 rounded-full transition-all"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-4xl"
            >
              {/* Question */}
              <motion.div 
                className="bg-gradient-to-br from-amber-600/40 to-orange-600/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-6 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }
                }}
              >
                <motion.div 
                  className="text-7xl mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: 'easeInOut'
                  }}
                >
                  {currentQuestion.emoji}
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {currentQuestion.question}
                </h3>
              </motion.div>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const showCorrect = showFeedback && isCorrect;
                  const showIncorrect = showFeedback && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      disabled={showFeedback}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        x: showIncorrect ? [-10, 10, -10, 10, 0] : 0,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                          delay: showIncorrect ? 0 : index * 0.1,
                          x: showIncorrect ? { duration: 0.4 } : {}
                        }
                      }}
                      whileHover={!showFeedback ? { 
                        scale: 1.05,
                        y: -5,
                        transition: { type: 'spring', stiffness: 400, damping: 10 }
                      } : {}}
                      whileTap={!showFeedback ? { scale: 0.95 } : {}}
                      className={`p-6 rounded-2xl font-bold text-xl transition-all shadow-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white border-4 border-green-300'
                          : showIncorrect
                          ? 'bg-red-500 text-white border-4 border-red-300'
                          : isSelected
                          ? 'bg-blue-500 text-white border-4 border-blue-300'
                          : 'bg-white/20 text-white border-4 border-white/30 hover:bg-white/30'
                      } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option}
                      {showCorrect && ' ✅'}
                      {showIncorrect && ' ❌'}
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <>
                    {/* Celebration Sparkles for Correct Answer */}
                    {selectedAnswer === currentQuestion.correctAnswer && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ 
                              x: 0, 
                              y: 0, 
                              scale: 0, 
                              opacity: 1 
                            }}
                            animate={{ 
                              x: Math.cos(i * Math.PI / 4) * 200,
                              y: Math.sin(i * Math.PI / 4) * 200,
                              scale: [0, 1.5, 0],
                              opacity: [1, 1, 0]
                            }}
                            transition={{ 
                              duration: 1.2,
                              ease: 'easeOut'
                            }}
                            className="absolute top-1/2 left-1/2 text-4xl pointer-events-none"
                            style={{ zIndex: 50 }}
                          >
                            ✨
                          </motion.div>
                        ))}
                      </>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 15
                        }
                      }}
                      exit={{ opacity: 0 }}
                      className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
                    >
                      <div className="text-center">
                        <div className="text-xl text-white/90 mb-4">
                          💡 {currentQuestion.explanation}
                        </div>
                        <motion.button
                          onClick={handleNext}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-xl shadow-lg"
                        >
                          {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default HistoryQuizTab;
