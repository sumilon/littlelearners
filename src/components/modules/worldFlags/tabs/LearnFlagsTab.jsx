import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, MapPin } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { worldCountries, continents } from '../../../../data/worldFlagsData';

function LearnFlagsTab() {
  const { addStars, logActivity } = useStore();
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [learnedCountries, setLearnedCountries] = useState(new Set());

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const handleContinentSelect = (continentName) => {
    playSound('click');
    setSelectedContinent(continentName);
    setSelectedCountry(null);
    cancelSpeech();
  };

  const handleCountryClick = (country) => {
    playSound('click');
    setSelectedCountry(country);
    
    const text = `${country.name}. Capital is ${country.capital}. ${country.fact}`;
    speakEnglish(text);

    if (!learnedCountries.has(country.id)) {
      setLearnedCountries(new Set([...learnedCountries, country.id]));
      addStars(2);
      playSound('star');
      logActivity('World Flags', 'Learn Flags', `Learned about ${country.name}`);
    }
  };

  const filteredCountries = selectedContinent === 'all'
    ? worldCountries
    : worldCountries.filter(c => c.continent === selectedContinent);

  const progressPercent = (learnedCountries.size / worldCountries.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 p-4 pb-20">
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
            <h3 className="font-bold text-lg text-gray-800 mb-2">Discover World Flags!</h3>
            <p className="text-gray-700">
              Select a continent, then tap on countries to learn about their flags and capitals! 🌍
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
          <span className="text-sm font-semibold text-gray-700">Countries Learned</span>
          <span className="text-sm font-bold text-blue-600">{learnedCountries.size}/{worldCountries.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Continent Filter */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <motion.button
            onClick={() => handleContinentSelect('all')}
            className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${
              selectedContinent === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                : 'bg-white text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌍 All Continents
          </motion.button>
          {continents.map((continent, index) => (
            <motion.button
              key={continent.name}
              onClick={() => handleContinentSelect(continent.name)}
              className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${
                selectedContinent === continent.name
                  ? `bg-gradient-to-r ${continent.color} text-white`
                  : 'bg-white text-gray-700'
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {continent.emoji} {continent.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {filteredCountries.map((country, index) => {
          const isLearned = learnedCountries.has(country.id);
          const isSelected = selectedCountry?.id === country.id;

          return (
            <motion.button
              key={country.id}
              onClick={() => handleCountryClick(country)}
              className={`p-4 rounded-xl shadow-lg transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-500 to-green-500 text-white scale-105'
                  : isLearned
                  ? 'bg-gradient-to-br from-green-100 to-green-200 text-gray-800'
                  : 'bg-white text-gray-800'
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-2">{country.flag}</div>
              <div className="font-bold text-sm mb-1">{country.name}</div>
              <div className="text-xs opacity-80">{country.continent}</div>
              {isLearned && !isSelected && (
                <div className="text-xs text-green-600 font-semibold mt-1">✓ Learned</div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Country Details */}
      {selectedCountry && (
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-xl p-6 shadow-xl"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-7xl">{selectedCountry.flag}</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-1">{selectedCountry.name}</h3>
              <p className="text-blue-100 text-sm">Tap to hear again! 🔊</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-80">Capital City</div>
                <div className="font-bold text-lg">{selectedCountry.capital}</div>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
              <Globe className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-80">Continent</div>
                <div className="font-bold text-lg">{selectedCountry.continent}</div>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedCountry.emoji}</span>
                <div className="text-xs opacity-80 font-semibold">Fun Fact</div>
              </div>
              <p className="text-lg font-medium">{selectedCountry.fact}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Completion Message */}
      {learnedCountries.size === worldCountries.length && (
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-6 mt-6 shadow-xl text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="text-6xl mb-3">🌟</div>
          <h3 className="text-2xl font-bold mb-2">World Explorer!</h3>
          <p className="text-lg">You learned about all {worldCountries.length} countries!</p>
        </motion.div>
      )}
    </div>
  );
}

export default LearnFlagsTab;
