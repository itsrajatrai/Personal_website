import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

const CREDLY_PROFILE = 'https://www.credly.com/users/itsrajatrai'

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : ''

const Certifications = () => {
  const { currentLanguage } = useLanguage()
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const t = (key) => getTranslation(currentLanguage, key)

  useEffect(() => {
    fetch('/credly-badges.json')
      .then((res) => (res.ok ? res.json() : { badges: [] }))
      .then((data) => setBadges(data.badges || []))
      .catch(() => setBadges([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container">
        <header className="max-w-3xl pt-20 sm:pt-24 md:pt-28 pb-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white ${fontClass}`}>
            {t('certifications.title')}
          </h1>
          <p className={`mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
            {t('certifications.subtitle')}
          </p>
          <a
            href={CREDLY_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
          >
            {t('certifications.verify')}
          </a>
        </header>

        <main className="max-w-4xl pb-16">
          <section className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
            <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
              {t('certifications.badges')}
            </h2>

            {loading ? (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">{t('common.loading')}</p>
            ) : badges.length === 0 ? (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                {t('certifications.empty')}{' '}
                <a href={CREDLY_PROFILE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  Credly
                </a>
                .
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
                {badges.map((b) => (
                  <li key={b.id} className="py-6">
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="group flex gap-5 sm:gap-6">
                      {b.image ? (
                        <img
                          src={b.image}
                          alt=""
                          className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}

                      <div className="min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                          <p className="text-base sm:text-lg text-gray-950 dark:text-white group-hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700">
                            {b.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                            {formatDate(b.issuedAt)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {b.issuer}
                          {b.expiresAt ? <> • {t('certifications.expires')} {formatDate(b.expiresAt)}</> : null}
                        </p>
                        {b.skills?.length ? (
                          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            {b.skills.slice(0, 5).join(' · ')}
                          </p>
                        ) : null}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default Certifications
