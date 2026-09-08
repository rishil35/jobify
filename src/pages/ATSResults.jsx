import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCcw, CheckCircle2, AlertCircle, FileText,
  TrendingUp, Target, Shield, Award, X
} from 'lucide-react';
import { useState } from 'react';
import { LINKS, getScoreLabel } from '../constants';
import analytics, { EVENTS } from '../analytics';
import './ATSResults.css';

export default function ATSResults() {
  const navigate = useNavigate();
  const result = window.__JOBIFY_ATS_RESULTS__;
  const intake = window.__JOBIFY_INTAKE_DATA__;
  const fileMeta = window.__JOBIFY_UPLOADED_META__;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!result) {
      navigate('/');
      return;
    }

    if (!sessionStorage.getItem('jobify_ats_popup_shown')) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('jobify_ats_popup_shown', 'true');
        analytics.track(EVENTS.ATS_POPUP_SHOWN);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result, navigate]);

  if (!result) return null;

  const handleScanAnother = () => {
    analytics.track(EVENTS.ATS_SCAN_AGAIN_CLICKED);
    window.__JOBIFY_UPLOADED_FILE__ = null;
    window.__JOBIFY_UPLOADED_META__ = null;
    window.__JOBIFY_ATS_RESULTS__ = null;
    window.__JOBIFY_INTAKE_DATA__ = null;
    navigate('/');
  };

  const scoreLabel = getScoreLabel(result.overallScore);
  const scoreColor = result.overallScore <= 30 ? '#DC2626' : '#B45309';

  const breakdownCards = [
    {
      name: 'Resume Structure',
      icon: <FileText size={20} />,
      data: result.breakdown.resumeStructure,
    },
    {
      name: 'ATS Formatting',
      icon: <Shield size={20} />,
      data: result.breakdown.atsFormatting,
    },
    {
      name: 'Keyword Match',
      icon: <Target size={20} />,
      data: result.breakdown.keywordMatch,
    },
    {
      name: 'Resume Essentials',
      icon: <Award size={20} />,
      data: result.breakdown.resumeEssentials,
    },
  ];

  // Add noindex meta
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="results-page page-background">
      {/* Top Bar */}
      <header className="results-topbar">
        <img src="/assets/brand/logo-jobify.png" alt="JOBIFY" className="results-topbar__logo" />
        <button className="results-topbar__scan gradient-btn" onClick={handleScanAnother}>
          <RotateCcw size={16} />
          Scan Another Resume
        </button>
      </header>

      <main className="results-main">
        {/* Context */}
        <div className="results-context">
          <h1 className="results-context__title">ATS Resume Report</h1>
          <div className="results-context__meta">
            {fileMeta && <span className="results-context__file">📄 {fileMeta.name}</span>}
            {intake?.desiredRole && <span>Target Role: <strong>{intake.desiredRole}</strong></span>}
            {intake?.targetIndustry && <span>Industry: <strong>{intake.targetIndustry}</strong></span>}
            {intake?.experienceLevel && <span>Experience: <strong>{intake.experienceLevel}</strong></span>}
            {intake?.targetLocation && <span>Location: <strong>{intake.targetLocation}</strong></span>}
          </div>
        </div>

        {/* Score Hero */}
        <div className="score-hero">
          <div className="score-hero__ring-side">
            <div className="score-ring" style={{ '--score-color': scoreColor }}>
              <svg viewBox="0 0 120 120" className="score-ring__svg">
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="var(--card-lilac)"
                  strokeWidth="10"
                />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.overallScore / 100) * 326.73} 326.73`}
                  transform="rotate(-90 60 60)"
                  className="score-ring__progress"
                />
              </svg>
              <div className="score-ring__value">
                <span className="score-ring__number">{result.overallScore}</span>
                <span className="score-ring__label">/ 100</span>
              </div>
            </div>
            <p className="score-hero__label">ATS Readiness Score</p>
          </div>

          <div className="score-hero__details">
            <p className="score-hero__interpretation" style={{ color: scoreColor }}>
              {scoreLabel}
            </p>

            <div className="score-hero__stats">
              <div className="mini-stat">
                <CheckCircle2 size={18} color="#B45309" />
                <div>
                  <span className="mini-stat__value">{result.checksPassed}</span>
                  <span className="mini-stat__label">Checks Passed</span>
                </div>
              </div>
              <div className="mini-stat">
                <AlertCircle size={18} color="#F59E0B" />
                <div>
                  <span className="mini-stat__value">{result.needsAttention}</span>
                  <span className="mini-stat__label">Needs Attention</span>
                </div>
              </div>
              <div className="mini-stat">
                <Target size={18} color="#B45309" />
                <div>
                  <span className="mini-stat__value">{result.keywords.found.length}</span>
                  <span className="mini-stat__label">Keywords Found</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <section className="results-section">
          <h2 className="results-section__title">
            <TrendingUp size={20} />
            Score Breakdown
          </h2>
          <div className="breakdown-grid">
            {breakdownCards.map(card => {
              const pct = card.data.max > 0
                ? Math.round((card.data.score / card.data.max) * 100)
                : 0;
              const status = pct >= 80 ? 'Strong' : pct >= 60 ? 'Good' : 'Needs Work';
              const statusColor = pct <= 30 ? '#DC2626' : '#B45309';

              return (
                <div key={card.name} className="breakdown-card">
                  <div className="breakdown-card__header">
                    <span className="breakdown-card__icon">{card.icon}</span>
                    <span className="breakdown-card__name">{card.name}</span>
                  </div>
                  <div className="breakdown-card__score">
                    {card.data.score} / {card.data.max}
                  </div>
                  <div className="breakdown-card__bar">
                    <div
                      className="breakdown-card__bar-fill"
                      style={{ width: `${pct}%`, background: statusColor }}
                    />
                  </div>
                  <span
                    className="breakdown-card__status"
                    style={{ color: statusColor }}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Keyword Analysis */}
        <section className="results-section">
          <h2 className="results-section__title">
            <Target size={20} />
            {result.keywords.isGeneric
              ? 'General Keywords to Consider'
              : `Keyword Analysis — ${result.keywords.templateLabel || intake?.desiredRole}`}
          </h2>

          {result.keywords.genericNote && (
            <p className="results-section__note">{result.keywords.genericNote}</p>
          )}

          <div className="keywords-grid">
            <div className="keywords-column">
              <h3 className="keywords-column__title keywords-column__title--found">
                <CheckCircle2 size={16} />
                Found ({result.keywords.found.length})
              </h3>
              <div className="keywords-list">
                {result.keywords.found.length > 0 ? (
                  result.keywords.found.map(kw => (
                    <span key={kw} className="keyword-tag keyword-tag--found">{kw}</span>
                  ))
                ) : (
                  <p className="keywords-empty">No matching keywords found</p>
                )}
              </div>
            </div>
            <div className="keywords-column">
              <h3 className="keywords-column__title keywords-column__title--missing">
                <AlertCircle size={16} />
                To Consider ({result.keywords.missing.length})
              </h3>
              <div className="keywords-list">
                {result.keywords.missing.map(kw => (
                  <span key={kw} className="keyword-tag keyword-tag--missing">{kw}</span>
                ))}
              </div>
            </div>
          </div>

          <p className="keywords-disclaimer">
            Only add keywords that accurately reflect your experience.
          </p>
        </section>

        {/* ATS Compatibility Checks */}
        <section className="results-section">
          <h2 className="results-section__title">
            <Shield size={20} />
            ATS Compatibility Checks
          </h2>
          <div className="checks-list">
            {breakdownCards.map(card =>
              card.data.items.map((item, i) => (
                <div key={`${card.name}-${i}`} className="check-item">
                  {item.passed ? (
                    <CheckCircle2 size={18} color="#B45309" />
                  ) : (
                    <AlertCircle size={18} color="#F59E0B" />
                  )}
                  <span className="check-item__label">{item.label}</span>
                  <span className={`check-item__status ${item.passed ? 'check-item__status--pass' : 'check-item__status--fail'}`}>
                    {item.passed ? 'Pass' : 'Needs Work'}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* What to Improve */}
        {result.improvements.length > 0 && (
          <section className="results-section">
            <h2 className="results-section__title">
              <TrendingUp size={20} />
              What to Improve
            </h2>
            <div className="improvements-list">
              {result.improvements.map((imp, i) => (
                <div key={i} className="improvement-card">
                  <div className="improvement-card__header">
                    <span className={`improvement-card__priority improvement-card__priority--${imp.priority.toLowerCase()}`}>
                      {imp.priority}
                    </span>
                    <h3 className="improvement-card__title">{imp.title}</h3>
                  </div>
                  <p className="improvement-card__desc">{imp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Service CTA */}
        <section className="results-cta-section">
          <span className="results-cta__badge">ATS SCAN EXCLUSIVE</span>
          <h2 className="results-cta__heading">Want Us to Fix Your Resume?</h2>
          <p className="results-cta__body">
            Get a professionally written, ATS-friendly resume tailored to your target role.
          </p>
          
          <div className="results-cta__pricing-block">
            <span className="results-cta__old-price">₹499</span>
            <span className="results-cta__new-price">₹250</span>
            <span className="results-cta__discount">50% OFF</span>
          </div>

          <div className="results-cta__buttons">
            <a
              href={`${LINKS.WHATSAPP}?text=${encodeURIComponent("Hi Jobify, I completed the ATS scan and would like to get my resume fixed for ₹250.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-btn results-cta__primary"
              onClick={() => analytics.track(EVENTS.WHATSAPP_CONTACT_CLICKED, { source: 'ats_results_primary' })}
            >
              Get My Resume for ₹250
            </a>
            <a
              href={LINKS.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="results-cta__secondary"
              onClick={() => analytics.track(EVENTS.WHATSAPP_CONTACT_CLICKED, { source: 'ats_results_secondary' })}
            >
              Talk to Us
            </a>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="results-disclaimer">
          ATS scores are indicative and based on predefined resume checks. Different employers and applicant tracking systems may evaluate resumes differently.
        </p>
      </main>

      {/* Promotional Popup */}
      {showPopup && (
        <div className="ats-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="ats-popup-card" onClick={e => e.stopPropagation()}>
            <button className="ats-popup-close" onClick={() => setShowPopup(false)}>
              <X size={20} />
            </button>
            <span className="ats-popup-badge">EXCLUSIVE ATS SCAN OFFER</span>
            <h2 className="ats-popup-heading">Your Resume Can Do Better.</h2>
            <p className="ats-popup-sub">
              Get your resume professionally rebuilt and optimised for your target role.
            </p>
            <div className="ats-popup-pricing">
              <span className="ats-popup-old">₹499</span>
              <span className="ats-popup-new">₹250</span>
              <span className="ats-popup-off">50% OFF</span>
            </div>
            <p className="ats-popup-subline">
              Get your ATS-friendly resume fixed for ₹250.
            </p>
            <a
              href={`${LINKS.WHATSAPP}?text=${encodeURIComponent("Hi Jobify, I just completed the ATS resume scan and would like to claim the ₹250 resume offer.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-btn ats-popup-btn"
              onClick={() => {
                analytics.track(EVENTS.WHATSAPP_CONTACT_CLICKED, { source: 'ats_popup' });
                setShowPopup(false);
              }}
            >
              Fix My Resume for ₹250
            </a>
            <button className="ats-popup-maybe" onClick={() => setShowPopup(false)}>
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
