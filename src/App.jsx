import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileBar from './components/MobileBar'
import Home from './pages/Home'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Amenities from './pages/Amenities'
import Gallery from './pages/Gallery'
import Location from './pages/Location'
import GoodToKnow from './pages/GoodToKnow'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Scroll to top and re-arm the scroll-reveal animations on every route change.
function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))

    // Parallax: each [data-parallax="speed"] lags behind the scroll in proportion to its
    // parent's distance from the viewport centre (positive speed = slower than the page).
    const layers = [...document.querySelectorAll('[data-parallax]')]
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const tick = () => {
      raf = 0
      const mid = window.innerHeight / 2
      for (const el of layers) {
        const r = el.parentElement.getBoundingClientRect()
        if (r.bottom < -200 || r.top > window.innerHeight + 200) continue
        const offset = (mid - (r.top + r.height / 2)) * Number(el.dataset.parallax)
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    if (layers.length && !still) {
      tick()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname, hash])

  return null
}

function Page({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="page" key={pathname}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Header />
      <main>
        <Page>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/location" element={<Location />} />
            <Route path="/good-to-know" element={<GoodToKnow />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Page>
      </main>
      <Footer />
      <MobileBar />
    </BrowserRouter>
  )
}
