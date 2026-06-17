import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Play, Save, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';

const CreateOwnTab = () => {
  const { addStars, logActivity } = useStore();
  const [items, setItems] = useState(['', '', '', '']);
  const [oddOneIndex, setOddOneIndex] = useState(null);
  const [category, setCategory] = useState('');
  const [explanation, setExplanation] = useState('');
  const [savedPuzzles, setSavedPuzzles] = useState([]);
  const [playMode, setPlayMode] = useState(false);
  const [currentPlayPuzzle, setCurrentPlayPuzzle] = useState(0);
  const [showPlayResult, setShowPlayResult] = useState(false);
  const [selectedPlayAnswer, setSelectedPlayAnswer] = useState(null);

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    if (items.length < 6) {
      playSound('click');
      setItems([...items, '']);
    }
  };

  const handleRemoveItem = (index) => {
    if (items.length > 4) {
      playSound('click');
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      if (oddOneIndex === index) setOddOneIndex(null);
      else if (oddOneIndex > index) setOddOneIndex(oddOneIndex - 1);
    }
  };

  const handleSetOddOne = (index) => {
    playSound('click');
    setOddOneIndex(index);
  };

  const handleSavePuzzle = () => {
    const filledItems = items.filter(item => item.trim() !== '');
    
    if (filledItems.length < 4) {
      speakEnglish('Please add at least 4 items');
      playSound('wrong');
      return;
    }

    if (oddOneIndex === null) {
      speakEnglish('Please select which one is different');
      playSound('wrong');
      return;
    }

    if (!category.trim()) {
      speakEnglish('Please add a category name');
      playSound('wrong');
      return;
    }

    playSound('correct');
    playSound('star');
    speakEnglish('Puzzle saved!');

    const newPuzzle = {
      items: filledItems,
      oddOne: filledItems[oddOneIndex],
      category: category.trim(),
      explanation: explanation.trim() || 'This one is different!',
      id: Date.now()
    };

    setSavedPuzzles([...savedPuzzles, newPuzzle]);
    addStars(3);
    logActivity('Odd One Out', 'Create Own', `Created: ${category}`);

    // Reset form
    setItems(['', '', '', '']);
    setOddOneIndex(null);
    setCategory('');
    setExplanation('');
  };

  const handlePlayPuzzles = () => {
    if (savedPuzzles.length === 0) {
      speakEnglish('Create some puzzles first!');
      playSound('wrong');
      return;
    }

    playSound('click');
    setPlayMode(true);
    setCurrentPlayPuzzle(0);
    setShowPlayResult(false);
    setSelectedPlayAnswer(null);
  };

  const handlePlayAnswer = (item) => {
    if (showPlayResult) return;

    playSound('click');
    setSelectedPlayAnswer(item);
    setShowPlayResult(true);

    const puzzle = savedPuzzles[currentPlayPuzzle];
    const isCorrect = item === puzzle.oddOne;

    if (isCorrect) {
      playSound('correct');
      speakEnglish(`Correct! ${puzzle.explanation}`);
    } else {
      playSound('wrong');
      speakEnglish(`Wrong! ${puzzle.explanation}`);
    }
  };

  const handleNextPlayPuzzle = () => {
    playSound('click');
    if (currentPlayPuzzle < savedPuzzles.length - 1) {
      setCurrentPlayPuzzle(currentPlayPuzzle + 1);
      setShowPlayResult(false);
      setSelectedPlayAnswer(null);
    } else {
      setPlayMode(false);
      speakEnglish('You finished all your puzzles!');
    }
  };

  const handleDeletePuzzle = (index) => {
    playSound('click');
    setSavedPuzzles(savedPuzzles.filter((_, i) => i !== index));
  };

  if (playMode) {
    const puzzle = savedPuzzles[currentPlayPuzzle];
    const shuffledItems = [...puzzle.items].sort(() => Math.random() - 0.5);

    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Playing Your Puzzles</p>
              <p className="text-3xl font-bold text-purple-600">
                {currentPlayPuzzle + 1}/{savedPuzzles.length}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPlayMode(false)}
              className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold shadow-lg"
            >
              Exit Play Mode
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Which one is different?
          </h3>
          <p className="text-xl text-center text-gray-600 mb-8">Category: {puzzle.category}</p>

          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
            {shuffledItems.map((item, index) => {
              const isOddOne = item === puzzle.oddOne;
              const isSelected = item === selectedPlayAnswer;
              const isCorrect = showPlayResult && isOddOne;
              const isWrong = isSelected && !isOddOne && showPlayResult;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: showPlayResult ? 1 : 1.05 }}
                  whileTap={{ scale: showPlayResult ? 1 : 0.95 }}
                  onClick={() => handlePlayAnswer(item)}
                  disabled={showPlayResult}
                  className={`aspect-square rounded-3xl p-6 text-6xl shadow-xl transition-all break-words ${
                    isCorrect
                      ? 'bg-gradient-to-br from-green-400 to-emerald-400 ring-4 ring-green-300'
                      : isWrong
                      ? 'bg-gradient-to-br from-red-400 to-pink-400 ring-4 ring-red-300'
                      : 'bg-gradient-to-br from-purple-100 to-pink-100 hover:shadow-2xl'
                  }`}
                >
                  {item}
                </motion.button>
              );
            })}
          </div>

          {showPlayResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={`border-4 rounded-2xl p-6 text-center ${
                selectedPlayAnswer === puzzle.oddOne
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400'
                  : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-400'
              }`}>
                <p className="text-2xl font-bold mb-2">
                  {selectedPlayAnswer === puzzle.oddOne ? '✅ Correct!' : '❌ Wrong!'}
                </p>
                <p className="text-xl">{puzzle.explanation}</p>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextPlayPuzzle}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {currentPlayPuzzle < savedPuzzles.length - 1 ? 'Next Puzzle' : 'Finish'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Create Puzzle Form */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center">
          Create Your Own Puzzle
        </h2>

        {/* Category Input */}
        <div className="mb-6">
          <label className="block text-xl font-bold text-gray-700 mb-2">Category Name:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Animals, Colors, Foods..."
            className="w-full px-4 py-3 border-4 border-purple-300 rounded-xl text-xl focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Items Input */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-xl font-bold text-gray-700">Items (4-6):</label>
            {items.length < 6 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddItem}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder={`Item ${index + 1} (emoji or text)`}
                  className="w-full px-4 py-3 border-4 border-gray-300 rounded-xl text-lg focus:outline-none focus:border-purple-400"
                />
                <div className="flex gap-2 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetOddOne(index)}
                    className={`flex-1 px-3 py-2 rounded-lg font-bold transition-all ${
                      oddOneIndex === index
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {oddOneIndex === index ? '⭐ Odd One' : 'Set as Odd'}
                  </motion.button>
                  {items.length > 4 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemoveItem(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation Input */}
        <div className="mb-6">
          <label className="block text-xl font-bold text-gray-700 mb-2">Explanation (optional):</label>
          <input
            type="text"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="e.g., Cat is the only pet!"
            className="w-full px-4 py-3 border-4 border-purple-300 rounded-xl text-xl focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSavePuzzle}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
        >
          <Save className="w-8 h-8" />
          Save Puzzle
        </motion.button>
      </motion.div>

      {/* Saved Puzzles */}
      {savedPuzzles.length > 0 && (
        <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Your Puzzles ({savedPuzzles.length})
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPuzzles}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Play All
            </motion.button>
          </div>

          <div className="space-y-4">
            {savedPuzzles.map((puzzle, index) => (
              <motion.div
                key={puzzle.id}
                variants={wiggle}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-2xl font-bold text-purple-800">{puzzle.category}</h4>
                    <p className="text-gray-600">{puzzle.explanation}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeletePuzzle(index)}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {puzzle.items.map((item, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 rounded-lg font-bold ${
                        item === puzzle.oddOne
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
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
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Create Your Own Puzzles:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>✏️ Add 4-6 items (emojis or words work great!)</li>
              <li>⭐ Select which one is the odd one out</li>
              <li>📝 Give your puzzle a category name</li>
              <li>💾 Save and play your custom puzzles!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateOwnTab;
