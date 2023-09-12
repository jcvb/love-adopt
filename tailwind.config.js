/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "la-primary": "#4A90E2",
        "la-primary-dark": "#0D509F",
        "la-secondary": "#A0D468",
        "la-secondary-action": "#F6BB42",
        "la-accent": "#EA6A47",
        "la-gray-light": "#ECECEC",
        "la-gray-dark": "#333333",
        white: "#ffffff",
      },
      width: {
        '100': '27rem',
        '110': '29em',
        '120': '31rem',
        '130': '34rem',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
