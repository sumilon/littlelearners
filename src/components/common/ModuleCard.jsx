import { memo } from 'react';
import { motion } from 'framer-motion';
import { playClick } from '../../utils/audioUtils';
import useStore from '../../store/useStore';

const ModuleCard = memo(({ icon, label, sublabel, color, screen, gradientFrom, gradientTo }) => {
  const setScreen = useStore((state) => state.setScreen);

  const handleClick = () => {
    playClick();
    setScreen(screen);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.08,
        y: -12,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      aria-label={`Open ${label} module - ${sublabel}`}
      className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl text-center transition-all duration-300 w-full h-full flex flex-col items-center justify-center group"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        border: `3px solid ${color}15`,
        minHeight: '170px',
      }}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}10, ${color}20)`,
        }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: '-100%', y: '-100%' }}
        whileHover={{ x: '100%', y: '100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating particles effect */}
      <motion.div
        className="absolute top-2 right-2 text-xs opacity-0 group-hover:opacity-60"
        animate={{
          y: [0, -8, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✨
      </motion.div>
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 h-full">
        <motion.div
          className="relative"
          whileHover={{ 
            scale: 1.25,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          <span className="text-5xl md:text-6xl no-select drop-shadow-lg filter">
            {icon}
          </span>
          {/* Glow effect behind icon on hover */}
          <motion.div
            className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-50"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-black text-base md:text-lg text-gray-800 leading-tight tracking-tight">
            {label}
          </p>
          {sublabel && (
            <p className="text-xs text-gray-800 leading-tight font-semibold px-2 py-1 bg-white/80 rounded-full">
              {sublabel}
            </p>
          )}
        </div>
      </div>
      
      {/* Enhanced bottom accent with gradient */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-3"
        style={{ 
          background: `linear-gradient(90deg, ${color}, ${color}90, ${color})`
        }}
        whileHover={{
          boxShadow: `0 0 20px ${color}80`
        }}
      />
      
      {/* Corner decoration */}
      <div 
        className="absolute top-0 right-0 w-12 h-12 opacity-20 group-hover:opacity-30 transition-opacity"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent)`
        }}
      />
    </motion.button>
  );
});

ModuleCard.displayName = 'ModuleCard';

export default ModuleCard;
