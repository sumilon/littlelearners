import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';
import { timeBasics, timeWithMinutes } from '../../../../data/clockTimeData';

const PracticeTimeTab = () => {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('basic');
  const [targetTime, setTargetTime] = useState(null);
  const [hourHand, setHourHand] = useState(0);
  const [minuteHand, setMinuteHand] = useState(0);
  const [isDragging, setIsDragging] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    generateNewTime();
  }, [difficulty]);

  const generateNewTime = () => {
    const data = difficulty === 'basic' ? timeBasics : timeWithMinutes;
    const randomTime = data[Math.floor(Math.random() * data.length)];
    setTargetTime(randomTime);
    setHourHand(0);
    setMinuteHand(0);
    speakEnglish(`Set the clock to ${randomTime.text}`);
  };

  const handleMouseDown = (hand) => {
    playSound('click');
    setIsDragging(hand);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const clock = e.currentTarget;
    const rect = clock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
    const normalizedAngle = (angle + 360) % 360;

    if (isDragging === 'hour') {
      setHourHand(normalizedAngle);
    } else if (isDragging === 'minute') {
      setMinuteHand(normalizedAngle);
    }
  };

  // Touch event handlers for mobile support
  const handleTouchStart = (hand) => (e) => {
    e.preventDefault();
    playSound('click');
    setIsDragging(hand);
  };

  const handleTouchEnd = () => {
    setIsDragging(null);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const clock = e.currentTarget;
    const rect = clock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const touch = e.touches[0];
    const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI) + 90;
    const normalizedAngle = (angle + 360) % 360;

    if (isDragging === 'hour') {
      setHourHand(normalizedAngle);
    } else if (isDragging === 'minute') {
      setMinuteHand(normalizedAngle);
    }
  };

  const checkAnswer = () => {
    playSound('click');
    setAttempts(attempts + 1);

    const targetHourAngle = ((targetTime.hour % 12) + targetTime.minute / 60) * 30;
    const targetMinuteAngle = targetTime.minute * 6;

    // Allow 15-degree tolerance for checking
    const hourDiff = Math.abs(((hourHand - targetHourAngle + 180) % 360) - 180);
    const minuteDiff = Math.abs(((minuteHand - targetMinuteAngle + 180) % 360) - 180);

    const tolerance = difficulty === 'basic' ? 20 : 15;

    if (hourDiff <= tolerance && minuteDiff <= tolerance) {
      playSound('correct');
      playSound('star');
      speakEnglish('Correct! Great job!');
      setScore(score + 1);
      addStars(difficulty === 'basic' ? 2 : 3);
      logActivity('Clock Time', 'Practice Time', `Correct time: ${targetTime.display}`);
      
      setTimeout(() => {
        generateNewTime();
      }, 1500);
    } else {
      playSound('wrong');
      speakEnglish('Try again! Look at the target time.');
    }
  };

  const resetHands = () => {
    playSound('click');
    setHourHand(0);
    setMinuteHand(0);
  };

  if (!targetTime) return null;

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stats */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-3xl font-bold text-green-600">{score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Attempts</p>
            <p className="text-3xl font-bold text-blue-600">{attempts}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">
              {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Selector */}
      <div className="flex gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDifficulty('basic')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            difficulty === 'basic'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-700'
          }`}
        >
          ⏰ Easy (O'Clock)
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDifficulty('minutes')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            difficulty === 'minutes'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-700'
          }`}
        >
          ⏱️ Hard (With Minutes)
        </motion.button>
      </div>

      {/* Target Time */}
      <motion.div
        variants={wiggle}
        className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 shadow-2xl text-center"
      >
        <p className="text-2xl font-bold text-white mb-2">Set the clock to:</p>
        <div className="text-8xl mb-2">{targetTime.emoji}</div>
        <div className="text-6xl font-bold text-white">{targetTime.display}</div>
        <div className="text-3xl font-semibold text-white/90 mt-2">{targetTime.text}</div>
      </motion.div>

      {/* Interactive Clock */}
      <motion.div
        variants={scaleIn}
        className="bg-white rounded-3xl p-8 shadow-2xl"
      >
        <p className="text-center text-xl font-bold text-gray-700 mb-4">
          Drag or touch the clock hands to set the time!
        </p>

        <div className="flex justify-center">
          <div 
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full border-4 sm:border-6 md:border-8 border-blue-500 shadow-xl cursor-pointer touch-none"
            style={{ userSelect: 'none' }}
          >
            {/* Clock Numbers */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const x = 50 + 40 * Math.cos(angle);
              const y = 50 + 40 * Math.sin(angle);
              return (
                <div
                  key={num}
                  className="absolute font-bold text-blue-700 text-xl"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                >
                  {num}
                </div>
              );
            })}

            {/* Center Dot */}
            <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" />

            {/* Hour Hand (Draggable) */}
            <div
              onMouseDown={() => handleMouseDown('hour')}
              onTouchStart={handleTouchStart('hour')}
              className="absolute top-1/2 left-1/2 origin-bottom cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity touch-none"
              style={{
                width: '8px',
                height: '80px',
                background: 'linear-gradient(to top, #1e40af, #3b82f6)',
                borderRadius: '4px',
                transform: `translate(-50%, -100%) rotate(${hourHand}deg)`,
                transformOrigin: 'bottom center'
              }}
            />

            {/* Minute Hand (Draggable) */}
            <div
              onMouseDown={() => handleMouseDown('minute')}
              onTouchStart={handleTouchStart('minute')}
              className="absolute top-1/2 left-1/2 origin-bottom cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity touch-none"
              style={{
                width: '6px',
                height: '100px',
                background: 'linear-gradient(to top, #0e7490, #06b6d4)',
                borderRadius: '3px',
                transform: `translate(-50%, -100%) rotate(${minuteHand}deg)`,
                transformOrigin: 'bottom center'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetHands}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswer}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-xl"
          >
            <CheckCircle className="w-6 h-6" />
            Check Answer
          </motion.button>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">How to Practice:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>🎯 Look at the target time shown above</li>
              <li>👆 Drag or touch the hour hand (shorter, blue) and minute hand (longer, cyan)</li>
              <li>✅ Click "Check Answer" when you think it's correct</li>
              <li>⭐ Earn more stars for harder difficulty!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PracticeTimeTab;
