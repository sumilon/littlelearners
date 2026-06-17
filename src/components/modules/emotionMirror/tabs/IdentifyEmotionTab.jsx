import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, RotateCcw, Heart } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { emotions, getRandomEmotions, affirmations } from '../../../../data/emotionMirrorData';

const IdentifyEmotionTab = () => {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledEmotions, setShuffledEmotions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Shuffle emotions on mount
    const shuffled = [...emotions].sort(() => Math.random() - 0.5);
    setShuffledEmotions(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledEmotions.length > 0) {
      const currentEmotion = shuffledEmotions[currentEmotionIndex];
      const emotionOptions = getRandomEmotions(currentEmotion, 4);
      setOptions(emotionOptions);
      speak(`Look at this face. How is this person feeling?`);
    }
  }, [currentEmotionIndex, shuffledEmotions]);

  const currentEmotion = shuffledEmotions[currentEmotionIndex];

  const handleAnswerSelect = (emotion) => {
    if (showResult) return;

    playSound('click');
    setSelectedAnswer(emotion);
    const correct = emotion.id === currentEmotion.id;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('success');
      setScore(score + 1);
      speak(`Correct! This person is feeling ${emotion.name}. ${currentEmotion.description}`);
    } else {
      playSound('error');
      speak(`Not quite. This person is feeling ${currentEmotion.name}. ${currentEmotion.description}`);
    }
  };

  const handleNext = () => {
    playSound('click');
    setShowResult(false);
    setSelectedAnswer(null);

    if (currentEmotionIndex < shuffledEmotions.length - 1) {
      setCurrentEmotionIndex(currentEmotionIndex + 1);
    } else {
      // Quiz complete
      speak(`Amazing job! You identified ${score} out of ${shuffledEmotions.length} emotions correctly!`);
    }
  };

  const handleRestart = () => {
    playSound('click');
    setCurrentEmotionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    const shuffled = [...emotions].sort(() => Math.random() - 0.5);
    setShuffledEmotions(shuffled);
    speak('Let\'s practice identifying emotions again!');
  };

  if (shuffledEmotions.length === 0) {
    return <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>;
  }

  // Quiz Complete Screen
  if (showResult && currentEmotionIndex === shuffledEmotions.length - 1 && isCorrect) {
    const percentage = Math.round((score / shuffledEmotions.length) * 100);

    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full mx-auto p-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
            <motion.div
              className="text-9xl mb-6"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              🏆
            </motion.div>
            
            <h2 className="text-5xl font-bold text-white mb-4">
              Emotion Expert!
            </h2>
            
            <div className="bg-white/20 rounded-2xl p-6 mb-6">
              <div className="text-7xl font-bold text-white mb-2">
                {score} / {shuffledEmotions.length}
              </div>
              <div className="text-2xl text-white/80">
                {percentage}% Correct
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 mb-6">
              <div className="text-white text-lg">
                You're getting better at recognizing feelings! 
                Understanding emotions helps us be kind to ourselves and others. 💙
              </div>
            </div>

            <motion.button
              onClick={handleRestart}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-xl py-4 px-8 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="inline w-6 h-6 mr-2" />
              Practice Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4">
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
            <div className="text-white/80 text-sm">Progress</div>
            <div className="text-white font-bold">
              {currentEmotionIndex + 1} / {shuffledEmotions.length}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
            <div className="text-white/80 text-sm">Score</div>
            <div className="text-white font-bold flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              {score}
            </div>
          </div>
        </div>

        {/* Main Emotion Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEmotionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-gradient-to-br ${currentEmotion.backgroundColor} rounded-3xl p-8 mb-6 shadow-2xl`}
          >
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                🎭 How is this person feeling?
              </h2>
              <p className="text-xl text-gray-700">
                Look at the face and choose the feeling
              </p>
            </div>

            {/* Animated Emotion Face */}
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 mb-6 flex items-center justify-center">
              <motion.div
                className="text-[200px] leading-none"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentEmotion.emoji}
              </motion.div>
            </div>

            {/* Answer Options */}
            {!showResult && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {options.map((emotion, index) => (
                  <motion.button
                    key={emotion.id}
                    onClick={() => handleAnswerSelect(emotion)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/60 hover:bg-white/80 backdrop-blur-sm text-gray-800 font-bold text-2xl py-6 px-8 rounded-2xl transition-all shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-5xl mb-2">{emotion.emoji}</div>
                    {emotion.name}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Result Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`p-6 rounded-2xl mb-6 ${
                    isCorrect
                      ? 'bg-green-500/40 border-2 border-green-600'
                      : 'bg-orange-500/40 border-2 border-orange-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-7xl mb-3">
                      {isCorrect ? '🎉' : '💡'}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-3">
                      {isCorrect ? 'That\'s Right!' : 'Good Try!'}
                    </div>
                    <div className="text-xl text-gray-800 mb-4">
                      This person is feeling <strong>{currentEmotion.name}</strong>
                    </div>
                    <div className="bg-white/50 rounded-xl p-4 mb-4">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {currentEmotion.description}
                      </p>
                    </div>

                    {/* Physical Signs */}
                    <div className="bg-white/40 rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                        <span>👀</span> Signs of {currentEmotion.name}:
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {currentEmotion.physicalSigns.map((sign, index) => (
                          <span
                            key={index}
                            className="bg-white/60 px-3 py-1 rounded-full text-sm text-gray-700"
                          >
                            {sign}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Affirmation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-pink-500/30 rounded-xl p-4"
                    >
                      <Heart className="w-6 h-6 text-pink-700 mx-auto mb-2" />
                      <p className="text-lg font-bold text-gray-800">
                        "{affirmations[currentEmotion.id][Math.floor(Math.random() * affirmations[currentEmotion.id].length)]}"
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl py-4 px-12 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentEmotionIndex < shuffledEmotions.length - 1 ? (
                    <>Next Emotion <Sparkles className="inline w-5 h-5 ml-2" /></>
                  ) : (
                    <>See Results <Trophy className="inline w-5 h-5 ml-2" /></>
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Info Card */}
        {!showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Learning About Feelings
            </h3>
            <p className="text-white/90">
              Every feeling has a special face! The more we practice, 
              the better we get at understanding how people feel.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IdentifyEmotionTab;
