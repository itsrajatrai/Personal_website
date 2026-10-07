import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

const GITHUB_USER = 'itsrajatrai'

// Newest first. `path` lists promotions within the same company.
const experience = [
  {
    company: 'Red Hat',
    role: 'Software Engineer',
    dates: 'Nov 2022 – Present',
    path: ['Software Engineer Intern (Nov 2022)', 'Associate Software Engineer (May 2023)', 'Software Engineer (Oct 2025)'],
    points: [
      'On-call for production infrastructure: diagnose and resolve live incidents, including an outage caused by a misconfigured ALB.',
      'Leading the production Terraform migration of Akamai infrastructure: 35 properties and configs, including high-traffic sites such as access.redhat.com and (formerly) kubebyexample.com.',
      'Building an internal platform to deploy and manage Akamai edge configuration, with HashiCorp Vault for secrets, and a RAG system to support it.',
      'Designed GitLab CI/CD pipelines with Argo CD GitOps delivery and on-demand preview environments, adopted across 15+ projects.',
      'Run the production Drupal platform on AWS (EC2, MariaDB) with Helm deployments and Prometheus monitoring; added Redis support for Redis-backed apps. Built Splunk dashboards for real-time project health.'
    ]
  },
]

// Shown compactly under "Earlier": one line each.
const earlierExperience = [
  {
    company: 'Unicohub',
    role: 'Backend Software Engineer Intern',
    dates: 'Jun – Nov 2022',
    summary: 'Monolith to microservices, up to 15% faster APIs, OTP passwordless login.'
  },
  {
    company: 'Clearcals',
    role: 'Software Engineer Intern',
    dates: 'Jan – Mar 2022',
    summary: 'Fixed authentication defects by refactoring the auth middleware.'
  }
]

// Curated on purpose: only repos listed here are shown, in this order. `blurb` overrides the GitHub description.
// Optional `why`: a line on why you built it and the trade-offs you made.
const featuredProjects = [
  {
    repo: 'AuxiVault',
    title: 'AuxiVault',
    blurb: 'Stash web pages, code snippets and notes in one click, then find them or get a summary instantly when you need them.'
  },
  {
    repo: 'KALPA',
    title: 'KALPA',
    blurb: 'A human-first programming language that reads like structured thought, inspired by the precision of Sanskrit. KALPA transpiles to Python, so anyone can write expressive code while Python stays hidden underneath.'
  },
  {
    repo: 'Personal_website',
    title: 'rajatrai.in',
    blurb: 'This site. React + Vite + Tailwind, multilingual (English, Hindi, Bhojpuri), with writing pulled from Hashnode and Medium and badges from Credly at build time.'
  },
  {
    repo: 'Emissio-Audio',
    title: 'Emissio',
    blurb: 'An audio entertainment platform, designed and built end to end.'
  }
]

// Merged pull requests to other people's projects. The Open Source section stays hidden while this is empty.
// Entry shape: { project, note, title, href, date }
const contributions = []

const formatMonth = (date) =>
  date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''

const useRepoDetails = () => {
  const [details, setDetails] = useState({})

  useEffect(() => {
    let cancelled = false
    Promise.all(
      featuredProjects.map((p) =>
        fetch(`https://api.github.com/repos/${GITHUB_USER}/${p.repo}`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      if (cancelled) return
      const next = {}
      results.forEach((r, i) => {
        if (r) next[featuredProjects[i].repo] = r
      })
      setDetails(next)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return details
}

const Work = () => {
  const { currentLanguage } = useLanguage()
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''
  const repoDetails = useRepoDetails()
  const t = (key) => getTranslation(currentLanguage, key)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container">
        <header className="max-w-3xl pt-20 sm:pt-24 md:pt-28 pb-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white ${fontClass}`}>
            {t('work.title')}
          </h1>
          <p className={`mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
            {t('work.subtitle')}
          </p>
        </header>

        <main className="max-w-4xl pb-16 space-y-12">
          <section className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
            <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
              {t('work.experience')}
            </h2>

            <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
              {experience.map((e) => (
                <li key={`${e.company}-${e.dates}`} className="py-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
                    <p className="text-lg sm:text-xl font-semibold text-gray-950 dark:text-white">{e.company}</p>
                    <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">{e.dates}</p>
                  </div>
                  <p className="mt-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">{e.role}</p>
                  {e.path?.length ? (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{e.path.join(' → ')}</p>
                  ) : null}
                  <ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {e.points.map((pt) => (
                      <li key={pt} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-gray-400 dark:before:bg-gray-600">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            {earlierExperience.length > 0 && (
              <div className="mt-4 border-t border-gray-200/60 dark:border-gray-800/60 pt-6">
                <h3 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">{t('work.earlier')}</h3>
                <ul className="mt-4 space-y-4">
                  {earlierExperience.map((e) => (
                    <li key={`${e.company}-${e.dates}`}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
                        <p className="text-sm sm:text-base text-gray-950 dark:text-white">
                          <span className="font-semibold">{e.company}</span>
                          <span className="text-gray-500 dark:text-gray-400"> · {e.role}</span>
                        </p>
                        <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">{e.dates}</p>
                      </div>
                      {e.summary && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{e.summary}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
            <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
              {t('work.projects')}
            </h2>

            <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
              {featuredProjects.map((p) => {
                const gh = repoDetails[p.repo]
                const href = gh?.homepage || gh?.html_url || `https://github.com/${GITHUB_USER}/${p.repo}`
                const meta = [
                  gh?.language,
                  gh?.stargazers_count ? `${gh.stargazers_count} ★` : null,
                  gh?.pushed_at ? `${t('work.updated')} ${formatMonth(gh.pushed_at)}` : null
                ].filter(Boolean)

                return (
                  <li key={p.repo} className="py-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-xl font-semibold text-gray-950 dark:text-white hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
                      >
                        {p.title || p.repo}
                      </a>
                      <a
                        href={`https://github.com/${GITHUB_USER}/${p.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        {t('work.source')}
                      </a>
                    </div>
                    <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {p.blurb || gh?.description}
                    </p>
                    {p.why && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.why}</p>
                    )}
                    {meta.length ? (
                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{meta.join(' · ')}</p>
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
            >
              {t('work.everythingElse')}
            </a>
          </section>

          {contributions.length > 0 && (
            <section className="border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
              <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
                {t('work.openSource')}
              </h2>
              <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
                {contributions.map((c) => (
                  <li key={c.href} className="py-5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                      <p className="text-base sm:text-lg text-gray-950 dark:text-white">
                        <span className="font-semibold">{c.project}</span>
                        {c.note && <span className="text-gray-500 dark:text-gray-400"> · {c.note}</span>}
                      </p>
                      <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">{c.date}</p>
                    </div>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm sm:text-base text-gray-700 dark:text-gray-300 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 dark:decoration-gray-700 dark:hover:decoration-white"
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default Work
