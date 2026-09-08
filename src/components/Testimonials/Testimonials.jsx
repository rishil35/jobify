import { LINKS, TRUSTED_LOGOS } from '../../constants';
import analytics, { EVENTS } from '../../analytics';
import './Testimonials.css';

export default function TestimonialsSection() {
  // Double logos for seamless infinite scroll
  const allLogos = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="testimonials-content">
        <h2 className="section-heading">Straight From Our Clients</h2>
        <p className="section-subtitle">
          Real stories from job seekers we've helped move closer to their next
          <br />
          opportunity.
        </p>

        {/* Testimonials Collage */}
        <div className="testimonials-collage">
          <img
            src="/assets/testimonials/Testimonials.png"
            alt="Client testimonials showing successful job search outcomes"
            loading="lazy"
            width="860"
            height="211"
          />
        </div>

        {/* Join CTA */}
        <a
          href={LINKS.WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-btn testimonials-cta"
          onClick={() => analytics.track(EVENTS.TESTIMONIAL_JOIN_CLUB_CLICKED)}
        >
          Join The club
        </a>
      </div>

      {/* Trusted Logos Marquee */}
      <div className="trusted-strip">
        <span className="trusted-strip__label">Trusted by Folks from</span>
        <div className="marquee-wrapper">
          <div className="marquee-track" aria-label="Trusted companies marquee">
            {allLogos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="marquee-logo"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
