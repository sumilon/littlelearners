import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle, Play, Save, Trash2, Sparkles } from 'lucide-react';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { fadeIn, scaleIn, wiggle } from '../../../../utils/animationUtils';
import { pianoKeys } from '../../../../data/miniPianoData';

const RecordMusicTab = () => {
  const { addStars, logActivity } = useStore();
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState([]);
  const [savedRecordings, setSavedRecordings] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioContextRef = useRef(null);
  const recordingStartTime = useRef(null);

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

  const handleStartRecording = () => {
    speakEnglish('Recording started! Play some notes on the piano.');
    setIsRecording(true);
    setCurrentRecording([]);
    recordingStartTime.current = Date.now();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    recordingStartTime.current = null;
    
    if (currentRecording.length > 0) {
      speakEnglish('Recording stopped! You can play it back or save it.');
    } else {
      speakEnglish('No notes recorded. Try recording again!');
    }
  };

  const handleKeyPress = (key) => {
    playPianoNote(key.frequency);
    
    if (isRecording) {
      const timestamp = Date.now() - recordingStartTime.current;
      setCurrentRecording([...currentRecording, { note: key.note, frequency: key.frequency, timestamp }]);
    }
  };

  const handlePlayRecording = async (recording) => {
    if (isPlaying) return;

    setIsPlaying(true);

    for (let i = 0; i < recording.length; i++) {
      const note = recording[i];
      const delay = i === 0 ? 0 : note.timestamp - recording[i - 1].timestamp;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      playPianoNote(note.frequency, 300);
    }

    setIsPlaying(false);
  };

  const handleSaveRecording = () => {
    if (currentRecording.length === 0) {
      speakEnglish('Nothing to save! Record some notes first.');
      playSound('wrong');
      return;
    }

    playSound('correct');
    playSound('star');
    speakEnglish('Recording saved!');

    const newRecording = {
      id: Date.now(),
      notes: currentRecording,
      length: currentRecording.length,
      date: new Date().toLocaleString()
    };

    setSavedRecordings([...savedRecordings, newRecording]);
    setCurrentRecording([]);
    addStars(3);
    logActivity('Mini Piano', 'Record Music', `Saved recording with ${currentRecording.length} notes`);
  };

  const handleDeleteRecording = (id) => {
    setSavedRecordings(savedRecordings.filter(r => r.id !== id));
  };

  const whiteKeys = pianoKeys.filter(k => k.color === 'white').slice(0, 8);

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Recording Controls */}
      <motion.div variants={scaleIn} className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Current Recording</p>
            <p className="text-4xl font-bold text-indigo-600">{currentRecording.length} notes</p>
          </div>
          <div className="flex gap-3">
            {!isRecording ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartRecording}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Record
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStopRecording}
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 animate-pulse"
              >
                <StopCircle className="w-5 h-5" />
                Stop
              </motion.button>
            )}
            
            {currentRecording.length > 0 && !isRecording && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlayRecording(currentRecording)}
                  disabled={isPlaying}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Play
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveRecording}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save
                </motion.button>
              </>
            )}
          </div>
        </div>

        {isRecording && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-center text-red-500 font-bold text-xl"
          >
            🔴 Recording in progress... Play the piano!
          </motion.div>
        )}
      </motion.div>

      {/* Simple Piano for Recording */}
      <motion.div variants={scaleIn} className="bg-gradient-to-b from-amber-900 to-amber-950 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-white text-center mb-6">
          🎹 Play to {isRecording ? 'Record' : 'Hear'} Notes
        </h3>
        <div className="flex justify-center gap-2">
          {whiteKeys.map((key) => (
            <motion.button
              key={key.note}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeyPress(key)}
              className="w-20 h-64 bg-white rounded-b-xl shadow-xl border-2 border-gray-300 hover:shadow-2xl transition-all flex flex-col items-center justify-end pb-4"
            >
              <div className="text-xl font-bold text-gray-700">{key.note}</div>
              <div className="text-sm text-gray-500">{key.name}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Saved Recordings */}
      {savedRecordings.length > 0 && (
        <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            🎵 Your Saved Recordings ({savedRecordings.length})
          </h3>
          <div className="space-y-4">
            {savedRecordings.map((recording) => (
              <motion.div
                key={recording.id}
                variants={wiggle}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">🎼</span>
                    <div>
                      <p className="text-xl font-bold text-gray-800">
                        Recording #{savedRecordings.indexOf(recording) + 1}
                      </p>
                      <p className="text-sm text-gray-600">{recording.date}</p>
                    </div>
                  </div>
                  <p className="text-lg text-indigo-700 font-semibold">
                    {recording.length} notes
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setPlayingIndex(recording.id);
                      handlePlayRecording(recording.notes).then(() => setPlayingIndex(null));
                    }}
                    disabled={isPlaying}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    {playingIndex === recording.id ? 'Playing...' : 'Play'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteRecording(recording.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold shadow-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        variants={fadeIn}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Record Your Music:</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>🎤 Press "Record" and start playing notes</li>
              <li>⏹️ Press "Stop" when you're done</li>
              <li>▶️ Press "Play" to hear your recording</li>
              <li>💾 Press "Save" to keep your creation!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecordMusicTab;
