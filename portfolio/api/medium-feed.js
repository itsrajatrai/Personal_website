// Medium's RSS feed has no CORS headers, so the browser reads it through this function.
// Locally, vite.config.js proxies the same path straight to Medium.
const FEED_URL = 'https://medium.com/feed/@itsrajatrai'

export default async function handler(req, res) {
  try {
    const upstream = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; rajatrai.in feed reader)' },
      signal: AbortSignal.timeout(10000)
    })
    if (!upstream.ok) throw new Error(`Medium responded ${upstream.status}`)

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=86400')
    res.status(200).send(await upstream.text())
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
