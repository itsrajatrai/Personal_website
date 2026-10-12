// Serves Hashnode posts as JSON. Locally, vite.config.js serves the same path.
import { fetchHashnodeProfilePosts } from '../src/utils/hashnodeProfile.js'

export default async function handler(req, res) {
  try {
    const posts = await fetchHashnodeProfilePosts()
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=86400')
    res.status(200).json({ posts })
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
