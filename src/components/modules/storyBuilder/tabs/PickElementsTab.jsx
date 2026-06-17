import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles as SparklesIcon } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { storyCharacters, storySettings, storyObjects } from '../../../../data/storyBuilderData';

const PickElementsTab = () => {
  const { addStars, logActivity } = useStore();
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState([]);

  const handleCharacterSelect = (character) => {
    playSound('click');
    if (selectedCharacters.find(c => c.id === character.id)) {
      setSelectedCharacters(selectedCharacters.filter(c => c.id !== character.id));
    } else if (selectedCharacters.length < 2) {
      setSelectedCharacters([...selectedCharacters, character]);
      speakEnglish(character.name);
    }
  };

  const handleSettingSelect = (setting) => {
    playSound('click');
    setSelectedSetting(setting);
    speakEnglish(setting.name);
  };

  const handleObjectSelect = (object) => {
    playSound('click');
    if (selectedObjects.find(o => o.id === object.id)) {
      setSelectedObjects(selectedObjects.filter(o => o.id !== object.id));
    } else if (selectedObjects.length < 2) {
      setSelectedObjects([...selectedObjects, object]);
      speakEnglish(object.name);
    }
  };

  const handleContinue = () => {
    if (selectedCharacters.length === 0 || !selectedSetting) {
      speakEnglish('Please select at least one character and a setting');
      playSound('wrong');
      return;
    }

    playSound('correct');
    playSound('star');
    addStars(2);
    logActivity('Story Builder', 'Pick Elements', 'Selected story elements');
    speakEnglish('Great choices! Now build your story!');
    
    // Store selections in localStorage for other tabs to access
    localStorage.setItem('storyElements', JSON.stringify({
      characters: selectedCharacters,
      setting: selectedSetting,
      objects: selectedObjects
    }));
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Progress */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Characters</p>
            <p className="text-3xl font-bold text-pink-600">{selectedCharacters.length}/2</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Setting</p>
            <p className="text-3xl font-bold text-purple-600">{selectedSetting ? '1' : '0'}/1</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Objects</p>
            <p className="text-3xl font-bold text-yellow-600">{selectedObjects.length}/2</p>
          </div>
        </div>
      </motion.div>

      {/* Characters Section */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
          👥 Choose Characters (1-2)
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {storyCharacters.map((character, index) => {
            const isSelected = selectedCharacters.find(c => c.id === character.id);
            return (
              <motion.button
                key={character.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCharacterSelect(character)}
                className={`relative aspect-square rounded-2xl p-4 shadow-lg transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-pink-400 to-purple-400 ring-4 ring-pink-300'
                    : 'bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-xl'
                }`}
              >
                <motion.div 
                  className="text-5xl mb-2"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {character.emoji}
                </motion.div>
                <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {character.name}
                </div>
                {isSelected && (
                  <motion.div 
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="w-4 h-4 text-pink-600" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Settings Section */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
          🌍 Choose Setting (1)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {storySettings.map((setting, index) => {
            const isSelected = selectedSetting?.id === setting.id;
            return (
              <motion.button
                key={setting.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSettingSelect(setting)}
                className={`relative aspect-square rounded-2xl p-4 shadow-lg transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-400 to-pink-400 ring-4 ring-purple-300'
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl'
                }`}
              >
                <motion.div 
                  className="text-5xl mb-2"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {setting.emoji}
                </motion.div>
                <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {setting.name}
                </div>
                {isSelected && (
                  <motion.div 
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="w-4 h-4 text-purple-600" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Objects Section */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
          ✨ Choose Objects (0-2)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {storyObjects.map((object, index) => {
            const isSelected = selectedObjects.find(o => o.id === object.id);
            return (
              <motion.button
                key={object.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleObjectSelect(object)}
                className={`relative aspect-square rounded-2xl p-4 shadow-lg transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 ring-4 ring-yellow-300'
                    : 'bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl'
                }`}
              >
                <motion.div 
                  className="text-5xl mb-2"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {object.emoji}
                </motion.div>
                <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {object.name}
                </div>
                {isSelected && (
                  <motion.div 
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="w-4 h-4 text-yellow-600" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
        >
          Continue to Build Story
          <ArrowRight className="w-8 h-8" />
        </motion.button>
      </div>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <SparklesIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Pick Your Story Elements:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>👥 Pick 1-2 characters for your story</li>
              <li>🌍 Choose 1 setting where the story happens</li>
              <li>✨ Add 0-2 special objects (optional)</li>
              <li>➡️ Click continue when ready!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PickElementsTab;
