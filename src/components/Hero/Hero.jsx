import { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { MAX_UPLOAD_SIZE, ACCEPTED_TYPES } from '../../constants';
import analytics, { EVENTS } from '../../analytics';
import './Hero.css';

export default function HeroSection() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const validateAndProcess = useCallback((file) => {
    setError('');
    analytics.track(EVENTS.RESUME_UPLOAD_STARTED, { type: file.type });

    // Type check
    if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
      setError('Unsupported file type. Please upload a PDF or DOCX file.');
      analytics.track(EVENTS.RESUME_UPLOAD_FAILED, { reason: 'unsupported_type' });
      return;
    }

    // Size check
    if (file.size > MAX_UPLOAD_SIZE) {
      setError('File exceeds 10 MB. Please upload a smaller file.');
      analytics.track(EVENTS.RESUME_UPLOAD_FAILED, { reason: 'too_large' });
      return;
    }

    // Check if file has content
    if (file.size === 0) {
      setError('The file appears to be empty. Please try a different file.');
      analytics.track(EVENTS.RESUME_UPLOAD_FAILED, { reason: 'empty' });
      return;
    }

    analytics.track(EVENTS.RESUME_UPLOAD_VALIDATED, { type: file.type, size: file.size });

    // Store file in sessionStorage-friendly way — actually store in memory via state
    // We'll use a global ref since sessionStorage can't hold File objects
    window.__JOBIFY_UPLOADED_FILE__ = file;
    window.__JOBIFY_UPLOADED_META__ = {
      name: file.name,
      type: file.type,
      size: file.size,
    };

    navigate('/ats');
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) validateAndProcess(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndProcess(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <section id="home" className="section hero-section">
      {/* Decorative Assets */}
      <img
        src="/assets/hero/megaphone.png"
        alt=""
        aria-hidden="true"
        className="hero-deco hero-deco--megaphone"
        width="98"
        height="91"
      />
      <img
        src="/assets/hero/search-icon.png"
        alt=""
        aria-hidden="true"
        className="hero-deco hero-deco--search"
        width="82"
        height="82"
      />

      <div className="hero-content">
        <h1 className="hero-heading">
          We Make <span className="hero-heading--purple">You Job</span> Ready
        </h1>

        <p className="hero-subtitle">
          ATS-friendly resumes, career profiles, and job application support
          {' '}<br />
          tailored to your goals.
        </p>

        {/* Upload Card */}
        <div
          className={`upload-card ${dragActive ? 'upload-card--drag' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload your resume for ATS scanning"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
        >
          <div className="upload-card__icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect x="8" y="4" width="24" height="32" rx="3" stroke="#6A50E2" strokeWidth="2" fill="none" />
              <line x1="13" y1="14" x2="27" y2="14" stroke="#B184F7" strokeWidth="2" strokeLinecap="round" />
              <line x1="13" y1="20" x2="27" y2="20" stroke="#B184F7" strokeWidth="2" strokeLinecap="round" />
              <line x1="13" y1="26" x2="22" y2="26" stroke="#B184F7" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="upload-card__title">Get Your Free ATS Score</h2>
          <p className="upload-card__formats">PDF · DOCX</p>
          <button
            className="upload-card__btn gradient-btn"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            type="button"
          >
            <Upload size={18} strokeWidth={2.5} />
            Choose file
          </button>
          {error && <p className="upload-card__error" role="alert">{error}</p>}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="upload-card__input"
            aria-label="Select resume file"
          />
        </div>
      </div>
    </section>
  );
}
