import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

const ICONS = {
  YouTube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  Instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
}

// Latest videos per track come from public/youtube-videos.json, written by scripts/fetch-youtube.mjs.
const tracks = [
  {
    id: 'tech',
    title: 'TECH',
    description: 'How software actually works in production: reliability, systems design, engineering after AI, and the craft of building durable things.',
    topics: ['Systems design', 'Reliability', 'AI and engineering', 'Open source', 'Career leverage'],
    channels: [
      { label: 'YouTube', href: 'https://www.youtube.com/@Its_rajatrai' },
      { label: 'Instagram', href: 'https://www.instagram.com/its_rajatrai/' }
    ]
  },
  {
    id: 'beyond',
    title: 'BEYOND TECH',
    description: 'The same lens pointed elsewhere: incentives, history, and ideas that outlast news cycles.',
    topics: ['Dharma', 'Geopolitics', 'History', 'Philosophy', 'Books'],
    channels: [
      { label: 'YouTube', href: 'https://www.youtube.com/@itscuriousrajat' },
      { label: 'Instagram', href: 'https://www.instagram.com/itscuriousrajat/' }
    ]
  }
]

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''

// Hashtags and emoji read as noise in a quiet list, so titles are trimmed for display.
const cleanTitle = (t) =>
  t
    .replace(/#[\p{L}\p{N}_]+/gu, '')
    .replace(/\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]|\uFE0F/gu, '')
    .replace(/[\s|]+$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

const LatestVideos = ({ videos, channelHref }) => {
  if (!videos.length) return null
  const allShorts = videos.every((v) => v.short)
  const seeAllHref = channelHref && `${channelHref.replace(/\/$/, '')}/${allShorts ? 'shorts' : 'videos'}`
  return (
    <div className="mt-8">
      <ul className={`grid gap-x-4 gap-y-6 ${allShorts ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {videos.map((v) => (
          <li key={v.id}>
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
              <div
                className={`overflow-hidden rounded-lg border border-gray-200/60 bg-gray-100 dark:border-gray-800/60 dark:bg-gray-800 ${
                  allShorts ? 'aspect-[9/16]' : 'aspect-video'
                }`}
              >
                <img
                  src={v.thumbnail}
                  onError={(e) => {
                    if (v.fallback && e.currentTarget.src !== v.fallback) e.currentTarget.src = v.fallback
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-2 text-sm leading-snug text-gray-950 line-clamp-2 group-hover:underline underline-offset-4 decoration-gray-300 dark:text-white dark:decoration-gray-700">
                {cleanTitle(v.title) || v.title}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {v.short ? 'Short' : 'Video'}
                {v.publishedAt ? ` · ${formatDate(v.publishedAt)}` : ''}
              </p>
            </a>
          </li>
        ))}
      </ul>
      {seeAllHref && (
        <a
          href={seeAllHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 dark:text-white dark:decoration-gray-700"
        >
          See all on YouTube
        </a>
      )}
    </div>
  )
}

const useLatestVideos = () => {
  const [videos, setVideos] = useState({})
  useEffect(() => {
    let cancelled = false
    fetch('/youtube-videos.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled || !j?.channels) return
        setVideos(Object.fromEntries(Object.entries(j.channels).map(([k, c]) => [k, c.videos || []])))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])
  return videos
}

const Content = () => {
  const { currentLanguage } = useLanguage()
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''
  const videos = useLatestVideos()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container">
        <header className="max-w-3xl pt-20 sm:pt-24 md:pt-28 pb-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white ${fontClass}`}>
            {getTranslation(currentLanguage, 'content.title')}
          </h1>
          <p className={`mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
            {getTranslation(currentLanguage, 'content.subtitle')}
          </p>
        </header>

        <main className="max-w-4xl pb-16 space-y-12">
          {tracks.map((t) => (
            <section key={t.id} className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
              <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
                {t.title}
              </h2>
              <p className={`mt-5 max-w-3xl text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed ${fontClass}`}>
                {t.description}
              </p>
              <p className={`mt-4 text-sm text-gray-500 dark:text-gray-400 ${fontClass}`}>
                {t.topics.join(' · ')}
              </p>

              <nav aria-label={`${t.title} channels`} className="mt-5 flex items-center gap-5">
                {t.channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.label} (${t.title.toLowerCase()})`}
                    title={c.label}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={ICONS[c.label]} />
                    </svg>
                  </a>
                ))}
              </nav>

              <LatestVideos
                videos={videos[t.id] || []}
                channelHref={t.channels.find((c) => c.label === 'YouTube')?.href}
              />
            </section>
          ))}

          <section className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
            <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
              COLLABORATE
            </h2>
            <p className={`mt-5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
              Open to podcasts, conversations, and collaborations that go deeper than hot takes.
            </p>
            <div className="mt-6">
              <a
                href="mailto:therajatraiofficial@gmail.com"
                className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 ${fontClass}`}
              >
                Email me
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Content
