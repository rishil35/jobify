import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import './LegalPage.css';

export default function TermsConditions() {
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
        <h1 className="legal-title">Terms & Conditions</h1>
        <p className="legal-last-updated">Last Updated: September 2026</p>

        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Jobify website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Career Services and Guarantees</h2>
          <p>
            Jobify provides resume writing, LinkedIn optimization, and job application support services to help you in your job search. <strong>We do not guarantee interviews or employment.</strong> Hiring decisions are solely at the discretion of the employers. Our services are designed to improve your professional presentation and visibility, but cannot ensure a specific outcome.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. ATS Checker Tool</h2>
          <p>
            The free ATS resume scanner provided on our website is an indicative tool based on predefined, deterministic rules. Different employers use different Applicant Tracking Systems with unique algorithms. Therefore, the score and feedback provided by our tool are for guidance purposes only and do not guarantee compatibility with every employer's specific system.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Customer Responsibility</h2>
          <p>
            You are responsible for ensuring that all information provided to us—whether for a resume rewrite or job application service—is accurate, truthful, and up-to-date. We are not liable for any consequences arising from false or misleading information included in your career documents.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Job Application Service</h2>
          <p>
            If you opt for our Job Applications service, our team will apply to approved jobs on your behalf based on your stated preferences. We rely on third-party job platforms (such as LinkedIn, Naukri, etc.) and are not responsible for the availability, terms, or functionality of those platforms.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Pricing and Payment</h2>
          <p>
            All prices listed on the website are subject to change without notice. Services must be paid for as agreed upon during the onboarding process via WhatsApp. We reserve the right to refuse service at our discretion.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Intellectual Property</h2>
          <p>
            The final resumes, cover letters, and portfolios created for you are for your personal use. The underlying methodologies, templates, website design, and Jobify brand assets remain the intellectual property of Jobify.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Jobify shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of our services or website.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Modifications to Terms</h2>
          <p>
            We may update these Terms & Conditions from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
