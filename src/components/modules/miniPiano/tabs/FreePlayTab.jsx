import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { fadeIn, scaleIn } from '../../../../utils/animationUtils';
import { pianoKeys } from '../../../../data/miniPianoData';

const FreePlayTab = () => {
  const { addStars, logActivity } = useStore();
  const [notesPlayed, setNotesPlayed] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const [activeKey, setActiveKey] = useState(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

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

  const handleKeyPress = (key) => {
    playPianoNote(key.frequency);
    setActiveKey(key.note);
    setNotesPlayed(notesPlayed + 1);

    // Award stars for milestones (silently, no sound)
    if ((notesPlayed + 1) % 20 === 0) {
      addStars(2);
      logActivity('Mini Piano', 'Free Play', `Played ${notesPlayed + 1} notes`);
    }

    setTimeout(() => setActiveKey(null), 200);
  };

  const whiteKeys = pianoKeys.filter(k => k.color === 'white');
  const blackKeys = pianoKeys.filter(k => k.color === 'black');

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Stats */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Notes Played</p>
            <p className="text-5xl font-bold text-indigo-600">{notesPlayed}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowLabels(!showLabels);
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
          >
            {showLabels ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </motion.button>
        </div>
      </motion.div>

      {/* Piano Title */}
      <motion.div variants={scaleIn} className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 shadow-xl text-center">
        <h2 className="text-4xl font-bold text-white mb-2">🎹 Play the Piano!</h2>
        <p className="text-xl text-white/90">Click or tap the keys to make music</p>
      </motion.div>

      {/* Piano Keyboard */}
      <motion.div variants={scaleIn} className="bg-gradient-to-b from-amber-900 to-amber-950 rounded-3xl p-8 shadow-2xl">
        <div className="relative bg-amber-800 rounded-2xl p-6">
          {/* White Keys Container */}
          <div className="flex justify-center gap-1">
            {whiteKeys.map((key) => (
              <motion.button
                key={key.note}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  backgroundColor: activeKey === key.note ? '#fbbf24' : '#ffffff',
                  scale: activeKey === key.note ? 0.95 : 1
                }}
                onClick={() => handleKeyPress(key)}
                className="relative w-20 h-80 bg-white rounded-b-xl shadow-xl border-2 border-gray-300 hover:shadow-2xl transition-all flex flex-col items-center justify-end pb-4"
              >
                {showLabels && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-700">{key.note}</div>
                    <div className="text-sm text-gray-500">{key.name}</div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Black Keys Container (Absolute positioned over white keys) */}
          <div className="absolute top-6 left-6 right-6 flex justify-center gap-1 pointer-events-none">
            {whiteKeys.map((whiteKey, index) => {
              // Find if there's a black key after this white key
              const blackKey = blackKeys.find(bk => bk.position === whiteKey.position + 0.5);
              
              return (
                <div key={index} className="relative w-20 flex justify-end pointer-events-none">
                  {blackKey && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        backgroundColor: activeKey === blackKey.note ? '#fbbf24' : '#000000',
                        scale: activeKey === blackKey.note ? 0.95 : 1
                      }}
                      onClick={() => handleKeyPress(blackKey)}
                      className="pointer-events-auto w-14 h-52 bg-black rounded-b-lg shadow-2xl border-2 border-gray-700 hover:bg-gray-800 transition-all flex flex-col items-center justify-end pb-3 z-10"
                      style={{ position: 'absolute', right: '-28px' }}
                    >
                      {showLabels && (
                        <div className="text-xs font-bold text-white">{blackKey.note}</div>
                      )}
                    </motion.button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="mt-6 text-center text-white/80 text-sm">
          Click any key to play a note • Play 20 notes to earn stars!
        </div>
      </motion.div>

      {/* Fun Stats */}
      <motion.div variants={scaleIn} className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl p-6 shadow-xl text-center">
          <div className="text-5xl mb-2">🎵</div>
          <div className="text-3xl font-bold text-white">{Math.floor(notesPlayed / 20)}</div>
          <div className="text-white/90">Stars Earned</div>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl p-6 shadow-xl text-center">
          <div className="text-5xl mb-2">🎹</div>
          <div className="text-3xl font-bold text-white">{notesPlayed}</div>
          <div className="text-white/90">Total Notes</div>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-6 shadow-xl text-center">
          <div className="text-5xl mb-2">⭐</div>
          <div className="text-3xl font-bold text-white">{20 - (notesPlayed % 20)}</div>
          <div className="text-white/90">To Next Star</div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Free Play Mode:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>🎹 Click any key to hear its sound</li>
              <li>⬜ White keys are natural notes (C, D, E, F, G, A, B)</li>
              <li>⬛ Black keys are sharp notes (C#, D#, F#, G#, A#)</li>
              <li>⭐ Play 20 notes to earn stars!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FreePlayTab;
