import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Sun, Clock, BookOpen, Info } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { plantTypes } from '../../../../data/plantLifeCycleData';

const PlantTypesTab = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const handlePlantClick = (plant) => {
    playSound('click');
    setSelectedPlant(plant);
    setShowComparison(false);
    speak(`${plant.name}. ${plant.description}`);
  };

  const handleFactClick = (fact) => {
    playSound('click');
    speak(fact);
  };

  const handleCompareToggle = () => {
    playSound('click');
    setShowComparison(!showComparison);
    setSelectedPlant(null);
  };

  if (showComparison) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Compare All Plants 📊</h2>
            <motion.button
              onClick={handleCompareToggle}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-4 py-2 rounded-xl text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </div>

          {/* Comparison Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plantTypes.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${plant.backgroundColor} rounded-3xl p-6 shadow-2xl`}
              >
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">{plant.emoji}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{plant.name}</h3>
                  <p className="text-gray-700">{plant.description}</p>
                </div>

                {/* Stats */}
                <div className="space-y-4 bg-white/50 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-gray-800">Water Need:</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800 capitalize">{plant.waterNeed}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-yellow-600" />
                      <span className="font-bold text-gray-800">Sun Need:</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800 capitalize">{plant.sunNeed}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="font-bold text-gray-800">Growth Time:</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      {plant.growthTime < 365 ? `${plant.growthTime} days` : `${Math.round(plant.growthTime / 365)} years`}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-300">
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-700 mb-2">Harvest</div>
                      <div className="text-4xl mb-1">{plant.harvest.emoji}</div>
                      <div className="text-sm text-gray-700">{plant.harvest.count} {plant.harvest.name}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Facts Count */}
                <div className="mt-4 bg-white/40 rounded-xl px-4 py-2 text-center">
                  <span className="text-sm font-bold text-gray-800">
                    <Info className="inline w-4 h-4 mr-1" />
                    {plant.facts.length} Fun Facts
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Water Need Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Understanding Plant Needs 💡</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500/20 rounded-xl p-4">
                <Droplet className="w-6 h-6 text-blue-400 mb-2" />
                <h4 className="font-bold text-white mb-2">Water Needs</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• <strong>Low:</strong> Water rarely</li>
                  <li>• <strong>Medium:</strong> Water regularly</li>
                  <li>• <strong>High:</strong> Water often</li>
                </ul>
              </div>
              <div className="bg-yellow-500/20 rounded-xl p-4">
                <Sun className="w-6 h-6 text-yellow-400 mb-2" />
                <h4 className="font-bold text-white mb-2">Sunlight Needs</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• <strong>Medium:</strong> 4-6 hours</li>
                  <li>• <strong>High:</strong> 6-8 hours</li>
                  <li>• <strong>Very High:</strong> 8+ hours</li>
                </ul>
              </div>
              <div className="bg-purple-500/20 rounded-xl p-4">
                <Clock className="w-6 h-6 text-purple-400 mb-2" />
                <h4 className="font-bold text-white mb-2">Growth Time</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Fast growers: 2-3 months</li>
                  <li>• Medium: 1 year</li>
                  <li>• Slow: Multiple years</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Explore Plant Types 🌿</h2>
          <motion.button
            onClick={handleCompareToggle}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-4 py-2 rounded-xl text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Compare All
          </motion.button>
        </div>

        {/* Plant Selection */}
        {!selectedPlant && (
          <div>
            <p className="text-xl text-white/80 text-center mb-8">
              Choose a plant to learn all about it! 🌱
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plantTypes.map((plant, index) => (
                <motion.button
                  key={plant.id}
                  onClick={() => handlePlantClick(plant)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${plant.backgroundColor} rounded-3xl p-8 shadow-2xl hover:scale-105 transition-transform`}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-9xl mb-4">{plant.emoji}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{plant.name}</h3>
                  <p className="text-lg text-gray-700">{plant.description}</p>
                  
                  <motion.div
                    className="mt-6 bg-white/60 rounded-2xl px-4 py-3 font-bold text-gray-800"
                    whileHover={{ scale: 1.05 }}
                  >
                    Learn More
                    <BookOpen className="inline ml-2 w-5 h-5" />
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Plant View */}
        <AnimatePresence>
          {selectedPlant && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {/* Back Button */}
              <motion.button
                onClick={() => {
                  playSound('click');
                  setSelectedPlant(null);
                }}
                className="mb-4 bg-white/20 backdrop-blur-md hover:bg-white/30 px-4 py-2 rounded-xl text-white font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to All Plants
              </motion.button>

              {/* Plant Header */}
              <motion.div
                className={`bg-gradient-to-br ${selectedPlant.backgroundColor} rounded-3xl p-8 mb-6 shadow-2xl`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div
                    className="text-9xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {selectedPlant.emoji}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">{selectedPlant.name}</h2>
                    <p className="text-2xl text-gray-700 mb-6">{selectedPlant.description}</p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/60 rounded-xl p-4 text-center">
                        <Droplet className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-bold text-gray-700">Water</div>
                        <div className="text-lg font-bold text-gray-800 capitalize">{selectedPlant.waterNeed}</div>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4 text-center">
                        <Sun className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                        <div className="text-sm font-bold text-gray-700">Sunlight</div>
                        <div className="text-lg font-bold text-gray-800 capitalize">{selectedPlant.sunNeed}</div>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4 text-center">
                        <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-bold text-gray-700">Growth</div>
                        <div className="text-lg font-bold text-gray-800">
                          {selectedPlant.growthTime < 365 ? `${selectedPlant.growthTime}d` : `${Math.round(selectedPlant.growthTime / 365)}y`}
                        </div>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4 text-center">
                        <div className="text-3xl mb-1">{selectedPlant.harvest.emoji}</div>
                        <div className="text-sm font-bold text-gray-700">Harvest</div>
                        <div className="text-lg font-bold text-gray-800">{selectedPlant.harvest.count}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fun Facts */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white text-center mb-6">
                  Fun Facts About {selectedPlant.name}! 🌟
                </h3>
                <div className="grid gap-4">
                  {selectedPlant.facts.map((fact, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleFactClick(fact)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-5 rounded-2xl text-left transition-all group"
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-4xl flex-shrink-0">{selectedPlant.emoji}</span>
                        <p className="text-lg text-white leading-relaxed flex-1">{fact}</p>
                        <BookOpen className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Growth Stages Preview */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  Growth Stages Timeline 📈
                </h3>
                <div className="flex justify-between items-center overflow-x-auto pb-4">
                  {selectedPlant.stages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[80px]">
                      <motion.div
                        className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-3xl">{stage.emoji}</span>
                      </motion.div>
                      <span className="text-xs text-white/80 text-center capitalize">{stage.stage}</span>
                      {index < selectedPlant.stages.length - 1 && (
                        <div className="absolute left-full w-8 h-0.5 bg-white/30 top-8" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlantTypesTab;
