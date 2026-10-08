import { Link } from 'react-router-dom'
import PageHero, { usePageTitle } from '../components/PageHero'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <PageHero crumb="404" eyebrow="404" lines={['Page not found']}>
      <Link to="/" className="btn btn--dark">Home</Link>
    </PageHero>
  )
}
