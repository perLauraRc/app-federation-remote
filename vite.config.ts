import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Background': './src/components/Background/Background',
        './GalleryCell': './src/components/GalleryCell/GalleryCell',
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
      methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization']
    },
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false, // Disables minification, making the output easier to debug
    cssCodeSplit: false // Disables CSS combination into a single file rather than splitting it.
  }
})
