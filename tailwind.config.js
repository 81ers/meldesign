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
          50: '#f8f6f4',
          100: '#f1ede9',
          200: '#e3dbd3',
          300: '#d5c9bd',
          400: '#c7b7a7',
          500: '#B8A599',
          600: '#A08B80',
          700: '#8f7a6f',
          800: '#7e695e',
          900: '#6d584d',
          DEFAULT: '#B8A599',
          dark: '#A08B80',
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




