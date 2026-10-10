// Saves a copy of the Medium feed at dev/build time. The site reads the live feed through
// /api/medium-feed and only falls back to this file if that request fails.
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const FEED_URL = 'https://medium.com/feed/@itsrajatrai'
const OUT_DIR = new URL('../public/', import.meta.url)
const OUT_FILE = new URL('medium-feed.xml', OUT_DIR)

try {
  const res = await fetch(FEED_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; rajatrai.in feed reader)' },
    signal: AbortSignal.timeout(15000)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const xml = await res.text()
  if (!xml.includes('<item>')) throw new Error('feed has no posts')

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(OUT_FILE, xml)
  console.log(`[medium] saved ${xml.split('<item>').length - 1} posts`)
} catch (err) {
  // Never block dev/build on Medium being unreachable; keep the last good file.
  console.warn(`[medium] fetch failed (${err.message})${existsSync(OUT_FILE) ? ', keeping existing file' : ''}`)
}
