import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { timeBasics, timeWithMinutes, getClockHandPositions } from '../../../../data/clockTimeData';

const LearnTimeTab = () => {
  const { addStars, logActivity } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('basic'); // 'basic' or 'minutes'
  const [learnedTimes, setLearnedTimes] = useState(new Set());

  const currentData = difficulty === 'basic' ? timeBasics : timeWithMinutes;
  const currentTime = currentData[currentIndex];
  const { hourAngle, minuteAngle } = getClockHandPositions(currentTime.hour, currentTime.minute);

  const handleSpeak = () => {
    playSound('click');
    speakEnglish(currentTime.text);
  };

  const handleNext = () => {
    playSound('click');
    if (!learnedTimes.has(currentIndex)) {
      const newLearned = new Set(learnedTimes);
      newLearned.add(currentIndex);
      setLearnedTimes(newLearned);
      
      if (newLearned.size % 3 === 0) {
        addStars(2);
        playSound('star');
        logActivity('Clock Time', 'Learn Time', `Learned ${newLearned.size} times`);
      }
    }
    
    if (currentIndex < currentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(currentData.length - 1);
    }
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
    setCurrentIndex(0);
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Progress */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Times Learned</p>
            <p className="text-3xl font-bold text-blue-600">{learnedTimes.size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-3xl font-bold text-cyan-600">
              {currentIndex + 1}/{currentData.length}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / currentData.length) * 100}%` }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
          />
        </div>
      </motion.div>

      {/* Difficulty Selector */}
      <div className="flex gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDifficultyChange('basic')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            difficulty === 'basic'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-700'
          }`}
        >
          ⏰ O'Clock Times
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDifficultyChange('minutes')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            difficulty === 'minutes'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-700'
          }`}
        >
          ⏱️ With Minutes
        </motion.button>
      </div>

      {/* Clock Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit={{ scale: 0, opacity: 0 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {/* Analog Clock */}
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full border-8 border-blue-500 shadow-xl">
              {/* Clock Numbers */}
              {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, idx) => {
                const angle = (idx * 30 - 90) * (Math.PI / 180);
                const x = 50 + 40 * Math.cos(angle);
                const y = 50 + 40 * Math.sin(angle);
                return (
                  <div
                    key={num}
                    className="absolute font-bold text-blue-700 text-lg"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {num}
                  </div>
                );
              })}

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 z-30" />

              {/* Hour Hand */}
              <motion.div
                animate={{ rotate: hourAngle }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 z-20 origin-bottom"
                style={{
                  width: '6px',
                  height: '60px',
                  background: 'linear-gradient(to top, #1e40af, #3b82f6)',
                  borderRadius: '3px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-3px',
                  marginTop: '-60px'
                }}
              />

              {/* Minute Hand */}
              <motion.div
                animate={{ rotate: minuteAngle }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 z-20 origin-bottom"
                style={{
                  width: '4px',
                  height: '85px',
                  background: 'linear-gradient(to top, #0e7490, #06b6d4)',
                  borderRadius: '2px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-2px',
                  marginTop: '-85px'
                }}
              />
            </div>
          </div>

          {/* Time Display */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-8xl"
            >
              {currentTime.emoji}
            </motion.div>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              {currentTime.display}
            </div>
            <div className="text-3xl font-semibold text-gray-700">
              {currentTime.text}
            </div>

            {/* Speak Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpeak}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
            >
              <Volume2 className="w-6 h-6" />
              Listen
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-6 h-6" />
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">How to Learn Time:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>👀 Look at the analog clock and digital time</li>
              <li>🔊 Press "Listen" to hear how to say the time</li>
              <li>⏰ Start with O'Clock times, then try With Minutes</li>
              <li>⭐ Earn stars for every 3 times you learn!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearnTimeTab;
