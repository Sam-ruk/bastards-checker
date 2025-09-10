/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                    // Scan index.html for Tailwind classes
    "./src/**/*.{js,ts,jsx,tsx}",     // Scan all JS/TS/JSX/TSX files in src/
    "./components/**/*.{js,ts,jsx,tsx}" // Explicitly include components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
