import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Briefcase, MapPin, ChevronDown } from 'lucide-react';
import { INDUSTRY_OPTIONS, EXPERIENCE_LEVELS, COUNTRY_OPTIONS } from '../constants';
import { extractText } from '../ats/extractor';
import { analyzeResume } from '../ats/engine';
import analytics, { EVENTS } from '../analytics';
import './ATSFlow.css';

const PROCESSING_STEPS = [
  'Reading your resume…',
  'Checking resume structure…',
  'Matching role keywords…',
  'Preparing your ATS report…',
];

export default function ATSFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1-4 intake, 5 = processing
  const [formData, setFormData] = useState({
    desiredRole: '',
    targetIndustry: '',
    experienceLevel: '',
    targetLocation: '',
  });
  const [errors, setErrors] = useState({});
  const [processingStep, setProcessingStep] = useState(0);
  const [extractionError, setExtractionError] = useState(false);

  // Check for uploaded file
  useEffect(() => {
    if (!window.__JOBIFY_UPLOADED_FILE__) {
      navigate('/');
    }
  }, [navigate]);

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const goNext = useCallback(() => {
    // Validate current step
    if (step === 1) {
      const role = formData.desiredRole.trim();
      if (role.length < 2) {
        setErrors({ desiredRole: 'Please enter a role with at least 2 characters.' });
        return;
      }
    }
    if (step === 4) {
      if (!formData.targetLocation) {
        setErrors({ targetLocation: 'Please select a target location.' });
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Start processing
      analytics.track(EVENTS.ATS_INTAKE_COMPLETED, {
        role: formData.desiredRole,
        industry: formData.targetIndustry,
        experience: formData.experienceLevel,
        location: formData.targetLocation,
      });
      setStep(5);
      runAnalysis();
    }
  }, [step, formData]);

  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  const runAnalysis = async () => {
    try {
      const file = window.__JOBIFY_UPLOADED_FILE__;
      if (!file) {
        setExtractionError(true);
        return;
      }

      // Animate processing steps
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        setProcessingStep(i);
        await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
      }

      const { text, pageCount } = await extractText(file);

      if (!text || text.trim().length < 20) {
        setExtractionError(true);
        return;
      }

      const result = analyzeResume(text, {
        desiredRole: formData.desiredRole,
        targetIndustry: formData.targetIndustry,
        experienceLevel: formData.experienceLevel,
        targetLocation: formData.targetLocation,
        pageCount,
      });

      analytics.track(EVENTS.ATS_REPORT_GENERATED, {
        score: result.overallScore,
        role: formData.desiredRole,
        usedFallback: result.keywords.isGeneric,
      });

      // Store results
      window.__JOBIFY_ATS_RESULTS__ = result;
      window.__JOBIFY_INTAKE_DATA__ = formData;

      navigate('/ats/results');
    } catch (err) {
      console.error('ATS analysis error:', err);
      setExtractionError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && step < 5) {
      goNext();
    }
  };

  const handleRetry = () => {
    setExtractionError(false);
    window.__JOBIFY_UPLOADED_FILE__ = null;
    window.__JOBIFY_UPLOADED_META__ = null;
    navigate('/');
  };

  // Extraction error state
  if (extractionError) {
    return (
      <div className="ats-flow page-background">
        <div className="ats-flow__header">
          <img src="/assets/brand/logo-jobify.png" alt="JOBIFY" className="ats-flow__logo" />
        </div>
        <div className="ats-flow__card">
          <div className="ats-error">
            <h2 className="ats-error__title">We couldn't read this resume.</h2>
            <p className="ats-error__body">Try uploading a text-based PDF or DOCX file.</p>
            <button className="gradient-btn ats-error__btn" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Processing state
  if (step === 5) {
    return (
      <div className="ats-flow page-background">
        <div className="ats-flow__header">
          <img src="/assets/brand/logo-jobify.png" alt="JOBIFY" className="ats-flow__logo" />
        </div>
        <div className="ats-flow__card">
          <div className="ats-processing">
            <div className="ats-processing__spinner" />
            <p className="ats-processing__step">{PROCESSING_STEPS[processingStep]}</p>
            <div className="ats-processing__dots">
              {PROCESSING_STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`ats-processing__dot ${i <= processingStep ? 'ats-processing__dot--active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ats-flow page-background" onKeyDown={handleKeyDown}>
      <div className="ats-flow__header">
        <img src="/assets/brand/logo-jobify.png" alt="JOBIFY" className="ats-flow__logo" />
      </div>

      <div className="ats-flow__card">
        {/* Progress */}
        <div className="ats-flow__progress">
          <span className="ats-flow__step-label">{step} of 4</span>
          <div className="ats-flow__progress-bar">
            <div
              className="ats-flow__progress-fill"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Back button */}
        <button className="ats-flow__back" onClick={goBack}>
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Step Content */}
        <div className="ats-flow__step-content">
          {step === 1 && (
            <StepRole
              value={formData.desiredRole}
              onChange={v => updateField('desiredRole', v)}
              error={errors.desiredRole}
            />
          )}
          {step === 2 && (
            <StepIndustry
              value={formData.targetIndustry}
              onChange={v => updateField('targetIndustry', v)}
            />
          )}
          {step === 3 && (
            <StepExperience
              value={formData.experienceLevel}
              onChange={v => updateField('experienceLevel', v)}
            />
          )}
          {step === 4 && (
            <StepLocation
              value={formData.targetLocation}
              onChange={v => updateField('targetLocation', v)}
              error={errors.targetLocation}
            />
          )}
        </div>

        {/* CTA */}
        <button className="gradient-btn ats-flow__cta" onClick={goNext}>
          {step === 4 ? 'Check My Resume' : 'Continue'}
        </button>

        {/* File info */}
        {window.__JOBIFY_UPLOADED_META__ && (
          <p className="ats-flow__file-info">
            📄 {window.__JOBIFY_UPLOADED_META__.name}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Step Components ───

function StepRole({ value, onChange, error }) {
  return (
    <div className="intake-step">
      <div className="intake-step__icon">
        <Briefcase size={28} color="#6A50E2" />
      </div>
      <h2 className="intake-step__prompt">What role are you targeting?</h2>
      <input
        type="text"
        className={`intake-step__input ${error ? 'intake-step__input--error' : ''}`}
        placeholder="e.g. Project Analyst, Data Analyst, Software Engineer"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoFocus
      />
      {error && <p className="intake-step__error">{error}</p>}
    </div>
  );
}

function StepIndustry({ value, onChange }) {
  return (
    <div className="intake-step">
      <div className="intake-step__icon">
        <Search size={28} color="#6A50E2" />
      </div>
      <h2 className="intake-step__prompt">Which industry are you targeting?</h2>
      <div className="intake-step__select-wrapper">
        <select
          className="intake-step__select"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          <option value="">Select an industry (optional)</option>
          {INDUSTRY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={18} className="intake-step__select-icon" />
      </div>
    </div>
  );
}

function StepExperience({ value, onChange }) {
  return (
    <div className="intake-step">
      <div className="intake-step__icon">
        <Briefcase size={28} color="#6A50E2" />
      </div>
      <h2 className="intake-step__prompt">What's your experience level?</h2>
      <div className="intake-step__options">
        {EXPERIENCE_LEVELS.map(level => (
          <button
            key={level}
            className={`intake-step__option ${value === level ? 'intake-step__option--selected' : ''}`}
            onClick={() => onChange(level)}
            type="button"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepLocation({ value, onChange, error }) {
  return (
    <div className="intake-step">
      <div className="intake-step__icon">
        <MapPin size={28} color="#6A50E2" />
      </div>
      <h2 className="intake-step__prompt">Where are you applying?</h2>
      <div className="intake-step__select-wrapper">
        <select
          className={`intake-step__select ${error ? 'intake-step__select--error' : ''}`}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          <option value="">Select a country / region</option>
          {COUNTRY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={18} className="intake-step__select-icon" />
      </div>
      {error && <p className="intake-step__error">{error}</p>}
    </div>
  );
}
