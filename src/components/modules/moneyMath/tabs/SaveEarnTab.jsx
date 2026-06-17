import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PiggyBank, TrendingUp } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { savingGoals, earnMoneyActivities, moneyLessons } from '../../../../data/moneyMathData';

function SaveEarnTab() {
  const { addStars, logActivity } = useStore();
  const [savings, setSavings] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(savingGoals[0]);
  const [completedActivities, setCompletedActivities] = useState(new Set());

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const handleActivityComplete = (activity) => {
    if (completedActivities.has(activity.activity)) {
      playSound('click');
      speakEnglish('You already did this activity today!');
      return;
    }

    playSound('correct');
    const newSavings = savings + activity.earn;
    setSavings(newSavings);
    setCompletedActivities(new Set([...completedActivities, activity.activity]));
    
    addStars(2);
    playSound('star');
    speakEnglish(`Great! You earned ${activity.earn} rupees. Total savings: ${newSavings} rupees`);
    logActivity('Money Math', 'Save & Earn', `Earned ₹${activity.earn} from ${activity.activity}`);

    // Check if goal reached
    if (newSavings >= selectedGoal.cost) {
      setTimeout(() => {
        playSound('star');
        speakEnglish(`Congratulations! You saved enough for ${selectedGoal.name}!`);
      }, 1500);
    }
  };

  const handleGoalSelect = (goal) => {
    playSound('click');
    setSelectedGoal(goal);
    speakEnglish(`New goal: ${goal.name}. You need ${goal.cost} rupees`);
  };

  const handleReset = () => {
    playSound('click');
    setSavings(0);
    setCompletedActivities(new Set());
    speakEnglish('Savings reset! Start earning again!');
  };

  const progress = Math.min((savings / selectedGoal.cost) * 100, 100);
  const goalReached = savings >= selectedGoal.cost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 p-4 pb-20">
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
            <h3 className="font-bold text-lg text-gray-800 mb-2">Save Money!</h3>
            <p className="text-gray-700">
              Complete activities to earn money and reach your savings goal! 🏦
            </p>
          </div>
        </div>
      </motion.div>

      {/* Savings Display */}
      <motion.div
        className="bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-xl p-6 mb-6 shadow-xl"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-4 mb-4">
          <PiggyBank className="w-12 h-12" />
          <div className="flex-1">
            <div className="text-sm opacity-90 mb-1">Your Savings</div>
            <div className="text-4xl font-bold">₹{savings}</div>
          </div>
        </div>

        <div className="bg-white/20 rounded-lg p-3 mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Goal: {selectedGoal.name}</span>
            <span className="text-sm font-bold">₹{selectedGoal.cost}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-center mt-1 opacity-90">
            {goalReached ? 'Goal Reached! 🎉' : `₹${selectedGoal.cost - savings} more needed`}
          </div>
        </div>

        {goalReached && (
          <motion.div
            className="bg-white/20 rounded-lg p-3 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-bold">You can buy {selectedGoal.name}!</p>
          </motion.div>
        )}
      </motion.div>

      {/* Saving Goals */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Choose Your Goal:
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {savingGoals.map((goal, index) => (
            <motion.button
              key={goal.name}
              onClick={() => handleGoalSelect(goal)}
              className={`p-4 rounded-xl shadow-lg transition-all ${
                selectedGoal.name === goal.name
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105'
                  : 'bg-white text-gray-800'
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-2">{goal.emoji}</div>
              <div className="font-bold text-sm mb-1">{goal.name}</div>
              <div className="text-xs opacity-80">₹{goal.cost}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Earn Money Activities */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3">Earn Money:</h3>
        <div className="space-y-2">
          {earnMoneyActivities.map((activity, index) => {
            const isDone = completedActivities.has(activity.activity);
            
            return (
              <motion.button
                key={activity.activity}
                onClick={() => handleActivityComplete(activity)}
                disabled={isDone}
                className={`w-full p-4 rounded-xl shadow-lg transition-all ${
                  isDone
                    ? 'bg-green-200 opacity-60 cursor-not-allowed'
                    : 'bg-white hover:scale-105'
                }`}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                custom={index}
                whileTap={!isDone ? { scale: 0.95 } : {}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activity.emoji}</span>
                    <span className="font-bold text-gray-800">{activity.activity}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+₹{activity.earn}</div>
                    {isDone && <div className="text-xs text-green-700">✓ Done</div>}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Money Lessons */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3">Money Lessons:</h3>
        <div className="space-y-2">
          {moneyLessons.map((lesson, index) => (
            <motion.div
              key={lesson.title}
              className="bg-white rounded-xl p-4 shadow-lg"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{lesson.emoji}</span>
                <div>
                  <div className="font-bold text-gray-800">{lesson.title}</div>
                  <div className="text-sm text-gray-600">{lesson.lesson}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <motion.button
        onClick={handleReset}
        className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        Reset Savings 🔄
      </motion.button>
    </div>
  );
}

export default SaveEarnTab;
