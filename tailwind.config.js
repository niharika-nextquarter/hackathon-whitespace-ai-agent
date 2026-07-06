/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6fd',
          100: '#dcecfb',
          200: '#b3d8f5',
          300: '#7ab8ea',
          400: '#3f92da',
          500: '#0b6fc2',
          600: '#0857a0',
          700: '#08447e',
          800: '#0b3462',
          900: '#0a2a4f',
          950: '#061c36',
        },
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.45 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-soft': 'pulseSoft 1.8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
