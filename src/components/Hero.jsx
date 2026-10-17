import { useEffect, useRef, useState } from 'react'
import { CONTACT, img } from '../data'
import Icon from './Icon'

/*
  The opening screen is a living mosaic of the property: the headline, a large photo, two
  room photos, the starting price and a visit card, all visible at once. Each photo tile
  plays through a few real photos of its space; a new photo arrives like the rooftop's
  bamboo blinds opening slat by slat, and the tiles take turns so something is always
  gently changing. The photos drift slightly with the pointer for depth.
*/

const TILES = {
  main: {
    every: 6000,
    offset: 0,
    shots: [
      { src: 'rooftop-lounge', label: 'Rooftop lounge', alt: 'Covered rooftop lounge with hanging swing chairs and warm pendant lights at dusk' },
      { src: 'lobby-lounge', label: 'Resident lounge', alt: 'Lounge with a grey sofa, patterned armchair and the Nayasa logo wall' },
      { src: 'dining-hall-long', label: 'Dining hall', alt: 'Long dining hall with wooden tables and benches' },
      { src: 'rooftop-seating', label: 'Rooftop seating', alt: 'Terracotta lounge chairs around low tables on turf flooring' },
    ],
  },
  private: {
    every: 6000,
    offset: 2000,
    title: 'Private rooms',
    note: 'From ₹14,000 / room',
    shots: [
      { src: 'private-room-bright', alt: 'Private room with a single bed, striped rug and a desk by the window' },
      { src: 'private-room-study', alt: 'Private room with a desk, yellow chair and a large window' },
      { src: 'private-room-window', alt: 'Private room with a window, curtains and a yellow desk chair' },
    ],
  },
  sharing: {
    every: 6000,
    offset: 4000,
    title: 'Double sharing',
    note: 'From ₹10,000 / bed',
    shots: [
      { src: 'sharing-room-wide', alt: 'Double-sharing room with two beds, a desk and a wooden wardrobe' },
      { src: 'sharing-room-twin', alt: 'Twin beds placed either side of a shared desk' },
      { src: 'sharing-room-rug', alt: 'Double-sharing room with two beds, a desk and a striped rug' },
    ],
  },
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Plays through a tile's photos, starting after its offset so the tiles take turns.
function usePlaylist({ shots, every, offset }) {
  const [state, setState] = useState({ cur: 0, prev: -1 })
  useEffect(() => {
    if (reduced()) return
    let interval
    const next = () => setState(({ cur }) => ({ prev: cur, cur: (cur + 1) % shots.length }))
    const start = setTimeout(() => {
      next()
      interval = setInterval(next, every)
    }, every + offset)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [shots, every, offset])
  return state
}

function Blinds({ tile, sizes, eager }) {
  const { cur, prev } = usePlaylist(tile)
  const label = tile.shots[cur].label
  return (
    <div className="hb__photos">
      {tile.shots.map((s, i) => (
        <img
          key={s.src}
          className={i === cur ? 'is-cur' : i === prev ? 'is-prev' : ''}
          src={img(s.src)}
          srcSet={`${img(s.src, 'sm')} 800w, ${img(s.src)} 1800w`}
          sizes={sizes}
          alt={i === cur ? s.alt : ''}
          loading={eager && i === 0 ? 'eager' : 'lazy'}
          fetchPriority={eager && i === 0 ? 'high' : undefined}
        />
      ))}
      {label && (
        <span className="hb__label" key={cur}>
          <i>0{cur + 1}</i> {label}
        </span>
      )}
    </div>
  )
}

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || reduced()) return
    let raf = 0
    let x = 0
    let y = 0
    const apply = () => {
      raf = 0
      el.style.setProperty('--mx', x.toFixed(3))
      el.style.setProperty('--my', y.toFixed(3))
    }
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      x = (e.clientX / window.innerWidth) * 2 - 1
      y = (e.clientY / window.innerHeight) * 2 - 1
      if (!raf) raf = requestAnimationFrame(apply)
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
    }
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState(null, '', `#${id}`)
  }

  return (
    <section className="hb" ref={root} aria-label="Welcome to Nayasa Premium Co-Living">
      <div className="hb__grid">
        <div className="hb__intro">
          <p className="hb__chip hb-in" style={{ '--i': 0 }}>
            <span className="hb__dot" aria-hidden="true" />
            ITPL Main Road · Whitefield, Bengaluru
          </p>
          <h1 className="hb__title">
            <span className="hb__line">
              <span style={{ '--i': 1 }}>Live Comfort.</span>
            </span>
            <span className="hb__line">
              <span style={{ '--i': 2 }}>
                Live <em>Nayasa.</em>
              </span>
            </span>
          </h1>
          <p className="hb__lead hb-in" style={{ '--i': 3 }}>
            Premium private and double-sharing rooms, professionally managed by LIFE BY SQFT, with
            the essentials taken care of so you can focus on living your life.
          </p>
          <div className="hb__links hb-in" style={{ '--i': 4 }}>
            <a href="#rooms" onClick={scrollTo('rooms')} className="btn btn--dark">
              Explore Rooms <Icon name="arrow" size={17} />
            </a>
            <a href="#spaces" onClick={scrollTo('spaces')} className="nx-link">
              Take a look around
            </a>
          </div>
        </div>

        <figure className="hb__tile hb__tile--main" style={{ '--t': 0 }}>
          <Blinds tile={TILES.main} sizes="(min-width: 900px) 50vw, 100vw" eager />
          <div className="hb__stamp" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="hb-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#hb-circle">REAL PHOTOS · ACTUAL PROPERTY · NAYASA ·</textPath>
              </text>
            </svg>
            <img src="/images/nayasa-emblem.webp" alt="" />
          </div>
        </figure>

        <a href="#pricing" onClick={scrollTo('pricing')} className="hb__tile hb__price" style={{ '--t': 1 }}>
          <span className="hb__kicker">Rooms from</span>
          <strong>₹10,000</strong>
          <span className="hb__price-unit">per bed, double sharing</span>
          <span className="hb__price-foot">
            <span>
              Private rooms from <b>₹14,000</b>
            </span>
            <span className="hb__round" aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>
          </span>
        </a>

        {['private', 'sharing'].map((key, i) => (
          <a key={key} href="#rooms" onClick={scrollTo('rooms')} className="hb__tile hb__tile--room" style={{ '--t': 2 + i }}>
            <Blinds tile={TILES[key]} sizes="(min-width: 900px) 25vw, 50vw" />
            <span className="hb__room">
              <strong>{TILES[key].title}</strong>
              <small>{TILES[key].note}</small>
            </span>
          </a>
        ))}

        <div className="hb__tile hb__visit" style={{ '--t': 4 }}>
          <p className="hb__kicker">Schedule a visit</p>
          <p className="hb__visit-title">
            Come see it <em>in person.</em>
          </p>
          <div className="hb__visit-actions">
            <a href="#book-a-visit" onClick={scrollTo('book-a-visit')} className="btn btn--accent">
              Book a Visit <Icon name="arrow" size={16} />
            </a>
            <a href={CONTACT.phoneHref} className="hb__phone">
              <Icon name="phone" size={14} /> {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
