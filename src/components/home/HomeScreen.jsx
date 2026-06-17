import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { screenVariants } from '../../utils/animationUtils';
import ModuleCard from '../common/ModuleCard';
import Footer from '../common/Footer';
import Mascot from './Mascot';
import useStore from '../../store/useStore';

const modules = [
  {
    icon: '🇮🇳',
    label: 'Hindi',
    sublabel: 'हिंदी सीखें',
    color: '#F97316',
    screen: 'hindi',
    gradientFrom: '#FFF7ED',
    gradientTo: '#FFEDD5',
  },
  {
    icon: '📚',
    label: 'English',
    sublabel: 'Learn ABC',
    color: '#2563EB',
    screen: 'english',
    gradientFrom: '#EFF6FF',
    gradientTo: '#DBEAFE',
  },
  {
    icon: '🔢',
    label: 'Maths',
    sublabel: 'Count & Add',
    color: '#16A34A',
    screen: 'maths',
    gradientFrom: '#F0FDF4',
    gradientTo: '#DCFCE7',
  },
  {
    icon: '🌿',
    label: 'EVS',
    sublabel: 'World Around',
    color: '#0D9488',
    screen: 'evs',
    gradientFrom: '#F0FDFA',
    gradientTo: '#CCFBF1',
  },
  {
    icon: '🎨',
    label: 'Art Studio',
    sublabel: 'Draw & Paint',
    color: '#EC4899',
    screen: 'art',
    gradientFrom: '#FDF2F8',
    gradientTo: '#FCE7F3',
  },
  {
    icon: '🧠',
    label: 'Brain Games',
    sublabel: 'Memory & Logic',
    color: '#D97706',
    screen: 'brainGames',
    gradientFrom: '#FFFBEB',
    gradientTo: '#FEF3C7',
  },
  {
    icon: '🎵',
    label: 'Rhyme Time',
    sublabel: 'Find Rhymes',
    color: '#6366F1',
    screen: 'rhymeTime',
    gradientFrom: '#EEF2FF',
    gradientTo: '#E0E7FF',
  },
  {
    icon: '🐝',
    label: 'Spelling Bee',
    sublabel: 'Spell Words',
    color: '#EC4899',
    screen: 'spellingBee',
    gradientFrom: '#FDF2F8',
    gradientTo: '#FCE7F3',
  },
  {
    icon: '🔄',
    label: 'Opposites',
    sublabel: 'Find Pairs',
    color: '#0891B2',
    screen: 'opposites',
    gradientFrom: '#ECFEFF',
    gradientTo: '#CFFAFE',
  },
  {
    icon: '🕐',
    label: 'Clock Time',
    sublabel: 'Tell Time',
    color: '#B45309',
    screen: 'clockTime',
    gradientFrom: '#FEF3C7',
    gradientTo: '#FDE68A',
  },
  {
    icon: '🤔',
    label: 'Odd One Out',
    sublabel: 'Find Different',
    color: '#DC2626',
    screen: 'oddOneOut',
    gradientFrom: '#FEF2F2',
    gradientTo: '#FEE2E2',
  },
  {
    icon: '🎹',
    label: 'Mini Piano',
    sublabel: 'Play Music',
    color: '#0D9488',
    screen: 'miniPiano',
    gradientFrom: '#F0FDFA',
    gradientTo: '#CCFBF1',
  },
  {
    icon: '📝',
    label: 'Story Builder',
    sublabel: 'Create Stories',
    color: '#9333EA',
    screen: 'storyBuilder',
    gradientFrom: '#FAF5FF',
    gradientTo: '#F3E8FF',
  },
  {
    icon: '🫀',
    label: 'Body Explorer',
    sublabel: 'Learn Body',
    color: '#EA580C',
    screen: 'bodyExplorer',
    gradientFrom: '#FFF7ED',
    gradientTo: '#FFEDD5',
  },
  {
    icon: '🌍',
    label: 'World Flags',
    sublabel: 'Know Countries',
    color: '#2563EB',
    screen: 'worldFlags',
    gradientFrom: '#EFF6FF',
    gradientTo: '#DBEAFE',
  },
  {
    icon: '💰',
    label: 'Money Math',
    sublabel: 'Count Rupees',
    color: '#CA8A04',
    screen: 'moneyMath',
    gradientFrom: '#FEFCE8',
    gradientTo: '#FEF9C3',
  },
  {
    icon: '🕶️',
    label: 'Shadow Match',
    sublabel: 'Match Shapes',
    color: '#16A34A',
    screen: 'shadowMatch',
    gradientFrom: '#F0FDF4',
    gradientTo: '#DCFCE7',
  },
  {
    icon: '🌦️',
    label: 'Weather Station',
    sublabel: 'Learn Weather',
    color: '#0EA5E9',
    screen: 'weatherStation',
    gradientFrom: '#F0F9FF',
    gradientTo: '#E0F2FE',
  },
  {
    icon: '🌱',
    label: 'Plant Life Cycle',
    sublabel: 'Grow Plants',
    color: '#16A34A',
    screen: 'plantLifeCycle',
    gradientFrom: '#F0FDF4',
    gradientTo: '#DCFCE7',
  },
  {
    icon: '🌍',
    label: 'Continents Explorer',
    sublabel: 'Discover World',
    color: '#0891B2',
    screen: 'continentsExplorer',
    gradientFrom: '#ECFEFF',
    gradientTo: '#CFFAFE',
  },
  {
    icon: '🕵️',
    label: 'Mystery Letters',
    sublabel: 'Decode Messages',
    color: '#9333EA',
    screen: 'mysteryLetters',
    gradientFrom: '#FAF5FF',
    gradientTo: '#F3E8FF',
  },
  {
    icon: '🎭',
    label: 'Emotion Mirror',
    sublabel: 'Learn Feelings',
    color: '#C084FC',
    screen: 'emotionMirror',
    gradientFrom: '#FDF4FF',
    gradientTo: '#FAE8FF',
  },
  {
    icon: '🍱',
    label: 'Food Groups',
    sublabel: 'Healthy Eating',
    color: '#F59E0B',
    screen: 'foodGroups',
    gradientFrom: '#FEF3C7',
    gradientTo: '#FDE68A',
  },
  {
    icon: '⏳',
    label: 'Then & Now',
    sublabel: 'History Comparison',
    color: '#92400E',
    screen: 'thenAndNow',
    gradientFrom: '#FEF3C7',
    gradientTo: '#DBEAFE',
  },
  {
    icon: '🗓️',
    label: 'Calendar & Seasons',
    sublabel: 'Time & Dates',
    color: '#8B5CF6',
    screen: 'calendarSeasons',
    gradientFrom: '#EDE9FE',
    gradientTo: '#FCE7F3',
  },
];

