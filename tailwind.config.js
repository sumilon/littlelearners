/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: { 
          DEFAULT: '#9333EA', 
          light: '#F3E8FF', 
          dark: '#7C3AED',
          50: '#FAF5FF',
          100: '#F3E8FF',
          600: '#9333EA',
          700: '#7C3AED',
        },
        pink: { 
          DEFAULT: '#EC4899', 
          light: '#FCE7F3',
          50: '#FDF2F8',
          500: '#EC4899',
          600: '#DB2777',
        },
        blue: { 
          DEFAULT: '#3B82F6', 
          light: '#DBEAFE',
          50: '#EFF6FF',
          500: '#3B82F6',
          600: '#2563EB',
        },
        green: { 
          DEFAULT: '#10B981', 
          light: '#DCFCE7',
          50: '#F0FDF4',
          500: '#10B981',
          600: '#059669',
        },
        orange: { 
          DEFAULT: '#F97316', 
          light: '#FFEDD5',
          50: '#FFF7ED',
          500: '#F97316',
          600: '#EA580C',
        },
        yellow: { 
          DEFAULT: '#F59E0B', 
          light: '#FEF3C7',
          50: '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
        },
        amber: {
          50: '#FFFBEB',
          600: '#D97706',
        },
        teal: { 
          DEFAULT: '#14B8A6', 
          light: '#CCFBF1',
          50: '#F0FDFA',
          500: '#14B8A6',
          600: '#0D9488',
        },
        red: { 
          DEFAULT: '#EF4444', 
          light: '#FEE2E2',
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
        },
        bg: '#FAFAFA',
        card: '#FFFFFF',
        text: '#1F2937',
        text2: '#6B7280'
      },
      fontFamily: {
        sans: ['Nunito', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      borderRadius: {
        card: '20px'
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.15)',
        '3xl': '0 20px 50px rgba(0,0,0,0.2)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 8s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(-100px) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-300px) translateX(50px) rotate(-5deg)' },
          '50%': { transform: 'translateY(-500px) translateX(-25px) rotate(5deg)' },
          '75%': { transform: 'translateY(-650px) translateX(25px) rotate(-3deg)' },
          '100%': { transform: 'translateY(-800px) translateX(0) rotate(0deg)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
