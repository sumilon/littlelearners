import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';
import { flagQuiz } from '../../../../data/worldFlagsData';
import { shuffleArray } from '../../../../utils/gameHelpers';

// Helper component to display flag with both emoji and image
const FlagDisplay = ({ flagEmoji, countryName, size = 'large' }) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
    xlarge: 'text-8xl'
  };
  
  const imageSizes = {
    small: 'w-14 h-9',
    medium: 'w-20 h-12',
    large: 'w-28 h-18',
    xlarge: 'w-32 h-20'
  };
  
  // Map country names to ISO 3166-1 alpha-2 codes for flag images
  const countryCodeMap = {
    'india': 'in',
    'usa': 'us',
    'china': 'cn',
    'uk': 'gb',
    'united kingdom': 'gb',
    'japan': 'jp',
    'france': 'fr',
    'germany': 'de',
    'brazil': 'br',
    'australia': 'au',
    'canada': 'ca',
    'russia': 'ru',
    'italy': 'it',
    'spain': 'es',
    'mexico': 'mx',
    'egypt': 'eg',
    'south africa': 'za',
    'korea': 'kr',
    'south korea': 'kr',
    'argentina': 'ar',
    'thailand': 'th',
    'greece': 'gr',
    'ireland': 'ie',
    'netherlands': 'nl',
    'belgium': 'be',
    'austria': 'at',
    'chile': 'cl',
    'bulgaria': 'bg',
    'denmark': 'dk',
    'zimbabwe': 'zw',
    'zambia': 'zm',
    'malaysia': 'my',
    'monaco': 'mc'
  };
  
  const countryCode = countryCodeMap[countryName?.toLowerCase()];
  
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Flag image from flagcdn */}
      {countryCode && (
        <img 
          src={`https://flagcdn.com/w160/${countryCode}.png`}
          alt={`Flag of ${countryName}`}
          className={`${imageSizes[size]} object-cover rounded shadow-md`}
          loading="lazy"
        />
      )}
      {/* Fallback emoji */}
      <span className={`${sizeClasses[size]} leading-none`}>{flagEmoji}</span>
    </div>
  );
};

function FlagQuizTab() {
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
    const shuffled = shuffleArray([...flagQuiz]);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    playSound('click');
    
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
      speakEnglish(`Correct! It's ${question.answer}!`);
      logActivity('World Flags', 'Flag Quiz', `Answered correctly: ${question.answer}`);
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
      
      setTimeout(() => {
        speakEnglish(questions[currentQuestion + 1].question);
      }, 300);
    } else {
      setQuizCompleted(true);
      
      setTimeout(() => {
        speakEnglish(`Quiz complete! Your score is ${score + (selectedAnswer === questions[currentQuestion].answer ? 1 : 0)} out of ${questions.length}`);
      }, 500);

      logActivity('World Flags', 'Flag Quiz', `Completed quiz with score ${score}/${questions.length}`);
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
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4 pb-20">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <motion.div
              className="text-8xl mb-4"
              variants={wiggle}
              initial="hidden"
              animate="visible"
            >
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '🌍'}
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            
            <div className="text-6xl font-bold text-blue-600 my-6">
              {finalScore}/{questions.length}
            </div>
            
            <p className="text-xl text-gray-700 mb-6">
              {percentage >= 80
                ? 'Amazing! You are a flag expert! 🎉'
                : percentage >= 60
                ? 'Great job! Keep exploring! 👍'
                : 'Good try! Learn more flags! 💪'}
            </p>

            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 p-4 pb-20">
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
            <h3 className="font-bold text-lg text-gray-800 mb-2">Flag Quiz!</h3>
            <p className="text-gray-700">
              Can you identify which country each flag belongs to? 🌍
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
          <span className="text-sm font-bold text-blue-600">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
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
          <div className="text-center mb-6">
            {/* Extract flag emoji from question (e.g., "Which country has this flag? 🇮🇳") */}
            <div className="mb-4 flex justify-center">
              <FlagDisplay 
                flagEmoji={question.question.match(/[\u{1F1E6}-\u{1F1FF}]{2}/u)?.[0] || '🏴'} 
                countryName={question.answer}
                size="xlarge"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Which country is this?
            </h3>
            <button
              onClick={handleRepeatQuestion}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              🔊 Repeat Question
            </button>
            {question.difficulty && (
              <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                question.difficulty === 'easy' ? 'bg-green-200 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-700' :
                'bg-red-200 text-red-700'
              }`}>
                {question.difficulty.toUpperCase()}
              </div>
            )}
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
                    {showResult && isCorrectAnswer && <span className="text-2xl">✓</span>}
                    {showResult && isSelected && !isCorrectAnswer && <span className="text-2xl">✗</span>}
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
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
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

export default FlagQuizTab;
