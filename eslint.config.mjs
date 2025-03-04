import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // Dependencies
      "node_modules/**",

      // Build outputs
      "dist/**",
      "build/**",
      "coverage/**",
      ".next/**",
      "out/**",

      // Cache directories
      ".cache/**",
      ".tmp/**",

      // Generated files
      "**/*.min.js",
      "**/*.bundle.js",

      // Config files
      ".github/**",
      ".vscode/**",

      // Misc
      ".DS_Store",
      "*.log",
      "public/assets/**",

      // Test fixtures
      "fixtures/**",
      "test/fixtures/**",
      "__mocks__/**",
      "tsconfig.json"
    ],
  },
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
