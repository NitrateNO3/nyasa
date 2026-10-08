import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { img } from '../data'

const SITE = 'Nayasa Premium Co-Living'
const TOTAL = 8

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `Premium Co-Living in Whitefield, Bangalore | Nayasa`
  }, [title])
}

// On phones the intro moves below the photo, so the photo is sized to end exactly at the
// bottom of the first screen (above the fixed Call / Book bar). Width-only changes trigger a
// re-measure, so the mobile URL bar showing/hiding doesn't make the photo jump.
function useFirstScreenPhoto(ref) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const phone = window.matchMedia('(max-width: 760px)')
    let lastWidth = 0
    const fit = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      if (!phone.matches) {
        el.style.height = ''
        return
      }
      const bar = parseFloat(getComputedStyle(document.body).paddingBottom) || 0
      const top = el.getBoundingClientRect().top + window.scrollY
      el.style.height = `${Math.max(200, window.innerHeight - bar - top - 16)}px`
    }
    fit()
    // the title's height changes once the web font loads, so measure again then
    document.fonts?.ready.then(() => {
      lastWidth = 0
      fit()
    })
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [ref])
}

/*
  Opening section of every inner page, in the same light editorial style as the home hero:
  a large title that slides up line by line, the intro and a few key facts beside it,
  then a wide photo that wipes open with a small tag pinned to it.
*/
export default function PageHero({ index, crumb, eyebrow, lines, facts = [], image, imageAlt = '', tag, children }) {
  const media = useRef(null)
  useFirstScreenPhoto(media)

  return (
    <section className="ph">
      <div className="wrap">
        <div className="ph__top">
          <nav className="ph__crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
          {index && (
            <span className="ph__index" aria-hidden="true">
              {String(index).padStart(2, '0')} <span>/ {String(TOTAL).padStart(2, '0')}</span>
            </span>
          )}
        </div>

        <div className="ph__grid">
          <div>
            <p className="eyebrow ph__fade" style={{ '--i': 0 }}>{eyebrow}</p>
            <h1 className="ph__title">
              {lines.map((l, i) => (
                <span className="line" key={i}>
                  <span style={{ '--i': i }}>{l}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="ph__aside">
            {children && <div className="ph__intro ph__fade" style={{ '--i': 1 }}>{children}</div>}
            {facts.length > 0 && (
              <dl className="ph__facts">
                {facts.map(([k, v], i) => (
                  <div key={k} className="ph__fade" style={{ '--i': 2 + i }}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {image && (
          <figure className="ph__media" ref={media}>
            <div className="ph__media-inner" data-parallax="0.12">
              <img src={img(image)} srcSet={`${img(image, 'sm')} 800w, ${img(image)} 1800w`} sizes="100vw" alt={imageAlt} />
            </div>
            {tag && <figcaption className="ph__tag">{tag}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  )
}
