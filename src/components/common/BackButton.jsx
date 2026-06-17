import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import useStore from '../../store/useStore';
import { playClick } from '../../utils/audioUtils';

const BackButton = () => {
  const setScreen = useStore((state) => state.setScreen);

  const handleBack = () => {
    playClick();
    setScreen('home');
  };

  return (
    <motion.button
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleBack}
      aria-label="Go back to home screen"
      className="flex items-center gap-2 px-5 py-2 mb-4 bg-white border-2 border-purple-light rounded-full font-bold text-purple hover:bg-purple-light transition-colors"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </motion.button>
  );
};

export default BackButton;
