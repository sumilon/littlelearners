import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { pianoKeys } from '../../../../data/miniPianoData';

const LearnNotesTab = () => {
  const { addStars, logActivity } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedNotes, setLearnedNotes] = useState(new Set());
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize Web Audio API
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const whiteKeys = pianoKeys.filter(key => key.color === 'white');
  const currentKey = whiteKeys[currentIndex];

  const playPianoNote = (frequency, duration = 500) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  const handlePlayNote = () => {
    playPianoNote(currentKey.frequency);
    speakEnglish(`Note ${currentKey.note}, also called ${currentKey.name}`);
  };

  const handleNext = () => {
    if (!learnedNotes.has(currentIndex)) {
      const newLearned = new Set(learnedNotes);
      newLearned.add(currentIndex);
      setLearnedNotes(newLearned);
      
      if (newLearned.size % 2 === 0) {
        addStars(2);
        playSound('star');
        logActivity('Mini Piano', 'Learn Notes', `Learned ${newLearned.size} notes`);
      }
    }

    if (currentIndex < whiteKeys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(whiteKeys.length - 1);
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Progress */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Notes Learned</p>
            <p className="text-3xl font-bold text-indigo-600">{learnedNotes.size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-3xl font-bold text-purple-600">
              {currentIndex + 1}/{whiteKeys.length}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            animate={{ width: `${((currentIndex + 1) / whiteKeys.length) * 100}%` }}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
          />
        </div>
      </motion.div>

      {/* Note Display */}
      <motion.div
        key={currentIndex}
        variants={scaleIn}
        initial="initial"
        animate="animate"
        className="bg-white rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-9xl"
          >
            {currentKey.emoji}
          </motion.div>

          <div>
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
              {currentKey.note}
            </div>
            <div className="text-4xl font-semibold text-gray-700">
              {currentKey.name}
            </div>
          </div>

          {/* Visual Piano Key */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayNote}
              className="w-32 h-64 bg-gradient-to-b from-white to-gray-100 rounded-2xl shadow-2xl border-4 border-gray-300 cursor-pointer flex items-end justify-center pb-4 hover:shadow-3xl transition-all"
            >
              <span className="text-2xl font-bold text-gray-700">{currentKey.note}</span>
            </motion.div>
          </div>

          {/* Play Note Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayNote}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
          >
            <Volume2 className="w-6 h-6" />
            Play Note
          </motion.button>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-6 h-6" />
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Learn Piano Notes:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>🎹 Learn each piano note and its name</li>
              <li>🔊 Click "Play Note" to hear the sound</li>
              <li>👂 Listen carefully to each note</li>
              <li>⭐ Earn stars for every 2 notes learned!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearnNotesTab;
