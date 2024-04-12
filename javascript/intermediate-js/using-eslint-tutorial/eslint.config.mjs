import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends("airbnb-base"),

  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "off",
      quotes: ["error", "single"],
      // we want to force semicolons
      semi: ["error", "always"],
      // we use 2 spaces to indent our code
      indent: ["error", 2],
      // we want to avoid extraneous spaces
      "no-multi-spaces": ["error"],
    },
  },
  // eslint config prettier needs to stay after other configs to override
  eslintConfigPrettier,
];
