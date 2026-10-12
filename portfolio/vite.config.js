import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchHashnodeProfilePosts } from './src/utils/hashnodeProfile.js'

// Mirrors api/hashnode-posts.js, which only runs on Vercel.
const hashnodeDevApi = {
  name: 'hashnode-dev-api',
  configureServer(server) {
    server.middlewares.use('/api/hashnode-posts', async (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      try {
        res.end(JSON.stringify({ posts: await fetchHashnodeProfilePosts() }))
      } catch (err) {
        res.statusCode = 502
        res.end(JSON.stringify({ error: err.message }))
      }
    })
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), hashnodeDevApi],
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
