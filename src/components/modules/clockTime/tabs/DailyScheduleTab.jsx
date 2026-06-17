import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Clock, CheckCircle, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';
import { dailyActivities } from '../../../../data/clockTimeData';

const DailyScheduleTab = () => {
  const { addStars, logActivity } = useStore();
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivityClick = (index) => {
    playSound('click');
    setSelectedActivity(index);
    const activity = dailyActivities[index];
    speakEnglish(`At ${activity.time}, it's time to ${activity.activity}. ${activity.description}`);
  };

  const handleCompleteActivity = (index) => {
    if (completedActivities.has(index)) return;
    
    playSound('correct');
    playSound('star');
    
    const newCompleted = new Set(completedActivities);
    newCompleted.add(index);
    setCompletedActivities(newCompleted);
    
    addStars(1);
    logActivity('Clock Time', 'Daily Schedule', `Completed: ${dailyActivities[index].activity}`);
    
    if (newCompleted.size === dailyActivities.length) {
      setTimeout(() => {
        speakEnglish('Congratulations! You completed the whole daily schedule!');
        addStars(5);
      }, 500);
    }
  };

  const resetSchedule = () => {
    playSound('click');
    setCompletedActivities(new Set());
    setSelectedActivity(null);
  };

  const completionPercentage = (completedActivities.size / dailyActivities.length) * 100;

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
            <p className="text-sm text-gray-600">Activities Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {completedActivities.size}/{dailyActivities.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round(completionPercentage)}%
            </p>
          </div>
          {completedActivities.size === dailyActivities.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetSchedule}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg"
            >
              Reset
            </motion.button>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            animate={{ width: `${completionPercentage}%` }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        variants={scaleIn}
        className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl p-6 shadow-xl text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-2">📅 My Daily Schedule</h2>
        <p className="text-xl text-white/90">Learn about daily activities and their times!</p>
      </motion.div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {dailyActivities.map((activity, index) => {
          const isCompleted = completedActivities.has(index);
          const isSelected = selectedActivity === index;

          return (
            <motion.div
              key={index}
              variants={isCompleted ? wiggle : scaleIn}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleActivityClick(index)}
              className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${
                isSelected ? 'ring-4 ring-blue-400' : ''
              } ${isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50' : ''}`}
            >
              <div className="flex items-center gap-6">
                {/* Time Badge */}
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-white mx-auto mb-1" />
                    <p className="text-white font-bold text-lg">{activity.time}</p>
                  </div>
                </div>

                {/* Activity Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl">{activity.emoji}</span>
                    <h3 className="text-2xl font-bold text-gray-800">{activity.activity}</h3>
                  </div>
                  <p className="text-lg text-gray-600">{activity.description}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                      speakEnglish(`At ${activity.time}, it's time to ${activity.activity}. ${activity.description}`);
                    }}
                    className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Volume2 className="w-6 h-6" />
                  </motion.button>

                  {!isCompleted ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompleteActivity(index);
                      }}
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.button>
                  ) : (
                    <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Completion Indicator */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-center gap-2 text-green-600 font-bold"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Completed!</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedActivities.size === dailyActivities.length && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-8 shadow-2xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-8xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-2">Amazing!</h2>
          <p className="text-2xl text-white/90">
            You completed the whole daily schedule!
          </p>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">About Daily Schedule:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>📅 Learn what activities happen at different times</li>
              <li>🔊 Click the speaker icon to hear about each activity</li>
              <li>✅ Mark activities as done to track your progress</li>
              <li>⭐ Complete all activities for bonus stars!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DailyScheduleTab;
