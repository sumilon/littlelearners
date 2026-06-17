import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { foodGroups, getFoodsByGroup } from '../../../../data/foodGroupsData';

const LearnGroupsTab = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    playSound('click');
    setSelectedGroup(group);
    speak(`${group.name}. ${group.description}`);
  };

  const handleFoodClick = (food) => {
    playSound('click');
    speak(food.nutritionTip);
  };

  const handleBack = () => {
    playSound('click');
    setSelectedGroup(null);
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
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            📚 Learn Food Groups
          </h2>
          <p className="text-white/80">
            Discover the 5 food groups and why they're important!
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedGroup ? (
            // Food Groups Grid
            <motion.div
              key="groups"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {foodGroups.map((group, index) => (
                <motion.button
                  key={group.id}
                  onClick={() => handleGroupClick(group)}
                  initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -10,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="backdrop-blur-xl border-4 border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center"
                  style={{ backgroundColor: group.color + '40' }}
                >
                  <motion.div 
                    className="text-7xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatDelay: 1 + index * 0.3
                    }}
                  >
                    {group.emoji}
                  </motion.div>
                  <div className="text-2xl font-bold text-white text-center mb-2">
                    {group.name}
                  </div>
                  <div className="text-sm text-white/80 text-center">
                    Click to learn more!
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            // Food Group Details
            <motion.div
              key="details"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col"
            >
              <button
                onClick={handleBack}
                className="mb-4 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold transition-all self-start"
              >
                ← Back to Food Groups
              </button>

              <div className="flex-1 grid grid-cols-3 gap-6">
                {/* Left Column - Group Info */}
                <div className="col-span-1 flex flex-col gap-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="backdrop-blur-xl border-4 border-white/30 rounded-3xl p-8 shadow-2xl"
                    style={{ backgroundColor: selectedGroup.color + '40' }}
                  >
                    <div className="text-9xl text-center mb-4">{selectedGroup.emoji}</div>
                    <h3 className="text-4xl font-bold text-white text-center mb-4">
                      {selectedGroup.name}
                    </h3>
                    <p className="text-xl text-white/90 text-center mb-6">
                      {selectedGroup.description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl"
                  >
                    <div className="text-2xl font-bold text-white mb-4">💡 Benefits:</div>
                    <ul className="space-y-3">
                      {selectedGroup.benefits.map((benefit, index) => (
                        <li key={index} className="text-white/90 flex items-start gap-2">
                          <span className="text-green-400 text-xl">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-yellow-400/30 to-orange-400/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl"
                  >
                    <div className="text-xl font-bold text-white mb-2">🎉 Fun Fact:</div>
                    <p className="text-white/90 text-lg">{selectedGroup.funFact}</p>
                  </motion.div>
                </div>

                {/* Right Columns - Food Examples */}
                <div className="col-span-2 overflow-y-auto">
                  <div className="text-2xl font-bold text-white mb-4">
                    Foods in this group:
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                    {getFoodsByGroup(selectedGroup.id).map((food, index) => (
                      <motion.button
                        key={food.id}
                        onClick={() => handleFoodClick(food)}
                        initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 200,
                          damping: 12
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -8,
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
                      >
                        <motion.div 
                          className="text-5xl mb-2"
                          animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, 8, -8, 0]
                          }}
                          transition={{ 
                            duration: 2.5, 
                            repeat: Infinity,
                            repeatDelay: 0.5 + index * 0.2
                          }}
                        >
                          {food.emoji}
                        </motion.div>
                        <div className="text-lg font-bold text-white">{food.name}</div>
                        <div className="text-xs text-white/70 mt-1">{food.servingSize}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LearnGroupsTab;
