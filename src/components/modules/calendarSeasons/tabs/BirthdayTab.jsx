import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { months, daysOfWeek } from '../../../../data/calendarSeasonsData';

const BirthdayTab = () => {
  const [birthdayMonth, setBirthdayMonth] = useState(null);
  const [birthdayDay, setBirthdayDay] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (birthdayMonth && birthdayDay) {
      calculateCountdown();
    }
  }, [birthdayMonth, birthdayDay]);

  const calculateCountdown = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Create birthday date for this year
    let birthdayDate = new Date(currentYear, birthdayMonth - 1, birthdayDay);
    
    // If birthday already passed this year, use next year
    if (birthdayDate < today) {
      birthdayDate = new Date(currentYear + 1, birthdayMonth - 1, birthdayDay);
    }

    // Calculate days until birthday
    const timeDiff = birthdayDate - today;
    const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Check if it's today
    if (daysUntil === 0 || (today.getMonth() === birthdayMonth - 1 && today.getDate() === birthdayDay)) {
      setShowCelebration(true);
      playSound('success');
      speak('Happy Birthday! Today is your special day!');
    } else {
      setShowCelebration(false);
    }

    setCountdown({
      days: daysUntil,
      date: birthdayDate,
      dayOfWeek: daysOfWeek[birthdayDate.getDay()].name
    });
  };

  const handleMonthSelect = (month) => {
    playSound('click');
    setBirthdayMonth(month.number);
    setBirthdayDay(null);
    speak(`${month.name} selected`);
  };

  const handleDaySelect = (day) => {
    playSound('click');
    setBirthdayDay(day);
    const monthName = months.find(m => m.number === birthdayMonth).name;
    speak(`Your birthday is ${monthName} ${day}`);
  };

  const reset = () => {
    playSound('click');
    setBirthdayMonth(null);
    setBirthdayDay(null);
    setCountdown(null);
    setShowCelebration(false);
  };

  const speakCountdown = () => {
    if (!countdown) return;
    
    playSound('click');
    const monthName = months.find(m => m.number === birthdayMonth).name;
    
    if (countdown.days === 0) {
      speak('Happy Birthday! Today is your special day!');
    } else if (countdown.days === 1) {
      speak('Your birthday is tomorrow! Just one more day!');
    } else {
      speak(`There are ${countdown.days} days until your birthday on ${monthName} ${birthdayDay}!`);
    }
  };

  // Generate days for selected month
  const getDaysInMonth = () => {
    if (!birthdayMonth) return [];
    const month = months.find(m => m.number === birthdayMonth);
    return Array.from({ length: month.days }, (_, i) => i + 1);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-280px)] overflow-y-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          🎂 Birthday Countdown!
        </h2>
        <p className="text-xl text-white/90">
          Set your birthday and see how many days until your special day!
        </p>
      </div>

      {showCelebration && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="mb-6 p-8 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 rounded-3xl text-center shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-9xl mb-4"
          >
            🎉
          </motion.div>
          <h3 className="text-5xl font-bold text-white mb-3">HAPPY BIRTHDAY!</h3>
          <p className="text-2xl text-white">Today is your special day!</p>
          <motion.div
            className="mt-4 text-6xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🎂🎈🎁
          </motion.div>
        </motion.div>
      )}

      {countdown && !showCelebration && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 p-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-2xl"
        >
          <div className="text-center text-white">
            <div className="text-7xl mb-4">🎂</div>
            <h3 className="text-4xl font-bold mb-2">
              {countdown.days === 1 ? 'Tomorrow!' : `${countdown.days} Days`}
            </h3>
            <p className="text-2xl mb-3">
              until your birthday!
            </p>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mb-4">
              <p className="text-xl font-bold">
                {months.find(m => m.number === birthdayMonth).emoji} {months.find(m => m.number === birthdayMonth).name} {birthdayDay}
              </p>
              <p className="text-lg">
                {countdown.dayOfWeek}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={speakCountdown}
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              🔊 Hear Countdown
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Month Selection */}
        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            1️⃣ Choose Your Birth Month
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {months.map((month) => (
              <motion.button
                key={month.number}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMonthSelect(month)}
                className={`p-4 rounded-xl shadow-lg transition-all ${
                  birthdayMonth === month.number
                    ? `bg-gradient-to-br ${month.color} ring-4 ring-white scale-105`
                    : 'bg-white/90 backdrop-blur-md hover:bg-white'
                }`}
              >
                <div className="text-4xl mb-1">{month.emoji}</div>
                <div className={`font-bold text-sm ${
                  birthdayMonth === month.number ? 'text-white' : 'text-gray-700'
                }`}>
                  {month.short}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Day Selection */}
        {birthdayMonth && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              2️⃣ Choose Your Birth Day
            </h3>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
              <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto">
                {getDaysInMonth().map((day) => (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDaySelect(day)}
                    className={`aspect-square rounded-xl font-bold text-lg transition-all ${
                      birthdayDay === day
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg ring-4 ring-yellow-300 scale-110'
                        : 'bg-purple-50 text-gray-700 hover:bg-purple-100 hover:shadow-md'
                    }`}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Reset Button */}
        {birthdayMonth && (
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="px-8 py-4 bg-white/90 backdrop-blur-md text-purple-600 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
            >
              🔄 Choose Different Date
            </motion.button>
          </div>
        )}
      </div>

      {/* Fun Birthday Facts */}
      <div className="mt-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-600 mb-3 text-center">🎈 Birthday Fun Facts</h3>
        <div className="space-y-2">
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">🎂 Your birthday comes once every year - that's 365 days!</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">🎉 Everyone in the world has a birthday!</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">📅 Your birthday is always on the same date but different day of the week!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayTab;
