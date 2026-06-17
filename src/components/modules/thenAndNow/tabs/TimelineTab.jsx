import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { timePeriods, getItemsByTimePeriod } from '../../../../data/thenAndNowData';

const TimelineTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePeriodClick = (period) => {
    playSound('click');
    setSelectedPeriod(period);
    setSelectedItem(null);
    speak(`${period.name}. ${period.yearRange}. Let's explore this time period!`);
  };

  const handleItemClick = (item) => {
    playSound('click');
    setSelectedItem(item);
    speak(`${item.then.name}. ${item.then.description}. ${item.then.funFact}`);
  };

  const handleBack = () => {
    playSound('click');
    if (selectedItem) {
      setSelectedItem(null);
    } else {
      setSelectedPeriod(null);
    }
  };

  const periodItems = selectedPeriod 
    ? getItemsByTimePeriod(selectedPeriod.id)
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
            📅 Timeline Explorer
          </h2>
          <p className="text-white/80">
            Journey through time and discover how things evolved!
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedPeriod ? (
            // Timeline Selection
            <motion.div
              key="timeline"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col"
            >
              {/* Visual Timeline */}
              <div className="flex items-center justify-center mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-blue-500 rounded-full" />
                <div className="relative flex justify-between w-full px-8">
                  {timePeriods.map((period, index) => (
                    <motion.button
                      key={period.id}
                      onClick={() => handlePeriodClick(period)}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10"
                    >
                      <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all">
                        <span className="text-4xl">{period.emoji}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Period Cards */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {timePeriods.map((period, index) => (
                  <motion.button
                    key={period.id}
                    onClick={() => handlePeriodClick(period)}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.1 + 0.5
                      }
                    }}
                    whileHover={{ 
                      scale: 1.08,
                      y: -10,
                      transition: { type: 'spring', stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`backdrop-blur-xl border-4 border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center ${
                      index === 0 ? 'bg-amber-800/40' :
                      index === 1 ? 'bg-amber-700/40' :
                      index === 2 ? 'bg-yellow-600/40' :
                      index === 3 ? 'bg-cyan-600/40' :
                      'bg-blue-600/40'
                    }`}
                  >
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
                      {period.emoji}
                    </motion.div>
                    <div className="text-xl font-bold text-white text-center mb-2">
                      {period.name}
                    </div>
                    <div className="text-sm text-white/80 text-center">
                      {period.yearRange}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : !selectedItem ? (
            // Items in Period
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
                ← Back to Timeline
              </button>

              <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 mb-6 text-center">
                <div className="text-5xl mb-2">{selectedPeriod.emoji}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {selectedPeriod.name}
                </div>
                <div className="text-white/80">
                  {selectedPeriod.yearRange}
                </div>
              </div>

              {periodItems.length > 0 ? (
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                    {periodItems.map((item, index) => (
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
                            delay: index * 0.05
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
                            rotate: [0, -5, 5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                            delay: index * 0.15,
                            ease: 'easeInOut'
                          }}
                        >
                          {item.then.emoji}
                        </motion.div>
                        <div className="text-lg font-bold text-white mb-1">
                          {item.then.name}
                        </div>
                        <div className="text-sm text-white/70">
                          Click for details
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-white/80">
                    <div className="text-6xl mb-4">📭</div>
                    <div className="text-xl">No items from this period in our collection yet!</div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            // Item Details with Evolution
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
                ← Back to Items
              </button>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-5xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl"
                  >
                    {/* Evolution Flow */}
                    <div className="flex items-center justify-center gap-8 mb-8">
                      {/* Then */}
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 bg-amber-600/40 backdrop-blur-xl border-4 border-amber-500/50 rounded-3xl p-8 text-center"
                      >
                        <div className="text-2xl font-bold text-amber-200 mb-4">
                          📜 {selectedPeriod.name}
                        </div>
                        <div className="text-9xl mb-4">{selectedItem.then.emoji}</div>
                        <div className="text-3xl font-bold text-white mb-3">
                          {selectedItem.then.name}
                        </div>
                        <p className="text-lg text-white/90">
                          {selectedItem.then.description}
                        </p>
                      </motion.div>

                      {/* Arrow */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                        className="text-6xl text-white"
                      >
                        →
                      </motion.div>

                      {/* Now */}
                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex-1 bg-blue-600/40 backdrop-blur-xl border-4 border-blue-500/50 rounded-3xl p-8 text-center"
                      >
                        <div className="text-2xl font-bold text-blue-200 mb-4">
                          🚀 Today
                        </div>
                        <div className="text-9xl mb-4">{selectedItem.now.emoji}</div>
                        <div className="text-3xl font-bold text-white mb-3">
                          {selectedItem.now.name}
                        </div>
                        <p className="text-lg text-white/90">
                          {selectedItem.now.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Comparison & Fun Facts */}
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
                        <div className="text-2xl font-bold text-white mb-2">
                          🔄 The Amazing Change:
                        </div>
                        <p className="text-xl text-white/90">
                          {selectedItem.comparison}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-yellow-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-4">
                          <div className="text-lg font-bold text-yellow-200 mb-2">
                            💡 Then:
                          </div>
                          <p className="text-white/90">{selectedItem.then.funFact}</p>
                        </div>
                        <div className="bg-cyan-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-4">
                          <div className="text-lg font-bold text-cyan-200 mb-2">
                            💡 Now:
                          </div>
                          <p className="text-white/90">{selectedItem.now.funFact}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TimelineTab;
