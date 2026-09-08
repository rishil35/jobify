import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import './LegalPage.css';

export default function PrivacyPolicy() {
  return (
    <div className="page-background legal-page">
      <header className="legal-header container">
        <Link to="/" className="legal-header__logo">
          <img src="/assets/brand/logo-jobify.png" alt="JOBIFY" width="112" height="49" />
        </Link>
        <Link to="/" className="legal-header__back">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </header>

      <main className="legal-content container">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-last-updated">Last Updated: September 2026</p>

        <section className="legal-section">
          <h2>1. Information We Collect</h2>
          <p>
            When you use Jobify's services, we may collect information that you voluntarily provide to us, such as your name, contact information, career goals, and the contents of any resumes you upload or submit for review.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Resume Uploads and ATS Scanning</h2>
          <p>
            When you use our free ATS scanner, your resume (PDF or DOCX) is processed temporarily to generate your score and report. <strong>We do not permanently store your resume file</strong> on our servers during the free ATS scan. The extraction and keyword analysis happen ephemerally, and the file is discarded after your report is generated.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. WhatsApp Communication</h2>
          <p>
            Our premium services (such as resume writing and LinkedIn optimization) are facilitated via WhatsApp. By clicking our "Contact Us" or service buttons, you will be redirected to WhatsApp. Please be aware that any information shared through WhatsApp is also subject to WhatsApp's own privacy policies and terms of service.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Analytics and Cookies</h2>
          <p>
            We may use basic analytics tools to understand how users interact with our website (e.g., page views, button clicks) to improve our services. We do not use intrusive tracking cookies or sell your personal data to third-party data brokers.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services (including social media platforms and WhatsApp). We are not responsible for the privacy practices or the content of these third-party sites.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Data Security</h2>
          <p>
            We take reasonable precautions to protect the limited personal information we collect. However, no internet transmission or electronic storage method is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, please reach out to us via our official WhatsApp contact channel.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
