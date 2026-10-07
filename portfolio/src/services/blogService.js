// Blog service for fetching posts from Medium and Hashnode
import { BLOG_CONFIG, getMediumRSSUrl, getHashnodeRESTUrl, getHashnodeRSSUrl } from '../config/blogConfig'

// Medium API - Using RSS feed since Medium doesn't have a public API
export const fetchMediumPosts = async () => {
  try {
    // Using RSS2JSON service to convert Medium RSS to JSON
    const response = await fetch(getMediumRSSUrl(BLOG_CONFIG.MEDIUM_USERNAME))
    
    if (!response.ok) {
      throw new Error('Failed to fetch Medium posts')
    }
    
    const data = await response.json()
    
    if (data.status === 'ok' && data.items) {
      return data.items.map(item => ({
        id: item.guid,
        title: item.title,
        description: item.description,
        link: item.link,
        pubDate: item.pubDate,
        thumbnail: item.thumbnail || null,
        author: item.author,
        categories: item.categories || []
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching Medium posts:', error)
    return []
  }
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