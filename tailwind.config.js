/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        darkgray: "#111111",
        charcoal: "#1A1A1A",
        gold: "#D4AF37",
        goldlight: "#E8C84A",
        golddark: "#B8962E",
        white: "#F5F5F5",
        muted: "#888888",
        border: "#222222",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', '"Helvetica Neue"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
