/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#111118',
        border: '#1E1E2E',
        primary: '#7C3AED',
        secondary: '#06B6D4',
        success: '#10B981',
        danger: '#EF4444',
        textPrimary: '#F8F8FF',
        textMuted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        violet: '0 0 20px rgba(124,58,237,0.15)',
      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeSlideUp: 'fadeSlideUp 0.3s ease both',
        shimmer: 'shimmer 1.4s linear infinite',
        spin: 'spin 0.8s linear infinite',
      },
    },
  },
  plugins: [],
};
