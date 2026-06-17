import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import { scaleIn } from '../../../utils/animationUtils';

import RhymingWordsTab from './tabs/RhymingWordsTab';
import WordFamiliesTab from './tabs/WordFamiliesTab';
import PoemsTab from './tabs/PoemsTab';
import RhymeGameTab from './tabs/RhymeGameTab';

const RhymeTimeModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('rhymingWords');

  const tabs = [
    { id: 'rhymingWords', name: 'Rhyming Words', emoji: '🎵', component: RhymingWordsTab },
    { id: 'wordFamilies', name: 'Word Families', emoji: '📖', component: WordFamiliesTab },
    { id: 'poems', name: 'Poems', emoji: '📝', component: PoemsTab },
    { id: 'rhymeGame', name: 'Rhyme Game', emoji: '🎮', component: RhymeGameTab }
  ];

  const handleTabChange = (tabId) => {
    if (tabId !== activeTab) {
      cancelSpeech();
      playSound('click');
      setActiveTab(tabId);
    }
  };

  const handleBack = () => {
    cancelSpeech();
    playSound('click');
    onBack();
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100 px-4 pb-6">
      {/* Header */}
      <motion.div 
        className="sticky top-[70px] left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-lg z-40 flex items-center justify-between"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
        >
          <Home size={20} />
          <span className="font-semibold">Home</span>
        </button>
        <h1 className="text-2xl font-bold">🎵 Rhyme Time</h1>
        <div className="hidden sm:block sm:w-24"></div> {/* Spacer for centering */}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="flex justify-center gap-2 mb-6 flex-wrap"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl mr-2">{tab.emoji}</span>
            <span className="text-sm">{tab.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto">
        {ActiveComponent && <ActiveComponent key={activeTab} />}
      </div>
    </div>
  );
};

export default RhymeTimeModule;
