import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import { CONTACT } from '../data'

export default function Location() {
  usePageTitle('Location')

  return (
    <>
      <PageHero
        index={5}
        crumb="Location"
        eyebrow="Our location"
        lines={[<>Find us in <em>Whitefield</em>,</>, 'Bengaluru']}
        image="balcony-view"
        imageAlt="View over Whitefield from an open balcony at Nayasa"
      >
        <p>
          Located on ITPL Main Road, Nayasa Premium Co-Living places you in Whitefield, one of
          Bengaluru's established residential and commercial neighbourhoods.
        </p>
      </PageHero>

    <section className="location section">
      <div className="wrap location__grid">
        <div className="location__text">
          <p data-reveal>
            Whether you're relocating to the city or looking for accommodation in Whitefield,
            explore Nayasa and see if it's the right place for you.
          </p>

          <address className="address-card" data-reveal>
            <Icon name="pin" size={22} />
            <div>
              <strong>Nayasa Premium Co-Living</strong>
              ITPL Main Road
              <br />
              Whitefield, Bengaluru – 560066
              <br />
              Karnataka, India
            </div>
          </address>

          <a className="btn btn--dark" href={CONTACT.directions} target="_blank" rel="noopener noreferrer" data-reveal>
            Get Directions <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="location__map" data-reveal>
          <iframe
            title="Map showing Nayasa Premium Co-Living on ITPL Main Road, Whitefield"
            src={CONTACT.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>

      <CtaBand />
    </>
  )
}
