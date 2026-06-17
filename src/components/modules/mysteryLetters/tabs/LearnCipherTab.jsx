import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { emojiCipher, cipherCategories } from '../../../../data/mysteryLettersData';

const LearnCipherTab = ({ onBadgeEarned }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [viewedLetters, setViewedLetters] = useState(new Set());

  const alphabet = Object.keys(emojiCipher).sort();

  const handleLetterClick = (letter) => {
    playSound('click');
    setSelectedLetter(letter);
    const cipher = emojiCipher[letter];
    speak(`${letter} for ${cipher.name}. The emoji is ${cipher.emoji}`);
    
    const newViewed = new Set([...viewedLetters, letter]);
    setViewedLetters(newViewed);

    // Check for alphabet master badge
    if (newViewed.size === 26 && onBadgeEarned) {
      onBadgeEarned('alphabet-master');
    }
  };

  const handleCategorySelect = (category) => {
    playSound('click');
    setSelectedCategory(category);
    setSelectedLetter(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toUpperCase());
    setSelectedLetter(null);
  };

  // Filter letters based on category and search
  const filteredLetters = alphabet.filter(letter => {
    // Search filter
    if (searchQuery && !letter.includes(searchQuery) && 
        !emojiCipher[letter].name.toUpperCase().includes(searchQuery)) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const categoryLetters = cipherCategories[selectedCategory]?.letters || [];
      return categoryLetters.includes(letter);
    }

    return true;
  });

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-2">
            📖 Learn the Secret Cipher
          </h2>
          <p className="text-xl text-white/80">
            Master all 26 emoji codes to become a cipher expert!
          </p>
          
          {/* Progress Badge */}
          <motion.div
            className="inline-block bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 mt-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-white/80 text-sm">Letters Learned</div>
            <div className="text-3xl font-bold text-white">
              {viewedLetters.size} / 26
            </div>
            <div className="bg-white/20 rounded-full h-2 mt-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${(viewedLetters.size / 26) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a letter or emoji name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/60 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-white/80" />
            <span className="text-white/80 font-bold">Filter by:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <motion.button
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All (26)
            </motion.button>
            {Object.entries(cipherCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  selectedCategory === key
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name} ({category.letters.length})
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cipher Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-6">
          {filteredLetters.map((letter, index) => {
            const cipher = emojiCipher[letter];
            const isViewed = viewedLetters.has(letter);
            const isSelected = selectedLetter === letter;

            return (
              <motion.button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                className={`relative rounded-2xl p-4 shadow-lg transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 scale-105'
                    : 'bg-white/20 backdrop-blur-md hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="text-6xl mb-2"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.1
                  }}
                >
                  {cipher.emoji}
                </motion.div>
                <div className={`text-2xl font-bold ${isSelected ? 'text-gray-900' : 'text-white'}`}>
                  {letter}
                </div>
                <div className={`text-xs ${isSelected ? 'text-gray-800' : 'text-white/90'}`}>
                  {cipher.name}
                </div>

                {/* Viewed Badge */}
                {isViewed && !isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }}
                    className="absolute top-2 right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* No Results */}
        {filteredLetters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-2xl font-bold text-white mb-2">No matches found</div>
            <div className="text-white/80">Try a different search or filter</div>
          </motion.div>
        )}

        {/* Selected Letter Detail */}
        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  className="text-9xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {emojiCipher[selectedLetter].emoji}
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-6xl font-bold text-white mb-4">
                    {selectedLetter}
                  </h3>
                  <div className="text-3xl text-white/90 mb-6">
                    = {emojiCipher[selectedLetter].name}
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">How to Remember:</h4>
                    <p className="text-lg text-white/90 leading-relaxed">
                      <strong>{selectedLetter}</strong> is for{' '}
                      <strong className="text-yellow-300">{emojiCipher[selectedLetter].name}</strong>!
                      <br />
                      Think: "{emojiCipher[selectedLetter].name}" starts with the letter{' '}
                      <strong className="text-yellow-300">{selectedLetter}</strong>.
                    </p>
                  </div>

                  <motion.button
                    onClick={() => setSelectedLetter(null)}
                    className="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips Section */}
        {!selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-blue-500/20 backdrop-blur-md rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              💡 Learning Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-white font-bold mb-1">Tip #1</div>
                <div className="text-white/80 text-sm">
                  The first letter of each emoji's name matches the letter it represents!
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">📚</div>
                <div className="text-white font-bold mb-1">Tip #2</div>
                <div className="text-white/80 text-sm">
                  Click on each emoji to hear its name and see the letter connection!
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">🔄</div>
                <div className="text-white font-bold mb-1">Tip #3</div>
                <div className="text-white/80 text-sm">
                  Practice makes perfect! Review the cipher before decoding messages.
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-white font-bold mb-1">Tip #4</div>
                <div className="text-white/80 text-sm">
                  View all 26 letters to unlock the Alphabet Master badge!
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearnCipherTab;
