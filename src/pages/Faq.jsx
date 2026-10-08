import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import { CONTACT, FAQS } from '../data'

export default function Faq() {
  usePageTitle('Frequently Asked Questions')
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHero
        index={7}
        crumb="FAQ"
        eyebrow="FAQ"
        lines={['Have questions?', <em>We've got answers.</em>]}
        facts={[
          ['Answered', `${FAQS.length} common questions`],
          ['Still unsure?', <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>],
        ]}
        image="lobby-lounge"
        imageAlt="Nayasa lounge with sofa, armchair and the Nayasa logo wall"
        tag="Rooms, rent & visits"
      >
        <p>Everything you need to know about rooms, pricing, rent and visiting Nayasa.</p>
      </PageHero>

    <section className="faq section">
      <div className="wrap faq__grid">
        <div className="faq__intro">
          <h2 className="h3" data-reveal>Still unsure about something?</h2>
          <p data-reveal>
            Call the team on <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>, or{' '}
            <Link to="/contact">book a visit</Link> and see the property for yourself.
          </p>
        </div>

        <div className="faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h2>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <Icon name="plus" size={20} />
                  </button>
                </h2>
                <div className="faq__a" id={`faq-${i}`} role="region">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>

      <CtaBand />
    </>
  )
}
