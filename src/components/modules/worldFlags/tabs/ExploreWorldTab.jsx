import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Landmark, Users } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { worldCountries, landmarks, culturalFacts, continents } from '../../../../data/worldFlagsData';

function ExploreWorldTab() {
  const { addStars, logActivity } = useStore();
  const [selectedView, setSelectedView] = useState('continents'); // continents, landmarks, culture
  const [selectedItem, setSelectedItem] = useState(null);
  const [exploredItems, setExploredItems] = useState(new Set());

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const handleViewChange = (view) => {
    playSound('click');
    setSelectedView(view);
    setSelectedItem(null);
    cancelSpeech();
  };

  const handleContinentClick = (continent) => {
    playSound('click');
    setSelectedItem({ type: 'continent', data: continent });
    
    const countriesInContinent = worldCountries.filter(c => c.continent === continent.name);
    const text = `${continent.name} has ${countriesInContinent.length} countries in our list`;
    speakEnglish(text);

    const key = `continent-${continent.name}`;
    if (!exploredItems.has(key)) {
      setExploredItems(new Set([...exploredItems, key]));
      addStars(2);
      playSound('star');
      logActivity('World Flags', 'Explore World', `Explored ${continent.name}`);
    }
  };

  const handleLandmarkClick = (landmark) => {
    playSound('click');
    setSelectedItem({ type: 'landmark', data: landmark });
    speakEnglish(`${landmark.landmark} in ${landmark.country}. ${landmark.description}`);

    const key = `landmark-${landmark.landmark}`;
    if (!exploredItems.has(key)) {
      setExploredItems(new Set([...exploredItems, key]));
      addStars(2);
      playSound('star');
      logActivity('World Flags', 'Explore World', `Learned about ${landmark.landmark}`);
    }
  };

  const handleCultureClick = (culture) => {
    playSound('click');
    setSelectedItem({ type: 'culture', data: culture });
    speakEnglish(`${culture.country}. ${culture.fact}`);

    const key = `culture-${culture.country}`;
    if (!exploredItems.has(key)) {
      setExploredItems(new Set([...exploredItems, key]));
      addStars(2);
      playSound('star');
      logActivity('World Flags', 'Explore World', `Learned about ${culture.country} culture`);
    }
  };

  const renderContinentsView = () => {
    return (
      <div className="space-y-4">
        {continents.map((continent, index) => {
          const countriesInContinent = worldCountries.filter(c => c.continent === continent.name);
          const isExplored = exploredItems.has(`continent-${continent.name}`);
          const isSelected = selectedItem?.data?.name === continent.name;

          return (
            <motion.button
              key={continent.name}
              onClick={() => handleContinentClick(continent)}
              className={`w-full p-6 rounded-xl shadow-lg transition-all ${
                isSelected
                  ? `bg-gradient-to-r ${continent.color} text-white scale-105`
                  : isExplored
                  ? 'bg-gradient-to-br from-green-100 to-green-200 text-gray-800'
                  : 'bg-white text-gray-800'
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{continent.emoji}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold mb-1">{continent.name}</h3>
                  <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                    {countriesInContinent.length} countries
                  </p>
                  {isExplored && !isSelected && (
                    <span className="text-xs text-green-600 font-semibold">✓ Explored</span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Selected Continent Details */}
        {selectedItem?.type === 'continent' && (
          <motion.div
            className={`bg-gradient-to-r ${selectedItem.data.color} text-white rounded-xl p-6 shadow-xl`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-bold mb-4">Countries in {selectedItem.data.name}:</h3>
            <div className="grid grid-cols-2 gap-2">
              {worldCountries
                .filter(c => c.continent === selectedItem.data.name)
                .map(country => (
                  <div key={country.id} className="bg-white/20 rounded-lg p-2 text-center">
                    <div className="text-3xl mb-1">{country.flag}</div>
                    <div className="text-sm font-semibold">{country.name}</div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const renderLandmarksView = () => {
    return (
      <div className="space-y-4">
        {landmarks.map((landmark, index) => {
          const isExplored = exploredItems.has(`landmark-${landmark.landmark}`);
          const isSelected = selectedItem?.data?.landmark === landmark.landmark;

          return (
            <motion.button
              key={landmark.landmark}
              onClick={() => handleLandmarkClick(landmark)}
              className={`w-full p-5 rounded-xl shadow-lg transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white scale-105'
                  : isExplored
                  ? 'bg-gradient-to-br from-green-100 to-green-200 text-gray-800'
                  : 'bg-white text-gray-800'
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{landmark.emoji}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold">{landmark.landmark}</h3>
                  <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                    {landmark.country}
                  </p>
                  {isExplored && !isSelected && (
                    <span className="text-xs text-green-600 font-semibold">✓ Explored</span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Selected Landmark Details */}
        {selectedItem?.type === 'landmark' && (
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl p-6 shadow-xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{selectedItem.data.emoji}</div>
              <div>
                <h3 className="text-2xl font-bold">{selectedItem.data.landmark}</h3>
                <p className="text-sm opacity-90">{selectedItem.data.country}</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-lg font-medium">{selectedItem.data.description}</p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const renderCultureView = () => {
    return (
      <div className="space-y-4">
        {culturalFacts.map((culture, index) => {
          const country = worldCountries.find(c => c.name === culture.country);
          const isExplored = exploredItems.has(`culture-${culture.country}`);
          const isSelected = selectedItem?.data?.country === culture.country;

          return (
            <motion.button
              key={culture.country}
              onClick={() => handleCultureClick(culture)}
              className={`w-full p-5 rounded-xl shadow-lg transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white scale-105'
                  : isExplored
                  ? 'bg-gradient-to-br from-green-100 to-green-200 text-gray-800'
                  : 'bg-white text-gray-800'
              }`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{country?.flag || culture.emoji}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold mb-1">{culture.country}</h3>
                  <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                    Tap to learn cultural fact!
                  </p>
                  {isExplored && !isSelected && (
                    <span className="text-xs text-green-600 font-semibold">✓ Explored</span>
                  )}
                </div>
                <div className="text-3xl">{culture.emoji}</div>
              </div>
            </motion.button>
          );
        })}

        {/* Selected Culture Details */}
        {selectedItem?.type === 'culture' && (
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-xl p-6 shadow-xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{selectedItem.data.emoji}</div>
              <div>
                <h3 className="text-2xl font-bold">{selectedItem.data.country}</h3>
                <p className="text-sm opacity-90">Cultural Fact</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-lg font-medium leading-relaxed">{selectedItem.data.fact}</p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-100 to-green-100 p-4 pb-20">
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
            <h3 className="font-bold text-lg text-gray-800 mb-2">Explore Our World!</h3>
            <p className="text-gray-700">
              Learn about continents, famous landmarks, and cultural facts! 🗺️
            </p>
          </div>
        </div>
      </motion.div>

      {/* View Selector */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.button
          onClick={() => handleViewChange('continents')}
          className={`p-4 rounded-xl shadow-lg transition-all ${
            selectedView === 'continents'
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white scale-105'
              : 'bg-white text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MapPin className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-bold">Continents</div>
        </motion.button>

        <motion.button
          onClick={() => handleViewChange('landmarks')}
          className={`p-4 rounded-xl shadow-lg transition-all ${
            selectedView === 'landmarks'
              ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white scale-105'
              : 'bg-white text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Landmark className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-bold">Landmarks</div>
        </motion.button>

        <motion.button
          onClick={() => handleViewChange('culture')}
          className={`p-4 rounded-xl shadow-lg transition-all ${
            selectedView === 'culture'
              ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white scale-105'
              : 'bg-white text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-bold">Culture</div>
        </motion.button>
      </div>

      {/* Content */}
      {selectedView === 'continents' && renderContinentsView()}
      {selectedView === 'landmarks' && renderLandmarksView()}
      {selectedView === 'culture' && renderCultureView()}
    </div>
  );
}

export default ExploreWorldTab;
