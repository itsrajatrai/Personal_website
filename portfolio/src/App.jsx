import React, { useState, useEffect } from 'react'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { getTranslation } from './config/languageConfig'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Blog from './components/Blog'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const { currentLanguage } = useLanguage()

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
      default:
        return <Hero />
    }
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
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {getTranslation(currentLanguage, 'footer.letsTalk')}
              </p>
              <a 
                href="mailto:rajat@example.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
              >
                {getTranslation(currentLanguage, 'footer.letsTalkLink')}
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-600 dark:text-gray-400 text-sm">
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
