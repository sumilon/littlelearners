import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, TrendingUp, Target } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { badges, wordsByLevel } from '../../../../data/mysteryLettersData';

const BadgesTab = ({ earnedBadges = [] }) => {
  const handleBadgeClick = (badge, isEarned) => {
    playSound('click');
    if (isEarned) {
      speak(`${badge.name}! ${badge.description}`);
    } else {
      speak(`${badge.name} is locked. ${badge.requirement}`);
    }
  };

  const earnedCount = earnedBadges.length;
  const totalBadges = badges.length;
  const percentage = Math.round((earnedCount / totalBadges) * 100);

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-3">
            🏆 Detective Badges
          </h2>
          <p className="text-xl text-white/80 mb-4">
            Complete challenges to earn detective achievements!
          </p>

          {/* Overall Progress */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 max-w-md mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Award className="w-10 h-10 text-yellow-400" />
              <div>
                <div className="text-5xl font-bold text-white">
                  {earnedCount} / {totalBadges}
                </div>
                <div className="text-white/80 text-sm">Badges Earned</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="text-white/80 text-sm mt-2">{percentage}% Complete</div>

            {/* Master Badge Achievement */}
            {percentage === 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 bg-yellow-500/30 border-2 border-yellow-400 rounded-2xl p-4"
              >
                <div className="text-5xl mb-2">👑</div>
                <div className="text-2xl font-bold text-white">Master Detective!</div>
                <div className="text-white/90 text-sm">
                  You've earned all badges!
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Badges Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Your Badge Collection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge, index) => {
              const isEarned = earnedBadges.includes(badge.id);

              return (
                <motion.button
                  key={badge.id}
                  onClick={() => handleBadgeClick(badge, isEarned)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative rounded-2xl p-6 shadow-lg transition-all text-left ${
                    isEarned
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400 hover:scale-105'
                      : 'bg-gray-800/50 backdrop-blur-md'
                  }`}
                  whileHover={{ scale: isEarned ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Badge Emoji */}
                  {isEarned ? (
                    <motion.div
                      className="text-7xl mb-4 text-center"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    >
                      {badge.emoji}
                    </motion.div>
                  ) : (
                    <div className="text-7xl mb-4 filter grayscale opacity-30 text-center">
                      {badge.emoji}
                    </div>
                  )}

                  {/* Badge Info */}
                  <div>
                    <h4
                      className={`text-xl font-bold mb-2 ${
                        isEarned ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {isEarned ? badge.name : '???'}
                    </h4>
                    <p
                      className={`text-sm mb-3 ${
                        isEarned ? 'text-gray-800' : 'text-gray-500'
                      }`}
                    >
                      {isEarned ? badge.description : 'Complete the challenge to unlock!'}
                    </p>

                    {/* Requirement */}
                    <div
                      className={`text-xs font-bold ${
                        isEarned ? 'text-gray-700' : 'text-gray-600'
                      }`}
                    >
                      <Target className="inline w-3 h-3 mr-1" />
                      {badge.requirement}
                    </div>
                  </div>

                  {/* Lock/Unlock Indicator */}
                  {isEarned ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-3 right-3 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white text-xl">✓</span>
                    </motion.div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Level Progress Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Level Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(wordsByLevel).map(([key, level]) => {
              const levelBadgeId = {
                easy: 'junior-detective',
                medium: 'secret-agent',
                hard: 'master-detective',
                expert: 'code-breaker'
              }[key];
              const isCompleted = earnedBadges.includes(levelBadgeId);

              return (
                <div
                  key={key}
                  className={`rounded-xl p-4 ${
                    isCompleted
                      ? 'bg-green-500/30 border-2 border-green-400'
                      : 'bg-white/5'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-3">{level.badgeEmoji}</div>
                    <div className="text-white font-bold mb-1">{level.name}</div>
                    <div className="text-white/70 text-sm mb-2">
                      {level.words.length} words
                    </div>
                    {isCompleted && (
                      <div className="bg-green-500/50 rounded-lg px-3 py-1 text-white text-xs font-bold">
                        ✓ Completed
                      </div>
                    )}
                    {!isCompleted && (
                      <div className="bg-white/10 rounded-lg px-3 py-1 text-white/70 text-xs">
                        In Progress
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Next Badge Hint */}
        {earnedCount < totalBadges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/20 backdrop-blur-md rounded-2xl p-6 text-center"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Keep Exploring!
            </h3>
            <p className="text-white/90 text-lg">
              Complete challenges to unlock more detective badges!
            </p>
            
            {/* Next achievable badge hint */}
            {!earnedBadges.includes('first-decode') && (
              <div className="mt-4 bg-white/10 rounded-xl p-4 max-w-md mx-auto">
                <div className="text-3xl mb-2">🔓</div>
                <div className="text-white font-bold">Next Challenge:</div>
                <div className="text-white/80 text-sm">
                  Decode your first secret message to earn the "First Case Solved" badge!
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-purple-500/20 backdrop-blur-md rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            🕵️ Detective Facts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl mb-2">🔐</div>
              <div className="text-white font-bold mb-1">Real Codes</div>
              <div className="text-white/80 text-sm">
                Detectives and spies use secret codes to send important messages!
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-white font-bold mb-1">Learn & Play</div>
              <div className="text-white/80 text-sm">
                Decoding messages helps you practice reading and spelling!
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl mb-2">🎓</div>
              <div className="text-white font-bold mb-1">Phonics Practice</div>
              <div className="text-white/80 text-sm">
                Learning the first letter of words improves phonics skills!
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-white font-bold mb-1">Expert Level</div>
              <div className="text-white/80 text-sm">
                Master all levels to become a champion code breaker!
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BadgesTab;
