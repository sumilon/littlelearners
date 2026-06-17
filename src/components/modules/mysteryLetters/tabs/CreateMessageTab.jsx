import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Copy, Check, Lightbulb } from 'lucide-react';
import { playSound } from '../../../../utils/audioUtils';
import { speak } from '../../../../utils/speechUtils';
import { emojiCipher, encodeToEmojis, sampleMessages } from '../../../../data/mysteryLettersData';

const CreateMessageTab = ({ onBadgeEarned }) => {
  const [inputText, setInputText] = useState('');
  const [encodedMessage, setEncodedMessage] = useState([]);
  const [showEncoded, setShowEncoded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [createdCount, setCreatedCount] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    // Only allow letters and spaces
    const filtered = value.replace(/[^A-Z\s]/g, '');
    setInputText(filtered);
    setShowEncoded(false);
    setCopied(false);
  };

  const handleEncode = () => {
    if (inputText.trim().length === 0) {
      speak('Please type a message first!');
      return;
    }

    playSound('success');
    const encoded = encodeToEmojis(inputText.trim());
    setEncodedMessage(encoded);
    setShowEncoded(true);
    setCreatedCount(createdCount + 1);
    speak('Your secret message is ready!');

    // Check for message creator badge
    if (createdCount === 0 && onBadgeEarned) {
      onBadgeEarned('message-creator');
    }
  };

  const handleReset = () => {
    playSound('click');
    setInputText('');
    setEncodedMessage([]);
    setShowEncoded(false);
    setCopied(false);
  };

  const handleCopy = () => {
    const emojiText = encodedMessage.map(item => item.emoji).join('');
    navigator.clipboard.writeText(emojiText).then(() => {
      playSound('success');
      setCopied(true);
      speak('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSampleMessage = (message) => {
    playSound('click');
    setInputText(message);
    speak(`Sample message: ${message}`);
  };

  const handleLetterClick = (letter) => {
    if (letter === ' ') return;
    playSound('click');
    const cipher = emojiCipher[letter];
    speak(`${letter} for ${cipher.name}`);
  };

  return (
    <div className="min-h-[50vh] max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-2">
            ✉️ Create Secret Messages
          </h2>
          <p className="text-xl text-white/80">
            Type a message and turn it into emoji code!
          </p>
          {createdCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 mt-3"
            >
              <span className="text-white/80 text-sm">Messages Created: </span>
              <span className="text-white font-bold text-lg">{createdCount}</span>
            </motion.div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 mb-6 shadow-2xl">
          <div className="mb-6">
            <label className="block text-white font-bold text-lg mb-3">
              1️⃣ Type Your Message (letters only)
            </label>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your secret message here..."
              maxLength={50}
              rows={3}
              className="w-full bg-white/10 backdrop-blur-md text-white text-2xl placeholder-white/60 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-yellow-400 resize-none"
            />
            <div className="text-white/70 text-sm mt-2 text-right">
              {inputText.length} / 50 characters
            </div>
          </div>

          {/* Sample Messages */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">Need Ideas? Try these:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleMessages.map((message, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSampleMessage(message)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-sm transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {message}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Encode Button */}
          <div className="flex gap-3 justify-center">
            <motion.button
              onClick={handleEncode}
              disabled={inputText.trim().length === 0}
              className={`px-8 py-4 rounded-xl font-bold text-xl transition-all ${
                inputText.trim().length === 0
                  ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900'
              }`}
              whileHover={inputText.trim().length > 0 ? { scale: 1.05 } : {}}
              whileTap={inputText.trim().length > 0 ? { scale: 0.95 } : {}}
            >
              <Sparkles className="inline w-6 h-6 mr-2" />
              2️⃣ Encode Message
            </motion.button>

            {inputText.length > 0 && (
              <motion.button
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="inline w-5 h-5 mr-2" />
                Reset
              </motion.button>
            )}
          </div>
        </div>

        {/* Encoded Message Display */}
        <AnimatePresence>
          {showEncoded && encodedMessage.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 mb-6 shadow-2xl"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Your Secret Message is Ready!
                </h3>
                <p className="text-white/90 text-lg">
                  Click any emoji to hear what letter it represents
                </p>
              </div>

              {/* Encoded Emoji Display */}
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 mb-6">
                <div className="flex flex-wrap justify-center gap-3">
                  {encodedMessage.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleLetterClick(item.letter)}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`rounded-xl p-3 transition-all ${
                        item.letter === ' ' 
                          ? 'cursor-default' 
                          : 'bg-white/10 hover:bg-white/20 hover:scale-110'
                      }`}
                      whileHover={item.letter !== ' ' ? { scale: 1.15 } : {}}
                      whileTap={item.letter !== ' ' ? { scale: 0.95 } : {}}
                    >
                      <div className="text-6xl">{item.emoji}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Original Message Reveal */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 text-center">
                <div className="text-white/70 text-sm mb-2">Original Message:</div>
                <div className="text-3xl font-bold text-white tracking-wider">
                  {inputText}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                <motion.button
                  onClick={handleCopy}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <>
                      <Check className="inline w-5 h-5 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="inline w-5 h-5 mr-2" />
                      Copy Emojis
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={handleReset}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Another
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cipher Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            📖 Quick Cipher Reference
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2">
            {Object.entries(emojiCipher).map(([letter, cipher], index) => (
              <motion.button
                key={letter}
                onClick={() => {
                  playSound('click');
                  speak(`${letter} for ${cipher.name}`);
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                className="bg-white/10 hover:bg-white/20 rounded-xl p-2 transition-all"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div 
                  className="text-3xl mb-1"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.1
                  }}
                >
                  {cipher.emoji}
                </motion.div>
                <div className="text-xs font-bold text-white">{letter}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-blue-500/20 backdrop-blur-md rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white text-center mb-4">
            💡 Message Creation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-white font-bold mb-1">Keep it Simple</div>
              <div className="text-white/80 text-sm">
                Short messages are easier for friends to decode!
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">📱</div>
              <div className="text-white font-bold mb-1">Share with Friends</div>
              <div className="text-white/80 text-sm">
                Copy the emojis and send them in messages!
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-white font-bold mb-1">Get Creative</div>
              <div className="text-white/80 text-sm">
                Make up fun codes and challenge others to solve them!
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateMessageTab;
