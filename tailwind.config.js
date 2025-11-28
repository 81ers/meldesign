/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#b3b3b3',
          400: '#8a8a8a',
          500: '#6b6b6b',
          600: '#4a4a4a',
          700: '#3a3a3a',
          800: '#2a2a2a',
          900: '#1a1a1a',
        },
        vizon: {
          50: '#faf8f5',
          100: '#f3ede6',
          200: '#e8ddd0',
          300: '#dccab8',
          400: '#d0b8a3',
          500: '#c4a68f',
          600: '#b8957a',
          700: '#a8826b',
          800: '#8f6f5d',
          900: '#765c4d',
          DEFAULT: '#c4a68f',
          dark: '#9d7d6a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}




