import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy, Star } from 'lucide-react';
import { wordMatchingPairs } from '../../../../data/hindiData';
import { speakHindi } from '../../../../utils/speechUtils';
import { playSound } from '../../../../utils/audioUtils';
import { scaleIn, correctAnswer, wiggle, balloons } from '../../../../utils/animationUtils';
import useStore from '../../../../store/useStore';
import { shuffle } from '../../../../utils/gameHelpers';

const ShabdKhelTab = () => {
  const [gameCards, setGameCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Take first 6 pairs for the game
    const pairs = wordMatchingPairs.slice(0, 6);
    
    // Create cards: each pair becomes 2 cards (hindi and emoji)
    const cards = pairs.flatMap((pair, index) => [
      { id: `${index}-hindi`, value: pair.hindi, type: 'hindi', pairId: index },
      { id: `${index}-emoji`, value: pair.emoji, type: 'emoji', pairId: index }
    ]);

    setGameCards(shuffle(cards));
    setSelectedCards([]);
    setMatchedPairs(new Set());
    setScore(0);
    setMoves(0);
    setGameWon(false);
    setShowBalloons(false);
  };

  const handleCardClick = (card) => {
    // Ignore if card already matched or already selected
    if (matchedPairs.has(card.pairId) || selectedCards.some(c => c.id === card.id)) {
      return;
    }

    // Ignore if 2 cards already selected
    if (selectedCards.length >= 2) {
      return;
    }

    playSound('click');
    
    // Speak the card value if it's Hindi
    if (card.type === 'hindi') {
      speakHindi(card.value);
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    // Check for match when 2 cards are selected
    if (newSelected.length === 2) {
      setMoves(moves + 1);
      
      const [first, second] = newSelected;
      const isMatch = first.pairId === second.pairId;

      if (isMatch) {
        // Match found!
        playSound('correct');
        const newScore = score + 10;
        setScore(newScore);
        setMatchedPairs(new Set([...matchedPairs, card.pairId]));
        addStars(3);
        logActivity('hindi', 'shabdkhel', `Matched pair: ${first.value}`);
        
        // Check if game is won
        if (matchedPairs.size + 1 === 6) {
          setTimeout(() => {
            setGameWon(true);
            setShowBalloons(true);
            addStars(10); // Bonus stars for completing the game
            playSound('star');
          }, 500);
        }
        
        // Clear selection after short delay
        setTimeout(() => {
          setSelectedCards([]);
        }, 500);
      } else {
        // No match
        playSound('wrong');
        
        // Clear selection after delay
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const isCardSelected = (card) => selectedCards.some(c => c.id === card.id);
  const isCardMatched = (card) => matchedPairs.has(card.pairId);

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{score}</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{moves}</div>
              <div className="text-sm text-gray-600">Moves</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{matchedPairs.size}/6</div>
              <div className="text-sm text-gray-600">Matched</div>
            </div>
          </div>

          <motion.button
            onClick={() => {
              playSound('click');
              initializeGame();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={20} />
            <span>New Game</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Game Board */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          Match Hindi Words with Emojis!
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {gameCards.map((card, index) => {
              const selected = isCardSelected(card);
              const matched = isCardMatched(card);

              return (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  disabled={matched}
                  className={`
                    relative aspect-square flex items-center justify-center
                    rounded-xl font-bold transition-all
                    ${matched
                      ? 'bg-gradient-to-br from-green-400 to-teal-400 text-white scale-95 opacity-50'
                      : selected
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl scale-105'
                      : 'bg-gradient-to-br from-orange-100 to-pink-100 text-orange-800 hover:shadow-lg'
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateY: 0
                  }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={!matched ? { scale: 1.05, rotateZ: 2 } : {}}
                  whileTap={!matched ? { scale: 0.95 } : {}}
                >
                  {card.type === 'emoji' ? (
                    <span className="text-5xl">{card.value}</span>
                  ) : (
                    <span className="text-2xl">{card.value}</span>
                  )}

                  {/* Matched indicator */}
                  {matched && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-green-500/90 rounded-xl"
                      variants={correctAnswer}
                      initial="hidden"
                      animate="visible"
                    >
                      <Star size={40} className="text-yellow-300" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Victory Screen */}
      <AnimatePresence>
        {gameWon && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Balloons animation */}
            {showBalloons && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-6xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: '-10%'
                    }}
                    animate={{
                      y: [0, -1000],
                      x: [0, (Math.random() - 0.5) * 200],
                      rotate: [0, (Math.random() - 0.5) * 360]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      ease: 'easeOut',
                      delay: i * 0.1
                    }}
                  >
                    🎈
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-3xl shadow-2xl p-12 max-w-md mx-4 text-center relative z-10"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="text-9xl mb-4"
                variants={wiggle}
                animate="animate"
              >
                🏆
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-4">
                शाबाश! (Well Done!)
              </h2>

              <div className="space-y-2 mb-6">
                <p className="text-2xl text-white font-bold">
                  Final Score: {score}
                </p>
                <p className="text-xl text-white">
                  Completed in {moves} moves!
                </p>
                <p className="text-xl text-white">
                  ⭐ +13 stars earned! ⭐
                </p>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => {
                    playSound('click');
                    initializeGame();
                  }}
                  className="flex-1 px-6 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>

                <motion.button
                  onClick={() => {
                    playSound('click');
                    setGameWon(false);
                    setShowBalloons(false);
                  }}
                  className="flex-1 px-6 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div 
        className="bg-blue-100 rounded-2xl p-4 text-center"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <p className="text-blue-800 font-semibold flex items-center justify-center gap-2">
          <Trophy size={20} className="text-yellow-500" />
          Click cards to match Hindi words with their emoji pairs! Earn 3 stars per match!
        </p>
      </motion.div>
    </div>
  );
};

export default ShabdKhelTab;
