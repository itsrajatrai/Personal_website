// Hashnode's API is Pro-only and the blog's RSS feed sits behind a bot check, but the public
// profile page (hashnode.com/@user) embeds the post list as Next.js data. This pulls it out.
// Shared by the browser (blogService) and the build script (scripts/fetch-hashnode.mjs).

export const HASHNODE_PROFILE_URL = 'https://hashnode.com/@itsrajatrai'
export const HASHNODE_BLOG_URL = 'https://rajatrai.hashnode.dev'

// Returns the JSON array that starts at `start` (an index pointing at '['), respecting strings.
const sliceArray = (text, start) => {
  let depth = 0
  let inString = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (ch === '\\') i++
      else if (ch === '"') inString = false
    } else if (ch === '"') inString = true
    else if (ch === '[') depth++
    else if (ch === ']' && --depth === 0) return text.slice(start, i + 1)
  }
  return null
}

const unwrapDate = (d) => (typeof d === 'string' ? d.replace(/^\$D/, '') : d)

// Server-side only (Vercel function, Vite dev middleware, build script): the browser can't
// read hashnode.com directly because of CORS.
export const fetchHashnodeProfilePosts = async () => {
  const res = await fetch(HASHNODE_PROFILE_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; rajatrai.in feed reader)' },
    signal: AbortSignal.timeout(10000)
  })
  if (!res.ok) throw new Error(`Hashnode responded ${res.status}`)
  const posts = parseHashnodeProfile(await res.text())
  if (!posts.length) throw new Error('no posts found on the profile page')
  return posts
}

export const parseHashnodeProfile = (html) => {
  // Next.js streams page data as string literals inside self.__next_f.push([1, "..."]) calls.
  for (const [, literal] of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) {
    if (!literal.includes('initialPosts')) continue
    const data = JSON.parse(literal)
    const at = data.indexOf('"initialPosts":')
    const array = at > -1 && sliceArray(data, data.indexOf('[', at))
    if (!array) continue

    return JSON.parse(array)
      .filter((p) => p.slug && p.title)
      .map((p) => ({
        id: p.postId || p.slug,
        title: p.title,
        brief: p.brief || '',
        url: `${HASHNODE_BLOG_URL}/${p.slug}`,
        dateAdded: unwrapDate(p.publishedAt),
        readTimeInMinutes: p.readTimeInMinutes || null,
        thumbnail: p.coverImage?.url || null
      }))
  }
  return []
}
