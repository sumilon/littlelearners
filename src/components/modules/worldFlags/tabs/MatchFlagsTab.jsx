import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, Clock } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';
import { worldCountries } from '../../../../data/worldFlagsData';
import { shuffleArray } from '../../../../utils/gameHelpers';

// Helper component to display flag with both emoji and image
const FlagDisplay = ({ flag, countryId, size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-4xl',
    medium: 'text-5xl',
    large: 'text-6xl'
  };
  
  const imageSizes = {
    small: 'w-20 h-12',
    medium: 'w-24 h-16',
    large: 'w-28 h-18'
  };
  
  // Map country IDs to ISO 3166-1 alpha-2 codes for flag images
  const countryCodeMap = {
    'india': 'in',
    'usa': 'us',
    'china': 'cn',
    'uk': 'gb',
    'japan': 'jp',
    'france': 'fr',
    'germany': 'de',
    'brazil': 'br',
    'australia': 'au',
    'canada': 'ca',
    'russia': 'ru',
    'italy': 'it',
    'spain': 'es',
    'mexico': 'mx',
    'egypt': 'eg',
    'south-africa': 'za',
    'south-korea': 'kr',
    'argentina': 'ar',
    'thailand': 'th',
    'greece': 'gr'
  };
  
  const countryCode = countryCodeMap[countryId];
  
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {/* Flag image from flagcdn */}
      {countryCode && (
        <img 
          src={`https://flagcdn.com/w80/${countryCode}.png`}
          alt={`Flag of ${countryId}`}
          className={`${imageSizes[size]} object-cover rounded shadow-sm`}
          loading="lazy"
        />
      )}
      {/* Fallback emoji if image fails */}
      <span className={`${sizeClasses[size]} leading-none`}>{flag}</span>
    </div>
  );
};

