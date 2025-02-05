module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        violetBg:"#7300E5",
        blueBg:"#2B00FF",
        greenBg:"#34D058"
      }
    },

    fontFamily: {
      'atkinson': ['Atkinson Hyperlegible'],
      'roboto': ['Roboto', 'sans-serif'], 
  },
 
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
