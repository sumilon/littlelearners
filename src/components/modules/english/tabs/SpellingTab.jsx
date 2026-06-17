import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, Star, RotateCcw } from 'lucide-react';
import { spellingWords } from '../../../../data/englishData';
import { speakEnglish } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, correctAnswer, wrongAnswer, confetti } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';
import { shuffle } from '../../../../utils/gameHelpers';

const SpellingTab = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameWords, setGameWords] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  // Initialize game words when difficulty changes
  useEffect(() => {
    const words = spellingWords.filter(w => w.difficulty === difficulty);
    setGameWords(shuffle(words).slice(0, 5)); // 5 words per game
    setCurrentWordIndex(0);
    setUserInput('');
    setShowResult(null);
    setShowHint(false);
    setScore(0);
    setAttempts(0);
  }, [difficulty]);

  const currentWord = gameWords[currentWordIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    const isCorrect = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    setShowResult(isCorrect ? 'correct' : 'wrong');
    setAttempts(attempts + 1);

    if (isCorrect) {
      playSound('correct');
      const stars = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 5;
      setScore(score + 1);
      addStars(stars);
      logActivity('english', 'spelling', `Spelled correctly: ${currentWord.word}`);
      speakEnglish(`Correct! ${currentWord.word}`);
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      
      // Move to next word after delay
      setTimeout(() => {
        if (currentWordIndex < gameWords.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput('');
          setShowResult(null);
          setShowHint(false);
        } else {
          // Game completed
          setShowResult('completed');
        }
      }, 2000);
    } else {
      playSound('wrong');
      speakEnglish('Try again!');
      setTimeout(() => setShowResult(null), 1500);
    }
  };

  const handleHint = () => {
    playSound('click');
    setShowHint(true);
    speakEnglish(currentWord.hint);
  };

  const handleListen = () => {
    playSound('click');
    speakEnglish(currentWord.word);
  };

  const resetGame = () => {
    playSound('click');
    const words = spellingWords.filter(w => w.difficulty === difficulty);
    setGameWords(shuffle(words).slice(0, 5));
    setCurrentWordIndex(0);
    setUserInput('');
    setShowResult(null);
    setShowHint(false);
    setScore(0);
    setAttempts(0);
  };

  if (!currentWord) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Difficulty Selector */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Choose Difficulty Level
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => {
                playSound('click');
                setDifficulty(level);
              }}
              className={`
                px-6 py-3 rounded-xl font-bold text-lg transition-all capitalize
                ${difficulty === level
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              {level}
              <div className="text-xs mt-1">
                {level === 'easy' ? '2⭐' : level === 'medium' ? '3⭐' : '5⭐'}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Game Area */}
      <AnimatePresence mode="wait">
        {showResult !== 'completed' && (
          <motion.div
            key={currentWordIndex}
            className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-2xl shadow-xl p-8 relative overflow-hidden"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Confetti */}
            {showConfetti && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                variants={confetti}
                initial="hidden"
                animate="visible"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-10%`
                    }}
                    animate={{
                      y: ['0vh', '120vh'],
                      rotate: [0, 360],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      ease: 'easeOut'
                    }}
                  >
                    {['⭐', '🌟', '✨', '🎉'][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-bold text-gray-700">
                Word {currentWordIndex + 1} of {gameWords.length}
              </div>
              <div className="text-lg font-bold text-orange-600">
                Score: {score} / {attempts}
              </div>
            </div>

            {/* Emoji */}
            <div className="text-9xl text-center mb-6">
              {currentWord.emoji}
            </div>

            {/* Hint Area */}
            <div className="text-center mb-6">
              {!showHint ? (
                <button
                  onClick={handleHint}
                  className="px-6 py-3 bg-yellow-400 text-yellow-900 rounded-xl font-bold hover:bg-yellow-500 transition-all hover:scale-105"
                >
                  💡 Need a Hint?
                </button>
              ) : (
                <motion.div
                  className="text-2xl text-gray-700 font-semibold bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  💡 {currentWord.hint}
                </motion.div>
              )}
            </div>

            {/* Listen Button */}
            <div className="text-center mb-6">
              <button
                onClick={handleListen}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all hover:scale-105"
              >
                <Volume2 size={20} />
                <span>Listen to the Word</span>
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the word here..."
                disabled={showResult !== null}
                className="w-full px-6 py-4 text-3xl text-center font-bold bg-white border-4 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 disabled:opacity-50"
                autoFocus
              />

              <button
                type="submit"
                disabled={!userInput.trim() || showResult !== null}
                className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold text-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                Check Spelling
              </button>
            </form>

            {/* Feedback */}
            <AnimatePresence>
              {showResult === 'correct' && (
                <motion.div
                  className="mt-6 p-4 bg-green-500 text-white rounded-xl text-center font-bold text-xl"
                  variants={correctAnswer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <CheckCircle size={32} className="inline mr-2" />
                  Perfect Spelling! 
                  {difficulty === 'easy' ? ' +2⭐' : difficulty === 'medium' ? ' +3⭐' : ' +5⭐'}
                </motion.div>
              )}
              
              {showResult === 'wrong' && (
                <motion.div
                  className="mt-6 p-4 bg-red-500 text-white rounded-xl text-center font-bold text-xl"
                  variants={wrongAnswer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <XCircle size={32} className="inline mr-2" />
                  Not quite! Try again! The correct spelling is: {currentWord.word}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Completion Screen */}
        {showResult === 'completed' && (
          <motion.div
            className="bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 rounded-2xl shadow-2xl p-12 text-center"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <div className="text-8xl mb-4">🏆</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Spelling Champion!
            </h2>
            <p className="text-2xl text-white mb-6">
              You completed the {difficulty} level!
            </p>
            <p className="text-xl text-white mb-8">
              Score: {score} / {attempts} words correct
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                <RotateCcw size={24} />
                <span>Play Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div 
        className="bg-blue-100 rounded-2xl p-4 text-center"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <p className="text-blue-800 font-semibold flex items-center justify-center gap-2">
          <Star size={20} className="text-yellow-500" />
          Listen to the word, see the picture, and type the correct spelling! Earn more stars on harder levels!
        </p>
      </motion.div>
    </div>
  );
};

export default SpellingTab;
