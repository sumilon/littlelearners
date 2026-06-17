import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { plants } from '../../../../data/evsData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, confetti } from '../../../../utils/animationUtils';

export default function PlantsTab() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedPlants, setLearnedPlants] = useState(new Set());
  const [filterType, setFilterType] = useState('All');
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const currentPlant = plants[currentIndex];
  const types = ['All', 'Flower', 'Tree', 'Plant', 'Fungus'];

  // Filter plants by type
  const filteredPlants = filterType === 'All' 
    ? plants 
    : plants.filter(p => p.type === filterType);

  // Speak plant info when changed
  useEffect(() => {
    speakPlant();
  }, [currentIndex]);

  const speakPlant = () => {
    const text = `${currentPlant.name}. It is a ${currentPlant.type}. ${currentPlant.fact}`;
    speakEnglish(text);
  };

  const handleNext = () => {
    if (currentIndex < plants.length - 1) {
      playSound('click');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSound('click');
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLearnPlant = () => {
    const plantName = currentPlant.name;
    
    if (!learnedPlants.has(plantName)) {
      playSound('correct');
      playSound('star');
      addStars(2);
      setLearnedPlants(new Set([...learnedPlants, plantName]));
      logActivity('evs', 'plants', `Learned about ${plantName}`);
    } else {
      playSound('click');
    }
    
    speakPlant();
  };

  const handleTypeFilter = (type) => {
    playSound('click');
    setFilterType(type);
    // Reset to first plant when filtering
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="text-center text-gray-600">
        <p className="text-lg font-semibold">
          Learned: {learnedPlants.size} / {plants.length}
        </p>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filterType === type
                ? 'bg-green-500 text-white scale-105'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Plant Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-gradient-to-br from-lime-100 to-green-100 rounded-2xl p-8 text-center space-y-6"
        >
          {/* Plant Emoji */}
          <div className="text-9xl mb-4">{currentPlant.emoji}</div>

          {/* Plant Info Card */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            {/* Name */}
            <h3 className="text-4xl font-bold text-green-600">
              {currentPlant.name}
            </h3>

            {/* Type Badge */}
            <div className="inline-block bg-lime-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
              🌿 Type: {currentPlant.type}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Color</p>
                <p className="text-xl font-bold text-pink-600">🎨 {currentPlant.color}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Uses</p>
                <p className="text-xl font-bold text-purple-600">✨ {currentPlant.uses}</p>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Fun Fact</p>
              <p className="text-lg font-semibold text-yellow-700">💡 {currentPlant.fact}</p>
            </div>
          </div>

          {/* Learn Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLearnPlant}
            className={`w-full py-4 rounded-xl text-xl font-bold transition-colors flex items-center justify-center gap-2 ${
              learnedPlants.has(currentPlant.name)
                ? 'bg-green-500 text-white'
                : 'bg-lime-500 text-white hover:bg-lime-600'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            {learnedPlants.has(currentPlant.name) ? 'Learned!' : 'Learn About This Plant'}
            {learnedPlants.has(currentPlant.name) && ' ⭐⭐'}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
            currentIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-lime-500 text-white hover:bg-lime-600 hover:scale-105'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-center text-gray-600 font-semibold">
          {currentIndex + 1} / {plants.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === plants.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
            currentIndex === plants.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-lime-500 text-white hover:bg-lime-600 hover:scale-105'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <span className="font-bold">⭐ Learn about plants</span> and earn 2 stars each!
        </p>
      </div>

      {/* Confetti on completion */}
      {learnedPlants.size === 10 && (
        <motion.div
          variants={confetti}
          initial="initial"
          animate="animate"
          className="fixed inset-0 pointer-events-none"
        >
          <div className="text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            🎉🌸🌳
          </div>
        </motion.div>
      )}
    </div>
  );
}
