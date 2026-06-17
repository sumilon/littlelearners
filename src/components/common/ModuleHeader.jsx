import { memo } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { cancelSpeech } from '../../utils/audioUtils';
import useStore from '../../store/useStore';
import Button from './Button';

/**
 * Reusable module header component with home button and title
 * Used across all 25 learning modules for consistency
 */
const ModuleHeader = memo(({ 
  title, 
  gradientFrom = '#F97316', 
  gradientTo = '#EC4899',
  icon = null 
}) => {
  const setScreen = useStore((state) => state.setScreen);

  const handleHomeClick = () => {
    cancelSpeech();
    setScreen('home');
  };

  return (
    <motion.div
      className="sticky top-[70px] left-0 right-0 text-white p-4 shadow-lg z-40 flex items-center justify-between"
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {/* Home Button */}
      <motion.button
        onClick={handleHomeClick}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-200 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Go back to home screen"
      >
        <Home size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-bold text-sm sm:text-base">Home</span>
      </motion.button>

      {/* Module Title */}
      <motion.h1
        className="text-xl sm:text-2xl md:text-3xl font-black text-center flex items-center gap-2 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        {icon && <span className="text-2xl sm:text-3xl">{icon}</span>}
        {title}
      </motion.h1>

      {/* Spacer for centering (hidden on mobile) */}
      <div className="hidden sm:block sm:w-24" aria-hidden="true"></div>
    </motion.div>
  );
});

ModuleHeader.displayName = 'ModuleHeader';

export default ModuleHeader;
