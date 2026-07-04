/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,scss}'],
  theme: {
    colors: {
      'blue-dark': '#0E1119',
      'blue-middle': '#1A1E29',
      'blue-middle-opacity-75': '#1A1E29BF',
      'blue-light': '#292F41',
      grey: '#6A6E79',
      'grey-opacity-25': 'rgba(106,110,121,0.25)',
      green: '#01C38E',
      'green-dark': '#008F68',
      white: '#FFFFFF',
      red: '#F45050',
    },
    fontFamily: {
      new_zelek: ['New_Zelek', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
