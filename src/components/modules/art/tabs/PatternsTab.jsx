import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Star } from 'lucide-react';
import { patterns } from '../../../../data/artData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, wiggle } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';

const PatternsTab = () => {
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [showResult, setShowResult] = useState(false);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  // Filter patterns by difficulty
  const filteredPatterns = patterns.filter(p => p.difficulty === difficulty);
  const currentPattern = filteredPatterns[currentPatternIndex];

  useEffect(() => {
    if (currentPattern) {
      generateOptions();
      speakEnglish(`What comes next in this pattern?`);
    }
  }, [currentPatternIndex, difficulty]);

  const generateOptions = () => {
    const correctAnswer = currentPattern.answer;
    // Get other emojis from the sequence as wrong options
    const sequenceEmojis = [...new Set(currentPattern.sequence.filter(e => e !== '?'))];
    
    // Create wrong options from sequence emojis
    let wrongOptions = sequenceEmojis.filter(e => e !== correctAnswer);
    
    // If not enough wrong options, add some random emojis
    const randomEmojis = ['🌟', '💎', '🎵', '🌈', '🔥', '💫', '🎨', '🌸', '⚡', '🍀'];
    while (wrongOptions.length < 3) {
      const randomEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
      if (randomEmoji !== correctAnswer && !wrongOptions.includes(randomEmoji)) {
        wrongOptions.push(randomEmoji);
      }
    }
    
    // Take first 3 wrong options
    wrongOptions = wrongOptions.slice(0, 3);
    
    // Combine and shuffle
    const allOptions = shuffle([correctAnswer, ...wrongOptions]);
    setOptions(allOptions);
  };

  const handleAnswerSelect = (answer) => {
    if (showResult) return;

    playSound('click');
    setSelectedAnswer(answer);
    setAttempts(attempts + 1);

    const correct = answer === currentPattern.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('correct');
      playSound('star');
      const starsEarned = 3;
      addStars(starsEarned);
      setScore(score + 1);
      logActivity('art', 'patterns', `Solved ${difficulty} pattern correctly`);
      speakEnglish('Correct! Great pattern recognition!');
    } else {
      playSound('wrong');
      speakEnglish('Try again! Look at the pattern carefully.');
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentPatternIndex < filteredPatterns.length - 1) {
      setCurrentPatternIndex(currentPatternIndex + 1);
    } else {
      setCurrentPatternIndex(0);
    }
    resetQuestion();
  };

  const handleTryAgain = () => {
    playSound('click');
    resetQuestion();
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    playSound('click');
    setDifficulty(newDifficulty);
    setCurrentPatternIndex(0);
    setScore(0);
    setAttempts(0);
    resetQuestion();
  };

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="space-y-6 pb-24">
      {/* Score Display */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-gray-600">Solved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{attempts}</div>
            <div className="text-sm text-gray-600">Attempts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Selector */}
      <motion.div 
        className="flex gap-3"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        {['easy', 'medium', 'hard'].map((level) => (
          <motion.button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg capitalize transition-all ${
              difficulty === level
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 border-2 border-purple-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level === 'easy' && '😊'} {level === 'medium' && '🤔'} {level === 'hard' && '🧠'} {level}
          </motion.button>
        ))}
      </motion.div>

      {/* Pattern Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${difficulty}-${currentPatternIndex}`}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {/* Question Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">
              <Sparkles className="inline" size={28} /> What Comes Next?
            </h3>
            <p className="text-lg text-gray-600">
              Pattern {currentPatternIndex + 1} / {filteredPatterns.length}
            </p>
          </div>

          {/* Pattern Sequence */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {currentPattern.sequence.map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`text-5xl ${item === '?' ? 'bg-yellow-300 rounded-xl px-4 py-2' : ''}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pattern Description */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center">
            <p className="text-lg text-gray-700 font-semibold">
              {currentPattern.description}
            </p>
          </div>

          {/* Answer Options */}
          {!showResult && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  className="bg-white border-4 border-purple-300 rounded-2xl p-8 text-6xl hover:bg-purple-50 transition-all shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={scaleIn}
                  initial="initial"
                  animate="animate"
                  custom={idx}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}

          {/* Result Display */}
          {showResult && (
            <motion.div
              variants={isCorrect ? scaleIn : wiggle}
              initial="initial"
              animate="animate"
              className={`p-6 rounded-2xl mb-6 text-center ${
                isCorrect 
                  ? 'bg-gradient-to-r from-green-400 to-green-500' 
                  : 'bg-gradient-to-r from-red-400 to-red-500'
              }`}
            >
              <div className="text-4xl mb-2">
                {isCorrect ? '🎉' : '😔'}
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {isCorrect ? 'Correct!' : 'Not quite!'}
              </div>
              <div className="text-xl text-white">
                {isCorrect 
                  ? `The answer is ${currentPattern.answer}! +3 stars ⭐⭐⭐`
                  : `Try again! Look at the pattern carefully.`
                }
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          {showResult && (
            <div className="flex gap-4">
              {!isCorrect && (
                <motion.button
                  onClick={handleTryAgain}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="inline mr-2" size={24} />
                  Try Again
                </motion.button>
              )}
              <motion.button
                onClick={handleNext}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Pattern ➡️
              </motion.button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <motion.div 
        className="bg-yellow-100 rounded-2xl p-4 text-center"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <p className="text-lg text-gray-700">
          <Star className="inline text-yellow-500" size={20} /> 
          Find the missing item in each pattern to earn 3 stars! Choose difficulty level.
        </p>
      </motion.div>
    </div>
  );
};

export default PatternsTab;
