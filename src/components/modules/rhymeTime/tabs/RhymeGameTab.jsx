import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { rhymeQuestions } from '../../../../data/rhymeTimeData';
import { shuffle } from '../../../../utils/gameHelpers';

const RhymeGameTab = () => {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, [difficulty]);

  const loadQuestions = () => {
    const filtered = rhymeQuestions.filter(q => q.difficulty === difficulty);
    const shuffled = shuffle([...filtered]);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setShowResult(false);
    setScore(0);
    setAttempts(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (optionWord) => {
    if (showResult) return;
    
    playSound('click');
    if (selectedOptions.includes(optionWord)) {
      setSelectedOptions(selectedOptions.filter(o => o !== optionWord));
    } else {
      setSelectedOptions([...selectedOptions, optionWord]);
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0 || showResult) return;

    playSound('click');
    setAttempts(attempts + 1);
    setShowResult(true);

    // Check if selected options match correct answers
    const correctAnswers = currentQuestion.options.filter(o => o.rhymes).map(o => o.word).sort();
    const selectedSorted = [...selectedOptions].sort();
    const isCorrect = JSON.stringify(correctAnswers) === JSON.stringify(selectedSorted);

    if (isCorrect) {
      const stars = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
      addStars(stars);
      setScore(score + 1);
      playSound('correct');
      playSound('star');
      logActivity('rhymeTime', 'rhymeGame', `Correctly identified rhyming words for: ${currentQuestion.targetWord}`);
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      playSound('wrong');
    }

    // Speak result
    const correctWords = currentQuestion.options.filter(o => o.rhymes).map(o => o.word);
    speakEnglish(`The words that rhyme with ${currentQuestion.targetWord} are: ${correctWords.join(', ')}`);
  };

  const handleNext = () => {
    playSound('click');
    setSelectedOptions([]);
    setShowResult(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete
      speakEnglish(`Quiz complete! You got ${score + (showResult && isAnswerCorrect() ? 1 : 0)} out of ${questions.length} correct!`);
    }
  };

  const handleTryAgain = () => {
    playSound('click');
    setSelectedOptions([]);
    setShowResult(false);
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
  };

  const isAnswerCorrect = () => {
    if (!currentQuestion) return false;
    const correctAnswers = currentQuestion.options.filter(o => o.rhymes).map(o => o.word).sort();
    const selectedSorted = [...selectedOptions].sort();
    return JSON.stringify(correctAnswers) === JSON.stringify(selectedSorted);
  };

  if (questions.length === 0) {
    return <div className="text-center text-gray-600">Loading questions...</div>;
  }

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const quizComplete = currentQuestionIndex === questions.length - 1 && showResult;

  return (
    <motion.div
      className="space-y-6"
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            variants={confetti}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: 0,
                  transition: { duration: 2, ease: 'easeOut' }
                }}
              >
                {['🎮', '⭐', '🎉', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-blue-600">{attempts}</div>
          <div className="text-sm text-gray-600">Attempts</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="flex justify-center gap-3">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${
              difficulty === level
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Question Header */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Question {currentQuestionIndex + 1} / {questions.length}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Which words rhyme with:
            </h3>
            <motion.div
              className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-6xl mb-2">{currentQuestion.emoji}</div>
              <div className="text-4xl font-bold text-pink-600">{currentQuestion.targetWord}</div>
            </motion.div>
            <p className="text-gray-600 mt-4 text-sm">(You can select multiple answers)</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((optionObj, index) => {
              const isSelected = selectedOptions.includes(optionObj.word);
              const isCorrectAnswer = optionObj.rhymes;
              const showCorrect = showResult && isCorrectAnswer;
              const showWrong = showResult && isSelected && !isCorrectAnswer;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(optionObj.word)}
                  disabled={showResult}
                  className={`p-6 rounded-xl font-bold text-xl transition-all ${
                    showCorrect
                      ? 'bg-green-500 text-white'
                      : showWrong
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  whileHover={!showResult ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!showResult ? { scale: 0.95 } : {}}
                  variants={showCorrect ? wiggle : {}}
                  animate={showCorrect ? 'animate' : ''}
                >
                  <div className="text-4xl mb-2">{optionObj.emoji}</div>
                  {showCorrect && <CheckCircle className="inline mr-2" size={24} />}
                  {showWrong && <XCircle className="inline mr-2" size={24} />}
                  {optionObj.word}
                </motion.button>
              );
            })}
          </div>

          {/* Result Message */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                className={`p-4 rounded-xl mb-4 text-center font-semibold ${
                  isAnswerCorrect()
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {isAnswerCorrect() ? (
                  <>
                    <Star className="inline mr-2 text-yellow-500" size={24} />
                    Excellent! You got it right! +{difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4} ⭐
                  </>
                ) : (
                  <>
                    Try again! The words that rhyme are highlighted in green.
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!showResult ? (
              <motion.button
                onClick={handleSubmit}
                disabled={selectedOptions.length === 0}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                whileHover={selectedOptions.length > 0 ? { scale: 1.05 } : {}}
                whileTap={selectedOptions.length > 0 ? { scale: 0.95 } : {}}
              >
                Submit Answer
              </motion.button>
            ) : (
              <>
                {!isAnswerCorrect() && (
                  <motion.button
                    onClick={handleTryAgain}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={20} />
                    Try Again
                  </motion.button>
                )}
                {!quizComplete && (
                  <motion.button
                    onClick={handleNext}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Question
                  </motion.button>
                )}
                {quizComplete && (
                  <motion.button
                    onClick={loadQuestions}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={20} />
                    Play Again
                  </motion.button>
                )}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <Star className="inline text-yellow-500" size={20} />
          <span className="font-semibold ml-2">Select all words that rhyme with the target word!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default RhymeGameTab;
