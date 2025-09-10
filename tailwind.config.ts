/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",                // root-level files
    "./components/**/*.{js,ts,jsx,tsx}",  // components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
