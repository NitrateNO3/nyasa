import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Icon from '../components/Icon'
import { usePageTitle } from '../components/PageHero'
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero'
import {
  AMENITIES,
  CONTACT,
  ENQUIRY_ENDPOINT,
  FAQS,
  GALLERY,
  img,
} from '../data'

const GALLERY_CATEGORIES = ['All', 'Rooms', 'Common Areas', 'Facilities', 'Building']

const today = () => new Date().toISOString().slice(0, 10)

function validateForm(values) {
  const errs = {}
  if (!values.name || values.name.trim().length < 2) {
    errs.name = 'Please enter your full name'
  }
  if (!values.phone || !/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(values.phone.trim())) {
    errs.phone = 'Enter a valid 10-digit mobile number'
  }
  if (!values.type) {
    errs.type = 'Choose an accommodation type'
  }
  if (!values.date) {
    errs.date = 'Select your preferred visit date'
  }
  return errs
}

export default function Home() {
  usePageTitle()

  // Gallery category filter
  const [activeCategory, setActiveCategory] = useState('All')

  const cylinderImages = (
    activeCategory === 'All'
      ? GALLERY
      : GALLERY.filter((item) => item.cat === activeCategory)
  ).map((item) => ({
    src: img(item.src),
    alt: item.alt,
  }))

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0)

  // About image 3D interactive tilt
  const [aboutTilt, setAboutTilt] = useState({ x: 0, y: 0 })
  const handleAboutMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setAboutTilt({ x: -(y * 8), y: x * 8 })
  }
  const handleAboutMouseLeave = () => {
    setAboutTilt({ x: 0, y: 0 })
  }

  // Visit Form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: 'Private Room',
    date: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [formStatus, setFormStatus] = useState('idle')

  const handleFormUpdate = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const handleSelectRoomType = (typeName) => {
    setForm((prev) => ({ ...prev, type: typeName }))
    const visitSection = document.getElementById('visit') || document.getElementById('book-a-visit')
    if (visitSection) {
      visitSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setFormStatus('sending')
    try {
      if (ENQUIRY_ENDPOINT) {
        const res = await fetch(ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Submission failed')
      }
      window.dataLayer?.push({
        event: 'enquiry_submitted',
        accommodation: form.type,
        visit_date: form.date,
      })
      setFormStatus('done')
    } catch {
      setFormStatus('error')
    }
  }

  const formattedVisitDate = form.date
    ? new Date(form.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <>
      {/* 1. HERO */}
      <Hero />

      {/* 2. ABOUT NAYASA (With Animated Image) */}
      <section id="about" className="section section--about" aria-label="About Nayasa">
        <div className="wrap">
          <div className="about-editorial">
            <div className="about-editorial__content">
              <p className="eyebrow" data-reveal>
                About Nayasa
              </p>
              <h2 className="h2 about-editorial__title" data-reveal style={{ '--d': '80ms' }}>
                A quiet standard of living in Whitefield.
              </h2>

              <p className="lede about-editorial__lede" data-reveal style={{ '--d': '140ms' }}>
                Designed for working professionals seeking comfortable, well-managed accommodation close
                to their workspace on ITPL Main Road.
              </p>

              <div className="about-editorial__body" data-reveal style={{ '--d': '200ms' }}>
                <p>
                  At Nayasa Premium Co-Living, we bring together quality accommodation, essential
                  amenities, and professional management by LIFE BY SQFT to make everyday living
                  straightforward.
                </p>
              </div>

              <div className="about-editorial__highlights" data-reveal style={{ '--d': '240ms' }}>
                <div className="about-highlight-item">
                  <strong>ITPL Main Road</strong>
                  <span>Direct access to Whitefield tech parks &amp; metro</span>
                </div>
                <div className="about-highlight-item">
                  <strong>All-Inclusive</strong>
                  <span>Housekeeping, Wi-Fi, electricity &amp; backup included</span>
                </div>
                <div className="about-highlight-item">
                  <strong>Professional Care</strong>
                  <span>Hospitality-led on-site management by LIFE BY SQFT</span>
                </div>
              </div>

              <div className="about-editorial__actions" data-reveal style={{ '--d': '280ms' }}>
                <Link to="/about" className="more-link">
                  Learn more about Nayasa <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>

            {/* Animated Media Frame */}
            <div
              className="about-editorial__media"
              data-reveal="img"
              style={{ '--d': '160ms' }}
              onMouseMove={handleAboutMouseMove}
              onMouseLeave={handleAboutMouseLeave}
            >
              <figure
                className="about-editorial__interactive-frame"
                style={{
                  transform:
                    aboutTilt.x || aboutTilt.y
                      ? `perspective(900px) rotateX(${aboutTilt.x.toFixed(2)}deg) rotateY(${aboutTilt.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
                      : undefined,
                }}
              >
                <img
                  src={img('lobby-lounge')}
                  alt="Nayasa resident lounge with comfortable sofa, armchair and logo wall"
                  loading="lazy"
                />
                <figcaption className="about-editorial__caption">
                  <span>Resident Lounge · Ground Floor</span>
                </figcaption>
              </figure>

              {/* Layered Floating Accent Badge */}
              <div className="about-floating-chip" aria-hidden="true">
                <div className="about-floating-chip__icon">
                  <Icon name="shield" size={18} />
                </div>
                <div className="about-floating-chip__text">
                  <strong>ITPL Main Road</strong>
                  <span>Verified Property</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCOMMODATION & RATES (Clean & Visible in 1 Glance) */}
      <section id="rooms" className="section section--rooms" aria-label="Accommodation & Rates">
        <div className="wrap">
          <div className="section-header">
            <div>
              <p className="eyebrow" data-reveal>
                Accommodation &amp; Rates
              </p>
              <h2 className="h2" data-reveal style={{ '--d': '80ms' }}>
                Simple, transparent living options.
              </h2>
            </div>
            <p className="section-header__desc" data-reveal style={{ '--d': '140ms' }}>
              Choose between complete independence in a private room or shared living in twin-sharing.
              All utilities, housekeeping, and high-speed Wi-Fi are included.
            </p>
          </div>

          <div className="rooms-duo-grid">
            {/* Option 1: Private Room */}
            <article className="room-card" data-reveal style={{ '--d': '100ms' }}>
              <div className="room-card__media">
                <img
                  src={img('private-room-bright')}
                  alt="Private room at Nayasa with single bed, work study desk and window light"
                  loading="lazy"
                  className="room-card__img"
                />
                <span className="room-card__badge">Single Occupancy</span>
              </div>

              <div className="room-card__body">
                <div className="room-card__top">
                  <h3 className="h3 room-card__title">Private Room</h3>
                  <div className="room-card__pricing">
                    <span className="room-card__price-prefix">From</span>
                    <strong className="room-card__price-amount">₹14,000</strong>
                    <span className="room-card__price-unit">/ room per month</span>
                  </div>
                  <span className="room-card__billing-pill room-card__billing-pill--room">
                    Priced per full private room
                  </span>
                </div>

                <p className="room-card__desc">
                  Enjoy personal space and quiet focus. Ideal for professionals who prefer independent living
                  while enjoying fully serviced amenities.
                </p>

                <ul className="room-card__features">
                  <li>
                    <Icon name="check" size={16} /> Private single bed with comfortable mattress
                  </li>
                  <li>
                    <Icon name="check" size={16} /> Dedicated study desk, executive chair &amp; lamp
                  </li>
                  <li>
                    <Icon name="check" size={16} /> Wooden wardrobe &amp; bedside storage
                  </li>
                  <li>
                    <Icon name="check" size={16} /> Daily housekeeping, high-speed Wi-Fi &amp; power backup
                  </li>
                </ul>

                <div className="room-card__actions">
                  <button
                    type="button"
                    className="btn btn--dark btn--block"
                    onClick={() => handleSelectRoomType('Private Room')}
                  >
                    Enquire for Private Room <Icon name="arrow" size={16} />
                  </button>
                  <Link to="/rooms#private" className="more-link room-card__link">
                    View room specifications
                  </Link>
                </div>
              </div>
            </article>

            {/* Option 2: Double Sharing */}
            <article className="room-card" data-reveal style={{ '--d': '180ms' }}>
              <div className="room-card__media">
                <img
                  src={img('sharing-room-wide')}
                  alt="Double-sharing room at Nayasa with two beds, study desks and wooden wardrobes"
                  loading="lazy"
                  className="room-card__img"
                />
                <span className="room-card__badge">Twin Sharing</span>
              </div>

              <div className="room-card__body">
                <div className="room-card__top">
                  <h3 className="h3 room-card__title">Double Sharing Room</h3>
                  <div className="room-card__pricing">
                    <span className="room-card__price-prefix">From</span>
                    <strong className="room-card__price-amount">₹10,000</strong>
                    <span className="room-card__price-unit">/ bed per month</span>
                  </div>
                  <span className="room-card__billing-pill room-card__billing-pill--bed">
                    Priced per individual bed
                  </span>
                </div>

                <p className="room-card__desc">
                  Spacious accommodation for two with personal workspace and individual storage,
                  balancing convenience with social living.
                </p>

                <ul className="room-card__features">
                  <li>
                    <Icon name="check" size={16} /> Two individual single beds with dedicated spacing
                  </li>
                  <li>
                    <Icon name="check" size={16} /> Individual study desks &amp; reading chairs
                  </li>
                  <li>
                    <Icon name="check" size={16} /> Separate wooden wardrobes for each resident
                  </li>
                  <li>
                    <Icon name="check" size={16} /> Daily housekeeping, high-speed Wi-Fi &amp; power backup
                  </li>
                </ul>

                <div className="room-card__actions">
                  <button
                    type="button"
                    className="btn btn--dark btn--block"
                    onClick={() => handleSelectRoomType('Double Sharing')}
                  >
                    Enquire for Double Sharing <Icon name="arrow" size={16} />
                  </button>
                  <Link to="/rooms#sharing" className="more-link room-card__link">
                    View room specifications
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <div className="rooms-footer-note" data-reveal style={{ '--d': '240ms' }}>
            <p>
              *Starting monthly rates shown. Security deposit and optional meal packages can be discussed
              during your visit.
            </p>
          </div>
        </div>
      </section>

      {/* 4. AMENITIES (Compact & Visible in 1 Glance) */}
      <section id="amenities" className="section section--amenities" aria-label="Amenities">
        <div className="wrap">
          <div className="section-header">
            <div>
              <p className="eyebrow" data-reveal>
                Inclusions &amp; Amenities
              </p>
              <h2 className="h2" data-reveal style={{ '--d': '80ms' }}>
                Everything you need to live comfortably.
              </h2>
            </div>
            <p className="section-header__desc" data-reveal style={{ '--d': '140ms' }}>
              From fast connectivity to clean common areas, the essentials are maintained daily.
            </p>
          </div>

          <div className="amenities-clean-grid" data-reveal style={{ '--d': '160ms' }}>
            {AMENITIES.slice(0, 6).map((item) => (
              <div key={item.title} className="amenity-clean-card">
                <div className="amenity-clean-card__icon">
                  <Icon name={item.icon} size={22} />
                </div>
                <h3 className="amenity-clean-card__title">{item.title}</h3>
                <p className="amenity-clean-card__text">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="amenities-footer-bar" data-reveal style={{ '--d': '220ms' }}>
            <Link to="/amenities" className="more-link">
              Explore complete amenities guide <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LIFE AT NAYASA / 3D PHOTO GALLERY */}
      <section id="gallery" className="section section--gallery" aria-label="Life at Nayasa Gallery">
        <div className="wrap">
          <div className="section-header">
            <div>
              <p className="eyebrow" data-reveal>
                Property Gallery
              </p>
              <h2 className="h2" data-reveal style={{ '--d': '80ms' }}>
                Life at Nayasa
              </h2>
            </div>
            <p className="section-header__desc" data-reveal style={{ '--d': '140ms' }}>
              Actual, unedited photography of our building, bedrooms, common lounges, and rooftop.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="gallery-toolbar" data-reveal style={{ '--d': '120ms' }}>
            <div className="chips" role="group" aria-label="Filter gallery by category">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`chip ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Link to="/gallery" className="gallery-toolbar__all-link">
              View all 35 photos in Full Gallery <Icon name="arrow" size={16} />
            </Link>
          </div>

          {/* Clean 3D Cylinder Stage — Compact height to fit in 1 glance */}
          <div className="tilted-gallery-stage" data-reveal style={{ '--d': '160ms' }}>
            <TiltedGridHero
              images={cylinderImages}
              speed={3.6}
              tileHeight={30}
              aspectRatio={16 / 9}
              gap={6}
              axis={50}
              curve={72}
              fade={14}
              className="h-full w-full"
            />
          </div>

          <div className="gallery-caption-bar" data-reveal style={{ '--d': '200ms' }}>
            <span>35 unedited property captures · ITPL Main Road, Whitefield</span>
            <Link to="/gallery" className="more-link">
              Browse full photo library <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. LOCATION */}
      <section id="location" className="section section--location" aria-label="Location">
        <div className="wrap">
          <div className="location-editorial">
            <div className="location-editorial__info">
              <p className="eyebrow" data-reveal>
                Location
              </p>
              <h2 className="h2 location-editorial__title" data-reveal style={{ '--d': '80ms' }}>
                Find us in Whitefield, Bengaluru
              </h2>

              <p className="lede location-editorial__lede" data-reveal style={{ '--d': '140ms' }}>
                Located directly on ITPL Main Road, Nayasa places you in the heart of Whitefield's
                residential and commercial corridor.
              </p>

              <div className="location-commute-list" data-reveal style={{ '--d': '180ms' }}>
                <div className="commute-item">
                  <strong>ITPB / International Tech Park</strong>
                  <span>~5 minutes</span>
                </div>
                <div className="commute-item">
                  <strong>Whitefield Metro Station</strong>
                  <span>~7 minutes</span>
                </div>
                <div className="commute-item">
                  <strong>Nexus Shantiniketan Mall</strong>
                  <span>~10 minutes</span>
                </div>
              </div>

              <address className="location-address-box" data-reveal style={{ '--d': '220ms' }}>
                <div className="location-address-box__icon">
                  <Icon name="pin" size={22} />
                </div>
                <div className="location-address-box__content">
                  <strong className="location-address-box__title">Nayasa Premium Co-Living</strong>
                  <p className="location-address-box__text">
                    ITPL Main Road, Whitefield, Bengaluru, Karnataka 560066
                  </p>
                </div>
              </address>

              <div className="location-editorial__actions" data-reveal style={{ '--d': '260ms' }}>
                <a
                  href={CONTACT.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--dark"
                >
                  <Icon name="map" size={16} /> Open in Google Maps
                </a>
              </div>
            </div>

            <div className="location-editorial__map-frame" data-reveal="img" style={{ '--d': '180ms' }}>
              <iframe
                title="Google Maps Location of Nayasa Premium Co-Living"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.892697843815!2d77.72898!3d12.97868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae118b6e22e96d%3A0x6b05eb5dc0c4b4f5!2sITPL%20Main%20Rd%2C%20Whitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQS (Revived Complete 2-Column Editorial Layout) */}
      <section id="faq" className="section section--faq" aria-label="Frequently Asked Questions">
        <div className="wrap">
          <div className="faq-editorial">
            <div className="faq-editorial__aside">
              <p className="eyebrow" data-reveal>
                Frequently Asked Questions
              </p>
              <h2 className="h2 faq-editorial__title" data-reveal style={{ '--d': '80ms' }}>
                Have questions? We've got answers.
              </h2>
              <p className="faq-editorial__lead" data-reveal style={{ '--d': '140ms' }}>
                Everything you need to know about room types, pricing, amenities, deposit and
                visiting the property.
              </p>

              {/* Direct Assistance Card */}
              <div className="faq-help-card" data-reveal style={{ '--d': '200ms' }}>
                <span className="faq-help-card__label">Need more information?</span>
                <p className="faq-help-card__text">
                  Our on-site property team is available daily to help you pick the right room or clarify move-in terms.
                </p>
                <a
                  href={CONTACT.phoneHref}
                  className="btn btn--dark btn--block faq-help-card__btn"
                >
                  <Icon name="phone" size={16} /> Call {CONTACT.phone}
                </a>
                <Link to="/faq" className="more-link">
                  Visit full FAQ page <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>

            {/* Accordion Component */}
            <div className="faq-accordion" data-reveal style={{ '--d': '120ms' }}>
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={faq.q}
                    className={`faq-accordion__item ${isOpen ? 'is-open' : ''}`}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${i}`}
                        className="faq-accordion__trigger"
                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      >
                        <span className="faq-accordion__q">{faq.q}</span>
                        <span className="faq-accordion__icon" aria-hidden="true">
                          <Icon name="plus" size={14} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-answer-${i}`}
                      className="faq-accordion__panel"
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                    >
                      <div className="faq-accordion__inner">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SCHEDULE A VISIT (Good Looking Form Card) */}
      <section id="visit" className="section section--visit" aria-label="Book a Visit">
        <div className="wrap">
          <div className="visit-editorial">
            <div className="visit-info">
              <p className="eyebrow" data-reveal>
                Schedule a Visit
              </p>
              <h2 className="h2 visit-info__title" data-reveal style={{ '--d': '80ms' }}>
                Come see Nayasa for yourself.
              </h2>
              <p className="visit-info__lead" data-reveal style={{ '--d': '140ms' }}>
                We conduct guided in-person property walkthroughs daily between 10:00 AM and 7:00 PM.
                Inspect the bedrooms, common lounges, rooftop, and dining spaces in person.
              </p>

              <ul className="visit-perks" data-reveal style={{ '--d': '180ms' }}>
                <li className="visit-perk-item">
                  <Icon name="check" size={16} />
                  <span>Zero brokerage or upfront booking fees</span>
                </li>
                <li className="visit-perk-item">
                  <Icon name="check" size={16} />
                  <span>Guided room-by-room tour with on-site staff</span>
                </li>
                <li className="visit-perk-item">
                  <Icon name="check" size={16} />
                  <span>Same-day and weekend visit slots available</span>
                </li>
              </ul>

              <a
                href={CONTACT.phoneHref}
                className="visit-direct-call"
                data-reveal
                style={{ '--d': '220ms' }}
                aria-label={`Call ${CONTACT.phone}`}
              >
                <div className="visit-direct-call__icon">
                  <Icon name="phone" size={18} />
                </div>
                <div className="visit-direct-call__text">
                  <span>Prefer to call or WhatsApp?</span>
                  <strong>{CONTACT.phone}</strong>
                </div>
              </a>
            </div>

            <div className="visit-form-card" data-reveal style={{ '--d': '160ms' }}>
              <div className="visit-form-card__head">
                <h3 className="visit-form-card__title">Schedule Your Walkthrough</h3>
                <p className="visit-form-card__desc">
                  Select your accommodation preference and pick a preferred date.
                </p>
              </div>

              {formStatus === 'done' ? (
                <div className="form-feedback form-feedback--success">
                  <div className="form-feedback__icon">
                    <Icon name="check" size={28} stroke={2} />
                  </div>
                  <h3 className="h3">Thank you, {form.name.split(' ')[0]}.</h3>
                  <p className="form-feedback__msg">
                    Your visit request for <strong>{formattedVisitDate}</strong> ({form.type}) has been
                    received. Our team will contact you on <strong>{form.phone}</strong> to confirm the
                    walkthrough time.
                  </p>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => {
                      setFormStatus('idle')
                      setForm({
                        name: '',
                        phone: '',
                        type: 'Private Room',
                        date: '',
                        message: '',
                      })
                    }}
                  >
                    Schedule Another Visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate>
                  {/* Segmented Room Preference */}
                  <div className="preference-segmented" role="radiogroup" aria-label="Room Preference">
                    <label
                      className={`preference-pill ${
                        form.type === 'Private Room' ? 'is-active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="visit-room-type"
                        value="Private Room"
                        checked={form.type === 'Private Room'}
                        onChange={handleFormUpdate('type')}
                      />
                      <span className="preference-pill__title">Private Room</span>
                      <span className="preference-pill__price">From ₹14,000 / room</span>
                    </label>

                    <label
                      className={`preference-pill ${
                        form.type === 'Double Sharing' ? 'is-active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="visit-room-type"
                        value="Double Sharing"
                        checked={form.type === 'Double Sharing'}
                        onChange={handleFormUpdate('type')}
                      />
                      <span className="preference-pill__title">Double Sharing</span>
                      <span className="preference-pill__price">From ₹10,000 / bed</span>
                    </label>
                  </div>

                  <div className="visit-form-row">
                    <div className={`visit-field ${errors.name ? 'has-error' : ''}`}>
                      <label htmlFor="home-form-name">Full Name *</label>
                      <input
                        id="home-form-name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={handleFormUpdate('name')}
                      />
                      {errors.name && <span className="visit-field__err">{errors.name}</span>}
                    </div>

                    <div className={`visit-field ${errors.phone ? 'has-error' : ''}`}>
                      <label htmlFor="home-form-phone">Mobile Number *</label>
                      <input
                        id="home-form-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={handleFormUpdate('phone')}
                      />
                      {errors.phone && <span className="visit-field__err">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="visit-form-row">
                    <div className={`visit-field ${errors.date ? 'has-error' : ''}`}>
                      <label htmlFor="home-form-date">Preferred Date *</label>
                      <input
                        id="home-form-date"
                        type="date"
                        min={today()}
                        value={form.date}
                        onChange={handleFormUpdate('date')}
                      />
                      {errors.date && <span className="visit-field__err">{errors.date}</span>}
                    </div>

                    <div className="visit-field">
                      <label htmlFor="home-form-time">Preferred Time Slot</label>
                      <select id="home-form-time" defaultValue="Morning (10 AM – 1 PM)">
                        <option value="Morning (10 AM – 1 PM)">Morning (10 AM – 1 PM)</option>
                        <option value="Afternoon (1 PM – 4 PM)">Afternoon (1 PM – 4 PM)</option>
                        <option value="Evening (4 PM – 7 PM)">Evening (4 PM – 7 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="visit-field" style={{ marginBottom: '14px' }}>
                    <label htmlFor="home-form-msg">Questions or Move-in Date (Optional)</label>
                    <textarea
                      id="home-form-msg"
                      rows={2}
                      placeholder="e.g. Planning to move in next month..."
                      value={form.message}
                      onChange={handleFormUpdate('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--accent visit-form__submit-btn"
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? (
                      'Submitting Visit Request…'
                    ) : (
                      <>
                        Confirm Visit Request <Icon name="arrow" size={16} />
                      </>
                    )}
                  </button>

                  <p className="visit-form__security-note">
                    Instant confirmation. Your details are strictly used to coordinate your walkthrough.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
