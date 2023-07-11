/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bakbak: 'Bakbak One',
      },
      colors: {
        mainBlue: {
          50: '#F0F6FF',
          100: '#dae4ff',
          200: '#bdd0ff',
          300: '#90b2ff',
          400: '#5383ff',
          500: '#355ffc',
        },
      },
    },
  },
  plugins: [],
};
