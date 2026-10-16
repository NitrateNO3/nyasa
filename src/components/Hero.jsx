import { useEffect, useState } from 'react'
import { img } from '../data'
import Icon from './Icon'

const HERO_VIEWS = [
  {
    id: 'rooftop',
    label: 'Rooftop Lounge',
    shortLabel: 'Rooftop',
    tag: 'Twilight Terrace',
    src: 'rooftop-lounge',
    alt: 'Covered rooftop recreational lounge at Nayasa with swing chairs and evening lighting',
  },
  {
    id: 'private',
    label: 'Private Room',
    shortLabel: 'Private',
    tag: 'Single Suite',
    src: 'private-room-bright',
    alt: 'Bright private room at Nayasa with single bed, work desk and window light',
  },
  {
    id: 'lounge',
    label: 'Resident Lounge',
    shortLabel: 'Lounge',
    tag: 'Ground Floor',
    src: 'lobby-lounge',
    alt: 'Common lounge at Nayasa with sofa, armchair and reception area',
  },
  {
    id: 'exterior',
    label: 'Building Exterior',
    shortLabel: 'Exterior',
    tag: 'ITPL Main Road',
    src: 'building-exterior',
    alt: 'Contemporary Nayasa building facade on ITPL Main Road, Whitefield',
  },
]

const SLIDE_INTERVAL = 6000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_VIEWS.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [isPaused, active])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <section className="hero" aria-label="Welcome to Nayasa Premium Co-Living">
      <div className="wrap hero__grid">
        {/* Left Column: Editorial Content */}
        <div className="hero__content">
          <p className="hero__meta" data-reveal style={{ '--d': '60ms' }}>
            Whitefield, Bengaluru · ITPL Main Road
          </p>

          <h1 className="hero__headline" data-reveal style={{ '--d': '120ms' }}>
            Live Comfort.
            <br />
            Live Nayasa.
          </h1>

          <p className="hero__lead" data-reveal style={{ '--d': '180ms' }}>
            Thoughtfully managed private and double-sharing accommodation designed for working
            professionals on ITPL Main Road. All-inclusive living with high-speed Wi-Fi, daily
            housekeeping, and 24/7 power backup.
          </p>

          <div className="hero__rate-line" data-reveal style={{ '--d': '220ms' }}>
            <span>From <strong>₹10,000/bed</strong> in Double Sharing</span>
            <span className="hero__rate-sep">/</span>
            <span>From <strong>₹14,000/room</strong> in Private</span>
          </div>

          <div className="hero__actions" data-reveal style={{ '--d': '260ms' }}>
            <a href="#rooms" onClick={scrollTo('rooms')} className="btn btn--dark">
              Explore Rooms <Icon name="arrow" size={16} />
            </a>
            <a href="#visit" onClick={scrollTo('visit')} className="btn btn--accent">
              Book a Visit
            </a>
          </div>

          <p className="hero__subtext" data-reveal style={{ '--d': '300ms' }}>
            A LIFE BY SQFT Brand · Professional On-Site Management
          </p>
        </div>

        {/* Right Column: Architectural Visual (Side Photo Slideshow) */}
        <div
          className="hero__visual"
          data-reveal
          style={{ '--d': '160ms' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="hero__frame">
            {/* Top Bar: Verification Badge & Slide Navigation */}
            <div className="hero__frame-top">
              <div className="hero__status-pill">
                <span className="hero__status-dot" aria-hidden="true" />
                <span>Actual Property · ITPL Main Rd</span>
              </div>

              <div className="hero__nav">
                <span className="hero__counter">
                  0{active + 1}<i>/</i>0{HERO_VIEWS.length}
                </span>
                <div className="hero__nav-arrows">
                  <button
                    type="button"
                    className="hero__arrow"
                    onClick={() => setActive((prev) => (prev - 1 + HERO_VIEWS.length) % HERO_VIEWS.length)}
                    aria-label="Previous property photo"
                  >
                    <Icon name="left" size={13} stroke={2} />
                  </button>
                  <button
                    type="button"
                    className="hero__arrow"
                    onClick={() => setActive((prev) => (prev + 1) % HERO_VIEWS.length)}
                    aria-label="Next property photo"
                  >
                    <Icon name="right" size={13} stroke={2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Photos */}
            {HERO_VIEWS.map((view, i) => (
              <figure
                key={view.id}
                className={`hero__photo ${i === active ? 'is-active' : ''}`}
                aria-hidden={i !== active}
              >
                <img
                  src={img(view.src)}
                  srcSet={`${img(view.src, 'sm')} 800w, ${img(view.src)} 1800w`}
                  sizes="(max-width: 900px) 95vw, 50vw"
                  alt={view.alt}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </figure>
            ))}

            {/* Bottom Bar: Caption and Segment Switcher */}
            <div className="hero__frame-bottom">
              <div className="hero__caption">
                <span className="hero__caption-tag">{HERO_VIEWS[active].tag}</span>
                <h2 className="hero__caption-title">{HERO_VIEWS[active].label}</h2>
              </div>

              {/* Clean Segment Switcher */}
              <div className="hero__switcher" role="tablist" aria-label="Property photo selection">
                {HERO_VIEWS.map((view, i) => (
                  <button
                    key={view.id}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`View ${view.label}`}
                    className={`hero__switcher-tab ${i === active ? 'is-active' : ''}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="hero__switcher-name hero__switcher-name--full">{view.label}</span>
                    <span className="hero__switcher-name hero__switcher-name--short">{view.shortLabel || view.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
