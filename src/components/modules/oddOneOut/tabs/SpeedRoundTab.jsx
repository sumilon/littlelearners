import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, confetti } from '../../../../utils/animationUtils';
import { oddOneOutPuzzles } from '../../../../data/oddOneOutData';

const SpeedRoundTab = () => {
  const { addStars, logActivity } = useStore();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [puzzlePool, setPuzzlePool] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    playSound('click');
    speakEnglish('Speed round starting! Find the odd one out as fast as you can!');
    
    // Create puzzle pool from all difficulties
    const allPuzzles = [
      ...oddOneOutPuzzles.easy,
      ...oddOneOutPuzzles.medium,
      ...oddOneOutPuzzles.hard
    ];
    const shuffled = [...allPuzzles].sort(() => Math.random() - 0.5);
    setPuzzlePool(shuffled);
    
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(60);
    setScore(0);
    loadNextPuzzle(shuffled);
  };

  const loadNextPuzzle = (pool) => {
    if (pool.length === 0) {
      endGame();
      return;
    }

    const [nextPuzzle, ...remainingPool] = pool;
    setCurrentPuzzle(nextPuzzle);
    setShuffledItems([...nextPuzzle.items].sort(() => Math.random() - 0.5));
    setPuzzlePool(remainingPool);
  };

  const endGame = () => {
    clearInterval(timerRef.current);
    setGameStarted(false);
    setGameOver(true);

    let stars = 0;
    if (score >= 15) stars = 5;
    else if (score >= 12) stars = 4;
    else if (score >= 9) stars = 3;
    else if (score >= 6) stars = 2;
    else stars = 1;

    addStars(stars);
    playSound('star');
    logActivity('Odd One Out', 'Speed Round', `Score: ${score} in 60 seconds`);
    speakEnglish(`Time's up! You found ${score} odd ones!`);
  };

  const handleAnswerClick = (item) => {
    if (!gameStarted || !currentPuzzle) return;

    playSound('click');

    if (item === currentPuzzle.oddOne) {
      playSound('correct');
      setScore(score + 1);
      loadNextPuzzle(puzzlePool);
    } else {
      playSound('wrong');
    }
  };

  const resetGame = () => {
    playSound('click');
    setGameStarted(false);
    setGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setCurrentPuzzle(null);
  };

  if (gameOver) {
    return (
      <motion.div
        variants={confetti}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div
          variants={scaleIn}
          className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-12 shadow-2xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-9xl mb-6"
          >
            ⏱️
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-6">Time's Up!</h2>
          <div className="text-9xl font-bold text-white mb-6">{score}</div>
          <p className="text-3xl font-semibold text-white/90 mb-8">
            {score >= 15 ? 'Amazing Speed!' : score >= 12 ? 'Great Job!' : score >= 9 ? 'Good Work!' : score >= 6 ? 'Nice Try!' : 'Keep Practicing!'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
          >
            <RotateCcw className="w-8 h-8" />
            Play Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  if (!gameStarted) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div variants={scaleIn} className="bg-white rounded-3xl p-12 shadow-2xl text-center">
          <div className="text-9xl mb-6">⚡</div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
            Speed Round!
          </h2>
          <p className="text-2xl text-gray-700 mb-8">
            Find as many odd ones out as you can in 60 seconds!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-12 py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-3xl shadow-lg hover:shadow-xl transition-all flex items-center gap-4 mx-auto"
          >
            <Play className="w-10 h-10" />
            Start Game
          </motion.button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          variants={fadeIn}
          className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-yellow-900 mb-2">Speed Round Rules:</h3>
              <ul className="text-yellow-800 space-y-1">
                <li>⏱️ You have 60 seconds to find as many odd ones as possible</li>
                <li>⚡ Click the different item quickly!</li>
                <li>❌ Wrong answers don't count but don't waste time</li>
                <li>🏆 Score 15+ for maximum stars!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (!currentPuzzle) return null;

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Game Stats */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Timer className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Time Left</p>
              <motion.p
                animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                className={`text-5xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-orange-600'}`}
              >
                {timeLeft}s
              </motion.p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-5xl font-bold text-green-600">{score}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Puzzle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPuzzle.id}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Find the different one!
          </h3>
          <p className="text-xl text-center text-gray-600 mb-6">
            Category: {currentPuzzle.category}
          </p>

          {/* Items Grid */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            {shuffledItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerClick(item)}
                className="aspect-square rounded-3xl p-8 text-8xl shadow-xl bg-gradient-to-br from-purple-100 to-pink-100 hover:shadow-2xl transition-all"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quick Hint */}
      <motion.div
        variants={fadeIn}
        className="bg-blue-100 border-4 border-blue-400 rounded-2xl p-4 shadow-lg text-center"
      >
        <p className="text-lg font-bold text-blue-800">
          ⚡ Click fast! Every second counts! ⚡
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SpeedRoundTab;
