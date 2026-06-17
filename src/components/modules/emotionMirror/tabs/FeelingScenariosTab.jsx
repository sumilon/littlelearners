import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { scenarios, emotions, getRandomEmotions } from '../../../../data/emotionMirrorData';

const FeelingScenariosTab = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledScenarios, setShuffledScenarios] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Shuffle scenarios on mount
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    setShuffledScenarios(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledScenarios.length > 0) {
      const currentScenario = shuffledScenarios[currentScenarioIndex];
      const correctEmotion = emotions.find(e => e.id === currentScenario.emotion);
      const emotionOptions = getRandomEmotions(correctEmotion, 4);
      setOptions(emotionOptions);
      
      setTimeout(() => {
        speak(currentScenario.situation);
      }, 500);
    }
  }, [currentScenarioIndex, shuffledScenarios]);

  const currentScenario = shuffledScenarios[currentScenarioIndex];
  const correctEmotion = currentScenario ? emotions.find(e => e.id === currentScenario.emotion) : null;

  const handleEmotionSelect = (emotion) => {
    if (showResult) return;

    playSound('click');
    setSelectedEmotion(emotion);
    const correct = emotion.id === currentScenario.emotion;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('success');
      speak(`Yes! You would probably feel ${emotion.name}. ${currentScenario.followUp}`);
    } else {
      playSound('error');
      speak(`Hmm, you might feel ${correctEmotion.name} in this situation. ${currentScenario.followUp}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    setShowResult(false);
    setSelectedEmotion(null);

    if (currentScenarioIndex < shuffledScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      speak('You\'ve practiced all scenarios! Great job thinking about feelings!');
    }
  };

  const handleRestart = () => {
    playSound('click');
    setCurrentScenarioIndex(0);
    setSelectedEmotion(null);
    setShowResult(false);
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    setShuffledScenarios(shuffled);
  };

  if (shuffledScenarios.length === 0 || !currentScenario) {
    return <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="text-white text-2xl">Loading scenarios...</div>
    </div>;
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-2">
            📖 Feeling Scenarios
          </h2>
          <p className="text-xl text-white/80">
            Read the situation and choose how you might feel
          </p>
        </div>

        {/* Progress */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3">
            <div className="text-white/80 text-sm text-center">Scenario</div>
            <div className="text-white font-bold text-xl text-center">
              {currentScenarioIndex + 1} / {shuffledScenarios.length}
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenarioIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={`bg-gradient-to-br ${correctEmotion.backgroundColor} rounded-3xl p-8 mb-6 shadow-2xl`}>
              {/* Scenario Icon */}
              <div className="text-center mb-6">
                <motion.div
                  className="text-9xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentScenario.emoji}
                </motion.div>
              </div>

              {/* Situation */}
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-8 h-8 text-gray-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Imagine this happens...
                    </h3>
                    <p className="text-xl text-gray-800 leading-relaxed">
                      {currentScenario.situation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="text-center mb-6">
                <h4 className="text-3xl font-bold text-gray-800">
                  {currentScenario.question}
                </h4>
              </div>

              {/* Emotion Options */}
              {!showResult && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {options.map((emotion, index) => (
                    <motion.button
                      key={emotion.id}
                      onClick={() => handleEmotionSelect(emotion)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-800 font-bold text-xl py-6 px-6 rounded-2xl transition-all shadow-lg"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-6xl mb-3">{emotion.emoji}</div>
                      <div>{emotion.name}</div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Result Feedback */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`p-6 rounded-2xl mb-6 ${
                      isCorrect
                        ? 'bg-green-500/40 border-2 border-green-600'
                        : 'bg-blue-500/40 border-2 border-blue-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-7xl mb-4">
                        {isCorrect ? '🎉' : '💭'}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-4">
                        {isCorrect ? 'That Makes Sense!' : 'Different Feelings'}
                      </div>
                      
                      <div className="bg-white/50 rounded-xl p-5 mb-5">
                        <div className="flex items-center justify-center gap-4 mb-3">
                          <div className="text-6xl">{correctEmotion.emoji}</div>
                          <div className="text-left">
                            <div className="text-2xl font-bold text-gray-800">
                              {correctEmotion.name}
                            </div>
                            <div className="text-gray-700">
                              {correctEmotion.description}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                            <p className="text-lg text-gray-800 leading-relaxed text-left">
                              {currentScenario.followUp}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Coping Strategy Tip */}
                      {correctEmotion.copingStrategies.length > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-purple-500/30 rounded-xl p-5"
                        >
                          <h5 className="font-bold text-gray-800 mb-3 text-lg">
                            💡 When You Feel {correctEmotion.name}:
                          </h5>
                          <div className="text-left">
                            <div className="bg-white/50 rounded-lg p-3 text-gray-800">
                              {correctEmotion.copingStrategies[Math.floor(Math.random() * correctEmotion.copingStrategies.length)]}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  {currentScenarioIndex < shuffledScenarios.length - 1 ? (
                    <motion.button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl py-4 px-12 rounded-2xl shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next Scenario <ArrowRight className="inline w-5 h-5 ml-2" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleRestart}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-xl py-4 px-12 rounded-2xl shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Practice More Scenarios
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Info Box */}
        {!showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white text-center mb-3">
              💭 Understanding Situations
            </h3>
            <p className="text-white/90 text-center leading-relaxed">
              Different situations make us feel different ways. There's no wrong answer! 
              What matters is recognizing and understanding our feelings so we can handle them well.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeelingScenariosTab;
