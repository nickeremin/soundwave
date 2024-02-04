/** @type {import("eslint").Linter.Config} */
module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  root: true,
  extends: [
    "next",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
    sourceType: "module",
    project: true,
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "./tailwind.config.ts",
    },
    next: {
      rootDir: ["./"],
    },
  },
};
