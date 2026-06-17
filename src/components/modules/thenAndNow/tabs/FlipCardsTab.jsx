import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../../utils/animationUtils';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { getRandomItems } from '../../../../data/thenAndNowData';

const FlipCardsTab = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startGame = () => {
    // Get 6 random items and create card pairs (then + now)
    const items = getRandomItems(6);
    const gameCards = [];
    
    items.forEach((item, index) => {
      gameCards.push({
        id: `then-${index}`,
        type: 'then',
        emoji: item.then.emoji,
        name: item.then.name,
        pairId: index
      });
      gameCards.push({
        id: `now-${index}`,
        type: 'now',
        emoji: item.now.emoji,
        name: item.now.name,
        pairId: index
      });
    });

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
    setHasStarted(true);
    playSound('success');
    speak('Match the old items with their modern versions!');
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(card.id)) return;
    if (matchedPairs.includes(card.pairId)) return;

    playSound('click');
    const newFlipped = [...flippedCards, card.id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      // Check for match
      const card1 = cards.find(c => c.id === newFlipped[0]);
      const card2 = cards.find(c => c.id === newFlipped[1]);

      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        // Match found!
        playSound('success');
        setMatchedPairs([...matchedPairs, card1.pairId]);
        speak(`Match! ${card1.name} became ${card2.type === 'now' ? card2.name : card1.name}!`);
        setFlippedCards([]);

        // Check if game complete
        if (matchedPairs.length + 1 === 6) {
          setTimeout(() => {
            setGameComplete(true);
            speak(`Congratulations! You matched all items in ${moves + 1} moves!`);
          }, 1000);
        }
      } else {
        // No match
        playSound('error');
        speak('Not a match. Try again!');
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-6">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl text-center max-w-2xl"
        >
          <div className="text-8xl mb-6">🎴</div>
          <h2 className="text-4xl font-bold text-white mb-4">Memory Match</h2>
          <p className="text-xl text-white/80 mb-8">
            Flip cards to match old items with their modern versions!
          </p>
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-2xl shadow-2xl"
          >
            Start Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl text-center max-w-2xl"
        >
          <div className="text-8xl mb-6">🏆</div>
          <h3 className="text-4xl font-bold text-white mb-4">
            Perfect Match!
          </h3>
          <p className="text-3xl text-white/90 mb-8">
            You matched all pairs in {moves} moves!
          </p>
          <div className="text-2xl text-white/80 mb-8">
            {moves <= 12 ? '⭐⭐⭐ Amazing!' : moves <= 18 ? '⭐⭐ Great!' : '⭐ Good!'}
          </div>
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-bold text-2xl shadow-2xl"
          >
            Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] flex flex-col p-6 overflow-hidden">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col"
      >
        {/* Header with Stats */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            🎴 Memory Match
          </h2>
          <div className="flex justify-center gap-8 text-xl text-white/80">
            <div>Moves: <span className="font-bold text-white">{moves}</span></div>
            <div>Matched: <span className="font-bold text-white">{matchedPairs.length}/6</span></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((card, index) => {
              const isFlipped = flippedCards.includes(card.id);
              const isMatched = matchedPairs.includes(card.pairId);
              const shouldShow = isFlipped || isMatched;

              return (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  disabled={isMatched || flippedCards.length === 2}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 15,
                      delay: index * 0.05
                    }
                  }}
                  whileHover={!isMatched ? { 
                    scale: 1.1,
                    y: -10,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  } : {}}
                  whileTap={!isMatched ? { scale: 0.95 } : {}}
                  className="relative w-32 h-40 cursor-pointer"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    className="w-full h-full relative"
                    initial={false}
                    animate={{ rotateY: shouldShow ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Card Back */}
                    <div
                      className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white/30"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)'
                      }}
                    >
                      <div className="text-6xl">❓</div>
                    </div>

                    {/* Card Front */}
                    <div
                      className={`absolute w-full h-full backdrop-blur-xl rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 ${
                        isMatched 
                          ? 'bg-green-500/80 border-green-300' 
                          : card.type === 'then'
                          ? 'bg-amber-600/80 border-amber-400'
                          : 'bg-blue-600/80 border-blue-400'
                      }`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className={`text-sm font-bold mb-2 ${
                        card.type === 'then' ? 'text-amber-200' : 'text-blue-200'
                      }`}>
                        {card.type === 'then' ? '📜 THEN' : '🚀 NOW'}
                      </div>
                      <div className="text-5xl mb-2">{card.emoji}</div>
                      <div className="text-sm text-white text-center px-2">
                        {card.name}
                      </div>
                    </div>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-white/70 text-sm mt-4">
          💡 Click cards to flip them. Match old items with their modern versions!
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCardsTab;
