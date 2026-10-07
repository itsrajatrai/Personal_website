// Commands for the homepage terminal. Pure logic: no DOM, no React.
// `runCommand` returns lines to print plus an optional effect the UI carries out (navigate, open a link, clear).

export const EMAIL = 'therajatraiofficial@gmail.com'
export const PROMPT = 'rajat@rajatrai.in:~$'

const PAGES = ['work', 'about', 'blog', 'talks', 'studio', 'certifications']
const FILES = ['philosophy.txt', 'thoughts.txt', 'now.txt', 'contact.txt']
const DIRS = ['projects/', 'writing/']

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/itsrajatrai' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/itsrajatrai/' },
  { label: 'X', href: 'https://x.com/ItsRajatRai' },
  { label: 'YouTube', href: 'https://www.youtube.com/@Its_rajatrai' },
  { label: 'Instagram', href: 'https://www.instagram.com/its_rajatrai/' }
]

const PROJECTS = [
  {
    name: 'rajatrai.in',
    href: 'https://github.com/itsrajatrai/Personal_website',
    blurb: 'This site. React, Vite, Tailwind; English, Hindi and Bhojpuri.'
  }
]

const TALKS = [
  { title: 'Systems that are easier to operate than to explain', year: '2026' },
  { title: 'The leverage of clarity', year: '2026' }
]

const NOW = [
  'Building and maintaining systems at Red Hat that must hold under load.',
  'Writing short notes on systems, leverage and living well.',
  'Reading: history, geopolitics, and anything about feedback loops.'
]

// ---------------------------------------------------------------------------
// Output helpers

const text = (t) => ({ kind: 'text', text: t })
const muted = (t) => ({ kind: 'muted', text: t })
const accent = (t) => ({ kind: 'accent', text: t })
const error = (t) => ({ kind: 'error', text: t })
const link = (t, href) => ({ kind: 'link', text: t, href })
const nav = (t, page) => ({ kind: 'link', text: t, action: { type: 'navigate', page } })
const blank = () => text('')

const pad = (s, n) => (s.length >= n ? `${s} ` : s + ' '.repeat(n - s.length))

