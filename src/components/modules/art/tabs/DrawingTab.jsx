import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Eraser, RotateCcw, Save, Sparkles, Star } from 'lucide-react';
import { drawingColors, brushSizes, drawingPrompts } from '../../../../data/artData';
import useStore from '../../../../store/useStore';
import { playSound } from '../../../../utils/audioUtils';
import { speakEnglish } from '../../../../utils/speechUtils';
import { scaleIn } from '../../../../utils/animationUtils';

const DrawingTab = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(drawingColors[0]);
  const [selectedBrushSize, setSelectedBrushSize] = useState(brushSizes[1]);
  const [currentPrompt, setCurrentPrompt] = useState(drawingPrompts[0]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const addStars = useStore(state => state.addStars);
  const logActivity = useStore(state => state.logActivity);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Set white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    speakEnglish(`Let's draw! ${currentPrompt.prompt}`);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setHasDrawn(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (e.type.startsWith('touch')) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = selectedBrushSize.size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = selectedColor.hex;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    playSound('click');
    speakEnglish(color.name);
  };

  const handleBrushSizeSelect = (size) => {
    setSelectedBrushSize(size);
    playSound('click');
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    playSound('click');
    speakEnglish('Canvas cleared! Start drawing again!');
  };

  const handleSaveDrawing = () => {
    if (!hasDrawn) {
      speakEnglish('Draw something first!');
      return;
    }

    playSound('correct');
    playSound('star');
    addStars(5);
    logActivity('art', 'drawing', `Completed drawing: ${currentPrompt.prompt}`);
    speakEnglish('Amazing artwork! You earned 5 stars!');
    
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleNewPrompt = () => {
    const randomPrompt = drawingPrompts[Math.floor(Math.random() * drawingPrompts.length)];
    setCurrentPrompt(randomPrompt);
    playSound('click');
    speakEnglish(`New challenge! ${randomPrompt.prompt}`);
    handleClearCanvas();
  };

  return (
    <div className="space-y-3 md:space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto px-2 pb-4">
      {/* Drawing Prompt */}
      <motion.div 
        className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg text-center"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-yellow-300" size={18} />
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Drawing Challenge</h3>
          <Sparkles className="text-yellow-300" size={18} />
        </div>
        <p className="text-base md:text-lg lg:text-xl text-white font-semibold mb-2 md:mb-3">
          {currentPrompt.prompt} {currentPrompt.emoji}
        </p>
        <motion.button
          onClick={handleNewPrompt}
          className="bg-white text-purple-600 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-sm md:text-base font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎲 New Challenge
        </motion.button>
      </motion.div>

      {/* Color Palette */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <Palette size={16} className="md:w-5 md:h-5 text-purple-600" />
          <h4 className="text-sm md:text-base font-bold text-gray-700">Colors</h4>
        </div>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {drawingColors.map((color) => (
            <motion.button
              key={color.name}
              onClick={() => handleColorSelect(color)}
              className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full shadow-md transition-all ${
                selectedColor.name === color.name 
                  ? 'ring-2 md:ring-4 ring-purple-500 scale-110' 
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={color.name}
            />
          ))}
        </div>
      </motion.div>

      {/* Brush Size Selector */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <h4 className="text-sm md:text-base font-bold text-gray-700 mb-2 md:mb-3">Brush Size</h4>
        <div className="flex gap-2 md:gap-3">
          {brushSizes.map((size) => (
            <motion.button
              key={size.name}
              onClick={() => handleBrushSizeSelect(size)}
              className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-lg md:rounded-xl font-bold transition-all ${
                selectedBrushSize.name === size.name
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl md:text-2xl mb-1">{size.emoji}</div>
              <div className="text-xs md:text-sm">{size.name}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Canvas */}
      <motion.div 
        className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-xl"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="w-full h-64 md:h-80 lg:h-96 border-2 md:border-4 border-purple-200 rounded-lg md:rounded-xl cursor-crosshair touch-none"
          style={{ touchAction: 'none' }}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="grid grid-cols-3 gap-2 md:gap-3"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <motion.button
          onClick={handleClearCanvas}
          className="py-2 md:py-3 lg:py-4 px-2 md:px-4 rounded-lg md:rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="inline mb-1" size={16} />
          <div className="text-xs md:text-sm">Clear</div>
        </motion.button>

        <motion.button
          onClick={handleSaveDrawing}
          disabled={!hasDrawn}
          className={`py-2 md:py-3 lg:py-4 px-2 md:px-4 rounded-lg md:rounded-xl font-bold shadow-lg ${
            hasDrawn
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={hasDrawn ? { scale: 1.05 } : {}}
          whileTap={hasDrawn ? { scale: 0.95 } : {}}
        >
          <Save className="inline mb-1" size={16} />
          <div className="text-xs md:text-sm">Save ⭐⭐⭐⭐⭐</div>
        </motion.button>

        <motion.button
          onClick={handleNewPrompt}
          className="py-2 md:py-3 lg:py-4 px-2 md:px-4 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="inline mb-1" size={16} />
          <div className="text-xs md:text-sm">New Idea</div>
        </motion.button>
      </motion.div>

      {/* Celebration */}
      {showCelebration && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="text-5xl md:text-6xl lg:text-7xl mb-3 md:mb-4">🎨✨🌟</div>
            <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">
              Amazing Artwork!
            </div>
            <div className="text-xl md:text-2xl text-gray-700">
              +5 Stars! ⭐⭐⭐⭐⭐
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div 
        className="bg-yellow-100 rounded-xl md:rounded-2xl p-3 md:p-4 text-center"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <p className="text-sm md:text-base lg:text-lg text-gray-700">
          <Star className="inline text-yellow-500" size={16} /> 
          Choose a color and brush size, then draw on the canvas! Save your artwork to earn 5 stars!
        </p>
      </motion.div>
    </div>
  );
};

export default DrawingTab;
