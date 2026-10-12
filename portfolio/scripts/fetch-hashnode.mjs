// Saves a copy of the Hashnode post list at dev/build time. The site reads live posts through
// /api/hashnode-posts and only falls back to this file if that request fails.
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fetchHashnodeProfilePosts } from '../src/utils/hashnodeProfile.js'

const OUT_DIR = new URL('../public/', import.meta.url)
const OUT_FILE = new URL('hashnode-posts.json', OUT_DIR)

try {
  const posts = await fetchHashnodeProfilePosts()
  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(OUT_FILE, JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2))
  console.log(`[hashnode] saved ${posts.length} posts`)
} catch (err) {
  // Never block dev/build on Hashnode being unreachable; keep the last good file.
  console.warn(`[hashnode] fetch failed (${err.message})${existsSync(OUT_FILE) ? ', keeping existing file' : ''}`)
}
