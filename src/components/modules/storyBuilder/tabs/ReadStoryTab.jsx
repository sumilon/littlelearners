import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Sparkles as SparklesIcon } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';

const ReadStoryTab = () => {
  const [savedStories, setSavedStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    const stories = JSON.parse(localStorage.getItem('savedStories') || '[]');
    setSavedStories(stories);
  };

  const handleReadStory = () => {
    if (savedStories.length === 0) return;
    playSound('click');
    speakEnglish(savedStories[currentIndex].story);
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < savedStories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(savedStories.length - 1);
    }
  };

  if (savedStories.length === 0) {
    return (
      <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={scaleIn} className="bg-white rounded-3xl p-12 shadow-2xl text-center">
          <div className="text-9xl mb-6">📚</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">No Stories Yet</h2>
          <p className="text-2xl text-gray-600">
            Create and save a story first, then come back here to read it!
          </p>
        </motion.div>
      </motion.div>
    );
  }

  const currentStory = savedStories[currentIndex];

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Progress */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Stories</p>
            <p className="text-3xl font-bold text-pink-600">{savedStories.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Story</p>
            <p className="text-3xl font-bold text-purple-600">
              {currentIndex + 1}/{savedStories.length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Story Display */}
      <motion.div
        key={currentIndex}
        variants={scaleIn}
        initial="initial"
        animate="animate"
        className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 border-4 border-yellow-400 rounded-3xl p-12 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">📖</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Story #{currentIndex + 1}</h2>
          <p className="text-lg text-gray-600">{currentStory.date}</p>
        </div>

        {/* Story Elements */}
        <div className="flex justify-center gap-4 mb-8">
          {currentStory.elements.characters.map(c => (
            <span key={c.id} className="text-6xl">{c.emoji}</span>
          ))}
          <span className="text-6xl">{currentStory.elements.setting.emoji}</span>
          {currentStory.elements.objects.map(o => (
            <span key={o.id} className="text-6xl">{o.emoji}</span>
          ))}
        </div>

        {/* Story Text */}
        <div className="bg-white/80 rounded-2xl p-8 shadow-lg mb-8">
          <p className="text-3xl text-gray-800 leading-relaxed text-center">
            {currentStory.story}
          </p>
        </div>

        {/* Read Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReadStory}
            className="px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
          >
            <Volume2 className="w-8 h-8" />
            Read Story Aloud
          </motion.button>
        </div>
      </motion.div>

      {/* Navigation */}
      {savedStories.length > 1 && (
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-6 h-6" />
            Previous Story
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            Next Story
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      )}

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <SparklesIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Read Your Stories:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>📖 Browse through all your saved stories</li>
              <li>🔊 Click "Read Story Aloud" to hear it</li>
              <li>⬅️➡️ Use arrows to see other stories</li>
              <li>✨ Every story you made is special!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReadStoryTab;
