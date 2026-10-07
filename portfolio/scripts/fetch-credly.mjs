// Credly's badge feed doesn't allow cross-origin browser requests, so badges are
// fetched at dev/build time and served as a static file.
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const USERNAME = 'itsrajatrai'
const OUT_DIR = new URL('../public/', import.meta.url)
const OUT_FILE = new URL('credly-badges.json', OUT_DIR)

const toBadge = (b) => ({
  id: b.id,
  name: b.badge_template?.name,
  issuer: b.issuer?.entities?.[0]?.entity?.name || b.issuer?.summary || '',
  issuedAt: b.issued_at_date || b.issued_at || null,
  expiresAt: b.expires_at_date || null,
  image: b.image_url || b.badge_template?.image_url || null,
  description: b.badge_template?.description || '',
  skills: (b.badge_template?.skills || []).map((s) => s.name).filter(Boolean),
  url: `https://www.credly.com/badges/${b.id}`
})

try {
  const res = await fetch(`https://www.credly.com/users/${USERNAME}/badges.json`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const json = await res.json()
  const badges = (json.data || [])
    .map(toBadge)
    .filter((b) => b.name)
    .sort((a, b) => (b.issuedAt || '').localeCompare(a.issuedAt || ''))

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(
    OUT_FILE,
    JSON.stringify({ username: USERNAME, fetchedAt: new Date().toISOString(), badges }, null, 2)
  )
  console.log(`[credly] saved ${badges.length} badges`)
} catch (err) {
  // Never block dev/build on Credly being unreachable; keep the last good file.
  console.warn(`[credly] fetch failed (${err.message})${existsSync(OUT_FILE) ? ', keeping existing file' : ''}`)
  if (!existsSync(OUT_FILE)) {
    await mkdir(OUT_DIR, { recursive: true })
    await writeFile(OUT_FILE, JSON.stringify({ username: USERNAME, fetchedAt: null, badges: [] }, null, 2))
  }
}
