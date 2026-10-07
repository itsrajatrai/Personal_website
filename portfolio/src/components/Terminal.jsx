import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { runCommand, complete, PROMPT, SECRET_COUNT } from './terminal/commands'

const MAX_LINES = 200
const MAX_HISTORY = 50
const TYPE_MS = 90
const SECRETS_KEY = 'rr-terminal-secrets'
const CHIPS = ['help', 'whoami', 'ls', 'cat philosophy.txt', 'sudo hire rajat']

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const loadSecrets = () => {
  try {
    const list = JSON.parse(localStorage.getItem(SECRETS_KEY))
    return new Set(Array.isArray(list) ? list : [])
  } catch {
    return new Set()
  }
}

const saveSecrets = (set) => {
  try {
    localStorage.setItem(SECRETS_KEY, JSON.stringify([...set]))
  } catch {
    // Storage may be disabled; secrets just won't persist.
  }
}

const KIND_CLASS = {
  text: 'text-gray-800 dark:text-gray-200',
  muted: 'text-gray-500 dark:text-gray-400',
  accent: 'text-emerald-700 dark:text-emerald-400',
  error: 'text-red-600 dark:text-red-400',
  link: 'text-gray-900 dark:text-white'
}

const linkClass =
  'min-h-0 min-w-0 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 dark:decoration-gray-700 dark:hover:decoration-white'

