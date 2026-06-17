import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, CheckCircle, RotateCcw } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { weatherTypes, temperatureRanges } from '../../../../data/weatherStationData';

const TemperatureGameTab = () => {
  const [temperature, setTemperature] = useState(50);
  const [targetWeather, setTargetWeather] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    generateNewChallenge();
  }, []);

  const generateNewChallenge = () => {
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    setTargetWeather(randomWeather);
    setTemperature(50);
    setHasChecked(false);
    speak(`What temperature do you think it is during ${randomWeather.name} weather?`);
  };

  const getTempRange = (temp) => {
    return temperatureRanges.find(range => temp >= range.min && temp <= range.max);
  };

  const getCorrectTempRange = (weatherType) => {
    switch (weatherType) {
      case 'hot':
        return { min: 75, max: 100 };
      case 'warm':
        return { min: 65, max: 85 };
      case 'mild':
        return { min: 50, max: 70 };
      case 'cool':
        return { min: 35, max: 60 };
      case 'cold':
        return { min: 0, max: 40 };
      default:
        return { min: 40, max: 80 };
    }
  };

  const handleTemperatureChange = (e) => {
    const newTemp = parseInt(e.target.value);
    setTemperature(newTemp);
    playSound('click');
  };

  const handleCheck = () => {
    if (hasChecked) return;
    
    playSound('click');

    const correctRange = getCorrectTempRange(targetWeather.temperature);
    const isInRange = temperature >= correctRange.min && temperature <= correctRange.max;

    setIsCorrect(isInRange);
    setShowFeedback(true);

    if (isInRange) {
      playSound('success');
      setScore(score + 1);
      setHasChecked(true);
      speak(`Perfect! ${targetWeather.name} weather is usually around ${temperature} degrees!`);
      
      setTimeout(() => {
        if (round < 5) {
          setRound(round + 1);
          setShowFeedback(false);
          generateNewChallenge();
        }
      }, 2500);
    } else {
      playSound('error');
      const midpoint = Math.floor((correctRange.min + correctRange.max) / 2);
      speak(`Not quite! ${targetWeather.name} weather is usually ${temperature > midpoint ? 'cooler' : 'warmer'} than that. Try again!`);
      
      // Allow user to try again - hide feedback after a moment
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    playSound('click');
    setScore(0);
    setRound(1);
    setShowFeedback(false);
    generateNewChallenge();
  };

  const currentTempRange = getTempRange(temperature);
  const thermometerHeight = temperature;

  if (round > 5) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold text-white mb-4">Great Job!</h2>
          <p className="text-2xl text-white/90 mb-2">You scored {score} out of 5</p>
          <p className="text-xl text-white/80 mb-6">You understand temperatures!</p>
          <motion.button
            onClick={handleReset}
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="inline mr-2" />
            Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!targetWeather) return null;

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
            <span className="text-white font-bold text-lg">
              Round {round}/5
            </span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
            <span className="text-white font-bold text-lg">
              ⭐ Score: {score}
            </span>
          </div>
        </div>

        {/* Challenge Display */}
        <motion.div
          key={round}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-br ${targetWeather.backgroundColor} rounded-3xl p-8 mb-6 shadow-2xl`}
        >
          <div className="text-center">
            <motion.div
              className="text-9xl mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: targetWeather.id === 'windy' ? [-5, 5, -5] : 0
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {targetWeather.emoji}
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{targetWeather.name} Weather</h2>
            <p className="text-xl text-gray-700 mb-4">
              Move the slider to guess the temperature!
            </p>
          </div>
        </motion.div>

        {/* Temperature Control */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thermometer Visualization */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-96 bg-white/20 rounded-full p-4 flex flex-col justify-end">
                {/* Temperature Scale */}
                <div className="absolute left-full ml-4 top-0 bottom-0 flex flex-col justify-between text-white font-bold">
                  <span>100°</span>
                  <span>75°</span>
                  <span>50°</span>
                  <span>25°</span>
                  <span>0°</span>
                </div>

                {/* Mercury */}
                <motion.div
                  className={`w-full rounded-full bg-gradient-to-t ${
                    currentTempRange.color === 'red-400' ? 'from-red-400 to-orange-500' :
                    currentTempRange.color === 'yellow-400' ? 'from-yellow-400 to-orange-400' :
                    currentTempRange.color === 'green-400' ? 'from-green-400 to-blue-400' :
                    currentTempRange.color === 'blue-400' ? 'from-blue-400 to-cyan-400' :
                    'from-blue-500 to-blue-600'
                  }`}
                  animate={{ height: `${thermometerHeight}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />

                {/* Bulb */}
                <motion.div
                  className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${
                    currentTempRange.color === 'red-400' ? 'from-red-400 to-orange-500' :
                    currentTempRange.color === 'yellow-400' ? 'from-yellow-400 to-orange-400' :
                    currentTempRange.color === 'green-400' ? 'from-green-400 to-blue-400' :
                    currentTempRange.color === 'blue-400' ? 'from-blue-400 to-cyan-400' :
                    'from-blue-500 to-blue-600'
                  } shadow-lg`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>

              <div className="mt-8 text-center">
                <div className="text-6xl mb-2">{currentTempRange.emoji}</div>
                <p className="text-2xl font-bold text-white">{temperature}°F</p>
                <p className="text-lg text-white/80">{currentTempRange.label}</p>
              </div>
            </div>

            {/* Slider Control */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Thermometer className="w-6 h-6" />
                  Adjust Temperature
                </h3>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={temperature}
                  onChange={handleTemperatureChange}
                  disabled={hasChecked && isCorrect}
                  className="w-full h-4 bg-white/30 rounded-lg appearance-none cursor-pointer slider mb-6"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #10b981 25%, #fbbf24 50%, #f59e0b 75%, #ef4444 100%)`
                  }}
                />

                <div className="grid grid-cols-5 gap-2 text-center text-sm text-white/70 mb-6">
                  <div>🥶<br/>Cold</div>
                  <div>❄️<br/>Cool</div>
                  <div>😊<br/>Mild</div>
                  <div>☀️<br/>Warm</div>
                  <div>🔥<br/>Hot</div>
                </div>

                <motion.button
                  onClick={handleCheck}
                  disabled={hasChecked && isCorrect}
                  className={`w-full py-4 rounded-2xl font-bold text-xl ${
                    hasChecked && isCorrect
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  whileHover={!(hasChecked && isCorrect) ? { scale: 1.02 } : {}}
                  whileTap={!(hasChecked && isCorrect) ? { scale: 0.98 } : {}}
                >
                  <CheckCircle className="inline mr-2" />
                  Check Answer
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 ${
                isCorrect ? 'bg-green-500' : 'bg-orange-500'
              } text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl z-50`}
            >
              {isCorrect ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✅</span>
                  <span>Perfect temperature guess!</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🤔</span>
                  <span>Try adjusting the temperature!</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TemperatureGameTab;
