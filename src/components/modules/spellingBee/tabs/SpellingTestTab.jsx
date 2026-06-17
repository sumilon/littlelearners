import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Volume2, Clock, Award } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn, confetti } from '../../../../utils/animationUtils';
import { spellingWords } from '../../../../data/spellingBeeData';
import { shuffle } from '../../../../utils/gameHelpers';

const SpellingTestTab = () => {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [testStarted, setTestStarted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [testWords, setTestWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const testDurations = {
    easy: 180, // 3 minutes
    medium: 240, // 4 minutes
    hard: 300, // 5 minutes
  };

  const questionsCount = {
    easy: 5,
    medium: 7,
    hard: 10,
  };

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !testComplete) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (testStarted && timeLeft === 0 && !testComplete) {
      handleTestComplete();
    }
  }, [timeLeft, testStarted, testComplete]);

  const handleStartTest = () => {
    playSound('click');
    const filtered = spellingWords.filter(w => w.difficulty === difficulty);
    const shuffled = shuffle([...filtered]);
    const selected = shuffled.slice(0, questionsCount[difficulty]);
    
    setTestWords(selected);
    setTestStarted(true);
    setTestComplete(false);
    setCurrentWordIndex(0);
    setUserAnswers([]);
    setCurrentInput('');
    setTimeLeft(testDurations[difficulty]);
    setScore(0);
    
    speakEnglish('Your spelling test starts now. Listen carefully to each word.');
    
    // Auto-play first word after 2 seconds
    setTimeout(() => {
      if (selected[0]) {
        speakEnglish(selected[0].word);
      }
    }, 2000);
  };

  const handlePlayWord = () => {
    playSound('click');
    if (testWords[currentWordIndex]) {
      speakEnglish(testWords[currentWordIndex].word);
    }
  };

  const handleSubmitWord = () => {
    if (!currentInput.trim()) return;

    playSound('click');
    const currentWord = testWords[currentWordIndex];
    const isCorrect = currentInput.trim().toLowerCase() === currentWord.word.toLowerCase();
    
    const newAnswers = [...userAnswers, {
      word: currentWord,
      userAnswer: currentInput.trim(),
      correct: isCorrect,
    }];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setCurrentInput('');
    
    if (currentWordIndex < testWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      // Auto-play next word
      setTimeout(() => {
        if (testWords[currentWordIndex + 1]) {
          speakEnglish(testWords[currentWordIndex + 1].word);
        }
      }, 500);
    } else {
      handleTestComplete();
    }
  };

  const handleTestComplete = () => {
    setTestComplete(true);
    
    const finalScore = score;
    const totalQuestions = testWords.length;
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    
    // Award stars based on performance
    let stars = 0;
    if (percentage >= 90) {
      stars = 10;
    } else if (percentage >= 75) {
      stars = 7;
    } else if (percentage >= 60) {
      stars = 5;
    } else if (percentage >= 40) {
      stars = 3;
    }
    
    if (stars > 0) {
      addStars(stars);
      playSound('star');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    logActivity('spellingBee', 'spellingTest', `Completed ${difficulty} test: ${finalScore}/${totalQuestions} correct`);
    
    speakEnglish(`Test complete! You scored ${finalScore} out of ${totalQuestions}.`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleSubmitWord();
    }
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
    setTestStarted(false);
    setTestComplete(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start Screen
  if (!testStarted) {
    return (
      <motion.div
        className="space-y-6"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Spelling Test</h2>
          <p className="text-gray-600 mb-6">
            Take a timed spelling test to earn stars! Listen carefully to each word and type the correct spelling.
          </p>

          {/* Difficulty Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Choose Difficulty:</h3>
            <div className="flex justify-center gap-3">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Test Details */}
          <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <Clock className="inline text-blue-600 mb-2" size={32} />
                <div className="text-2xl font-bold text-blue-600">{formatTime(testDurations[difficulty])}</div>
                <div className="text-sm text-gray-600">Time Limit</div>
              </div>
              <div>
                <Star className="inline text-yellow-600 mb-2" size={32} />
                <div className="text-2xl font-bold text-yellow-600">{questionsCount[difficulty]}</div>
                <div className="text-sm text-gray-600">Total Words</div>
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleStartTest}
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-bold text-xl hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Test
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Results Screen
  if (testComplete) {
    const percentage = Math.round((score / testWords.length) * 100);
    const grade = percentage >= 90 ? 'A+' : percentage >= 75 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'D';

    return (
      <motion.div
        className="space-y-6"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        {/* Confetti */}
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
                  initial={{ x: '50vw', y: '50vh', opacity: 1 }}
                  animate={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    opacity: 0,
                    transition: { duration: 2, ease: 'easeOut' }
                  }}
                >
                  {['🏆', '⭐', '🎉', '✨'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <Award className="inline text-yellow-500 mb-4" size={64} />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Complete!</h2>
          
          {/* Score Summary */}
          <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl p-6 mb-6">
            <div className="text-6xl font-bold text-pink-600 mb-2">{score} / {testWords.length}</div>
            <div className="text-2xl font-semibold text-gray-700 mb-2">{percentage}%</div>
            <div className="text-4xl font-bold text-yellow-600">Grade: {grade}</div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {userAnswers.map((answer, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl ${
                  answer.correct ? 'bg-green-100' : 'bg-red-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{answer.word.emoji}</span>
                    <div className="text-left">
                      <div className={`font-bold ${answer.correct ? 'text-green-700' : 'text-red-700'}`}>
                        {answer.word.word}
                      </div>
                      {!answer.correct && (
                        <div className="text-sm text-gray-600">Your answer: {answer.userAnswer}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {answer.correct ? '✅' : '❌'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => setTestStarted(false)}
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-bold text-xl hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Take Another Test
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Test In Progress
  const currentWord = testWords[currentWordIndex];

  return (
    <motion.div
      className="space-y-6"
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      {/* Timer and Progress */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <Clock className="inline text-blue-600 mb-2" size={24} />
          <div className={`text-2xl font-bold ${timeLeft < 30 ? 'text-red-600' : 'text-blue-600'}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600">Time Left</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <Star className="inline text-yellow-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-yellow-600">
            {currentWordIndex + 1} / {testWords.length}
          </div>
          <div className="text-sm text-gray-600">Question</div>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{currentWord.emoji}</div>
            
            <motion.button
              onClick={handlePlayWord}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 size={24} className="text-pink-600" />
              <span className="text-pink-600 font-semibold text-lg">Hear Word Again</span>
            </motion.button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value.toLowerCase())}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer..."
              className="w-full px-6 py-4 text-2xl text-center rounded-xl border-4 border-pink-300 focus:border-pink-500 focus:outline-none font-bold uppercase tracking-wider"
              autoFocus
            />
          </div>

          <motion.button
            onClick={handleSubmitWord}
            disabled={!currentInput.trim()}
            className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            whileHover={currentInput.trim() ? { scale: 1.02 } : {}}
            whileTap={currentInput.trim() ? { scale: 0.98 } : {}}
          >
            Submit Answer
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default SpellingTestTab;
