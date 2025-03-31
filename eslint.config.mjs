// eslint.config.mjs
import { defineConfig } from "eslint-define-config"

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.vue"],
      extends: ["plugin:@typescript-eslint/recommended", "plugin:vue/vue3-recommended"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "vue"],
      rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  ignorePatterns: ["node_modules/", "dist/"],
})
