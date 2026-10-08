import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero, { usePageTitle } from '../components/PageHero'
import Icon from '../components/Icon'
import { CONTACT, ENQUIRY_ENDPOINT } from '../data'

const TYPES = ['Private Room', 'Double Sharing']

const today = () => new Date().toISOString().slice(0, 10)

function validate(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your full name'
  if (!/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(f.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number'
  if (!f.type) e.type = 'Choose an accommodation type'
  if (!f.date) e.date = 'Pick a date for your visit'
  return e
}

export default function Contact() {
  usePageTitle('Book a Visit')
  const [params] = useSearchParams()
  const preset = TYPES.includes(params.get('type')) ? params.get('type') : ''
  const [form, setForm] = useState({ name: '', phone: '', type: preset, date: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const visitDate = form.date
    ? new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('sending')
    try {
      if (ENQUIRY_ENDPOINT) {
        const res = await fetch(ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Request failed')
      }
      window.dataLayer?.push({ event: 'enquiry_submitted', accommodation: form.type })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHero
        index={8}
        crumb="Contact"
        eyebrow="Your next home awaits"
        lines={['Come experience', <em>Nayasa</em>]}
        facts={[
          ['Rooms', 'Private & double sharing'],
          ['Visits', 'Pick a date in the form below'],
        ]}
        image="reception-corner"
        imageAlt="Seating corner at Nayasa with pendant lamps, plants and chairs"
        tag="ITPL Main Road, Whitefield"
      >
        <p>
          Interested in exploring a private room or double-sharing accommodation? Get in touch with
          our team to enquire about available rooms, pricing and property visits.
        </p>
      </PageHero>

    <section className="contact section">
      <div className="wrap contact__grid">
        <div className="contact__text">
          <a className="contact__call" href={CONTACT.phoneHref} data-reveal>
            <span className="contact__call-icon">
              <Icon name="phone" size={22} />
            </span>
            <span>
              <small>Call now</small>
              {CONTACT.phone}
            </span>
          </a>

          <dl className="contact__info" data-reveal>
            <div>
              <dt>Address</dt>
              <dd>
                Nayasa Premium Co-Living
                <br />
                ITPL Main Road, Whitefield
                <br />
                Bengaluru – 560066, Karnataka
              </dd>
            </div>
            <div>
              <dt>Directions</dt>
              <dd>
                <a href={CONTACT.directions} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>{CONTACT.website}</dd>
            </div>
          </dl>
        </div>

        <div className="form-card" data-reveal>
          {status === 'done' ? (
            <div className="form-done">
              <span className="form-done__icon">
                <Icon name="check" size={32} stroke={2} />
              </span>
              <h3 className="h3">Thank you, {form.name.split(' ')[0]}.</h3>
              {ENQUIRY_ENDPOINT ? (
                <p>
                  Your visit request for <strong>{visitDate}</strong> has been sent. The Nayasa team
                  will get in touch on {form.phone}.
                </p>
              ) : (
                <p>
                  To confirm your visit on <strong>{visitDate}</strong>, please call the Nayasa team
                  on <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                </p>
              )}
              <button className="btn btn--dark" onClick={() => setStatus('idle')}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="h3">Schedule a visit</h3>

              <div className={`field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">Full Name</label>
                <input id="name" autoComplete="name" value={form.name} onChange={update('name')} />
                {errors.name && <span className="field__err">{errors.name}</span>}
              </div>

              <div className={`field ${errors.phone ? 'has-error' : ''}`}>
                <label htmlFor="phone">Mobile Number</label>
                <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" value={form.phone} onChange={update('phone')} />
                {errors.phone && <span className="field__err">{errors.phone}</span>}
              </div>

              <fieldset className={`field ${errors.type ? 'has-error' : ''}`}>
                <legend>Preferred Accommodation</legend>
                <div className="segmented">
                  {TYPES.map((t) => (
                    <label key={t} className={form.type === t ? 'is-active' : ''}>
                      <input type="radio" name="type" value={t} checked={form.type === t} onChange={update('type')} />
                      {t}
                    </label>
                  ))}
                </div>
                {errors.type && <span className="field__err">{errors.type}</span>}
              </fieldset>

              <div className={`field ${errors.date ? 'has-error' : ''}`}>
                <label htmlFor="date">Preferred Visit Date</label>
                <input id="date" type="date" min={today()} value={form.date} onChange={update('date')} />
                {errors.date && <span className="field__err">{errors.date}</span>}
              </div>

              <div className="field">
                <label htmlFor="msg">
                  Message <span className="field__opt">(optional)</span>
                </label>
                <textarea id="msg" rows={3} value={form.message} onChange={update('message')} />
              </div>

              <button className="btn btn--accent btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Submit Enquiry'}
              </button>
              {status === 'error' && (
                <p className="form-error">
                  Something went wrong. Please call us on <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
    </>
  )
}
