import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Sparkles as SparklesIcon } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { storyActions, storyEndings, sentenceStarters } from '../../../../data/storyBuilderData';

const BuildStoryTab = () => {
  const { addStars, logActivity } = useStore();
  const [elements, setElements] = useState(null);
  const [storyParts, setStoryParts] = useState({
    starter: null,
    action: null,
    ending: null
  });
  const [builtStory, setBuiltStory] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('storyElements');
    if (saved) {
      setElements(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (elements && storyParts.starter && storyParts.action && storyParts.ending) {
      buildStoryText();
    }
  }, [storyParts, elements]);

  const buildStoryText = () => {
    const { starter, action, ending } = storyParts;
    const { characters, setting, objects } = elements;

    let story = `${starter}, `;
    
    if (characters.length === 1) {
      story += `a ${characters[0].name} ${characters[0].emoji} `;
    } else {
      story += `a ${characters[0].name} ${characters[0].emoji} and a ${characters[1].name} ${characters[1].emoji} `;
    }

    story += `were at the ${setting.name} ${setting.emoji}. `;
    story += `They ${action.text} ${action.emoji}`;

    if (objects.length > 0) {
      story += ` a ${objects[0].name} ${objects[0].emoji}`;
      if (objects.length > 1) {
        story += ` and a ${objects[1].name} ${objects[1].emoji}`;
      }
    }

    story += `. ${ending.text} ${ending.emoji}`;

    setBuiltStory(story);
  };

  const handleSelectStarter = (starter) => {
    playSound('click');
    setStoryParts({ ...storyParts, starter });
    speakEnglish(starter);
  };

  const handleSelectAction = (action) => {
    playSound('click');
    setStoryParts({ ...storyParts, action });
    speakEnglish(action.text);
  };

  const handleSelectEnding = (ending) => {
    playSound('click');
    setStoryParts({ ...storyParts, ending });
    speakEnglish(ending.text);
  };

  const handleSaveStory = () => {
    if (!builtStory) {
      speakEnglish('Complete your story first!');
      playSound('wrong');
      return;
    }

    playSound('correct');
    playSound('star');
    addStars(5);
    logActivity('Story Builder', 'Build Story', 'Created a story');
    speakEnglish('Story saved! You can read it in the Read Story tab.');

    const savedStories = JSON.parse(localStorage.getItem('savedStories') || '[]');
    savedStories.push({
      id: Date.now(),
      story: builtStory,
      date: new Date().toLocaleString(),
      elements
    });
    localStorage.setItem('savedStories', JSON.stringify(savedStories));
  };

  const handleReset = () => {
    playSound('click');
    setStoryParts({ starter: null, action: null, ending: null });
    setBuiltStory('');
  };

  if (!elements) {
    return (
      <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={scaleIn} className="bg-white rounded-3xl p-12 shadow-2xl text-center">
          <div className="text-9xl mb-6">📝</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">No Elements Selected</h2>
          <p className="text-2xl text-gray-600">
            Go to "Pick Elements" tab first to choose your story characters and setting!
          </p>
        </motion.div>
      </motion.div>
    );
  }

  const isComplete = storyParts.starter && storyParts.action && storyParts.ending;

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
            <p className="text-sm text-gray-600">Beginning</p>
            <p className="text-3xl">{storyParts.starter ? '✅' : '⬜'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Action</p>
            <p className="text-3xl">{storyParts.action ? '✅' : '⬜'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Ending</p>
            <p className="text-3xl">{storyParts.ending ? '✅' : '⬜'}</p>
          </div>
        </div>
      </motion.div>

      {/* Selected Elements Display */}
      <motion.div variants={scaleIn} className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl p-6 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">Your Story Elements:</h3>
        <div className="flex flex-wrap gap-4">
          {elements.characters.map(c => (
            <span key={c.id} className="text-4xl">{c.emoji}</span>
          ))}
          <span className="text-4xl">{elements.setting.emoji}</span>
          {elements.objects.map(o => (
            <span key={o.id} className="text-4xl">{o.emoji}</span>
          ))}
        </div>
      </motion.div>

      {/* Story Starters */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
          1️⃣ Choose How to Start
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sentenceStarters.map((starter, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectStarter(starter)}
              className={`p-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                storyParts.starter === starter
                  ? 'bg-gradient-to-br from-pink-400 to-purple-400 text-white ring-4 ring-pink-300'
                  : 'bg-gradient-to-br from-pink-50 to-purple-50 text-gray-700 hover:shadow-xl'
              }`}
            >
              {starter}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
          2️⃣ What Happened?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {storyActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectAction(action)}
              className={`aspect-square rounded-2xl p-4 shadow-lg transition-all ${
                storyParts.action?.id === action.id
                  ? 'bg-gradient-to-br from-purple-400 to-pink-400 ring-4 ring-purple-300'
                  : 'bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl'
              }`}
            >
              <div className="text-5xl mb-2">{action.emoji}</div>
              <div className={`text-sm font-bold ${storyParts.action?.id === action.id ? 'text-white' : 'text-gray-700'}`}>
                {action.text}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Endings */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
          3️⃣ Choose an Ending
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storyEndings.map((ending) => (
            <motion.button
              key={ending.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectEnding(ending)}
              className={`p-6 rounded-2xl shadow-lg transition-all ${
                storyParts.ending?.id === ending.id
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-400 ring-4 ring-yellow-300'
                  : 'bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl'
              }`}
            >
              <div className="text-4xl mb-2">{ending.emoji}</div>
              <div className={`text-lg font-bold ${storyParts.ending?.id === ending.id ? 'text-white' : 'text-gray-700'}`}>
                {ending.text}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Built Story Preview */}
      {builtStory && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">📖 Your Story</h3>
          <p className="text-2xl text-gray-800 leading-relaxed text-center mb-8">
            {builtStory}
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-6 h-6" />
              Start Over
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveStory}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Save className="w-6 h-6" />
              Save Story
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <SparklesIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Build Your Story:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>1️⃣ Pick a beginning for your story</li>
              <li>2️⃣ Choose what happens (the action)</li>
              <li>3️⃣ Select an ending</li>
              <li>💾 Save your story to read it later!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BuildStoryTab;
