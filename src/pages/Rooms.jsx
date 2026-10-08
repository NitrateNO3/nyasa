import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import { PRICING, ROOM_TYPES, img } from '../data'

const FILTERS = ['All', 'Private Room', 'Double Sharing']

export default function Rooms() {
  usePageTitle('Private & Double-Sharing Rooms in Whitefield')
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const rows = filter === 'All' ? PRICING : PRICING.filter((r) => r.type === filter)

  return (
    <>
      <PageHero
        index={2}
        crumb="Rooms"
        eyebrow="Find your space"
        lines={['Rooms designed', <>around <em>your lifestyle</em></>]}
        facts={[
          ['Private rooms', 'from ₹14,000 per room'],
          ['Double sharing', 'from ₹10,000 per bed'],
          ['Notice period', '30 days'],
        ]}
        image="sharing-room-corner"
        imageAlt="Double-sharing room with two beds, bedside tables and full-height curtains"
        tag="2 ways to live"
      >
        <p>
          Everyone has a different idea of comfort. Some prefer the privacy of their own room, while
          others enjoy sharing a space. At Nayasa, you can choose what works for you.
        </p>
      </PageHero>

      <section className="rooms section">
        <div className="wrap">
          {ROOM_TYPES.map((room, idx) => (
            <article className={`room ${idx % 2 ? 'room--flip' : ''}`} id={room.key} key={room.key}>
              <div className="room__media" data-reveal>
                <img className="room__img-main" src={img(room.images[0].src)} alt={room.images[0].alt} loading="lazy" />
                <img className="room__img-inset" src={img(room.images[1].src, 'sm')} alt={room.images[1].alt} loading="lazy" />
              </div>
              <div className="room__info" data-reveal>
                <span className="room__idx">0{idx + 1}</span>
                <h2 className="h3">{room.label}</h2>
                <p className="room__price">
                  <span>Starting at</span>
                  <strong>₹{room.from}</strong>
                  <span>{room.unit}</span>
                </p>
                <p className="room__lead">{room.lead}</p>
                <p>{room.body}</p>
                <button
                  className="btn btn--dark"
                  onClick={() => navigate(`/contact?type=${encodeURIComponent(room.formValue)}`)}
                >
                  {room.cta} <Icon name="arrow" size={18} />
                </button>
              </div>
            </article>
          ))}

          <div className="tariff" id="pricing" data-reveal>
            <div className="tariff__head">
              <h2 className="h3">Room pricing</h2>
              <div className="chips" role="group" aria-label="Filter pricing">
                {FILTERS.map((f) => (
                  <button key={f} className={`chip ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <table className="tariff__table">
              <thead>
                <tr>
                  <th scope="col">Room series</th>
                  <th scope="col">Accommodation type</th>
                  <th scope="col">Listed price</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.series}>
                    <td className="tariff__series">{r.series}</td>
                    <td>
                      <span className={`tag tag--${r.type === 'Private Room' ? 'private' : 'sharing'}`}>{r.type}</span>
                    </td>
                    <td className="tariff__price">
                      ₹{r.price} <small>per {r.unit}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="tariff__note">
              Prices and room availability are subject to confirmation. Security deposit and
              applicable terms will be shared during enquiry.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Found the <em>right room?</em></>}
        text="Book a visit to see the rooms in person, or call the team to check current availability."
      />
    </>
  )
}
