import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { continents } from '../../../../data/continentsExplorerData';

// Reusable Continent Button Component
const ContinentButton = ({ continent, position, isDiscovered, onClick, delay = 0 }) => (
  <motion.button
    onClick={onClick}
    className={`absolute ${position} ${isDiscovered ? 'opacity-100' : 'opacity-70'}`}
    initial={{ scale: 0, rotate: -180, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: isDiscovered ? 1 : 0.7 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
    whileHover={{ scale: 1.25, rotate: Math.random() > 0.5 ? 8 : -8, y: -15, zIndex: 50 }}
    whileTap={{ scale: 0.85 }}
  >
    <motion.div 
      className={`bg-gradient-to-br ${continent.backgroundColor} rounded-2xl p-6 shadow-xl min-w-[140px] border-2 border-white/20`}
      animate={isDiscovered ? { 
        boxShadow: [
          "0 10px 20px rgba(0,0,0,0.2)", 
          "0 15px 30px rgba(34,197,94,0.5)", 
          "0 10px 20px rgba(0,0,0,0.2)"
        ] 
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.div 
        className="text-6xl mb-2"
        animate={{ 
          rotate: [0, -3, 3, -3, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {continent.emoji}
      </motion.div>
      <div className="text-sm font-bold text-gray-800">{continent.name}</div>
      <AnimatePresence>
        {isDiscovered && (
          <motion.div 
            className="text-xs text-green-600 mt-1 font-bold"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            ✓ Visited
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.button>
);

const InteractiveMapTab = ({ discoveredContinents, setDiscoveredContinents }) => {
  const [selectedContinent, setSelectedContinent] = useState(null);

  const handleContinentClick = (continent) => {
    playSound('click');
    setSelectedContinent(continent);
    setDiscoveredContinents(prev => new Set([...prev, continent.id]));
    speak(`${continent.name}! ${continent.facts[0]}`);
  };

  const handleClose = () => {
    playSound('click');
    setSelectedContinent(null);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-2">Explore the World! 🌍</h2>
          <p className="text-xl text-white/80">Tap any continent to learn about it</p>
          <div className="mt-3 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 inline-block">
            <span className="text-white font-bold">
              Discovered: {discoveredContinents.size}/7 continents
            </span>
          </div>
        </div>

        {/* Simplified World Map */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 shadow-2xl mb-6 relative overflow-hidden">
          {/* Ocean background with animated creatures */}
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-10 left-10 text-4xl"
              animate={{ 
                x: [0, 30, 0],
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🐠
            </motion.div>
            <motion.div 
              className="absolute top-32 right-20 text-3xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              🐚
            </motion.div>
            <motion.div 
              className="absolute bottom-20 left-1/4 text-3xl"
              animate={{ 
                x: [0, -25, 0],
                y: [0, 15, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              🐟
            </motion.div>
            <motion.div 
              className="absolute bottom-32 right-1/3 text-4xl"
              animate={{ 
                x: [0, 40, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              🐋
            </motion.div>
            {/* Add more sea elements */}
            <motion.div 
              className="absolute top-1/2 left-1/2 text-2xl"
              animate={{ 
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🫧
            </motion.div>
          </div>

          {/* Map Grid - Using positioned emoji-based continents */}
          <div className="relative min-h-[50vh] md:min-h-[500px]">
            <ContinentButton 
              continent={continents[3]} 
              position="left-[15%] top-[20%]"
              isDiscovered={discoveredContinents.has('northAmerica')}
              onClick={() => handleContinentClick(continents[3])}
              delay={0.1}
            />

            <ContinentButton 
              continent={continents[4]} 
              position="left-[20%] top-[50%]"
              isDiscovered={discoveredContinents.has('southAmerica')}
              onClick={() => handleContinentClick(continents[4])}
              delay={0.2}
            />

            <ContinentButton 
              continent={continents[2]} 
              position="left-[45%] top-[15%]"
              isDiscovered={discoveredContinents.has('europe')}
              onClick={() => handleContinentClick(continents[2])}
              delay={0.3}
            />

            <ContinentButton 
              continent={continents[0]} 
              position="left-[47%] top-[40%]"
              isDiscovered={discoveredContinents.has('africa')}
              onClick={() => handleContinentClick(continents[0])}
              delay={0.4}
            />

            <ContinentButton 
              continent={continents[1]} 
              position="left-[65%] top-[25%]"
              isDiscovered={discoveredContinents.has('asia')}
              onClick={() => handleContinentClick(continents[1])}
              delay={0.5}
            />

            <ContinentButton 
              continent={continents[5]} 
              position="left-[72%] top-[60%]"
              isDiscovered={discoveredContinents.has('australia')}
              onClick={() => handleContinentClick(continents[5])}
              delay={0.6}
            />

            <ContinentButton 
              continent={continents[6]} 
              position="left-[42%] bottom-[5%]"
              isDiscovered={discoveredContinents.has('antarctica')}
              onClick={() => handleContinentClick(continents[6])}
              delay={0.7}
            />
          </div>
        </div>

        {/* Legend */}
        <motion.div 
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-3 text-center">Did You Know? 🌐</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="bg-white/10 rounded-xl p-3 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl mb-1"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🌍
              </motion.div>
              <p className="text-sm text-white font-bold">7 Continents</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 rounded-xl p-3 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl mb-1"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌊
              </motion.div>
              <p className="text-sm text-white font-bold">5 Oceans</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 rounded-xl p-3 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl mb-1"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏴
              </motion.div>
              <p className="text-sm text-white font-bold">195 Countries</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Continent Detail Modal */}
      <AnimatePresence>
        {selectedContinent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0, rotateX: -30 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0, rotateX: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-br ${selectedContinent.backgroundColor} rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border-4 border-white/30`}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 p-2 rounded-full"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-gray-800" />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-9xl mb-4">{selectedContinent.emoji}</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{selectedContinent.name}</h2>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg px-3 py-1">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {selectedContinent.countries} countries
                  </div>
                  <div className="bg-white/50 rounded-lg px-3 py-1">
                    👥 {selectedContinent.population}
                  </div>
                </div>
              </div>

              {/* Famous Animals */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Famous Animals 🦁</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedContinent.animals.map((animal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/60 rounded-xl p-4"
                    >
                      <div className="text-4xl mb-2">{animal.emoji}</div>
                      <div className="font-bold text-gray-800">{animal.name}</div>
                      <div className="text-xs text-gray-700">{animal.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Famous Landmarks */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Famous Places 🏛️</h3>
                <div className="grid grid-cols-1 gap-3">
                  {selectedContinent.landmarks.map((landmark, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/60 rounded-xl p-3 flex items-center gap-3"
                    >
                      <div className="text-3xl">{landmark.emoji}</div>
                      <div>
                        <div className="font-bold text-gray-800">{landmark.name}</div>
                        <div className="text-sm text-gray-700">📍 {landmark.country}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Fun Facts 💡</h3>
                <div className="space-y-2">
                  {selectedContinent.facts.map((fact, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        playSound('click');
                        speak(fact);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full bg-white/60 rounded-xl p-3 text-left hover:bg-white/80 transition-colors"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xl flex-shrink-0">✨</span>
                        <span className="text-gray-800">{fact}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMapTab;
