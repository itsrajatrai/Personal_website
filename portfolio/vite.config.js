import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Mirrors api/medium-feed.js, which only runs on Vercel.
      '/api/medium-feed': {
        target: 'https://medium.com',
        changeOrigin: true,
        rewrite: () => '/feed/@itsrajatrai'
      }
    }
  }
})
