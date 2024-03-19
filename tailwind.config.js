/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['"./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"'],
  theme: {
    extend: {},
  },
  presets: ["babel-preset-expo"],
  plugins: ["nativewind/babel"],
}

