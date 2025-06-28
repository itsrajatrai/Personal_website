import React, { useState } from 'react'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

const Hero = () => {
  const [activeTab, setActiveTab] = useState('tech')
  const { posts, loading } = useBlogPosts()
  const { currentLanguage } = useLanguage()

  // Utility to strip HTML tags from a string
  const stripHtml = (html) => {
    if (!html) return ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  // Estimate read time (200 words/minute)
  const estimateReadTime = (text) => {
    if (!text) return ''
    const words = text.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.round(words / 200))
    return `${minutes} min read`
  }

  // Prepare blog data for tabs
  const techBlogs = (posts.hashnode || []).slice(0, 2).map(post => {
    const excerpt = stripHtml(post.brief)
    return {
      title: post.title,
      category: 'Tech',
      date: new Date(post.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      readTime: estimateReadTime(excerpt),
      excerpt,
      url: post.url
    }
  })
  const nonTechBlogs = (posts.medium || []).slice(0, 2).map(post => {
    const excerpt = stripHtml(post.description)
    return {
      title: post.title,
      category: 'Non-Tech',
      date: new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      readTime: post.readingTime || estimateReadTime(excerpt),
      excerpt,
      url: post.link
    }
  })

  const filteredBlogs = activeTab === 'tech' ? techBlogs : nonTechBlogs

  // Truncate excerpt to 2 lines (about 150 chars)
  const truncateExcerpt = (text, maxLength = 150) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <section className="section min-h-screen flex items-center justify-start bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="max-w-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 overflow-hidden">
                <img 
                  src="/profile.png" 
                  alt="Rajat Rai" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight flex items-center`}>
                  {getTranslation(currentLanguage, 'hero.title')}
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ml-2 sm:ml-3 text-blue-500 inline-block align-middle" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </h1>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 mb-6 sm:mb-8">
              <div className="space-y-3">
                <p className={`text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed`}>
                  {getTranslation(currentLanguage, 'hero.subtitle')}
                </p>
                <div className={`text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed space-y-2`}>
                  {getTranslation(currentLanguage, 'hero.description').split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8">
              <a href="https://x.com/ItsRajatRai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@Its_rajatrai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/itsrajatrai/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/its_rajatrai/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://github.com/itsrajatrai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="mailto:therajatraiofficial@gmail.com" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Recent Blog Posts */}
          <div className="max-w-lg mt-8 lg:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left`}>
                {getTranslation(currentLanguage, 'hero.recentWriting')}
              </h2>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 justify-center sm:justify-start">
                <button
                  onClick={() => setActiveTab('tech')}
                  className={`px-2 sm:px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'tech'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Tech
                </button>
                <button
                  onClick={() => setActiveTab('non-tech')}
                  className={`px-2 sm:px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'non-tech'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Non-Tech
                </button>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {loading ? (
                <div className={`text-gray-500 dark:text-gray-400 text-center`}>{getTranslation(currentLanguage, 'hero.loading')}</div>
              ) : filteredBlogs.length === 0 ? (
                <div className={`text-gray-500 dark:text-gray-400 text-center`}>{getTranslation(currentLanguage, 'hero.noPostsYet')}</div>
              ) : filteredBlogs.map((blog, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full self-start ${
                      blog.category === 'Tech' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                      {blog.category}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{blog.date}</span>
                      {blog.readTime && <><span>•</span><span>{blog.readTime}</span></>}
                    </div>
                  </div>
                  <a href={blog.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                      {blog.title}
                    </h3>
                  </a>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                    {truncateExcerpt(blog.excerpt)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center sm:text-left">
              <a href="#" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'}) || window.dispatchEvent(new CustomEvent('navigateToBlog'))} className={`text-blue-600 hover:text-blue-800 font-medium transition-colors`}>
                {getTranslation(currentLanguage, 'hero.viewAllPosts')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 