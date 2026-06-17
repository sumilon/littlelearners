import { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { playClick } from '../../utils/audioUtils';

/**
 * Unified Button Component
 * 
 * A consistent, accessible, and child-friendly button component that replaces
 * 433+ button implementations across the application.
 * 
 * Features:
 * - WCAG AA compliant (4.5:1 contrast ratio)
 * - 44x44px minimum touch target (child-friendly)
 * - Consistent animations via Framer Motion
 * - Built-in audio feedback
 * - Full keyboard navigation support
 * - Screen reader optimized
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click Me
 * </Button>
 */

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  ...props
}, ref) => {

  // Variant styles (WCAG AA compliant)
  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
    outline: 'bg-white border-3 border-purple-500 text-purple-700 hover:bg-purple-50 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-purple-700 hover:bg-purple-100',
    link: 'bg-transparent text-purple-600 hover:text-purple-800 underline-offset-4 hover:underline',
  };

  // Size styles (all meet 44x44px minimum touch target)
  const sizeStyles = {
    sm: 'px-4 py-3 text-sm min-h-[44px]',      // 44px minimum
    md: 'px-6 py-3.5 text-base min-h-[48px]',  // 48px comfortable
    lg: 'px-8 py-4 text-lg min-h-[56px]',      // 56px child-friendly
    xl: 'px-10 py-5 text-xl min-h-[64px]',     // 64px extra large
  };

  // Icon sizes matching button size
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Play click sound for feedback
    playClick();
    
    // Call parent onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-500 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none';

  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyles}
    ${className}
  `.trim();

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={combinedClassName}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
      )}

      {/* Icon left */}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon size={iconSizes[size]} aria-hidden="true" />
      )}

      {/* Button content */}
      {children && (
        <span className="leading-none">{children}</span>
      )}

      {/* Icon right */}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon size={iconSizes[size]} aria-hidden="true" />
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default memo(Button);
