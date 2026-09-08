import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, LINKS } from '../../constants';
import analytics, { EVENTS } from '../../analytics';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for active section state
  useEffect(() => {
    const sectionIds = ['home', 'testimonials', 'pricing', 'about', 'footer'];
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNavClick = useCallback((e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.slice(1);
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });

        // If About Us, open first FAQ
        if (sectionId === 'about') {
          setTimeout(() => {
            const firstFaqBtn = document.querySelector('[data-faq-index="0"]');
            if (firstFaqBtn) {
              const isExpanded = firstFaqBtn.getAttribute('aria-expanded') === 'true';
              if (!isExpanded) firstFaqBtn.click();
              firstFaqBtn.focus();
            }
          }, 600);
        }
      }
    }
    setMobileOpen(false);
  }, []);

  const getActiveClass = (href) => {
    const sectionMap = {
      '#home': 'home',
      '#pricing': 'pricing',
      '#about': 'about',
    };
    return sectionMap[href] === activeSection ? 'nav-link--active' : '';
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <a href="#home" className="header__logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img
            src="/assets/brand/logo-jobify.png"
            alt="JOBIFY"
            width="112"
            height="49"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${getActiveClass(item.href)}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={LINKS.WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="header__contact gradient-btn"
          onClick={() => analytics.track(EVENTS.WHATSAPP_CONTACT_CLICKED, { source: 'header' })}
        >
          Contact Us
        </a>

        {/* Mobile Toggle */}
        <button
          className="header__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`mobile-nav-link ${getActiveClass(item.href)}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={LINKS.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link mobile-nav-link--cta"
            onClick={() => {
              analytics.track(EVENTS.WHATSAPP_CONTACT_CLICKED, { source: 'mobile_header' });
              setMobileOpen(false);
            }}
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
