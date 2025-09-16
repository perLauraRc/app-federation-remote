import { defineConfig } from 'eslint/config'
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
import { globalIgnores } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      typescriptEslint.configs.recommended, // TypeScript recommended rules loaded from typescriptEslint.configs.recommended
      typescriptEslint.configs['recommended-type-checked'] // Additional TypeScript type-aware rules loaded from typescriptEslint.configs['recommended-type-checked']
    ],
    plugins: {
      '@typescript-eslint': typescriptEslint
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
        ...globals.jest,
        ...globals.node
      }
    },
    rules: {
      // '@typescript-eslint/no-unused-vars': 'warn',
      // '@typescript-eslint/explicit-module-boundary-types': 'off',
      // '@typescript-eslint/no-non-null-assertion': 'off',
    }
  },
  {
    files: ['**/*.{ts,tsx,js,jsx,css}'],
    extends: [
      js.configs.recommended, // JS recommended rules loaded from js.configs.recommended
      react.configs.recommended, // React recommended rules loaded from react.configs.recommended
      reactHooks.configs.recommended, // React Hooks rules loaded from reactHooks.configs.recommended
      tailwindcss.configs['flat/recommended'] // Tailwind recommended rules loaded from tailwind.configs['flat/recommended'],
      // eslintConfigPrettier
      // 'plugin:prettier/recommended',
    ],
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      // 'react-refresh': fixupPluginRules(reactRefresh),
      tailwindcss
    },
    rules: {
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      // 'react/prop-types': 'off',
      // 'react/react-in-jsx-scope': 'off',
      // 'tailwindcss/classnames-order': 'warn',
      // 'tailwindcss/no-custom-classname': 'warn',
      // 'tailwindcss/no-contradicting-classname': 'error',
      // 'no-console': 'error'
    }
  },
  globalIgnores(['dist']),
  eslintConfigPrettier // Eslint rules turned off to avoid conflicts with Prettier (should be last in the configuration array)
])
