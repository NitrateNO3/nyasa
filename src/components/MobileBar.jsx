import { useLocation, useNavigate } from 'react-router-dom'
import { CONTACT } from '../data'
import Icon from './Icon'

export default function MobileBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleBookClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const target = document.getElementById('book-a-visit')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', '#book-a-visit')
      }
    } else {
      e.preventDefault()
      navigate('/#book-a-visit')
    }
  }

  return (
    <aside className="mobile-bar" aria-label="Quick mobile contact actions">
      <a className="mobile-bar__call" href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phone}`}>
        <Icon name="phone" size={17} />
        <span>Call Property</span>
      </a>
      <a
        className="mobile-bar__book"
        href="/#book-a-visit"
        onClick={handleBookClick}
      >
        <span>Book a Visit</span>
        <Icon name="arrow" size={17} />
      </a>
    </aside>
  )
}
