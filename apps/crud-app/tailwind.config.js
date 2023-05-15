const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        '0': '0',
        '250': '250px',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      width:{
        '23p': '23%',
        '48p': '48%'
      },
      height: {
        'screen-custom': 'calc(100vh - 40px)'
      },
      screens: {
        'md-max': {'max': '767px'},
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: 'jit',
};
