import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak, cancelSpeech } from '../../../../utils/speechUtils';
import { breathingExercises } from '../../../../data/emotionMirrorData';

const CalmDownTab = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [breathPhase, setBreathPhase] = useState('ready'); // ready, inhale, hold, exhale

  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  const handleExerciseSelect = (exercise) => {
    playSound('click');
    setSelectedExercise(exercise);
    setIsPlaying(false);
    setCurrentStep(0);
    setBreathPhase('ready');
    speak(`${exercise.name}. ${exercise.description}. Press start when you're ready.`);
  };

  const handleStart = () => {
    if (isPlaying) {
      // Stop
      setIsPlaying(false);
      setCurrentStep(0);
      setBreathPhase('ready');
      cancelSpeech();
      playSound('click');
    } else {
      // Start
      setIsPlaying(true);
      setCurrentStep(0);
      playSound('success');
      startBreathingCycle();
    }
  };

  const startBreathingCycle = () => {
    setBreathPhase('inhale');
    speak('Breathe in slowly');
  };

  useEffect(() => {
    if (!isPlaying || !selectedExercise) return;

    let timer;
    const steps = selectedExercise.steps;

    if (breathPhase === 'inhale') {
      timer = setTimeout(() => {
        setBreathPhase('hold');
        speak('Hold your breath');
      }, 4000); // 4 seconds inhale
    } else if (breathPhase === 'hold') {
      timer = setTimeout(() => {
        setBreathPhase('exhale');
        speak('Breathe out slowly');
      }, 2000); // 2 seconds hold
    } else if (breathPhase === 'exhale') {
      timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        if (nextStep < steps.length) {
          setCurrentStep(nextStep);
          setBreathPhase('inhale');
          speak('Breathe in slowly');
        } else {
          // Cycle complete
          setIsPlaying(false);
          setBreathPhase('ready');
          playSound('success');
          speak('Great job! You completed the breathing exercise. You should feel calmer now.');
        }
      }, 6000); // 6 seconds exhale
    }

    return () => clearTimeout(timer);
  }, [isPlaying, breathPhase, currentStep, selectedExercise]);

  const handleBack = () => {
    playSound('click');
    setSelectedExercise(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setBreathPhase('ready');
    cancelSpeech();
  };

  const getBreathScale = () => {
    if (breathPhase === 'inhale') return 1.5;
    if (breathPhase === 'hold') return 1.5;
    if (breathPhase === 'exhale') return 0.8;
    return 1;
  };

  const getBreathColor = () => {
    if (!selectedExercise) return 'from-blue-400 to-cyan-400';
    return selectedExercise.color;
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
            🫁 Calm Down Corner
          </h2>
          <p className="text-white/80">
            Deep breathing helps you feel peaceful and calm
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedExercise ? (
            // Exercise Selection View
            <motion.div
              key="exercises"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 grid grid-cols-2 gap-6"
            >
              {breathingExercises.map((exercise, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleExerciseSelect(exercise)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-br ${exercise.color} backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center gap-4`}
                >
                  <div className="text-8xl">{exercise.icon}</div>
                  <div className="text-2xl font-bold text-white">
                    {exercise.name}
                  </div>
                  <div className="text-sm text-white/80 text-center px-4">
                    {exercise.description}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            // Breathing Exercise View
            <motion.div
              key="breathing"
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
                ← Back to Exercises
              </button>

              <div className="flex-1 flex flex-col items-center justify-center gap-8">
                {/* Breathing Animation Circle */}
                <div className="relative w-80 h-80 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: getBreathScale(),
                    }}
                    transition={{
                      duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 0.5 : 6,
                      ease: 'easeInOut'
                    }}
                    className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${getBreathColor()} opacity-60 blur-xl`}
                  />
                  <motion.div
                    animate={{
                      scale: getBreathScale(),
                    }}
                    transition={{
                      duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 0.5 : 6,
                      ease: 'easeInOut'
                    }}
                    className={`relative w-48 h-48 rounded-full bg-gradient-to-br ${getBreathColor()} flex items-center justify-center text-7xl shadow-2xl border-4 border-white/30`}
                  >
                    {selectedExercise.icon}
                  </motion.div>
                </div>

                {/* Instructions */}
                <div className="text-center">
                  <motion.div
                    key={breathPhase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    {breathPhase === 'ready' && 'Ready to begin?'}
                    {breathPhase === 'inhale' && '🌬️ Breathe In...'}
                    {breathPhase === 'hold' && '⏸️ Hold...'}
                    {breathPhase === 'exhale' && '💨 Breathe Out...'}
                  </motion.div>
                  
                  {isPlaying && (
                    <div className="text-xl text-white/80">
                      {selectedExercise.steps[currentStep]}
                    </div>
                  )}

                  {!isPlaying && breathPhase === 'ready' && (
                    <div className="text-lg text-white/70 mt-2">
                      {selectedExercise.description}
                    </div>
                  )}
                </div>

                {/* Progress */}
                {isPlaying && (
                  <div className="flex gap-2">
                    {selectedExercise.steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index <= currentStep ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Start/Stop Button */}
                <motion.button
                  onClick={handleStart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-12 py-5 rounded-full text-white font-bold text-2xl shadow-2xl ${
                    isPlaying
                      ? 'bg-gradient-to-r from-red-500 to-orange-500'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
                >
                  {isPlaying ? '⏹️ Stop' : '▶️ Start'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CalmDownTab;
