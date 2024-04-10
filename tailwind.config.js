/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        100: '#dce6ea',
        200: '#b8ccd6',
        300: '#95b3c1',
        400: '#7199ad',
        500: '#4e8098',
        600: '#3e667a',
        700: '#2f4d5b',
        800: '#1f333d',
        900: '#101a1e',
      },
      primaryText: '#101a1e',
      secondaryText: '#7199ad',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
