import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calculator } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { indianCurrency } from '../../../../data/moneyMathData';

function MakeChangeTab() {
  const { addStars, logActivity } = useStore();
  const [itemPrice, setItemPrice] = useState(0);
  const [amountGiven, setAmountGiven] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateProblem();
    return () => cancelSpeech();
  }, []);

  const generateProblem = () => {
    const prices = [15, 25, 35, 45, 55, 65, 75, 85, 95, 120, 140, 160, 180];
    const givenAmounts = [20, 50, 100, 200];
    
    const price = prices[Math.floor(Math.random() * prices.length)];
    const validAmounts = givenAmounts.filter(a => a > price);
    const given = validAmounts[Math.floor(Math.random() * validAmounts.length)];
    
    setItemPrice(price);
    setAmountGiven(given);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    
    playSound('click');
    setTimeout(() => {
      speakEnglish(`The item costs ${price} rupees. Customer gave ${given} rupees. What is the change?`);
    }, 500);
  };

  const handleNumberClick = (num) => {
    playSound('click');
    if (userAnswer.length < 3) {
      setUserAnswer(userAnswer + num);
    }
  };

  const handleClear = () => {
    playSound('click');
    setUserAnswer('');
  };

  const handleSubmit = () => {
    const correctChange = amountGiven - itemPrice;
    const userAnswerNum = parseInt(userAnswer) || 0;
    
    setShowResult(true);
    
    if (userAnswerNum === correctChange) {
      setIsCorrect(true);
      playSound('correct');
      addStars(5);
      playSound('star');
      speakEnglish(`Correct! The change is ${correctChange} rupees!`);
      logActivity('Money Math', 'Make Change', `Calculated change correctly: ₹${correctChange}`);
    } else {
      setIsCorrect(false);
      playSound('wrong');
      speakEnglish(`Wrong! The correct change is ${correctChange} rupees`);
    }
  };

  const handleNext = () => {
    generateProblem();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-4 pb-20">
      {/* Instructions */}
      <motion.div
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Calculate Change!</h3>
            <p className="text-gray-700">
              Work out how much change to give back! 💵
            </p>
          </div>
        </div>
      </motion.div>

      {/* Problem Display */}
      <motion.div
        className="bg-white rounded-xl shadow-xl p-6 mb-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🏪</div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Store Problem</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Item Price</div>
              <div className="text-3xl font-bold text-blue-600">₹{itemPrice}</div>
            </div>
            
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Customer Gave</div>
              <div className="text-3xl font-bold text-green-600">₹{amountGiven}</div>
            </div>
            
            <div className="bg-purple-100 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Change to Give</div>
              <div className="text-3xl font-bold text-purple-600">
                {userAnswer || '?'} {userAnswer && '₹'}
              </div>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                disabled={showResult}
                className="bg-white border-2 border-gray-300 rounded-lg py-4 text-2xl font-bold text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {num}
              </motion.button>
            ))}
            <motion.button
              onClick={handleClear}
              disabled={showResult}
              className="bg-red-100 border-2 border-red-300 rounded-lg py-4 text-xl font-bold text-red-600 hover:bg-red-200 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear
            </motion.button>
            <motion.button
              onClick={() => handleNumberClick('0')}
              disabled={showResult}
              className="bg-white border-2 border-gray-300 rounded-lg py-4 text-2xl font-bold text-gray-800 hover:bg-gray-100 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              0
            </motion.button>
            <motion.button
              onClick={handleSubmit}
              disabled={!userAnswer || showResult}
              className="bg-green-500 text-white rounded-lg py-4 text-xl font-bold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✓
            </motion.button>
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <motion.div
            className={`rounded-xl p-4 text-center ${
              isCorrect
                ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
            }`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="text-4xl mb-2">{isCorrect ? '✓' : '✗'}</div>
            <p className="text-xl font-bold mb-2">
              {isCorrect ? 'Correct!' : 'Try Again!'}
            </p>
            <p className="text-lg">
              Correct change: ₹{amountGiven - itemPrice}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Next Button */}
      {showResult && (
        <motion.button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Next Problem →
        </motion.button>
      )}
    </div>
  );
}

export default MakeChangeTab;
