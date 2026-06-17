import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { playSound } from '../../../utils/audioUtils';
import { cancelSpeech } from '../../../utils/speechUtils';
import { fadeIn } from '../../../utils/animationUtils';

// Import tabs
import ColorsTab from './tabs/ColorsTab';
import ShapesTab from './tabs/ShapesTab';
import PatternsTab from './tabs/PatternsTab';
import DrawingTab from './tabs/DrawingTab';

const tabs = [
  { id: 'colors', label: '🎨', component: ColorsTab, title: 'Colors' },
  { id: 'shapes', label: '⭕', component: ShapesTab, title: 'Shapes' },
  { id: 'patterns', label: '🔷', component: PatternsTab, title: 'Patterns' },
  { id: 'drawing', label: '✏️', component: DrawingTab, title: 'Drawing' }
];

export default function ArtModule({ onBack }) {
  const [activeTab, setActiveTab] = useState('colors');

  // Cancel speech when component unmounts
  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  // Cancel speech when changing tabs
  const handleTabChange = (tabId) => {
    playSound('click');
    cancelSpeech();
    setActiveTab(tabId);
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const activeTitle = tabs.find(tab => tab.id === activeTab)?.title;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 px-4 pb-6">
      {/* Header */}
      <motion.div 
        className="sticky top-[70px] left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-lg z-40 flex items-center justify-between"
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
        <h1 className="text-2xl font-bold">🎨 Art Studio</h1>
        <div className="hidden sm:block sm:w-24"></div> {/* Spacer for centering */}
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`text-4xl p-4 rounded-2xl transition-all transform ${
              activeTab === tab.id
                ? 'bg-white scale-110 shadow-xl'
                : 'bg-white/50 hover:scale-105 shadow-lg'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <motion.div
        key={activeTab}
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="bg-white rounded-3xl shadow-2xl p-6 min-h-[60vh]"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          {activeTitle}
        </h2>
        {ActiveComponent && <ActiveComponent key={activeTab} />}
      </motion.div>
    </div>
  );
}
