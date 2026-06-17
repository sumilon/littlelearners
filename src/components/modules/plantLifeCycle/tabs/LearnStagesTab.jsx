import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Volume2 } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { growthStages, lifeCycleSteps } from '../../../../data/plantLifeCycleData';

const LearnStagesTab = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showFacts, setShowFacts] = useState(false);
  const [viewMode, setViewMode] = useState('stages'); // 'stages' or 'cycle'

  const stage = growthStages[currentStage];

  const handleNext = () => {
    playSound('click');
    if (currentStage < growthStages.length - 1) {
      setCurrentStage(currentStage + 1);
      setShowFacts(false);
      speak(growthStages[currentStage + 1].description);
    }
  };

  const handlePrevious = () => {
    playSound('click');
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
      setShowFacts(false);
      speak(growthStages[currentStage - 1].description);
    }
  };

  const handleLearnMore = () => {
    playSound('click');
    setShowFacts(true);
    speak(`Here are some fun facts about the ${stage.name} stage.`);
  };

  const handleFactClick = (fact) => {
    playSound('click');
    speak(fact);
  };

  const toggleViewMode = () => {
    playSound('click');
    setViewMode(viewMode === 'stages' ? 'cycle' : 'stages');
    setShowFacts(false);
  };

  if (viewMode === 'cycle') {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Complete Plant Life Cycle 🔄</h2>
            <motion.button
              onClick={toggleViewMode}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-4 py-2 rounded-xl text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Growth Stages
            </motion.button>
          </div>

          {/* Circular Life Cycle Diagram */}
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <motion.div
              className="relative w-full aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md rounded-full w-40 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🌱</div>
                    <p className="text-white font-bold">Life Cycle</p>
                  </div>
                </div>
              </div>

              {/* Cycle steps in circle */}
              {lifeCycleSteps.map((step, index) => {
                const angle = (index * 360) / lifeCycleSteps.length - 90;
                const radius = 200;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.button
                    key={step.step}
                    onClick={() => {
                      playSound('click');
                      speak(step.description);
                    }}
                    className="absolute bg-white/90 backdrop-blur-md rounded-2xl p-4 w-32 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform shadow-lg"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-4xl mb-2">{step.emoji}</div>
                    <div className="text-xs font-bold text-gray-800">{step.name}</div>
                  </motion.button>
                );
              })}

              {/* Connecting arrows */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="rgba(255,255,255,0.5)" />
                  </marker>
                </defs>
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="200"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, rotate: 360 }}
                  transition={{ duration: 2, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
                  style={{ transformOrigin: 'center' }}
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            </motion.div>
          </div>

          {/* Detailed Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifeCycleSteps.map((step, index) => (
              <motion.button
                key={step.step}
                onClick={() => {
                  playSound('click');
                  speak(step.description);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-6 rounded-2xl text-left transition-all"
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl flex-shrink-0">{step.emoji}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-white/30 rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-800">
                        {step.step}
                      </span>
                      <h4 className="text-xl font-bold text-white">{step.name}</h4>
                    </div>
                    <p className="text-white/90">{step.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Growth Stages 📚</h2>
          <motion.button
            onClick={toggleViewMode}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-4 py-2 rounded-xl text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Life Cycle
          </motion.button>
        </div>

        {/* Main Stage Display */}
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-400 via-emerald-300 to-green-500 rounded-3xl p-8 mb-6 shadow-2xl"
        >
          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <motion.button
              onClick={handlePrevious}
              disabled={currentStage === 0}
              className={`p-3 rounded-full backdrop-blur-sm ${
                currentStage === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={currentStage > 0 ? { scale: 1.1 } : {}}
              whileTap={currentStage > 0 ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className="w-8 h-8 text-gray-800" />
            </motion.button>

            <div className="text-center flex-1">
              <motion.div
                className="text-9xl mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stage.emoji}
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Stage {currentStage + 1}: {stage.name}</h2>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block">
                <span className="text-sm font-semibold text-gray-700">
                  {currentStage + 1} of {growthStages.length}
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleNext}
              disabled={currentStage === growthStages.length - 1}
              className={`p-3 rounded-full backdrop-blur-sm ${
                currentStage === growthStages.length - 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={currentStage < growthStages.length - 1 ? { scale: 1.1 } : {}}
              whileTap={currentStage < growthStages.length - 1 ? { scale: 0.9 } : {}}
            >
              <ChevronRight className="w-8 h-8 text-gray-800" />
            </motion.button>
          </div>

          {/* Description */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-4">
            <p className="text-xl text-gray-800 text-center leading-relaxed">
              {stage.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">💧</div>
              <div className="font-bold text-gray-800">Water</div>
              <div className="text-2xl font-bold text-blue-700">{stage.requirements.water}%</div>
            </div>
            <div className="bg-yellow-500/30 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">☀️</div>
              <div className="font-bold text-gray-800">Sunlight</div>
              <div className="text-2xl font-bold text-yellow-700">{stage.requirements.sun}%</div>
            </div>
            <div className="bg-amber-700/30 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🪨</div>
              <div className="font-bold text-gray-800">Soil</div>
              <div className="text-2xl font-bold text-amber-900">{stage.requirements.soil}%</div>
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
              <BookOpen className="w-6 h-6" />
              Learn More About This Stage
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
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                <span className="text-3xl">💡</span>
                Fun Facts About {stage.name}!
              </h3>
              <div className="grid gap-4">
                {stage.facts.map((fact, index) => (
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
                      <span className="text-4xl flex-shrink-0">🌟</span>
                      <div className="flex-1">
                        <p className="text-lg text-white leading-relaxed">{fact}</p>
                      </div>
                      <Volume2 className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {growthStages.map((s, index) => (
            <motion.button
              key={s.id}
              onClick={() => {
                playSound('click');
                setCurrentStage(index);
                setShowFacts(false);
              }}
              className={`transition-all ${
                index === currentStage
                  ? 'bg-white/40 scale-110'
                  : 'bg-white/10 hover:bg-white/20'
              } p-3 rounded-full`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-2xl">{s.emoji}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnStagesTab;
