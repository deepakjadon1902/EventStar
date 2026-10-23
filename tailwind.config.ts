import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF4FF",
          100: "#DCE8FF",
          500: "#2F6BFF",
          600: "#1F55E0",
          700: "#1A45B8",
        },
        ink: { 900: "#0B1220", 700: "#2A3447", 500: "#5B6578" },
        line: "#E5E9F0",
        surface: "#F7F9FC",
        success: "#12805C",
        warning: "#9A6700",
        danger: "#B42318",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Sora", "sans-serif"],
      },
      maxWidth: { "7xl": "1280px" },
      boxShadow: { card: "0 8px 32px -16px rgb(11 18 32 / 12%)" },
    },
  },
  plugins: [],
} satisfies Config;
