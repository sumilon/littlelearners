import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Volume2, Play } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, slideIn, confetti } from '../../../../utils/animationUtils';
import { poems } from '../../../../data/rhymeTimeData';

const PoemsTab = () => {
  const { addStars, logActivity } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedPoems, setLearnedPoems] = useState(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const [readingMode, setReadingMode] = useState(null); // 'full' or 'line'

  const currentPoem = poems[currentIndex];

  const handleReadFull = () => {
    playSound('click');
    setReadingMode('full');
    const fullText = `${currentPoem.title}. ${currentPoem.lines.join('. ')}`;
    speakEnglish(fullText);
  };

  const handleReadLineByLine = () => {
    playSound('click');
    setReadingMode('line');
    readLinesSequentially(0);
  };

  const readLinesSequentially = (lineIndex) => {
    if (lineIndex >= currentPoem.lines.length) {
      setReadingMode(null);
      return;
    }
    
    speakEnglish(currentPoem.lines[lineIndex]);
    // Wait for speech to finish before reading next line (approximate timing)
    const words = currentPoem.lines[lineIndex].split(' ').length;
    const estimatedDuration = words * 400; // ~400ms per word
    
    setTimeout(() => {
      readLinesSequentially(lineIndex + 1);
    }, estimatedDuration);
  };

  const handleLearnPoem = () => {
    if (!learnedPoems.has(currentPoem.id)) {
      setLearnedPoems(new Set([...learnedPoems, currentPoem.id]));
      addStars(2);
      playSound('star');
      logActivity('rhymeTime', 'poems', `Learned poem: ${currentPoem.title}`);
      
      if (learnedPoems.size + 1 === poems.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const handleNext = () => {
    playSound('click');
    setReadingMode(null);
    if (currentIndex < poems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    playSound('click');
    setReadingMode(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            variants={confetti}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: 0,
                  transition: { duration: 2, ease: 'easeOut' }
                }}
              >
                {['📝', '⭐', '🎉', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Poems Learned:</span>
          <span className="text-pink-600 font-bold">{learnedPoems.size} / {poems.length}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(learnedPoems.size / poems.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Poem Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPoem.id}
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Poem Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{currentPoem.emoji}</div>
            <motion.h2 
              className="text-3xl font-bold text-pink-600 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {currentPoem.title}
            </motion.h2>
          </div>

          {/* Poem Lines */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
            <div className="space-y-3 text-center">
              {currentPoem.lines.map((line, index) => (
                <motion.p
                  key={index}
                  className="text-lg text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Read Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <motion.button
              onClick={handleReadFull}
              disabled={readingMode !== null}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                readingMode === 'full'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-600 disabled:opacity-50'
              }`}
              whileHover={readingMode === null ? { scale: 1.05 } : {}}
              whileTap={readingMode === null ? { scale: 0.95 } : {}}
            >
              <Volume2 size={20} />
              {readingMode === 'full' ? 'Reading...' : 'Read Aloud'}
            </motion.button>

            <motion.button
              onClick={handleReadLineByLine}
              disabled={readingMode !== null}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                readingMode === 'line'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-600 disabled:opacity-50'
              }`}
              whileHover={readingMode === null ? { scale: 1.05 } : {}}
              whileTap={readingMode === null ? { scale: 0.95 } : {}}
            >
              <Play size={20} />
              {readingMode === 'line' ? 'Reading Line by Line...' : 'Line by Line'}
            </motion.button>
          </div>

          {/* Learn Button */}
          <div className="text-center">
            <motion.button
              onClick={handleLearnPoem}
              disabled={learnedPoems.has(currentPoem.id)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                learnedPoems.has(currentPoem.id)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg'
              }`}
              whileHover={!learnedPoems.has(currentPoem.id) ? { scale: 1.05 } : {}}
              whileTap={!learnedPoems.has(currentPoem.id) ? { scale: 0.95 } : {}}
            >
              {learnedPoems.has(currentPoem.id) ? (
                <>
                  <Star className="inline mr-2" size={24} />
                  Learned! +2 ⭐
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
          {currentIndex + 1} / {poems.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === poems.length - 1}
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
          <span className="font-semibold ml-2">Listen to poems in full or line by line! Mark each poem as learned to earn 2 stars!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default PoemsTab;
