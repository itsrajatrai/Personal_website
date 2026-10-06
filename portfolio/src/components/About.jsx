import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const About = () => {
  const { currentLanguage } = useLanguage()
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''

  const sections = [
    {
      id: 'about',
      title: 'ABOUT',
      items: [
        'I’m Rajat Rai. I build systems that are easier to operate than to explain.',
        'I care about reliability, clear interfaces, and decisions that survive time.',
        'I’m drawn to problems where incentives, constraints, and feedback loops matter more than raw code.'
      ]
    },
    {
      id: 'interests',
      title: 'INTERESTS',
      items: [
        'Systems thinking (how things actually behave, not how they’re described).',
        'Technology as leverage—especially tooling that reduces cognitive load.',
        'Dharma and discipline: doing the right thing when it’s inconvenient.',
        'Geopolitics and history: long time horizons, real trade-offs.'
      ]
    },
    {
      id: 'expertise',
      title: 'TECHNICAL EXPERTISE',
      items: [
        'Reliability work: failure modes, guardrails, runbooks, incident hygiene.',
        'Engineering systems: reduce coupling, tighten boundaries, make changes cheap.',
        'Linux + open source mindset: understand the substrate, not just the surface.'
      ]
    },
    {
      id: 'philosophy',
      title: 'PHILOSOPHY',
      items: [
        'Clarity is a feature. Complexity is a cost.',
        'A good system makes the correct action the easiest action.',
        'Write decisions down. The system should have a memory.',
        'Aim for “boring” operations: predictable recovery, predictable changes.'
      ]
    },
    {
      id: 'books',
      title: 'BOOKS / IDEAS I RETURN TO',
      items: [
        'Stoicism, Indian philosophy, and first-principles thinking.',
        'History as pattern recognition: incentives, geography, institutions.',
        'Writing as compression: keep only what’s true and useful.'
      ]
    }
  ]

  const socials = [
    {
      label: 'X',
      href: 'https://x.com/ItsRajatRai',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@Its_rajatrai',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/itsrajatrai/',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/its_rajatrai/',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      label: 'GitHub',
      href: 'https://github.com/itsrajatrai',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    },
    {
      label: 'Email',
      href: 'mailto:therajatraiofficial@gmail.com',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container">
        <header className="max-w-4xl pt-20 sm:pt-24 md:pt-28 pb-10">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className={`text-sm tracking-wide text-gray-500 dark:text-gray-400 ${fontClass}`}>
                Software Engineer at Red Hat
              </p>
              <h1 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white ${fontClass}`}>
                About
              </h1>
              <p className={`mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
                A short map of what I care about: systems, constraints, and the long game.
              </p>
            </div>

            <img
              src="/profile.png"
              alt="Rajat Rai"
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full object-cover border border-gray-200 dark:border-gray-800"
              loading="eager"
              decoding="async"
            />
          </div>

          <nav aria-label="Social links" className="mt-8 flex flex-wrap items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                title={s.label}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </nav>
        </header>

        <main className="max-w-4xl pb-16">
          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
                <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
                  {s.title}
                </h2>
                <div className="mt-5 space-y-3">
                  {s.items.map((line) => (
                    <p
                      key={line}
                      className={`text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed ${fontClass}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
              <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
                THINGS I LIKE
              </h2>
              <ul className={`mt-5 space-y-2 text-sm sm:text-base text-gray-800 dark:text-gray-200 ${fontClass}`}>
                <li>Simple interfaces.</li>
                <li>Quiet tools that respect attention.</li>
                <li>Maps, timelines, and first-hand sources.</li>
                <li>Good food. Good silence. Good work.</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default About