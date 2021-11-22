const tailwindcssForm = require('@tailwindcss/forms');

module.exports = {
  purge: [
    './src/**/*.tsx',
    './src/**/*.html',
    './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [
    tailwindcssForm,
  ],
}
