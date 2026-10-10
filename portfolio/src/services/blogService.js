// Blog service for fetching posts from Medium and Hashnode
import { BLOG_CONFIG, getHashnodeRESTUrl, getHashnodeRSSUrl } from '../config/blogConfig'

// Medium has no public API and rss2json fails on its feed, so the RSS XML is read
// from our own endpoint (api/medium-feed.js), falling back to the copy saved at build time.
const MEDIUM_SOURCES = ['/api/medium-feed', '/medium-feed.xml']

const parseMediumFeed = (xml) => {
  const doc = new DOMParser().parseFromString(xml, 'text/xml')
  const text = (el, tag) => el.getElementsByTagName(tag)[0]?.textContent?.trim() || ''

  return [...doc.getElementsByTagName('item')].map((item) => {
    const content = text(item, 'content:encoded')
    return {
      id: text(item, 'guid') || text(item, 'link'),
      title: text(item, 'title'),
      description: content,
      link: text(item, 'link'),
      pubDate: text(item, 'pubDate'),
      thumbnail: content.match(/<img[^>]+src="([^"]+)"/)?.[1] || null,
      author: text(item, 'dc:creator'),
      categories: [...item.getElementsByTagName('category')].map((c) => c.textContent)
    }
  })
}

export const fetchMediumPosts = async () => {
  for (const source of MEDIUM_SOURCES) {
    try {
      const response = await fetch(source)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const posts = parseMediumFeed(await response.text())
      if (posts.length) return posts
    } catch (error) {
      console.warn(`Medium posts unavailable from ${source}:`, error.message)
    }
  }
  return []
}

export const fetchHashnodePosts = async () => {
  try {
    const response = await fetch(getHashnodeRSSUrl())

    if (!response.ok) {
      throw new Error(`Failed to fetch Hashnode posts: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === 'ok' && Array.isArray(data.items)) {
      return data.items.slice(0, BLOG_CONFIG.POSTS_LIMIT).map(item => ({
        id: item.guid || item.link,
        title: item.title,
        brief: item.description,
        url: item.link,
        dateAdded: item.pubDate,
        thumbnail: item.thumbnail || item.enclosure?.link || null,
        tags: item.categories || []
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching Hashnode posts:', error)
    // Return empty array to prevent app from crashing
    return []
  }
}

// Alternative Hashnode API using their REST API
export const fetchHashnodePostsREST = async () => {
  try {
    const response = await fetch(getHashnodeRESTUrl(BLOG_CONFIG.HASHNODE_USERNAME))
    
    if (!response.ok) {
      throw new Error('Failed to fetch Hashnode posts')
    }
    
    const data = await response.json()
    
    if (data.articles) {
      return data.articles.map(article => ({
        id: article._id,
        title: article.title,
        brief: article.brief,
        url: article.url,
        dateAdded: article.dateAdded,
        thumbnail: article.coverImage,
        tags: article.tags || []
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching Hashnode posts:', error)
    return []
  }
}

// Combined function to fetch all posts
export const fetchAllPosts = async () => {
  try {
    const [mediumPosts, hashnodePosts] = await Promise.allSettled([
      fetchMediumPosts(),
      fetchHashnodePosts()
    ])

    return {
      medium: mediumPosts.status === 'fulfilled' ? mediumPosts.value : [],
      hashnode: hashnodePosts.status === 'fulfilled' ? hashnodePosts.value : []
    }
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return { medium: [], hashnode: [] }
  }
} 