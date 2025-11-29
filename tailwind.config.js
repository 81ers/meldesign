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
          50: '#f5f3f2',
          100: '#ebe7e5',
          200: '#e6ded9',
          300: '#D1C8C3',
          400: '#D1C8C3',
          500: '#D1C8C3',
          600: '#D1C8C3',
          700: '#D1C8C3',
          800: '#D1C8C3',
          900: '#D1C8C3',
          DEFAULT: '#D1C8C3',
          dark: '#D1C8C3',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        caveat: ['var(--font-caveat)', 'cursive'],
      },
    },
  },
  plugins: [],
}




