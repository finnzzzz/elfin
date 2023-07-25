/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: {
          50: '#F0F6FF',
          100: '#dae4ff',
          200: '#bdd0ff',
          300: '#90b2ff',
          400: '#5383ff',
          500: '#355ffc',
        },
        customGreen: {
          50: '#F5FBE4',
          400: '#2DA08C',
          500: '#218171',
        },
        customOrange: {
          50: '#FFF4EE',
          400: '#fb8219',
          500: '#d06909',
        },
        customPurple: {
          50: '#F6F1FF',
          400: '#7E51DD',
          500: '#6b48b7',
        },
        customDarkYellow: {
          50: '#FBFAE3',
          400: '#f0b728',
          500: '#cd9a18',
        },
        customPink: {
          50: '#F8F3FF',
          400: '#f890d5',
          500: '#e277be',
        },
        customRed: {
          50: '#FFF2EB',
          400: '#F17070',
          500: '#DA6060',
        },
        customNileBlue: {
          50: '#ECFAFF',
          400: '#27A5CD',
          500: '#167FA0',
        },
        customDarkGreen: {
          50: '#FFFEEC',
          400: '#0F740D',
          500: '#0B5F09',
        },
        customDarkBlue: {
          50: '#DEE7FF',
          400: '#1E44A7',
          500: '#102f7c',
        },
      },
      borderRadius: {
        nodebase: '16px',
      },
      height: {
        mdflowContainer: 'calc(100% - 50px)',
        smflowContainer: 'calc(100% - 80px)',
        flowContainer: 'calc(100%)',
      },
    },
  },
  plugins: [],
};
