import React, { useEffect, useState } from 'react'
import { getRedirectInfo } from '../config/blogRedirects'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

const BlogRedirect = ({ slug }) => {
  const [redirectInfo, setRedirectInfo] = useState(null)
  const [countdown, setCountdown] = useState(3)
  const [error, setError] = useState(null)
  const { currentLanguage } = useLanguage()

  // Apply Kaithi font for Bhojpuri language
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''

  useEffect(() => {
    const info = getRedirectInfo(slug)
    if (info) {
      setRedirectInfo(info)
    } else {
      setError('Blog post not found')
    }
  }, [slug])

  useEffect(() => {
    if (redirectInfo && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (redirectInfo && countdown === 0) {
      // Redirect to the actual blog post
      window.location.href = redirectInfo.url
    }
  }, [redirectInfo, countdown])

  const handleRedirectNow = () => {
    if (redirectInfo) {
      window.location.href = redirectInfo.url
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 ${fontClass}`}>
            {getTranslation(currentLanguage, 'redirect.notFound')}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 mb-6 ${fontClass}`}>
            {getTranslation(currentLanguage, 'redirect.notFoundDesc')}
          </p>
          <a 
            href="/"
            className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${fontClass}`}
          >
            {getTranslation(currentLanguage, 'redirect.goHome')}
          </a>
        </div>
      </div>
    )
  }

  if (!redirectInfo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`text-gray-600 dark:text-gray-400 ${fontClass}`}>
            {getTranslation(currentLanguage, 'redirect.loading')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        
        <h1 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 ${fontClass}`}>
          {getTranslation(currentLanguage, 'redirect.redirecting')}
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${fontClass}`}>
            {redirectInfo.title}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              redirectInfo.platform === 'medium' 
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
            }`}>
              {redirectInfo.platform === 'medium' ? 'Medium' : 'Hashnode'}
            </span>
          </div>
          <p className={`text-sm text-gray-600 dark:text-gray-400 ${fontClass}`}>
            {getTranslation(currentLanguage, 'redirect.redirectingTo')} {redirectInfo.platform}
          </p>
        </div>
        
        <div className="mb-6">
          <p className={`text-gray-600 dark:text-gray-400 mb-4 ${fontClass}`}>
            {getTranslation(currentLanguage, 'redirect.countdown')} <span className="font-bold text-blue-600 dark:text-blue-400">{countdown}</span> {getTranslation(currentLanguage, 'redirect.seconds')}
          </p>
          <button 
            onClick={handleRedirectNow}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${fontClass}`}
          >
            {getTranslation(currentLanguage, 'redirect.redirectNow')}
          </button>
        </div>
        
        <a 
          href="/"
          className={`text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ${fontClass}`}
        >
          {getTranslation(currentLanguage, 'redirect.cancel')}
        </a>
      </div>
    </div>
  )
}

export default BlogRedirect 