import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { seasons } from '../../../../data/weatherStationData';

const SeasonExplorerTab = () => {
  const [currentSeason, setCurrentSeason] = useState(0);
  const [showFacts, setShowFacts] = useState(false);

  const season = seasons[currentSeason];

  const handleSeasonChange = (direction) => {
    playSound('click');
    if (direction === 'next') {
      setCurrentSeason((prev) => (prev + 1) % seasons.length);
    } else {
      setCurrentSeason((prev) => (prev - 1 + seasons.length) % seasons.length);
    }
    setShowFacts(false);
  };

  const handleLearnMore = () => {
    playSound('click');
    setShowFacts(true);
    speak(`${season.name}. ${season.description}`);
  };

  const handleFactClick = (fact) => {
    playSound('click');
    speak(fact);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4">
        {/* Season Display */}
        <motion.div
          key={currentSeason}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-br ${season.backgroundColor} rounded-3xl p-8 mb-6 shadow-2xl`}
        >
          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mb-6">
            <motion.button
              onClick={() => handleSeasonChange('prev')}
              className="bg-white/30 hover:bg-white/50 p-3 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8 text-gray-800" />
            </motion.button>

            <div className="text-center">
              <motion.div
                className="text-9xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {season.emoji}
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{season.name}</h2>
              <div className="flex gap-2 justify-center flex-wrap">
                {season.months.map((month) => (
                  <span
                    key={month}
                    className="bg-white/40 px-3 py-1 rounded-full text-sm font-semibold text-gray-800"
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => handleSeasonChange('next')}
              className="bg-white/30 hover:bg-white/50 p-3 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8 text-gray-800" />
            </motion.button>
          </div>

          {/* Description */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-4">
            <p className="text-xl text-gray-800 text-center leading-relaxed">
              {season.description}
            </p>
          </div>

          {/* Temperature Indicator */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-white/40 px-6 py-3 rounded-xl">
              <span className="text-2xl font-bold text-gray-800">
                {season.temperature === 'hot' && '🔥 Hot'}
                {season.temperature === 'warm' && '☀️ Warm'}
                {season.temperature === 'mild' && '😊 Mild'}
                {season.temperature === 'cool' && '🍂 Cool'}
                {season.temperature === 'cold' && '❄️ Cold'}
              </span>
            </div>
          </div>

          {/* Learn More Button */}
          {!showFacts && (
            <motion.button
              onClick={handleLearnMore}
              className="w-full bg-white/40 hover:bg-white/60 py-4 rounded-2xl font-bold text-xl text-gray-800 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-6 h-6" />
              Learn More About {season.name}
            </motion.button>
          )}
        </motion.div>

        {/* Facts Section */}
        <AnimatePresence>
          {showFacts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4 mb-6"
            >
              <h3 className="text-3xl font-bold text-white text-center mb-4">
                Fun Facts About {season.name}! 📚
              </h3>
              <div className="grid gap-4">
                {season.facts.map((fact, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleFactClick(fact)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-4 rounded-2xl text-left transition-all"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl flex-shrink-0">💡</span>
                      <p className="text-lg text-white leading-relaxed">{fact}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Activities Section */}
        {showFacts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
              <span className="text-3xl">🎯</span>
              Fun Activities in {season.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {season.activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="bg-white/20 p-4 rounded-xl text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-xl text-white font-semibold">{activity}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Season Progress Indicator */}
        <div className="flex justify-center gap-3">
          {seasons.map((s, index) => (
            <motion.button
              key={s.id}
              onClick={() => {
                playSound('click');
                setCurrentSeason(index);
                setShowFacts(false);
              }}
              className={`p-3 rounded-full transition-all ${
                index === currentSeason
                  ? 'bg-white/40 scale-110'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-3xl">{s.emoji}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonExplorerTab;
