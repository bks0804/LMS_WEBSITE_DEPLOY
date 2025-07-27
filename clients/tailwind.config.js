/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0c2e60",
        secondary: "#0d6efd",
        gray1: "#e0e4e6",
        color1: "#5C7285",
        color2: "#818C78",
        color3: "#A7B49E",
        color4: "#A7B49E",
        color4: "#E2E0C8",
      },
      keyframes: {
        irregularMove: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(3px, -3px)" },
          "50%": { transform: "translate(-2px, 5px)" },
          "75%": { transform: "translate(4px, -5px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        irregularMove: "irregularMove 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
