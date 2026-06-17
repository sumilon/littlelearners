import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

const BADGE_DATA = {
  'first-star': { emoji: '⭐', name: 'First Star' },
  'star-collector': { emoji: '🌟', name: 'Star Collector' },
  'math-whiz': { emoji: '🔢', name: 'Math Whiz' },
  'hindi-hero': { emoji: '🇮🇳', name: 'Hindi Hero' },
  'bookworm': { emoji: '📚', name: 'Bookworm' },
  'story-reader': { emoji: '📖', name: 'Story Reader' },
  'art-star': { emoji: '🎨', name: 'Art Star' },
  'explorer': { emoji: '🌍', name: 'Explorer' },
  'spelling-bee': { emoji: '🐝', name: 'Spelling Bee' },
  'all-rounder': { emoji: '🏆', name: 'All-Rounder' },
};

const BadgeDisplay = () => {
  const unlockedBadges = useStore((state) => state.unlockedBadges);

  if (unlockedBadges.length === 0) {
    return null;
  }

  return (
    <div className="px-5 py-2 bg-purple-light/30 border-t border-purple-light/50">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold text-purple whitespace-nowrap">
          Badges:
        </span>
        <div className="flex gap-2">
          <AnimatePresence>
            {unlockedBadges.map((badgeId) => {
              const badge = BADGE_DATA[badgeId];
              if (!badge) return null;

              return (
                <motion.div
                  key={badgeId}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm border border-purple-light"
                  title={badge.name}
                >
                  <span className="text-lg">{badge.emoji}</span>
                  <span className="text-xs font-bold text-purple hidden sm:inline">
                    {badge.name}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BadgeDisplay;
