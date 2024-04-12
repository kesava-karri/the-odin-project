import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...compat.extends("airbnb-base"),
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-alert": "off",
      "no-console": "off",
      "no-control-regex": ["off", "#"],
      // we want to force semicolons
      semi: ["error", "always"],
      // we use 2 spaces to indent our code
      indent: ["error", 2],
      // we want to avoid extraneous spaces
      "no-multi-spaces": ["error"],
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
    },
  },
  // eslint config prettier needs to stay after other configs to override
  eslintConfigPrettier,
];
