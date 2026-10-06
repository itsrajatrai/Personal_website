import React from 'react'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

const Blog = () => {
  const { posts, loading, error, refreshPosts, hasPosts } = useBlogPosts()
  const { currentLanguage } = useLanguage()

  // Apply Kaithi font for Bhojpuri language
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

  // Utility to strip HTML tags from a string
  const stripHtml = (html) => {
    if (!html) return ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const estimateReadTime = (text) => {
    if (!text) return ''
    const words = text.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.round(words / 200))
    return `${minutes} min read`
  }

  const excerptFor = (post) => stripHtml(post.description || post.brief || '')

  const renderEmpty = () => (
    <div className="border border-gray-200/60 dark:border-gray-800/60 rounded-2xl p-6 sm:p-8">
      <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 ${fontClass}`}>
        {getTranslation(currentLanguage, 'blog.comingSoon')}
      </p>
      <p className={`mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 ${fontClass}`}>
        {getTranslation(currentLanguage, 'blog.comingSoonDesc')}
      </p>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl pt-20 sm:pt-24 md:pt-28 pb-12">
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${fontClass}`}>
              {getTranslation(currentLanguage, 'blog.loading')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl pt-20 sm:pt-24 md:pt-28 pb-12">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white ${fontClass}`}>
              {getTranslation(currentLanguage, 'blog.title')}
            </h1>
            <p className={`mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 ${fontClass}`}>
              {getTranslation(currentLanguage, 'blog.error')}: {error}
            </p>
            <button
              onClick={refreshPosts}
              className={`mt-6 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 ${fontClass}`}
            >
              {getTranslation(currentLanguage, 'blog.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const techPosts = posts.hashnode || []
  const nonTechPosts = posts.medium || []

  const renderPostRow = (post, platform) => {
    const url = post.link || post.url
    const dateStr = post.pubDate || post.dateAdded
    const excerpt = excerptFor(post)

    return (
      <li key={post.id || post.guid || url} className="py-5 sm:py-6">
        <a href={url} target="_blank" rel="noopener noreferrer" className="group block">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <p className={`text-base sm:text-lg text-gray-950 dark:text-white group-hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 ${fontClass}`}>
              {post.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {dateStr ? formatDate(dateStr) : ''}
            </p>
          </div>

          <p className={`mt-2 text-sm text-gray-600 dark:text-gray-400 ${fontClass}`}>
            {platform} {excerpt ? <>• {estimateReadTime(excerpt)}</> : null}
          </p>

          {excerpt ? (
            <p className={`mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
              {excerpt.length > 220 ? `${excerpt.slice(0, 220)}…` : excerpt}
            </p>
          ) : null}
        </a>
      </li>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container">
        <div className="max-w-3xl pt-20 sm:pt-24 md:pt-28 pb-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white ${fontClass}`}>
            {getTranslation(currentLanguage, 'blog.title')}
          </h1>
          <p className={`mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
            {getTranslation(currentLanguage, 'blog.subtitle')}
          </p>
        </div>

        {!hasPosts ? (
          <div className="max-w-3xl pb-16">{renderEmpty()}</div>
        ) : (
          <div className="max-w-4xl pb-16">
            <section className="border-t border-gray-200/60 dark:border-gray-800/60">
              <div className="pt-10">
                <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
                  {getTranslation(currentLanguage, 'blog.techPosts')}
                </h2>

                {techPosts.length === 0 ? (
                  <div className="mt-6">{renderEmpty()}</div>
                ) : (
                  <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
                    {techPosts.map((p) => renderPostRow(p, 'Hashnode'))}
                  </ul>
                )}
              </div>
            </section>

            <section className="mt-12 border-t border-gray-200/60 dark:border-gray-800/60">
              <div className="pt-10">
                <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
                  {getTranslation(currentLanguage, 'blog.nonTechPosts')}
                </h2>

                {nonTechPosts.length === 0 ? (
                  <div className="mt-6">{renderEmpty()}</div>
                ) : (
                  <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
                    {nonTechPosts.map((p) => renderPostRow(p, 'Medium'))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog 