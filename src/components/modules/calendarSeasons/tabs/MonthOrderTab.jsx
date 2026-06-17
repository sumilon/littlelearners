import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { months } from '../../../../data/calendarSeasonsData';

const MonthOrderTab = () => {
  const [shuffledMonths, setShuffledMonths] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Shuffle months
    const shuffled = [...months].sort(() => Math.random() - 0.5);
    setShuffledMonths(shuffled);
    setIsComplete(false);
    playSound('click');
  };

  const handleDragStart = (index) => {
    setDraggedItem(index);
    playSound('click');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedItem === null) return;

    const newMonths = [...shuffledMonths];
    const draggedMonth = newMonths[draggedItem];
    
    // Remove from old position
    newMonths.splice(draggedItem, 1);
    // Insert at new position
    newMonths.splice(dropIndex, 0, draggedMonth);

    setShuffledMonths(newMonths);
    setDraggedItem(null);
    playSound('click');

    // Check if correct order
    const isCorrect = newMonths.every((month, index) => month.number === index + 1);
    if (isCorrect) {
      setIsComplete(true);
      playSound('success');
      speak('Amazing! You put all the months in the correct order!');
    }
  };

  const checkOrder = () => {
    const isCorrect = shuffledMonths.every((month, index) => month.number === index + 1);
    if (isCorrect) {
      playSound('success');
      setIsComplete(true);
      speak('Perfect! All months are in the right order!');
    } else {
      playSound('error');
      speak('Not quite right. Keep trying!');
    }
  };

  const speakMonth = (month) => {
    playSound('click');
    speak(`${month.name} is month number ${month.number}. ${month.description}`);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-280px)] overflow-y-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          🗓️ Put the Months in Order!
        </h2>
        <p className="text-xl text-white/90">
          Drag the months to arrange them from January to December
        </p>
      </div>

      {isComplete && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="mb-6 p-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl text-center shadow-2xl"
        >
          <div className="text-6xl mb-3">🎉</div>
          <h3 className="text-3xl font-bold text-white mb-2">Perfect Order!</h3>
          <p className="text-xl text-white">All 12 months are correct!</p>
        </motion.div>
      )}

      {/* Months Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {shuffledMonths.map((month, index) => (
          <motion.div
            key={month.number}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => speakMonth(month)}
            className={`relative p-4 bg-gradient-to-br ${month.color} rounded-2xl shadow-lg cursor-move hover:shadow-xl transition-all ${
              draggedItem === index ? 'opacity-50' : ''
            } ${
              isComplete && month.number === index + 1 ? 'ring-4 ring-yellow-300' : ''
            }`}
          >
            {/* Order number badge */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-purple-600 shadow-md">
              {index + 1}
            </div>

            {/* Month emoji */}
            <div className="text-5xl mb-2 text-center">{month.emoji}</div>

            {/* Month name */}
            <div className="text-center">
              <div className="font-bold text-white text-lg mb-1">{month.name}</div>
              <div className="text-white/80 text-sm">{month.days} days</div>
              <div className="text-white/80 text-xs mt-1">{month.season}</div>
            </div>

            {/* Correct indicator */}
            {month.number === index + 1 && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                ✓
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkOrder}
          className="px-8 py-4 bg-gradient-to-br from-green-400 to-emerald-400 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
        >
          ✓ Check Order
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="px-8 py-4 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
        >
          🔄 Shuffle Again
        </motion.button>
      </div>

      {/* Hint Section */}
      <div className="mt-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-600 mb-3 text-center">💡 Helpful Hints</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-2 bg-purple-50 rounded-lg">
            <div className="font-bold text-purple-600">January</div>
            <div className="text-sm text-gray-600">1st month</div>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg">
            <div className="font-bold text-purple-600">April</div>
            <div className="text-sm text-gray-600">4th month</div>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg">
            <div className="font-bold text-purple-600">July</div>
            <div className="text-sm text-gray-600">7th month</div>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg">
            <div className="font-bold text-purple-600">December</div>
            <div className="text-sm text-gray-600">12th month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthOrderTab;
