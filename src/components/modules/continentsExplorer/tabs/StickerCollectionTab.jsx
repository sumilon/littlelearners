import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Sparkles } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { continents } from '../../../../data/continentsExplorerData';

const StickerCollectionTab = ({ discoveredContinents = new Set() }) => {
  const handleStickerClick = (continent, isUnlocked) => {
    playSound('click');
    if (isUnlocked) {
      speak(`${continent.name} sticker! ${continent.facts[0]}`);
    } else {
      speak(`Visit ${continent.name} on the map to unlock this sticker!`);
    }
  };

  const unlockedCount = discoveredContinents.size;
  const totalCount = continents.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-3">Sticker Collection 📔</h2>
          <p className="text-xl text-white/80 mb-4">
            Collect all continent stickers by exploring the world!
          </p>

          {/* Progress Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 max-w-md mx-auto relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            
            <div className="flex items-center justify-center gap-4 mb-4 relative z-10">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Award className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <div>
                <motion.div 
                  className="text-4xl font-bold text-white"
                  key={unlockedCount}
                  initial={{ scale: 1.5, color: '#fbbf24' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {unlockedCount} / {totalCount}
                </motion.div>
                <div className="text-white/80 text-sm">Stickers Collected</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-4 overflow-hidden relative z-10">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-green-400 h-full rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {/* Animated shine on progress bar */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.div>
            </div>
            <motion.div 
              className="text-white/80 text-sm mt-2 relative z-10"
              key={percentage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {percentage}% Complete
            </motion.div>

            {/* Achievement Message */}
            {percentage === 100 && (
              <motion.div
                initial={{ scale: 0, rotateZ: -180 }}
                animate={{ scale: 1, rotateZ: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="mt-4 bg-yellow-500/30 border-2 border-yellow-400 rounded-2xl p-4 relative overflow-hidden z-10"
              >
                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 bg-yellow-400/20"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <motion.div 
                  className="text-3xl mb-2 relative z-10"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  🏆
                </motion.div>
                <div className="text-xl font-bold text-white relative z-10">
                  Master Explorer!
                </div>
                <div className="text-white/90 text-sm relative z-10">
                  You've discovered all continents!
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {continents.map((continent, index) => {
            const isUnlocked = discoveredContinents.has(continent.id);

            return (
              <motion.button
                key={continent.id}
                onClick={() => handleStickerClick(continent, isUnlocked)}
                initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 200,
                  damping: 12
                }}
                className={`
                  relative rounded-3xl p-6 shadow-lg transition-all
                  ${isUnlocked
                    ? `bg-gradient-to-br ${continent.color} shadow-[0_10px_40px_rgba(0,0,0,0.3)]`
                    : 'bg-gray-800/50 backdrop-blur-md'
                  }
                `}
                whileHover={{ 
                  scale: isUnlocked ? 1.1 : 1.05, 
                  y: isUnlocked ? -15 : -5,
                  rotateZ: isUnlocked ? 5 : 0,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Unlocked Sticker */}
                {isUnlocked ? (
                  <>
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0"
                      whileHover={{ 
                        opacity: 1,
                        boxShadow: '0 0 30px rgba(255,215,0,0.5)'
                      }}
                    />
                    
                    <motion.div
                      className="text-8xl mb-4 relative z-10"
                      animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 8, -8, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatDelay: 1 + index * 0.3 
                      }}
                    >
                      {continent.emoji}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
                      {continent.name}
                    </h3>
                    <div className="text-white/90 text-sm relative z-10">
                      {continent.countries} countries
                    </div>
                    
                    {/* Sparkle Badge with floating animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                        y: [0, -5, 0]
                      }}
                      transition={{ 
                        scale: { delay: 0.3, type: "spring" },
                        rotate: { delay: 0.3 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute top-3 right-3 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-20"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-900" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Celebration sparkles on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-yellow-300 text-2xl"
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [0, (i % 2 ? 30 : -30)],
                            y: [0, (i < 2 ? -30 : 30)]
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                          style={{
                            left: '50%',
                            top: '50%'
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  /* Locked Sticker */
                  <>
                    <div className="text-8xl mb-4 filter grayscale opacity-30">
                      {continent.emoji}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          y: [0, -5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4"
                      >
                        <motion.div
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Lock className="w-12 h-12 text-gray-400 mb-2" />
                        </motion.div>
                        <div className="text-gray-400 font-bold text-sm">Locked</div>
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-500">???</h3>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Hint for Unlocking */}
        {unlockedCount < totalCount && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            className="mt-8 bg-blue-500/20 backdrop-blur-md rounded-2xl p-6 text-center max-w-2xl mx-auto relative overflow-hidden"
          >
            {/* Animated background pulse */}
            <motion.div
              className="absolute inset-0 bg-blue-400/10"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <motion.div 
              className="text-4xl mb-3 relative z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💡
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-white mb-2 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              How to Unlock Stickers
            </motion.h3>
            <motion.p 
              className="text-white/90 text-lg relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Visit the <strong>Interactive Map</strong> and tap on each continent to discover it!
              Each continent you explore will unlock a new sticker for your collection.
            </motion.p>
          </motion.div>
        )}

        {/* Fun Facts about Continents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="mt-8 bg-white/10 backdrop-blur-md rounded-3xl p-6"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Continent Facts 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              className="bg-white/10 rounded-xl p-4 relative overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255,255,255,0.2)',
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <motion.div 
                className="text-4xl mb-2"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                🌍
              </motion.div>
              <div className="text-white font-bold mb-1">7 Continents</div>
              <div className="text-white/80 text-sm">
                Our planet has 7 unique continents, each with its own special features!
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 rounded-xl p-4 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255,255,255,0.2)',
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <motion.div 
                className="text-4xl mb-2"
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🗺️
              </motion.div>
              <div className="text-white font-bold mb-1">195 Countries</div>
              <div className="text-white/80 text-sm">
                There are 195 countries across all continents recognized by the UN!
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 rounded-xl p-4 relative overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255,255,255,0.2)',
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <motion.div 
                className="text-4xl mb-2"
                animate={{ 
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                🌏
              </motion.div>
              <div className="text-white font-bold mb-1">Largest: Asia</div>
              <div className="text-white/80 text-sm">
                Asia is the largest continent, covering about 30% of Earth's land area!
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 rounded-xl p-4 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255,255,255,0.2)',
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <motion.div 
                className="text-4xl mb-2"
                animate={{ 
                  x: [-3, 3, -3],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🐧
              </motion.div>
              <div className="text-white font-bold mb-1">Coldest: Antarctica</div>
              <div className="text-white/80 text-sm">
                Antarctica is the coldest, windiest, and driest continent on Earth!
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StickerCollectionTab;
