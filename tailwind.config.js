/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(150px, 1fr))'
      },
      colors: {
        'E6E6': '#E6E6E6'
      },
    },
  },
  plugins: [],
}
