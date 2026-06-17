import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { copingCategories } from '../../../../data/emotionMirrorData';

const CopingStrategiesTab = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const categories = [
    { id: 'calm-down', icon: '🧘', color: 'from-blue-400 to-cyan-400' },
    { id: 'express-feelings', icon: '💬', color: 'from-purple-400 to-pink-400' },
    { id: 'feel-better', icon: '💖', color: 'from-pink-400 to-rose-400' },
    { id: 'ask-for-help', icon: '🤝', color: 'from-green-400 to-emerald-400' }
  ];

  const handleCategoryClick = (categoryId) => {
    playSound('click');
    setSelectedCategory(categoryId);
    setSelectedStrategy(null);
    const category = copingCategories.find(c => c.id === categoryId);
    speak(category.name);
  };

  const handleStrategyClick = (strategy) => {
    playSound('click');
    setSelectedStrategy(strategy);
    speak(`${strategy.title}. ${strategy.description}. ${strategy.whenToUse}`);
  };

  const handleBack = () => {
    playSound('click');
    if (selectedStrategy) {
      setSelectedStrategy(null);
    } else {
      setSelectedCategory(null);
    }
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
            🛠️ Coping Strategies
          </h2>
          <p className="text-white/80">
            Learn helpful ways to manage big feelings
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            // Category Selection View
            <motion.div
              key="categories"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 grid grid-cols-2 gap-6"
            >
              {categories.map((category) => {
                const categoryData = copingCategories.find(c => c.id === category.id);
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-br ${category.color} backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center gap-4`}
                  >
                    <div className="text-8xl">{category.icon}</div>
                    <div className="text-2xl font-bold text-white">
                      {categoryData?.name}
                    </div>
                    <div className="text-sm text-white/80 text-center">
                      {categoryData?.strategies.length} strategies
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : !selectedStrategy ? (
            // Strategy List View
            <motion.div
              key="strategies"
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
                ← Back to Categories
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 pb-4">
                  {copingCategories
                    .find(c => c.id === selectedCategory)
                    ?.strategies.map((strategy, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleStrategyClick(strategy)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-3 text-center"
                      >
                        <div className="text-5xl">{strategy.icon}</div>
                        <div className="text-lg font-bold text-white">
                          {strategy.title}
                        </div>
                      </motion.button>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            // Strategy Detail View
            <motion.div
              key="detail"
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
                ← Back to Strategies
              </button>

              <div className="flex-1 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl max-w-3xl"
                >
                  <div className="text-center">
                    <div className="text-9xl mb-6">{selectedStrategy.icon}</div>
                    <h3 className="text-4xl font-bold text-white mb-6">
                      {selectedStrategy.title}
                    </h3>
                    <p className="text-2xl text-white/90 mb-8 leading-relaxed">
                      {selectedStrategy.description}
                    </p>
                    
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <div className="text-sm font-semibold text-white/70 mb-2">
                        💡 When to use:
                      </div>
                      <div className="text-lg text-white/90">
                        {selectedStrategy.whenToUse}
                      </div>
                    </div>

                    <motion.button
                      onClick={() => handleStrategyClick(selectedStrategy)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-xl shadow-lg"
                    >
                      🔊 Read Again
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CopingStrategiesTab;
