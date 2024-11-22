/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(150px, 1fr))",
      },
      colors: {
        E6E6: "#E6E6E6",
      },
      animation: {
        "cell-scale": "cell-scale 0.6s ease-in-out infinite alternate",
        chess: "chess-scale 0.8s ease-in-out infinite alternate",
      },
      height: {
        '2screen': '200vh'
      },
      keyframes: {
        "cell-scale": {
          "100%": {
            transform: "scale(1.1)",
          },
        },
        "chess-scale": {
          "100%": {
            transform: "scale(1.3)",
          },
        },
      },
    },
  },
  plugins: [],
}