function MatchFlagsTab() {
  const { addStars, logActivity } = useStore();
  const [gameState, setGameState] = useState('setup'); // setup, playing, complete
  const [difficulty, setDifficulty] = useState('easy');
  const [pairs, setPairs] = useState([]);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      cancelSpeech();
    };
  }, [gameState]);

  const getDifficultyConfig = () => {
    switch (difficulty) {
      case 'easy':
        return { pairs: 4, time: 60 };
      case 'medium':
        return { pairs: 6, time: 90 };
      case 'hard':
        return { pairs: 8, time: 120 };
      default:
        return { pairs: 4, time: 60 };
    }
  };

  const startGame = () => {
    playSound('click');
    const config = getDifficultyConfig();
    
    // Select random countries
    const shuffled = shuffleArray([...worldCountries]);
    const selected = shuffled.slice(0, config.pairs);
    
    // Create flags and names arrays
    const flags = shuffleArray(selected.map((c, i) => ({ id: `flag-${i}`, countryId: c.id, flag: c.flag, type: 'flag' })));
    const names = shuffleArray(selected.map((c, i) => ({ id: `name-${i}`, countryId: c.id, name: c.name, type: 'name' })));
    
    setPairs(selected);
    setSelectedFlags(flags);
    setSelectedNames(names);
    setMatchedPairs(new Set());
    setScore(0);
    setTimer(0);
    setGameState('playing');
    
    speakEnglish('Match the flags with their country names!');
  };

  const [selectedFlagCard, setSelectedFlagCard] = useState(null);
  const [selectedNameCard, setSelectedNameCard] = useState(null);

  const handleFlagClick = (flagItem) => {
    if (matchedPairs.has(flagItem.countryId)) return;
    
    playSound('click');
    setSelectedFlagCard(flagItem);
    
    // Check if name is already selected
    if (selectedNameCard) {
      checkMatch(flagItem, selectedNameCard);
    }
  };

  const handleNameClick = (nameItem) => {
    if (matchedPairs.has(nameItem.countryId)) return;
    
    playSound('click');
    setSelectedNameCard(nameItem);
    
    // Check if flag is already selected
    if (selectedFlagCard) {
      checkMatch(selectedFlagCard, nameItem);
    }
  };

  const checkMatch = (flagItem, nameItem) => {
    if (flagItem.countryId === nameItem.countryId) {
      // Correct match!
      playSound('correct');
      const newMatched = new Set([...matchedPairs, flagItem.countryId]);
      setMatchedPairs(newMatched);
      setScore(score + 10);
      addStars(3);
      playSound('star');
      
      const country = pairs.find(p => p.id === flagItem.countryId);
      speakEnglish(`Correct! ${country.name}!`);
      logActivity('World Flags', 'Match Flags', `Matched ${country.name}`);
      
      setSelectedFlagCard(null);
      setSelectedNameCard(null);
      
      // Check if all matched
      if (newMatched.size === pairs.length) {
        setTimeout(() => {
          setGameState('complete');
          speakEnglish(`Amazing! You matched all flags in ${timer} seconds!`);
        }, 1000);
      }
    } else {
      // Wrong match
      playSound('wrong');
      speakEnglish('Try again!');
      
      setTimeout(() => {
        setSelectedFlagCard(null);
        setSelectedNameCard(null);
      }, 1000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Match Flags Game! 🎯
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Match country flags with their names!
            </p>

            <div className="space-y-3">
              <button
                onClick={() => { setDifficulty('easy'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'easy'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌟 Easy (4 pairs)
              </button>
              <button
                onClick={() => { setDifficulty('medium'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'medium'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⭐ Medium (6 pairs)
              </button>
              <button
                onClick={() => { setDifficulty('hard'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'hard'
                    ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔥 Hard (8 pairs)
              </button>
            </div>

            <button
              onClick={startGame}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Start Game! 🚀
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Complete Screen
  if (gameState === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <motion.div
              className="text-8xl mb-4"
              variants={wiggle}
              initial="hidden"
              animate="visible"
            >
              🏆
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Perfect Match!</h2>
            
            <div className="space-y-3 mb-6">
              <div className="bg-blue-100 rounded-lg p-4">
                <div className="text-sm text-gray-600">Score</div>
                <div className="text-3xl font-bold text-blue-600">{score} points</div>
              </div>
              <div className="bg-green-100 rounded-lg p-4">
                <div className="text-sm text-gray-600">Time</div>
                <div className="text-3xl font-bold text-green-600">{formatTime(timer)}</div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <div className="text-sm text-gray-600">Difficulty</div>
                <div className="text-2xl font-bold text-purple-600 capitalize">{difficulty}</div>
              </div>
            </div>

            <button
              onClick={() => setGameState('setup')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
              <RotateCcw className="w-6 h-6" />
              Play Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 pb-20">
      {/* Instructions */}
      <motion.div
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-4 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Match Them!</h3>
            <p className="text-sm text-gray-700">
              Tap a flag, then tap its matching country name! 🎯
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status Bar */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 shadow">
          <div className="text-xs text-gray-600 mb-1">Score</div>
          <div className="text-2xl font-bold text-blue-600">{score}</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow">
          <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Time
          </div>
          <div className="text-2xl font-bold text-green-600">{formatTime(timer)}</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow">
          <div className="text-xs text-gray-600 mb-1">Matched</div>
          <div className="text-2xl font-bold text-purple-600">{matchedPairs.size}/{pairs.length}</div>
        </div>
      </div>

      {/* Flags Column */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-700 mb-3">Flags:</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {selectedFlags.map((flagItem, index) => {
            const isMatched = matchedPairs.has(flagItem.countryId);
            const isSelected = selectedFlagCard?.id === flagItem.id;
            
            return (
              <motion.button
                key={flagItem.id}
                onClick={() => handleFlagClick(flagItem)}
                disabled={isMatched}
                className={`aspect-square rounded-lg font-bold transition-all flex items-center justify-center p-1 ${
                  isMatched
                    ? 'bg-green-200 opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-gradient-to-br from-blue-400 to-purple-400 scale-110 shadow-lg'
                    : 'bg-white hover:scale-105 shadow'
                }`}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={!isMatched ? { scale: 1.05, y: -3 } : {}}
                whileTap={!isMatched ? { scale: 0.95 } : {}}
              >
                <FlagDisplay flag={flagItem.flag} countryId={flagItem.countryId} size="small" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Names Column */}
      <div>
        <h3 className="font-bold text-gray-700 mb-3">Countries:</h3>
        <div className="grid grid-cols-3 gap-2">
          {selectedNames.map((nameItem, index) => {
            const isMatched = matchedPairs.has(nameItem.countryId);
            const isSelected = selectedNameCard?.id === nameItem.id;
            
            return (
              <motion.button
                key={nameItem.id}
                onClick={() => handleNameClick(nameItem)}
                disabled={isMatched}
                className={`p-2 rounded-lg font-bold text-sm transition-all ${
                  isMatched
                    ? 'bg-green-200 opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white scale-105 shadow-lg'
                    : 'bg-white text-gray-800 hover:scale-105 shadow'
                }`}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
              >
                {nameItem.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MatchFlagsTab;
