import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        module: 'writable'
      }
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  tseslint.configs.recommended,
]);
