module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        site: "#e6523b"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
