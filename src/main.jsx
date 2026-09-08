import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Polyfill toHex for mobile browsers (Safari, Android Chrome, Samsung Internet)
if (typeof Uint8Array.prototype.toHex !== 'function') {
  Uint8Array.prototype.toHex = function () {
    return Array.from(this)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
}

if (typeof ArrayBuffer.prototype.toHex !== 'function') {
  ArrayBuffer.prototype.toHex = function () {
    return Array.from(new Uint8Array(this))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
}

if (typeof Array.prototype.toHex !== 'function') {
  Array.prototype.toHex = function () {
    return this.map(b => (typeof b === 'number' ? b.toString(16).padStart(2, '0') : '')).join('');
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
