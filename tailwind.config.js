/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bf-red': '#DA291C',
        'bf-yellow': '#FFC72C',
        'bf-dark': '#27251F',
        'bf-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
}
