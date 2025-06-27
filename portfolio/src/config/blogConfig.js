// Blog Configuration
// Update these values with your actual usernames

export const BLOG_CONFIG = {
  // Your Medium username (without the @ symbol)
  MEDIUM_USERNAME: 'itsrajatrai',
  
  // Your Hashnode username
  HASHNODE_USERNAME: 'itsrajatrai',
  
  // Number of posts to fetch (optional, some APIs support this)
  POSTS_LIMIT: 10,
  
  // Cache duration in milliseconds (5 minutes)
  CACHE_DURATION: 5 * 60 * 1000,
  
  // API endpoints
  ENDPOINTS: {
    MEDIUM_RSS: 'https://api.rss2json.com/v1/api.json',
    HASHNODE_GRAPHQL: 'https://api.hashnode.com/',
    HASHNODE_REST: 'https://api.hashnode.com/v1/articles'
  }
}

// Helper function to get Medium RSS URL
export const getMediumRSSUrl = (username) => {
  return `${BLOG_CONFIG.ENDPOINTS.MEDIUM_RSS}?rss_url=https://medium.com/feed/@${username}`
}

// Helper function to get Hashnode REST URL
export const getHashnodeRESTUrl = (username) => {
  return `${BLOG_CONFIG.ENDPOINTS.HASHNODE_REST}?username=${username}`
} 