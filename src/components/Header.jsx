import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CONTACT } from '../data'
import Icon from './Icon'

const LINKS = [
  { id: 'about', label: 'About', path: '/about' },
  { id: 'rooms', label: 'Rooms', path: '/rooms' },
  { id: 'pricing', label: 'Pricing', path: '/rooms#pricing' },
  { id: 'amenities', label: 'Amenities', path: '/amenities' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'location', label: 'Location', path: '/location' },
  { id: 'faq', label: 'FAQ', path: '/faq' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const progress = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Solid background after subtle scroll, hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 36)
      setHidden(y > 280 && y > last + 3)
      if (y < last - 3 || y < 280) setHidden(false)
      last = y
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const handleNavClick = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', `#${id}`)
      }
      setOpen(false)
    } else {
      setOpen(false)
      navigate(`/#${id}`)
    }
  }

  const handleBookClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const target = document.getElementById('book-a-visit')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', '#book-a-visit')
      }
      setOpen(false)
    } else {
      setOpen(false)
      navigate('/#book-a-visit')
    }
  }

  return (
    <header
      className={[
        'header',
        scrolled && 'is-solid',
        hidden && !open && 'is-hidden',
        open && 'is-open',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="header__progress" ref={progress} aria-hidden="true" />
      <div className="header__inner wrap">
        <Link to="/" className="brand" aria-label="NAYASA Premium Co-Living, home">
          <img
            src="/images/nayasa-horizontal.webp"
            alt="NAYASA - By Life by SQFT - Premium PG"
            className="brand__logo-img"
            width="178"
            height="48"
          />
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="nav__link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={CONTACT.phoneHref} aria-label={`Call Nayasa at ${CONTACT.phone}`}>
            <Icon name="phone" size={15} stroke={1.8} />
            <span>{CONTACT.phone}</span>
          </a>
          <a
            href="/#book-a-visit"
            onClick={handleBookClick}
            className="btn btn--sm btn--accent header__cta"
          >
            Book a Visit
          </a>
          <button
            className="header__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-drawer__backdrop" onClick={() => setOpen(false)} />
        <div className="mobile-drawer__panel">
          <div className="mobile-drawer__head">
            <div className="brand brand--drawer">
              <img
                src="/images/nayasa-logo.webp"
                alt="NAYASA - By Life by SQFT"
                className="mobile-drawer__logo-img"
                width="140"
                height="124"
              />
            </div>
            <button
              className="mobile-drawer__close"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <nav className="mobile-drawer__nav" aria-label="Mobile Navigation">
            <a
              href="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                setOpen(false)
              }}
              className="mobile-drawer__link"
            >
              <span>Overview</span>
              <small>01</small>
            </a>
            {LINKS.map((link, idx) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="mobile-drawer__link"
              >
                <span>{link.label}</span>
                <small>0{idx + 2}</small>
              </a>
            ))}
            <a
              href="/#rental-info"
              onClick={(e) => handleNavClick(e, 'rental-info')}
              className="mobile-drawer__link"
            >
              <span>Rental Guidelines</span>
              <small>09</small>
            </a>
          </nav>

          <div className="mobile-drawer__footer">
            <a
              href="/#book-a-visit"
              onClick={handleBookClick}
              className="btn btn--accent btn--block"
            >
              Book a Visit <Icon name="arrow" size={16} />
            </a>
            <a
              href={CONTACT.phoneHref}
              className="btn btn--outline btn--block mobile-drawer__call"
            >
              <Icon name="phone" size={16} /> {CONTACT.phone}
            </a>
            <div className="mobile-drawer__meta">
              <p>ITPL Main Road, Whitefield, Bengaluru – 560066</p>
              <p className="mobile-drawer__parent">A <strong>LIFE BY SQFT</strong> Property</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
