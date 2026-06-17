import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import { fadeIn } from '../../../utils/animationUtils';
import DecodeMessageTab from './tabs/DecodeMessageTab';
import LearnCipherTab from './tabs/LearnCipherTab';
import CreateMessageTab from './tabs/CreateMessageTab';
import BadgesTab from './tabs/BadgesTab';

const MysteryLettersModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('decode');
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    // Load earned badges from localStorage
    const saved = localStorage.getItem('mysteryLetters_badges');
    if (saved) {
      setEarnedBadges(JSON.parse(saved));
    }

    return () => cancelSpeech();
  }, []);

  const handleBadgeEarned = (badgeId) => {
    if (!earnedBadges.includes(badgeId)) {
      const newBadges = [...earnedBadges, badgeId];
      setEarnedBadges(newBadges);
      localStorage.setItem('mysteryLetters_badges', JSON.stringify(newBadges));
      playSound('success');
      
      // Show celebration notification
      setTimeout(() => {
        playSound('success');
      }, 300);
    }
  };

  const tabs = [
    { id: 'decode', name: 'Decode', emoji: '🔍' },
    { id: 'learn', name: 'Cipher', emoji: '📖' },
    { id: 'create', name: 'Create', emoji: '✉️' },
    { id: 'badges', name: 'Badges', emoji: '🏆' }
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
      case 'decode':
        return <DecodeMessageTab onBadgeEarned={handleBadgeEarned} />;
      case 'learn':
        return <LearnCipherTab onBadgeEarned={handleBadgeEarned} />;
      case 'create':
        return <CreateMessageTab onBadgeEarned={handleBadgeEarned} />;
      case 'badges':
        return <BadgesTab earnedBadges={earnedBadges} />;
      default:
        return <DecodeMessageTab onBadgeEarned={handleBadgeEarned} />;
    }
  };

  const ActiveComponent = renderActiveTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Sticky Header */}
      <div className="sticky top-[70px] z-40 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white shadow-lg">
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
            <span>🕵️</span>
            <span>Mystery Letters</span>
          </h1>
          
          {/* Badge Counter */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1">
            <span className="text-yellow-400 text-lg font-bold">{earnedBadges.length}</span>
            <span className="text-white/80 text-sm ml-1">badges</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1 px-2 pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-lg'
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

      {/* Floating Badge Notification */}
      {/* This would show when a new badge is earned - could be enhanced with AnimatePresence */}
    </div>
  );
};

export default MysteryLettersModule;
