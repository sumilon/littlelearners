import { motion } from 'framer-motion';
import { bounceVariants } from '../../utils/animationUtils';
import { useEffect, useState } from 'react';
import { getRandomMascot } from '../../utils/gameHelpers';

const Mascot = () => {
  const [mascot, setMascot] = useState('🦉');

  useEffect(() => {
    setMascot(getRandomMascot());
  }, []);

  return (
    <motion.div
      className="relative inline-block"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }}
    >
      {/* Glow effect background */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-8xl">✨</span>
      </motion.div>

      {/* Mascot with enhanced animation */}
      <motion.div
        className="relative"
        variants={bounceVariants}
        animate="animate"
      >
        <motion.span
          className="text-7xl md:text-8xl inline-block no-select drop-shadow-2xl filter"
          whileHover={{
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {mascot}
        </motion.span>

        {/* Floating sparkles */}
        <motion.span
          className="absolute -top-2 -right-2 text-2xl"
          animate={{
            y: [0, -8, 0],
            x: [0, 4, 0],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.span>

        <motion.span
          className="absolute -bottom-2 -left-2 text-xl"
          animate={{
            y: [0, 8, 0],
            x: [0, -4, 0],
            opacity: [0.5, 1, 0.5],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          🌟
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Mascot;
