import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Star } from 'lucide-react';
import { memoryCards } from '../../../../data/brainGamesData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn } from '../../../../utils/animationUtils';
import { shuffle } from '../../../../utils/gameHelpers';

const MemoryTab = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    // Get cards for current difficulty
    let selectedCards = [];
    if (difficulty === 'easy') {
      selectedCards = memoryCards.filter(c => c.level === 'easy').slice(0, 6);
    } else if (difficulty === 'medium') {
      selectedCards = memoryCards.filter(c => c.level === 'medium').slice(0, 8);
    } else {
      selectedCards = memoryCards.filter(c => c.level === 'hard').slice(0, 10);
    }

    // Create pairs and shuffle
    const cardPairs = [...selectedCards, ...selectedCards].map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
      isFlipped: false,
      isMatched: false
    }));

    setCards(shuffle(cardPairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameStarted(false);
    setShowVictory(false);
    
    speakEnglish(`Memory game ready! ${difficulty} level. Find matching pairs!`);
  };

  const handleCardClick = (clickedCard) => {
    if (!gameStarted) setGameStarted(true);
    
    // Ignore if card already flipped or matched, or if 2 cards already flipped
    if (
      clickedCard.isMatched || 
      clickedCard.isFlipped || 
      flippedCards.length === 2
    ) {
      return;
    }

    playSound('click');

    // Flip the card
    const newCards = cards.map(card =>
      card.uniqueId === clickedCard.uniqueId
        ? { ...card, isFlipped: true }
        : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Check for match if 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      if (newFlippedCards[0].id === newFlippedCards[1].id) {
        // Match found!
        playSound('correct');
        playSound('star');
        speakEnglish('Match found! Great memory!');

        const newMatchedCards = [...matchedCards, newFlippedCards[0].id];
        setMatchedCards(newMatchedCards);

        // Mark cards as matched
        setTimeout(() => {
          const updatedCards = cards.map(card =>
            card.id === newFlippedCards[0].id
              ? { ...card, isMatched: true }
              : card
          );
          setCards(updatedCards);
          setFlippedCards([]);

          // Check for victory
          const pairCount = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;
          if (newMatchedCards.length === pairCount) {
            handleVictory();
          }
        }, 1000);
      } else {
        // No match
        playSound('wrong');
        speakEnglish('Not a match! Try again!');

        // Flip cards back after delay
        setTimeout(() => {
          const updatedCards = cards.map(card =>
            newFlippedCards.some(fc => fc.uniqueId === card.uniqueId)
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const handleVictory = () => {
    playSound('correct');
    const starsEarned = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
    addStars(starsEarned);
    logActivity('brainGames', 'memory', `Completed ${difficulty} level in ${moves} moves`);
    setShowVictory(true);
    speakEnglish(`Amazing! You won in ${moves} moves! You earned ${starsEarned} stars!`);
  };

  const handleDifficultyChange = (newDifficulty) => {
    playSound('click');
    setDifficulty(newDifficulty);
  };

  const handleReset = () => {
    playSound('click');
    initializeGame();
  };

  const pairCount = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-160px)] flex flex-col px-4 pt-2">
      {/* Stats and Controls - Ultra Compact */}
      <div className="flex-shrink-0">
        {/* Stats and Buttons in One Row */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg"
          variants={scaleIn}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center justify-between gap-2">
            {/* Stats */}
            <div className="flex gap-3 text-center flex-1">
              <div>
                <div className="text-base font-bold text-purple-600">{matchedCards.length}/{pairCount}</div>
                <div className="text-[10px] text-gray-600">Pairs</div>
              </div>
              <div>
                <div className="text-base font-bold text-blue-600">{moves}</div>
                <div className="text-[10px] text-gray-600">Moves</div>
              </div>
              <div>
                <div className="text-base font-bold text-green-600">
                  {difficulty === 'easy' ? '3⭐' : difficulty === 'medium' ? '4⭐' : '5⭐'}
                </div>
                <div className="text-[10px] text-gray-600">Stars</div>
              </div>
            </div>
            
            {/* Difficulty Buttons */}
            <div className="flex gap-1 flex-1">
              {['easy', 'medium', 'hard'].map((level) => (
                <motion.button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`flex-1 py-1 px-1 rounded text-[10px] font-bold capitalize ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
            
            {/* Reset Button */}
            <motion.button
              onClick={handleReset}
              className="px-2 py-1 rounded bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="inline" size={12} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Memory Cards Grid - Centered with max width/height */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          className={`grid gap-2 ${
            difficulty === 'easy' 
              ? 'grid-cols-4 max-w-2xl' 
              : difficulty === 'medium' 
              ? 'grid-cols-4 max-w-3xl' 
              : 'grid-cols-5 max-w-4xl'
          }`}
          style={{
            maxHeight: '70vh',
            width: '100%'
          }}
          variants={scaleIn}
          initial="initial"
          animate="animate"
        >
          {cards.map((card) => (
            <motion.button
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              className={`aspect-square rounded-xl shadow-xl transition-all flex items-center justify-center overflow-hidden ${
                card.isMatched
                  ? 'bg-gradient-to-br from-green-400 to-green-500'
                  : card.isFlipped
                  ? 'bg-gradient-to-br from-purple-400 to-pink-400'
                  : 'bg-gradient-to-br from-blue-400 to-cyan-400'
              }`}
              whileHover={!card.isMatched && !card.isFlipped ? { scale: 1.08 } : {}}
              whileTap={!card.isMatched && !card.isFlipped ? { scale: 0.92 } : {}}
              disabled={card.isMatched}
            >
              <AnimatePresence mode="wait">
                {card.isFlipped || card.isMatched ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                    className="leading-none"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                  >
                    {card.emoji}
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                    className="leading-none"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                  >
                    ❓
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Victory Modal */}
      {showVictory && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl text-center pointer-events-auto"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Trophy className="mx-auto text-yellow-500 mb-4" size={80} />
            <div className="text-4xl font-bold text-purple-600 mb-2">
              🎉 Victory! 🎉
            </div>
            <div className="text-2xl text-gray-700 mb-4">
              Completed in {moves} moves!
            </div>
            <div className="text-3xl mb-4">
              {difficulty === 'easy' ? '⭐⭐⭐' : difficulty === 'medium' ? '⭐⭐⭐⭐' : '⭐⭐⭐⭐⭐'}
            </div>
            <motion.button
              onClick={() => setShowVictory(false)}
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};

export default MemoryTab;
