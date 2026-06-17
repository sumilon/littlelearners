import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, HelpCircle, Sparkles, RotateCcw, ArrowRight, Target } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { wordsByLevel, emojiCipher, encodeToEmojis, getRandomLetters } from '../../../../data/mysteryLettersData';

const DecodeMessageTab = ({ onBadgeEarned }) => {
  const [selectedLevel, setSelectedLevel] = useState('easy');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completedWords, setCompletedWords] = useState(new Set());
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  const currentLevelData = wordsByLevel[selectedLevel];
  const currentWord = currentLevelData.words[currentWordIndex];
  const encodedMessage = encodeToEmojis(currentWord.word);

  useEffect(() => {
    // Initialize empty answer slots
    setUserAnswer(new Array(currentWord.word.length).fill(''));
    setShowResult(false);
    setShowHint(false);
    speak(`Decode this secret message: ${currentWord.hint}`);
  }, [currentWordIndex, selectedLevel]);

  const handleLetterSelect = (index, letter) => {
    if (showResult) return;
    
    playSound('click');
    const newAnswer = [...userAnswer];
    newAnswer[index] = letter;
    setUserAnswer(newAnswer);
    speak(letter);

    // Auto-check if all slots filled
    if (!newAnswer.includes('') && !showResult) {
      setTimeout(() => checkAnswer(newAnswer), 500);
    }
  };

  const checkAnswer = (answer = userAnswer) => {
    const userWord = answer.join('');
    const correct = userWord === currentWord.word;
    
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('success');
      setScore(score + 1);
      setCompletedWords(prev => new Set([...prev, `${selectedLevel}-${currentWordIndex}`]));
      setConsecutiveCorrect(consecutiveCorrect + 1);
      speak(`Correct! The word is ${currentWord.word}!`);

      // Check for first decode badge
      if (score === 0 && onBadgeEarned) {
        onBadgeEarned('first-decode');
      }

      // Check for speed decoder badge
      if (consecutiveCorrect + 1 >= 10 && onBadgeEarned) {
        onBadgeEarned('speed-decoder');
      }
    } else {
      playSound('error');
      setConsecutiveCorrect(0);
      speak(`Not quite! Try again!`);
    }
  };

  const handleNext = () => {
    playSound('click');
    
    if (currentWordIndex < currentLevelData.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Level complete
      speak(`Amazing! You completed all ${currentLevelData.name} words!`);
      if (onBadgeEarned) {
        const badgeIds = {
          'easy': 'junior-detective',
          'medium': 'secret-agent',
          'hard': 'master-detective',
          'expert': 'code-breaker'
        };
        onBadgeEarned(badgeIds[selectedLevel]);
      }
    }
  };

  const handleHint = () => {
    playSound('click');
    setShowHint(true);
    speak(currentWord.hint);
  };

  const handleReset = () => {
    playSound('click');
    setUserAnswer(new Array(currentWord.word.length).fill(''));
    setShowResult(false);
    setShowHint(false);
  };

  const handleLevelChange = (level) => {
    playSound('click');
    setSelectedLevel(level);
    setCurrentWordIndex(0);
    setScore(0);
    setShowResult(false);
    speak(`Switching to ${wordsByLevel[level].name} level`);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4">
        {/* Level Selection */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white text-center mb-3">Choose Difficulty 🎯</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(wordsByLevel).map(([key, level]) => (
              <motion.button
                key={key}
                onClick={() => handleLevelChange(key)}
                className={`p-3 rounded-xl font-bold transition-all ${
                  selectedLevel === key
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-1">{level.badgeEmoji}</div>
                <div className="text-sm">{level.name}</div>
                <div className="text-xs opacity-70">{level.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
            <div className="text-white/80 text-sm">Progress</div>
            <div className="text-white font-bold">
              {currentWordIndex + 1} / {currentLevelData.words.length}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
            <div className="text-white/80 text-sm">Score</div>
            <div className="text-white font-bold flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              {score}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
            <div className="text-white/80 text-sm">Streak</div>
            <div className="text-white font-bold flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-orange-400" />
              {consecutiveCorrect}
            </div>
          </div>
        </div>

        {/* Main Decode Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedLevel}-${currentWordIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 mb-6 shadow-2xl"
          >
            {/* Mystery Message Title */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                🕵️ Decode This Secret Message!
              </h2>
              <p className="text-white/80 text-lg">
                Tap each emoji to reveal the letter
              </p>
            </div>

            {/* Encoded Message Display */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 mb-6">
              <div className="flex flex-wrap justify-center gap-4">
                {encodedMessage.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[80px]"
                  >
                    <div className="text-6xl text-center mb-2">{item.emoji}</div>
                    {userAnswer[index] && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center text-3xl font-bold text-yellow-400"
                      >
                        {userAnswer[index]}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Letter Slots for Current Position */}
            {!showResult && (
              <div className="mb-6">
                <div className="text-center text-white/90 mb-3">
                  Select letters to decode the message:
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {encodedMessage.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-white/70 text-sm mb-2">Position {index + 1}</div>
                      <div className="flex gap-2">
                        {getRandomLetters(item.letter, 4).map((letter) => (
                          <motion.button
                            key={`${index}-${letter}`}
                            onClick={() => handleLetterSelect(index, letter)}
                            disabled={userAnswer[index] !== ''}
                            className={`w-14 h-14 rounded-xl font-bold text-xl transition-all ${
                              userAnswer[index] === letter
                                ? 'bg-yellow-400 text-gray-900 shadow-lg'
                                : userAnswer[index] === ''
                                ? 'bg-white/20 hover:bg-white/30 text-white'
                                : 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
                            }`}
                            whileHover={userAnswer[index] === '' ? { scale: 1.1 } : {}}
                            whileTap={userAnswer[index] === '' ? { scale: 0.9 } : {}}
                          >
                            {letter}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hint Section */}
            <div className="text-center mb-4">
              {!showHint && !showResult && (
                <motion.button
                  onClick={handleHint}
                  className="bg-blue-500/30 hover:bg-blue-500/50 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HelpCircle className="inline w-5 h-5 mr-2" />
                  Need a Clue?
                </motion.button>
              )}

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-blue-500/30 backdrop-blur-md rounded-xl p-4 mt-2"
                  >
                    <div className="text-white text-lg">
                      💡 Clue: {currentWord.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Result Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`p-6 rounded-2xl mb-4 ${
                    isCorrect
                      ? 'bg-green-500/40 border-2 border-green-300'
                      : 'bg-red-500/40 border-2 border-red-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-7xl mb-3">
                      {isCorrect ? '🎉' : '❌'}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {isCorrect ? 'Case Solved!' : 'Try Again!'}
                    </div>
                    <div className="text-xl text-white/90">
                      The word is: <strong>{currentWord.word}</strong>
                    </div>
                    {isCorrect && (
                      <div className="text-white/80 mt-2">
                        {currentWord.hint}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              {!showResult && userAnswer.some(a => a !== '') && (
                <motion.button
                  onClick={handleReset}
                  className="bg-gray-600/50 hover:bg-gray-600/70 text-white px-6 py-3 rounded-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="inline w-5 h-5 mr-2" />
                  Reset
                </motion.button>
              )}

              {showResult && isCorrect && (
                <motion.button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentWordIndex < currentLevelData.words.length - 1 ? (
                    <>Next Mystery <ArrowRight className="inline w-5 h-5 ml-2" /></>
                  ) : (
                    <>Level Complete! <Trophy className="inline w-5 h-5 ml-2" /></>
                  )}
                </motion.button>
              )}

              {showResult && !isCorrect && (
                <motion.button
                  onClick={handleReset}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="inline w-5 h-5 mr-2" />
                  Try Again
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center"
        >
          <div className="text-white/80 text-sm mb-2">Word Category</div>
          <div className="text-2xl font-bold text-white capitalize">
            {currentWord.category}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DecodeMessageTab;
