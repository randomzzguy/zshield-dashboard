/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#800000',
        'maroon-light': '#a00000',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

