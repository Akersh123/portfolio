/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00FF7F",
        cyan: "#39FF14",
        blue: "#00E5A0",
        teal: "#2BFF88",
        purple: "#7CFF00",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 0 30px rgba(57, 255, 20,0.2)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
