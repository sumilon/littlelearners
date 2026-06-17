import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Clock, Timer, Brain, Calendar } from 'lucide-react';
import { cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import LearnTimeTab from './tabs/LearnTimeTab';
import PracticeTimeTab from './tabs/PracticeTimeTab';
import QuizTimeTab from './tabs/QuizTimeTab';
import DailyScheduleTab from './tabs/DailyScheduleTab';

const ClockTimeModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: 'Learn Time', icon: Clock, component: LearnTimeTab },
    { id: 1, name: 'Practice Time', icon: Timer, component: PracticeTimeTab },
    { id: 2, name: 'Quiz Time', icon: Brain, component: QuizTimeTab },
    { id: 3, name: 'Daily Schedule', icon: Calendar, component: DailyScheduleTab }
  ];

  const ActiveComponent = tabs[activeTab].component;

  const handleTabChange = (tabId) => {
    cancelSpeech();
    playSound('click');
    setActiveTab(tabId);
  };

  const handleHome = () => {
    cancelSpeech();
    playSound('click');
    onBack();
  };

  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100">
      {/* Sticky Header */}
      <div className="sticky top-[70px] z-40 bg-white/90 backdrop-blur shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHome}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </motion.button>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              🕐 Clock Time
            </h1>
            <div className="hidden sm:block sm:w-24"></div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTabChange(tab.id)}
                  className={`p-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs block">{tab.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ActiveComponent key={activeTab} />
      </div>
    </div>
  );
};

export default ClockTimeModule;
