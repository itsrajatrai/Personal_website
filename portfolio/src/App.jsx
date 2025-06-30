import React, { useState, useEffect } from 'react'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { getTranslation } from './config/languageConfig'
import { hasRedirect } from './config/blogRedirects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Blog from './components/Blog'
import BlogRedirect from './components/BlogRedirect'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [blogSlug, setBlogSlug] = useState(null)
  const { currentLanguage } = useLanguage()

  // Apply Kaithi font for Bhojpuri language
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''

  // Check for blog redirect URLs on component mount and URL changes
  useEffect(() => {
    const checkForBlogRedirect = () => {
      const path = window.location.pathname
      
      // Remove leading slash and check if it's a blog redirect
      const slug = path.substring(1)
      
      if (slug && hasRedirect(slug)) {
        setBlogSlug(slug)
        setCurrentPage('redirect')
      } else {
        setBlogSlug(null)
        // Don't override currentPage if it's not a redirect
        // This allows navbar navigation to work properly
      }
    }

    checkForBlogRedirect()

    // Listen for popstate events (back/forward navigation)
    const handlePopState = () => {
      checkForBlogRedirect()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, []) // Remove currentPage dependency to prevent interference

  // Update page title based on current page and language
  useEffect(() => {
    if (currentPage === 'redirect') {
      document.title = getTranslation(currentLanguage, 'pageTitles.blog')
    } else {
      const pageTitle = getTranslation(currentLanguage, `pageTitles.${currentPage}`)
      document.title = pageTitle
    }
  }, [currentPage, currentLanguage, blogSlug])

  useEffect(() => {
    const handler = () => setCurrentPage('blog')
    window.addEventListener('navigateToBlog', handler)
    return () => window.removeEventListener('navigateToBlog', handler)
  }, [])

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />
      case 'blog':
        return <Blog />
      case 'redirect':
        return <BlogRedirect slug={blogSlug} />
      default:
        return <Hero />
    }
  }

  // If we're on a redirect page, don't show the navbar and footer
  if (currentPage === 'redirect') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {renderPage()}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Fixed Navbar at top */}
      <Navbar onPageChange={setCurrentPage} currentPage={currentPage} />
      
      {/* Main content area - takes remaining space */}
      <main className="flex-1 pt-16">
        {renderPage()}
      </main>
      
      {/* Footer at bottom */}
      <footer className="border-t border-gray-200/20 dark:border-gray-700/20 bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 gap-4 text-center lg:text-left">
            {/* Let's Talk */}
            <div>
              <p className={`text-gray-600 dark:text-gray-400 text-sm mb-1 ${fontClass}`}>
                {getTranslation(currentLanguage, 'footer.letsTalk')}
              </p>
              <a 
                href="mailto:therajatraiofficial@gmail.com"
                className={`text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium ${fontClass}`}
              >
                {getTranslation(currentLanguage, 'footer.letsTalkLink')}
              </a>
            </div>

            {/* Copyright */}
            <div className={`text-gray-600 dark:text-gray-400 text-sm ${fontClass}`}>
              © {new Date().getFullYear()} Rajat Rai. {getTranslation(currentLanguage, 'footer.copyright')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
