import React, { useState, useEffect } from 'react'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { getTranslation } from './config/languageConfig'
import { hasRedirect } from './config/blogRedirects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Blog from './components/Blog'
import BlogRedirect from './components/BlogRedirect'
import NotFound from './components/NotFound'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [blogSlug, setBlogSlug] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const { currentLanguage } = useLanguage()

  // Apply Kaithi font for Bhojpuri language
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''

  // Check for blog redirect URLs or unknown routes
  useEffect(() => {
    const path = window.location.pathname
    const slug = path.substring(1)
    // Known pages
    const knownPages = ['', 'about', 'blog']
    if (slug && hasRedirect(slug)) {
      setBlogSlug(slug)
      setCurrentPage('redirect')
      setNotFound(false)
    } else if (knownPages.includes(slug)) {
      setBlogSlug(null)
      setCurrentPage(slug === '' ? 'home' : slug)
      setNotFound(false)
    } else if (slug !== '') {
      setBlogSlug(null)
      setCurrentPage('notfound')
      setNotFound(true)
    } else {
      setBlogSlug(null)
      setCurrentPage('home')
      setNotFound(false)
    }
    // Listen for popstate events (back/forward navigation)
    const handlePopState = () => {
      const path = window.location.pathname
      const slug = path.substring(1)
      if (slug && hasRedirect(slug)) {
        setBlogSlug(slug)
        setCurrentPage('redirect')
        setNotFound(false)
      } else if (knownPages.includes(slug)) {
        setBlogSlug(null)
        setCurrentPage(slug === '' ? 'home' : slug)
        setNotFound(false)
      } else if (slug !== '') {
        setBlogSlug(null)
        setCurrentPage('notfound')
        setNotFound(true)
      } else {
        setBlogSlug(null)
        setCurrentPage('home')
        setNotFound(false)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Update page title based on current page and language
  useEffect(() => {
    if (currentPage === 'redirect') {
      document.title = getTranslation(currentLanguage, 'pageTitles.blog')
    } else if (currentPage === 'notfound') {
      document.title = '404 - Page Not Found'
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
      case 'notfound':
        return <NotFound />
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
