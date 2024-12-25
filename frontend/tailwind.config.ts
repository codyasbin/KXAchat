import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2a9d8f", // Pastel teal
        secondary: "#f4a261", // Soft orange
        background: "#f9f9f9", // Light background
        accent: "#e76f51", // Coral red for highlights
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
