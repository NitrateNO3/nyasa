import { Link } from 'react-router-dom'
import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import { CONTACT, img } from '../data'

export default function About() {
  usePageTitle('About Nayasa')

  return (
    <>
      <PageHero
        index={1}
        crumb="About Nayasa"
        eyebrow="Welcome to Nayasa"
        lines={["A place you'll love", <><em>coming home</em> to</>]}
        facts={[
          ['Address', 'ITPL Main Road, Whitefield, Bengaluru – 560066'],
          ['Phone', <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>],
        ]}
        image="lobby-entrance"
        imageAlt="Nayasa common area with glass doors, a grey sofa and patterned armchair"
        tag="A LIFE BY SQFT Brand"
      >
        <p>Finding a place to stay in a busy city shouldn't be complicated.</p>
      </PageHero>

      <section className="about section">
        <div className="wrap about__grid">
          <div className="about__text">
            <p className="lede" data-reveal>
              At Nayasa Premium Co-Living, we bring together comfortable accommodation, essential
              amenities and professional property management to make everyday living convenient.
            </p>
            <div className="about__body" data-reveal>
              <p>
                Located on ITPL Main Road in Whitefield, Bengaluru, Nayasa offers private and shared
                accommodation options, giving residents the freedom to choose a space that suits
                their needs and budget.
              </p>
              <p>
                From housekeeping to high-speed Wi-Fi and round-the-clock support, the essentials are
                taken care of so you can focus on living your life.
              </p>
            </div>

            <ul className="facts" data-reveal>
              <li>
                <strong>₹10,000</strong>
                <span>per bed</span>
                <span>Double Sharing</span>
              </li>
              <li>
                <strong>₹14,000</strong>
                <span>per room</span>
                <span>Private Rooms</span>
              </li>
              <li>
                <strong>24/7</strong>
                <span>Support</span>
              </li>
            </ul>
          </div>

          <div className="about__media">
            <figure className="about__img about__img--tall" data-reveal="img">
              <img
                src={img('lobby-lounge')}
                loading="lazy"
                alt="Nayasa lounge with a grey sofa, patterned armchair and the Nayasa logo wall"
              />
            </figure>
            <figure className="about__img about__img--small" data-reveal="img" style={{ '--d': '250ms' }}>
              <img
                src={img('building-exterior', 'sm')}
                loading="lazy"
                alt="Nayasa building facade with glass balconies on ITPL Main Road"
              />
            </figure>
            <div className="about__stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="circ" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                </defs>
                <text>
                  <textPath href="#circ">ITPL MAIN ROAD · WHITEFIELD · 560066 ·</textPath>
                </text>
              </svg>
              <span>N</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section next-steps">
        <div className="wrap">
          <h2 className="eyebrow" data-reveal>
            Quick Links
          </h2>
          <div className="next-steps__grid">
            {[
              { to: '/rooms', title: 'Our Rooms', text: 'Rooms Designed Around Your Lifestyle', image: 'private-room-desk' },
              { to: '/amenities', title: 'Amenities', text: 'The Essentials, Taken Care Of', image: 'shared-kitchen' },
              { to: '/gallery', title: 'Gallery', text: 'Take a Look Around Nayasa', image: 'rooftop-seating' },
            ].map((c, i) => (
              <Link key={c.to} to={c.to} className="next-card" data-reveal style={{ '--d': `${i * 100}ms` }}>
                <div className="next-card__img" data-reveal="img" style={{ '--d': `${i * 100}ms` }}>
                  <img src={img(c.image, 'sm')} alt="" loading="lazy" />
                </div>
                <h3>
                  {c.title} <Icon name="arrow" size={20} />
                </h3>
                <p>{c.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
