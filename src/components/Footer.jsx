import { Link, useLocation } from 'react-router-dom'
import { CONTACT } from '../data'
import Icon from './Icon'

const ON_PAGE_LINKS = [
  ['#about', 'About Nayasa'],
  ['#rooms', 'Accommodation & Rates'],
  ['#amenities', 'Amenities'],
  ['#gallery', 'Property Gallery'],
  ['#location', 'Location'],
  ['#faq', 'FAQs'],
  ['#book-a-visit', 'Schedule a Visit'],
]

const SUBPAGE_LINKS = [
  ['/about', 'About Overview'],
  ['/rooms', 'Room Specifications'],
  ['/amenities', 'Amenities Guide'],
  ['/gallery', '35-Photo Catalog'],
  ['/location', 'Whitefield Map'],
  ['/good-to-know', 'Rental Policies'],
  ['/faq', 'Full FAQ Library'],
  ['/contact', 'Contact Property'],
]

export default function Footer() {
  const location = useLocation()

  const handleLinkClick = (e, hash) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', hash)
      }
    }
  }

  return (
    <footer className="footer footer--luxury" aria-label="Site Footer">
      <div className="wrap">
        <div className="footer-luxury-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand__logo-link" aria-label="NAYASA Home">
              <img
                src="/images/nayasa-horizontal-light.webp"
                alt="NAYASA Premium Co-Living"
                className="footer-brand__logo"
                width="160"
                height="42"
              />
            </Link>
            <p className="footer-brand__tagline">Live Comfort. Live Nayasa.</p>
            <p className="footer-brand__desc">
              Thoughtfully managed private and double-sharing co-living accommodation on ITPL Main Road,
              Whitefield, Bengaluru.
            </p>
            <p className="footer-brand__parent">
              A <strong>LIFE BY SQFT</strong> Managed Property
            </p>
          </div>

          {/* Column 1: On-page Sections */}
          <nav className="footer-col" aria-label="Homepage Sections">
            <h3 className="footer-col__title">Explore Nayasa</h3>
            <ul className="footer-col__links">
              {ON_PAGE_LINKS.map(([hash, label]) => (
                <li key={hash}>
                  <a
                    href={`/${hash}`}
                    onClick={(e) => handleLinkClick(e, hash)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2: Dedicated Pages */}
          <nav className="footer-col" aria-label="Detailed Pages">
            <h3 className="footer-col__title">Resident Information</h3>
            <ul className="footer-col__links">
              {SUBPAGE_LINKS.map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact & Location */}
          <div className="footer-col footer-contact">
            <h3 className="footer-col__title">Property Contact</h3>
            <address className="footer-contact__address">
              Nayasa Premium Co-Living<br />
              ITPL Main Road, Whitefield<br />
              Bengaluru – 560066, Karnataka
            </address>

            <a href={CONTACT.phoneHref} className="footer-contact__phone-link" aria-label={`Call ${CONTACT.phone}`}>
              <Icon name="phone" size={16} /> {CONTACT.phone}
            </a>

            <div>
              <a
                href={CONTACT.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact__dir-link"
              >
                <span>Get Google Maps Directions</span>
                <Icon name="arrow" size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 Nayasa Premium Co-Living. All Rights Reserved. Managed by LIFE BY SQFT.</p>
          <button
            type="button"
            className="footer-top-btn"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Back to Top</span>
            <Icon name="up" size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
