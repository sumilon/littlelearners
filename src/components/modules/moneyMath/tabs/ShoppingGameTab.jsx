import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingCart, Trash2 } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish, cancelSpeech } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { shoppingItems } from '../../../../data/moneyMathData';

function ShoppingGameTab() {
  const { addStars, logActivity } = useStore();
  const [cart, setCart] = useState([]);
  const [budget, setBudget] = useState(100);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const remaining = budget - total;

  const handleAddToCart = (item) => {
    if (total + item.price <= budget) {
      playSound('correct');
      setCart([...cart, item]);
      speakEnglish(`Added ${item.name} for ${item.price} rupees`);
      
      if (cart.length === 0) {
        logActivity('Money Math', 'Shopping Game', 'Started shopping');
      }
    } else {
      playSound('wrong');
      speakEnglish('Not enough money!');
    }
  };

  const handleRemoveFromCart = (index) => {
    playSound('click');
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      playSound('wrong');
      speakEnglish('Your cart is empty!');
      return;
    }

    playSound('star');
    addStars(cart.length * 2);
    setShowSuccess(true);
    speakEnglish(`Great shopping! You spent ${total} rupees and saved ${remaining} rupees!`);
    logActivity('Money Math', 'Shopping Game', `Completed shopping: spent ₹${total}`);

    setTimeout(() => {
      setShowSuccess(false);
      setCart([]);
    }, 3000);
  };

  const handleChangeBudget = (amount) => {
    playSound('click');
    setBudget(amount);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 pb-20">
      {/* Instructions */}
      <motion.div
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-4 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Go Shopping!</h3>
            <p className="text-sm text-gray-700">
              Buy items within your budget. Don't overspend! 🛒
            </p>
          </div>
        </div>
      </motion.div>

      {/* Budget Selector */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
        <h3 className="font-bold text-gray-700 mb-2">Your Budget:</h3>
        <div className="grid grid-cols-3 gap-2">
          {[50, 100, 200].map(amount => (
            <button
              key={amount}
              onClick={() => handleChangeBudget(amount)}
              className={`py-2 px-3 rounded-lg font-bold transition-all ${
                budget === amount
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
      </div>

      {/* Money Display */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 shadow text-center">
          <div className="text-xs text-gray-600 mb-1">Budget</div>
          <div className="text-xl font-bold text-blue-600">₹{budget}</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow text-center">
          <div className="text-xs text-gray-600 mb-1">Spent</div>
          <div className="text-xl font-bold text-purple-600">₹{total}</div>
        </div>
        <div className={`bg-white rounded-lg p-3 shadow text-center ${remaining < 0 ? 'ring-2 ring-red-500' : ''}`}>
          <div className="text-xs text-gray-600 mb-1">Left</div>
          <div className={`text-xl font-bold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ₹{remaining}
          </div>
        </div>
      </div>

      {/* Shopping Items */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {shoppingItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => handleAddToCart(item)}
            className="bg-white rounded-xl p-3 shadow-lg hover:scale-105 transition-all"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={index}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2">{item.emoji}</div>
            <div className="text-xs font-bold text-gray-800 mb-1">{item.name}</div>
            <div className="text-sm font-bold text-green-600">₹{item.price}</div>
          </motion.button>
        ))}
      </div>

      {/* Shopping Cart */}
      {cart.length > 0 && (
        <motion.div
          className="bg-white rounded-xl p-4 mb-4 shadow-xl"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-lg text-gray-800">Your Cart ({cart.length})</h3>
          </div>
          <div className="space-y-2 mb-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-semibold text-gray-800">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">₹{item.price}</span>
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Checkout ✓
          </button>
        </motion.div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-8 text-center max-w-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Great Shopping!</h3>
            <p className="text-lg text-gray-600 mb-2">Spent: ₹{total}</p>
            <p className="text-lg text-gray-600">Saved: ₹{remaining}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ShoppingGameTab;