const formatDuration = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  if (s < 60) return `${s} sec`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min`
  return `${Math.floor(m / 60)} h ${m % 60} min`
}

const postsOf = (ctx) => ctx.posts || []

// ---------------------------------------------------------------------------
// Visible commands

const catFile = (name, ctx) => {
  const file = name.replace(/^~\//, '').replace(/^\.\//, '')
  const withExt = file.includes('.') ? file : `${file}.txt`
  switch (withExt) {
    case 'philosophy.txt':
      return { lines: (ctx.philosophy || []).map(text) }
    case 'thoughts.txt':
      return { lines: (ctx.thoughts || []).map(text) }
    case 'now.txt':
      return { lines: NOW.map(text) }
    case 'contact.txt':
      return COMMANDS.contact.run([], ctx)
    default:
      if (DIRS.includes(`${file.replace(/\/$/, '')}/`)) return { lines: [error(`cat: ${file}: Is a directory`)] }
      return { lines: [error(`cat: ${name}: No such file`), muted('Try `ls` to see what is here.')] }
  }
}

const COMMANDS = {
  help: {
    desc: 'List commands',
    run: (_, ctx) => {
      const visible = Object.entries(COMMANDS).filter(([, c]) => !c.secret)
      const width = Math.max(...visible.map(([n]) => n.length)) + 3
      return {
        lines: [
          ...visible.map(([name, c]) => text(`${pad(name, width)}${c.desc}`)),
          blank(),
          muted('Tab completes. Up and Down walk your history.'),
          accent(`Some commands are hidden. ${ctx.secretsFound || 0}/${SECRET_COUNT} secrets found.`)
        ]
      }
    }
  },
  whoami: {
    desc: 'Who is this?',
    run: () => ({
      lines: [
        accent('Rajat Rai. Software Engineer at Red Hat.'),
        text('I build systems that are easier to operate than to explain.'),
        text('Systems-first engineering: turn messy problems into simple, durable systems.'),
        muted('Type `help` to see what you can do here.')
      ]
    })
  },
  about: {
    desc: 'A little more about me',
    run: () => ({
      lines: [
        text('I’m drawn to problems where incentives, constraints and feedback loops matter more than raw code.'),
        text('I care about reliability without heroics, fewer moving parts, and the long game.'),
        text('Interests: systems thinking, technology, Dharma, geopolitics, history.'),
        nav('→ open about', 'about')
      ]
    })
  },
  ls: {
    desc: 'List files',
    run: (args, ctx) => {
      const target = (args[0] || '').replace(/^~\/?/, '').replace(/\/$/, '')
      if (!target) return { lines: [text([...DIRS, ...FILES].join('  '))] }
      if (target === 'projects') {
        return { lines: PROJECTS.flatMap((p) => [link(p.name, p.href), muted(`  ${p.blurb}`)]).concat(nav('→ open work', 'work')) }
      }
      if (target === 'writing') return COMMANDS.blog.run([], ctx)
      if (FILES.includes(target)) return { lines: [text(target)] }
      return { lines: [error(`ls: cannot access '${args[0]}': No such file or directory`)] }
    }
  },
  cat: {
    desc: 'Read a file (try philosophy.txt)',
    run: (args, ctx) => {
      if (!args.length) return { lines: [muted('usage: cat <file>   e.g. cat philosophy.txt')] }
      return { lines: args.flatMap((a) => catFile(a, ctx).lines) }
    }
  },
  open: {
    desc: 'Open a page: work, about, blog, talks, studio, certifications',
    run: (args) => {
      const page = (args[0] || '').toLowerCase().replace(/^writing$/, 'blog').replace(/^certs$/, 'certifications')
      if (!PAGES.includes(page)) return { lines: [muted(`usage: open <${PAGES.join('|')}>`)] }
      return { lines: [muted(`Opening ${page}…`)], effect: { type: 'navigate', page } }
    }
  },
  blog: {
    desc: 'Latest writing',
    run: (_, ctx) => {
      const posts = postsOf(ctx).slice(0, 6)
      if (!posts.length) return { lines: [muted('Posts are still loading. Try again in a moment.'), nav('→ open blog', 'blog')] }
      return { lines: [...posts.map((p) => link(p.title, p.href)), nav('→ open blog', 'blog')] }
    }
  },
  talks: {
    desc: 'Talks and workshops',
    run: () => ({ lines: [...TALKS.map((t) => text(`${t.year}  ${t.title}`)), nav('→ open talks', 'talks')] })
  },
  certs: {
    desc: 'Certifications',
    run: (_, ctx) => {
      if (!ctx.certs) return { lines: [muted('Fetching badges… try again in a second.')] }
      if (!ctx.certs.length) return { lines: [muted('No badges yet.'), nav('→ open certifications', 'certifications')] }
      return {
        lines: [
          ...ctx.certs.map((b) => text(`${pad(b.issuer || '', 22)}${b.name}`)),
          nav('→ open certifications', 'certifications')
        ]
      }
    }
  },
  contact: {
    desc: 'How to reach me',
    run: () => ({
      lines: [
        text('If you’re building something serious, send the hard problem.'),
        link(EMAIL, `mailto:${EMAIL}`),
        ...SOCIALS.map((s) => link(`${pad(s.label, 11)}${s.href.replace(/^https:\/\/(www\.)?/, '')}`, s.href))
      ]
    })
  },
  github: {
    desc: 'My GitHub',
    run: () => ({ lines: [link('github.com/itsrajatrai', 'https://github.com/itsrajatrai')] })
  },
  history: {
    desc: 'Commands you have run',
    run: (_, ctx) => ({
      lines: (ctx.history || []).length
        ? ctx.history.map((h, i) => text(`${String(i + 1).padStart(4)}  ${h}`))
        : [muted('No history yet.')]
    })
  },
  echo: { desc: 'Print text', run: (args) => ({ lines: [text(args.join(' '))] }) },
  date: { desc: 'Current date and time', run: (_, ctx) => ({ lines: [text(new Date(ctx.now ?? Date.now()).toString())] }) },
  clear: { desc: 'Clear the screen', run: () => ({ lines: [], effect: { type: 'clear' } }) },

  // -------------------------------------------------------------------------
  // Hidden commands. Each one counts as a secret the first time it is found.

  sudo: {
    secret: true,
    run: (args) => {
      if (args.join(' ').toLowerCase() === 'hire rajat') {
        return {
          lines: [muted('[sudo] password for visitor: ********'), accent('Access granted. Opening your mail client…')],
          effect: { type: 'open', href: `mailto:${EMAIL}?subject=${encodeURIComponent('Let’s build something')}` }
        }
      }
      return { lines: [error('visitor is not in the sudoers file. This incident will be reported.'), muted('Hint: some sudo commands are welcome.')] }
    }
  },
  rm: {
    secret: true,
    run: (args) =>
      args.some((a) => a.startsWith('-') && a.includes('r'))
        ? { lines: [error("rm: refusing to remove '/'"), accent('Guardrails exist for a reason.')] }
        : { lines: [muted('rm: nothing here is worth deleting.')] }
  },
  neofetch: {
    secret: true,
    run: (_, ctx) => {
      const art = ['██████  ██████ ', '██   ██ ██   ██', '██████  ██████ ', '██   ██ ██   ██', '██   ██ ██   ██']
      const info = [
        'visitor@rajatrai.in',
        `OS       rajatrai.in (React + Vite)`,
        `Host     Red Hat`,
        `Uptime   ${formatDuration((ctx.now ?? Date.now()) - (ctx.startedAt ?? Date.now()))}`,
        `Shell    rrsh 1.0`,
        `Packages ${(ctx.thoughts || []).length} thoughts, ${postsOf(ctx).length} posts`,
        `Secrets  ${ctx.secretsFound || 0}/${SECRET_COUNT}`
      ]
      const rows = Math.max(art.length, info.length)
      return {
        lines: Array.from({ length: rows }, (_, i) => (i === 0 ? accent : text)(`${pad(art[i] || '', 17)}${info[i] || ''}`))
      }
    }
  },
  uptime: {
    secret: true,
    run: (_, ctx) => ({
      lines: [
        text(`up ${formatDuration((ctx.now ?? Date.now()) - (ctx.startedAt ?? Date.now()))}, 1 visitor, load average: curiosity 0.92`)
      ]
    })
  },
  top: {
    secret: true,
    run: (_, ctx) => {
      const thoughts = ctx.thoughts || []
      return {
        lines: [
          accent('  PID USER   %CPU  COMMAND'),
          ...thoughts.slice(0, 6).map((t, i) =>
            text(`${String(1024 + i * 97).padStart(5)} rajat  ${String((38 - i * 6.3).toFixed(1)).padStart(4)}  ${t.length > 60 ? `${t.slice(0, 57)}…` : t}`)
          )
        ]
      }
    }
  },
  fortune: {
    secret: true,
    run: (_, ctx) => {
      const pool = [...(ctx.thoughts || []), ...(ctx.philosophy || [])]
      const rand = ctx.random || Math.random
      return { lines: [text(pool.length ? pool[Math.floor(rand() * pool.length)] : 'Stability comes from boundaries, not optimism.')] }
    }
  },
  ping: {
    secret: true,
    run: (args) => {
      if ((args[0] || '').toLowerCase() !== 'rajat') return { lines: [muted('usage: ping rajat')] }
      return {
        lines: [
          text('PING rajat (rajatrai.in): 56 data bytes'),
          text('64 bytes from rajat: icmp_seq=0 ttl=64 time=thinking'),
          text('64 bytes from rajat: icmp_seq=1 ttl=64 time=writing'),
          text('64 bytes from rajat: icmp_seq=2 ttl=64 time=shipping'),
          muted('3 packets transmitted, 3 received. Lowest latency: email.'),
          link(EMAIL, `mailto:${EMAIL}`)
        ]
      }
    }
  },
  uname: {
    secret: true,
    run: () => ({ lines: [text('rrsh 1.0 rajatrai.in systems-first #1 SMP built with React, Vite and taste')] })
  },
  exit: {
    secret: true,
    run: () => ({ lines: [muted('There is no exit. Only deeper rabbit holes.'), muted('Try `neofetch`.')] })
  },
  dharma: {
    secret: true,
    run: () => ({
      lines: [
        accent('Dharma is doing the right thing when nobody is watching; engineering is the same.'),
        text('Dharma, in engineering, looks like clean incentives and honest boundaries.')
      ]
    })
  }
}

const ALIASES = {
  posts: 'blog',
  writing: 'blog',
  '?': 'help',
  email: 'contact',
  socials: 'contact'
}

export const SECRET_COUNT = Object.values(COMMANDS).filter((c) => c.secret).length
const VISIBLE = Object.keys(COMMANDS).filter((n) => !COMMANDS[n].secret)

// Small built-ins that don't deserve a line in `help`.
const EXTRAS = {
  man: (args) =>
    (args[0] || '').toLowerCase() === 'rajat'
      ? {
          lines: [
            accent('RAJAT(1)'),
            text('NAME'),
            text('    rajat - builds software that compounds'),
            text('SYNOPSIS'),
            text('    rajat [--systems] [--reliability] [--long-game]'),
            text('DESCRIPTION'),
            text('    Turns messy problems into simple, durable systems. Prefers boring operations,'),
            text('    written invariants and one owner per boundary.'),
            text('SEE ALSO'),
            text('    blog, talks, open work')
          ]
        }
      : { lines: [muted('What manual page do you want? Try `man rajat`.')] },
  cd: () => ({ lines: [muted('There is only ~ here. Try `open work` to go somewhere.')] }),
  pwd: () => ({ lines: [text('/home/rajat')] }),
  projects: (_, ctx) => COMMANDS.ls.run(['projects'], ctx)
}

// ---------------------------------------------------------------------------
// Parsing, completion and suggestions

const tokenize = (input) => input.trim().split(/\s+/).filter(Boolean)

const distance = (a, b) => {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j]
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return dp[b.length]
}

// Closest visible command to a typo, or null. Hidden commands are never suggested.
export function suggest(word) {
  const w = (word || '').toLowerCase()
  if (!w) return null
  let best = null
  let bestD = Infinity
  for (const name of VISIBLE) {
    const d = distance(w, name)
    if (d < bestD) {
      bestD = d
      best = name
    }
  }
  return bestD <= (best.length >= 4 ? 2 : 1) ? best : null
}

const commonPrefix = (list) =>
  list.reduce((acc, s) => {
    let i = 0
    while (i < acc.length && i < s.length && acc[i] === s[i]) i++
    return acc.slice(0, i)
  })

// Tab completion. Returns the new input value and, when ambiguous, the candidates to show.
export function complete(input) {
  const endsWithSpace = /\s$/.test(input)
  const tokens = tokenize(input)
  if (!tokens.length) return { value: input, options: VISIBLE }

  let pool
  let head
  let partial
  if (tokens.length === 1 && !endsWithSpace) {
    pool = VISIBLE
    head = ''
    partial = tokens[0].toLowerCase()
  } else {
    const cmd = tokens[0].toLowerCase()
    pool = cmd === 'cat' ? FILES : cmd === 'open' ? PAGES : cmd === 'ls' ? DIRS : []
    head = `${tokens[0]} `
    partial = endsWithSpace ? '' : tokens[tokens.length - 1]
  }

  const matches = pool.filter((p) => p.startsWith(partial))
  if (!matches.length) return { value: input, options: [] }
  if (matches.length === 1) return { value: `${head}${matches[0]}${matches[0].endsWith('/') ? '' : ' '}`, options: [] }
  const prefix = commonPrefix(matches)
  return { value: `${head}${prefix.length > partial.length ? prefix : partial}`, options: matches }
}

// ctx: { posts: [{title, href}], thoughts, philosophy, certs, history, secretsFound, startedAt, now, random }
export function runCommand(input, ctx = {}) {
  const tokens = tokenize(input)
  if (!tokens.length) return { lines: [] }
  const [raw, ...args] = tokens
  const name = raw.toLowerCase()
  const resolved = ALIASES[name] || name

  if (COMMANDS[resolved]) {
    const out = COMMANDS[resolved].run(args, ctx)
    return { ...out, secret: COMMANDS[resolved].secret ? resolved : null }
  }
  if (EXTRAS[resolved]) return EXTRAS[resolved](args, ctx)

  const guess = suggest(name)
  return {
    lines: [
      error(`command not found: ${raw}`),
      muted(guess ? `Did you mean \`${guess}\`?` : 'Type `help` to see what you can do here.')
    ]
  }
}
