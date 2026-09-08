// Lightweight analytics abstraction
// No-ops until a provider is configured
const analytics = {
  track(eventName, properties = {}) {
    if (typeof window !== 'undefined' && window.__ANALYTICS_PROVIDER__) {
      window.__ANALYTICS_PROVIDER__.track(eventName, properties);
    }
    // No-op if no provider
  },
};

export const EVENTS = {
  RESUME_UPLOAD_STARTED: 'resume_upload_started',
  RESUME_UPLOAD_VALIDATED: 'resume_upload_validated',
  RESUME_UPLOAD_FAILED: 'resume_upload_failed',
  ATS_INTAKE_STARTED: 'ats_intake_started',
  ATS_INTAKE_COMPLETED: 'ats_intake_completed',
  ATS_REPORT_GENERATED: 'ats_report_generated',
  ATS_SCAN_AGAIN_CLICKED: 'ats_scan_again_clicked',
  PRICING_CTA_CLICKED: 'pricing_cta_clicked',
  WHATSAPP_CONTACT_CLICKED: 'whatsapp_contact_clicked',
  JOB_APPLICATION_CTA_CLICKED: 'job_application_cta_clicked',
  TESTIMONIAL_JOIN_CLUB_CLICKED: 'testimonial_join_club_clicked',
  FAQ_CONTACT_CLICKED: 'faq_contact_clicked',
};

export default analytics;
