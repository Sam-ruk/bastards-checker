/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                       // your entry HTML
    "./*.{js,ts,jsx,tsx}",                // root-level files like index.tsx, App.tsx
    "./components/**/*.{js,ts,jsx,tsx}",  // your components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
