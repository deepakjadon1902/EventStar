import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF0FC",
          100: "#DEE3F9",
          500: "#4767E3",
          600: "#3154DC",
          700: "#2545BD",
        },
        ink: { 900: "#20242A", 700: "#49515A", 500: "#626B75" },
        line: "#E0E4E8",
        surface: "#F2F3F2",
        success: "#2E6B4E",
        warning: "#976714",
        danger: "#B42318",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      maxWidth: { "7xl": "1280px" },
      boxShadow: { card: "0 8px 32px -16px rgb(30 42 22 / 12%)" },
    },
  },
  plugins: [],
} satisfies Config;
