import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#082033",
        ocean: "#0E7490",
        aqua: "#22D3EE",
        teal: "#14B8A6",
        sky: "#ECFEFF",
        sand: "#FAF7F0",
        ink: "#334155",
        muted: "#64748B",
        border: "#DCE8EF",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        hero: "1280px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(8, 32, 51, 0.04), 0 8px 24px rgba(8, 32, 51, 0.06)",
        float: "0 24px 60px rgba(8, 32, 51, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
