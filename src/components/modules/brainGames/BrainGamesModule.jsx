import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { cancelSpeech } from '../../../utils/speechUtils';
import { playSound } from '../../../utils/audioUtils';
import { scaleIn } from '../../../utils/animationUtils';

// Tab components
import MemoryTab from './tabs/MemoryTab';
import LogicTab from './tabs/LogicTab';
import SequenceTab from './tabs/SequenceTab';
import PuzzleTab from './tabs/PuzzleTab';

const BrainGamesModule = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('memory');

  const tabs = [
    { id: 'memory', name: 'Memory', emoji: '🧠', component: MemoryTab },
    { id: 'logic', name: 'Logic', emoji: '🤔', component: LogicTab },
    { id: 'sequence', name: 'Sequence', emoji: '🔢', component: SequenceTab },
    { id: 'puzzle', name: 'Puzzle', emoji: '🧩', component: PuzzleTab }
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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-blue-100 px-4 pb-6">
      {/* Header */}
      <motion.div 
        className="sticky top-[70px] left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg z-40 flex items-center justify-between"
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
        <h1 className="text-2xl font-bold">🧠 Brain Games</h1>
        <div className="hidden sm:block sm:w-24"></div> {/* Spacer for centering */}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="flex gap-2 mb-2 overflow-x-auto pb-2"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl mr-2">{tab.emoji}</span>
            {tab.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {ActiveComponent && <ActiveComponent />}
      </motion.div>
    </div>
  );
};

export default BrainGamesModule;
