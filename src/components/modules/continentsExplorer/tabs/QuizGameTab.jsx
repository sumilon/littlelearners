import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, HelpCircle, Sparkles, RotateCcw } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { continents, quizQuestions } from '../../../../data/continentsExplorerData';

const QuizGameTab = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // Shuffle questions on mount
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleContinentSelect = (continentId) => {
    if (showResult) return; // Prevent selecting after answer shown

    playSound('click');
    setSelectedAnswer(continentId);
    const correct = continentId === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('success');
      setScore(score + 1);
      speak('Correct! Great job!');
    } else {
      playSound('error');
      const correctContinent = continents.find(c => c.id === currentQuestion.correctAnswer);
      speak(`Not quite! The correct answer is ${correctContinent.name}.`);
    }
  };

  const handleNext = () => {
    playSound('click');
    setShowResult(false);
    setSelectedAnswer(null);
    setShowHint(false);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      speak(shuffledQuestions[currentQuestionIndex + 1].question);
    } else {
      // Quiz complete
      setQuizComplete(true);
      const percentage = Math.round((score / shuffledQuestions.length) * 100);
      if (percentage >= 80) {
        speak(`Amazing! You scored ${score} out of ${shuffledQuestions.length}! You're a geography expert!`);
      } else if (percentage >= 60) {
        speak(`Great job! You scored ${score} out of ${shuffledQuestions.length}! Keep learning!`);
      } else {
        speak(`Good try! You scored ${score} out of ${shuffledQuestions.length}. Practice more to improve!`);
      }
    }
  };

  const handleRestart = () => {
    playSound('click');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
    setQuizComplete(false);
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    speak('Let\'s start the quiz again!');
  };

  const handleHint = () => {
    playSound('click');
    setShowHint(true);
    speak(currentQuestion.hint);
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="text-white text-2xl">Loading quiz...</div>
      </div>
    );
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let message = '';
    let emoji = '';

    if (percentage >= 80) {
      message = 'Geography Expert!';
      emoji = '🏆';
    } else if (percentage >= 60) {
      message = 'Great Explorer!';
      emoji = '⭐';
    } else {
      message = 'Keep Exploring!';
      emoji = '🗺️';
    }

    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center relative overflow-hidden">
        {/* Celebration particles */}
        {percentage >= 80 && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ 
                  x: '50%', 
                  y: '50%',
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1.5, 1],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{
                  left: '50%',
                  top: '50%'
                }}
              >
                {['⭐', '🏆', '✨', '🎉'][i % 4]}
              </motion.div>
            ))}
          </>
        )}
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="max-w-2xl w-full mx-auto p-8 relative z-10"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center shadow-2xl">
            <motion.div
              className="text-9xl mb-6"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 15, -15, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            >
              {emoji}
            </motion.div>
            
            <motion.h2 
              className="text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.h2>
            
            <motion.div 
              className="bg-white/20 rounded-2xl p-6 mb-6 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <motion.div 
                className="text-7xl font-bold text-white mb-2 relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                {score} / {shuffledQuestions.length}
              </motion.div>
              <motion.div 
                className="text-2xl text-white/80 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {percentage}% Correct
              </motion.div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.button
                onClick={handleRestart}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold text-xl py-4 px-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="inline w-6 h-6 mr-2" />
                Play Again
              </motion.button>

              <motion.div 
                className="text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                {percentage >= 80 ? 'Perfect! You know your continents!' :
                 percentage >= 60 ? 'Great job! Try to get all correct next time!' :
                 'Keep practicing to become a geography master!'}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header with Score */}
        <div className="flex justify-between items-center mb-6">
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-white/80 text-sm">Question</div>
            <motion.div 
              className="text-white font-bold text-xl"
              key={currentQuestionIndex}
              initial={{ scale: 1.5, color: '#fbbf24' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ type: "spring" }}
            >
              {currentQuestionIndex + 1} / {shuffledQuestions.length}
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-bold text-white"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Geography Quiz 🧠
          </motion.h2>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-white/80 text-sm">Score</div>
            <motion.div 
              className="text-white font-bold text-xl flex items-center gap-1"
              key={score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </motion.div>
              {score}
            </motion.div>
          </motion.div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6"
            >
              <div className="text-center mb-8">
                <motion.div
                  className="text-9xl mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentQuestion.emoji}
                </motion.div>
                
                <h3 className="text-4xl font-bold text-white mb-4">
                  {currentQuestion.question}
                </h3>

              {/* Hint Button */}
              {!showResult && (
                <motion.button
                  onClick={handleHint}
                  className="bg-purple-500/30 hover:bg-purple-500/50 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HelpCircle className="inline w-5 h-5 mr-2" />
                  Need a Hint?
                </motion.button>
              )}

              {/* Hint Display */}
              <AnimatePresence>
                {showHint && !showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 bg-purple-500/20 backdrop-blur-md rounded-xl p-4"
                  >
                    <div className="text-white/90 text-lg">
                      💡 Hint: {currentQuestion.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Result Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`mb-6 p-6 rounded-2xl relative overflow-hidden ${
                    isCorrect
                      ? 'bg-green-500/30 border-2 border-green-400'
                      : 'bg-red-500/30 border-2 border-red-400'
                  }`}
                >
                  {/* Animated background effect */}
                  <motion.div
                    className={`absolute inset-0 ${isCorrect ? 'bg-green-400/20' : 'bg-red-400/20'}`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <div className="text-center relative z-10">
                    <motion.div 
                      className="text-7xl mb-3"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                      }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {isCorrect ? '🎉' : '❌'}
                    </motion.div>
                    <motion.div 
                      className="text-3xl font-bold text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {isCorrect ? 'Correct!' : 'Not Quite!'}
                    </motion.div>
                    {!isCorrect && (
                      <motion.div 
                        className="text-xl text-white/90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        The answer is: {continents.find(c => c.id === currentQuestion.correctAnswer)?.name}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          )}
        </AnimatePresence>

        {/* Continent Choices Grid */}
        {currentQuestion && (
          <>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Choose a Continent:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {continents.map((continent, index) => {
                const isSelected = selectedAnswer === continent.id;
                const isCorrectAnswer = currentQuestion.correctAnswer === continent.id;
                const showCorrect = showResult && isCorrectAnswer;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
              <motion.button
                key={continent.id}
                onClick={() => handleContinentSelect(continent.id)}
                disabled={showResult}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={
                  showCorrect ? { 
                    opacity: 1,
                    scale: [1, 1.1, 1],
                    y: 0,
                    rotate: [0, 5, -5, 0]
                  } : showWrong ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    x: [-10, 10, -10, 10, 0],
                    transition: { duration: 0.5 }
                  } : {
                    opacity: 1,
                    scale: 1,
                    y: 0
                  }
                }
                transition={{ 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className={`
                  relative rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center min-h-[160px]
                  ${!showResult ? 'bg-white/30 backdrop-blur-md hover:bg-white/40 border-2 border-white/40' : ''}
                  ${showCorrect ? 'bg-green-500/50 border-4 border-green-400' : ''}
                  ${showWrong ? 'bg-red-500/50 border-4 border-red-400' : ''}
                  ${showResult && !isSelected && !isCorrectAnswer ? 'opacity-50' : ''}
                  ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                whileHover={showResult ? {} : { 
                  scale: 1.1, 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={showResult ? {} : { scale: 0.95 }}
              >
                <motion.div 
                  className="text-6xl mb-3"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    repeatDelay: 1 + index * 0.2
                  }}
                >
                  {continent.emoji}
                </motion.div>
                <div className="text-xl font-bold text-white drop-shadow-lg">{continent.name}</div>
                
                {showCorrect && (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute top-2 right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    
                    {/* Celebration sparkles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-yellow-300 text-2xl"
                        initial={{ 
                          scale: 0, 
                          x: 0, 
                          y: 0,
                          opacity: 1
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos(i * 60 * Math.PI / 180) * 60,
                          y: Math.sin(i * 60 * Math.PI / 180) * 60,
                          opacity: [1, 1, 0]
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.05
                        }}
                        style={{
                          left: '50%',
                          top: '50%'
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
                </motion.button>
              );
            })}
          </div>
          </>
        )}

        {/* Next Button */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center"
            >
              <motion.button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold text-xl py-4 px-12 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizGameTab;
