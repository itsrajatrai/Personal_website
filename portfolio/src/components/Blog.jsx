import React from 'react'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

const Blog = () => {
  const { posts, loading, error, refreshPosts, hasPosts } = useBlogPosts()
  const { currentLanguage } = useLanguage()

  // Apply Kaithi font for Bhojpuri language
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Utility to strip HTML tags from a string
  const stripHtml = (html) => {
    if (!html) return ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const renderComingSoon = (category) => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 sm:p-8 text-center border border-gray-200 dark:border-gray-700">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 className={`text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 ${fontClass}`}>
        {getTranslation(currentLanguage, 'blog.comingSoon')}
      </h3>
      <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 ${fontClass}`}>
        {category} {getTranslation(currentLanguage, 'blog.comingSoonDesc')}
      </p>
    </div>
  )

  const renderPostCard = (post, platform) => (
    <article key={post.id || post.guid} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
      {post.thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full self-start ${
            platform === 'medium' 
              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
              : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
          }`}>
            {platform === 'medium' ? 'Medium' : 'Hashnode'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.pubDate || post.dateAdded)}
          </span>
        </div>
        
        <h3 className={`text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${fontClass}`}>
          {post.title}
        </h3>
        
        <p className={`text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 ${fontClass}`}>
          {truncateText(stripHtml(post.description || post.brief || ''))}
        </p>
        
        <a 
          href={post.link || post.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors ${fontClass}`}
        >
          {getTranslation(currentLanguage, 'blog.readMore')}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={`text-gray-600 dark:text-gray-400 ${fontClass}`}>{getTranslation(currentLanguage, 'blog.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 ${fontClass}`}>{getTranslation(currentLanguage, 'blog.error')}</h3>
            <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 ${fontClass}`}>{error}</p>
            <button 
              onClick={refreshPosts}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${fontClass}`}
            >
              {getTranslation(currentLanguage, 'blog.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 ${fontClass}`}>
            {getTranslation(currentLanguage, 'blog.title')}
          </h1>
          <p className={`text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${fontClass}`}>
            {getTranslation(currentLanguage, 'blog.subtitle')}
          </p>
        </div>

        {!hasPosts ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {renderComingSoon('Tech')}
              {renderComingSoon('Non-Tech')}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Tech Posts (Hashnode) - Always Show First */}
            <section className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-white ${fontClass}`}>{getTranslation(currentLanguage, 'blog.techPosts')}</h2>
              </div>
              {posts.hashnode.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {posts.hashnode.map(post => renderPostCard(post, 'hashnode'))}
                </div>
              ) : (
                renderComingSoon('Tech')
              )}
            </section>

            {/* Non-Tech Posts (Medium) - Always Show Second */}
            <section className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-white ${fontClass}`}>{getTranslation(currentLanguage, 'blog.nonTechPosts')}</h2>
              </div>
              {posts.medium.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {posts.medium.map(post => renderPostCard(post, 'medium'))}
                </div>
              ) : (
                renderComingSoon('Non-Tech')
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog 