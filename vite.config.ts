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
    target: 'esnext',
    minify: false, // Disables minification, making the output easier to debug
    cssCodeSplit: false, // Disables code splitting
    sourcemap: true // Generates source maps for easier debugging
  }
})
