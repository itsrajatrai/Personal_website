import React from 'react'
import { useBlogPosts } from '../hooks/useBlogPosts'
const workHighlights = [
  'Reliability without heroics: runbooks, guardrails, and automation that make recovery boring.',
  'Removing coupling: smaller workflows with written invariants and one owner per boundary.',
  'Legible decisions: short memos that ship choices sooner and give the system a memory.',
  'Docs that get used: one-page system maps you can read in 60 seconds under pressure.'
]

const philosophy = [
  'Clarity is a design choice. So is confusion.',
  'Most “complexity” is unpaid debt with good PR.',
  'Good systems don’t rely on heroics; they make the right thing the easy thing.',
  'Leverage isn’t doing more—it’s choosing constraints that do the work for you.',
  'If you can’t explain the trade-off, you don’t understand the decision.',
  'Dharma, in engineering, looks like clean incentives and honest boundaries.'
]

const thoughts = [
  'The best architecture is the one that makes the next change cheap.',
  'Incentives are upstream of culture. Culture is downstream of incentives.',
  'A system is what remains after you remove the people doing extra work.',
  '“Scale” is usually just unpriced coupling.',
  'Stability comes from boundaries, not optimism.',
  'Time is a design constraint; treat it like memory or CPU.',
  'The skill isn’t speed. It’s knowing what to ignore.',
  'Tools don’t create leverage—taste does.',
  'Dharma is doing the right thing when nobody is watching; engineering is the same.',
  'Geopolitics is systems design with slower clocks and higher stakes.'
]

const Hero = () => {
  const { posts, loading } = useBlogPosts()

  const goToBlog = (e) => {
    e?.preventDefault?.()
    window.dispatchEvent(new CustomEvent('navigateToBlog'))
  }

  const goToWork = (e) => {
    e?.preventDefault?.()
    window.dispatchEvent(new CustomEvent('navigateTo', { detail: 'work' }))
  }

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

  const recentWriting = (() => {
    const tech = (posts.hashnode || []).slice(0, 2).map((p) => ({
      title: p.title,
      url: p.url,
      source: 'Tech',
      date: p.dateAdded ? new Date(p.dateAdded) : null,
      readTime: estimateReadTime(stripHtml(p.brief))
    }))

    const nonTech = (posts.medium || []).slice(0, 2).map((p) => ({
      title: p.title,
      url: p.link,
      source: 'Non-Tech',
      date: p.pubDate ? new Date(p.pubDate) : null,
      readTime: p.readingTime || estimateReadTime(stripHtml(p.description))
    }))

    return [...tech, ...nonTech]
      .filter((p) => p.title && p.url)
      .sort((a, b) => (b.date?.getTime?.() || 0) - (a.date?.getTime?.() || 0))
      .slice(0, 3)
  })()

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
    <div id="home" className="bg-white dark:bg-gray-900">
      <section className="pt-16">
        <div className="container">
          <div className="pt-14 sm:pt-20 md:pt-28 pb-10 sm:pb-14 md:pb-20 flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
              Software Engineer at Red Hat • builder • long-term thinker
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 dark:text-white">
              Rajat Rai builds software that compounds.
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Systems-first engineering: turn messy problems into simple, durable systems.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#"
                onClick={goToBlog}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              >
                Read my notes
              </a>
              <a
                href="/work"
                onClick={goToWork}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              >
                See selected work
              </a>
            </div>

            <nav aria-label="Social links" className="mt-6 flex flex-wrap items-center gap-5">
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

            <div className="mt-10 border-t border-gray-200/60 dark:border-gray-800/60 pt-8">
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
                  RECENT WRITING
                </h2>
                <a
                  href="#"
                  onClick={goToBlog}
                  className="text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
                >
                  View all
                </a>
              </div>

              <div className="mt-5">
                {loading ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
                ) : recentWriting.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No posts yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {recentWriting.map((p) => (
                      <li key={p.url} className="group">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <p className="text-base sm:text-lg text-gray-950 dark:text-white group-hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700">
                            {p.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {p.source}
                            {p.date ? (
                              <>
                                {' '}
                                •{' '}
                                {p.date.toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </>
                            ) : null}
                            {p.readTime ? <> • {p.readTime}</> : null}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <img
            src="/profile.png"
            alt="Rajat Rai"
            className="h-28 w-28 sm:h-36 sm:w-36 lg:h-52 lg:w-52 shrink-0 rounded-full object-cover border border-gray-200 dark:border-gray-800"
            loading="eager"
            decoding="async"
          />
          </div>
        </div>
      </section>

      <section id="thinking" className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="container">
          <div className="max-w-3xl py-12 sm:py-16 md:py-20">
            <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
              PHILOSOPHY
            </h2>
            <div className="mt-6 space-y-3 text-base sm:text-lg text-gray-800 dark:text-gray-200">
              {philosophy.map((line) => (
                <p key={line} className="leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="container">
          <div className="max-w-4xl py-12 sm:py-16 md:py-20">
            <div className="max-w-3xl">
              <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
                WORK
              </h2>
              <p className="mt-3 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                Projects and patterns from production. The common thread: fewer moving parts, clearer invariants, better outcomes.
              </p>
            </div>

            <ul className="mt-8 max-w-3xl space-y-3 text-gray-800 dark:text-gray-200">
              {workHighlights.map((w) => (
                <li key={w} className="leading-relaxed">{w}</li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="/work"
                onClick={goToWork}
                className="text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
              >
                See projects
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="thoughts" className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="container">
          <div className="max-w-4xl py-12 sm:py-16 md:py-20">
            <div className="max-w-3xl">
              <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
                THOUGHTS
              </h2>
              <p className="mt-3 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                Short notes on systems, leverage, technology, and living well.
              </p>
            </div>

            <ul className="mt-8 max-w-3xl space-y-3 text-gray-800 dark:text-gray-200">
              {thoughts.map((t) => (
                <li key={t} className="leading-relaxed">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="#"
                onClick={goToBlog}
                className="text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
              >
                Subscribe / read longer notes
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="container">
          <div className="max-w-3xl py-12 sm:py-16 md:py-20">
            <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
              PROOF
            </h2>
            <div className="mt-6 space-y-3 text-gray-800 dark:text-gray-200">
              <p>
                <span className="text-gray-500 dark:text-gray-400">Red Hat</span> — building and maintaining systems that must hold under load.
              </p>
              <p>
                <span className="text-gray-500 dark:text-gray-400">Interests</span> — systems thinking, technology, Dharma, geopolitics, history.
              </p>
              <p>
                <span className="text-gray-500 dark:text-gray-400">Principle</span> — fewer words, fewer moving parts, more truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="action" className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="container">
          <div className="max-w-3xl py-12 sm:py-16 md:py-20">
            <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
              ACTION
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              If you’re building something serious, send the hard problem.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="mailto:therajatraiofficial@gmail.com"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              >
                Email me
              </a>
              <a
                href="https://github.com/itsrajatrai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/itsrajatrai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero