// Blog Redirect Configuration
// Auto-generated from Medium and Hashnode posts
// Generated on: 2025-06-30T02:49:51.376Z

export const BLOG_REDIRECTS = {
    'Understanding Dharma': {
      url: 'https://medium.com/@itsrajatrai/understanding-dharma-why-every-choice-matters-da75ee932a76',
      platform: 'medium',
      title: 'Understanding Dharma: Why Every Choice Matters'
    }
  }
  
  // Helper function to get redirect info by slug
  export const getRedirectInfo = (slug) => {
    return BLOG_REDIRECTS[slug] || null
  }
  
  // Helper function to check if a slug exists
  export const hasRedirect = (slug) => {
    return slug in BLOG_REDIRECTS
  }
  
  // Helper function to get all redirects (for admin purposes)
  export const getAllRedirects = () => {
    return BLOG_REDIRECTS
  }
  