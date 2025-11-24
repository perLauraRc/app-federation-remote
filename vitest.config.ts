import { defineConfig, configDefaults } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/**.test.{ts,tsx}'],
    exclude: [
      ...configDefaults.exclude,
      '**/**.config.{js,ts,tsx}',
      '**/index.{ts,tsx}',
      '**/constants/**{ts,tsx}',
      '**/types/**/**{ts,tsx}',
      '**/*.d.ts',
      '**/.vitest/**',
      '**/mocks/**'
    ],
    coverage: {
      provider: 'v8', // istanbul or v8 are the preferred providers, v8 is the default provider anyway
      reportOnFailure: true,
      exclude: [
        ...configDefaults.exclude,
        '**/**.config.{js,ts,tsx}',
        '**/index.{ts,tsx}',
        '**/constants/**{ts,tsx}',
        '**/types/**/**{ts,tsx}',
        '**/*.d.ts',
        '**/.vitest/**',
        '**/mocks/**'
      ]
    }
  },
  resolve: {
    alias: {
      // Add @ path aliases
      '@src': resolve(__dirname, 'src'),
      '@mocks': resolve(__dirname, 'mocks')
    }
  }
})
