const colors = require('tailwindcss/colors')

/**
 * @type {import('../data/themes').ThemeDefs}
 */
module.exports = {
  light: {
    bg: 'white',
    tx: colors.gray['900'],
    br: colors.blue['600'],
  },
  dark: {
    bg: colors.gray['900'],
    tx: 'white',
    br: colors.blue['700'],
  },
}
