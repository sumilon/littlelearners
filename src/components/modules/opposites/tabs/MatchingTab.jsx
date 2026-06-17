import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle, confetti } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';
import { oppositePairs } from '../../../../data/oppositesData';

const MatchingTab = () => {
  const { addStars, logActivity } = useStore();
  
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const difficultySettings = {
    easy: { pairs: 3, stars: 3 },
    medium: { pairs: 4, stars: 4 },
    hard: { pairs: 5, stars: 5 }
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    // Get pairs for current difficulty
    const numPairs = difficultySettings[difficulty].pairs;
    const availablePairs = oppositePairs.filter(p => p.difficulty === difficulty);
    const selectedPairs = shuffle(availablePairs).slice(0, numPairs);

    // Create card objects
    const gameCards = [];
    selectedPairs.forEach((pair, pairIndex) => {
      gameCards.push({
        id: `${pairIndex}-1`,
        word: pair.word1,
        emoji: pair.emoji1,
        pairId: pairIndex,
        type: 'word1'
      });
      gameCards.push({
        id: `${pairIndex}-2`,
        word: pair.word2,
        emoji: pair.emoji2,
        pairId: pairIndex,
        type: 'word2'
      });
    });

    setCards(shuffle(gameCards));
    setSelectedCards([]);
    setMatchedPairs(new Set());
    setAttempts(0);
    setScore(0);
    setGameStarted(false);
    setShowConfetti(false);
    setFeedback(null);
  };

  const handleCardClick = (card) => {
    if (!gameStarted) setGameStarted(true);
    
    // Ignore if card is already matched or already selected
    if (matchedPairs.has(card.pairId) || selectedCards.find(c => c.id === card.id)) {
      return;
    }

    playSound('click');
    speakEnglish(card.word);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    // Check if two cards are selected
    if (newSelected.length === 2) {
      setAttempts(prev => prev + 1);

      // Check if they match (same pairId, different types)
      if (newSelected[0].pairId === newSelected[1].pairId && 
          newSelected[0].type !== newSelected[1].type) {
        // Match found!
        playSound('correct');
        const newMatchedPairs = new Set(matchedPairs);
        newMatchedPairs.add(card.pairId);
        setMatchedPairs(newMatchedPairs);
        setScore(prev => prev + 1);
        setFeedback({ type: 'correct', message: 'Perfect Match!' });

        // Check if game is complete
        if (newMatchedPairs.size === difficultySettings[difficulty].pairs) {
          handleGameComplete();
        }

        setTimeout(() => {
          setSelectedCards([]);
          setFeedback(null);
        }, 1000);
      } else {
        // No match
        playSound('wrong');
        setFeedback({ type: 'incorrect', message: 'Not opposites! Try again.' });
        
        setTimeout(() => {
          setSelectedCards([]);
          setFeedback(null);
        }, 1500);
      }
    }
  };

  const handleGameComplete = () => {
    const stars = difficultySettings[difficulty].stars;
    playSound('star');
    addStars(stars);
    logActivity('opposites', 'matching', `Completed ${difficulty} matching with ${attempts + 1} attempts`);
    setShowConfetti(true);
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const isCardSelected = (card) => {
    return selectedCards.find(c => c.id === card.id);
  };

  const isCardMatched = (card) => {
    return matchedPairs.has(card.pairId);
  };

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const totalPairs = difficultySettings[difficulty].pairs;
  const isComplete = matchedPairs.size === totalPairs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-4 pb-24">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            variants={confetti}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5
                }}
              >
                {['⭐', '✨', '🎉', '🎊'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="bg-white/90 backdrop-blur rounded-2xl p-6 mb-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-purple-600 mb-4 text-center">
          🔄 Match Opposites
        </h2>

        {/* Difficulty Selector */}
        <div className="flex justify-center gap-2 mb-4">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => {
                playSound('click');
                setDifficulty(level);
              }}
              className={`px-4 py-2 rounded-xl font-bold capitalize transition-all ${
                difficulty === level
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{score} / {totalPairs}</div>
            <div className="text-sm text-gray-600">Matched</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">{attempts}</div>
            <div className="text-sm text-gray-600">Attempts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>
      </motion.div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 px-8 py-4 rounded-2xl shadow-2xl text-white text-xl font-bold ${
              feedback.type === 'correct' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Complete Message */}
      {isComplete && (
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 mb-6 shadow-lg text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-2xl font-bold text-white mb-2">
            Fantastic Work!
          </div>
          <div className="text-white text-lg mb-4">
            You matched all {totalPairs} pairs in {attempts} attempts!
          </div>
          <div className="text-3xl">
            {'⭐'.repeat(difficultySettings[difficulty].stars)}
          </div>
        </motion.div>
      )}

      {/* Cards Grid */}
      <div className={`grid gap-3 mb-6 ${
        totalPairs <= 3 ? 'grid-cols-3' : 'grid-cols-4'
      }`}>
        {cards.map((card, index) => {
          const selected = isCardSelected(card);
          const matched = isCardMatched(card);

          return (
            <motion.button
              key={card.id}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.05 }}
              whileHover={!matched ? { scale: 1.05 } : {}}
              whileTap={!matched ? { scale: 0.95 } : {}}
              onClick={() => handleCardClick(card)}
              disabled={matched || selectedCards.length >= 2}
              className={`aspect-square rounded-2xl p-4 flex flex-col items-center justify-center gap-2 font-bold text-lg transition-all ${
                matched
                  ? 'bg-green-400 text-white shadow-lg cursor-not-allowed opacity-75'
                  : selected
                  ? 'bg-yellow-400 text-white shadow-xl scale-105'
                  : 'bg-white text-purple-600 shadow-md hover:shadow-lg active:shadow-sm'
              }`}
            >
              <motion.div
                className="text-6xl"
                animate={selected || matched ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {card.emoji}
              </motion.div>
              <div className="text-center break-words">
                {card.word}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Reset Button */}
      <motion.button
        variants={scaleIn}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playSound('click');
          initializeGame();
        }}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
      >
        🔄 Reset Game
      </motion.button>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="mt-6 bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-4"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div className="text-gray-700">
            <p className="font-bold mb-1">How to Play:</p>
            <p>Tap two cards that are opposites! If they match, they stay revealed. Match all pairs to win!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchingTab;
