import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import { fadeIn } from '../../../utils/animationUtils';
import InteractiveMapTab from './tabs/InteractiveMapTab';
import LearnContinentsTab from './tabs/LearnContinentsTab';
import QuizGameTab from './tabs/QuizGameTab';
import StickerCollectionTab from './tabs/StickerCollectionTab';

const ContinentsExplorerModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('map');
  const [discoveredContinents, setDiscoveredContinents] = useState(new Set());

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const tabs = [
    { id: 'map', name: 'World Map', emoji: '🗺️' },
    { id: 'learn', name: 'Learn', emoji: '📚' },
    { id: 'quiz', name: 'Quiz', emoji: '🧠' },
    { id: 'stickers', name: 'Stickers', emoji: '⭐' }
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
      case 'map':
        return <InteractiveMapTab 
          discoveredContinents={discoveredContinents} 
          setDiscoveredContinents={setDiscoveredContinents} 
        />;
      case 'learn':
        return <LearnContinentsTab />;
      case 'quiz':
        return <QuizGameTab />;
      case 'stickers':
        return <StickerCollectionTab discoveredContinents={discoveredContinents} />;
      default:
        return <InteractiveMapTab 
          discoveredContinents={discoveredContinents} 
          setDiscoveredContinents={setDiscoveredContinents} 
        />;
    }
  };

  const ActiveComponent = renderActiveTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-800 to-teal-900">
      {/* Sticky Header */}
      <div className="sticky top-[70px] z-40 bg-gradient-to-r from-blue-800 via-green-700 to-teal-800 text-white shadow-lg">
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
            <span>Continents Explorer</span>
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
                  ? 'bg-white text-teal-600 shadow-lg'
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
};

export default ContinentsExplorerModule;
