/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      colors: {
        "lp-primary": "#4A90E2",
        "lp-secondary": "#A0D468",
        "lp-secondary-action": "#F6BB42",
        "lp-accent": "#EA6A47",
        "lp-gray-light": "#ECECEC",
        "lp-gray-dark": "#333333",
        "white": "#ffffff",
      },
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