// `posts`: [{ title, href }]. `thoughts` and `philosophy`: arrays of one-line strings.
export default function Terminal({ className = '', posts = [], thoughts = [], philosophy = [] }) {
  const rootRef = useRef(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const idRef = useRef(0)
  const historyRef = useRef([])
  const histIdxRef = useRef(-1)
  const secretsRef = useRef(null)
  const certsRef = useRef(null)
  const introRef = useRef({ started: false, timers: [] })
  const contentRef = useRef({ posts, thoughts, philosophy })
  contentRef.current = { posts, thoughts, philosophy }

  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  if (secretsRef.current === null) secretsRef.current = loadSecrets()

  const append = useCallback((newLines) => {
    setLines((prev) => {
      const next = prev.concat(newLines.map((l) => ({ ...l, id: idRef.current++ })))
      return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next
    })
  }, [])

  const navigate = useCallback((page) => {
    window.dispatchEvent(new CustomEvent('navigateTo', { detail: page }))
  }, [])

  const execute = useCallback(
    (cmd) => {
      const trimmed = cmd.trim()
      const echo = { kind: 'prompt', text: cmd }
      if (trimmed) {
        const h = historyRef.current
        if (h[h.length - 1] !== trimmed) h.push(trimmed)
        if (h.length > MAX_HISTORY) h.shift()
      }
      histIdxRef.current = -1

      const { posts: p, thoughts: t, philosophy: ph } = contentRef.current
      const result = runCommand(trimmed, {
        posts: p,
        thoughts: t,
        philosophy: ph,
        certs: certsRef.current,
        history: historyRef.current,
        secretsFound: secretsRef.current.size,
        startedAt: performance.timeOrigin || Date.now(),
        now: Date.now()
      })

      if (result.effect?.type === 'clear') {
        setLines([])
        return
      }

      const out = [echo, ...(result.lines || [])]
      if (result.secret && !secretsRef.current.has(result.secret)) {
        secretsRef.current.add(result.secret)
        saveSecrets(secretsRef.current)
        const n = secretsRef.current.size
        out.push({
          kind: 'accent',
          text: n === SECRET_COUNT ? `Secret found. All ${SECRET_COUNT} found. You should probably email me.` : `Secret found (${n}/${SECRET_COUNT}).`
        })
      }
      append(out)

      const effect = result.effect
      if (effect?.type === 'navigate') setTimeout(() => navigate(effect.page), 450)
      if (effect?.type === 'open') window.location.href = effect.href
    },
    [append, navigate]
  )

  const stopIntro = () => {
    introRef.current.timers.forEach(clearTimeout)
    introRef.current.timers = []
    setTyping(false)
  }

  // The first time the terminal scrolls into view it types `whoami` by itself, so it reads as interactive.
  useEffect(() => {
    const root = rootRef.current
    const intro = introRef.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || intro.started) return
        intro.started = true
        io.disconnect()

        fetch('/credly-badges.json')
          .then((r) => (r.ok ? r.json() : null))
          .then((j) => (certsRef.current = j?.badges || []))
          .catch(() => (certsRef.current = []))

        const found = secretsRef.current.size
        append([
          { kind: 'muted', text: 'rrsh 1.0. Type `help`, or tap a command below.' },
          ...(found ? [{ kind: 'muted', text: `Welcome back. ${found}/${SECRET_COUNT} secrets found so far.` }] : [])
        ])

        const cmd = 'whoami'
        if (prefersReducedMotion()) {
          execute(cmd)
          return
        }
        setTyping(true)
        for (let i = 1; i <= cmd.length; i++) {
          intro.timers.push(setTimeout(() => setInput(cmd.slice(0, i)), 500 + i * TYPE_MS))
        }
        intro.timers.push(
          setTimeout(() => {
            setInput('')
            setTyping(false)
            execute(cmd)
          }, 500 + cmd.length * TYPE_MS + 350)
        )
      },
      { threshold: 0.4 }
    )
    io.observe(root)
    return () => {
      io.disconnect()
      intro.timers.forEach(clearTimeout)
    }
  }, [append, execute])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, input])

  const focusInput = (e) => {
    if (e.target.closest('a, button') || window.getSelection()?.toString()) return
    inputRef.current?.focus({ preventScroll: true })
  }

  const onKeyDown = (e) => {
    if (typing) stopIntro()
    const h = historyRef.current

    if (e.key === 'Enter') {
      e.preventDefault()
      execute(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      if (!h.length) return
      e.preventDefault()
      const idx = histIdxRef.current === -1 ? h.length - 1 : Math.max(0, histIdxRef.current - 1)
      histIdxRef.current = idx
      setInput(h[idx])
    } else if (e.key === 'ArrowDown') {
      if (histIdxRef.current === -1) return
      e.preventDefault()
      const idx = histIdxRef.current + 1
      if (idx >= h.length) {
        histIdxRef.current = -1
        setInput('')
      } else {
        histIdxRef.current = idx
        setInput(h[idx])
      }
    } else if (e.key === 'Tab') {
      // With an empty prompt, Tab keeps its normal job of moving focus.
      if (!input) return
      e.preventDefault()
      const { value, options } = complete(input)
      setInput(value)
      if (options.length > 1) append([{ kind: 'prompt', text: input }, { kind: 'muted', text: options.join('  ') }])
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    } else if (e.key.toLowerCase() === 'c' && e.ctrlKey && !window.getSelection()?.toString()) {
      e.preventDefault()
      append([{ kind: 'prompt', text: `${input}^C` }])
      setInput('')
    }
  }

  const runChip = (cmd) => {
    if (typing) stopIntro()
    setInput('')
    execute(cmd)
  }

  // Backticked commands inside output (e.g. `help`) are clickable.
  const renderText = (t) =>
    t.split(/(`[^`]+`)/).map((part, i) =>
      /^`[^`]+`$/.test(part) ? (
        <button key={i} type="button" onClick={() => runChip(part.slice(1, -1))} className={`${linkClass} text-gray-900 dark:text-white`}>
          {part.slice(1, -1)}
        </button>
      ) : (
        part
      )
    )

  const renderLine = (l) => {
    if (l.kind === 'prompt') {
      return (
        <div key={l.id}>
          <span className="text-gray-400 dark:text-gray-500">{PROMPT}</span> <span className="text-gray-900 dark:text-white">{l.text}</span>
        </div>
      )
    }
    let body = renderText(l.text)
    if (l.kind === 'link' && l.href) {
      const external = /^https?:/.test(l.href)
      body = (
        <a href={l.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={linkClass}>
          {l.text}
        </a>
      )
    } else if (l.kind === 'link' && l.action?.type === 'navigate') {
      body = (
        <button type="button" onClick={() => navigate(l.action.page)} className={linkClass}>
          {l.text}
        </button>
      )
    }
    return (
      <div key={l.id} className={KIND_CLASS[l.kind] || KIND_CLASS.text}>
        {l.text ? body : '\u00a0'}
      </div>
    )
  }

  const chipClass =
    'min-h-0 min-w-0 h-8 rounded-full border border-gray-200 px-3 font-mono text-xs text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white'

  return (
    <div ref={rootRef} className={className}>
      <div
        className="relative h-[380px] sm:h-[420px] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
        onClick={focusInput}
      >
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="Interactive terminal"
          className="h-full overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 font-mono text-[12.5px] sm:text-[13px] leading-6 whitespace-pre-wrap break-words"
        >
          {lines.map(renderLine)}
          <div className="flex items-center">
            <label htmlFor="rr-terminal-input" className="shrink-0 text-gray-400 dark:text-gray-500">
              {PROMPT}
            </label>
            <input
              id="rr-terminal-input"
              ref={inputRef}
              value={input}
              onChange={(e) => {
                if (typing) stopIntro()
                setInput(e.target.value)
              }}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              aria-label="Terminal command"
              className="ml-2 min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[12.5px] sm:text-[13px] text-gray-900 caret-emerald-600 outline-none focus:ring-0 dark:text-white dark:caret-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested commands">
        {CHIPS.map((c) => (
          <button key={c} type="button" onClick={() => runChip(c)} className={chipClass}>
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
