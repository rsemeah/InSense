/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Mystic-Minimalism palette */
        primary: '#B76E79',
        'accent-light': '#F8EBDD',
        background: '#FCFCFC',
        'text-primary': '#1E1B2E',
        'text-secondary': '#1E1B2E99',

        /* legacy alias (kept for existing classes) */
        'red-brand': '#B76E79',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
