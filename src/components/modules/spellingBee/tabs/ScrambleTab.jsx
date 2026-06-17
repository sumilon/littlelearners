import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, RefreshCw, Volume2, CheckCircle, XCircle, Shuffle } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { spellingWords } from '../../../../data/spellingBeeData';
import { shuffle } from '../../../../utils/gameHelpers';

const ScrambleTab = () => {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadWords();
  }, [difficulty]);

  useEffect(() => {
    if (words[currentIndex]) {
      scrambleWord(words[currentIndex].word);
    }
  }, [currentIndex, words]);

  const loadWords = () => {
    const filtered = spellingWords.filter(w => w.difficulty === difficulty);
    const shuffled = shuffle([...filtered]);
    setWords(shuffled);
    setCurrentIndex(0);
    setSelectedLetters([]);
    setShowResult(false);
    setScore(0);
    setAttempts(0);
  };

  const scrambleWord = (word) => {
    const letters = word.split('').map((letter, index) => ({
      letter,
      id: index,
      used: false,
    }));
    
    // Shuffle letters
    let scrambled = shuffle([...letters]);
    
    // Make sure it's actually scrambled (not the same as original)
    let attempts = 0;
    while (scrambled.map(l => l.letter).join('') === word && attempts < 10) {
      scrambled = shuffle([...letters]);
      attempts++;
    }
    
    setScrambledLetters(scrambled);
  };

  const currentWord = words[currentIndex];

  const handleLetterClick = (letterId) => {
    playSound('click');
    
    const letter = scrambledLetters.find(l => l.id === letterId);
    if (!letter || letter.used) return;
    
    // Mark letter as used
    setScrambledLetters(scrambledLetters.map(l => 
      l.id === letterId ? { ...l, used: true } : l
    ));
    
    // Add to selected letters
    setSelectedLetters([...selectedLetters, letter]);
  };

  const handleRemoveLetter = (index) => {
    playSound('click');
    
    const removedLetter = selectedLetters[index];
    
    // Mark letter as unused
    setScrambledLetters(scrambledLetters.map(l => 
      l.id === removedLetter.id ? { ...l, used: false } : l
    ));
    
    // Remove from selected letters
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const handleShuffle = () => {
    playSound('click');
    if (currentWord) {
      scrambleWord(currentWord.word);
    }
  };

  const handleCheck = () => {
    if (selectedLetters.length === 0 || showResult) return;

    playSound('click');
    setAttempts(attempts + 1);
    setShowResult(true);

    const userWord = selectedLetters.map(l => l.letter).join('');
    const correct = userWord.toLowerCase() === currentWord.word.toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      const stars = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
      addStars(stars);
      setScore(score + 1);
      playSound('correct');
      playSound('star');
      logActivity('spellingBee', 'scramble', `Unscrambled: ${currentWord.word}`);
      speakEnglish(`Correct! ${currentWord.word}`);
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      playSound('wrong');
      speakEnglish('Not quite right. Try again!');
    }
  };

  const handleNext = () => {
    playSound('click');
    setSelectedLetters([]);
    setShowResult(false);
    
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleTryAgain = () => {
    playSound('click');
    setSelectedLetters([]);
    setShowResult(false);
    // Reset used state for all letters
    setScrambledLetters(scrambledLetters.map(l => ({ ...l, used: false })));
  };

  const handlePlayWord = () => {
    playSound('click');
    if (currentWord) {
      speakEnglish(currentWord.word);
    }
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
  };

  if (words.length === 0) {
    return <div className="text-center text-gray-600">Loading words...</div>;
  }

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const gameComplete = currentIndex === words.length - 1 && showResult && isCorrect;

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
                {['🔀', '⭐', '🎉', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-600">Solved</div>
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

      {/* Game Card */}
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

            <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 italic">{currentWord.definition}</p>
            </div>

            <div className="flex justify-center gap-3 mb-4">
              <motion.button
                onClick={handlePlayWord}
                className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 size={20} className="text-pink-600" />
                <span className="text-pink-600 font-semibold">Hear Word</span>
              </motion.button>

              <motion.button
                onClick={handleShuffle}
                disabled={showResult}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors disabled:opacity-50"
                whileHover={!showResult ? { scale: 1.05 } : {}}
                whileTap={!showResult ? { scale: 0.95 } : {}}
              >
                <Shuffle size={20} className="text-blue-600" />
                <span className="text-blue-600 font-semibold">Shuffle</span>
              </motion.button>
            </div>
          </div>

          {/* Answer Area */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-xl p-6 min-h-24 flex flex-wrap items-center justify-center gap-2">
              {selectedLetters.length === 0 ? (
                <span className="text-gray-400 text-lg">Tap letters below to form the word</span>
              ) : (
                selectedLetters.map((letter, index) => (
                  <motion.button
                    key={`selected-${letter.id}`}
                    onClick={() => handleRemoveLetter(index)}
                    disabled={showResult}
                    className="bg-white text-3xl font-bold text-pink-600 w-14 h-14 rounded-xl shadow-md hover:bg-pink-50 transition-colors disabled:cursor-default"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={!showResult ? { scale: 1.1, y: -5 } : {}}
                    whileTap={!showResult ? { scale: 0.9 } : {}}
                  >
                    {letter.letter.toUpperCase()}
                  </motion.button>
                ))
              )}
            </div>
          </div>

          {/* Letter Pool */}
          <div className="mb-6">
            <h3 className="text-center text-gray-600 font-semibold mb-3">Available Letters:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {scrambledLetters.map((letter) => (
                <motion.button
                  key={letter.id}
                  onClick={() => handleLetterClick(letter.id)}
                  disabled={letter.used || showResult}
                  className={`text-3xl font-bold w-14 h-14 rounded-xl shadow-md transition-all ${
                    letter.used
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-br from-yellow-400 to-pink-400 text-white hover:shadow-lg'
                  }`}
                  whileHover={!letter.used && !showResult ? { scale: 1.1, y: -5 } : {}}
                  whileTap={!letter.used && !showResult ? { scale: 0.9 } : {}}
                >
                  {letter.letter.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>

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
                    <div className="text-2xl mb-2">Perfect! You unscrambled it!</div>
                    <div className="text-3xl font-bold mb-2">{currentWord.word.toUpperCase()}</div>
                    <div className="text-lg">
                      +{difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4} ⭐
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="inline mr-2 text-red-600" size={32} />
                    <div className="text-2xl mb-2">Not quite! Try again!</div>
                    <div className="text-sm text-gray-600">Hint: {currentWord.hint}</div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!showResult ? (
              <motion.button
                onClick={handleCheck}
                disabled={selectedLetters.length !== currentWord.word.length}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                whileHover={selectedLetters.length === currentWord.word.length ? { scale: 1.05 } : {}}
                whileTap={selectedLetters.length === currentWord.word.length ? { scale: 0.95 } : {}}
              >
                Check Answer
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
                {isCorrect && !gameComplete && (
                  <motion.button
                    onClick={handleNext}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Word
                  </motion.button>
                )}
                {gameComplete && (
                  <motion.button
                    onClick={loadWords}
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
          <span className="font-semibold ml-2">Tap the scrambled letters to form the correct word!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default ScrambleTab;
