import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, CheckCircle } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { weatherTypes, clothingItems, weatherChallenges } from '../../../../data/weatherStationData';

const DressUpTab = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge = weatherChallenges[currentChallenge];
  const weather = weatherTypes.find(w => w.id === challenge.weather);

  useEffect(() => {
    speak(challenge.question);
  }, [currentChallenge]);

  const handleClothingSelect = (item) => {
    playSound('click');
    
    if (selectedClothes.includes(item.id)) {
      // Remove if already selected
      setSelectedClothes(selectedClothes.filter(id => id !== item.id));
    } else {
      // Add if not selected
      setSelectedClothes([...selectedClothes, item.id]);
    }
  };

  const handleCheck = () => {
    playSound('click');
    
    const correctCount = selectedClothes.filter(id => 
      challenge.correctAnswers.includes(id)
    ).length;
    
    const isAnswerCorrect = correctCount >= challenge.minCorrect && 
                           selectedClothes.every(id => challenge.correctAnswers.includes(id));
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      playSound('success');
      setScore(score + 1);
      speak('Great job! You dressed perfectly for the weather!');
      
      setTimeout(() => {
        if (currentChallenge < weatherChallenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1);
          setSelectedClothes([]);
          setShowFeedback(false);
        }
      }, 2500);
    } else {
      playSound('error');
      speak('Try again! Think about what you need for this weather.');
    }
  };

  const handleReset = () => {
    playSound('click');
    setCurrentChallenge(0);
    setSelectedClothes([]);
    setScore(0);
    setShowFeedback(false);
  };

  const handleTryAgain = () => {
    playSound('click');
    setSelectedClothes([]);
    setShowFeedback(false);
  };

  if (currentChallenge >= weatherChallenges.length) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold text-white mb-4">Amazing Work!</h2>
          <p className="text-2xl text-white/90 mb-2">You scored {score} out of {weatherChallenges.length}</p>
          <p className="text-xl text-white/80 mb-6">You know how to dress for any weather!</p>
          <motion.button
            onClick={handleReset}
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="inline mr-2" />
            Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Score Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
            <span className="text-white font-bold text-lg">
              Challenge {currentChallenge + 1}/{weatherChallenges.length}
            </span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
            <span className="text-white font-bold text-lg">
              ⭐ Score: {score}
            </span>
          </div>
        </div>

        {/* Weather Scene */}
        <motion.div
          key={currentChallenge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${weather.backgroundColor} rounded-3xl p-6 mb-6 shadow-2xl`}
        >
          <div className="text-center mb-4">
            <motion.div
              className="text-9xl mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: weather.id === 'windy' ? [-5, 5, -5] : 0
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {weather.emoji}
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{weather.name} Weather</h2>
            <p className="text-xl text-gray-700">{challenge.question}</p>
          </div>

          {/* Character to dress */}
          <div className="bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-8xl mb-4">👤</div>
              <div className="flex flex-wrap justify-center gap-3 min-h-[80px]">
                <AnimatePresence>
                  {selectedClothes.map((clothingId, index) => {
                    const item = clothingItems.find(c => c.id === clothingId);
                    return (
                      <motion.div
                        key={clothingId}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        className="text-5xl"
                      >
                        {item.emoji}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Clothing Wardrobe */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Choose Your Clothes
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {clothingItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleClothingSelect(item)}
                className={`relative p-4 rounded-2xl font-bold transition-all ${
                  selectedClothes.includes(item.id)
                    ? 'bg-green-400 text-white scale-95'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-5xl mb-2">{item.emoji}</div>
                <div className="text-xs">{item.name}</div>
                {selectedClothes.includes(item.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <motion.button
            onClick={handleCheck}
            disabled={selectedClothes.length === 0}
            className={`px-8 py-4 rounded-2xl font-bold text-xl ${
              selectedClothes.length === 0
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            whileHover={selectedClothes.length > 0 ? { scale: 1.05 } : {}}
            whileTap={selectedClothes.length > 0 ? { scale: 0.95 } : {}}
          >
            <CheckCircle className="inline mr-2" />
            Check My Outfit
          </motion.button>

          {selectedClothes.length > 0 && (
            <motion.button
              onClick={handleTryAgain}
              className="px-8 py-4 rounded-2xl font-bold text-xl bg-orange-500 text-white hover:bg-orange-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="inline mr-2" />
              Clear
            </motion.button>
          )}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 ${
                isCorrect ? 'bg-green-500' : 'bg-red-500'
              } text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl z-50`}
            >
              {isCorrect ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✅</span>
                  <span>Perfect! You dressed just right!</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-3xl">❌</span>
                  <span>Not quite! Try again!</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DressUpTab;
