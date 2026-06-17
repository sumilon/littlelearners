import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, BookA, Volume2, Gamepad2, Pencil } from 'lucide-react';
import { speakEnglish, cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import { fadeIn, slideIn } from '../../../utils/animationUtils';
import AlphabetTab from './tabs/AlphabetTab';
import PhonicsTab from './tabs/PhonicsTab';
import WordsTab from './tabs/WordsTab';
import SpellingTab from './tabs/SpellingTab';

const EnglishModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('alphabet');

  const tabs = [
    { id: 'alphabet', label: 'Alphabet', icon: BookA, component: AlphabetTab },
    { id: 'phonics', label: 'Phonics', icon: Volume2, component: PhonicsTab },
    { id: 'words', label: 'Words', icon: Pencil, component: WordsTab },
    { id: 'spelling', label: 'Spelling', icon: Gamepad2, component: SpellingTab }
  ];

  // Cancel speech when tab changes or component unmounts
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    playSound('click');
    setActiveTab(tabId);
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AlphabetTab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 pb-6">
      {/* Header */}
      <motion.div 
        className="sticky top-[70px] left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg z-40 flex items-center justify-between"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <button
          onClick={() => {
            playSound('click');
            cancelSpeech();
            onBack();
          }}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
        >
          <Home size={20} />
          <span className="font-semibold">Home</span>
        </button>
        <h1 className="text-2xl font-bold">📚 English ABC</h1>
        <div className="hidden sm:block sm:w-24"></div> {/* Spacer for centering */}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="container mx-auto px-4 mt-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex flex-col items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all
                    ${isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                    }
                  `}
                  whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={24} />
                  <span className="text-sm md:text-base">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div 
        className="container mx-auto px-4 mt-6"
        key={activeTab}
        variants={slideIn}
        initial="hidden"
        animate="visible"
      >
        <ActiveComponent />
      </motion.div>
    </div>
  );
};

export default EnglishModule;
