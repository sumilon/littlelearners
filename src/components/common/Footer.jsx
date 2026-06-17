import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-t border-purple-200/50 py-8 mt-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4">
          {/* Brand */}
          <motion.div
            className="flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-3xl"
              animate={{
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              🌟
            </motion.span>
            <h3 className="text-2xl font-black">
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                Little
              </span>
              {' '}
              <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                Learners
              </span>
            </h3>
          </motion.div>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-sm font-medium">Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </motion.div>
            <span className="text-sm font-medium">for curious minds</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span>Interactive Learning</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <span>🎮</span>
              <span>Fun Games</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <span>🏆</span>
              <span>Achievement Tracking</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <span>👨‍👩‍👧</span>
              <span>Parent Dashboard</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-purple-200/50">
            <p className="text-xs text-gray-500">
              © {currentYear} Little Learners. Empowering young minds through play-based learning.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-3 text-2xl opacity-40">
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              🎨
            </motion.span>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              📚
            </motion.span>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              🎵
            </motion.span>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            >
              🌍
            </motion.span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
