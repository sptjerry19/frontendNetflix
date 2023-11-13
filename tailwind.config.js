/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      "1/2": "500px",
      24: "240px",
      20: "200px",
      72: "720px",
      full: "100vh",
    },
    maxHeight: {
      "3/4": "80vh",
    },
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/1a5c57fd-7621-42e4-8488-e5ae84fe9ae5/VN-vi-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
