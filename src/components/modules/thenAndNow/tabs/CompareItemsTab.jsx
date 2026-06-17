import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { historicalItems, categories } from '../../../../data/thenAndNowData';

const CompareItemsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNow, setShowNow] = useState(false);

  const handleCategoryClick = (category) => {
    playSound('click');
    setSelectedCategory(category);
    setSelectedItem(null);
    setShowNow(false);
    speak(`${category.name}. Let's see how things have changed!`);
  };

  const handleItemClick = (item) => {
    playSound('click');
    setSelectedItem(item);
    setShowNow(false);
    speak(`Then: ${item.then.name}. ${item.then.description}`);
  };

  const handleReveal = () => {
    if (!showNow) {
      playSound('success');
      setShowNow(true);
      speak(`Now: ${selectedItem.now.name}. ${selectedItem.now.description}. ${selectedItem.comparison}`);
    }
  };

  const handleBack = () => {
    playSound('click');
    if (selectedItem) {
      setSelectedItem(null);
      setShowNow(false);
    } else {
      setSelectedCategory(null);
    }
  };

  const categoryItems = selectedCategory 
    ? historicalItems.filter(item => item.category === selectedCategory.id)
    : [];

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
            ⏳ Then & Now Comparison
          </h2>
          <p className="text-white/80">
            See how everyday items have changed over time!
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            // Category Selection
            <motion.div
              key="categories"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
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
                    scale: 1.08,
                    y: -10,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="backdrop-blur-xl border-4 border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center"
                  style={{ backgroundColor: category.color + '40' }}
                >
                  <motion.div 
                    className="text-6xl mb-3"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut'
                    }}
                  >
                    {category.emoji}
                  </motion.div>
                  <div className="text-xl font-bold text-white text-center">
                    {category.name}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : !selectedItem ? (
            // Item Selection
            <motion.div
              key="items"
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                  {categoryItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                          delay: index * 0.08
                        }
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -10,
                        transition: { type: 'spring', stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <motion.div 
                        className="text-6xl mb-3"
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          delay: index * 0.1,
                          ease: 'easeInOut'
                        }}
                      >
                        {item.then.emoji}
                      </motion.div>
                      <div className="text-lg font-bold text-white mb-1">
                        {item.then.name}
                      </div>
                      <div className="text-sm text-white/70">
                        Click to compare!
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            // Comparison View
            <motion.div
              key="comparison"
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
                ← Back to Items
              </button>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-6xl grid grid-cols-2 gap-8">
                  {/* THEN Card */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-gradient-to-br from-amber-600/40 to-yellow-600/40 backdrop-blur-xl border-4 border-amber-500/50 rounded-3xl p-8 shadow-2xl"
                  >
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-200 mb-4">
                        📜 THEN
                      </div>
                      <div className="text-9xl mb-6">{selectedItem.then.emoji}</div>
                      <h3 className="text-4xl font-bold text-white mb-4">
                        {selectedItem.then.name}
                      </h3>
                      <p className="text-xl text-white/90 mb-4">
                        {selectedItem.then.description}
                      </p>
                      <div className="bg-amber-900/30 rounded-2xl p-4 border border-amber-500/30">
                        <div className="text-sm font-semibold text-amber-200 mb-2">
                          ⏰ Time Period:
                        </div>
                        <div className="text-lg text-white">
                          {selectedItem.then.timePeriod === 'ancient' && '🏛️ Ancient Times'}
                          {selectedItem.then.timePeriod === 'old' && '📜 Old Days (1500s-1800s)'}
                          {selectedItem.then.timePeriod === 'vintage' && '📻 Grandparents\' Time (1900s-1950s)'}
                        </div>
                      </div>
                      <div className="mt-4 bg-yellow-500/20 rounded-xl p-3 border border-yellow-400/30">
                        <div className="text-sm text-yellow-200">💡 Fun Fact:</div>
                        <div className="text-white/90 text-sm mt-1">
                          {selectedItem.then.funFact}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* NOW Card */}
                  <AnimatePresence mode="wait">
                    {!showNow ? (
                      <motion.div
                        key="reveal-button"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-gradient-to-br from-gray-600/40 to-gray-700/40 backdrop-blur-xl border-4 border-gray-500/50 rounded-3xl p-8 shadow-2xl flex items-center justify-center"
                      >
                        <motion.button
                          onClick={handleReveal}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center gap-6"
                        >
                          <div className="text-8xl">❓</div>
                          <div className="text-3xl font-bold text-white">
                            Click to Reveal NOW!
                          </div>
                          <div className="text-xl text-white/80">
                            See how it changed! →
                          </div>
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="now-card"
                        initial={{ scale: 0.8, opacity: 0, x: 50 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="bg-gradient-to-br from-blue-600/40 to-cyan-600/40 backdrop-blur-xl border-4 border-blue-500/50 rounded-3xl p-8 shadow-2xl"
                      >
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-200 mb-4">
                            🚀 NOW
                          </div>
                          <div className="text-9xl mb-6">{selectedItem.now.emoji}</div>
                          <h3 className="text-4xl font-bold text-white mb-4">
                            {selectedItem.now.name}
                          </h3>
                          <p className="text-xl text-white/90 mb-4">
                            {selectedItem.now.description}
                          </p>
                          <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-500/30 mb-4">
                            <div className="text-sm font-semibold text-blue-200 mb-2">
                              🔄 The Change:
                            </div>
                            <div className="text-lg text-white font-semibold">
                              {selectedItem.comparison}
                            </div>
                          </div>
                          <div className="bg-cyan-500/20 rounded-xl p-3 border border-cyan-400/30">
                            <div className="text-sm text-cyan-200">💡 Fun Fact:</div>
                            <div className="text-white/90 text-sm mt-1">
                              {selectedItem.now.funFact}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CompareItemsTab;
