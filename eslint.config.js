// import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import typescriptEslintParser from '@typescript-eslint/parser'
// import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import tailwindcss from 'eslint-plugin-tailwindcss'
// import { fixupPluginRules } from '@eslint/compat'
import { globalIgnores } from 'eslint/config'
import path from 'node:path'

/* eslint-disable no-undef */
const tailwindConfigPath = path.resolve(process.cwd(), 'tailwind.config.ts')
/* eslint-enable no-undef */

const sharedRules = {
  'jsx-quotes': ['error', 'prefer-single'],
  'no-console': 'error',
  quotes: ['error', 'single', { avoidEscape: true }],
  semi: ['error', 'always']
}

export default tseslint.config([
  // ...tailwindcss.configs['flat/recommended'], // Tailwind recommended rules loaded from tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      typescriptEslint.configs.recommended, // TypeScript recommended rules loaded from typescriptEslint.configs.recommended
      reactHooks.configs['recommended-latest'] // React Hooks rules loaded from reactHooks.configs['recommended-latest']

      // typescriptEslintPlugin.configs.recommended // TypeScript recommended rules loaded from typescriptEslint.configs.recommended
      // typescriptEslintPlugin.configs['recommended-type-checked'] // Additional TypeScript type-aware rules loaded from typescriptEslint.configs['recommended-type-checked']
    ],
    // plugins: {
    //   '@typescript-eslint': typescriptEslint
    // },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // '@typescript-eslint/no-unused-vars': 'warn'
      // '@typescript-eslint/explicit-module-boundary-types': 'off',
      // '@typescript-eslint/no-non-null-assertion': 'off',
    }
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended, // JS recommended rules loaded from js.configs.recommended
      // react.configs.recommended, // FAIL (legacy) React recommended rules loaded from react.configs.recommended
      reactHooks.configs['recommended-latest'], // React Hooks rules loaded from reactHooks.configs['recommended-latest']
      tailwindcss.configs['flat/recommended'], // Tailwind recommended rules loaded from tailwind.configs['flat/recommended'],
      reactRefresh.configs.vite
      // eslintConfigPrettier
      // 'plugin:prettier/recommended',
    ],
    plugins: {
      react,
      reactHooks,
      // 'react-refresh': fixupPluginRules(reactRefresh),
      tailwindcss
    },
    settings: {
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ['classnames', 'clsx', 'ctl'],
        config: tailwindConfigPath, // returned from `loadConfig()` utility if not provided
        cssFiles: [
          '**/*.css',
          '!**/node_modules',
          '!**/.*',
          '!**/dist',
          '!**/build'
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: '^class(Name)?$' // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
      }
    },
    rules: sharedRules
    // rules: {
    //   'react-hooks/rules-of-hooks': 'error',
    //   'react-hooks/exhaustive-deps': 'warn',
    //   'react/prop-types': 'off',
    //   'react/react-in-jsx-scope': 'off',
    //   'tailwindcss/classnames-order': 'warn',
    //   'tailwindcss/no-custom-classname': 'warn',
    //   'tailwindcss/no-contradicting-classname': 'error',
    //   'no-console': 'error'
    // }
  },
  // {
  //   files: [
  //     'eslint.config.js',
  //     'postcss.config.js',
  //     'tailwind.config.ts',
  //     '**/*.config.{ts,js}'
  //   ],
  //   languageOptions: {
  //     parser: typescriptEslintParser,
  //     parserOptions: {
  //       project: ['./tsconfig.node.json']
  //     }
  //   }
  // },
  globalIgnores([
    'node_modules',
    '.vitest',
    'dist',
    'mocks',
    'coverage',
    '**/*.css'
  ]),
  eslintConfigPrettier // Eslint rules turned off to avoid conflicts with Prettier (should be last in the configuration array)
])
