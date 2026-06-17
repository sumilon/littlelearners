import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, Star } from 'lucide-react';
import { phonicsPatterns } from '../../../../data/englishData';
import { speakEnglish } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, correctAnswer, wrongAnswer } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';
import { shuffle } from '../../../../utils/gameHelpers';

const PhonicsTab = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const handlePatternSelect = (pattern) => {
    playSound('click');
    setSelectedPattern(pattern);
    setCurrentWordIndex(0);
    setShowResult(null);
    setScore(0);
    setAttempts(0);
    
    // Speak the pattern
    speakEnglish(`${pattern.pattern}. The sound is ${pattern.sound}`);
  };

  const checkAnswer = (word) => {
    const isCorrect = selectedPattern.words[currentWordIndex].word === word;
    setShowResult(isCorrect ? 'correct' : 'wrong');
    setAttempts(attempts + 1);

    if (isCorrect) {
      playSound('correct');
      setScore(score + 1);
      addStars(2);
      logActivity('english', 'phonics', `Correct phonics: ${word}`);
      
      // Speak the word
      speakEnglish(`Correct! ${word}`);
      
      // Move to next word after delay
      setTimeout(() => {
        if (currentWordIndex < selectedPattern.words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setShowResult(null);
        } else {
          // Completed all words for this pattern
          setShowResult('completed');
        }
      }, 1500);
    } else {
      playSound('wrong');
      speakEnglish('Try again!');
      setTimeout(() => setShowResult(null), 1000);
    }
  };

  const getCurrentOptions = () => {
    if (!selectedPattern) return [];
    const correctWord = selectedPattern.words[currentWordIndex];
    
    // Get 2 random wrong words from other patterns
    const wrongWords = phonicsPatterns
      .filter(p => p.pattern !== selectedPattern.pattern)
      .flatMap(p => p.words)
      .slice(0, 2);
    
    return shuffle([correctWord, ...wrongWords]);
  };

  const options = getCurrentOptions();
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Pattern Selection */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Choose a Phonics Pattern
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {phonicsPatterns.map((pattern) => (
            <motion.button
              key={pattern.pattern}
              onClick={() => handlePatternSelect(pattern)}
              className={`
                p-6 rounded-xl font-bold transition-all
                ${selectedPattern?.pattern === pattern.pattern
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-xl scale-105'
                  : 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-800 hover:shadow-lg'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">{pattern.pattern}</div>
              <div className="text-sm opacity-75">{pattern.sound}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Practice Area */}
      <AnimatePresence mode="wait">
        {selectedPattern && showResult !== 'completed' && (
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
                Word {currentWordIndex + 1} of {selectedPattern.words.length}
              </div>
              <div className="flex gap-4">
                <div className="text-lg font-bold text-gray-700">
                  Score: {score} / {attempts}
                </div>
                <div className="text-lg font-bold text-orange-600">
                  {accuracy}% Accuracy
                </div>
              </div>
            </div>

            {/* Current Word Display */}
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">
                {selectedPattern.words[currentWordIndex].emoji}
              </div>
              
              <h3 className="text-3xl font-bold text-orange-700 mb-4">
                Which word matches this picture?
              </h3>
            </div>

            {/* Word Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {options.map((option, index) => (
                <motion.button
                  key={`${option.word}-${index}`}
                  onClick={() => checkAnswer(option.word)}
                  disabled={showResult !== null}
                  className="relative px-8 py-6 bg-white rounded-xl font-bold text-4xl text-blue-600 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: showResult ? 1 : 1.05 }}
                  whileTap={{ scale: showResult ? 1 : 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {option.word}
                  
                  {/* Listen button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                      speakEnglish(option.word);
                    }}
                    className="absolute top-2 right-2 p-2 bg-blue-100 rounded-lg hover:bg-blue-200"
                  >
                    <Volume2 size={16} className="text-blue-600" />
                  </button>
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
                  Excellent! +2 stars ⭐
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

            {/* Pattern reminder */}
            <motion.button
              onClick={() => {
                playSound('click');
                speakEnglish(`${selectedPattern.pattern}. The sound is ${selectedPattern.sound}`);
              }}
              className="mt-6 mx-auto flex items-center gap-3 px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 size={24} />
              <span>Hear {selectedPattern.pattern} Sound</span>
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
              Well Done!
            </h2>
            <p className="text-2xl text-white mb-6">
              You mastered {selectedPattern.pattern}!
            </p>
            <p className="text-xl text-white mb-8">
              Score: {score} / {attempts} ({accuracy}% accuracy)
            </p>
            
            <button
              onClick={() => {
                playSound('click');
                setSelectedPattern(null);
                setShowResult(null);
                setScore(0);
                setAttempts(0);
              }}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105"
            >
              Practice Another Pattern
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!selectedPattern && (
        <motion.div 
          className="bg-blue-100 rounded-2xl p-4 text-center"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <p className="text-blue-800 font-semibold flex items-center justify-center gap-2">
            <Star size={20} className="text-yellow-500" />
            Choose a phonics pattern and match words with pictures! Earn 2 stars per correct answer!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PhonicsTab;
