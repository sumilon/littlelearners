// Framer Motion animation variants and utilities

// Screen transition animations
export const screenVariants = {
  enter: {
    x: 300,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Correct answer celebration
export const correctVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    backgroundColor: ['#FFFFFF', '#DCFCE7', '#FFFFFF'],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

// Wrong answer shake
export const wrongVariants = {
  initial: { x: 0 },
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Star fly animation (from answer to header)
export const starFlyVariants = {
  initial: { scale: 0, y: 0, x: 0, opacity: 1 },
  animate: {
    scale: [0, 1.5, 0],
    y: -400,
    x: Math.random() * 200 - 100,
    opacity: [1, 1, 0],
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

// Module card hover effect
export const cardHoverVariants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -6,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.97,
  },
};

// Balloon float animation
export const balloonVariants = {
  animate: {
    y: [-100, -800],
    x: ['0%', '10%', '-5%', '5%', '0%'],
    rotate: [0, -5, 5, -3, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Badge unlock modal
export const badgeModalVariants = {
  hidden: {
    y: 300,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 200,
    },
  },
  exit: {
    y: -100,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

// Confetti particle animation
export const confettiVariants = {
  initial: { y: -50, x: 0, opacity: 1, rotate: 0 },
  animate: (i) => ({
    y: 600,
    x: Math.sin(i) * 200,
    opacity: 0,
    rotate: 360 * (i % 2 ? 1 : -1),
    transition: {
      duration: 2 + Math.random(),
      ease: 'easeIn',
    },
  }),
};

// Bounce animation (for mascot)
export const bounceVariants = {
  animate: {
    y: [0, -16, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Fade in animation
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// Pop animation (for buttons)
export const popVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// Slide from bottom
export const slideUpVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Stagger children animation
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Convenient short names (aliases)
export const fadeIn = fadeInVariants;
export const slideIn = slideUpVariants;
export const scaleIn = popVariants;
export const correctAnswer = correctVariants;
export const wrongAnswer = wrongVariants;
export const confetti = confettiVariants;
export const balloons = balloonVariants;

// Wiggle animation
export const wiggle = {
  animate: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};
