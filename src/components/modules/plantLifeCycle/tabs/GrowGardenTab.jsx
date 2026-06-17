import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Sun, Sparkles, RotateCcw, Trophy } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { plantTypes, growthStages } from '../../../../data/plantLifeCycleData';

const GrowGardenTab = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [sunLevel, setSunLevel] = useState(0);
  const [showPlantSelection, setShowPlantSelection] = useState(true);
  const [isGrowing, setIsGrowing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [plantsGrown, setPlantsGrown] = useState(0);

  const currentStage = growthStages[currentStageIndex];
  const plantStageData = selectedPlant?.stages[currentStageIndex];

  useEffect(() => {
    if (currentStage && selectedPlant && !showPlantSelection) {
      speak(currentStage.description);
    }
  }, [currentStageIndex, selectedPlant, showPlantSelection]);

  const handlePlantSelect = (plant) => {
    playSound('click');
    setSelectedPlant(plant);
    setShowPlantSelection(false);
    setCurrentStageIndex(0);
    setWaterLevel(0);
    setSunLevel(0);
    setIsGrowing(false);
    speak(`Let's grow a ${plant.name}! Tap water and sunlight to help it grow.`);
  };

  const handleAddWater = () => {
    if (waterLevel >= 100 || isGrowing) return;
    
    playSound('click');
    const newLevel = Math.min(waterLevel + 20, 100);
    setWaterLevel(newLevel);
    
    if (newLevel >= 100 && sunLevel >= 100) {
      checkGrowth();
    }
  };

  const handleAddSun = () => {
    if (sunLevel >= 100 || isGrowing) return;
    
    playSound('click');
    const newLevel = Math.min(sunLevel + 20, 100);
    setSunLevel(newLevel);
    
    if (waterLevel >= 100 && newLevel >= 100) {
      checkGrowth();
    }
  };

  const checkGrowth = () => {
    if (waterLevel >= 100 && sunLevel >= 100 && !isGrowing) {
      setIsGrowing(true);
      playSound('success');
      
      setTimeout(() => {
        if (currentStageIndex < growthStages.length - 1) {
          setCurrentStageIndex(currentStageIndex + 1);
          setWaterLevel(0);
          setSunLevel(0);
          setIsGrowing(false);
          speak(`Great job! Your ${selectedPlant.name} is growing!`);
        } else {
          // Completed full growth
          setShowCelebration(true);
          setPlantsGrown(plantsGrown + 1);
          speak(`Amazing! You grew a beautiful ${selectedPlant.name}! You can harvest it now!`);
        }
      }, 2000);
    }
  };

  const handleReset = () => {
    playSound('click');
    setShowPlantSelection(true);
    setSelectedPlant(null);
    setCurrentStageIndex(0);
    setWaterLevel(0);
    setSunLevel(0);
    setIsGrowing(false);
    setShowCelebration(false);
  };

  const handleHarvest = () => {
    playSound('success');
    speak(`You harvested ${selectedPlant.harvest.count} ${selectedPlant.harvest.name}!`);
    setTimeout(() => {
      handleReset();
    }, 2000);
  };

  if (showPlantSelection) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Choose a Plant to Grow! 🌱</h2>
            <p className="text-xl text-white/80">Select a plant and help it grow from seed to harvest!</p>
            {plantsGrown > 0 && (
              <div className="mt-4 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 inline-block">
                <span className="text-2xl font-bold text-white">
                  <Trophy className="inline mr-2 w-6 h-6" />
                  Plants Grown: {plantsGrown}
                </span>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plantTypes.map((plant, index) => (
              <motion.button
                key={plant.id}
                onClick={() => handlePlantSelect(plant)}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className={`bg-gradient-to-br ${plant.backgroundColor} rounded-3xl p-6 shadow-2xl`}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="text-8xl mb-4"
                  animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {plant.emoji}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plant.name}</h3>
                <p className="text-gray-700 mb-4">{plant.description}</p>
                
                <div className="space-y-2 text-left">
                  <motion.div 
                    className="flex items-center gap-2 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <Droplet className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-700">Water: {plant.waterNeed}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <Sun className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold text-gray-700">Sun: {plant.sunNeed}</span>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-4 bg-white/50 rounded-xl px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-bold text-gray-800">
                    Harvest: {plant.harvest.count} {plant.harvest.emoji}
                  </span>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header with Reset Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
            <span className="text-white font-bold text-lg">
              Growing: {selectedPlant?.name} {selectedPlant?.emoji}
            </span>
          </div>
          <motion.button
            onClick={handleReset}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-4 py-2 rounded-xl text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="inline w-5 h-5 mr-2" />
            Change Plant
          </motion.button>
        </div>

        {/* Main Garden Area */}
        <motion.div
          className={`bg-gradient-to-br ${selectedPlant?.backgroundColor} rounded-3xl p-8 mb-6 shadow-2xl min-h-[50vh] md:min-h-[500px] relative overflow-hidden`}
        >
          {/* Sky background with sun */}
          <motion.div
            className="absolute top-4 right-4 text-7xl"
            animate={{
              scale: sunLevel >= 100 ? [1, 1.2, 1] : 1,
              rotate: [0, 360]
            }}
            transition={{ 
              scale: { duration: 1, repeat: sunLevel >= 100 ? Infinity : 0 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            ☀️
          </motion.div>

          {/* Soil ground */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900 to-amber-700 rounded-b-3xl" />

          {/* Plant Display */}
          <div className="relative z-10 flex flex-col items-center justify-end h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageIndex}
                initial={{ opacity: 0, y: 50, scale: 0.5, rotateY: -180 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, y: -50, scale: 1.5, rotateY: 180 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="text-center mb-8"
              >
                <motion.div
                  className={`mb-4 ${
                    plantStageData?.size === 'tiny' ? 'text-4xl' :
                    plantStageData?.size === 'small' ? 'text-6xl' :
                    plantStageData?.size === 'medium' ? 'text-8xl' :
                    'text-9xl'
                  }`}
                  animate={{
                    scale: isGrowing ? [1, 1.3, 1.1, 1.3, 1] : [1, 1.05, 1],
                    rotate: isGrowing ? [0, -10, 10, -5, 5, 0] : [0, 2, -2, 0],
                    y: isGrowing ? [0, -20, -10, -20, 0] : [0, -5, 0]
                  }}
                  transition={{ 
                    duration: isGrowing ? 1.5 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {currentStage.emoji}
                </motion.div>
                
                {/* Sparkles around growing plant */}
                {isGrowing && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                          left: `${50 + Math.cos(i * Math.PI / 4) * 100}px`,
                          top: `${50 + Math.sin(i * Math.PI / 4) * 100}px`
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <motion.div 
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-4 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentStage.name}</h3>
                  <p className="text-gray-700">{currentStage.description}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Water droplets animation when watering */}
            {waterLevel > 0 && waterLevel < 100 && (
              <div className="absolute top-20 left-0 right-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={{ left: `${20 + i * 15}%` }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0], 
                      y: [0, 50, 100, 150],
                      scale: [1, 1.2, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeIn"
                    }}
                  >
                    💧
                  </motion.div>
                ))}
              </div>
            )}

            {/* Sunshine rays when adding sun */}
            {sunLevel > 0 && sunLevel < 100 && (
              <div className="absolute top-10 right-10">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 bg-yellow-300 rounded-full origin-top"
                    style={{
                      height: '60px',
                      transform: `rotate(${i * 60}deg)`,
                      left: '50%'
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      scaleY: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Stage Progress */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md rounded-2xl p-4">
            <div className="flex gap-2">
              {growthStages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                    index === currentStageIndex
                      ? 'bg-green-500 scale-110'
                      : index < currentStageIndex
                      ? 'bg-green-300'
                      : 'bg-gray-300'
                  }`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: index === currentStageIndex ? [1.1, 1.3, 1.1] : index <= currentStageIndex ? 1 : 0.9,
                    rotate: index <= currentStageIndex ? 0 : -180
                  }}
                  transition={{ 
                    scale: { duration: 0.8, repeat: index === currentStageIndex ? Infinity : 0 },
                    rotate: { duration: 0.5 }
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  {stage.emoji}
                  {index < currentStageIndex && (
                    <motion.div
                      className="absolute -top-1 -right-1 text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✅
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Water Control */}
          <motion.div
            className="bg-blue-500/20 backdrop-blur-md rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Droplet className="w-6 h-6" />
                Water
              </h3>
              <span className="text-xl font-bold text-white">{waterLevel}%</span>
            </div>
            
            <div className="w-full bg-white/30 rounded-full h-6 mb-4">
              <motion.div
                className="bg-blue-500 h-6 rounded-full"
                animate={{ width: `${waterLevel}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.button
              onClick={handleAddWater}
              disabled={waterLevel >= 100 || isGrowing || showCelebration}
              className={`w-full py-4 rounded-2xl font-bold text-xl ${
                waterLevel >= 100 || isGrowing || showCelebration
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              whileHover={waterLevel < 100 && !isGrowing ? { scale: 1.05 } : {}}
              whileTap={waterLevel < 100 && !isGrowing ? { scale: 0.95 } : {}}
            >
              💧 Add Water (+20%)
            </motion.button>
          </motion.div>

          {/* Sun Control */}
          <motion.div
            className="bg-yellow-500/20 backdrop-blur-md rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sun className="w-6 h-6" />
                Sunlight
              </h3>
              <span className="text-xl font-bold text-white">{sunLevel}%</span>
            </div>
            
            <div className="w-full bg-white/30 rounded-full h-6 mb-4">
              <motion.div
                className="bg-yellow-500 h-6 rounded-full"
                animate={{ width: `${sunLevel}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.button
              onClick={handleAddSun}
              disabled={sunLevel >= 100 || isGrowing || showCelebration}
              className={`w-full py-4 rounded-2xl font-bold text-xl ${
                sunLevel >= 100 || isGrowing || showCelebration
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}
              whileHover={sunLevel < 100 && !isGrowing ? { scale: 1.05 } : {}}
              whileTap={sunLevel < 100 && !isGrowing ? { scale: 0.95 } : {}}
            >
              ☀️ Add Sunlight (+20%)
            </motion.button>
          </motion.div>
        </div>

        {/* Growth Status */}
        {isGrowing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-xl text-center mb-4"
          >
            <Sparkles className="inline mr-2" />
            Your plant is growing! 🌱
          </motion.div>
        )}

        {/* Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center"
            >
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Congratulations!
              </h2>
              <p className="text-2xl text-white/90 mb-6">
                Your {selectedPlant?.name} is fully grown!
              </p>
              <motion.button
                onClick={handleHarvest}
                className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌾 Harvest {selectedPlant?.harvest.count} {selectedPlant?.harvest.emoji}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrowGardenTab;
