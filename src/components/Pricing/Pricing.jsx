import { PRICING_DATA, LINKS } from '../../constants';
import analytics, { EVENTS } from '../../analytics';
import './Pricing.css';

export default function PricingSection() {
  return (
    <section id="pricing" className="section pricing-section">
      <div className="pricing-content container">
        <h2 className="section-heading">Simple Pricing. Built for Your Career.</h2>
        <p className="section-subtitle">
          Flexible career services designed around your
          <br />
          goals and job search.
        </p>

        <div className="pricing-grid">
          {PRICING_DATA.map(card => (
            <PricingCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ card }) {
  const whatsappUrl = card.ctaMessage
    ? `${LINKS.WHATSAPP}?text=${encodeURIComponent(card.ctaMessage)}`
    : LINKS.WHATSAPP;

  return (
    <div className="pricing-card">
      <div className="pricing-card__top">
        <h3 className="pricing-card__title">
          {card.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < card.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h3>

        <div className="pricing-card__price-block">
          {card.oldPrice && (
            <span className="pricing-card__old-price">{card.oldPrice}</span>
          )}
          <span className="pricing-card__price">{card.price}</span>
        </div>

        {card.note && (
          <p className="pricing-card__note">{card.note}</p>
        )}

        <div className="pricing-card__features">
          <span className="pricing-card__features-label">{card.featuresLabel}</span>
          <ul>
            {card.features.map((f, i) => (
              <li key={i} className="pricing-card__feature">
                <span className="pricing-card__check">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pricing-card__cta gradient-btn"
        onClick={() =>
          analytics.track(EVENTS.PRICING_CTA_CLICKED, { card: card.id })
        }
      >
        {card.cta}
      </a>
    </div>
  );
}
