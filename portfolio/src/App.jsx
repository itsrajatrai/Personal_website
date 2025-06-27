import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />
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
