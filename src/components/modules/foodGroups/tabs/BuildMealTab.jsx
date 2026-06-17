import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { foodGroups, foodItems, rateMeal, healthyMealExamples } from '../../../../data/foodGroupsData';

const BuildMealTab = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealRating, setMealRating] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleFoodSelect = (food) => {
    if (selectedFoods.length >= 8) {
      playSound('error');
      speak('Your plate is full! Rate your meal or clear it to add more.');
      return;
    }

    if (selectedFoods.find(f => f.id === food.id)) {
      playSound('error');
      speak('You already added this food!');
      return;
    }

    playSound('click');
    setSelectedFoods([...selectedFoods, food]);
    speak(`Added ${food.name}!`);
  };

  const handleRemoveFood = (foodId) => {
    playSound('click');
    setSelectedFoods(selectedFoods.filter(f => f.id !== foodId));
  };

  const handleRateMeal = () => {
    if (selectedFoods.length === 0) {
      playSound('error');
      speak('Add some foods to your plate first!');
      return;
    }

    playSound('success');
    const rating = rateMeal(selectedFoods);
    setMealRating(rating);
    speak(`${rating.rating}. ${rating.feedback}`);
  };

  const handleClearPlate = () => {
    playSound('click');
    setSelectedFoods([]);
    setMealRating(null);
    speak('Plate cleared! Build a new meal!');
  };

  const handleLoadExample = (example) => {
    playSound('success');
    const exampleFoods = example.foods.map(exFood => {
      return foodItems.find(item => 
        item.emoji === exFood.emoji && item.group === exFood.group
      );
    }).filter(Boolean);
    
    setSelectedFoods(exampleFoods);
    setMealRating(null);
    setShowExamples(false);
    speak(`Loaded ${example.name}!`);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex flex-col p-6 overflow-hidden">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white mb-2">
            🍽️ Build a Healthy Meal
          </h2>
          <p className="text-white/80">
            Choose foods from each group to create a balanced meal!
          </p>
        </div>

        {!showExamples ? (
          <div className="flex-1 grid grid-cols-3 gap-6">
            {/* Left: Food Selection by Group */}
            <div className="col-span-2 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Choose Your Foods:</h3>
                <button
                  onClick={() => setShowExamples(true)}
                  className="px-4 py-2 bg-purple-500/80 hover:bg-purple-500 rounded-xl text-white font-semibold transition-all"
                >
                  💡 See Examples
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 pb-4">
                  {foodGroups.map((group) => (
                    <div key={group.id}>
                      <div className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <span>{group.emoji}</span>
                        <span>{group.name}</span>
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {foodItems
                          .filter(food => food.group === group.id)
                          .slice(0, 6)
                          .map((food, idx) => (
                            <motion.button
                              key={food.id}
                              onClick={() => handleFoodSelect(food)}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1,
                                transition: {
                                  type: 'spring',
                                  stiffness: 300,
                                  damping: 12,
                                  delay: idx * 0.05
                                }
                              }}
                              whileHover={{ 
                                scale: 1.1, 
                                y: -8,
                                transition: { type: 'spring', stiffness: 400, damping: 10 }
                              }}
                              whileTap={{ scale: 0.95 }}
                              className={`bg-white/20 backdrop-blur-xl border-2 rounded-xl p-3 shadow-lg transition-all ${
                                selectedFoods.find(f => f.id === food.id)
                                  ? 'border-green-400 opacity-50'
                                  : 'border-white/30 hover:border-white/60'
                              }`}
                              disabled={selectedFoods.find(f => f.id === food.id)}
                            >
                              <motion.div 
                                className="text-4xl"
                                animate={{
                                  scale: [1, 1.1, 1],
                                  rotate: [0, -5, 5, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                  ease: 'easeInOut'
                                }}
                              >
                                {food.emoji}
                              </motion.div>
                              <div className="text-xs text-white font-semibold mt-1 truncate">
                                {food.name}
                              </div>
                            </motion.button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Your Plate & Rating */}
            <div className="col-span-1 flex flex-col gap-4">
              {/* Your Plate */}
              <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Your Plate</h3>
                
                <div className="flex-1 bg-white rounded-full relative flex items-center justify-center p-4 mb-4 min-h-[300px]">
                  {selectedFoods.length === 0 ? (
                    <div className="text-gray-400 text-center">
                      <div className="text-6xl mb-2">🍽️</div>
                      <div className="text-lg">Empty plate</div>
                      <div className="text-sm">Add foods!</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {selectedFoods.map((food, index) => (
                        <motion.button
                          key={food.id}
                          onClick={() => handleRemoveFood(food.id)}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ 
                            scale: 1, 
                            rotate: 0,
                            transition: {
                              type: 'spring',
                              stiffness: 300,
                              damping: 15,
                              delay: index * 0.05
                            }
                          }}
                          exit={{ 
                            scale: 0, 
                            rotate: 180,
                            transition: { duration: 0.2 }
                          }}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 10,
                            transition: { type: 'spring', stiffness: 400, damping: 10 }
                          }}
                          whileTap={{ scale: 0.9 }}
                          className="text-5xl hover:opacity-70 transition-opacity"
                          title={`Remove ${food.name}`}
                        >
                          <motion.span
                            animate={{
                              y: [0, -4, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 0.5,
                              delay: index * 0.2,
                              ease: 'easeInOut'
                            }}
                          >
                            {food.emoji}
                          </motion.span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-center text-white/80 text-sm mb-4">
                  {selectedFoods.length} / 8 foods
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={handleRateMeal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={selectedFoods.length === 0}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 disabled:from-gray-400 disabled:to-gray-500 rounded-xl text-white font-bold shadow-lg disabled:cursor-not-allowed"
                  >
                    ⭐ Rate Meal
                  </motion.button>
                  <motion.button
                    onClick={handleClearPlate}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-red-500/80 hover:bg-red-500 rounded-xl text-white font-bold shadow-lg"
                  >
                    🗑️
                  </motion.button>
                </div>
              </div>

              {/* Meal Rating */}
              <AnimatePresence>
                {mealRating && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-gradient-to-br from-yellow-400/30 to-orange-400/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{mealRating.emoji}</div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {mealRating.rating}
                      </div>
                      <div className="text-white/90 mb-4">{mealRating.feedback}</div>
                      
                      <div className="bg-white/20 rounded-xl p-3 mb-3">
                        <div className="text-sm font-semibold text-white mb-2">Food Groups:</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {Object.entries(mealRating.groupCounts).map(([group, count]) => (
                            count > 0 && (
                              <div key={group} className="bg-white/30 rounded-lg px-3 py-1 text-sm text-white">
                                {foodGroups.find(g => g.id === group)?.emoji} {count}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          // Example Meals View
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            <button
              onClick={() => setShowExamples(false)}
              className="mb-4 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold transition-all self-start"
            >
              ← Back to Build Meal
            </button>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto pb-4">
              {healthyMealExamples.map((example, index) => (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.1
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  }}
                  className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col"
                >
                  <div className="text-center mb-4">
                    <motion.div 
                      className="text-6xl mb-3"
                      animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, -8, 8, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'easeInOut'
                      }}
                    >
                      {example.emoji}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">{example.name}</h3>
                  </div>

                  <div className="flex-1 bg-white/10 rounded-2xl p-4 mb-4">
                    <div className="grid grid-cols-3 gap-2">
                      {example.foods.map((food, idx) => (
                        <motion.div 
                          key={idx} 
                          className="text-center"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: {
                              type: 'spring',
                              stiffness: 300,
                              damping: 15,
                              delay: index * 0.1 + idx * 0.05
                            }
                          }}
                        >
                          <motion.div 
                            className="text-4xl mb-1"
                            animate={{
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 0.5,
                              delay: idx * 0.2,
                              ease: 'easeInOut'
                            }}
                          >
                            {food.emoji}
                          </motion.div>
                          <div className="text-xs text-white/80">{food.name}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-500/30 rounded-xl p-3 mb-4 text-center">
                    <div className="text-yellow-300 text-2xl mb-1">⭐⭐⭐⭐⭐</div>
                    <div className="text-white font-bold">{example.rating}</div>
                    <div className="text-white/80 text-sm mt-1">{example.feedback}</div>
                  </div>

                  <motion.button
                    onClick={() => handleLoadExample(example)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-bold shadow-lg"
                  >
                    Try This Meal
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BuildMealTab;
