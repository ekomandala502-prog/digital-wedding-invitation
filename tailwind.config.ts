import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF9F6",
        charcoal: "#333333",
        gold: "#C5A880",
        sage: "#9CA38F",
        rose: "#D4B5B0"
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
      }
    },
  },
  plugins: [],
};
export default config;