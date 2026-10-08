import { useCallback, useEffect, useMemo, useState } from 'react'
import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import { GALLERY, img } from '../data'

const CATS = ['All', 'Rooms', 'Common Areas', 'Recreation', 'Building']

// The full set uses hand-placed spans that tile the grid exactly; filtered sets
// (3 or 5 photos) lead with one large tile, which also tiles without gaps.
const spanFor = (g, i, cat) => {
  if (cat === 'All') return g.span ? `is-${g.span}` : ''
  return i === 0 ? 'is-big' : ''
}

export default function Gallery() {
  usePageTitle('Gallery')
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const items = useMemo(() => (cat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === cat)), [cat])

  const step = useCallback(
    (dir) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, step])

  return (
    <>
      <PageHero
        index={4}
        crumb="Gallery"
        eyebrow="The Nayasa experience"
        lines={['More than', <em>just a room</em>]}
        facts={[
          ['Photos', `${GALLERY.length} photos of the property`],
          ['Spaces', 'Rooms, common areas, recreation'],
        ]}
        image="recreation-room"
        imageAlt="Recreational space with a table-tennis table, foosball and turf flooring"
        tag="Recreational space"
      >
        <p>
          Your accommodation is where you begin and end your day. It should be a place where you feel
          comfortable. Choose the privacy of your own room or the experience of shared living, with
          the convenience of property management and support.
        </p>
      </PageHero>

    <section className="life section">
      <div className="wrap">
        <div className="life__bar">
          <h2 className="h3">Take a look around Nayasa</h2>
          <div className="chips chips--light" role="group" aria-label="Filter gallery">
            {CATS.map((c) => (
              <button key={c} className={`chip ${cat === c ? 'is-active' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className={`gallery ${items.length <= 3 ? 'gallery--3' : ''}`} key={cat}>
          {items.map((g, i) => (
            <button
              key={g.src}
              className={`gallery__item ${spanFor(g, i, cat)}`}
              style={{ '--d': `${Math.min(i, 8) * 40}ms` }}
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${g.alt}`}
            >
              <img src={img(g.src, 'sm')} alt={g.alt} loading="lazy" />
              <span className="gallery__cap">{g.cat}</span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
          <button className="lightbox__close" aria-label="Close" onClick={() => setOpen(null)}>
            <Icon name="close" />
          </button>
          <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1) }}>
            <Icon name="left" />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={img(items[open].src)} alt={items[open].alt} />
            <figcaption>
              <span>{items[open].alt}</span>
              <span>{open + 1} / {items.length}</span>
            </figcaption>
          </figure>
          <button className="lightbox__nav lightbox__nav--next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1) }}>
            <Icon name="right" />
          </button>
        </div>
      )}
    </section>

      <CtaBand />
    </>
  )
}
