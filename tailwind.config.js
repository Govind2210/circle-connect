module.exports = {
  purge: ['./apps/crud-app/**/*.{js,ts,jsx,tsx}'],
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
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
