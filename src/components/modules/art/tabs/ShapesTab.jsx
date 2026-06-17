import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, Star } from 'lucide-react';
import { shapes } from '../../../../data/artData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn, confetti } from '../../../../utils/animationUtils';

const ShapesTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedShapes, setLearnedShapes] = useState(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  const currentShape = shapes[currentIndex];
  const isLearned = learnedShapes.has(currentShape.name);
  const allLearned = learnedShapes.size === shapes.length;

  useEffect(() => {
    speakShape();
  }, [currentIndex]);

  useEffect(() => {
    if (allLearned && learnedShapes.size > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [allLearned, learnedShapes.size]);

  const speakShape = () => {
    speakEnglish(`${currentShape.name}. ${currentShape.description}. It has ${currentShape.sides} sides.`);
  };

  const handleLearnShape = () => {
    playSound('click');
    if (!isLearned) {
      playSound('correct');
      playSound('star');
      addStars(2);
      setLearnedShapes(new Set([...learnedShapes, currentShape.name]));
      logActivity('art', 'shapes', `Learned about ${currentShape.name}`);
    }
    speakShape();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSound('click');
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < shapes.length - 1) {
      playSound('click');
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Progress Counter */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <div className="text-lg font-bold text-purple-600">
          Learned: {learnedShapes.size} / {shapes.length} 🎨
        </div>
        {allLearned && (
          <motion.div 
            className="text-green-600 font-bold mt-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            🎉 All shapes learned! Amazing artist! 🎉
          </motion.div>
        )}
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-3 rounded-xl ${
            currentIndex === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
          } transition-all`}
          whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <div className="text-center flex-1">
          <div className="text-sm text-purple-600 font-semibold">
            Shape {currentIndex + 1} / {shapes.length}
          </div>
        </div>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex === shapes.length - 1}
          className={`p-3 rounded-xl ${
            currentIndex === shapes.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
          } transition-all`}
          whileHover={currentIndex < shapes.length - 1 ? { scale: 1.1 } : {}}
          whileTap={currentIndex < shapes.length - 1 ? { scale: 0.95 } : {}}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Shape Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentShape.name}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {/* Shape Emoji */}
          <motion.div 
            className="text-9xl text-center mb-6"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            {currentShape.emoji}
          </motion.div>

          {/* Shape Name */}
          <h3 className="text-3xl font-bold text-center mb-4 text-purple-600">
            {currentShape.name}
            {isLearned && <span className="ml-2 text-yellow-500">⭐⭐</span>}
          </h3>

          {/* Description */}
          <p className="text-xl text-gray-700 text-center mb-4 leading-relaxed">
            {currentShape.description}
          </p>

          {/* Sides Info */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-4 text-center">
            <span className="text-lg font-semibold text-purple-700">
              Sides: {currentShape.sides} {currentShape.sides === 0 ? '⭕' : '📐'}
            </span>
          </div>

          {/* Examples */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <h4 className="text-lg font-bold text-blue-600 mb-2">Examples:</h4>
            <p className="text-lg text-gray-700">
              {currentShape.examples.join(', ')}
            </p>
          </div>

          {/* Drawing Steps */}
          {currentShape.drawingSteps && (
            <div className="bg-yellow-50 rounded-xl p-4 mb-6">
              <h4 className="text-lg font-bold text-yellow-600 mb-3">How to Draw:</h4>
              <ul className="space-y-2">
                {currentShape.drawingSteps.map((step, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-start gap-2 text-lg text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-purple-500 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={handleLearnShape}
              className={`flex-1 py-4 px-6 rounded-xl text-white text-xl font-bold shadow-lg ${
                isLearned
                  ? 'bg-gradient-to-r from-green-400 to-green-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLearned ? '✅ Learned!' : '⭐ Learn Shape!'}
            </motion.button>

            <motion.button
              onClick={speakShape}
              className="py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 size={28} />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Confetti Animation */}
      {showConfetti && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          variants={confetti}
          initial="initial"
          animate="animate"
        >
          <div className="text-9xl">
            🎉🎨✨🌟🎊
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div 
        className="bg-yellow-100 rounded-2xl p-4 text-center"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <p className="text-lg text-gray-700">
          <Star className="inline text-yellow-500" size={20} /> 
          Learn about each shape to earn 2 stars! Navigate with arrow buttons.
        </p>
      </motion.div>
    </div>
  );
};

export default ShapesTab;
