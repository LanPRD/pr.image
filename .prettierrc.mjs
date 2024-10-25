/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  useTabs: false,
  proseWrap: "never",
  printWidth: 120,
  quoteProps: "as-needed",
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ]
};
