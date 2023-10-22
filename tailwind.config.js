/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      "1/2": "500px",
      24: "240px",
      20: "200px",
      full: "100vh",
    },
    extend: {},
  },
  plugins: [],
};
