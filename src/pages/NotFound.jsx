import { Link } from 'react-router-dom'
import PageHero, { usePageTitle } from '../components/PageHero'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <PageHero crumb="Not found" eyebrow="404" lines={['This page has', <em>moved out</em>]}>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn--dark">Back to home</Link>
    </PageHero>
  )
}
