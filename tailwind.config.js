/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        mediterranean: {
          blue: '#0077BE',
          sand: '#F4E8D0',
          terracotta: '#D4704B',
          olive: '#6B8E23',
          cream: '#FFFEF2',
        },
      },
    },
  },
  plugins: [],
}
