import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Brain, User } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { bodyParts } from '../../../../data/bodyExplorerData';

function BodyPartsTab() {
  const { addStars, logActivity } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('head');
  const [selectedPart, setSelectedPart] = useState(null);
  const [exploredParts, setExploredParts] = useState(new Set());

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const categories = [
    { id: 'head', name: 'Head', emoji: '🤕', color: 'from-blue-400 to-blue-600' },
    { id: 'body', name: 'Body', emoji: '🫁', color: 'from-red-400 to-red-600' },
    { id: 'limbs', name: 'Limbs', emoji: '💪', color: 'from-green-400 to-green-600' }
  ];

  const handleCategorySelect = (categoryId) => {
    playSound('click');
    setSelectedCategory(categoryId);
    setSelectedPart(null);
    cancelSpeech();
  };

  const handlePartClick = (part) => {
    playSound('click');
    setSelectedPart(part);
    speakEnglish(`${part.name}. ${part.function}`);

    if (!exploredParts.has(part.id)) {
      setExploredParts(new Set([...exploredParts, part.id]));
      addStars(2);
      playSound('star');
      logActivity('Body Explorer', 'Body Parts', `Explored ${part.name}`);
    }
  };

  const currentParts = bodyParts[selectedCategory] || [];
  const progressPercent = (exploredParts.size / Object.values(bodyParts).flat().length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 pb-20">
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
            <h3 className="font-bold text-lg text-gray-800 mb-2">Learn About Your Body!</h3>
            <p className="text-gray-700">
              Select a body category, then tap on body parts to learn what they do! 👆
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="bg-white rounded-xl p-4 mb-6 shadow-lg"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Parts Explored</span>
          <span className="text-sm font-bold text-purple-600">{exploredParts.size}/{Object.values(bodyParts).flat().length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Category Selection */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`p-4 rounded-xl shadow-lg transition-all ${
              selectedCategory === category.id
                ? `bg-gradient-to-br ${category.color} text-white scale-105`
                : 'bg-white text-gray-800 hover:scale-105'
            }`}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2">{category.emoji}</div>
            <div className="font-bold text-sm">{category.name}</div>
          </motion.button>
        ))}
      </div>

      {/* Body Parts Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {currentParts.map((part, index) => (
          <motion.button
            key={part.id}
            onClick={() => handlePartClick(part)}
            className={`p-6 rounded-xl shadow-lg transition-all ${
              selectedPart?.id === part.id
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105'
                : exploredParts.has(part.id)
                ? 'bg-gradient-to-br from-green-100 to-green-200 text-gray-800'
                : 'bg-white text-gray-800'
            } hover:scale-105`}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-5xl mb-2">{part.emoji}</div>
            <div className="font-bold text-lg mb-1">{part.name}</div>
            {exploredParts.has(part.id) && (
              <div className="text-xs opacity-80">✓ Explored</div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected Part Details */}
      {selectedPart && (
        <motion.div
          className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-xl"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{selectedPart.emoji}</div>
            <div>
              <h3 className="text-2xl font-bold mb-1">{selectedPart.name}</h3>
              <p className="text-purple-100">Tap to hear again! 🔊</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-lg font-medium">{selectedPart.function}</p>
          </div>
        </motion.div>
      )}

      {/* Completion Message */}
      {exploredParts.size === Object.values(bodyParts).flat().length && (
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-6 mt-6 shadow-xl text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="text-6xl mb-3">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Amazing Work!</h3>
          <p className="text-lg">You've explored all body parts!</p>
        </motion.div>
      )}
    </div>
  );
}

export default BodyPartsTab;
