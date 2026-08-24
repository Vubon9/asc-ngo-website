/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        asc: {
          green: '#0e7490',
          darkgreen: '#155e75',
          navy: '#0f172a',
          emerald: '#059669',
          gold: '#d97706',
          light: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}
