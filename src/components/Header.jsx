import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CONTACT, NAV } from '../data'
import Icon from './Icon'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const progress = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  // Solid background after a little scroll, hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 40)
      setHidden(y > 320 && y > last + 2)
      if (y < last - 2 || y < 320) setHidden(false)
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
        <Link to="/" className="brand" aria-label="Nayasa Premium Co-Living, home">
          <span className="brand__name">Nayasa</span>
          <span className="brand__tag">Premium Co-Living</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}>
              {n.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="nav__contact">
            Contact
          </NavLink>
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={CONTACT.phoneHref}>
            <Icon name="phone" size={16} />
            {CONTACT.phone}
          </a>
          <Link className="btn btn--sm btn--accent" to="/contact">
            Book a Visit
          </Link>
          <button
            className="header__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
