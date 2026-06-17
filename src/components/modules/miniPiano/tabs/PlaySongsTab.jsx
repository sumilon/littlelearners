import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound, getSharedAudioContext } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, confetti } from '../../../../utils/animationUtils';
import { simpleSongs, pianoKeys } from '../../../../data/miniPianoData';

const PlaySongsTab = () => {
  const { addStars, logActivity } = useStore();
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSongs, setCompletedSongs] = useState(new Set());
  const timeoutRef = useRef(null);

  // Clear any pending playback timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const playPianoNote = (frequency, duration) => {
    if (!useStore.getState().soundEnabled) return;
    try {
      const ctx = getSharedAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration / 1000);
    } catch (error) {
      console.error('Error playing piano note:', error);
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setCurrentNoteIndex(0);
    setIsPlaying(false);
    speakEnglish(`Let's play ${song.name}!`);
  };

  const handlePlaySong = () => {
    if (!selectedSong || isPlaying) return;

    setIsPlaying(true);
    setCurrentNoteIndex(0);
    playNextNote(0);
  };

  const playNextNote = (index) => {
    if (index >= selectedSong.notes.length) {
      setIsPlaying(false);
      setCurrentNoteIndex(0);
      
      if (!completedSongs.has(selectedSong.id)) {
        const newCompleted = new Set(completedSongs);
        newCompleted.add(selectedSong.id);
        setCompletedSongs(newCompleted);
        
        playSound('star');
        const starsToAdd = selectedSong.difficulty === 'easy' ? 3 : 4;
        addStars(starsToAdd);
        logActivity('Mini Piano', 'Play Songs', `Completed: ${selectedSong.name}`);
        speakEnglish('Great job! You played the whole song!');
      }
      return;
    }

    setCurrentNoteIndex(index);
    const note = selectedSong.notes[index];
    const duration = selectedSong.durations[index];
    const key = pianoKeys.find(k => k.note === note);
    
    if (key) {
      playPianoNote(key.frequency, duration);
    }

    timeoutRef.current = setTimeout(() => {
      playNextNote(index + 1);
    }, duration + 100);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleReset = () => {
    setCurrentNoteIndex(0);
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  if (!selectedSong) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            Choose a Song to Play
          </h2>
          <p className="text-lg text-gray-600">
            Completed: {completedSongs.size}/{simpleSongs.length}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {simpleSongs.map((song) => {
            const isCompleted = completedSongs.has(song.id);
            return (
              <motion.button
                key={song.id}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSong(song)}
                className={`rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all ${
                  song.difficulty === 'easy'
                    ? 'bg-gradient-to-br from-green-400 to-emerald-400'
                    : 'bg-gradient-to-br from-yellow-400 to-orange-400'
                } ${isCompleted ? 'ring-4 ring-yellow-300' : ''}`}
              >
                <div className="text-7xl mb-4">{song.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{song.name}</h3>
                <p className="text-lg text-white/90 capitalize">{song.difficulty}</p>
                {isCompleted && (
                  <div className="mt-2 text-white font-bold">✅ Completed</div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Instructions */}
        <motion.div
          variants={fadeIn}
          className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-yellow-900 mb-2">Play Songs:</h3>
              <ul className="text-yellow-800 space-y-1">
                <li>🎵 Choose a song you want to learn</li>
                <li>▶️ Press play to hear the melody</li>
                <li>👀 Watch the notes as they play</li>
                <li>⭐ Complete songs to earn stars!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Song Header */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{selectedSong.emoji}</span>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{selectedSong.name}</h3>
              <p className="text-lg text-gray-600 capitalize">{selectedSong.difficulty}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSong(null)}
            className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold shadow-lg"
          >
            Choose Another
          </motion.button>
        </div>
      </motion.div>

      {/* Player Controls */}
      <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-center gap-4 mb-8">
          {!isPlaying ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlaySong}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
            >
              <Play className="w-6 h-6" />
              Play Song
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePause}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
            >
              <Pause className="w-6 h-6" />
              Pause
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
          >
            <RotateCcw className="w-6 h-6" />
            Reset
          </motion.button>
        </div>

        {/* Note Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-bold text-gray-700">Notes:</p>
            <p className="text-lg font-bold text-indigo-600">
              {currentNoteIndex + 1} / {selectedSong.notes.length}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {selectedSong.notes.map((note, index) => {
              const isCurrent = index === currentNoteIndex;
              const isPast = index < currentNoteIndex;

              return (
                <motion.div
                  key={index}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                    opacity: isPast ? 0.5 : 1
                  }}
                  className={`w-16 h-20 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg ${
                    isCurrent
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white ring-4 ring-yellow-300'
                      : isPast
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-gradient-to-br from-indigo-400 to-purple-400 text-white'
                  }`}
                >
                  {note}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlaySongsTab;
