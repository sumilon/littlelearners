import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, Brain } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';
import { bodyQuiz, funFacts } from '../../../../data/bodyExplorerData';
import { shuffleArray } from '../../../../utils/gameHelpers';

function BodyQuizTab() {
  const { addStars, logActivity } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [randomFact, setRandomFact] = useState(null);

  useEffect(() => {
    startQuiz();
    return () => cancelSpeech();
  }, []);

  const startQuiz = () => {
    const shuffled = shuffleArray([...bodyQuiz]);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setRandomFact(null);
    playSound('click');
    
    // Read first question
    setTimeout(() => {
      if (shuffled[0]) {
        speakEnglish(shuffled[0].question);
      }
    }, 500);
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
      setScore(score + 1);
      addStars(3);
      playSound('star');
      speakEnglish('Correct! Well done!');
      logActivity('Body Explorer', 'Body Quiz', `Answered correctly: ${question.question}`);
    } else {
      playSound('wrong');
      speakEnglish(`Wrong! The correct answer is ${question.answer}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    cancelSpeech();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      
      // Read next question
      setTimeout(() => {
        speakEnglish(questions[currentQuestion + 1].question);
      }, 300);
    } else {
      setQuizCompleted(true);
      
      // Show random fun fact
      const randomFactItem = funFacts[Math.floor(Math.random() * funFacts.length)];
      setRandomFact(randomFactItem);
      
      setTimeout(() => {
        speakEnglish(`Quiz complete! Your score is ${score + (selectedAnswer === questions[currentQuestion].answer ? 1 : 0)} out of ${questions.length}. Fun fact: ${randomFactItem.fact}`);
      }, 500);

      logActivity('Body Explorer', 'Body Quiz', `Completed quiz with score ${score}/${questions.length}`);
    }
  };

  const handleRepeatQuestion = () => {
    playSound('click');
    if (questions[currentQuestion]) {
      speakEnglish(questions[currentQuestion].question);
    }
  };

  if (questions.length === 0) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <p className="text-xl">Loading quiz...</p>
    </div>;
  }

  if (quizCompleted) {
    const finalScore = score;
    const percentage = (finalScore / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 pb-20">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {/* Results Card */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center mb-6">
            <motion.div
              className="text-8xl mb-4"
              variants={wiggle}
              initial="hidden"
              animate="visible"
            >
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            
            <div className="text-6xl font-bold text-purple-600 my-6">
              {finalScore}/{questions.length}
            </div>
            
            <p className="text-xl text-gray-700 mb-4">
              {percentage >= 80
                ? 'Amazing! You know your body well! 🎉'
                : percentage >= 60
                ? 'Great job! Keep learning! 👍'
                : 'Good try! Practice more! 💪'}
            </p>

            {/* Fun Fact */}
            {randomFact && (
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl p-6 mb-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">{randomFact.emoji}</div>
                  <h3 className="text-xl font-bold">Fun Fact!</h3>
                </div>
                <p className="text-lg leading-relaxed">{randomFact.fact}</p>
              </motion.div>
            )}

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
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 pb-20">
      {/* Instructions */}
      <motion.div
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Test Your Knowledge!</h3>
            <p className="text-gray-700">
              Answer questions about the human body! 🧠
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="bg-white rounded-xl p-4 mb-6 shadow-lg"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-bold text-purple-600">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="bg-white rounded-xl shadow-xl p-6 mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="flex items-start gap-3 mb-6">
            <Brain className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {question.question}
              </h3>
              <button
                onClick={handleRepeatQuestion}
                className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
              >
                🔊 Repeat Question
              </button>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === question.answer;
              const shouldHighlight = showResult && (isSelected || isCorrectAnswer);

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left font-bold text-lg transition-all ${
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
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && isCorrectAnswer && <span>✓</span>}
                    {showResult && isSelected && !isCorrectAnswer && <span>✗</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next Button */}
      {showResult && (
        <motion.button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
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

export default BodyQuizTab;
