import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';
import { shadowPuzzles } from '../../../../data/shadowMatchData';
import { shuffleArray } from '../../../../utils/gameHelpers';

function ShadowQuizTab() {
  const { addStars, logActivity } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    startQuiz();
    return () => cancelSpeech();
  }, []);

  const startQuiz = () => {
    // Mix all difficulties for a complete quiz
    const allPuzzles = [
      ...shuffleArray(shadowPuzzles.easy).slice(0, 3),
      ...shuffleArray(shadowPuzzles.medium).slice(0, 4),
      ...shuffleArray(shadowPuzzles.hard).slice(0, 3)
    ];
    const shuffled = shuffleArray(allPuzzles);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    playSound('click');
    
    setTimeout(() => {
      if (shuffled[0]) {
        speakEnglish(`Question 1: Find the shadow of ${shuffled[0].object.name}`);
      }
    }, 500);
  };

  const handleAnswerSelect = (index) => {
    if (showResult) return;

    playSound('click');
    setSelectedAnswer(index);
    setShowResult(true);

    const question = questions[currentQuestion];
    const isCorrect = index === question.correctIndex;

    if (isCorrect) {
      playSound('correct');
      setScore(score + 1);
      addStars(3);
      playSound('star');
      speakEnglish('Correct! Perfect match!');
      logActivity('Shadow Match', 'Shadow Quiz', `Answered correctly: ${question.object.name}`);
    } else {
      playSound('wrong');
      speakEnglish('Wrong! Look at the correct shadow!');
    }
  };

  const handleNext = () => {
    playSound('click');
    cancelSpeech();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      
      setTimeout(() => {
        speakEnglish(`Question ${currentQuestion + 2}: Find the shadow of ${questions[currentQuestion + 1].object.name}`);
      }, 300);
    } else {
      setQuizCompleted(true);
      setTimeout(() => {
        speakEnglish(`Quiz complete! Your score is ${score + (selectedAnswer === questions[currentQuestion].correctIndex ? 1 : 0)} out of ${questions.length}`);
      }, 500);

      logActivity('Shadow Match', 'Shadow Quiz', `Completed quiz with score ${score}/${questions.length}`);
    }
  };

  if (questions.length === 0) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
      <p className="text-xl text-white">Loading quiz...</p>
    </div>;
  }

  if (quizCompleted) {
    const finalScore = score;
    const percentage = (finalScore / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 pb-20">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
            <motion.div
              className="text-8xl mb-4"
              variants={wiggle}
              initial="hidden"
              animate="visible"
            >
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
            
            <div className="text-6xl font-bold text-purple-400 my-6">
              {finalScore}/{questions.length}
            </div>
            
            <p className="text-xl text-gray-300 mb-6">
              {percentage >= 80
                ? 'Excellent shadow detective! 🎉'
                : percentage >= 60
                ? 'Great job! Keep learning! 👍'
                : 'Good try! Practice more! 💪'}
            </p>

            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
            >
              <RotateCcw className="w-6 h-6" />
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black p-3">
      {/* Instructions - Compact */}
      <motion.div
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-2 mb-3 shadow-lg flex-shrink-0"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-start gap-2">
          <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-gray-800 mb-1">Shadow Quiz!</h3>
            <p className="text-xs text-gray-700">Test your shadow matching skills! 🕵️</p>
          </div>
        </div>
      </motion.div>

      {/* Progress - Compact */}
      <motion.div
        className="bg-gray-800 rounded-xl p-2 mb-3 shadow-lg flex-shrink-0"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-2 text-white text-xs">
          <span className="font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="font-bold text-purple-400">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Question Card - Compact */}
      <motion.div
        key={currentQuestion}
        className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-3 mb-3 shadow-xl text-center flex-shrink-0"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="text-8xl mb-1">{question.object.emoji}</div>
        <h3 className="text-xl font-bold text-white mb-1">{question.object.name}</h3>
        <p className="text-sm text-white/80">{question.category}</p>
      </motion.div>

      {/* Answer Options - Centered and Constrained */}
      <div className="flex-1 flex items-center justify-center overflow-hidden mb-3">
        <div className={`grid ${question.shadows.length > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-3 max-w-2xl w-full`}>
          {question.shadows.map((shadow, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctIndex;
            const shouldHighlight = showResult && (isSelected || isCorrect);

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`aspect-square rounded-xl p-4 text-7xl transition-all flex items-center justify-center ${
                  shouldHighlight
                    ? isCorrect
                      ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-2xl scale-105'
                      : 'bg-gradient-to-br from-red-500 to-red-600 shadow-2xl'
                    : 'bg-gray-800 hover:bg-gray-700'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={!showResult ? { scale: 1.05 } : {}}
                whileTap={!showResult ? { scale: 0.95 } : {}}
                style={{ filter: !shouldHighlight && showResult ? 'grayscale(100%) opacity(0.5)' : 'none' }}
              >
                {shadow}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Next Button - Compact */}
      {showResult && (
        <motion.button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform flex-shrink-0"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
        </motion.button>
      )}
    </div>
  );
}

export default ShadowQuizTab;
