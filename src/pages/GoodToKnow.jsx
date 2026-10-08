import PageHero, { usePageTitle } from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import { RULES } from '../data'

export default function GoodToKnow() {
  usePageTitle('Rental Information & Guidelines')

  return (
    <>
      <PageHero
        index={6}
        crumb="Good to Know"
        eyebrow="Good to know"
        lines={['Rental information', <em>&amp; guidelines</em>]}
        facts={[
          ['Notice period', '30 days'],
          ['Food', 'Not included'],
          ['Deposit', 'Shared during enquiry'],
        ]}
        image="courtyard-parking"
        imageAlt="Nayasa courtyard with benches beside the building"
        tag="6 things to know"
      >
        <p>Here are a few important things to know before moving into Nayasa.</p>
      </PageHero>

    <section className="rules section">
      <div className="wrap">
        <ol className="rules__list">
          {RULES.map((r, i) => (
            <li key={r.title} data-reveal style={{ '--d': `${(i % 3) * 80}ms` }}>
              <span className="rules__num">{String(i + 1).padStart(2, '0')}</span>
              <h2>{r.title}</h2>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

      <CtaBand />
    </>
  )
}
