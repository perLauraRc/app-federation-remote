import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
import typescriptParser from '@typescript-eslint/parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import tailwindcss from 'eslint-plugin-tailwindcss'
import { fixupPluginRules } from '@eslint/compat'

// Helper to normalize shareable configs that may be objects or arrays
const asArray = (cfg) => (Array.isArray(cfg) ? cfg : [cfg])

export default defineConfig([
  // Shareable configs recommended configs
  ...asArray(js.configs.recommended), // JS recommended rules loaded from js.configs.recommended
  ...asArray(react.configs.recommended), // React recommended rules loaded from react.configs.recommended
  ...asArray(reactHooks.configs.recommended), // React Hooks rules loaded from reactHooks.configs.recommended
  ...asArray(tailwindcss.configs['flat/recommended']), // Tailwind recommended rules loaded from tailwindcss.configs['flat/recommended'],
  ...asArray(typescriptEslint.configs.recommended), // TypeScript recommended rules loaded from typescriptEslint.configs.recommended
  ...asArray(typescriptEslint.configs['recommended-type-checked']), // Additional TypeScript type-aware rules loaded from typescriptEslint.configs['recommended-type-checked']
  // Project-specific settings and overrides
  {
    files: ['**/*.{ts,tsx,js,jsx,css}'],
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      tailwindcss,
      '@typescript-eslint': typescriptEslint
      // 'react-refresh': reactRefresh,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      // 'react/prop-types': 'off',
      // 'react/react-in-jsx-scope': 'off',
      // 'tailwindcss/classnames-order': 'warn',
      // 'tailwindcss/no-custom-classname': 'warn',
      // 'tailwindcss/no-contradicting-classname': 'error',
      'no-console': 'error'
      // '@typescript-eslint/no-unused-vars': 'warn',
      // '@typescript-eslint/explicit-module-boundary-types': 'off',
      // '@typescript-eslint/no-non-null-assertion': 'off',
    }
  },
  // Ignore generated output
  globalIgnores(['dist']),
  // Keep Prettier config last to disable Eslint rules that conflict with Prettier
  ...asArray(eslintConfigPrettier)
])
