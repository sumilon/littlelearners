import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { rainCycleSteps } from '../../../../data/weatherStationData';

const RainCycleTab = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false);

  const step = rainCycleSteps[currentStep];

  const handleNext = () => {
    playSound('click');
    if (currentStep < rainCycleSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      speak(rainCycleSteps[currentStep + 1].description);
    } else {
      setCurrentStep(0);
      speak(rainCycleSteps[0].description);
    }
  };

  const handlePlayPause = () => {
    playSound('click');
    if (!isPlaying) {
      setIsPlaying(true);
      playAnimation();
    } else {
      setIsPlaying(false);
    }
  };

  const playAnimation = () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < rainCycleSteps.length) {
        setCurrentStep(step);
        speak(rainCycleSteps[step].description);
        step++;
      } else {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentStep(0);
      }
    }, 4000);

    // Store interval to clear if paused
    if (!isPlaying) {
      return () => clearInterval(interval);
    }
  };

  const handleReset = () => {
    playSound('click');
    setCurrentStep(0);
    setIsPlaying(false);
    setShowAllSteps(false);
  };

  const handleStepClick = (index) => {
    playSound('click');
    setCurrentStep(index);
    speak(rainCycleSteps[index].description);
  };

  const handleShowAll = () => {
    playSound('click');
    setShowAllSteps(!showAllSteps);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-2">The Water Cycle 💧</h2>
          <p className="text-xl text-white/80">Learn how rain works!</p>
        </div>

        {/* Main Visualization */}
        <motion.div
          className="bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 rounded-3xl p-8 mb-6 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Animated Scene */}
          <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-8 mb-6 min-h-[50vh] md:min-h-[400px] overflow-hidden">
            {/* Sun */}
            <motion.div
              className="absolute top-4 right-4 text-7xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ☀️
            </motion.div>

            {/* Clouds */}
            <motion.div
              className="absolute top-8 left-1/4 text-6xl"
              animate={{
                x: [0, 20, 0],
                opacity: currentStep >= 1 ? 1 : 0.3
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ☁️
            </motion.div>
            <motion.div
              className="absolute top-12 right-1/3 text-5xl"
              animate={{
                x: [0, -15, 0],
                opacity: currentStep >= 1 ? 1 : 0.3
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              ☁️
            </motion.div>

            {/* Evaporation arrows */}
            <AnimatePresence>
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute bottom-24 left-1/3"
                >
                  <motion.div
                    className="text-5xl"
                    animate={{ y: [-10, -60] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⬆️
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rain */}
            <AnimatePresence>
              {currentStep === 2 && (
                <div className="absolute top-32 left-0 right-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-4xl"
                      style={{ left: `${i * 12 + 10}%` }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 1, 0], y: [0, 150] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      💧
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Ocean/Lake */}
            <div className="absolute bottom-0 left-0 right-0 bg-blue-500/50 h-20 rounded-b-2xl flex items-center justify-center">
              <motion.span
                className="text-6xl"
                animate={{
                  scale: currentStep === 3 ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🌊
              </motion.span>
            </div>

            {/* Current Step Indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-3">{step.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.name}</h3>
                <p className="text-lg text-gray-700">{step.description}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-4">
            <motion.button
              onClick={handlePlayPause}
              className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Play Animation
                </>
              )}
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
              Next Step
            </motion.button>

            <motion.button
              onClick={handleReset}
              className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </motion.button>
          </div>

          {/* Step Progress Indicators */}
          <div className="flex justify-center gap-3">
            {rainCycleSteps.map((s, index) => (
              <motion.button
                key={s.id}
                onClick={() => handleStepClick(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  index === currentStep
                    ? 'bg-white text-blue-600 scale-110 shadow-lg'
                    : 'bg-white/30 text-white hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* All Steps Overview */}
        <motion.button
          onClick={handleShowAll}
          className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 py-4 rounded-2xl font-bold text-xl text-white mb-4 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showAllSteps ? 'Hide' : 'Show'} All Steps
        </motion.button>

        <AnimatePresence>
          {showAllSteps && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {rainCycleSteps.map((s, index) => (
                <motion.button
                  key={s.id}
                  onClick={() => handleStepClick(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/10 backdrop-blur-md hover:bg-white/20 p-6 rounded-2xl text-left transition-all ${
                    index === currentStep ? 'ring-4 ring-white' : ''
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl flex-shrink-0">{s.emoji}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {index + 1}. {s.name}
                      </h4>
                      <p className="text-white/90">{s.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RainCycleTab;
