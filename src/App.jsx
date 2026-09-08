import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ATSFlow from './pages/ATSFlow';
import ATSResults from './pages/ATSResults';
import PrivacyPolicy from './pages/Privacy';
import TermsConditions from './pages/Terms';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ats" element={<ATSFlow />} />
        <Route path="/ats/results" element={<ATSResults />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
