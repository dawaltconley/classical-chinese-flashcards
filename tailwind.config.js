/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Noto Sans Traditional Chinese', 'sans-serif'],
      serif: ['Noto Serif Traditional Chinese', 'serif'],
      display: ['Ma Shan Zheng', 'Noto Serif Traditional Chinese', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
