/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'kaithi': ['Noto Sans Kaithi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 