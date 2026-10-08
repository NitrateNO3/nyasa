import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { img } from '../data'
import Icon from './Icon'

const SLIDES = [
  { src: 'rooftop-lounge', alt: 'Covered recreational space at Nayasa at dusk, with hanging swing chairs and warm pendant lights' },
  { src: 'lobby-lounge', alt: 'Lounge with a grey sofa, patterned armchair and the Nayasa logo wall' },
  { src: 'sharing-room', alt: 'Double-sharing room with two beds, wardrobe, desk and woven rug' },
  { src: 'private-room-window', alt: 'Private room with a window, curtains and a yellow desk chair' },
]

const MARQUEE = [
  'Private Rooms',
  'Double Sharing',
  'High-Speed Wi-Fi',
  'Housekeeping Services',
  '24/7 Support',
  'Safe & Secure Living',
  'Community Living',
  'ITPL Main Road, Whitefield',
]

const SLIDE_MS = 5500

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [active])

  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__text">
            <h1 className="eyebrow hero__eyebrow">Premium Co-Living in Whitefield, Bangalore</h1>

            <p className="hero__title" aria-label="Live Comfort. Live Nayasa.">
              <span className="line" aria-hidden="true">
                <span style={{ '--i': 0 }}>Live Comfort.</span>
              </span>
              <span className="line" aria-hidden="true">
                <span style={{ '--i': 1 }}>
                  <em>Live Nayasa.</em>
                </span>
              </span>
            </p>

            <p className="hero__copy hero__fade" style={{ '--i': 0 }}>
              Discover a comfortable, thoughtfully managed co-living experience in Whitefield,
              Bengaluru. Whether you're looking for your own private space or prefer sharing, Nayasa
              offers flexible living options designed to make everyday life easier.
            </p>

            <div className="hero__ctas hero__fade" style={{ '--i': 1 }}>
              <Link to="/rooms" className="btn btn--dark">
                Explore Rooms <Icon name="arrow" size={18} />
              </Link>
              <Link to="/contact" className="btn btn--outline">
                Book a Visit
              </Link>
            </div>

            <div className="hero__rates hero__fade" style={{ '--i': 2 }}>
              <p className="hero__rates-cap">Starting from</p>
              <dl>
                <dt>Double Sharing</dt>
                <dd>
                  ₹10,000<small> per bed</small>
                </dd>
              </dl>
              <dl>
                <dt>Private Room</dt>
                <dd>
                  ₹14,000<small> per room</small>
                </dd>
              </dl>
            </div>
          </div>

          <div className="hero__art">
            <div className="hero__arch">
              {SLIDES.map((s, i) => (
                <img
                  key={s.src}
                  src={img(s.src)}
                  srcSet={`${img(s.src, 'sm')} 800w, ${img(s.src)} 1800w`}
                  sizes="(max-width: 900px) 90vw, 45vw"
                  alt={s.alt}
                  className={i === active ? 'is-active' : ''}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  aria-hidden={i !== active}
                />
              ))}

              <div className="hero__slides" role="tablist" aria-label="Property photos">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Photo ${i + 1} of ${SLIDES.length}`}
                    className={i === active ? 'is-active' : ''}
                    onClick={() => setActive(i)}
                    style={{ '--ms': `${SLIDE_MS}ms` }}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>

            <div className="hero__stamp" aria-hidden="true">
              <svg className="hero__stamp-ring" viewBox="0 0 120 120">
                <defs>
                  <path id="hero-circ" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
                </defs>
                <text>
                  <textPath href="#hero-circ">WHITEFIELD · BENGALURU · NAYASA ·</textPath>
                </text>
              </svg>
              <Icon name="arrowDown" size={26} stroke={1.4} />
            </div>

            <figure className="hero__thumb" aria-hidden="true">
              <img src={img('private-room-desk', 'sm')} alt="" />
            </figure>

            <div className="hero__chip" aria-hidden="true">
              <span className="hero__chip-icon">
                <Icon name="clock" size={18} />
              </span>
              <span>
                <strong>24/7</strong> Support
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <div className="marquee__group" key={k}>
              {MARQUEE.map((m) => (
                <span key={m}>
                  {m}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
