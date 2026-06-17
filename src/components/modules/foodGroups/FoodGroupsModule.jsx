import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../utils/animationUtils';
import { playSound } from '../../../utils/audioUtils';
import SortFoodsTab from './tabs/SortFoodsTab';
import LearnGroupsTab from './tabs/LearnGroupsTab';
import BuildMealTab from './tabs/BuildMealTab';
import NutritionQuizTab from './tabs/NutritionQuizTab';

const FoodGroupsModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Sort Foods', icon: '🍽️', component: SortFoodsTab },
    { id: 1, label: 'Learn Groups', icon: '📚', component: LearnGroupsTab },
    { id: 2, label: 'Build Meal', icon: '🍱', component: BuildMealTab },
    { id: 3, label: 'Quiz', icon: '🧠', component: NutritionQuizTab }
  ];

  const handleTabChange = (tabId) => {
    playSound('click');
    setActiveTab(tabId);
  };

  const handleBackClick = () => {
    playSound('click');
    onBack();
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-green-400 flex flex-col">
      {/* Header */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="bg-gradient-to-r from-orange-500/30 to-green-500/30 backdrop-blur-xl border-b border-white/20 p-6 shadow-lg"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold transition-all flex items-center gap-2"
          >
            <span className="text-xl">←</span>
            <span>Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3 justify-center">
              <span>🍱</span>
              <span>Food Groups & Nutrition</span>
              <span>🥗</span>
            </h1>
            <p className="text-white/80 mt-1">Learn about healthy eating and food groups!</p>
          </div>

          <div className="hidden sm:block sm:w-32" /> {/* Spacer for centering */}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-4 rounded-2xl font-bold transition-all shadow-lg ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white scale-105'
                  : 'bg-white/20 text-white/80 hover:bg-white/30 hover:scale-102'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="flex-1">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default FoodGroupsModule;
