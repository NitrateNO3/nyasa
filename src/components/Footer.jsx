import { Link } from 'react-router-dom'
import { CONTACT } from '../data'
import Icon from './Icon'

// Footer content follows the PRD's footer section word for word.
const QUICK_LINKS = [
  ['/', 'Home'],
  ['/about', 'About Nayasa'],
  ['/rooms', 'Our Rooms'],
  ['/amenities', 'Amenities'],
  ['/gallery', 'Gallery'],
  ['/location', 'Location'],
  ['/contact', 'Contact'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wall" aria-hidden="true" />

      <div className="wrap">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Nayasa Premium Co-Living, home">
              <span>Nayasa</span>
              <small>Premium Co-Living</small>
            </Link>
            <p className="footer__tagline">
              Live Comfort. <em>Live Nayasa.</em>
            </p>
            <p className="footer__desc">
              Premium private and shared accommodation in Whitefield, Bengaluru.
            </p>
            <p className="footer__parent">
              A <strong>LIFE BY SQFT</strong> Brand
            </p>
          </div>

          <nav className="footer__col footer__links" aria-label="Quick Links">
            <h2 className="footer__h">Quick Links</h2>
            <ul>
              {QUICK_LINKS.map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__contact">
            <h2 className="footer__h">Address</h2>
            <address>ITPL Main Road, Whitefield, Bengaluru – 560066</address>
            <a href={CONTACT.directions} target="_blank" rel="noopener noreferrer" className="footer__dir">
              Get Directions <Icon name="arrow" size={16} />
            </a>

            <h2 className="footer__h">Phone</h2>
            <a href={CONTACT.phoneHref} className="footer__phone">
              <span className="footer__phone-icon">
                <Icon name="phone" size={18} />
              </span>
              {CONTACT.phone}
            </a>

            <h2 className="footer__h">Website</h2>
            <p className="footer__web">{CONTACT.website}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Nayasa Premium Co-Living. All Rights Reserved.</p>
          <button
            className="footer__top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Icon name="up" size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
