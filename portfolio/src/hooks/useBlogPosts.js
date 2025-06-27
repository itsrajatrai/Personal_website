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
        
        // Check for cached data
        const cached = localStorage.getItem('blogPosts')
        const cacheTime = localStorage.getItem('blogPostsTime')
        const now = Date.now()
        
        // Use cache if it's less than 5 minutes old
        if (cached && cacheTime && (now - parseInt(cacheTime)) < 5 * 60 * 1000) {
          setPosts(JSON.parse(cached))
          setLoading(false)
          return
        }
        
        const data = await fetchAllPosts()
        
        // Cache the results
        localStorage.setItem('blogPosts', JSON.stringify(data))
        localStorage.setItem('blogPostsTime', now.toString())
        
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
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchAllPosts()
      
      // Cache the results
      localStorage.setItem('blogPosts', JSON.stringify(data))
      localStorage.setItem('blogPostsTime', Date.now().toString())
      
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