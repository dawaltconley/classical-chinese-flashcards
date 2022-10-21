/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Noto Sans TC', 'sans-serif'],
      serif: ['Noto Serif TC', 'serif'],
      display: ['Ma Shan Zheng', 'Noto Serif Traditional Chinese', 'serif'],
    },
    extend: {
      colors: {
        'theme-green': {
          DEFAULT: 'var(--theme-green)',
        },
        'theme-red': {
          DEFAULT: 'var(--theme-red)',
        },
      },
    },
  },
  plugins: [require('sass-themes/tailwind')],
}
