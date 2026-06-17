import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { shadowPuzzles, encouragement } from '../../../../data/shadowMatchData';
import { shuffleArray } from '../../../../utils/gameHelpers';

function MatchShadowTab() {
  const { addStars, logActivity } = useStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [puzzles, setPuzzles] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedShadow, setSelectedShadow] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const startGame = () => {
    playSound('click');
    const puzzleSet = shadowPuzzles[difficulty];
    const shuffled = shuffleArray([...puzzleSet]);
    setPuzzles(shuffled);
    setCurrentPuzzle(0);
    setScore(0);
    setSelectedShadow(null);
    setShowResult(false);
    setGameStarted(true);
    
    setTimeout(() => {
      speakEnglish(`Find the shadow of ${shuffled[0].object.name}`);
    }, 500);
  };

  const handleShadowSelect = (index) => {
    if (showResult) return;

    playSound('click');
    setSelectedShadow(index);
    setShowResult(true);

    const puzzle = puzzles[currentPuzzle];
    const isCorrect = index === puzzle.correctIndex;

    if (isCorrect) {
      playSound('correct');
      setScore(score + 1);
      addStars(3);
      playSound('star');
      const msg = encouragement[Math.floor(Math.random() * encouragement.length)];
      speakEnglish(msg);
      logActivity('Shadow Match', 'Match Shadow', `Matched ${puzzle.object.name} correctly`);
    } else {
      playSound('wrong');
      speakEnglish('Try again! Look carefully!');
    }
  };

  const handleNext = () => {
    playSound('click');
    cancelSpeech();

    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setSelectedShadow(null);
      setShowResult(false);
      
      setTimeout(() => {
        speakEnglish(`Find the shadow of ${puzzles[currentPuzzle + 1].object.name}`);
      }, 300);
    } else {
      setGameStarted(false);
      setTimeout(() => {
        speakEnglish(`Great job! You scored ${score + 1} out of ${puzzles.length}`);
      }, 500);
    }
  };

  if (!gameStarted && puzzles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {/* Instructions */}
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Match Shadows!</h3>
                <p className="text-gray-700">
                  Find the matching shadow for each object! 🕶️
                </p>
              </div>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Choose Difficulty
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => { setDifficulty('easy'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'easy'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🌟 Easy (3 shadows)
              </button>
              <button
                onClick={() => { setDifficulty('medium'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'medium'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                ⭐ Medium (4 shadows)
              </button>
              <button
                onClick={() => { setDifficulty('hard'); playSound('click'); }}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                  difficulty === 'hard'
                    ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🔥 Hard (5 shadows)
              </button>
            </div>

            <button
              onClick={startGame}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Start Matching! 🚀
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!gameStarted && puzzles.length > 0) {
    const percentage = (score / puzzles.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 pb-20">
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
            <div className="text-8xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Game Complete!</h2>
            
            <div className="text-6xl font-bold text-purple-400 my-6">
              {score}/{puzzles.length}
            </div>
            
            <p className="text-xl text-gray-300 mb-6">
              {percentage >= 80
                ? 'Perfect shadow matching! 🎉'
                : percentage >= 60
                ? 'Great job! Keep practicing! 👍'
                : 'Nice try! Practice more! 💪'}
            </p>

            <button
              onClick={() => { setPuzzles([]); setGameStarted(false); }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              🔄 Play Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-180px)] flex flex-col p-3">
      {/* Progress */}
      <motion.div
        className="flex-shrink-0 bg-gray-800 rounded-lg p-2 mb-3 shadow-lg"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-1 text-white text-sm">
          <span className="font-semibold">
            Puzzle {currentPuzzle + 1}/{puzzles.length}
          </span>
          <span className="font-bold text-purple-400">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPuzzle + 1) / puzzles.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Object to Match - Compact */}
      <motion.div
        className="flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl p-4 mb-3 shadow-xl text-center"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-white text-sm font-bold mb-2">Find the shadow of:</h3>
        <div className="text-6xl mb-1">{puzzle.object.emoji}</div>
        <div className="text-lg font-bold text-white">{puzzle.object.name}</div>
      </motion.div>

      {/* Shadow Options - Fit to screen */}
      <div className="flex-1 grid grid-cols-2 gap-3 content-center max-w-2xl mx-auto w-full">
        {puzzle.shadows.map((shadow, index) => {
          const isSelected = selectedShadow === index;
          const isCorrect = index === puzzle.correctIndex;
          const shouldHighlight = showResult && (isSelected || isCorrect);

          return (
            <motion.button
              key={index}
              onClick={() => handleShadowSelect(index)}
              disabled={showResult}
              className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                shouldHighlight
                  ? isCorrect
                    ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-2xl scale-105'
                    : 'bg-gradient-to-br from-red-500 to-red-600 shadow-2xl'
                  : 'bg-gray-800 hover:bg-gray-700'
              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={!showResult ? { scale: 1.05 } : {}}
              whileTap={!showResult ? { scale: 0.95 } : {}}
              style={{ filter: !shouldHighlight && showResult ? 'grayscale(100%) opacity(0.5)' : 'none' }}
            >
              <span className="text-7xl sm:text-8xl">{shadow}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      {showResult && (
        <motion.button
          onClick={handleNext}
          className="flex-shrink-0 mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {currentPuzzle < puzzles.length - 1 ? 'Next Puzzle →' : 'See Results 🏆'}
        </motion.button>
      )}
    </div>
  );
}

export default MatchShadowTab;
