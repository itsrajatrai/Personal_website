# Blog Automation Setup Guide

This guide will help you set up the automated blog integration for your portfolio website.

## Overview

The blog system automatically fetches posts from:
- **Medium** - For non-tech posts
- **Hashnode** - For tech posts

If no posts are found, it displays a "Coming Soon" message.

## Setup Instructions

### 1. Configure Your Usernames

Edit the file `src/config/blogConfig.js` and update the following values:

```javascript
export const BLOG_CONFIG = {
  // Your Medium username (without the @ symbol)
  MEDIUM_USERNAME: 'your-actual-medium-username',
  
  // Your Hashnode username
  HASHNODE_USERNAME: 'your-actual-hashnode-username',
  // ... rest of config
}
```

### 2. Find Your Usernames

#### Medium Username
1. Go to your Medium profile page
2. Your username is in the URL: `https://medium.com/@your-username`
3. Use only the username part (without the @ symbol)

#### Hashnode Username
1. Go to your Hashnode profile
2. Your username is in the URL: `https://your-username.hashnode.dev`
3. Use only the username part

### 3. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Blog page in your website

3. Check the browser console for any error messages

## How It Works

### Medium Integration
- Uses the RSS feed from your Medium profile
- Converts RSS to JSON using RSS2JSON service
- No API key required

### Hashnode Integration
- Uses Hashnode's GraphQL API
- Fetches your published posts
- No API key required for public posts

### Fallback Behavior
- If no posts are found, displays "Coming Soon" cards
- If API calls fail, gracefully handles errors
- Shows loading states while fetching

## Customization

### Styling
- Blog cards use Tailwind CSS classes
- Dark mode support included
- Responsive design for mobile and desktop

### Content
- Posts are automatically categorized (Medium = Non-Tech, Hashnode = Tech)
- Thumbnails, titles, descriptions, and dates are displayed
- Direct links to original posts

### Configuration Options
In `blogConfig.js`, you can also adjust:
- `POSTS_LIMIT`: Number of posts to fetch
- `CACHE_DURATION`: How long to cache results

## Troubleshooting

### Common Issues

1. **No posts showing up**
   - Check your usernames are correct
   - Verify you have published posts on both platforms
   - Check browser console for errors

2. **CORS errors**
   - The RSS2JSON service should handle CORS
   - If issues persist, consider using a proxy

3. **Hashnode API errors**
   - Try the REST API alternative in `blogService.js`
   - Check if your Hashnode profile is public

### Debug Mode

Add this to your browser console to test the APIs:

```javascript
// Test Medium API
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@your-username')
  .then(res => res.json())
  .then(data => console.log('Medium:', data))

// Test Hashnode API
fetch('https://api.hashnode.com/v1/articles?username=your-username')
  .then(res => res.json())
  .then(data => console.log('Hashnode:', data))
```

## Deployment

The blog system works the same in production as in development. No additional configuration needed for deployment.

## Future Enhancements

Consider adding:
- Post categories/tags filtering
- Search functionality
- Pagination for many posts
- Local caching with localStorage
- Custom post metadata 