import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, confetti } from '../../../../utils/animationUtils';
import { oddOneOutPuzzles, categories } from '../../../../data/oddOneOutData';

const CategoryChallengeTab = () => {
  const { addStars, logActivity } = useStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [categoryPuzzles, setCategoryPuzzles] = useState([]);

  const startChallenge = (category) => {
    playSound('click');
    
    // Gather all puzzles from all difficulties
    const allPuzzles = [
      ...oddOneOutPuzzles.easy,
      ...oddOneOutPuzzles.medium,
      ...oddOneOutPuzzles.hard
    ];

    // Filter by category name (loose matching)
    const filteredPuzzles = allPuzzles.filter(p => 
      p.category.toLowerCase().includes(category.name.toLowerCase()) ||
      category.name.toLowerCase().includes(p.category.toLowerCase())
    );

    if (filteredPuzzles.length === 0) {
      // If no exact category match, use all puzzles shuffled
      const shuffled = [...allPuzzles].sort(() => Math.random() - 0.5).slice(0, 5);
      setCategoryPuzzles(shuffled);
      setTotalQuestions(shuffled.length);
    } else {
      setCategoryPuzzles(filteredPuzzles);
      setTotalQuestions(filteredPuzzles.length);
    }

    setSelectedCategory(category);
    setCurrentPuzzleIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setChallengeComplete(false);

    speakEnglish(`Starting ${category.name} challenge!`);
  };

  const handleAnswerClick = (item) => {
    if (showResult) return;

    playSound('click');
    setSelectedAnswer(item);
    setShowResult(true);

    const puzzle = categoryPuzzles[currentPuzzleIndex];
    const isCorrect = item === puzzle.oddOne;

    if (isCorrect) {
      playSound('correct');
      playSound('star');
      speakEnglish('Correct!');
      setScore(score + 1);
    } else {
      playSound('wrong');
      speakEnglish(`Wrong! ${puzzle.explanation}`);
    }
  };

  const handleNext = () => {
    playSound('click');

    if (currentPuzzleIndex < categoryPuzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      setChallengeComplete(true);
      
      const percentage = (score / totalQuestions) * 100;
      let stars = 0;
      if (percentage >= 80) stars = 5;
      else if (percentage >= 60) stars = 4;
      else if (percentage >= 40) stars = 3;
      else if (percentage >= 20) stars = 2;
      else stars = 1;

      addStars(stars);
      playSound('star');
      logActivity('Odd One Out', 'Category Challenge', `${selectedCategory.name}: ${score}/${totalQuestions}`);
      speakEnglish(`Challenge complete! You scored ${score} out of ${totalQuestions}!`);
    }
  };

  const resetChallenge = () => {
    playSound('click');
    setSelectedCategory(null);
    setChallengeComplete(false);
  };

  if (challengeComplete) {
    const percentage = (score / totalQuestions) * 100;

    return (
      <motion.div
        variants={confetti}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div
          variants={scaleIn}
          className={`bg-gradient-to-br ${selectedCategory.color} rounded-3xl p-12 shadow-2xl text-center`}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-9xl mb-6"
          >
            {selectedCategory.emoji}
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-4">Challenge Complete!</h2>
          <div className="text-8xl font-bold text-white mb-4">
            {score}/{totalQuestions}
          </div>
          <div className="text-3xl font-semibold text-white/90 mb-8">
            {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Great Job!' : percentage >= 40 ? 'Good Try!' : 'Keep Practicing!'}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetChallenge}
            className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
          >
            <RotateCcw className="w-8 h-8" />
            Choose Another Category
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  if (!selectedCategory) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            Choose a Category Challenge
          </h2>
          <p className="text-lg text-gray-600">Select a category to test your skills!</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startChallenge(category)}
              className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all`}
            >
              <div className="text-7xl mb-4">{category.emoji}</div>
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </motion.button>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          variants={fadeIn}
          className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-yellow-900 mb-2">Category Challenge:</h3>
              <ul className="text-yellow-800 space-y-1">
                <li>🎯 Choose a category you want to practice</li>
                <li>🧩 Solve all puzzles in that category</li>
                <li>🏆 Score high to earn more stars!</li>
                <li>⭐ Each category has unique challenges!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const puzzle = categoryPuzzles[currentPuzzleIndex];
  const shuffledItems = [...puzzle.items].sort(() => Math.random() - 0.5);

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Progress */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{selectedCategory.emoji}</span>
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="text-2xl font-bold text-purple-600">{selectedCategory.name}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {currentPuzzleIndex + 1}/{totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-3xl font-bold text-green-600">{score}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            animate={{ width: `${((currentPuzzleIndex + 1) / totalQuestions) * 100}%` }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
          />
        </div>
      </motion.div>

      {/* Puzzle */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Which one is different?
        </h3>
        <p className="text-xl text-center text-gray-600 mb-8">Category: {puzzle.category}</p>

        {/* Items */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
          {shuffledItems.map((item, index) => {
            const isOddOne = item === puzzle.oddOne;
            const isSelected = item === selectedAnswer;
            const isCorrect = showResult && isOddOne;
            const isWrong = isSelected && !isOddOne && showResult;

            return (
              <motion.button
                key={index}
                whileHover={{ scale: showResult ? 1 : 1.05 }}
                whileTap={{ scale: showResult ? 1 : 0.95 }}
                onClick={() => handleAnswerClick(item)}
                disabled={showResult}
                className={`aspect-square rounded-3xl p-8 text-8xl shadow-xl transition-all ${
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

        {/* Explanation */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className={`border-4 rounded-2xl p-6 text-center ${
              selectedAnswer === puzzle.oddOne
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400'
                : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-400'
            }`}>
              <p className="text-2xl font-bold mb-2">
                {selectedAnswer === puzzle.oddOne ? '✅ Correct!' : '❌ Wrong!'}
              </p>
              <p className="text-xl">{puzzle.explanation}</p>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
              >
                {currentPuzzleIndex < categoryPuzzles.length - 1 ? 'Next Puzzle' : 'Finish Challenge'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CategoryChallengeTab;
