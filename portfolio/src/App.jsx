import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Blog from './components/Blog'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  )
}

export default App
