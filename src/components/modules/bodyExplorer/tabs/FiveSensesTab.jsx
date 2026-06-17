import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Ear, Wind, Droplet, Hand } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { senses } from '../../../../data/bodyExplorerData';

function FiveSensesTab() {
  const { addStars, logActivity } = useStore();
  const [selectedSense, setSelectedSense] = useState(null);
  const [exploredSenses, setExploredSenses] = useState(new Set());
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const handleSenseClick = (sense) => {
    playSound('click');
    setSelectedSense(sense);
    setShowExamples(false);
    speakEnglish(`${sense.name}. ${sense.description}`);

    if (!exploredSenses.has(sense.id)) {
      setExploredSenses(new Set([...exploredSenses, sense.id]));
      addStars(3);
      playSound('star');
      logActivity('Body Explorer', '5 Senses', `Learned about ${sense.name}`);
    }
  };

  const handleExamplesClick = () => {
    playSound('click');
    setShowExamples(!showExamples);
    if (!showExamples && selectedSense) {
      const examplesText = selectedSense.examples.join(', ');
      speakEnglish(`Examples: ${examplesText}`);
    }
  };

  const handleBodyPartClick = () => {
    if (selectedSense) {
      playSound('click');
      speakEnglish(`We use our ${selectedSense.bodyPart} for ${selectedSense.name}`);
    }
  };

  const senseIcons = {
    sight: Eye,
    hearing: Ear,
    smell: Wind,
    taste: Droplet,
    touch: Hand
  };

  const senseColors = {
    sight: 'from-blue-400 to-blue-600',
    hearing: 'from-purple-400 to-purple-600',
    smell: 'from-green-400 to-green-600',
    taste: 'from-pink-400 to-pink-600',
    touch: 'from-orange-400 to-orange-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 pb-20">
      {/* Instructions */}
      <motion.div
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Explore Your 5 Senses!</h3>
            <p className="text-gray-700">
              Tap each sense to learn how we use them every day! 👁️👂👃👅✋
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="bg-white rounded-xl p-4 mb-6 shadow-lg"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Senses Explored</span>
          <span className="text-sm font-bold text-purple-600">{exploredSenses.size}/{senses.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${(exploredSenses.size / senses.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Senses Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {senses.map((sense, index) => {
          const IconComponent = senseIcons[sense.id];
          const isExplored = exploredSenses.has(sense.id);
          const isSelected = selectedSense?.id === sense.id;

          return (
            <motion.button
              key={sense.id}
              onClick={() => handleSenseClick(sense)}
              className={`p-6 rounded-xl shadow-lg transition-all ${
                isSelected
                  ? `bg-gradient-to-br ${senseColors[sense.id]} text-white scale-105`
                  : isExplored
                  ? 'bg-gradient-to-br from-green-100 to-green-200 text-gray-800'
                  : 'bg-white text-gray-800'
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{sense.emoji}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold mb-1">{sense.name}</h3>
                  <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                    Body Part: {sense.bodyPart}
                  </p>
                  {isExplored && !isSelected && (
                    <span className="text-xs text-green-600 font-semibold">✓ Explored</span>
                  )}
                </div>
                {IconComponent && (
                  <IconComponent className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Sense Details */}
      <AnimatePresence mode="wait">
        {selectedSense && (
          <motion.div
            key={selectedSense.id}
            className={`bg-gradient-to-br ${senseColors[selectedSense.id]} text-white rounded-xl p-6 shadow-xl mb-6`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{selectedSense.emoji}</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-2">{selectedSense.name}</h3>
                <button
                  onClick={handleBodyPartClick}
                  className="bg-white/30 hover:bg-white/40 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  We use: {selectedSense.bodyPart} 🔊
                </button>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-lg font-medium leading-relaxed">{selectedSense.description}</p>
            </div>

            <button
              onClick={handleExamplesClick}
              className="w-full bg-white/30 hover:bg-white/40 rounded-lg p-3 font-bold text-lg transition-all"
            >
              {showExamples ? 'Hide Examples' : 'Show Examples'} {showExamples ? '👆' : '👇'}
            </button>

            <AnimatePresence>
              {showExamples && (
                <motion.div
                  className="mt-4 space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {selectedSense.examples.map((example, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/30 rounded-lg p-3 text-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-lg font-semibold">{example}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Message */}
      {exploredSenses.size === senses.length && (
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-6 shadow-xl text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="text-6xl mb-3">🌟</div>
          <h3 className="text-2xl font-bold mb-2">Fantastic!</h3>
          <p className="text-lg">You learned about all 5 senses!</p>
        </motion.div>
      )}
    </div>
  );
}

export default FiveSensesTab;
