import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Icon from '../components/Icon'
import { usePageTitle } from '../components/PageHero'
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero'
import { AMENITIES, CONTACT, ENQUIRY_ENDPOINT, FAQS, GALLERY, PRICING, ROOM_TYPES, RULES, img } from '../data'
import '../home.css'

const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Calls `fn(rect, viewportHeight)` on every animation frame in which the page scrolled.
function useScrollFrame(ref, fn, deps = []) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const tick = () => {
      raf = 0
      fn(el.getBoundingClientRect(), window.innerHeight, el)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

const clamp01 = (n) => Math.min(1, Math.max(0, n))
const rupees = (n) => `₹${n.toLocaleString('en-IN')}`
const priceOf = (row) => Number(row.price.replace(/,/g, ''))

/* ───────────── Marquee ───────────── */

const TICKER = [
  'High-Speed Wi-Fi',
  'Housekeeping Services',
  'Safe & Secure Living',
  '24/7 Support',
  'Community Living',
  'Private Rooms',
  'Double Sharing',
  'ITPL Main Road',
]

function Ticker() {
  const items = TICKER.map((t) => (
    <span key={t} className="nx-ticker__item">
      {t}
      <img src="/images/nayasa-emblem.webp" alt="" width="22" height="16" />
    </span>
  ))
  return (
    <div className="nx-ticker" aria-label={TICKER.join(', ')}>
      <div className="nx-ticker__track" aria-hidden="true">
        <div>{items}</div>
        <div>{items}</div>
      </div>
    </div>
  )
}

/* ───────────── About: three pillars in arches ───────────── */

const PILLARS = [
  {
    src: 'private-room-desk',
    title: 'Your space, your choice',
    text: 'Private and shared accommodation options, giving residents the freedom to choose a space that suits their needs and budget.',
    speed: 30,
  },
  {
    src: 'lobby-lounge',
    title: 'The essentials, taken care of',
    text: 'From housekeeping to high-speed Wi-Fi and round-the-clock support, so you can focus on living your life.',
    speed: -24,
  },
  {
    src: 'building-exterior',
    title: 'Professionally managed',
    text: 'A LIFE BY SQFT brand, bringing professional property management to everyday living on ITPL Main Road.',
    speed: 44,
  },
]

function About() {
  const box = useRef(null)
  useScrollFrame(box, (r, vh, el) => {
    if (still() || window.innerWidth < 900) return el.style.setProperty('--p', '0.5')
    el.style.setProperty('--p', clamp01((vh - r.top) / (vh + r.height)).toFixed(4))
  })

  return (
    <section id="about" className="nx-about" aria-label="About Nayasa" ref={box}>
      <div className="nx-wrap nx-about__grid">
        <div className="nx-about__text">
          <p className="nx-eyebrow" data-reveal>About Nayasa</p>
          <h2 className="nx-h2 nx-about__title" data-reveal style={{ '--d': '80ms' }}>
            A place you'll love <em>coming home</em> to.
          </h2>
          <p className="nx-about__lede" data-reveal style={{ '--d': '140ms' }}>
            Finding a place to stay in a busy city shouldn't be complicated. At Nayasa Premium
            Co-Living, we bring together comfortable accommodation, essential amenities and
            professional property management to make everyday living convenient.
          </p>
          <div className="nx-about__stats" data-reveal style={{ '--d': '200ms' }}>
            <div>
              <strong><Counter to={10000} prefix="₹" /></strong>
              <span>Double sharing, per bed</span>
            </div>
            <div>
              <strong><Counter to={14000} prefix="₹" /></strong>
              <span>Private room, per room</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Round-the-clock support</span>
            </div>
            <div>
              <strong className="nx-about__brand">LIFE BY SQFT</strong>
              <span>Professionally managed</span>
            </div>
          </div>
          <Link to="/about" className="nx-link" data-reveal style={{ '--d': '260ms' }}>
            More about Nayasa <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="nx-pillars">
          {PILLARS.map((p, i) => (
            <article key={p.title} className="nx-pillar" style={{ '--speed': p.speed }} data-reveal>
              <div className="nx-pillar__img">
                <img src={img(p.src, 'sm')} alt="" loading="lazy" />
                <span className="nx-pillar__n">0{i + 1}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (still()) {
      el.textContent = prefix + to.toLocaleString('en-IN') + suffix
      return
    }
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (now) => {
        const t = Math.min(1, (now - start) / 1600)
        const eased = 1 - Math.pow(1 - t, 4)
        el.textContent = prefix + Math.round(to * eased).toLocaleString('en-IN') + suffix
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, prefix, suffix])
  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

/* ───────────── A walk through Nayasa: a gallery wall you scroll along ───────────── */

const WALK = [
  { src: 'private-room-bright', short: 'Private room', title: 'A room of', em: 'your own', text: 'Private rooms for those who prefer their personal space.', tag: 'From ₹14,000 / room', shape: 'arch' },
  { src: 'sharing-room-wide', short: 'Double sharing', title: 'Room', em: 'for two', text: 'Double sharing at an accessible price, with essential facilities.', tag: 'From ₹10,000 / bed', shape: 'wide' },
  { src: 'lobby-lounge', short: 'Lounge', title: 'The', em: 'lounge', text: 'A welcoming common lounge, right as you walk in.', tag: 'Common areas', shape: 'tall' },
  { src: 'kitchen-counter', short: 'Kitchen', title: 'The', em: 'kitchen', text: 'A shared kitchen with a refrigerator and water dispenser.', tag: 'Common areas', shape: 'wide' },
  { src: 'dining-hall', short: 'Dining', title: 'The', em: 'dining hall', text: 'Long wooden tables and benches to sit down together.', tag: 'Common areas', shape: 'arch' },
  { src: 'recreation-room', short: 'Recreation', title: 'Game', em: 'time', text: 'Table tennis and foosball in the recreational space.', tag: 'Facilities', shape: 'tall' },
  { src: 'rooftop-evening', short: 'Rooftop', title: 'Evenings,', em: 'upstairs', text: 'Swing chairs, warm lights and green turf under a covered roof.', tag: 'Facilities', shape: 'wide' },
]

// Sideways pixels per pixel scrolled while the walk is pinned.
const WALK_SPEED = 2.5

function Walk({ onBook }) {
  const outer = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  const words = useRef(null)
  const cards = useRef([])
  const dist = useRef(0)
  const [step, setStep] = useState(0)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const update = () => setPinned(mq.matches && !still())
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Spotlight: the photo nearest the middle of the screen gets --f = 1, its neighbours fade
  // toward 0. `x` is how far the track has travelled to the left.
  const spotlight = (x) => {
    const mid = window.innerWidth / 2
    let best = 0
    let bestD = Infinity
    cards.current.forEach((c, i) => {
      if (!c) return
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - x - mid) / window.innerWidth
      c.style.setProperty('--f', Math.max(0, 1 - d * 1.45).toFixed(3))
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    setStep(best)
  }

  // The pinned stage is one screen plus the track's overflow divided by SPEED, so the
  // photos travel sideways SPEED× faster than the page scrolls and the walk stays short.
  useEffect(() => {
    const o = outer.current
    const t = track.current
    if (!o || !t) return
    if (!pinned) {
      o.style.height = ''
      t.style.transform = ''
      const onSwipe = () => spotlight(t.scrollLeft)
      onSwipe()
      t.addEventListener('scroll', onSwipe, { passive: true })
      return () => t.removeEventListener('scroll', onSwipe)
    }
    const size = () => {
      dist.current = Math.max(0, t.scrollWidth - window.innerWidth)
      o.style.height = `${dist.current / WALK_SPEED + window.innerHeight}px`
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(t)
    return () => ro.disconnect()
  }, [pinned])

  useScrollFrame(
    outer,
    (r, vh) => {
      if (!pinned) return
      const p = clamp01(-r.top / Math.max(1, r.height - vh))
      const x = p * dist.current
      track.current.style.transform = `translate3d(${(-x).toFixed(1)}px,0,0)`
      if (words.current) words.current.style.transform = `translate3d(${(-x * 0.32).toFixed(1)}px,-50%,0)`
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      spotlight(x)
    },
    [pinned],
  )

  const jumpTo = (i) => {
    const c = cards.current[i]
    if (!c) return
    const x = c.offsetLeft + c.offsetWidth / 2 - window.innerWidth / 2
    if (!pinned) {
      track.current.scrollTo({ left: x, behavior: 'smooth' })
      return
    }
    const o = outer.current
    const p = clamp01(x / Math.max(1, dist.current))
    const top = o.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + p * (o.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }

  return (
    <section id="spaces" className={`nx-walk ${pinned ? 'is-pinned' : ''}`} ref={outer} aria-label="Take a look around Nayasa">
      <div className="nx-walk__stage">
        <div className="nx-walk__words" ref={words} aria-hidden="true">
          Rooms · Lounge · Kitchen · Dining · Play · Rooftop ·
        </div>

        <div className="nx-walk__track" ref={track}>
          <div className="nx-walk__intro">
            <p className="nx-eyebrow nx-eyebrow--light">Take a look around</p>
            <h2 className="nx-h2 nx-h2--light nx-walk__title">
              Step inside <em>Nayasa.</em>
            </h2>
            <p className="nx-walk__hint">
              Seven spaces, photographed as they are at the property on ITPL Main Road.
            </p>
            <span className="nx-walk__arrow" aria-hidden="true">
              <Icon name="arrow" size={18} />
            </span>
          </div>

          {WALK.map((w, i) => (
            <figure
              key={w.src}
              ref={(el) => (cards.current[i] = el)}
              className={`nx-walk__card nx-walk__card--${w.shape}`}
            >
              <div className="nx-walk__img">
                <img src={img(w.src)} srcSet={`${img(w.src, 'sm')} 800w, ${img(w.src)} 1800w`} sizes="(min-width: 900px) 50vw, 80vw" alt={`${w.title} ${w.em}`} loading="lazy" />
              </div>
              <figcaption>
                <span className="nx-walk__num">0{i + 1}</span>
                <div>
                  <span className="nx-walk__tag">{w.tag}</span>
                  <h3>
                    {w.title} <em>{w.em}</em>
                  </h3>
                  <p>{w.text}</p>
                </div>
              </figcaption>
            </figure>
          ))}

          <div className="nx-walk__end">
            <div className="nx-walk__end-arch" aria-hidden="true">
              <img src="/images/nayasa-emblem.webp" alt="" />
            </div>
            <p className="nx-eyebrow nx-eyebrow--light">Like what you see?</p>
            <h3 className="nx-h2 nx-h2--light nx-walk__title">
              Better in <em>person.</em>
            </h3>
            <button type="button" className="btn btn--accent" onClick={() => onBook()}>
              Book a Visit <Icon name="arrow" size={17} />
            </button>
          </div>
        </div>

        <div className="nx-wrap nx-walk__index">
          <span className="nx-walk__count" aria-hidden="true">
            0{step + 1} <i>/ 0{WALK.length}</i>
          </span>
          <nav className="nx-walk__names" aria-label="Jump to a space">
            {WALK.map((w, i) => (
              <button key={w.src} type="button" className={i === step ? 'is-active' : ''} aria-current={i === step || undefined} onClick={() => jumpTo(i)}>
                {w.short}
              </button>
            ))}
          </nav>
        </div>
        {pinned && (
          <span className="nx-walk__rail" aria-hidden="true">
            <span ref={bar} />
          </span>
        )}
      </div>
    </section>
  )
}

/* ───────────── Rooms ───────────── */

const ROOM_PHOTOS = {
  private: ['private-room-bright', 'private-room-study'],
  sharing: ['sharing-room-wide', 'sharing-room-twin'],
}

const ROOM_TAGS = { private: 'Single occupancy', sharing: 'Two residents' }

const INCLUDED = AMENITIES.filter((a) => a.title !== 'Community Living')

function Rooms({ onBook }) {
  return (
    <section id="rooms" className="nx-rooms" aria-label="Our rooms">
      <div className="nx-wrap nx-rooms__inner">
        <div className="nx-rooms__head">
          <div>
            <p className="nx-eyebrow" data-reveal>Our Rooms</p>
            <h2 className="nx-h2 nx-rooms__title" data-reveal style={{ '--d': '80ms' }}>
              Rooms designed around <em>your lifestyle.</em>
            </h2>
          </div>
          <p className="nx-rooms__aside" data-reveal style={{ '--d': '140ms' }}>
            Some prefer the privacy of their own room, while others enjoy sharing a space. At Nayasa,
            you can choose what works for you.
          </p>
        </div>

        <div className="nx-rooms__panels">
          {ROOM_TYPES.map((room, i) => (
            <article key={room.key} className="nx-rp" data-reveal style={{ '--d': `${120 + i * 100}ms` }}>
              {ROOM_PHOTOS[room.key].map((src, j) => (
                <img key={src} className={j ? 'nx-rp__alt' : ''} src={img(src)} srcSet={`${img(src, 'sm')} 800w, ${img(src)} 1800w`} sizes="(min-width: 900px) 60vw, 100vw" alt={room.images[j]?.alt || room.title} loading="lazy" />
              ))}

              <div className="nx-rp__top">
                <span className="nx-rp__tag">
                  <i>0{i + 1}</i> {ROOM_TAGS[room.key]}
                </span>
                <span className="nx-rp__price">
                  <small>Starting at</small>
                  <strong>₹{room.from}</strong>
                  <small>{room.unit}</small>
                </span>
              </div>

              <div className="nx-rp__body">
                <h3>{room.title}</h3>
                <p className="nx-rp__lead">{room.lead}</p>
                <div className="nx-rp__more">
                  <div>
                    <p>{room.body}</p>
                    <div className="nx-rp__actions">
                      <button type="button" className="btn btn--accent" onClick={() => onBook(room.formValue)}>
                        {room.cta} <Icon name="arrow" size={16} />
                      </button>
                      <Link to={`/rooms#${room.key}`} className="nx-link nx-link--light">
                        Room details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="nx-rooms__included">
          <span className="nx-rooms__included-title">Included in every room</span>
          <ul>
            {INCLUDED.map((a) => (
              <li key={a.title}>
                <Icon name={a.icon} size={18} /> {a.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────── Pricing: a rate card with a budget slider ───────────── */

const TIERS = [...PRICING].sort((a, b) => priceOf(a) - priceOf(b))
const MIN = priceOf(TIERS[0])
const MAX = priceOf(TIERS[TIERS.length - 1])
const TARIFF = [
  { type: 'Double Sharing', unit: 'per bed', rows: TIERS.filter((t) => t.type === 'Double Sharing') },
  { type: 'Private Room', unit: 'per room', rows: TIERS.filter((t) => t.type === 'Private Room') },
]

function Pricing({ onBook }) {
  const [budget, setBudget] = useState(15000)
  const fits = TIERS.filter((t) => priceOf(t) <= budget).length

  return (
    <section id="pricing" className="nx-pricing" aria-label="Room pricing">
      <div className="nx-wrap nx-pricing__grid">
        <div className="nx-pricing__intro">
          <p className="nx-eyebrow" data-reveal>Room Pricing</p>
          <h2 className="nx-h2 nx-pricing__title" data-reveal style={{ '--d': '80ms' }}>
            Simple, <em>transparent</em> pricing.
          </h2>
          <p className="nx-pricing__lede" data-reveal style={{ '--d': '140ms' }}>
            Double sharing starts at ₹10,000 per bed and private rooms at ₹14,000 per room. Slide to
            see what fits your budget.
          </p>

          <div className="nx-budget" data-reveal style={{ '--d': '200ms' }}>
            <div className="nx-budget__row">
              <label htmlFor="nx-budget">My monthly budget</label>
              <output htmlFor="nx-budget">{rupees(budget)}</output>
            </div>
            <input
              id="nx-budget"
              type="range"
              min={MIN}
              max={MAX}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ '--v': `${((budget - MIN) / (MAX - MIN)) * 100}%` }}
              aria-valuetext={rupees(budget)}
            />
            <div className="nx-budget__ends" aria-hidden="true">
              <span>{rupees(MIN)}</span>
              <span>{rupees(MAX)}</span>
            </div>
            <p className="nx-budget__result" aria-live="polite">
              <strong>{fits}</strong> of {TIERS.length} room options fit your budget
            </p>
          </div>

          <ul className="nx-pricing__terms" data-reveal style={{ '--d': '260ms' }}>
            <li>Rent payable in advance</li>
            <li>Security deposit as per policy</li>
            <li>30-day notice period</li>
            <li>Food not included</li>
          </ul>
        </div>

        <div className="nx-tariff" data-reveal="img" style={{ '--d': '120ms' }}>
          <div className="nx-tariff__head">
            <img src="/images/nayasa-emblem.webp" alt="" width="34" height="26" />
            <span>
              <strong>Nayasa Tariff</strong>
              <small>Monthly rent · ITPL Main Road</small>
            </span>
          </div>

          {TARIFF.map((group) => (
            <div className="nx-tariff__group" key={group.type}>
              <p className="nx-tariff__type">
                {group.type} <span>{group.unit}</span>
              </p>
              <ul>
                {group.rows.map((t) => {
                  const fit = priceOf(t) <= budget
                  return (
                    <li key={t.series} className={fit ? 'is-fit' : ''}>
                      <button type="button" onClick={() => onBook(t.type)} aria-label={`Enquire about ${t.type}, series ${t.series}, ₹${t.price} ${group.unit}`}>
                        <span className="nx-tariff__series">Series {t.series}</span>
                        <span className="nx-tariff__dots" aria-hidden="true" />
                        <span className="nx-tariff__price">₹{t.price}</span>
                        <span className="nx-tariff__go" aria-hidden="true">
                          <Icon name="arrow" size={14} />
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          <p className="nx-tariff__foot">
            Tap a room to enquire · <Link to="/rooms#pricing">Full price list</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ───────────── Amenities bento ───────────── */

const BENTO = {
  'Community Living': { area: 'comm', src: 'rooftop-lounge' },
  'High-Speed Wi-Fi': { area: 'wifi', src: 'private-room-study' },
  'Safe & Secure Living': { area: 'safe', src: 'building-facade' },
  'Housekeeping Services': { area: 'house' },
  '24/7 Support': { area: 'sup' },
}

function Amenities() {
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <section id="amenities" className="nx-section nx-dark nx-amen" aria-label="Amenities">
      <div className="nx-wrap">
        <div className="nx-head">
          <div>
            <p className="nx-eyebrow nx-eyebrow--light" data-reveal>Amenities</p>
            <h2 className="nx-h2 nx-h2--light" data-reveal style={{ '--d': '80ms' }}>
              The essentials, <em>taken care of.</em>
            </h2>
          </div>
          <p className="nx-head__aside nx-head__aside--light" data-reveal style={{ '--d': '140ms' }}>
            Your living space should make everyday life easier. At Nayasa, essential services and
            property support are part of the co-living experience.
          </p>
        </div>

        <div className="nx-bento">
          {AMENITIES.map((a, i) => {
            const b = BENTO[a.title] || {}
            return (
              <article
                key={a.title}
                className={`nx-tile nx-tile--${b.area} ${b.src ? 'has-img' : ''}`}
                onPointerMove={spot}
                data-reveal
                style={{ '--d': `${i * 90}ms` }}
              >
                {b.src && <img src={img(b.src, b.area === 'comm' ? undefined : 'sm')} alt="" loading="lazy" />}
                <span className="nx-tile__icon">
                  <Icon name={a.icon} size={24} stroke={1.5} />
                </span>
                <div className="nx-tile__text">
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
                {b.area === 'sup' && (
                  <a className="nx-tile__call" href={CONTACT.phoneHref}>
                    <Icon name="phone" size={16} /> {CONTACT.phone}
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Gallery ───────────── */

const GALLERY_CATEGORIES = ['All', 'Rooms', 'Common Areas', 'Facilities', 'Building']

function Gallery() {
  const [cat, setCat] = useState('All')
  const images = useMemo(
    () => (cat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === cat)).map((g) => ({ src: img(g.src), alt: g.alt })),
    [cat],
  )

  return (
    <section id="gallery" className="nx-section nx-dark nx-gallery" aria-label="Gallery">
      <div className="nx-wrap">
        <div className="nx-gallery__head">
          <p className="nx-eyebrow nx-eyebrow--light" data-reveal>Gallery</p>
          <h2 className="nx-h2 nx-h2--light nx-h2--xl" data-reveal style={{ '--d': '80ms' }}>
            Real photos. <em>No renders.</em>
          </h2>
          <div className="nx-chips" role="group" aria-label="Filter photos" data-reveal style={{ '--d': '140ms' }}>
            {GALLERY_CATEGORIES.map((c) => (
              <button key={c} type="button" className={cat === c ? 'is-active' : ''} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="nx-gallery__stage" data-reveal style={{ '--d': '160ms' }}>
        <TiltedGridHero key={cat} images={images} speed={3.4} tileHeight={42} aspectRatio={4 / 3} gap={5} axis={50} curve={70} fade={12} className="h-full w-full" />
      </div>

      <div className="nx-wrap nx-gallery__foot">
        <span>{GALLERY.length} photos of the property on ITPL Main Road</span>
        <Link to="/gallery" className="nx-link nx-link--light">
          Open the full gallery <Icon name="arrow" size={15} />
        </Link>
      </div>
    </section>
  )
}

/* ───────────── Location ───────────── */

function Location() {
  return (
    <section id="location" className="nx-section nx-loc" aria-label="Location">
      <div className="nx-wrap nx-loc__grid">
        <div className="nx-loc__text">
          <p className="nx-eyebrow" data-reveal>Our Location</p>
          <h2 className="nx-h2 nx-h2--xl" data-reveal style={{ '--d': '80ms' }}>
            Find us in <em>Whitefield,</em> Bengaluru.
          </h2>
          <p className="nx-loc__lede" data-reveal style={{ '--d': '140ms' }}>
            Located on ITPL Main Road, Nayasa Premium Co-Living places you in Whitefield, one of
            Bengaluru's established residential and commercial neighbourhoods.
          </p>
          <address className="nx-loc__address" data-reveal style={{ '--d': '200ms' }}>
            <span className="nx-loc__pin">
              <Icon name="pin" size={22} />
            </span>
            <span>
              <strong>Nayasa Premium Co-Living</strong>
              ITPL Main Road, Whitefield
              <br />
              Bengaluru – 560066, Karnataka
            </span>
          </address>
          <div className="nx-loc__actions" data-reveal style={{ '--d': '240ms' }}>
            <a href={CONTACT.directions} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
              Get Directions <Icon name="arrow" size={17} />
            </a>
            <a href={CONTACT.phoneHref} className="nx-link">
              <Icon name="phone" size={15} /> {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="nx-loc__visual" data-reveal style={{ '--d': '120ms' }}>
          <div className="nx-loc__map">
            <iframe title="Map showing Nayasa Premium Co-Living on ITPL Main Road, Whitefield" src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <figure className="nx-loc__photo">
            <img src={img('building-exterior', 'sm')} alt="Nayasa building facade with glass balconies" loading="lazy" />
            <figcaption>ITPL Main Road</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ───────────── Good to know + FAQ ───────────── */

const RULE_ICONS = {
  'Rent Payment': 'wallet',
  'Security Deposit': 'shield',
  'Notice Period': 'calendar',
  Food: 'utensils',
  'Property Damage': 'wrench',
  'Terms & Conditions': 'doc',
}

function Terms() {
  return (
    <section id="rental-info" className="nx-terms" aria-label="Good to know">
      <div className="nx-wrap nx-terms__grid">
        <div className="nx-terms__intro">
          <p className="nx-eyebrow" data-reveal>Good to Know</p>
          <h2 className="nx-h2 nx-terms__title" data-reveal style={{ '--d': '80ms' }}>
            Clear terms, <em>upfront.</em>
          </h2>
          <p className="nx-terms__lede" data-reveal style={{ '--d': '140ms' }}>
            Everything worth knowing before you move in, in one place.
          </p>
          <div className="nx-terms__links" data-reveal style={{ '--d': '200ms' }}>
            <Link to="/good-to-know" className="nx-link">
              Rental guidelines <Icon name="arrow" size={15} />
            </Link>
            <a href={CONTACT.phoneHref} className="nx-link">
              <Icon name="phone" size={14} /> {CONTACT.phone}
            </a>
          </div>
          <figure className="nx-terms__photo" data-reveal="img" style={{ '--d': '160ms' }}>
            <img src={img('reception-seating', 'sm')} alt="Seating corner at Nayasa with chairs, plants and wall art" loading="lazy" />
          </figure>
        </div>

        <article className="nx-lease" data-reveal style={{ '--d': '120ms' }}>
          <header className="nx-lease__head">
            <div>
              <p className="nx-lease__kicker">Nayasa Premium Co-Living</p>
              <h3>House terms</h3>
            </div>
            <span className="nx-lease__seal" aria-hidden="true">
              <img src="/images/nayasa-emblem.webp" alt="" />
            </span>
          </header>

          <ol className="nx-lease__list">
            {RULES.map((r, i) => (
              <li key={r.title}>
                <span className="nx-lease__icon">
                  <Icon name={RULE_ICONS[r.title] || 'check'} size={18} stroke={1.6} />
                </span>
                <div>
                  <h4>
                    <i>0{i + 1}</i> {r.title}
                  </h4>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <footer className="nx-lease__foot">
            <span className="nx-lease__sign">Nayasa management</span>
            <span className="nx-lease__by">A LIFE BY SQFT property · ITPL Main Road, Whitefield</span>
          </footer>
        </article>
      </div>
    </section>
  )
}

// A real photo to sit beside each answer, in FAQ order.
const FAQ_PHOTOS = [
  'building-exterior',
  'private-room-bright',
  'sharing-room-wide',
  'rooftop-lounge',
  'dining-hall',
  'lobby-entrance',
  'private-room-door',
  'lobby-lounge',
]

function Faq({ onBook }) {
  const [active, setActive] = useState(0)
  const q = FAQS[active]

  // Arrow keys move between questions, as in any tab list.
  const onKey = (e) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (active + step + FAQS.length) % FAQS.length
    setActive(next)
    document.getElementById(`nx-q-${next}`)?.focus()
  }

  return (
    <section id="faq" className="nx-faq" aria-label="Frequently asked questions">
      <div className="nx-wrap nx-faq__grid">
        <div className="nx-faq__side">
          <p className="nx-eyebrow" data-reveal>FAQ</p>
          <h2 className="nx-h2 nx-faq__title" data-reveal style={{ '--d': '80ms' }}>
            Questions, <em>answered.</em>
          </h2>

          <div className="nx-faq__qs" role="tablist" aria-label="Questions" aria-orientation="vertical" onKeyDown={onKey} data-reveal style={{ '--d': '140ms' }}>
            {FAQS.map((f, i) => (
              <button
                key={f.q}
                id={`nx-q-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="nx-faq-answer"
                tabIndex={i === active ? 0 : -1}
                className={i === active ? 'is-active' : ''}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <i>0{i + 1}</i>
                <span>{f.q}</span>
                <Icon name="arrow" size={15} />
              </button>
            ))}
          </div>
        </div>

        <div className="nx-answer" id="nx-faq-answer" role="tabpanel" aria-labelledby={`nx-q-${active}`} data-reveal style={{ '--d': '120ms' }}>
          <div className="nx-answer__photo">
            {FAQ_PHOTOS.map((src, i) => (
              <img key={src} className={i === active ? 'is-active' : ''} src={img(src, 'sm')} alt="" loading="lazy" />
            ))}
            <span className="nx-answer__count">
              0{active + 1} <i>/ 0{FAQS.length}</i>
            </span>
          </div>
          <div className="nx-answer__body" key={active}>
            <p className="nx-answer__q">{q.q}</p>
            <p className="nx-answer__a">{q.a}</p>
          </div>
          <div className="nx-answer__foot">
            <span>Still have a question?</span>
            <div>
              <a href={CONTACT.phoneHref} className="nx-answer__call">
                <Icon name="phone" size={14} /> {CONTACT.phone}
              </a>
              <button type="button" className="btn btn--accent" onClick={() => onBook()}>
                Book a Visit <Icon name="arrow" size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── Book a visit ───────────── */

const today = () => new Date().toISOString().slice(0, 10)
const EMPTY = { name: '', phone: '', type: 'Private Room', date: '', message: '' }

function validate(v) {
  const e = {}
  if (!v.name || v.name.trim().length < 2) e.name = 'Please enter your full name'
  if (!v.phone || !/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(v.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number'
  if (!v.date) e.date = 'Pick a date for your visit'
  return e
}

function Visit({ form, setForm }) {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      if (ENQUIRY_ENDPOINT) {
        const res = await fetch(ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Submission failed')
      }
      window.dataLayer?.push({ event: 'enquiry_submitted', accommodation: form.type, visit_date: form.date })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const visitDate = form.date
    ? new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  return (
    <section id="book-a-visit" className="nx-visit" aria-label="Book a visit">
      <div className="nx-visit__bg" aria-hidden="true">
        <img src={img('rooftop-evening')} alt="" loading="lazy" data-parallax="0.12" />
      </div>
      <div className="nx-wrap nx-visit__grid">
        <div className="nx-visit__copy">
          <p className="nx-eyebrow nx-eyebrow--light" data-reveal>Schedule a Visit</p>
          <h2 className="nx-h2 nx-h2--light nx-h2--xl" data-reveal style={{ '--d': '80ms' }}>
            Come see <em>Nayasa</em> for yourself.
          </h2>
          <p data-reveal style={{ '--d': '140ms' }}>
            Get in touch with our team to enquire about available rooms, pricing and property visits.
          </p>
          <a href={CONTACT.phoneHref} className="nx-visit__call" data-reveal style={{ '--d': '200ms' }}>
            <span className="nx-visit__call-icon">
              <Icon name="phone" size={20} />
            </span>
            <span>
              <small>Call the Nayasa team</small>
              <strong>{CONTACT.phone}</strong>
            </span>
          </a>
        </div>

        <div className="nx-form" data-reveal style={{ '--d': '160ms' }}>
          {status === 'done' ? (
            <div className="nx-form__done">
              <span className="nx-form__tick">
                <Icon name="check" size={30} stroke={2} />
              </span>
              <h3>Thank you, {form.name.trim().split(' ')[0]}.</h3>
              {ENQUIRY_ENDPOINT ? (
                <p>
                  Your visit request for <strong>{visitDate}</strong> has been sent. The Nayasa team will get in touch on {form.phone}.
                </p>
              ) : (
                <p>
                  To confirm your visit on <strong>{visitDate}</strong>, please call the Nayasa team on{' '}
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                </p>
              )}
              <button
                type="button"
                className="btn btn--dark"
                onClick={() => {
                  setForm(EMPTY)
                  setStatus('idle')
                }}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="nx-form__title">Book your visit</h3>

              <div className="nx-form__types" role="radiogroup" aria-label="Accommodation type">
                {ROOM_TYPES.map((r) => (
                  <label key={r.key} className={form.type === r.formValue ? 'is-active' : ''}>
                    <input type="radio" name="nx-type" value={r.formValue} checked={form.type === r.formValue} onChange={set('type')} />
                    <span>{r.label}</span>
                    <small>From ₹{r.from} {r.unit}</small>
                  </label>
                ))}
              </div>

              <div className="nx-form__row">
                <div className={`nx-field ${errors.name ? 'has-error' : ''}`}>
                  <input id="nx-name" type="text" autoComplete="name" placeholder=" " value={form.name} onChange={set('name')} aria-invalid={!!errors.name} />
                  <label htmlFor="nx-name">Full name</label>
                  {errors.name && <span className="nx-field__err">{errors.name}</span>}
                </div>
                <div className={`nx-field ${errors.phone ? 'has-error' : ''}`}>
                  <input id="nx-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder=" " value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} />
                  <label htmlFor="nx-phone">Mobile number</label>
                  {errors.phone && <span className="nx-field__err">{errors.phone}</span>}
                </div>
              </div>

              <div className={`nx-field nx-field--date ${errors.date ? 'has-error' : ''}`}>
                <input id="nx-date" type="date" min={today()} value={form.date} onChange={set('date')} aria-invalid={!!errors.date} />
                <label htmlFor="nx-date">Preferred visit date</label>
                {errors.date && <span className="nx-field__err">{errors.date}</span>}
              </div>

              <div className="nx-field">
                <textarea id="nx-msg" rows={2} placeholder=" " value={form.message} onChange={set('message')} />
                <label htmlFor="nx-msg">Anything we should know? (optional)</label>
              </div>

              <button type="submit" className="btn btn--accent nx-form__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : (
                  <>
                    Request a Visit <Icon name="arrow" size={17} />
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className="nx-form__error">
                  Something went wrong. Please call us on <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Page ───────────── */

export default function Home() {
  usePageTitle()
  const [form, setForm] = useState(EMPTY)

  const book = (type) => {
    if (typeof type === 'string') setForm((f) => ({ ...f, type }))
    document.getElementById('book-a-visit')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="nx">
      <Hero />
      <Ticker />

      <About />

      <Walk onBook={book} />
      <Rooms onBook={book} />
      <Pricing onBook={book} />
      <Amenities />
      <Gallery />
      <Location />
      <Terms />
      <Faq onBook={book} />
      <Visit form={form} setForm={setForm} />
    </div>
  )
}
