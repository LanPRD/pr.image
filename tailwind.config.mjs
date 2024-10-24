/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        destructive: "var(--destructive)",
        mauve: {
          1: "var(--mauve-1)",
          2: "var(--mauve-2)",
          3: "var(--mauve-3)",
          4: "var(--mauve-4)",
          5: "var(--mauve-5)",
          6: "var(--mauve-6)",
          7: "var(--mauve-7)",
          8: "var(--mauve-8)",
          9: "var(--mauve-9)",
          10: "var(--mauve-10)",
          11: "var(--mauve-11)",
          12: "var(--mauve-12)"
        },
        accent: {
          1: "var(--pink-1)",
          2: "var(--pink-2)",
          3: "var(--pink-3)",
          4: "var(--pink-4)",
          5: "var(--pink-5)",
          6: "var(--pink-6)",
          7: "var(--pink-7)",
          8: "var(--pink-8)",
          9: "var(--pink-9)",
          10: "var(--pink-10)",
          11: "var(--pink-11)",
          12: "var(--pink-12)",
          surface: "var(--pink-surface)",
          indicator: "var(--pink-indicator)",
          track: "var(--pink-track)",
          contrast: "var(--pink-contrast)"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
