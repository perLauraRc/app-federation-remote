/// <reference types="vitest" />
import { configDefaults } from 'vitest/config'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Background': {
          import: './src/components/atoms/Background/Background',
          dontAppendStylesToHead: true
        },
        './CircleProgress': {
          import: './src/components/atoms/CircleProgress/CircleProgress',
          dontAppendStylesToHead: true
        },
        './ErrorPage': {
          import: './src/components/templates/ErrorPage/ErrorPage',
          dontAppendStylesToHead: true
        },
        './FixturesCarousel': {
          import:
            './src/components/organisms/FixturesCarousel/FixturesCarousel',
          dontAppendStylesToHead: true
        },
        './GalleryCell': {
          import: './src/components/atoms/GalleryCell/GalleryCell',
          dontAppendStylesToHead: true
        }
      },
      shared: ['react', 'react-dom']
    })
  ],
  // css: {
  //   postcss: './postcss.config.js'
  // },
  // preview: {
  //   host: 'localhost',
  //   port: 5174,
  //   strictPort: true,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*"
  //   }
  // },
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
  server: {
    host: 'app-federation-remote',
    port: 5174,
    open: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization']
    }
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // }
  },
  build: {
    modulePreload: false,
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    target: 'esnext',
    minify: false, // Disables minification, making the output easier to debug
    cssCodeSplit: false, // Disables code splitting
    sourcemap: true // Generates source maps for easier debugging
  }
})
