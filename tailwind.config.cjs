/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./packages/www/index.html", "./packages/www/src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
};
