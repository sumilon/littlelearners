import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Flag, Trophy, HelpCircle, Globe } from 'lucide-react';
import { cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import { fadeIn } from '../../../utils/animationUtils';
import LearnFlagsTab from './tabs/LearnFlagsTab';
import MatchFlagsTab from './tabs/MatchFlagsTab';
import FlagQuizTab from './tabs/FlagQuizTab';
import ExploreWorldTab from './tabs/ExploreWorldTab';

const WorldFlagsModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('learn');

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const tabs = [
    { id: 'learn', name: 'Learn Flags', emoji: '🌍' },
    { id: 'match', name: 'Match Flags', emoji: '🎯' },
    { id: 'quiz', name: 'Flag Quiz', emoji: '❓' },
    { id: 'explore', name: 'Explore World', emoji: '🗺️' }
  ];

  const handleTabChange = (tabId) => {
    playSound('click');
    cancelSpeech();
    setActiveTab(tabId);
  };

  const handleHomeClick = () => {
    playSound('click');
    cancelSpeech();
    onBack();
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'learn':
        return <LearnFlagsTab />;
      case 'match':
        return <MatchFlagsTab />;
      case 'quiz':
        return <FlagQuizTab />;
      case 'explore':
        return <ExploreWorldTab />;
      default:
        return <LearnFlagsTab />;
    }
  };

  const ActiveComponent = renderActiveTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100">
      {/* Sticky Header */}
      <div className="sticky top-[70px] z-40 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 text-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <motion.button
            onClick={handleHomeClick}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-6 h-6" />
          </motion.button>
          
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>🌍</span>
            <span>World Flags</span>
          </h1>
          
          <div className="w-10" />
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1 px-2 pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl mb-1">{tab.emoji}</div>
              <div className="text-xs leading-tight">{tab.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {ActiveComponent}
      </motion.div>
    </div>
  );
}

export default WorldFlagsModule;
