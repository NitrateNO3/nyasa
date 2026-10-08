import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Icon from '../components/Icon'
import CtaBand from '../components/CtaBand'
import { usePageTitle } from '../components/PageHero'
import { AMENITIES, GALLERY, ROOM_TYPES, img } from '../data'

function MoreLink({ to, children, light }) {
  return (
    <Link to={to} className={`more-link ${light ? 'more-link--light' : ''}`}>
      {children} <Icon name="arrow" size={18} />
    </Link>
  )
}

const PREVIEW = ['rooftop-evening', 'private-room', 'lobby-lounge', 'recreation-room', 'sharing-room']

export default function Home() {
  usePageTitle()
  const preview = PREVIEW.map((src) => GALLERY.find((g) => g.src === src))

  return (
    <>
      <Hero />

      {/* About intro */}
      <section className="section intro-about">
        <div className="wrap intro-about__grid">
          <div>
            <p className="eyebrow" data-reveal>Welcome to Nayasa</p>
            <h2 className="h2" data-reveal>
              A place you'll love <em>coming home</em> to
            </h2>
          </div>
          <div className="intro-about__body">
            <p className="lede" data-reveal>
              Finding a place to stay in a busy city shouldn't be complicated.
            </p>
            <p data-reveal>
              At Nayasa Premium Co-Living, we bring together comfortable accommodation, essential
              amenities and professional property management to make everyday living convenient.
            </p>
            <div data-reveal>
              <MoreLink to="/about">About Nayasa</MoreLink>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms intro */}
      <section className="section intro-rooms">
        <div className="wrap">
          <div className="intro-head">
            <div>
              <p className="eyebrow" data-reveal>Find your space</p>
              <h2 className="h2" data-reveal>
                Rooms designed around <em>your lifestyle</em>
              </h2>
            </div>
            <div data-reveal>
              <MoreLink to="/rooms">Explore Rooms</MoreLink>
            </div>
          </div>

          <div className="room-cards">
            {ROOM_TYPES.map((r, i) => (
              <Link
                key={r.key}
                to={`/rooms#${r.key}`}
                className="room-card"
                data-reveal
                style={{ '--d': `${i * 120}ms` }}
              >
                <div className="room-card__img" data-reveal="img" style={{ '--d': `${150 + i * 120}ms` }}>
                  <img src={img(r.images[0].src, 'sm')} alt={r.images[0].alt} loading="lazy" />
                </div>
                <div className="room-card__body">
                  <div>
                    <h3 className="h3">{r.title}</h3>
                    <p>{r.lead}</p>
                  </div>
                  <p className="room-card__price">
                    <small>Starting at</small>₹{r.from}
                    <small>{r.unit}</small>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities intro */}
      <section className="section intro-amen">
        <div className="wrap">
          <div className="intro-head">
            <div>
              <p className="eyebrow eyebrow--light" data-reveal>Everyday convenience</p>
              <h2 className="h2" data-reveal>
                The essentials, <em>taken care of</em>
              </h2>
            </div>
            <div data-reveal>
              <MoreLink to="/amenities" light>
                Amenities
              </MoreLink>
            </div>
          </div>
          <ul className="amen-strip">
            {AMENITIES.map((a, i) => (
              <li key={a.title} data-reveal style={{ '--d': `${i * 70}ms` }}>
                <Icon name={a.icon} size={30} stroke={1.3} />
                <span>{a.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery intro */}
      <section className="section intro-gallery">
        <div className="wrap">
          <div className="intro-head">
            <div>
              <p className="eyebrow" data-reveal>The Nayasa experience</p>
              <h2 className="h2" data-reveal>
                More than <em>just a room</em>
              </h2>
            </div>
            <div data-reveal>
              <MoreLink to="/gallery">Take a Look Around Nayasa</MoreLink>
            </div>
          </div>
        </div>
        <div className="photo-strip">
          {preview.map((g, i) => (
            <Link
              to="/gallery"
              key={g.src}
              className="photo-strip__item"
              data-reveal="img"
              data-parallax={[0.04, -0.06, 0.08, -0.04, 0.06][i]}
              style={{ '--d': `${i * 110}ms` }}
            >
              <img src={img(g.src, 'sm')} alt={g.alt} loading="lazy" />
            </Link>
          ))}
        </div>
      </section>

      {/* Location + Good to know intros */}
      <section className="section intro-split">
        <div className="wrap intro-split__grid">
          <article className="split-card" data-reveal>
            <p className="eyebrow">Our location</p>
            <h2 className="h3">
              Find us in <em>Whitefield</em>, Bengaluru
            </h2>
            <p className="split-card__addr">
              <Icon name="pin" size={20} />
              ITPL Main Road, Whitefield, Bengaluru – 560066
            </p>
            <MoreLink to="/location">Location</MoreLink>
          </article>

          <article className="split-card" data-reveal style={{ '--d': '120ms' }}>
            <p className="eyebrow">Good to know</p>
            <h2 className="h3">Rental Information &amp; Guidelines</h2>
            <ul className="split-card__list">
              <li>A mandatory 30-day notice period applies.</li>
              <li>Food is not included in the accommodation pricing.</li>
              <li>A security deposit is applicable as per company policy.</li>
            </ul>
            <MoreLink to="/good-to-know">Good to Know</MoreLink>
          </article>

          <article className="split-card split-card--accent" data-reveal style={{ '--d': '240ms' }}>
            <p className="eyebrow">Frequently Asked Questions</p>
            <h2 className="h3">Have questions? We've got answers.</h2>
            <MoreLink to="/faq">FAQ</MoreLink>
          </article>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
