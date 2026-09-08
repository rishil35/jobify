import { useCallback } from 'react';
import { FOOTER_LINKS } from '../../constants';
import './Footer.css';

export default function Footer() {
  const handleInternalClick = useCallback((e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const renderLinks = (links) =>
    links.map(link => (
      <li key={link.label}>
        <a
          href={link.href}
          className="footer-link"
          {...(!link.internal && { target: '_blank', rel: 'noopener noreferrer' })}
          onClick={link.internal ? (e) => handleInternalClick(e, link.href) : undefined}
        >
          {link.label}
        </a>
      </li>
    ));

  return (
    <footer id="footer" className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          {/* Logo */}
          <div className="footer__brand">
            <img
              src="/assets/brand/logo-jobify.png"
              alt="JOBIFY"
              className="footer__logo"
              width="130"
              height="56"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          {/* Link Columns */}
          <div className="footer__columns">
            <div className="footer__col">
              <h4 className="footer__col-heading">Company</h4>
              <ul>{renderLinks(FOOTER_LINKS.company)}</ul>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-heading">Documentation</h4>
              <ul>{renderLinks(FOOTER_LINKS.documentation)}</ul>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-heading">Social</h4>
              <ul>{renderLinks(FOOTER_LINKS.social)}</ul>
            </div>
          </div>
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <span className="footer__copyright">
            © Jobify.in. All Rights Reserved 2026
          </span>
          <a href="/terms" className="footer-link footer__terms">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
