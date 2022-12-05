const colors = require('tailwindcss/colors')

module.exports = {
  light: {
    bg: 'white',
    tx: colors.gray['900'],
    br: colors.blue['600'],
    className: 'theme-light'
  },
  dark: {
    bg: colors.gray['900'],
    tx: 'white',
    br: colors.blue['700'],
    className: 'theme-dark'
  },
}
