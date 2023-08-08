/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#007bff',
        'blue-secondary': '#0079b2',
        'blue-light': '#80d6ff',
        'blue-lighter': '#bfeaff',
      },
      fontFamily: {
        marcellus: ['"Marcellus SC"', 'serif'],
      },
    },
  },
  plugins: [],
};
