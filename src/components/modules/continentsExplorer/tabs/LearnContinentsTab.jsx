import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { continents } from '../../../../data/continentsExplorerData';

const LearnContinentsTab = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleContinentClick = (continent) => {
    playSound('click');
    setSelectedContinent(continent);
    speak(`${continent.name}. ${continent.description}`);
  };

  const handleFactClick = (fact) => {
    playSound('click');
    speak(fact);
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < continents.length - 1) {
      const nextContinent = continents[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setSelectedContinent(nextContinent);
      speak(`${nextContinent.name}. ${nextContinent.description}`);
    }
  };

  const handlePrevious = () => {
    playSound('click');
    if (currentIndex > 0) {
      const prevContinent = continents[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      setSelectedContinent(prevContinent);
      speak(`${prevContinent.name}. ${prevContinent.description}`);
    }
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Learn About Continents 🌍</h2>
          {selectedContinent && (
            <motion.button
              onClick={() => {
                playSound('click');
                setSelectedContinent(null);
              }}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-4 py-2 rounded-xl text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          )}
        </div>

        {/* Continent Selection Grid */}
        {!selectedContinent && (
          <div>
            <p className="text-xl text-white/80 text-center mb-8">
              Choose a continent to explore! 🗺️
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {continents.map((continent, index) => (
                <motion.button
                  key={continent.id}
                  onClick={() => {
                    handleContinentClick(continent);
                    setCurrentIndex(index);
                  }}
                  initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className={`bg-gradient-to-br ${continent.color} rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.08,
                    rotateZ: 2,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    className="text-7xl mb-3"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                  >
                    {continent.emoji}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-1">{continent.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-white/80">
                    <MapPin className="w-3 h-3" />
                    <span>{continent.animals.length} animals</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Continent View with Swipe Navigation */}
        <AnimatePresence mode="wait">
          {selectedContinent && (
            <motion.div
              key={selectedContinent.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Navigation Progress */}
              <div className="mb-4 flex items-center justify-between">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 rounded-xl font-bold ${
                    currentIndex === 0
                      ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      : 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-white'
                  }`}
                  whileHover={currentIndex === 0 ? {} : { scale: 1.05 }}
                  whileTap={currentIndex === 0 ? {} : { scale: 0.95 }}
                >
                  ← Previous
                </motion.button>
                
                <div className="text-white/80 font-bold">
                  {currentIndex + 1} / {continents.length}
                </div>
                
                <motion.button
                  onClick={handleNext}
                  disabled={currentIndex === continents.length - 1}
                  className={`px-4 py-2 rounded-xl font-bold ${
                    currentIndex === continents.length - 1
                      ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      : 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-white'
                  }`}
                  whileHover={currentIndex === continents.length - 1 ? {} : { scale: 1.05 }}
                  whileTap={currentIndex === continents.length - 1 ? {} : { scale: 0.95 }}
                >
                  Next →
                </motion.button>
              </div>

              {/* Continent Header Card */}
              <motion.div
                className={`bg-gradient-to-br ${selectedContinent.color} rounded-3xl p-8 mb-6 shadow-2xl`}
                layoutId={`continent-${selectedContinent.id}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div
                    className="text-9xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {selectedContinent.emoji}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h2 className="text-5xl font-bold text-white mb-4">{selectedContinent.name}</h2>
                    <p className="text-2xl text-white/90 mb-6">{selectedContinent.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div 
                        className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Globe className="w-6 h-6 text-white mx-auto mb-2" />
                        </motion.div>
                        <div className="text-sm font-bold text-white/80">Region</div>
                        <div className="text-lg font-bold text-white capitalize">{selectedContinent.id}</div>
                      </motion.div>
                      <motion.div 
                        className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <MapPin className="w-6 h-6 text-white mx-auto mb-2" />
                        </motion.div>
                        <div className="text-sm font-bold text-white/80">Animals</div>
                        <div className="text-lg font-bold text-white">{selectedContinent.animals.length}</div>
                      </motion.div>
                      <motion.div 
                        className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-6 h-6 text-white mx-auto mb-2" />
                        </motion.div>
                        <div className="text-sm font-bold text-white/80">Landmarks</div>
                        <div className="text-lg font-bold text-white">{selectedContinent.landmarks.length}</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Animals Section */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🦁</span> Amazing Animals
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedContinent.animals.map((animal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ 
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 200,
                        damping: 12
                      }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        y: -10,
                        rotateZ: 5,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div 
                        className="text-6xl mb-2"
                        animate={{
                          scale: [1, 1.15, 1],
                          rotate: [0, -10, 10, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatDelay: 0.5 + index * 0.2
                        }}
                      >
                        {animal.emoji}
                      </motion.div>
                      <div className="text-lg font-bold text-white">{animal.name}</div>
                      
                      {/* Sparkle effect on hover */}
                      <motion.div
                        className="absolute top-2 right-2 text-yellow-300"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Landmarks Section */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🏛️</span> Famous Landmarks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedContinent.landmarks.map((landmark, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50, rotateY: -45 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ 
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 150,
                        damping: 12
                      }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.05, 
                        x: 10,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <motion.div 
                        className="text-5xl"
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 360,
                          transition: { duration: 0.6 }
                        }}
                      >
                        {landmark.emoji}
                      </motion.div>
                      <div className="flex-1 relative z-10">
                        <div className="text-xl font-bold text-white">{landmark.name}</div>
                        <div className="text-sm text-white/80">{landmark.country}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fun Facts Section */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white text-center mb-6">
                  Fun Facts About {selectedContinent.name}! 🌟
                </h3>
                <div className="grid gap-4">
                  {selectedContinent.facts.map((fact, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleFactClick(fact)}
                      initial={{ opacity: 0, x: -30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        delay: index * 0.12,
                        type: "spring",
                        stiffness: 150,
                        damping: 12
                      }}
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-5 rounded-2xl text-left transition-all group relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.03, 
                        x: 15,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated background shimmer */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '100%', opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                      
                      <div className="flex items-start gap-4 relative z-10">
                        <motion.span 
                          className="text-4xl flex-shrink-0"
                          whileHover={{ 
                            scale: 1.3,
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {selectedContinent.emoji}
                        </motion.span>
                        <p className="text-lg text-white leading-relaxed flex-1">{fact}</p>
                        <motion.div
                          whileHover={{ rotate: 180, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BookOpen className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearnContinentsTab;
