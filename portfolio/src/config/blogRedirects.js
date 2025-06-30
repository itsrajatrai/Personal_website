// Blog Redirect Configuration
// Auto-generated from Medium and Hashnode posts
// Generated on: 2025-06-30T02:49:51.376Z

export const BLOG_REDIRECTS = {
    'my-first-international-talk-experience-at-devops-con-singapore-2023': {
      url: 'https://medium.com/@itsrajatrai/my-first-international-talk-experience-at-devops-con-singapore-2023-28b5d59801b3?source=rss-b392b6eafba------2',
      platform: 'medium',
      title: 'My First International Talk Experience at DevOps Con Singapore, 2023'
    },
    'breaking-barriers-5-compelling-reasons-why-chatgpt-should-be-open-sourced': {
      url: 'https://medium.com/@itsrajatrai/breaking-barriers-5-compelling-reasons-why-chatgpt-should-be-open-sourced-ab8477a62c2e?source=rss-b392b6eafba------2',
      platform: 'medium',
      title: 'Breaking Barriers: 5 Compelling Reasons Why ChatGPT Should be Open Sourced'
    },
    'from-code-to-consciousness-the-intersection-of-devops-and-ai-ethics': {
      url: 'https://medium.com/@itsrajatrai/from-code-to-consciousness-the-intersection-of-devops-and-ai-ethics-14b674e18dfd?source=rss-b392b6eafba------2',
      platform: 'medium',
      title: 'From Code to Consciousness: The Intersection of DevOps and AI Ethics'
    },
    'debunking-the-fear-of-job-loss-to-ai-why-humans-still-reign-supreme': {
      url: 'https://medium.com/@itsrajatrai/debunking-the-fear-of-job-loss-to-ai-why-humans-still-reign-supreme-14f88beae2d3?source=rss-b392b6eafba------2',
      platform: 'medium',
      title: 'Debunking the Fear of Job Loss to AI: Why Humans Still Reign Supreme'
    },
    'the-case-for-go-why-its-time-to-say-goodbye-to-c-in-college-curriculum': {
      url: 'https://medium.com/@itsrajatrai/the-case-for-go-why-its-time-to-say-goodbye-to-c-in-college-curriculum-b3ad34ed4bd?source=rss-b392b6eafba------2',
      platform: 'medium',
      title: 'The Case for Go: Why it’s Time to Say Goodbye to C in College Curriculum'
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
  