const HomeScreen = () => {
  const setScreen = useStore((state) => state.setScreen);

  // Organize modules by category (memoized to prevent recalculation on every render)
  const { coreSubjects, creativeLearning, languageSkills, explorationModules } = useMemo(() => ({
    coreSubjects: modules.slice(0, 4), // Hindi, English, Maths, EVS
    creativeLearning: modules.slice(4, 7), // Art, Brain Games, Rhyme Time
    languageSkills: modules.slice(7, 10), // Spelling Bee, Opposites, Clock Time
    explorationModules: modules.slice(10), // Everything else
  }), []);

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Mascot />
          <motion.h1 
            className="text-5xl md:text-6xl font-black mt-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Little Learners
            </span>
          </motion.h1>
          <motion.p 
            className="text-gray-700 mt-4 text-lg md:text-xl font-semibold max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover the joy of learning through play! 🎯
          </motion.p>
          <motion.p 
            className="text-gray-500 mt-2 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {modules.length} exciting activities to explore
          </motion.p>
        </motion.div>

        {/* Core Subjects Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📚</span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Core Subjects
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {coreSubjects.map((module, index) => (
              <motion.div 
                key={module.screen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <ModuleCard {...module} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Creative Learning Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎨</span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Creative Learning
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-5">
            {creativeLearning.map((module, index) => (
              <motion.div 
                key={module.screen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <ModuleCard {...module} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Language Skills Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🗣️</span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Language Skills
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-5">
            {languageSkills.map((module, index) => (
              <motion.div 
                key={module.screen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.05 }}
              >
                <ModuleCard {...module} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Exploration Modules Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🌟</span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Exploration & Discovery
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5 mb-24">
            {explorationModules.map((module, index) => (
              <motion.div 
                key={module.screen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.03 }}
              >
                <ModuleCard {...module} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Floating Parent Dashboard Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 150, damping: 12 }}
          whileHover={{ 
            scale: 1.12, 
            y: -6,
            boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('dashboard')}
          aria-label="Open parent dashboard to track progress"
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white px-6 py-4 md:px-8 md:py-5 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 font-bold z-50 group border-2 border-white/20"
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <BarChart2 className="w-5 h-5 md:w-7 md:h-7 group-hover:rotate-12 transition-transform drop-shadow-lg" />
            <motion.div
              className="absolute inset-0 blur-md opacity-50"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BarChart2 className="w-5 h-5 md:w-7 md:h-7" />
            </motion.div>
          </motion.div>
          <div className="flex flex-col items-start">
            <span className="text-sm md:text-base leading-none font-black">Parent Dashboard</span>
            <span className="text-[10px] md:text-xs leading-none opacity-90 font-medium">Track Progress</span>
          </div>
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-400 opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>

        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  );
};

export default HomeScreen;
