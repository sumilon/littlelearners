import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, RefreshCw, Star } from 'lucide-react';
import { sequences } from '../../../../data/brainGamesData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, wiggle } from '../../../../utils/animationUtils';

const SequenceTab = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showRule, setShowRule] = useState(false);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const filteredSequences = sequences.filter(s => s.difficulty === difficulty);
  const currentSequence = filteredSequences[currentSequenceIndex];

  useEffect(() => {
    if (currentSequence) {
      speakEnglish(`What comes next in this sequence?`);
    }
  }, [currentSequenceIndex, difficulty]);

  const handleAnswerSelect = (answer) => {
    if (showResult) return;

    playSound('click');
    setSelectedAnswer(answer);
    setAttempts(attempts + 1);

    const correct = String(answer) === String(currentSequence.answer);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('correct');
      playSound('star');
      const starsEarned = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
      addStars(starsEarned);
      setScore(score + 1);
      logActivity('brainGames', 'sequence', `Solved ${difficulty} ${currentSequence.type} sequence`);
      speakEnglish(`Correct! The pattern is: ${currentSequence.rule}`);
    } else {
      playSound('wrong');
      speakEnglish('Not quite! Look at the pattern carefully.');
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentSequenceIndex < filteredSequences.length - 1) {
      setCurrentSequenceIndex(currentSequenceIndex + 1);
    } else {
      setCurrentSequenceIndex(0);
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
    setShowRule(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    playSound('click');
    setDifficulty(newDifficulty);
    setCurrentSequenceIndex(0);
    setScore(0);
    setAttempts(0);
    resetQuestion();
  };

  const handleShowRule = () => {
    playSound('click');
    setShowRule(true);
    speakEnglish(`The pattern is: ${currentSequence.rule}`);
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

      {/* Sequence Puzzle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${difficulty}-${currentSequenceIndex}`}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {/* Question Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">
              <TrendingUp className="inline text-blue-500" size={28} /> Find the Pattern
            </h3>
            <p className="text-lg text-gray-600">
              {currentSequence.type === 'number' ? '🔢 Number' : '🔤 Letter'} Sequence {currentSequenceIndex + 1} / {filteredSequences.length}
            </p>
          </div>

          {/* Sequence Display */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {currentSequence.sequence.map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`text-5xl font-bold ${
                    item === '?' 
                      ? 'bg-yellow-300 rounded-xl px-6 py-4' 
                      : 'text-purple-600'
                  }`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Type Badge */}
          <div className="text-center mb-6">
            <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
              {currentSequence.type === 'number' ? '🔢 Numbers' : '🔤 Letters'}
            </span>
          </div>

          {/* Answer Options */}
          {!showResult && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentSequence.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  className="bg-white border-4 border-purple-300 rounded-2xl p-8 text-4xl font-bold hover:bg-purple-50 transition-all shadow-md"
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
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {isCorrect ? 'Correct!' : 'Not quite!'}
              </div>
              <div className="text-xl text-white mb-4">
                {isCorrect 
                  ? `The answer is ${currentSequence.answer}! +${difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4} stars ⭐`
                  : `Your answer: ${selectedAnswer}`
                }
              </div>
              
              {/* Rule/Pattern */}
              {(isCorrect || showRule) && (
                <div className="bg-white/20 rounded-xl p-4 mt-4">
                  <div className="text-white font-semibold mb-2">📐 Pattern Rule:</div>
                  <div className="text-white text-lg">{currentSequence.rule}</div>
                </div>
              )}

              {!isCorrect && !showRule && (
                <motion.button
                  onClick={handleShowRule}
                  className="mt-4 py-2 px-6 rounded-xl bg-white/30 text-white font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TrendingUp className="inline mr-2" size={20} />
                  Show Pattern Rule
                </motion.button>
              )}
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
                Next Sequence ➡️
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
          Find the missing number or letter in each sequence! Earn {difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4} stars per correct answer!
        </p>
      </motion.div>
    </div>
  );
};

export default SequenceTab;
