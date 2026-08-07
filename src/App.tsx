import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShopLayout from './layouts/ShopLayout';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to shop */}
        <Route path="/" element={<Navigate to="/shop" replace />} />

        {/* Shop Routes */}
        <Route element={<ShopLayout />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/" element={<Shop />} />
          <Route path="/shop/laptop-parts/memory" element={<ShopCategory />} />
        </Route>
      </Routes>
      
      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/27844644666?text=Hi%2C%20I%20need%20help%20with%20my%20device" className="wa-float" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 32 32">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.736 5.584 2.138 8.021L0 32l8.188-2.083A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.14 22.53c-.347.975-1.727 1.784-2.813 2.02-.742.162-1.71.29-4.974-.98-4.17-1.62-6.85-5.87-7.06-6.14-.2-.27-1.66-2.21-1.66-4.22 0-2.01 1.05-3 1.42-3.41.37-.41.81-.51 1.08-.51.27 0 .54 0 .78.01.25.01.58-.095.91.69.34.81 1.15 2.81 1.25 3.01.1.2.17.44.03.71-.13.27-.2.44-.4.68-.2.24-.42.53-.6.71-.2.2-.41.42-.18.82.24.41 1.05 1.73 2.25 2.81 1.55 1.38 2.85 1.81 3.26 2.01.41.2.65.17.89-.1.24-.27 1.02-1.19 1.29-1.6.27-.41.54-.34.91-.2.37.13 2.37 1.12 2.78 1.32.41.2.68.31.78.48.1.17.1.98-.24 1.95z"/>
        </svg>
      </a>
    </Router>
  );
}

export default App;
