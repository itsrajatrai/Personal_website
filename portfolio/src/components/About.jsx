import React from 'react'

const About = () => {
  return (
    <section className="section h-screen flex items-center justify-start bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              About Me
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Get to know me better
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Left Side - Profile */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden shadow-lg mb-3">
                  {/* Replace this div with your actual image */}
                  <div className="text-white text-xl md:text-2xl">
                    👤
                  </div>
                  {/* Uncomment and use this for your actual image:
                  <img 
                    src="/path-to-your-image.jpg" 
                    alt="Rajat Rai" 
                    className="w-full h-full object-cover"
                  />
                  */}
                </div>
                
                {/* Name and Verification */}
                <div className="text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start">
                    Rajat Rai
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    Full-Stack Developer
                  </p>
                  
                  {/* Social Media Icons */}
                  <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                    <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex-1">
                <div className="space-y-4">
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    Hi there! I'm Rajat, a passionate Full-Stack Developer and Digital Creator based in India. I love building meaningful digital experiences that connect people and solve real-world problems.
                  </p>
                  
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    With over 5 years of experience in web development, I've worked on everything from small business websites to large-scale applications. My expertise spans across the entire tech stack - from crafting beautiful user interfaces to building robust backend systems.
                  </p>
                  
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    When I'm not coding, you'll find me reading about the latest tech trends, contributing to open-source projects, or sharing my knowledge through blog posts and tutorials. I believe in continuous learning and staying up-to-date with the ever-evolving world of technology.
                  </p>
                  
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    I'm always excited to collaborate on interesting projects and connect with fellow developers. Whether you have a project idea, want to discuss technology, or just want to say hello, feel free to reach out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200/20 dark:border-gray-700/20 bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm">
          <div className="container">
            <div className="flex items-center justify-between py-4">
              {/* Let's Talk */}
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Have ideas or want to collaborate?
                </p>
                <a 
                  href="mailto:rajat@example.com"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
                >
                  Let's Talk →
                </a>
              </div>

              {/* Copyright */}
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Rajat Rai. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 