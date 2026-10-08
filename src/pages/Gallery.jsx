import { useCallback, useEffect, useMemo, useState } from 'react'
import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import { GALLERY, img } from '../data'

const CATS = ['All', 'Rooms', 'Common Areas', 'Facilities', 'Building']

// Tile sizes for any set of photos: portrait photos get a tall tile, every 7th landscape photo
// a large 2x2 tile, and the last few landscape photos widen to 2x1 until the tile area is a
// multiple of the column count, so the grid ends on a full row.
const AREA = { big: 4, tall: 2, wide: 2, '': 1 }

function tileSizes(items, cols) {
  const sizes = items.map((g, i) => (g.portrait ? 'tall' : i % 7 === 0 && items.length > 2 ? 'big' : ''))
  let missing = (cols - (sizes.reduce((n, s) => n + AREA[s], 0) % cols)) % cols
  for (let i = sizes.length - 1; i > 0 && missing > 0; i--) {
    if (sizes[i] === '') {
      sizes[i] = 'wide'
      missing--
    }
  }
  return sizes
}

export default function Gallery() {
  usePageTitle('Gallery')
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const items = useMemo(() => (cat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === cat)), [cat])
  const cols = items.length <= 3 ? 3 : 4
  const sizes = useMemo(() => tileSizes(items, cols), [items, cols])

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
        image="recreation-room"
        imageAlt="Recreational space with a table-tennis table, foosball and turf flooring"
      >
        <p>
          Your accommodation is where you begin and end your day. It should be a place where you feel
          comfortable.
        </p>
        <p>
          At Nayasa, we believe in making everyday living simple through thoughtfully managed
          accommodation and essential services.
        </p>
        <p>
          Choose the privacy of your own room or the experience of shared living, with the convenience
          of property management and support.
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

        <div className={`gallery ${cols === 3 ? 'gallery--3' : ''}`} key={cat}>
          {items.map((g, i) => (
            <button
              key={g.src}
              className={`gallery__item ${sizes[i] ? `is-${sizes[i]}` : ''}`}
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
              <span>{items[open].cat}</span>
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
