import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../utils/animationUtils';
import { playSound } from '../../../utils/audioUtils';
import CalendarTab from './tabs/CalendarTab';
import MonthOrderTab from './tabs/MonthOrderTab';
import SeasonMatchTab from './tabs/SeasonMatchTab';
import BirthdayTab from './tabs/BirthdayTab';

const CalendarSeasonsModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Calendar', icon: '📅', component: CalendarTab },
    { name: 'Months', icon: '🗓️', component: MonthOrderTab },
    { name: 'Seasons', icon: '🌸', component: SeasonMatchTab },
    { name: 'Birthday', icon: '🎂', component: BirthdayTab }
  ];

  const handleTabChange = (index) => {
    playSound('click');
    setActiveTab(index);
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4 md:p-8">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl text-white font-bold hover:bg-white/30 transition-all shadow-lg border border-white/30"
          >
            ← Back
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white text-center drop-shadow-lg"
          >
            🗓️ Calendar & Seasons
          </motion.h1>

          <div className="hidden sm:block sm:w-24"></div>
        </div>

        {/* Tab Navigation - 4 columns */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange(index)}
              className={`p-4 rounded-2xl backdrop-blur-md transition-all shadow-lg border-2 ${
                activeTab === index
                  ? 'bg-white text-purple-600 border-white shadow-xl'
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
              }`}
            >
              <div className="text-4xl mb-2">{tab.icon}</div>
              <div className="font-bold text-sm">{tab.name}</div>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CalendarSeasonsModule;
