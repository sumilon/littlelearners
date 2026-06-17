import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import BadgeDisplay from './BadgeDisplay';

const Header = () => {
  const totalStars  = useStore((state) => state.totalStars);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const toggleSound  = useStore((state) => state.toggleSound);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="text-3xl sm:text-4xl drop-shadow-lg">🌟</span>
            <motion.div
              className="absolute inset-0 blur-xl opacity-50"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-3xl sm:text-4xl">✨</span>
            </motion.div>
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Little</span>{' '}
              <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Learners</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 font-semibold mt-0.5">
              Learn • Play • Grow
            </p>
          </div>
        </motion.div>

        {/* Right-side controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Sound toggle button */}
          <motion.button
            onClick={toggleSound}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            aria-label={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
            title={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
            className={`
              relative flex items-center justify-center
              w-11 h-11 sm:w-12 sm:h-12
              rounded-2xl shadow-md border-2
              transition-colors duration-200
              ${soundEnabled
                ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/60'
                : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300/60'}
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {soundEnabled ? (
                <motion.span
                  key="sound-on"
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl sm:text-2xl select-none"
                >
                  🔊
                </motion.span>
              ) : (
                <motion.span
                  key="sound-off"
                  initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl sm:text-2xl select-none"
                >
                  🔇
                </motion.span>
              )}
            </AnimatePresence>

            {/* Muted indicator dot */}
            <AnimatePresence>
              {!soundEnabled && (
                <motion.span
                  key="muted-dot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* Star counter */}
          <motion.div
            className="flex items-center gap-2 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl px-4 sm:px-5 py-2.5 shadow-md border-2 border-amber-200/60"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            key={totalStars}
            whileHover={{ scale: 1.08, y: -2 }}
            role="status"
            aria-label={`You have earned ${totalStars} stars`}
          >
            <motion.span
              className="text-2xl sm:text-3xl"
              animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              key={`star-${totalStars}`}
            >
              ⭐
            </motion.span>
            <div className="flex flex-col items-start -space-y-0.5">
              <span className="text-amber-700 font-black text-xl sm:text-2xl leading-none">{totalStars}</span>
              <span className="text-[9px] sm:text-[10px] text-amber-600 font-bold uppercase tracking-wider leading-none">
                Stars
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Badge Display */}
      <BadgeDisplay />
    </header>
  );
};

export default Header;
