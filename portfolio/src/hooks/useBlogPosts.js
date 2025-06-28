import { useState, useEffect } from 'react'
import { fetchAllPosts } from '../services/blogService'

export const useBlogPosts = () => {
  const [posts, setPosts] = useState({ medium: [], hashnode: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Check for cached data with version control
        const cached = localStorage.getItem('blogPosts')
        const cacheTime = localStorage.getItem('blogPostsTime')
        const cacheVersion = localStorage.getItem('blogPostsVersion')
        const now = Date.now()
        const currentVersion = '1.0' // Increment this when you make changes
        
        // Use cache if it's less than 5 minutes old and version matches
        if (cached && cacheTime && cacheVersion === currentVersion && (now - parseInt(cacheTime)) < 5 * 60 * 1000) {
          setPosts(JSON.parse(cached))
          setLoading(false)
          return
        }
        
        const data = await fetchAllPosts()
        
        // Cache the results with version
        localStorage.setItem('blogPosts', JSON.stringify(data))
        localStorage.setItem('blogPostsTime', now.toString())
        localStorage.setItem('blogPostsVersion', currentVersion)
        
        setPosts(data)
      } catch (err) {
        setError('Failed to fetch blog posts')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const refreshPosts = async () => {
    // Clear cache and refetch
    localStorage.removeItem('blogPosts')
    localStorage.removeItem('blogPostsTime')
    localStorage.removeItem('blogPostsVersion')
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchAllPosts()
      
      // Cache the results
      localStorage.setItem('blogPosts', JSON.stringify(data))
      localStorage.setItem('blogPostsTime', Date.now().toString())
      localStorage.setItem('blogPostsVersion', '1.0')
      
      setPosts(data)
    } catch (err) {
      setError('Failed to fetch blog posts')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    posts,
    loading,
    error,
    refreshPosts,
    hasPosts: posts.medium.length > 0 || posts.hashnode.length > 0
  }
} 