import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { seasons, seasonQuiz } from '../../../../data/evsData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';

export default function SeasonsTab() {
  const [mode, setMode] = useState('learn'); // 'learn' or 'quiz'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedSeasons, setLearnedSeasons] = useState(new Set());
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const autoAdvanceTimer = useRef(null);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const currentSeason = seasons[currentIndex];

  // Initialize quiz
  useEffect(() => {
    if (mode === 'quiz' && quizQuestions.length === 0) {
      setQuizQuestions(shuffle([...seasonQuiz]));
    }
  }, [mode]);

  // Speak season info when changed
  useEffect(() => {
    if (mode === 'learn') {
      speakSeason();
    }
  }, [currentIndex, mode]);
  
  // Cleanup timer on unmount or mode change
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, [mode]);

  const speakSeason = () => {
    const text = `${currentSeason.name}. ${currentSeason.weather}. ${currentSeason.fact}`;
    speakEnglish(text);
  };

  const handleNext = () => {
    if (currentIndex < seasons.length - 1) {
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

  const handleLearnSeason = () => {
    const seasonName = currentSeason.name;
    
    if (!learnedSeasons.has(seasonName)) {
      playSound('correct');
      playSound('star');
      addStars(2);
      setLearnedSeasons(new Set([...learnedSeasons, seasonName]));
      logActivity('evs', 'seasons', `Learned about ${seasonName}`);
    } else {
      playSound('click');
    }
    
    speakSeason();
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
      logActivity('evs', 'seasons', `Answered season quiz correctly`);
      speakEnglish('Correct! Well done!');
    } else {
      playSound('wrong');
      speakEnglish(`Try again! The answer is ${quizQuestions[currentQuiz].answer}`);
    }
    
    // Clear any existing timer
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    
    // Automatically move to next question after 2.5 seconds
    autoAdvanceTimer.current = setTimeout(() => {
      handleNextQuiz();
    }, 2500);
  };

  const handleNextQuiz = () => {
    playSound('click');
    
    // Clear any pending auto-advance timer
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    
    if (currentQuiz < quizQuestions.length - 1) {
      // Move to next question
      setCurrentQuiz(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Restart quiz
      setQuizQuestions(shuffle([...seasonQuiz]));
      setCurrentQuiz(0);
      setQuizScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleModeSwitch('learn')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            mode === 'learn'
              ? 'bg-blue-500 text-white scale-105'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
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
          🎯 Quiz
        </button>
      </div>

      {/* Learn Mode */}
      {mode === 'learn' && (
        <>
          {/* Progress */}
          <div className="text-center text-gray-600">
            <p className="text-lg font-semibold">
              Learned: {learnedSeasons.size} / {seasons.length}
            </p>
          </div>

          {/* Season Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl p-8 text-center space-y-6"
            >
              {/* Season Emoji */}
              <div className="text-9xl mb-4">{currentSeason.emoji}</div>

              {/* Season Info Card */}
              <div className="bg-white rounded-xl p-6 space-y-4">
                {/* Name */}
                <h3 className="text-4xl font-bold text-blue-600">
                  {currentSeason.name}
                </h3>

                {/* Months */}
                <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                  📅 {currentSeason.months}
                </div>

                {/* Weather */}
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Weather</p>
                  <p className="text-xl font-bold text-cyan-600">🌤️ {currentSeason.weather}</p>
                </div>

                {/* Clothes */}
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">What to Wear</p>
                  <p className="text-xl font-bold text-pink-600">👕 {currentSeason.clothes}</p>
                </div>

                {/* Activities */}
                <div className="bg-green-50 p-4 rounded-lg text-left">
                  <p className="text-sm text-gray-600 mb-2">Activities</p>
                  {currentSeason.activities.map((activity, idx) => (
                    <p key={idx} className="text-lg font-semibold text-green-600">
                      • {activity}
                    </p>
                  ))}
                </div>

                {/* Fun Fact */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Fun Fact</p>
                  <p className="text-lg font-semibold text-yellow-700">💡 {currentSeason.fact}</p>
                </div>
              </div>

              {/* Learn Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLearnSeason}
                className={`w-full py-4 rounded-xl text-xl font-bold transition-colors flex items-center justify-center gap-2 ${
                  learnedSeasons.has(currentSeason.name)
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <Volume2 className="w-6 h-6" />
                {learnedSeasons.has(currentSeason.name) ? 'Learned!' : 'Learn About This Season'}
                {learnedSeasons.has(currentSeason.name) && ' ⭐⭐'}
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
              {currentIndex + 1} / {seasons.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === seasons.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                currentIndex === seasons.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Confetti on completion */}
          {learnedSeasons.size === 4 && (
            <motion.div
              variants={confetti}
              initial="initial"
              animate="animate"
              className="fixed inset-0 pointer-events-none"
            >
              <div className="text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                🎉☀️🌧️🍂❄️
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
              key={`quiz-${currentQuiz}-${quizQuestions[currentQuiz]?.question}`}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 space-y-6"
            >
              {/* Question */}
              <div className="bg-purple-500 text-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">{quizQuestions[currentQuiz].emoji}</div>
                <p className="text-2xl font-bold">{quizQuestions[currentQuiz].question}</p>
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
            <span className="font-bold">⭐ Learn about 4 seasons and earn 2 stars each!</span>
          ) : (
            <span className="font-bold">⭐ Answer quiz questions and earn 3 stars each!</span>
          )}
        </p>
      </div>
    </div>
  );
}
