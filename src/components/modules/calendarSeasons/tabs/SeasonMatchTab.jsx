import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { seasons, months } from '../../../../data/calendarSeasonsData';

const SeasonMatchTab = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSeasonClick = (season) => {
    playSound('click');
    setSelectedSeason(season);
    setSelectedMonths([]);
    setShowFeedback(false);
    speak(`${season.name}! Pick the months that belong to ${season.name}`);
  };

  const handleMonthClick = (month) => {
    if (!selectedSeason) {
      playSound('error');
      speak('Please select a season first!');
      return;
    }

    playSound('click');

    if (selectedMonths.includes(month.name)) {
      // Deselect
      setSelectedMonths(selectedMonths.filter(m => m !== month.name));
    } else {
      // Select
      setSelectedMonths([...selectedMonths, month.name]);
    }
  };

  const checkMatches = () => {
    if (!selectedSeason || selectedMonths.length === 0) {
      playSound('error');
      speak('Please select a season and some months first!');
      return;
    }

    const correctSeasonMonths = selectedSeason.months;
    const allCorrect = selectedMonths.every(m => correctSeasonMonths.includes(m)) &&
                       selectedMonths.length === correctSeasonMonths.length;

    if (allCorrect) {
      playSound('success');
      setCorrectMatches([...correctMatches, selectedSeason.name]);
      speak(`Perfect! You matched all the ${selectedSeason.name} months correctly!`);
      setShowFeedback(true);
      
      // Reset after celebration
      setTimeout(() => {
        setSelectedSeason(null);
        setSelectedMonths([]);
        setShowFeedback(false);
      }, 3000);
    } else {
      playSound('error');
      const correct = selectedMonths.filter(m => correctSeasonMonths.includes(m));
      speak(`Not quite! You got ${correct.length} out of ${correctSeasonMonths.length} correct. Try again!`);
    }
  };

  const resetGame = () => {
    playSound('click');
    setSelectedSeason(null);
    setSelectedMonths([]);
    setCorrectMatches([]);
    setShowFeedback(false);
  };

  const speakSeason = (season) => {
    playSound('click');
    speak(`${season.name}. ${season.description}. Activities: ${season.activities.join(', ')}`);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-280px)] overflow-y-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          🌸 Match Months to Seasons!
        </h2>
        <p className="text-xl text-white/90">
          {selectedSeason ? `Select all months that belong to ${selectedSeason.name}` : 'Choose a season to start'}
        </p>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="mb-6 p-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl text-center shadow-2xl"
        >
          <div className="text-6xl mb-3">🎉</div>
          <h3 className="text-3xl font-bold text-white mb-2">Perfect Match!</h3>
          <p className="text-xl text-white">You matched all {selectedSeason.name} months!</p>
        </motion.div>
      )}

      {/* Progress Tracker */}
      {correctMatches.length > 0 && (
        <div className="mb-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600 mb-2">
              ✓ Completed Seasons: {correctMatches.length} / 4
            </p>
            <div className="flex justify-center gap-2">
              {correctMatches.map((seasonName, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-bold">
                  {seasons.find(s => s.name === seasonName)?.emoji} {seasonName}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Seasons Selection */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white text-center mb-4">1️⃣ Choose a Season</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {seasons.map((season, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSeasonClick(season)}
              onDoubleClick={() => speakSeason(season)}
              className={`p-6 rounded-2xl shadow-lg transition-all ${
                selectedSeason?.name === season.name
                  ? `bg-gradient-to-br ${season.color} ring-4 ring-white shadow-2xl scale-105`
                  : `bg-white/90 backdrop-blur-md hover:bg-white`
              } ${
                correctMatches.includes(season.name) ? 'ring-4 ring-green-400' : ''
              }`}
            >
              <div className="text-6xl mb-2">{season.emoji}</div>
              <div className={`font-bold text-xl ${
                selectedSeason?.name === season.name ? 'text-white' : 'text-gray-700'
              }`}>
                {season.name}
              </div>
              {correctMatches.includes(season.name) && (
                <div className="mt-2 text-2xl">✓</div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Months Selection */}
      {selectedSeason && (
        <>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              2️⃣ Select {selectedSeason.name} Months ({selectedMonths.length} selected)
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {months.map((month, index) => {
                const isSelected = selectedMonths.includes(month.name);
                const isCorrect = selectedSeason.months.includes(month.name);
                
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMonthClick(month)}
                    className={`p-4 rounded-xl shadow-lg transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'bg-gradient-to-br from-green-400 to-emerald-400 ring-2 ring-green-300'
                          : 'bg-gradient-to-br from-purple-400 to-pink-400 ring-2 ring-purple-300'
                        : 'bg-white/90 backdrop-blur-md hover:bg-white'
                    }`}
                  >
                    <div className="text-4xl mb-1">{month.emoji}</div>
                    <div className={`font-bold text-sm ${
                      isSelected ? 'text-white' : 'text-gray-700'
                    }`}>
                      {month.short}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Check Button */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={checkMatches}
              disabled={selectedMonths.length === 0}
              className="px-8 py-4 bg-gradient-to-br from-green-400 to-emerald-400 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✓ Check My Answer
            </motion.button>
          </div>
        </>
      )}

      {/* Reset Button */}
      {correctMatches.length === 4 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-6 text-center"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Amazing! You completed all seasons!
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
          >
            🔄 Play Again
          </motion.button>
        </motion.div>
      )}

      {/* Hint Card */}
      <div className="mt-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-600 mb-3 text-center">💡 Season Hints</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {seasons.map((season, index) => (
            <div key={index} className="p-3 bg-purple-50 rounded-lg text-center">
              <div className="text-3xl mb-1">{season.emoji}</div>
              <div className="font-bold text-purple-600 text-sm">{season.name}</div>
              <div className="text-xs text-gray-600">{season.months.length} months</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonMatchTab;
