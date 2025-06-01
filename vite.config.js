import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Inspect()
  ],
  build: {
    sourcemap: true,  // Disable sourcemaps for production build
  },
  css: {
    devSourcemap: false, // disables CSS source map loading in dev
  },
  server: {
    host: true,  // Useful for accessing the server from other devices
  },
  resolve: {
    alias: {
      // Example: '@' to point to src
      '@': '/src',
    },
  },
})
