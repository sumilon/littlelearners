import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Clock } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, confetti } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';
import { oppositePairs } from '../../../../data/oppositesData';

const FlipCardTab = () => {
  const { addStars, logActivity } = useStore();
  
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const difficultySettings = {
    easy: { pairs: 4, stars: 3 },
    medium: { pairs: 6, stars: 4 },
    hard: { pairs: 8, stars: 5 }
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameComplete) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameComplete]);

  const initializeGame = () => {
    // Get pairs for current difficulty
    const numPairs = difficultySettings[difficulty].pairs;
    const availablePairs = oppositePairs.filter(p => p.difficulty === difficulty);
    const selectedPairs = shuffle(availablePairs).slice(0, numPairs);

    // Create card objects (2 cards per pair - one for each word)
    const gameCards = [];
    selectedPairs.forEach((pair, pairIndex) => {
      gameCards.push({
        id: `${pairIndex}-1`,
        word: pair.word1,
        emoji: pair.emoji1,
        pairId: pairIndex
      });
      gameCards.push({
        id: `${pairIndex}-2`,
        word: pair.word2,
        emoji: pair.emoji2,
        pairId: pairIndex
      });
    });

    setCards(shuffle(gameCards));
    setFlippedCards([]);
    setMatchedPairs(new Set());
    setMoves(0);
    setTime(0);
    setGameStarted(false);
    setGameComplete(false);
    setShowConfetti(false);
    setCanFlip(true);
  };

  const handleCardClick = (card) => {
    if (!canFlip) return;
    if (flippedCards.find(c => c.id === card.id)) return;
    if (matchedPairs.has(card.pairId)) return;

    if (!gameStarted) setGameStarted(true);

    playSound('click');
    speakEnglish(card.word);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setCanFlip(false);

      // Check if they match
      if (newFlipped[0].pairId === newFlipped[1].pairId && newFlipped[0].id !== newFlipped[1].id) {
        // Match found!
        playSound('correct');
        const newMatchedPairs = new Set(matchedPairs);
        newMatchedPairs.add(card.pairId);
        setMatchedPairs(newMatchedPairs);

        setTimeout(() => {
          setFlippedCards([]);
          setCanFlip(true);

          // Check if game is complete
          if (newMatchedPairs.size === difficultySettings[difficulty].pairs) {
            handleGameComplete();
          }
        }, 800);
      } else {
        // No match - flip back after delay
        playSound('wrong');
        setTimeout(() => {
          setFlippedCards([]);
          setCanFlip(true);
        }, 1500);
      }
    }
  };

  const handleGameComplete = () => {
    setGameComplete(true);
    setGameStarted(false);
    
    // Award stars based on performance (fewer moves = more stars)
    const perfectMoves = difficultySettings[difficulty].pairs;
    const stars = moves <= perfectMoves + 3 
      ? difficultySettings[difficulty].stars 
      : Math.max(2, difficultySettings[difficulty].stars - 1);
    
    playSound('star');
    addStars(stars);
    logActivity('opposites', 'flipcard', `Completed ${difficulty} memory in ${moves} moves, ${time}s`);
    setShowConfetti(true);
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const isCardFlipped = (card) => {
    return flippedCards.find(c => c.id === card.id) || matchedPairs.has(card.pairId);
  };

  const isCardMatched = (card) => {
    return matchedPairs.has(card.pairId);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalPairs = difficultySettings[difficulty].pairs;
  const gridCols = totalPairs <= 4 ? 'grid-cols-4' : 'grid-cols-4';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 p-4 pb-24">
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
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          🃏 Flip & Match
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
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{matchedPairs.size} / {totalPairs}</div>
            <div className="text-sm text-gray-600">Pairs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-600">{moves}</div>
            <div className="text-sm text-gray-600">Moves</div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-5 h-5 text-teal-600" />
            <div>
              <div className="text-2xl font-bold text-teal-600">{formatTime(time)}</div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Game Complete Message */}
      {gameComplete && (
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 mb-6 shadow-lg text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-2xl font-bold text-white mb-2">
            Incredible Memory!
          </div>
          <div className="text-white text-lg mb-2">
            Matched all {totalPairs} pairs in {moves} moves!
          </div>
          <div className="text-white mb-4">
            Time: {formatTime(time)}
          </div>
          <div className="text-3xl">
            {'⭐'.repeat(moves <= totalPairs + 3 ? difficultySettings[difficulty].stars : Math.max(2, difficultySettings[difficulty].stars - 1))}
          </div>
        </motion.div>
      )}

      {/* Cards Grid */}
      <div className={`grid gap-3 mb-6 ${gridCols}`}>
        {cards.map((card, index) => {
          const flipped = isCardFlipped(card);
          const matched = isCardMatched(card);

          return (
            <motion.div
              key={card.id}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.05 }}
              className="aspect-square"
            >
              <motion.button
                onClick={() => handleCardClick(card)}
                disabled={!canFlip && !flipped}
                className={`w-full h-full relative preserve-3d ${!canFlip && !flipped ? 'cursor-not-allowed' : ''}`}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-2xl shadow-lg flex items-center justify-center text-8xl ${
                    matched ? 'bg-green-300' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-white">🔄</span>
                </div>

                {/* Card Front */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-2xl shadow-lg p-2 flex flex-col items-center justify-center gap-1 ${
                    matched ? 'bg-green-400' : 'bg-white'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <motion.div
                    className="text-6xl"
                    animate={matched ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {card.emoji}
                  </motion.div>
                  <div className={`text-center font-bold text-base break-words ${
                    matched ? 'text-white' : 'text-blue-600'
                  }`}>
                    {card.word}
                  </div>
                </div>
              </motion.button>
            </motion.div>
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
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        New Game
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
            <p>Flip two cards at a time to find opposite word pairs! Remember where they are. Match all pairs to win!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCardTab;
