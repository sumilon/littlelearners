import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Volume2, RefreshCw, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { spellingWords } from '../../../../data/spellingBeeData';
import { shuffle } from '../../../../utils/gameHelpers';

const PracticeTab = () => {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadWords();
  }, [difficulty]);

  const loadWords = () => {
    const filtered = spellingWords.filter(w => w.difficulty === difficulty);
    const shuffled = shuffle([...filtered]);
    setWords(shuffled);
    setCurrentIndex(0);
    setUserInput('');
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setAttempts(0);
  };

  const currentWord = words[currentIndex];

  const handlePlayWord = () => {
    playSound('click');
    if (currentWord) {
      speakEnglish(currentWord.word);
    }
  };

  const handlePlaySentence = () => {
    playSound('click');
    if (currentWord) {
      speakEnglish(currentWord.sentence);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const handleSubmit = () => {
    if (!userInput.trim() || showResult) return;

    playSound('click');
    setAttempts(attempts + 1);
    setShowResult(true);

    const correct = userInput.trim() === currentWord.word.toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      const stars = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
      addStars(stars);
      setScore(score + 1);
      playSound('correct');
      playSound('star');
      logActivity('spellingBee', 'practice', `Correctly spelled: ${currentWord.word}`);
      speakEnglish('Correct! Well done!');
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      playSound('wrong');
      speakEnglish(`Not quite. The correct spelling is ${currentWord.word}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    setUserInput('');
    setShowResult(false);
    setShowHint(false);
    
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleTryAgain = () => {
    playSound('click');
    setUserInput('');
    setShowResult(false);
    setShowHint(false);
  };

  const handleShowHint = () => {
    playSound('click');
    setShowHint(true);
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult) {
      handleSubmit();
    }
  };

  if (words.length === 0) {
    return <div className="text-center text-gray-600">Loading words...</div>;
  }

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const practiceComplete = currentIndex === words.length - 1 && showResult;

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
                {['🐝', '⭐', '🎉', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-600">Correct</div>
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
                ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Practice Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Word Info */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-4">
              Word {currentIndex + 1} / {words.length}
            </div>

            <motion.div 
              className="text-8xl mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {currentWord.emoji}
            </motion.div>

            {/* Audio Controls */}
            <div className="flex justify-center gap-4 mb-4">
              <motion.button
                onClick={handlePlayWord}
                className="flex items-center gap-2 px-6 py-3 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 size={20} className="text-pink-600" />
                <span className="text-pink-600 font-semibold">Hear Word</span>
              </motion.button>

              <motion.button
                onClick={handlePlaySentence}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 size={20} className="text-yellow-600" />
                <span className="text-yellow-600 font-semibold">Hear Sentence</span>
              </motion.button>
            </div>

            {/* Definition */}
            <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 italic">{currentWord.definition}</p>
            </div>
          </div>

          {/* Input Field */}
          <div className="mb-6">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={showResult}
              placeholder="Type the spelling here..."
              className="w-full px-6 py-4 text-2xl text-center rounded-xl border-4 border-pink-300 focus:border-pink-500 focus:outline-none disabled:bg-gray-100 font-bold uppercase tracking-wider"
              autoFocus
            />
          </div>

          {/* Hint Section */}
          {!showResult && (
            <div className="text-center mb-6">
              {!showHint ? (
                <motion.button
                  onClick={handleShowHint}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors text-blue-600 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HelpCircle size={20} />
                  Show Hint
                </motion.button>
              ) : (
                <motion.div
                  className="bg-blue-100 rounded-xl p-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-blue-700 font-semibold">{currentWord.hint}</p>
                  <p className="text-blue-600 text-sm mt-1">Word has {currentWord.word.length} letters</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Result Message */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                className={`p-6 rounded-xl mb-6 text-center font-semibold ${
                  isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                variants={isCorrect ? wiggle : {}}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="inline mr-2 text-green-600" size={32} />
                    <div className="text-2xl mb-2">Excellent! Perfect spelling!</div>
                    <div className="text-lg">
                      +{difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4} ⭐
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="inline mr-2 text-red-600" size={32} />
                    <div className="text-2xl mb-2">Not quite right!</div>
                    <div className="text-lg mb-2">The correct spelling is:</div>
                    <div className="text-3xl font-bold text-pink-600 tracking-wider">
                      {currentWord.word.toUpperCase()}
                    </div>
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
                disabled={!userInput.trim()}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                whileHover={userInput.trim() ? { scale: 1.05 } : {}}
                whileTap={userInput.trim() ? { scale: 0.95 } : {}}
              >
                Check Spelling
              </motion.button>
            ) : (
              <>
                {!isCorrect && (
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
                {!practiceComplete && (
                  <motion.button
                    onClick={handleNext}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Word
                  </motion.button>
                )}
                {practiceComplete && (
                  <motion.button
                    onClick={loadWords}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={20} />
                    Practice Again
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
          <span className="font-semibold ml-2">Listen to the word and type the correct spelling!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default PracticeTab;
