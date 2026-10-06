import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../config/languageConfig'

// Newest first. `upcoming: true` moves a talk into the Upcoming section.
// Add recordings or slides as links: [{ label: 'Video', href }]
const talks = [
  {
    title: 'The Double Left Shift: What Engineers Do When Code Is Cheap',
    venue: 'PIET, Panipat, Haryana',
    date: 'Oct 2026',
    upcoming: true,
    description: 'When writing code stops being the bottleneck, the work shifts left twice: towards the problem, and towards the system that has to run it.',
    links: []
  },
  {
    title: 'Is Engineering Dead?',
    venue: 'Humanity 2026 by Bugbar, Gurugram',
    date: 'Jun 2026',
    description: 'What changes for engineers in the age of AI, and what stays exactly the same.',
    links: []
  },
  {
    title: 'Revealing the AI Revolution in DevOps: Transfiguring the Way We Perceive It',
    venue: 'DevOps Con, Singapore',
    date: 'Dec 2023',
    description: 'How AI is changing the way DevOps teams build, ship and operate software.',
    links: []
  },
  {
    title: 'What I’d Tell My First-Year Self: How to Do Well in B.Tech',
    venue: 'Sharda University, Greater Noida',
    date: 'Aug 2023',
    description: 'Practical advice for first-year engineering students on making the most of four years.',
    links: []
  }
]

const upcomingTalks = talks.filter((t) => t.upcoming)
const pastTalks = talks.filter((t) => !t.upcoming)

// Newest first. `upcoming: true` moves an event into the Upcoming section.
const allJudging = [
  { event: 'Hack Arena at CodeX 3.0', role: 'Judge', date: 'Oct 2026', place: 'PIET, Panipat', upcoming: true },
  { event: 'EcoSphere', role: 'Mentor', date: 'Aug 2026', place: 'Organised by Knotic in association with Agora' },
  { event: 'Eco Code', role: 'Judge', date: 'Sep 2025', place: 'BVCOE, Paschim Vihar, New Delhi' },
  { event: 'Hack the Future Edition', role: 'Judge', date: 'Jan 2025', place: 'WWF India Office, New Delhi' },
  { event: 'Hack4BioHeritage', role: 'Judge', date: 'May 2024', place: 'Online' },
  { event: 'EduHack 2.0', role: 'Judge', date: 'Apr 2024', place: 'BVCOE, Paschim Vihar, New Delhi' }
]

const judging = allJudging.filter((j) => !j.upcoming)

const upcoming = [
  ...upcomingTalks.map((t) => ({ ...t, venue: `Talk • ${t.venue}` })),
  ...allJudging
    .filter((j) => j.upcoming)
    .map((j) => ({ title: j.event, venue: `${j.role} • ${j.place}`, date: j.date, upcoming: true }))
]

const Talks = () => {
  const { currentLanguage } = useLanguage()
  const fontClass = currentLanguage === 'bh' ? 'font-kaithi' : ''

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container">
        <header className="max-w-3xl pt-20 sm:pt-24 md:pt-28 pb-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white ${fontClass}`}>
            {getTranslation(currentLanguage, 'talks.title')}
          </h1>
          <p className={`mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
            {getTranslation(currentLanguage, 'talks.subtitle')}
          </p>
        </header>

        <main className="max-w-4xl pb-16">
          {[
            { id: 'upcoming', title: 'UPCOMING', list: upcoming },
            { id: 'past', title: 'TALKS', list: pastTalks }
          ]
            .filter((s) => s.list.length)
            .map((s, i) => (
              <section
                key={s.id}
                className={`border-t border-gray-200/60 dark:border-gray-800/60 pt-10 ${i ? 'mt-12' : ''}`}
              >
                <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
                  {s.title}
                </h2>

                <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
                  {s.list.map((t) => (
                    <li key={`${t.title}-${t.date}`} className="py-6">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                        <p className={`text-base sm:text-lg text-gray-950 dark:text-white ${fontClass}`}>{t.title}</p>
                        <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                          {t.upcoming && (
                            <span className="mr-2 rounded-full border border-emerald-600/30 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400">
                              Coming soon
                            </span>
                          )}
                          {t.date}
                        </p>
                      </div>

                      <p className={`mt-2 text-sm text-gray-600 dark:text-gray-400 ${fontClass}`}>{t.venue}</p>

                      {t.description && (
                        <p className={`mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
                          {t.description}
                        </p>
                      )}

                      {t.links?.length ? (
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                          {t.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

          <section className="mt-12 border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
            <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
              JUDGING / MENTORING
            </h2>

            <p className={`mt-5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
              I judge and mentor hackathons, looking for systems thinking, engineering quality, and clarity of trade-offs.
            </p>

            <ul className="mt-4 divide-y divide-gray-200/60 dark:divide-gray-800/60">
              {judging.map((j) => (
                <li key={`${j.event}-${j.date}`} className="py-5 sm:py-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <p className={`text-base sm:text-lg text-gray-950 dark:text-white ${fontClass}`}>
                      {j.event}
                    </p>
                    <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">{j.date}</p>
                  </div>
                  <p className={`mt-2 text-sm text-gray-600 dark:text-gray-400 ${fontClass}`}>
                    {j.role} • {j.place}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
            <h2 className={`text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 ${fontClass}`}>
              INVITE
            </h2>
            <p className={`mt-5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed ${fontClass}`}>
              If you want a talk on reliability, systems thinking, or engineering leverage, email me.
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

export default Talks

