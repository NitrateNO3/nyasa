import { Link } from 'react-router-dom'
import { CONTACT } from '../data'
import Icon from './Icon'

// Closing call-to-action shown at the bottom of most pages.
export default function CtaBand({ title = <>Come experience <em>Nayasa</em></>, text }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band__inner">
        <div>
          <p className="eyebrow eyebrow--light" data-reveal>Your next home awaits</p>
          <h2 className="h2" data-reveal>{title}</h2>
          <p data-reveal>
            {text ||
              'Get in touch with our team to enquire about available rooms, pricing and property visits.'}
          </p>
        </div>
        <div className="cta-band__actions" data-reveal>
          <Link to="/contact" className="btn btn--accent">
            Book a Visit <Icon name="arrow" size={18} />
          </Link>
          <a href={CONTACT.phoneHref} className="btn btn--ghost-light">
            <Icon name="phone" size={18} /> {CONTACT.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
