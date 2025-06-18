/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'red-brand': '#B76E79',
        'cream': '#F8EBDD',
      },
    },
  },
  plugins: [],
}
