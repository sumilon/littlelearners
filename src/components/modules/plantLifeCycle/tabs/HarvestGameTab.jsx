import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Timer, Target } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { harvestChallenges, plantTypes } from '../../../../data/plantLifeCycleData';

const HarvestGameTab = () => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'completed'
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [harvested, setHarvested] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [fallingItems, setFallingItems] = useState([]);
  const timerRef = useRef(null);
  const gameRef = useRef(null);

  const challenge = harvestChallenges[currentChallenge];
  const plant = plantTypes.find(p => p.id === challenge?.plant);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
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
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'playing') {
      const spawnInterval = setInterval(() => {
        spawnFallingItem();
      }, 1000);

      return () => clearInterval(spawnInterval);
    }
  }, [gameState]);

  const spawnFallingItem = () => {
    const newItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      emoji: plant.harvest.emoji,
      isBad: Math.random() > 0.8 // 20% chance of bad item
    };
    
    setFallingItems(prev => [...prev, newItem]);

    // Remove item after animation
    setTimeout(() => {
      setFallingItems(prev => prev.filter(item => item.id !== newItem.id));
    }, 3000);
  };

  const handleStartGame = () => {
    playSound('click');
    setGameState('playing');
    setHarvested(0);
    setTimeLeft(challenge.timeLimit);
    setFallingItems([]);
    speak(challenge.message);
  };

  const handleItemClick = (item) => {
    if (item.isBad) {
      playSound('error');
      setHarvested(prev => Math.max(0, prev - 1));
    } else {
      playSound('success');
      setHarvested(prev => prev + 1);
      
      // Check if challenge completed
      if (harvested + 1 >= challenge.target) {
        completeChallenge();
      }
    }
    
    // Remove clicked item
    setFallingItems(prev => prev.filter(i => i.id !== item.id));
  };

  const completeChallenge = () => {
    clearInterval(timerRef.current);
    playSound('success');
    const timeBonus = timeLeft * 10;
    const challengeScore = 100 + timeBonus;
    setScore(prev => prev + challengeScore);
    speak(`Amazing! You collected all ${challenge.target} items!`);
    
    setTimeout(() => {
      if (currentChallenge < harvestChallenges.length - 1) {
        setCurrentChallenge(currentChallenge + 1);
        setGameState('menu');
      } else {
        setGameState('completed');
      }
    }, 2000);
  };

  const endGame = () => {
    clearInterval(timerRef.current);
    if (harvested >= challenge.target) {
      completeChallenge();
    } else {
      playSound('error');
      speak('Time is up! Try again!');
      setGameState('menu');
    }
  };

  const handleReset = () => {
    playSound('click');
    setGameState('menu');
    setCurrentChallenge(0);
    setHarvested(0);
    setScore(0);
    setTimeLeft(0);
    setFallingItems([]);
  };

  // Game Completed Screen
  if (gameState === 'completed') {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md"
        >
          <div className="text-9xl mb-4">🏆</div>
          <h2 className="text-5xl font-bold text-white mb-4">Master Harvester!</h2>
          <p className="text-3xl text-white/90 mb-2">Total Score: {score}</p>
          <p className="text-xl text-white/80 mb-6">
            You completed all {harvestChallenges.length} harvest challenges!
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {plantTypes.map(plant => (
              <div key={plant.id} className="bg-white/20 rounded-xl p-3">
                <div className="text-4xl mb-1">{plant.harvest.emoji}</div>
                <div className="text-xs text-white/80">Mastered!</div>
              </div>
            ))}
          </div>

          <motion.button
            onClick={handleReset}
            className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="inline mr-2" />
            Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Harvest Game 🌾</h2>
            <p className="text-xl text-white/80">Tap falling items to harvest them before time runs out!</p>
            
            {score > 0 && (
              <div className="mt-4 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 inline-block">
                <span className="text-2xl font-bold text-white">
                  <Trophy className="inline mr-2 w-6 h-6" />
                  Total Score: {score}
                </span>
              </div>
            )}
          </motion.div>

          {/* Current Challenge Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${plant?.backgroundColor} rounded-3xl p-8 shadow-2xl mb-6`}
          >
            <div className="text-center mb-6">
              <div className="text-9xl mb-4">{plant?.emoji}</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Challenge {currentChallenge + 1} of {harvestChallenges.length}
              </h3>
              <p className="text-2xl text-gray-700 mb-4">{challenge.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              <div className="bg-white/60 rounded-xl p-4 text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-bold text-gray-700">Target</div>
                <div className="text-3xl font-bold text-gray-800">{challenge.target}</div>
              </div>
              <div className="bg-white/60 rounded-xl p-4 text-center">
                <Timer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-bold text-gray-700">Time</div>
                <div className="text-3xl font-bold text-gray-800">{challenge.timeLimit}s</div>
              </div>
            </div>

            <div className="bg-white/40 rounded-xl p-4 mb-6">
              <h4 className="font-bold text-gray-800 mb-2 text-center">Difficulty</h4>
              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${
                      i < (challenge.difficulty === 'easy' ? 1 : challenge.difficulty === 'medium' ? 2 : 3)
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-700 mt-2 capitalize">
                {challenge.difficulty}
              </p>
            </div>

            <motion.button
              onClick={handleStartGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Harvesting! 🌾
            </motion.button>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center"
          >
            <h4 className="text-xl font-bold text-white mb-3">How to Play 📋</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
              <div>
                <div className="text-4xl mb-2">{plant?.harvest.emoji}</div>
                <p className="text-sm">Tap good items to harvest (+1)</p>
              </div>
              <div>
                <div className="text-4xl mb-2">⏱️</div>
                <p className="text-sm">Beat the time limit!</p>
              </div>
              <div>
                <div className="text-4xl mb-2">⚠️</div>
                <p className="text-sm">Avoid bad items (-1)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Playing Screen
  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-hidden relative" ref={gameRef}>
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
            <Timer className="inline w-5 h-5 mr-2 text-white" />
            <span className="text-white font-bold text-xl">{timeLeft}s</span>
          </div>
          
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-2">
            <span className="text-white font-bold text-2xl">
              {harvested} / {challenge.target}
            </span>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
            <Trophy className="inline w-5 h-5 mr-2 text-white" />
            <span className="text-white font-bold text-xl">{score}</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className={`h-full bg-gradient-to-br ${plant?.backgroundColor} relative`}>
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-900 to-amber-700" />

        {/* Falling Items */}
        <AnimatePresence>
          {fallingItems.map(item => (
            <motion.button
              key={item.id}
              initial={{ y: -100, x: `${item.x}%`, opacity: 1, scale: 1 }}
              animate={{ 
                y: window.innerHeight,
                rotate: [0, 360]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 3,
                ease: "linear",
                rotate: { duration: 3, repeat: 0 }
              }}
              onClick={() => handleItemClick(item)}
              className={`absolute text-6xl ${item.isBad ? 'opacity-70' : ''}`}
              style={{ left: 0 }}
              whileTap={{ scale: 0.5 }}
            >
              {item.isBad ? '🪨' : item.emoji}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-64">
          <div className="bg-white/30 rounded-full h-6">
            <motion.div
              className="bg-green-500 h-6 rounded-full flex items-center justify-center"
              animate={{ width: `${(harvested / challenge.target) * 100}%` }}
              transition={{ duration: 0.3 }}
            >
              {harvested > 0 && (
                <span className="text-white font-bold text-xs">
                  {Math.round((harvested / challenge.target) * 100)}%
                </span>
              )}
            </motion.div>
          </div>
        </div>

        {/* Basket Animation */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="text-8xl"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🧺
          </motion.div>
        </div>
      </div>

      {/* Low Time Warning */}
      {timeLeft <= 5 && timeLeft > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
        </motion.div>
      )}
    </div>
  );
};

export default HarvestGameTab;
