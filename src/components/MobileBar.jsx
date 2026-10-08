import { Link } from 'react-router-dom'
import { CONTACT } from '../data'
import Icon from './Icon'

export default function MobileBar() {
  return (
    <div className="mobile-bar">
      <a href={CONTACT.phoneHref} className="mobile-bar__call">
        <Icon name="phone" size={18} /> Call Now
      </a>
      <Link to="/contact" className="mobile-bar__book">
        Book a Visit
      </Link>
    </div>
  )
}
