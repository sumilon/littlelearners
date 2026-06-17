import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, BookOpen, Sparkles as SparklesIcon } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';

const SaveStoriesTab = () => {
  const { logActivity } = useStore();
  const [savedStories, setSavedStories] = useState([]);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    const stories = JSON.parse(localStorage.getItem('savedStories') || '[]');
    setSavedStories(stories);
  };

  const handleDeleteStory = (id) => {
    playSound('click');
    const updatedStories = savedStories.filter(story => story.id !== id);
    setSavedStories(updatedStories);
    localStorage.setItem('savedStories', JSON.stringify(updatedStories));
    logActivity('Story Builder', 'Saved Stories', 'Deleted a story');
    speakEnglish('Story deleted');
  };

  const handleReadStory = (story) => {
    playSound('click');
    speakEnglish(story.story);
  };

  if (savedStories.length === 0) {
    return (
      <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={scaleIn} className="bg-white rounded-3xl p-12 shadow-2xl text-center">
          <div className="text-9xl mb-6">💾</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">No Saved Stories</h2>
          <p className="text-2xl text-gray-600">
            Create and save stories to see them here!
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
          📚 Your Story Collection
        </h2>
        <p className="text-xl text-gray-600">
          You have {savedStories.length} saved {savedStories.length === 1 ? 'story' : 'stories'}!
        </p>
      </motion.div>

      {/* Stories List */}
      <div className="space-y-4">
        {savedStories.map((story, index) => (
          <motion.div
            key={story.id}
            variants={wiggle}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-5xl">📖</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Story #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-500">{story.date}</p>
                  </div>
                </div>

                {/* Story Elements */}
                <div className="flex gap-3 mb-4">
                  {story.elements.characters.map(c => (
                    <span key={c.id} className="text-4xl">{c.emoji}</span>
                  ))}
                  <span className="text-4xl">{story.elements.setting.emoji}</span>
                  {story.elements.objects.map(o => (
                    <span key={o.id} className="text-4xl">{o.emoji}</span>
                  ))}
                </div>

                {/* Story Preview */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-4">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {story.story}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReadStory(story)}
                  className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  title="Read Aloud"
                >
                  <BookOpen className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteStory(story.id)}
                  className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  title="Delete Story"
                >
                  <Trash2 className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <SparklesIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Your Story Gallery:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>📚 All your stories are saved here</li>
              <li>📖 Click the book icon to read aloud</li>
              <li>🗑️ Click the trash icon to delete</li>
              <li>✨ Create more stories to grow your collection!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SaveStoriesTab;
