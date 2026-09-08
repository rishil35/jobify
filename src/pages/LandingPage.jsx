import Header from '../components/Header/Header';
import HeroSection from '../components/Hero/Hero';
import TestimonialsSection from '../components/Testimonials/Testimonials';
import PricingSection from '../components/Pricing/Pricing';
import FAQSection from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';

export default function LandingPage() {
  return (
    <div className="page-background">
      <Header />
      <main>
        <HeroSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
