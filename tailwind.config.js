/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 2s infinite',
        'pulse': 'pulse 3s infinite',
        'spin': 'spin 20s linear infinite',
      },
      backdropBlur: {
        'sm': '4px',
      }
    },
  },
  plugins: [],
};