import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { colors, colorMixing } from '../../../../data/artData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';

export default function ColorsTab() {
  const [mode, setMode] = useState('learn'); // 'learn' or 'quiz'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedColors, setLearnedColors] = useState(new Set());
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const currentColor = colors[currentIndex];

  // Initialize quiz
  useEffect(() => {
    if (mode === 'quiz' && quizQuestions.length === 0) {
      setQuizQuestions(shuffle([...colorMixing]));
    }
  }, [mode]);

  // Speak color info when changed
  useEffect(() => {
    if (mode === 'learn') {
      speakColor();
    }
  }, [currentIndex, mode]);

  const speakColor = () => {
    const text = `${currentColor.name}. It is a ${currentColor.category} color. ${currentColor.fact}`;
    speakEnglish(text);
  };

  const handleNext = () => {
    if (currentIndex < colors.length - 1) {
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

  const handleLearnColor = () => {
    const colorName = currentColor.name;
    
    if (!learnedColors.has(colorName)) {
      playSound('correct');
      playSound('star');
      addStars(2);
      setLearnedColors(new Set([...learnedColors, colorName]));
      logActivity('art', 'colors', `Learned about ${colorName}`);
    } else {
      playSound('click');
    }
    
    speakColor();
  };

  const handleModeSwitch = (newMode) => {
    playSound('click');
    setMode(newMode);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Quiz functions
  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    
    playSound('click');
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === quizQuestions[currentQuiz].answer;
    setShowResult(true);
    
    if (correct) {
      playSound('correct');
      playSound('star');
      addStars(3);
      setQuizScore(quizScore + 1);
      logActivity('art', 'colors', `Answered color mixing quiz correctly`);
      speakEnglish(`Correct! ${quizQuestions[currentQuiz].answer}!`);
      
      // Auto-advance to next quiz after 3 seconds
      setTimeout(() => {
        handleNextQuiz();
      }, 3000);
    } else {
      playSound('wrong');
      speakEnglish(`Try again! The answer is ${quizQuestions[currentQuiz].answer}`);
    }
  };

  const handleNextQuiz = () => {
    playSound('click');
    
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      // Restart quiz
      setQuizQuestions(shuffle([...colorMixing]));
      setCurrentQuiz(0);
      setQuizScore(0);
    }
    
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleModeSwitch('learn')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            mode === 'learn'
              ? 'bg-pink-500 text-white scale-105'
              : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
          }`}
        >
          📚 Learn
        </button>
        <button
          onClick={() => handleModeSwitch('quiz')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            mode === 'quiz'
              ? 'bg-purple-500 text-white scale-105'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          🎨 Mix Quiz
        </button>
      </div>

      {/* Learn Mode */}
      {mode === 'learn' && (
        <>
          {/* Progress */}
          <div className="text-center text-gray-600">
            <p className="text-lg font-semibold">
              Learned: {learnedColors.size} / {colors.length}
            </p>
          </div>

          {/* Color Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {/* Large Color Swatch */}
              <div 
                className="w-full h-48 rounded-2xl shadow-2xl flex items-center justify-center text-9xl"
                style={{ backgroundColor: currentColor.hex }}
              >
                {currentColor.emoji}
              </div>

              {/* Color Info Card */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 space-y-4">
                {/* Name */}
                <h3 className="text-5xl font-bold text-center" style={{ color: currentColor.hex }}>
                  {currentColor.name}
                </h3>

                {/* Category */}
                <div className="text-center">
                  <span className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                    {currentColor.category} Color
                  </span>
                </div>

                {/* Color Mixing Info */}
                {currentColor.madeFrom && (
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Made By Mixing:</p>
                    <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                      <span>{currentColor.madeFrom[0]}</span>
                      <span>+</span>
                      <span>{currentColor.madeFrom[1]}</span>
                      <span>=</span>
                      <span style={{ color: currentColor.hex }}>{currentColor.name}</span>
                    </div>
                  </div>
                )}

                {/* Examples */}
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Examples:</p>
                  <div className="flex justify-center gap-3 text-2xl">
                    {currentColor.examples.map((ex, idx) => (
                      <span key={idx}>{ex}</span>
                    ))}
                  </div>
                </div>

                {/* Fun Fact */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Fun Fact</p>
                  <p className="text-lg font-semibold text-yellow-700">💡 {currentColor.fact}</p>
                </div>
              </div>

              {/* Learn Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLearnColor}
                className={`w-full py-4 rounded-xl text-xl font-bold transition-colors flex items-center justify-center gap-2 ${
                  learnedColors.has(currentColor.name)
                    ? 'bg-green-500 text-white'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                <Volume2 className="w-6 h-6" />
                {learnedColors.has(currentColor.name) ? 'Learned!' : 'Learn This Color'}
                {learnedColors.has(currentColor.name) && ' ⭐⭐'}
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
                  : 'bg-pink-500 text-white hover:bg-pink-600 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-center text-gray-600 font-semibold">
              {currentIndex + 1} / {colors.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === colors.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                currentIndex === colors.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-pink-500 text-white hover:bg-pink-600 hover:scale-105'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Confetti on completion */}
          {learnedColors.size === 10 && (
            <motion.div
              variants={confetti}
              initial="initial"
              animate="animate"
              className="fixed inset-0 pointer-events-none"
            >
              <div className="text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                🎉🎨🌈
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Quiz Mode */}
      {mode === 'quiz' && quizQuestions.length > 0 && (
        <>
          {/* Quiz Progress */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-600">
              Question: {currentQuiz + 1} / {quizQuestions.length}
            </div>
            <div className="text-lg font-semibold text-purple-600">
              Score: {quizScore} ⭐
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuiz}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 space-y-6"
            >
              {/* Question */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
                <p className="text-2xl font-bold mb-4">{quizQuestions[currentQuiz].question}</p>
                <div className="flex justify-center items-center gap-4 text-4xl">
                  <span>{quizQuestions[currentQuiz].color1}</span>
                  <span>+</span>
                  <span>{quizQuestions[currentQuiz].color2}</span>
                  <span>=</span>
                  <span>?</span>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {quizQuestions[currentQuiz].options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`p-4 rounded-xl text-xl font-bold transition-all ${
                      selectedAnswer === option
                        ? showResult
                          ? option === quizQuestions[currentQuiz].answer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-purple-500 text-white'
                        : 'bg-white text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Submit or Next Button */}
              {!showResult ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className={`w-full py-4 rounded-xl text-xl font-bold transition-colors ${
                    selectedAnswer
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Check Answer ✓
                </motion.button>
              ) : (
                <motion.button
                  variants={confetti}
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuiz}
                  className="w-full bg-blue-500 text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-600 transition-colors"
                >
                  {currentQuiz < quizQuestions.length - 1 ? 'Next Question →' : 'Restart Quiz 🔄'}
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          {mode === 'learn' ? (
            <span className="font-bold">⭐ Learn about colors and earn 2 stars each!</span>
          ) : (
            <span className="font-bold">⭐ Answer color mixing quiz and earn 3 stars each!</span>
          )}
        </p>
      </div>
    </div>
  );
}
