import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';
import { oppositePairs } from '../../../../data/oppositesData';

const QuizTab = () => {
  const { addStars, logActivity } = useStore();
  
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [askedPairs, setAskedPairs] = useState(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const difficultySettings = {
    easy: { totalQuestions: 5, stars: 2 },
    medium: { totalQuestions: 8, stars: 3 },
    hard: { totalQuestions: 10, stars: 4 }
  };

  useEffect(() => {
    resetQuiz();
  }, [difficulty]);

  useEffect(() => {
    if (currentQuestion === null && questionsAnswered === 0) {
      loadNextQuestion();
    }
  }, [currentQuestion, questionsAnswered]);

  const resetQuiz = () => {
    setCurrentQuestion(null);
    setOptions([]);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setAttempts(0);
    setQuestionsAnswered(0);
    setAskedPairs(new Set());
    setShowConfetti(false);
  };

  const loadNextQuestion = () => {
    // Get pairs for current difficulty that haven't been asked
    const availablePairs = oppositePairs.filter(
      p => p.difficulty === difficulty && !askedPairs.has(p.word1)
    );

    if (availablePairs.length === 0 || questionsAnswered >= difficultySettings[difficulty].totalQuestions) {
      handleQuizComplete();
      return;
    }

    // Pick a random pair
    const pair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
    
    // Randomly decide to ask for word1's opposite or word2's opposite
    const askForFirst = Math.random() < 0.5;
    const question = {
      word: askForFirst ? pair.word1 : pair.word2,
      emoji: askForFirst ? pair.emoji1 : pair.emoji2,
      correctAnswer: askForFirst ? pair.word2 : pair.word1,
      correctEmoji: askForFirst ? pair.emoji2 : pair.emoji1,
      sentence: askForFirst ? pair.sentence1 : pair.sentence2
    };

    // Generate 3 wrong options from other pairs
    const otherPairs = oppositePairs.filter(
      p => p.difficulty === difficulty && p.word1 !== pair.word1
    );
    const shuffledOthers = shuffle(otherPairs).slice(0, 3);
    const wrongOptions = shuffledOthers.map((p, i) => 
      askForFirst ? p.word2 : p.word1
    );

    // Create options array and shuffle
    const allOptions = shuffle([question.correctAnswer, ...wrongOptions]);

    setCurrentQuestion(question);
    setOptions(allOptions);
    setSelectedOption(null);
    setShowFeedback(false);
    
    // Mark this pair as asked
    setAskedPairs(prev => new Set([...prev, pair.word1]));
    
    // Speak the question word
    setTimeout(() => speakEnglish(question.word), 300);
  };

  const handleOptionSelect = (option) => {
    if (showFeedback) return;

    playSound('click');
    setSelectedOption(option);
    setAttempts(prev => prev + 1);
    setShowFeedback(true);

    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      playSound('correct');
      setScore(prev => prev + 1);
      speakEnglish(option);
    } else {
      playSound('wrong');
    }
  };

  const handleNext = () => {
    playSound('click');
    setQuestionsAnswered(prev => prev + 1);
    loadNextQuestion();
  };

  const handleQuizComplete = () => {
    const totalQuestions = difficultySettings[difficulty].totalQuestions;
    const percentage = Math.round((score / totalQuestions) * 100);
    const stars = percentage >= 80 ? difficultySettings[difficulty].stars : Math.max(1, difficultySettings[difficulty].stars - 1);
    
    playSound('star');
    addStars(stars);
    logActivity('opposites', 'quiz', `Completed ${difficulty} quiz: ${score}/${totalQuestions} correct`);
    setShowConfetti(true);
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const totalQuestions = difficultySettings[difficulty].totalQuestions;
  const isQuizComplete = questionsAnswered >= totalQuestions;
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4 pb-24">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            variants={confetti}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5
                }}
              >
                {['⭐', '✨', '🎉', '🎊'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="bg-white/90 backdrop-blur rounded-2xl p-6 mb-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
          🎯 Opposites Quiz
        </h2>

        {/* Difficulty Selector */}
        <div className="flex justify-center gap-2 mb-4">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => {
                playSound('click');
                setDifficulty(level);
              }}
              disabled={questionsAnswered > 0 && !isQuizComplete}
              className={`px-4 py-2 rounded-xl font-bold capitalize transition-all ${
                difficulty === level
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
              } ${questionsAnswered > 0 && !isQuizComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{questionsAnswered} / {totalQuestions}</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>
      </motion.div>

      {/* Quiz Complete */}
      {isQuizComplete && (
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 mb-6 shadow-lg text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-2xl font-bold text-white mb-2">
            Quiz Complete!
          </div>
          <div className="text-white text-lg mb-4">
            You got {score} out of {totalQuestions} correct!
          </div>
          <div className="text-3xl mb-4">
            {'⭐'.repeat(Math.min(4, Math.max(1, score >= totalQuestions * 0.8 ? difficultySettings[difficulty].stars : difficultySettings[difficulty].stars - 1)))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('click');
              resetQuiz();
            }}
            className="bg-white text-orange-500 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </motion.button>
        </motion.div>
      )}

      {/* Question Card */}
      {!isQuizComplete && currentQuestion && (
        <motion.div
          key={currentQuestion.word}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          className="bg-white rounded-2xl p-6 mb-6 shadow-lg"
        >
          {/* Question */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">What is the opposite of:</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound('click');
                speakEnglish(currentQuestion.word);
              }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-2xl shadow-lg inline-flex flex-col items-center gap-2"
            >
              <div className="text-5xl">{currentQuestion.emoji}</div>
              <div className="text-2xl font-bold">{currentQuestion.word}</div>
            </motion.button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;
              const showAsCorrect = showFeedback && isCorrectOption;
              const showAsWrong = showFeedback && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  variants={scaleIn}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  whileHover={!showFeedback ? { scale: 1.05 } : {}}
                  whileTap={!showFeedback ? { scale: 0.95 } : {}}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                  className={`p-4 rounded-xl font-bold text-lg transition-all ${
                    showAsCorrect
                      ? 'bg-green-500 text-white shadow-lg'
                      : showAsWrong
                      ? 'bg-red-500 text-white shadow-lg'
                      : isSelected
                      ? 'bg-indigo-200 text-indigo-700 shadow-md'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 shadow-sm'
                  } ${showFeedback ? 'cursor-not-allowed' : ''}`}
                >
                  {option}
                  {showAsCorrect && ' ✓'}
                  {showAsWrong && ' ✗'}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`rounded-xl p-4 mb-4 ${
                  isCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{isCorrect ? '✓' : '✗'}</div>
                  <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite!'}
                  </div>
                  {!isCorrect && (
                    <div className="text-gray-700">
                      The opposite of <strong>{currentQuestion.word}</strong> is <strong>{currentQuestion.correctAnswer}</strong>
                    </div>
                  )}
                  {isCorrect && (
                    <div className="text-gray-700 italic">
                      "{currentQuestion.sentence}"
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {showFeedback && !isQuizComplete && (
            <motion.button
              variants={scaleIn}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Next Question
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="mt-6 bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-4"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div className="text-gray-700">
            <p className="font-bold mb-1">How to Play:</p>
            <p>Read the word, then tap the correct opposite from the four options. Get as many correct as you can!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizTab;
