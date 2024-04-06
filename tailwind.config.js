/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#000033',
        'dark-yellow': '#251700',
        'green': '#207a20',
        'red': '#b60e0e',
        'yellow': '#ffd700'
      },
      fontFamily: {
        'sans': ['Kanit', 'sans-serif']
      },
      fontSize: {
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}

