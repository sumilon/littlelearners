import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { animals } from '../../../../data/evsData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, confetti } from '../../../../utils/animationUtils';

export default function AnimalsTab() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedAnimals, setLearnedAnimals] = useState(new Set());
  const [filterHabitat, setFilterHabitat] = useState('All');
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const currentAnimal = animals[currentIndex];
  const habitats = ['All', 'Forest', 'Water', 'Sky', 'Desert', 'Home', 'Farm'];

  // Filter animals by habitat
  const filteredAnimals = filterHabitat === 'All' 
    ? animals 
    : animals.filter(a => a.habitat === filterHabitat);

  // Speak animal info when changed
  useEffect(() => {
    speakAnimal();
  }, [currentIndex]);

  const speakAnimal = () => {
    const text = `${currentAnimal.name}. Lives in ${currentAnimal.habitat}. It says ${currentAnimal.sound}. ${currentAnimal.fact}`;
    speakEnglish(text);
  };

  const handleNext = () => {
    if (currentIndex < animals.length - 1) {
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

  const handleLearnAnimal = () => {
    const animalName = currentAnimal.name;
    
    if (!learnedAnimals.has(animalName)) {
      playSound('correct');
      playSound('star');
      addStars(2);
      setLearnedAnimals(new Set([...learnedAnimals, animalName]));
      logActivity('evs', 'animals', `Learned about ${animalName}`);
    } else {
      playSound('click');
    }
    
    speakAnimal();
  };

  const handleHabitatFilter = (habitat) => {
    playSound('click');
    setFilterHabitat(habitat);
    // Reset to first animal when filtering
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="text-center text-gray-600">
        <p className="text-lg font-semibold">
          Learned: {learnedAnimals.size} / {animals.length}
        </p>
      </div>

      {/* Habitat Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {habitats.map((habitat) => (
          <button
            key={habitat}
            onClick={() => handleHabitatFilter(habitat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filterHabitat === habitat
                ? 'bg-green-500 text-white scale-105'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {habitat}
          </button>
        ))}
      </div>

      {/* Animal Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 text-center space-y-6"
        >
          {/* Animal Emoji */}
          <div className="text-9xl mb-4">{currentAnimal.emoji}</div>

          {/* Animal Info Card */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            {/* Name */}
            <h3 className="text-4xl font-bold text-green-600">
              {currentAnimal.name}
            </h3>

            {/* Habitat Badge */}
            <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
              🏡 Lives in: {currentAnimal.habitat}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Sound</p>
                <p className="text-xl font-bold text-blue-600">🔊 {currentAnimal.sound}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Food</p>
                <p className="text-xl font-bold text-orange-600">🍽️ {currentAnimal.food}</p>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Fun Fact</p>
              <p className="text-lg font-semibold text-yellow-700">💡 {currentAnimal.fact}</p>
            </div>
          </div>

          {/* Learn Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLearnAnimal}
            className={`w-full py-4 rounded-xl text-xl font-bold transition-colors flex items-center justify-center gap-2 ${
              learnedAnimals.has(currentAnimal.name)
                ? 'bg-green-500 text-white'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            {learnedAnimals.has(currentAnimal.name) ? 'Learned!' : 'Learn About This Animal'}
            {learnedAnimals.has(currentAnimal.name) && ' ⭐⭐'}
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
              : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-center text-gray-600 font-semibold">
          {currentIndex + 1} / {animals.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === animals.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
            currentIndex === animals.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <span className="font-bold">⭐ Learn about animals</span> and earn 2 stars each!
        </p>
      </div>

      {/* Confetti on milestones */}
      {(learnedAnimals.size === 10 || learnedAnimals.size === 18) && (
        <motion.div
          variants={confetti}
          initial="initial"
          animate="animate"
          className="fixed inset-0 pointer-events-none"
        >
          <div className="text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            🎉🐾🌿
          </div>
        </motion.div>
      )}
    </div>
  );
}
