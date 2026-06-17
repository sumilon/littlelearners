import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { foodGroups, getRandomFoods } from '../../../../data/foodGroupsData';

const SortFoodsTab = () => {
  const [currentFoods, setCurrentFoods] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [draggedOver, setDraggedOver] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const foods = getRandomFoods(8);
    setCurrentFoods(foods);
    setCurrentIndex(0);
    setScore(0);
    setGameComplete(false);
    setShowFeedback(false);
    speak('Drag each food to its correct food group on the plate!');
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    playSound('click');
  };

  const handleDragOver = (e, groupId) => {
    e.preventDefault();
    setDraggedOver(groupId);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e, groupId) => {
    e.preventDefault();
    setDraggedOver(null);

    const currentFood = currentFoods[currentIndex];
    const correct = currentFood.group === groupId;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      playSound('success');
      setScore(score + 1);
      speak(`Correct! ${currentFood.name} is a ${foodGroups.find(g => g.id === groupId).name}! ${currentFood.nutritionTip}`);
    } else {
      playSound('error');
      const correctGroup = foodGroups.find(g => g.id === currentFood.group);
      speak(`Oops! ${currentFood.name} goes in the ${correctGroup.name} group.`);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < currentFoods.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setGameComplete(true);
        speak(`Great job! You got ${score + (correct ? 1 : 0)} out of ${currentFoods.length} correct!`);
      }
    }, 3000);
  };

  const currentFood = currentFoods[currentIndex];

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex flex-col p-6 overflow-hidden">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col"
      >
        {/* Header with Score */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white mb-2">
            🍽️ Sort the Foods
          </h2>
          <p className="text-white/80 mb-2">
            Drag each food to the correct group on the plate!
          </p>
          <div className="text-2xl font-bold text-white">
            Score: {score} / {currentFoods.length}
          </div>
        </div>

        {!gameComplete ? (
          <div className="flex-1 flex flex-col gap-6">
            {/* Food Item to Sort */}
            <AnimatePresence mode="wait">
              {currentFood && !showFeedback && (
                <motion.div
                  key={currentFood.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex justify-center"
                >
                  <div
                    draggable
                    onDragStart={handleDragStart}
                    className="bg-white/20 backdrop-blur-xl border-4 border-white/40 rounded-3xl p-8 shadow-2xl cursor-move hover:scale-105 transition-transform"
                  >
                    <div className="text-9xl text-center mb-4">{currentFood.emoji}</div>
                    <div className="text-3xl font-bold text-white text-center">{currentFood.name}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-6 rounded-3xl text-center ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  } text-white shadow-2xl`}
                >
                  <div className="text-6xl mb-3">{isCorrect ? '✅' : '❌'}</div>
                  <div className="text-2xl font-bold mb-2">
                    {isCorrect ? 'Correct!' : 'Not quite!'}
                  </div>
                  <div className="text-lg opacity-90">
                    {currentFood.nutritionTip}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MyPlate - Food Group Sections */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3">
              {foodGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  onDragOver={(e) => handleDragOver(e, group.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, group.id)}
                  initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ scale: 1.08, y: -5 }}
                  className={`backdrop-blur-xl border-4 rounded-3xl p-4 shadow-xl transition-all flex flex-col items-center justify-center ${
                    draggedOver === group.id
                      ? 'border-yellow-400 bg-white/40 scale-105'
                      : 'border-white/30 bg-white/10'
                  }`}
                  style={{ backgroundColor: draggedOver === group.id ? group.color + '40' : group.color + '20' }}
                >
                  <motion.div 
                    className="text-6xl mb-3"
                    animate={{
                      scale: draggedOver === group.id ? [1, 1.2, 1] : [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatDelay: 0.5 + index * 0.2
                    }}
                  >
                    {group.emoji}
                  </motion.div>
                  <div className="text-xl font-bold text-white text-center">
                    {group.name}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="flex gap-2 justify-center">
              {currentFoods.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index < currentIndex ? 'bg-green-400' :
                    index === currentIndex ? 'bg-yellow-400' :
                    'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Game Complete Screen
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl text-center max-w-2xl">
              <div className="text-8xl mb-6">
                {score === currentFoods.length ? '🏆' : score >= currentFoods.length * 0.7 ? '⭐' : '👍'}
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">
                {score === currentFoods.length ? 'Perfect Score!' : score >= currentFoods.length * 0.7 ? 'Great Job!' : 'Good Try!'}
              </h3>
              <p className="text-3xl text-white/90 mb-8">
                You got {score} out of {currentFoods.length} correct!
              </p>
              <motion.button
                onClick={startNewGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-bold text-2xl shadow-2xl"
              >
                🔄 Play Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SortFoodsTab;
