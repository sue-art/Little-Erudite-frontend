/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  plugins: [require("daisyui")],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      blue: "#98D4E1",
      pink: "#FBD9CA",
      green: "#189198",
      orange: "#EF7E6B",
      purple: "#A98CE4",
      white: "#FFFFFF",
      gray: "#4E566E",
      red: "#EF7E6B",
      yellow: "#FDD28A",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blue: "#98D4E1",
        pink: "#FBD9CA",
        green: "#85D2D0",
        orange: "#EF7E6B",
        purple: "#887BB0",
        white: "#FFFFFF",
        gray: "#788799",
        red: "#EF7E6B",
        yellow: "#FDD28A",
      },
    },
  },
};
