import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, Star } from 'lucide-react';
import { matras, matraWords } from '../../../../data/hindiData';
import { speakHindi } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, correctAnswer, wrongAnswer } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';
import { shuffle } from '../../../../utils/gameHelpers';

const MatrasTab = () => {
  const [selectedMatra, setSelectedMatra] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const handleMatraSelect = (matra) => {
    playSound('click');
    setSelectedMatra(matra);
    setCurrentWordIndex(0);
    setShowResult(null);
    setScore(0);
    setAttempts(0);
    
    // Speak the matra name
    speakHindi(matra.name);
  };

  const checkAnswer = (word) => {
    const isCorrect = selectedMatra && word.includes(selectedMatra.matra);
    setShowResult(isCorrect ? 'correct' : 'wrong');
    setAttempts(attempts + 1);

    if (isCorrect) {
      playSound('correct');
      setScore(score + 1);
      addStars(2);
      logActivity('hindi', 'matras', `Correct matra identification: ${word}`);
      
      // Move to next word after delay
      setTimeout(() => {
        const words = matraWords[selectedMatra.sound];
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setShowResult(null);
        } else {
          // Completed all words for this matra
          setShowResult('completed');
        }
      }, 1500);
    } else {
      playSound('wrong');
      setTimeout(() => setShowResult(null), 1000);
    }
  };

  const getCurrentWords = () => {
    if (!selectedMatra) return [];
    const correctWords = matraWords[selectedMatra.sound] || [];
    // Mix with some random wrong words
    const allMatraSounds = Object.keys(matraWords).filter(s => s !== selectedMatra.sound);
    const wrongWords = shuffle(
      allMatraSounds.flatMap(sound => matraWords[sound]).slice(0, 2)
    );
    return shuffle([...correctWords.slice(currentWordIndex, currentWordIndex + 1), ...wrongWords.slice(0, 2)]);
  };

  const words = getCurrentWords();
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Matra Selection Grid */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Choose a Matra to Practice
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {matras.map((matra) => (
            <motion.button
              key={matra.matra}
              onClick={() => handleMatraSelect(matra)}
              className={`
                relative p-6 rounded-xl font-bold text-2xl transition-all
                ${selectedMatra?.matra === matra.matra
                  ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-xl scale-105'
                  : 'bg-gradient-to-br from-orange-100 to-pink-100 text-orange-800 hover:shadow-lg'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-2">{matra.matra}</div>
              <div className="text-sm">{matra.name}</div>
              <div className="text-xs mt-1 opacity-75">Example: {matra.example}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Practice Area */}
      <AnimatePresence mode="wait">
        {selectedMatra && showResult !== 'completed' && (
          <motion.div
            className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-2xl shadow-xl p-8"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Score Display */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-bold text-gray-700">
                Score: {score} / {attempts}
              </div>
              <div className="text-lg font-bold text-orange-600">
                Accuracy: {accuracy}%
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-orange-700 mb-4">
              Find words with <span className="text-5xl mx-2">{selectedMatra.matra}</span> matra
            </h3>

            {/* Word Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {words.map((word, index) => (
                <motion.button
                  key={`${word}-${index}`}
                  onClick={() => checkAnswer(word)}
                  disabled={showResult !== null}
                  className="relative px-8 py-6 bg-white rounded-xl font-bold text-4xl text-orange-600 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: showResult ? 1 : 1.05 }}
                  whileTap={{ scale: showResult ? 1 : 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {word}
                  
                  {/* Result indicator */}
                  {showResult && word.includes(selectedMatra.matra) && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-green-500/90 rounded-xl"
                      variants={correctAnswer}
                      initial="hidden"
                      animate="visible"
                    >
                      <CheckCircle size={48} className="text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showResult === 'correct' && (
                <motion.div
                  className="mt-6 p-4 bg-green-500 text-white rounded-xl text-center font-bold text-xl"
                  variants={correctAnswer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <CheckCircle size={32} className="inline mr-2" />
                  शाबाश! (Excellent!) +2 stars ⭐
                </motion.div>
              )}
              
              {showResult === 'wrong' && (
                <motion.div
                  className="mt-6 p-4 bg-red-500 text-white rounded-xl text-center font-bold text-xl"
                  variants={wrongAnswer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <XCircle size={32} className="inline mr-2" />
                  Try Again!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Listen to Matra */}
            <motion.button
              onClick={() => {
                playSound('click');
                speakHindi(selectedMatra.example);
              }}
              className="mt-6 mx-auto flex items-center gap-3 px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 size={24} />
              <span>Listen to Example: {selectedMatra.example}</span>
            </motion.button>
          </motion.div>
        )}

        {/* Completion Message */}
        {showResult === 'completed' && (
          <motion.div
            className="bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 rounded-2xl shadow-2xl p-12 text-center"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              बधाई हो! (Congratulations!)
            </h2>
            <p className="text-2xl text-white mb-6">
              You mastered the {selectedMatra.name}!
            </p>
            <p className="text-xl text-white mb-8">
              Score: {score} / {attempts} ({accuracy}% accuracy)
            </p>
            
            <button
              onClick={() => {
                playSound('click');
                setSelectedMatra(null);
                setShowResult(null);
                setScore(0);
                setAttempts(0);
              }}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105"
            >
              Practice Another Matra
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!selectedMatra && (
        <motion.div 
          className="bg-blue-100 rounded-2xl p-4 text-center"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <p className="text-blue-800 font-semibold flex items-center justify-center gap-2">
            <Star size={20} className="text-yellow-500" />
            Select a matra to start practicing! Earn 2 stars for each correct answer!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MatrasTab;
