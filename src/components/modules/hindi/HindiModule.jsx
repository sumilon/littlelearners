import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Volume2, BookOpen, PenTool, Gamepad2 } from 'lucide-react';
import { speakHindi, cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import { fadeIn, slideIn } from '../../../utils/animationUtils';
import VarnmalaTab from './tabs/VarnmalaTab';
import ShikshakTab from './tabs/ShikshakTab';
import MatrasTab from './tabs/MatrasTab';
import ShabdKhelTab from './tabs/ShabdKhelTab';

const HindiModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('varnamala');

  const tabs = [
    { id: 'varnamala', label: 'वर्णमाला', icon: BookOpen, component: VarnmalaTab },
    { id: 'shikshak', label: 'शिक्षक', icon: Volume2, component: ShikshakTab },
    { id: 'matras', label: 'मात्राएँ', icon: PenTool, component: MatrasTab },
    { id: 'shabdkhel', label: 'शब्द खेल', icon: Gamepad2, component: ShabdKhelTab }
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

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || VarnmalaTab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100 px-4 pb-6">
      {/* Header */}
      <motion.div 
        className="sticky top-[70px] left-0 right-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 shadow-lg z-40 flex items-center justify-between"
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
        <h1 className="text-2xl font-bold">🇮🇳 हिंदी सीखें</h1>
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
                      ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg scale-105' 
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

export default HindiModule;
