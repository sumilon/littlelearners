import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, Check, X } from 'lucide-react';
import { habits } from '../../../../data/evsData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, confetti } from '../../../../utils/animationUtils';

export default function HabitsTab() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedHabits, setLearnedHabits] = useState(new Set());
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const currentHabit = habits[currentIndex];

  // Speak habit info when changed
  useEffect(() => {
    speakHabit();
  }, [currentIndex]);

  const speakHabit = () => {
    const text = `${currentHabit.habit}. ${currentHabit.why}. ${currentHabit.impact}`;
    speakEnglish(text);
  };

  const handleNext = () => {
    if (currentIndex < habits.length - 1) {
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

  const handleLearnHabit = () => {
    const habitName = currentHabit.habit;
    
    if (!learnedHabits.has(habitName)) {
      playSound('correct');
      playSound('star');
      addStars(3);
      setLearnedHabits(new Set([...learnedHabits, habitName]));
      logActivity('evs', 'habits', `Learned about ${habitName}`);
    } else {
      playSound('click');
    }
    
    speakHabit();
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="text-center text-gray-600">
        <p className="text-lg font-semibold">
          Learned: {learnedHabits.size} / {habits.length}
        </p>
      </div>

      {/* Habit Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-8 text-center space-y-6"
        >
          {/* Habit Emoji */}
          <div className="text-9xl mb-4">{currentHabit.emoji}</div>

          {/* Habit Info Card */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            {/* Name */}
            <h3 className="text-4xl font-bold text-teal-600">
              {currentHabit.habit}
            </h3>

            {/* Why Section */}
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <p className="text-sm text-gray-600 mb-2 font-bold">Why is this important?</p>
              <p className="text-lg font-semibold text-blue-600">
                💡 {currentHabit.why}
              </p>
            </div>

            {/* Do's Section */}
            <div className="bg-green-50 p-4 rounded-lg text-left">
              <p className="text-sm text-gray-600 mb-2 font-bold flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Do's
              </p>
              {currentHabit.dos.map((item, idx) => (
                <p key={idx} className="text-lg font-semibold text-green-600 ml-7">
                  ✓ {item}
                </p>
              ))}
            </div>

            {/* Don'ts Section */}
            <div className="bg-red-50 p-4 rounded-lg text-left">
              <p className="text-sm text-gray-600 mb-2 font-bold flex items-center gap-2">
                <X className="w-5 h-5 text-red-600" />
                Don'ts
              </p>
              {currentHabit.donts.map((item, idx) => (
                <p key={idx} className="text-lg font-semibold text-red-600 ml-7">
                  ✗ {item}
                </p>
              ))}
            </div>

            {/* Impact Section */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1 font-bold">Impact</p>
              <p className="text-xl font-bold text-yellow-700">{currentHabit.impact}</p>
            </div>
          </div>

          {/* Learn Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLearnHabit}
            className={`w-full py-4 rounded-xl text-xl font-bold transition-colors flex items-center justify-center gap-2 ${
              learnedHabits.has(currentHabit.habit)
                ? 'bg-green-500 text-white'
                : 'bg-teal-500 text-white hover:bg-teal-600'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            {learnedHabits.has(currentHabit.habit) ? 'Learned!' : 'Learn This Habit'}
            {learnedHabits.has(currentHabit.habit) && ' ⭐⭐⭐'}
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
              : 'bg-teal-500 text-white hover:bg-teal-600 hover:scale-105'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-center text-gray-600 font-semibold">
          {currentIndex + 1} / {habits.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === habits.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
            currentIndex === habits.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-teal-500 text-white hover:bg-teal-600 hover:scale-105'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <span className="font-bold">⭐ Learn good habits</span> to protect our planet and earn 3 stars each!
        </p>
      </div>

      {/* Confetti on completion */}
      {learnedHabits.size === 6 && (
        <motion.div
          variants={confetti}
          initial="initial"
          animate="animate"
          className="fixed inset-0 pointer-events-none"
        >
          <div className="text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            🎉🌍♻️💧
          </div>
        </motion.div>
      )}
    </div>
  );
}
