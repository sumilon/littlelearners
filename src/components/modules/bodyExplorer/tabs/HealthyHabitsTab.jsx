import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, CheckCircle, XCircle } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { healthyHabits } from '../../../../data/bodyExplorerData';

function HealthyHabitsTab() {
  const { addStars, logActivity } = useStore();
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [checkedHabits, setCheckedHabits] = useState(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const handleHabitClick = (habit) => {
    playSound('click');
    setSelectedHabit(habit);
    speakEnglish(`${habit.habit}. ${habit.description}`);
  };

  const handleToggleCheck = (habitId) => {
    const newChecked = new Set(checkedHabits);
    
    if (newChecked.has(habitId)) {
      newChecked.delete(habitId);
      playSound('click');
    } else {
      newChecked.add(habitId);
      playSound('correct');
      addStars(2);
      playSound('star');
      
      const habit = healthyHabits.find(h => h.id === habitId);
      logActivity('Body Explorer', 'Healthy Habits', `Committed to: ${habit.habit}`);

      if (newChecked.size === healthyHabits.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }

    setCheckedHabits(newChecked);
  };

  const progressPercent = (checkedHabits.size / healthyHabits.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 p-4 pb-20">
      {/* Instructions */}
      <motion.div
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Build Healthy Habits!</h3>
            <p className="text-gray-700">
              Tap on each habit to learn about it, then check it off to commit! 💪
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="bg-white rounded-xl p-4 mb-6 shadow-lg"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Habits Committed</span>
          <span className="text-sm font-bold text-green-600">{checkedHabits.size}/{healthyHabits.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-teal-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Habits List */}
      <div className="space-y-3 mb-6">
        {healthyHabits.map((habit, index) => {
          const isChecked = checkedHabits.has(habit.id);
          const isSelected = selectedHabit?.id === habit.id;

          return (
            <motion.div
              key={habit.id}
              className={`rounded-xl shadow-lg overflow-hidden transition-all ${
                isSelected
                  ? 'ring-4 ring-green-500'
                  : ''
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <div
                onClick={() => handleHabitClick(habit)}
                className={`p-4 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-gradient-to-r from-green-400 to-teal-400 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{habit.emoji}</div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${isChecked ? 'text-white' : 'text-gray-800'}`}>
                      {habit.habit}
                    </h3>
                    <p className={`text-sm ${isChecked ? 'text-white/90' : 'text-gray-600'}`}>
                      {habit.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCheck(habit.id);
                    }}
                    className={`p-2 rounded-full transition-all ${
                      isChecked
                        ? 'bg-white/30 hover:bg-white/40'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Habit Detail */}
      {selectedHabit && (
        <motion.div
          className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-xl p-6 shadow-xl mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{selectedHabit.emoji}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{selectedHabit.habit}</h3>
              <p className="text-sm text-green-100">Tap to hear again! 🔊</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-lg font-medium">{selectedHabit.description}</p>
          </div>
        </motion.div>
      )}

      {/* Completion Message */}
      {checkedHabits.size === healthyHabits.length && (
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-6 shadow-xl text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="text-6xl mb-3">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Super Healthy!</h3>
          <p className="text-lg mb-2">You committed to all healthy habits!</p>
          <p className="text-sm opacity-90">Keep practicing them every day! 💪</p>
        </motion.div>
      )}

      {/* Confetti Effect */}
      {showConfetti && (
        <motion.div
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: 1,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 1.5,
                ease: 'easeOut'
              }}
            >
              {['🎉', '⭐', '💪', '❤️', '✨'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default HealthyHabitsTab;
