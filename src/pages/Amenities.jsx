import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import { AMENITIES, img } from '../data'

const PHOTOS = [
  { src: 'shared-kitchen', alt: 'Kitchen area with refrigerator, water dispenser and wooden cabinetry' },
  { src: 'recreation-room', alt: 'Recreational space with a table-tennis table and foosball' },
  { src: 'dining-hall', alt: 'Dining area with wooden tables and benches' },
]

export default function Amenities() {
  usePageTitle('Amenities')

  return (
    <>
      <PageHero
        index={3}
        crumb="Amenities"
        eyebrow="Everyday convenience"
        lines={['The essentials,', <em>taken care of</em>]}
        facts={[
          ['Connectivity', 'High-speed Wi-Fi'],
          ['Services', 'Housekeeping'],
          ['Support', 'Round the clock'],
        ]}
        image="dining-hall"
        imageAlt="Nayasa dining area with wooden tables and benches"
        tag="5 everyday essentials"
      >
        <p>
          Your living space should make everyday life easier. At Nayasa, essential services and
          property support are part of the co-living experience.
        </p>
      </PageHero>

      <section className="amenities section">
        <div className="wrap amenities__grid">
          <div className="amenities__intro">
            <div className="amenities__photos">
              {PHOTOS.map((p, i) => (
                <figure key={p.src} className="amenities__img" data-reveal="img" style={{ '--d': `${i * 100}ms` }}>
                  <img src={img(p.src, 'sm')} loading="lazy" alt={p.alt} />
                </figure>
              ))}
            </div>
          </div>

          <ul className="amenities__list">
            {AMENITIES.map((a, i) => (
              <li key={a.title} data-reveal style={{ '--d': `${i * 70}ms` }}>
                <span className="amenities__num">0{i + 1}</span>
                <span className="amenities__icon">
                  <Icon name={a.icon} size={28} stroke={1.4} />
                </span>
                <div>
                  <h2>{a.title}</h2>
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
