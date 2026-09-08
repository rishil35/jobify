import { useState, useCallback } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { FAQ_DATA, LINKS } from '../../constants';
import analytics, { EVENTS } from '../../analytics';
import './FAQ.css';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = useCallback((index) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  }, []);

  return (
    <section id="about" className="section faq-section">
      <div className="faq-layout container">
        {/* Left Column */}
        <div className="faq-left">
          <h2 className="faq-left__heading">
            Still have
            <br />
            questions?
          </h2>
          <p className="faq-left__body">
            We're here to help. Get in touch with us and we'll answer any
            questions about our services.
          </p>
          <a
            href={LINKS.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-talk-btn"
            onClick={() => analytics.track(EVENTS.FAQ_CONTACT_CLICKED)}
          >
            <span className="faq-talk-btn__text">Talk to Us</span>
            <span className="faq-talk-btn__arrow">
              <ArrowRight size={18} strokeWidth={2.5} />
            </span>
          </a>
        </div>

        {/* Right Column — Accordion */}
        <div className="faq-right">
          {FAQ_DATA.map((item, index) => (
            <div
              key={index}
              className={`faq-card ${openIndex === index ? 'faq-card--open' : ''}`}
            >
              <button
                className="faq-card__header"
                onClick={() => toggle(index)}
                data-faq-index={index}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="faq-card__question">{item.question}</span>
                <span className={`faq-card__icon ${openIndex === index ? 'faq-card__icon--open' : ''}`}>
                  <Plus size={16} />
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="faq-card__body"
                style={{
                  maxHeight: openIndex === index ? '300px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <p className="faq-card__answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
