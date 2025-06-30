// Blog Redirect Helper Utility
// This utility helps you easily add new blog redirects

/**
 * Generate a slug from a title
 * @param {string} title - The blog post title
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-') // Remove leading/trailing hyphens
}

/**
 * Generate the redirect object for a new blog post
 * @param {string} title - The blog post title
 * @param {string} url - The actual blog post URL
 * @param {string} platform - 'medium' or 'hashnode'
 * @returns {object} - The redirect object to add to blogRedirects.js
 */
export const generateRedirectObject = (title, url, platform) => {
  const slug = generateSlug(title)
  
  return {
    slug,
    redirectObject: {
      url,
      platform,
      title
    },
    configEntry: `  '${slug}': {
    url: '${url}',
    platform: '${platform}',
    title: '${title}'
  }`
  }
}

/**
 * Example usage and instructions
 */
export const getInstructions = () => {
  return `
HOW TO ADD NEW BLOG REDIRECTS:

1. Import the helper in your component or use it in the browser console:
   import { generateRedirectObject } from './utils/blogRedirectHelper'

2. Generate the redirect object:
   const { slug, configEntry } = generateRedirectObject(
     'Your Blog Post Title',
     'https://medium.com/@itsrajatrai/your-blog-post-url',
     'medium' // or 'hashnode'
   )

3. Copy the configEntry and add it to src/config/blogRedirects.js in the BLOG_REDIRECTS object

4. Your blog will now be accessible at: rajatrai.in/${slug}

EXAMPLE:
const { slug, configEntry } = generateRedirectObject(
  'How to Build a React App',
  'https://itsrajatrai.hashnode.dev/how-to-build-react-app',
  'hashnode'
)

This will generate:
- slug: 'how-to-build-a-react-app'
- configEntry: The formatted object to add to your config

Your blog will be accessible at: rajatrai.in/how-to-build-a-react-app
`
}

// Export a simple function to use in browser console
if (typeof window !== 'undefined') {
  window.blogRedirectHelper = {
    generateSlug,
    generateRedirectObject,
    getInstructions
  }
} 