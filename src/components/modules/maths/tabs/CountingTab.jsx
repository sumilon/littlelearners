import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Volume2 } from 'lucide-react';
import { countingObjects } from '../../../../data/mathsData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, wiggle } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';

export default function CountingTab() {
  const [targetCount, setTargetCount] = useState(5);
  const [currentCount, setCurrentCount] = useState(0);
  const [objectType, setObjectType] = useState(countingObjects[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  // Initialize new round
  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newTarget = Math.floor(Math.random() * 10) + 1; // 1-10
    const newObject = countingObjects[Math.floor(Math.random() * countingObjects.length)];
    
    setTargetCount(newTarget);
    setObjectType(newObject);
    setCurrentCount(0);
    setShowSuccess(false);
    
    // Announce the task
    setTimeout(() => {
      speakEnglish(`Count ${newTarget} ${newObject.name}`);
    }, 500);
  };

  const handleTap = () => {
    if (showSuccess) return;
    
    playSound('click');
    const newCount = currentCount + 1;
    setCurrentCount(newCount);
    
    // Speak the number
    speakEnglish(newCount.toString());

    // Check if correct
    if (newCount === targetCount) {
      playSound('correct');
      playSound('star');
      setShowSuccess(true);
      setScore(score + 1);
      addStars(2);
      logActivity('maths', 'counting', `Counted ${targetCount} ${objectType.name} correctly`);
      
      speakEnglish(`Correct! You counted ${targetCount} ${objectType.name}!`);
      
      // Auto-advance to next round after celebration
      setTimeout(() => {
        setRound(round + 1);
        startNewRound();
      }, 3000);
    } else if (newCount > targetCount) {
      // Overcounted - wrong!
      playSound('wrong');
      speakEnglish('Oops! Too many. Try again!');
      
      setTimeout(() => {
        setCurrentCount(0);
      }, 1500);
    }
  };

  const handleReset = () => {
    playSound('click');
    setCurrentCount(0);
    speakEnglish('Let\'s try again!');
  };

  const handleNewChallenge = () => {
    playSound('click');
    setRound(round + 1);
    startNewRound();
  };

  // Render objects grid
  const renderObjects = () => {
    const objects = [];
    for (let i = 0; i < targetCount; i++) {
      objects.push(
        <motion.div
          key={i}
          variants={scaleIn}
          initial="initial"
          animate={i < currentCount ? "animate" : "initial"}
          className={`text-5xl transition-all ${
            i < currentCount ? 'opacity-100 scale-110' : 'opacity-30 scale-90'
          }`}
        >
          {objectType.emoji}
        </motion.div>
      );
    }
    return objects;
  };

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-600">
          Round: {round}
        </div>
        <div className="text-lg font-semibold text-purple-600">
          Score: {score} ⭐
        </div>
      </div>

      {/* Instruction */}
      <motion.div
        variants={scaleIn}
        initial="initial"
        animate="animate"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6 text-center"
      >
        <p className="text-2xl font-bold mb-2">
          Count {targetCount} {objectType.name}
        </p>
        <p className="text-lg opacity-90">
          Tap the button to count!
        </p>
      </motion.div>

      {/* Objects Display */}
      <div className="bg-white rounded-2xl p-6 min-h-[240px]">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
          {renderObjects()}
        </div>
      </div>

      {/* Counter Display */}
      <motion.div
        animate={currentCount > 0 ? { scale: [1, 1.1, 1] } : {}}
        className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 text-center"
      >
        <p className="text-lg text-gray-600 mb-2">Your Count:</p>
        <p className="text-8xl font-bold text-purple-600">{currentCount}</p>
      </motion.div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          className="bg-green-500 text-white rounded-2xl p-6 text-center"
        >
          <p className="text-3xl font-bold mb-2">🎉 Perfect!</p>
          <p className="text-xl">You counted {targetCount} correctly!</p>
          <p className="text-lg mt-2">+2 Stars ⭐⭐</p>
        </motion.div>
      )}

      {/* Action Buttons */}
      {!showSuccess ? (
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTap}
            className="bg-green-500 text-white py-6 rounded-xl text-2xl font-bold hover:bg-green-600 transition-colors shadow-lg"
          >
            Tap to Count!
            <div className="text-5xl mt-2">{objectType.emoji}</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-orange-500 text-white py-6 rounded-xl text-xl font-bold hover:bg-orange-600 transition-colors shadow-lg flex flex-col items-center justify-center gap-2"
          >
            <RotateCcw className="w-8 h-8" />
            Reset Count
          </motion.button>
        </div>
      ) : (
        <motion.button
          variants={scaleIn}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNewChallenge}
          className="w-full bg-blue-500 text-white py-6 rounded-xl text-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
        >
          Next Challenge! 🚀
        </motion.button>
      )}

      {/* Speak Instruction Button */}
      <button
        onClick={() => speakEnglish(`Count ${targetCount} ${objectType.name}`)}
        className="w-full bg-purple-100 text-purple-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-purple-200 transition-colors"
      >
        <Volume2 className="w-5 h-5" />
        Repeat Instructions
      </button>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <span className="font-bold">⭐ Tap the emoji button</span> to count. Get 2 stars for each correct count!
        </p>
      </div>
    </div>
  );
}
