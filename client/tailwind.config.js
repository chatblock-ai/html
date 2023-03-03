
// tailwind.config.js

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "light-white": "#ffffff2b",
        "dark-grey": "#202123",
        "light-grey": "#353740",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [

  ]
}