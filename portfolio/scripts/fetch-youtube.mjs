// Latest videos for the Studio page. YouTube's RSS feed doesn't allow cross-origin browser requests,
// so videos are fetched at dev/build time and served as a static file.
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const CHANNELS = {
  tech: 'Its_rajatrai',
  beyond: 'itscuriousrajat'
}
const PER_CHANNEL = 4
const OUT_DIR = new URL('../public/', import.meta.url)
const OUT_FILE = new URL('youtube-videos.json', OUT_DIR)

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

const get = async (url) => {
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' }, signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

// Feeds are keyed by channel ID, so the @handle is resolved from the channel page.
const channelIdFor = async (handle) => {
  const html = await get(`https://www.youtube.com/@${handle}`)
  const m =
    html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/) ||
    html.match(/"externalId":"(UC[\w-]{22})"/) ||
    html.match(/"channelId":"(UC[\w-]{22})"/)
  if (!m) throw new Error(`no channel id for @${handle}`)
  return m[1]
}

const parseFeed = (xml) =>
  [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const pick = (re) => e.match(re)?.[1] || ''
    const id = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/)
    const url = pick(/<link rel="alternate" href="([^"]+)"/) || `https://www.youtube.com/watch?v=${id}`
    const short = url.includes('/shorts/')
    return {
      id,
      title: decode(pick(/<title>([^<]*)<\/title>/)),
      url,
      short,
      publishedAt: pick(/<published>([^<]+)<\/published>/) || null,
      // maxresdefault is the creator-chosen thumbnail. For Shorts the vertical frame sits in the centre third
      // (blurred copies fill the sides), so a centred 9:16 crop shows exactly the Short. oar2 looks tempting
      // but is an auto-picked frame, not the chosen thumbnail. hqdefault always exists as a fallback.
      thumbnail: `https://i.ytimg.com/vi/${id}/${short ? 'maxresdefault.jpg' : 'hq720.jpg'}`,
      fallback: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    }
  })

const loadExisting = async () => {
  try {
    return JSON.parse(await readFile(OUT_FILE, 'utf8'))
  } catch {
    return { fetchedAt: null, channels: {} }
  }
}

const existing = await loadExisting()
const channels = {}

for (const [track, handle] of Object.entries(CHANNELS)) {
  try {
    const channelId = await channelIdFor(handle)
    const videos = parseFeed(await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`))
      .filter((v) => v.id && v.title)
      .slice(0, PER_CHANNEL)
    channels[track] = { handle, channelId, videos }
    console.log(`[youtube] ${track}: saved ${videos.length} videos from @${handle}`)
  } catch (err) {
    // Never block dev/build on YouTube being unreachable; keep the last good data for this channel.
    channels[track] = existing.channels?.[track] || { handle, channelId: null, videos: [] }
    console.warn(`[youtube] ${track}: fetch failed (${err.message}), keeping existing data`)
  }
}

await mkdir(OUT_DIR, { recursive: true })
await writeFile(OUT_FILE, JSON.stringify({ fetchedAt: new Date().toISOString(), channels }, null, 2))
