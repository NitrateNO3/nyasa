import { Link } from 'react-router-dom'
import { CONTACT } from '../data'
import Icon from './Icon'

const GROUPS = [
  {
    title: 'Explore',
    links: [
      ['/', 'Home'],
      ['/about', 'About Nayasa'],
      ['/rooms', 'Our Rooms'],
      ['/amenities', 'Amenities'],
      ['/gallery', 'Gallery'],
    ],
  },
  {
    title: 'Plan your move',
    links: [
      ['/location', 'Location'],
      ['/good-to-know', 'Good to Know'],
      ['/faq', 'FAQ'],
      ['/contact', 'Book a Visit'],
    ],
  },
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

            <dl className="footer__rates">
              <div>
                <dt>Double Sharing</dt>
                <dd>
                  ₹10,000<small>/bed</small>
                </dd>
              </div>
              <div>
                <dt>Private Room</dt>
                <dd>
                  ₹14,000<small>/room</small>
                </dd>
              </div>
            </dl>
          </div>

          {GROUPS.map((g) => (
            <nav key={g.title} className="footer__col" aria-label={g.title}>
              <h2 className="footer__h">{g.title}</h2>
              <ul>
                {g.links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col footer__contact">
            <h2 className="footer__h">Get in touch</h2>
            <a href={CONTACT.phoneHref} className="footer__phone">
              <span className="footer__phone-icon">
                <Icon name="phone" size={18} />
              </span>
              {CONTACT.phone}
            </a>
            <address>
              ITPL Main Road, Whitefield,
              <br />
              Bengaluru – 560066
            </address>
            <a href={CONTACT.directions} target="_blank" rel="noopener noreferrer" className="footer__dir">
              Get directions <Icon name="arrow" size={16} />
            </a>
            <p className="footer__web">{CONTACT.website}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Nayasa Premium Co-Living. All Rights Reserved.</p>
          <p className="footer__parent">
            A <strong>LIFE BY SQFT</strong> Brand
          </p>
          <button
            className="footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top <Icon name="up" size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
