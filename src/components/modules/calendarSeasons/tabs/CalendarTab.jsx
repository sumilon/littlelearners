import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { daysOfWeek, months, daysQuiz, calendarFacts } from '../../../../data/calendarSeasonsData';

const CalendarTab = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

  // Get the first day of the month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = months[currentMonth].days;

  // Generate calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleDateClick = (day) => {
    if (!day) return;
    playSound('click');
    setSelectedDate(day);
    
    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
    const dayName = daysOfWeek[dayOfWeek].name;
    
    if (day === today) {
      speak(`Today is ${dayName}, ${months[currentMonth].name} ${day}`);
    } else {
      speak(`${dayName}, ${months[currentMonth].name} ${day}`);
    }
  };

  const startQuiz = () => {
    playSound('click');
    setQuizMode(true);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (answer) => {
    const correct = daysQuiz[currentQuestion].correct === answer;
    
    if (correct) {
      playSound('success');
      setScore(score + 1);
      speak('Correct!');
    } else {
      playSound('error');
      speak(`Not quite! The answer is ${daysQuiz[currentQuestion].correct}`);
    }

    setTimeout(() => {
      if (currentQuestion < daysQuiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    playSound('click');
    setQuizMode(false);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const speakFact = (fact) => {
    playSound('click');
    speak(fact);
  };

  if (quizMode) {
    if (showResult) {
      return (
        <div className="min-h-[50vh] max-h-[calc(100vh-280px)] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">
              {score === daysQuiz.length ? '🏆' : score >= daysQuiz.length / 2 ? '🌟' : '📚'}
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Quiz Complete!
            </h2>
            <p className="text-3xl text-white mb-8">
              You got {score} out of {daysQuiz.length} correct!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
            >
              Back to Calendar
            </motion.button>
          </motion.div>
        </div>
      );
    }

    const question = daysQuiz[currentQuestion];

    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-280px)] flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <div className="text-2xl text-white/80 mb-4">
            Question {currentQuestion + 1} of {daysQuiz.length}
          </div>
          <h2 className="text-3xl font-bold text-white mb-8">{question.question}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(option)}
              className="p-6 bg-white/90 backdrop-blur-md rounded-2xl font-bold text-xl text-purple-600 shadow-lg hover:shadow-xl transition-all"
            >
              {option}
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
          >
            Exit Quiz
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-280px)] overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-purple-600 mb-2">
                {months[currentMonth].emoji} {months[currentMonth].name} {currentYear}
              </h2>
              <p className="text-gray-600">{months[currentMonth].description}</p>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className={`text-center p-3 rounded-lg bg-gradient-to-br ${day.color} text-white font-bold shadow-md`}
                >
                  <div className="text-2xl mb-1">{day.emoji}</div>
                  <div className="text-xs">{day.short}</div>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <motion.button
                  key={index}
                  whileHover={day ? { scale: 1.1 } : {}}
                  whileTap={day ? { scale: 0.95 } : {}}
                  onClick={() => handleDateClick(day)}
                  disabled={!day}
                  className={`aspect-square rounded-xl font-bold text-lg transition-all ${
                    !day
                      ? 'invisible'
                      : day === today
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg ring-4 ring-yellow-300 scale-110'
                      : day === selectedDate
                      ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {day}
                </motion.button>
              ))}
            </div>

            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-purple-100 rounded-xl text-center"
              >
                <p className="text-lg font-bold text-purple-600">
                  {selectedDate === today ? '🌟 Today!' : `Selected: ${months[currentMonth].name} ${selectedDate}`}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Quiz Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startQuiz}
            className="w-full p-6 bg-gradient-to-br from-green-400 to-emerald-400 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-4xl mb-2">🎯</div>
            Days of the Week Quiz
          </motion.button>

          {/* Fun Facts */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
            <h3 className="text-xl font-bold text-purple-600 mb-3 text-center">
              📚 Calendar Facts
            </h3>
            <div className="space-y-2">
              {calendarFacts.slice(0, 5).map((fact, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => speakFact(fact)}
                  className="w-full p-3 bg-purple-50 rounded-xl text-left text-sm font-medium text-gray-700 hover:bg-purple-100 transition-all"
                >
                  {fact}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Today Info */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg text-center">
            <div className="text-5xl mb-2">📅</div>
            <p className="text-lg font-bold text-purple-600">Today is:</p>
            <p className="text-2xl font-bold text-gray-700">
              {daysOfWeek[currentDate.getDay()].name}
            </p>
            <p className="text-xl text-gray-600">
              {months[currentMonth].name} {today}, {currentYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTab;
