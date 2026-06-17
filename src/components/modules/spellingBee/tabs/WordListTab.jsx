import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Volume2, Eye, EyeOff } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn } from '../../../../utils/animationUtils';
import { spellingWords } from '../../../../data/spellingBeeData';

const WordListTab = () => {
  const { addStars, logActivity } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [learnedWords, setLearnedWords] = useState(new Set());
  const [showSpelling, setShowSpelling] = useState(true);

  const filteredWords = spellingWords.filter(word => word.difficulty === difficulty);
  const currentWord = filteredWords[currentIndex];

  const handlePlayWord = () => {
    playSound('click');
    speakEnglish(currentWord.word);
  };

  const handlePlaySentence = () => {
    playSound('click');
    speakEnglish(currentWord.sentence);
  };

  const handlePlayDefinition = () => {
    playSound('click');
    speakEnglish(currentWord.definition);
  };

  const handleLearnWord = () => {
    if (!learnedWords.has(currentWord.id)) {
      setLearnedWords(new Set([...learnedWords, currentWord.id]));
      const stars = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
      addStars(stars);
      playSound('star');
      logActivity('spellingBee', 'wordList', `Learned word: ${currentWord.word}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowSpelling(true);
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowSpelling(true);
    }
  };

  const handleDifficultyChange = (level) => {
    playSound('click');
    setDifficulty(level);
    setCurrentIndex(0);
    setShowSpelling(true);
  };

  const toggleSpelling = () => {
    playSound('click');
    setShowSpelling(!showSpelling);
  };

  if (!currentWord) {
    return <div className="text-center text-gray-600">No words available</div>;
  }

  const learnedCount = filteredWords.filter(w => learnedWords.has(w.id)).length;

  return (
    <motion.div
      className="space-y-6"
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      {/* Progress */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Words Learned:</span>
          <span className="text-pink-600 font-bold">{learnedCount} / {filteredWords.length}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-yellow-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(learnedCount / filteredWords.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="flex justify-center gap-3">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${
              difficulty === level
                ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Current Word Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.id}
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Emoji */}
          <div className="text-center mb-6">
            <motion.div 
              className="text-8xl mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {currentWord.emoji}
            </motion.div>
          </div>

          {/* Word with Show/Hide Toggle */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-3">
              <motion.button
                onClick={handlePlayWord}
                className="flex items-center gap-2 px-6 py-3 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 size={24} className="text-pink-600" />
                <span className="text-pink-600 font-semibold">Hear Word</span>
              </motion.button>

              <motion.button
                onClick={toggleSpelling}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showSpelling ? <EyeOff size={24} className="text-yellow-600" /> : <Eye size={24} className="text-yellow-600" />}
                <span className="text-yellow-600 font-semibold">{showSpelling ? 'Hide' : 'Show'}</span>
              </motion.button>
            </div>

            {showSpelling && (
              <motion.h2
                className="text-5xl font-bold text-pink-600 mb-2 tracking-wider"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {currentWord.word.toUpperCase()}
              </motion.h2>
            )}

            <div className="text-gray-500 italic">{currentWord.hint}</div>
          </div>

          {/* Definition */}
          <motion.div
            className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl p-6 mb-4 cursor-pointer"
            onClick={handlePlayDefinition}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Definition:</h3>
            <p className="text-lg text-gray-800">{currentWord.definition}</p>
          </motion.div>

          {/* Sentence */}
          <motion.div
            className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-xl p-6 mb-6 cursor-pointer"
            onClick={handlePlaySentence}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Example Sentence:</h3>
            <p className="text-lg text-gray-800 italic">"{currentWord.sentence}"</p>
          </motion.div>

          {/* Learn Button */}
          <div className="text-center">
            <motion.button
              onClick={handleLearnWord}
              disabled={learnedWords.has(currentWord.id)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                learnedWords.has(currentWord.id)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:shadow-lg'
              }`}
              whileHover={!learnedWords.has(currentWord.id) ? { scale: 1.05 } : {}}
              whileTap={!learnedWords.has(currentWord.id) ? { scale: 0.95 } : {}}
            >
              {learnedWords.has(currentWord.id) ? (
                <>
                  <Star className="inline mr-2" size={24} />
                  Learned! +{difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3} ⭐
                </>
              ) : (
                'Mark as Learned'
              )}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={24} />
          Previous
        </button>

        <span className="text-gray-600 font-semibold">
          {currentIndex + 1} / {filteredWords.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredWords.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-gray-700">
          <Star className="inline text-yellow-500" size={20} />
          <span className="font-semibold ml-2">Listen to each word, read the definition and sentence. Mark as learned to earn stars!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default WordListTab;
