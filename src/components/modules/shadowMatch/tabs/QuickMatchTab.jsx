import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Zap } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { shadowPuzzles } from '../../../../data/shadowMatchData';
import { shuffleArray } from '../../../../utils/gameHelpers';

function QuickMatchTab() {
  const { addStars, logActivity } = useStore();
  const [gameState, setGameState] = useState('ready'); // ready, playing, complete
  const [puzzles, setPuzzles] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0 && gameState === 'playing') {
      endGame();
    }
    return () => {
      clearInterval(interval);
      cancelSpeech();
    };
  }, [gameState, timer]);

  const startGame = () => {
    playSound('click');
    // Mix all difficulties for variety
    const allPuzzles = [
      ...shadowPuzzles.easy,
      ...shadowPuzzles.medium,
      ...shadowPuzzles.hard
    ];
    const shuffled = shuffleArray(allPuzzles);
    setPuzzles(shuffled);
    setCurrentPuzzle(0);
    setScore(0);
    setTimer(60);
    setCombo(0);
    setGameState('playing');
    
    speakEnglish('Go! Match as many shadows as you can!');
  };

  const endGame = () => {
    setGameState('complete');
    playSound('star');
    addStars(score);
    speakEnglish(`Time's up! You scored ${score} points!`);
    logActivity('Shadow Match', 'Quick Match', `Scored ${score} points in 60 seconds`);
  };

  const handleShadowSelect = (index) => {
    if (gameState !== 'playing') return;

    const puzzle = puzzles[currentPuzzle];
    const isCorrect = index === puzzle.correctIndex;

    if (isCorrect) {
      playSound('correct');
      const points = 10 + (combo * 2);
      setScore(score + points);
      setCombo(combo + 1);
      
      // Move to next puzzle
      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
      } else {
        // Reset to beginning if we run out
        setCurrentPuzzle(0);
        const reshuffled = shuffleArray([...puzzles]);
        setPuzzles(reshuffled);
      }
    } else {
      playSound('wrong');
      setCombo(0);
    }
  };

  if (gameState === 'ready') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Quick Match Challenge!</h3>
                <p className="text-gray-700">
                  Match as many shadows as you can in 60 seconds! ⚡
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-3xl font-bold text-white mb-4">Speed Challenge</h2>
            <p className="text-gray-300 mb-6">
              Match shadows quickly! Build combos for bonus points!
            </p>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="text-4xl font-bold text-yellow-400 mb-2">60 seconds</div>
              <div className="text-sm text-gray-400">Time limit</div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Start Challenge! 🚀
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
            <div className="text-8xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-white mb-4">Time's Up!</h2>
            
            <div className="text-7xl font-bold text-orange-400 my-6">
              {score}
            </div>
            <p className="text-xl text-gray-300 mb-2">Points</p>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-purple-400">
                Shadows Matched: {Math.floor(score / 10)}
              </div>
            </div>

            <button
              onClick={() => setGameState('ready')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              🔄 Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex flex-col bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-3">
      {/* Timer and Score - Compact */}
      <motion.div
        className="grid grid-cols-3 gap-2 mb-3 flex-shrink-0"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className={`bg-gray-800 rounded-lg p-2 text-center ${timer <= 10 ? 'animate-pulse bg-red-900' : ''}`}>
          <Clock className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
          <div className="text-xl font-bold text-white">{timer}s</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-400 mb-1">Score</div>
          <div className="text-xl font-bold text-orange-400">{score}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <Zap className="w-4 h-4 mx-auto mb-1 text-purple-400" />
          <div className="text-xl font-bold text-purple-400">x{combo}</div>
        </div>
      </motion.div>

      {/* Object to Match - Compact */}
      <motion.div
        key={currentPuzzle}
        className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-3 mb-3 shadow-xl text-center flex-shrink-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-8xl mb-1">{puzzle.object.emoji}</div>
        <div className="text-lg font-bold text-white">{puzzle.object.name}</div>
      </motion.div>

      {/* Shadow Options - Centered and Constrained */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className={`grid ${puzzle.shadows.length > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-3 max-w-2xl w-full`}>
          {puzzle.shadows.map((shadow, index) => (
            <motion.button
              key={index}
              onClick={() => handleShadowSelect(index)}
              className="aspect-square rounded-xl bg-gray-800 hover:bg-gray-700 p-3 text-7xl transition-all flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {shadow}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickMatchTab;
