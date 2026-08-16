import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShopLayout from './layouts/ShopLayout';
const Shop = lazy(() => import('./pages/Shop'));
const ShopScreens = lazy(() => import('./pages/ShopScreens'));
const ShopChargers = lazy(() => import('./pages/ShopChargers'));
const ShopMemory = lazy(() => import('./pages/ShopMemory'));
const ShopBatteries = lazy(() => import('./pages/ShopBatteries'));
const ShopKeyboards = lazy(() => import('./pages/ShopKeyboards'));
const ShopStorage = lazy(() => import('./pages/ShopStorage'));
const ShopMacBookScreens = lazy(() => import('./pages/ShopMacBookScreens'));
const ShopMacBookBatteries = lazy(() => import('./pages/ShopMacBookBatteries'));
const ShopMacBookChargers = lazy(() => import('./pages/ShopMacBookChargers'));
const ShopMacBookKeyboards = lazy(() => import('./pages/ShopMacBookKeyboards'));
const ShopMacBookRamSsd = lazy(() => import('./pages/ShopMacBookRamSsd'));
const ShopGaming = lazy(() => import('./pages/ShopGaming'));
const ShopUsedLaptops = lazy(() => import('./pages/ShopUsedLaptops'));
const ShopDesktops = lazy(() => import('./pages/ShopDesktops'));
const ShopMonitors = lazy(() => import('./pages/ShopMonitors'));
const ShopServers = lazy(() => import('./pages/ShopServers'));
const ShopComponents = lazy(() => import('./pages/ShopComponents'));
const ShopGadgetScreens = lazy(() => import('./pages/ShopGadgetScreens'));
const ShopGadgetBatteries = lazy(() => import('./pages/ShopGadgetBatteries'));
const ShopGadgetCovers = lazy(() => import('./pages/ShopGadgetCovers'));
const ShopGadgetPorts = lazy(() => import('./pages/ShopGadgetPorts'));
const ShopGadgetAccessories = lazy(() => import('./pages/ShopGadgetAccessories'));
const ShopNetworkAccessPoints = lazy(() => import('./pages/ShopNetworkAccessPoints'));
const ShopNetworkRouters = lazy(() => import('./pages/ShopNetworkRouters'));
const ShopNetworkSwitches = lazy(() => import('./pages/ShopNetworkSwitches'));
const ShopNetworkServerParts = lazy(() => import('./pages/ShopNetworkServerParts'));
const ShopNetworkTransceivers = lazy(() => import('./pages/ShopNetworkTransceivers'));
const Repairs = lazy(() => import('./pages/Repairs'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Search = lazy(() => import('./pages/Search'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--gray-light)', color: 'var(--navy)', fontSize: '1.5rem', fontWeight: 'bold' }}>Loading...</div>}>
      <Routes>
        {/* Redirect root to shop */}
        <Route path="/" element={<Navigate to="/shop" replace />} />

        {/* Shop Routes */}
        <Route element={<ShopLayout />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shop/" element={<Shop />} />
          <Route path="/shop/laptop-parts/memory" element={<ShopMemory />} />
          <Route path="/laptopparts/memory" element={<Navigate to="/shop/laptop-parts/memory" replace />} />
          <Route path="/shop/laptopparts/memory" element={<Navigate to="/shop/laptop-parts/memory" replace />} />
          <Route path="/shop/laptop-parts/screens" element={<ShopScreens />} />
          <Route path="/laptopparts/screens" element={<Navigate to="/shop/laptop-parts/screens" replace />} />
          <Route path="/shop/laptopparts/screens" element={<Navigate to="/shop/laptop-parts/screens" replace />} />
          <Route path="/shop/laptop-parts/chargers" element={<ShopChargers />} />
          <Route path="/laptopparts/chargers" element={<Navigate to="/shop/laptop-parts/chargers" replace />} />
          <Route path="/shop/laptopparts/chargers" element={<Navigate to="/shop/laptop-parts/chargers" replace />} />
          <Route path="/shop/laptop-parts/batteries" element={<ShopBatteries />} />
          <Route path="/laptopparts/batteries" element={<Navigate to="/shop/laptop-parts/batteries" replace />} />
          <Route path="/shop/laptopparts/batteries" element={<Navigate to="/shop/laptop-parts/batteries" replace />} />
          <Route path="/shop/laptop-parts/keyboards" element={<ShopKeyboards />} />
          <Route path="/laptopparts/keyboards" element={<Navigate to="/shop/laptop-parts/keyboards" replace />} />
          <Route path="/shop/laptopparts/keyboards" element={<Navigate to="/shop/laptop-parts/keyboards" replace />} />
          <Route path="/shop/laptop-parts/storage" element={<ShopStorage />} />
          <Route path="/laptopparts/storage" element={<Navigate to="/shop/laptop-parts/storage" replace />} />
          <Route path="/shop/laptopparts/storage" element={<Navigate to="/shop/laptop-parts/storage" replace />} />
          <Route path="/shop/macbook-parts/screens" element={<ShopMacBookScreens />} />
          <Route path="/macbookparts/screens" element={<Navigate to="/shop/macbook-parts/screens" replace />} />
          <Route path="/shop/macbook-parts/batteries" element={<ShopMacBookBatteries />} />
          <Route path="/macbookparts/batteries" element={<Navigate to="/shop/macbook-parts/batteries" replace />} />
          <Route path="/shop/macbook-parts/chargers" element={<ShopMacBookChargers />} />
          <Route path="/macbookparts/chargers" element={<Navigate to="/shop/macbook-parts/chargers" replace />} />
          <Route path="/shop/macbook-parts/keyboards" element={<ShopMacBookKeyboards />} />
          <Route path="/macbookparts/keyboards" element={<Navigate to="/shop/macbook-parts/keyboards" replace />} />
          <Route path="/shop/macbook-parts/ram-ssd" element={<ShopMacBookRamSsd />} />
          <Route path="/shop/gaming-computers" element={<ShopGaming />} />
          <Route path="/gaming-computers" element={<Navigate to="/shop/gaming-computers" replace />} />
          <Route path="/shop/used-laptops" element={<ShopUsedLaptops />} />
          <Route path="/used-laptops" element={<Navigate to="/shop/used-laptops" replace />} />
          <Route path="/shop/desktops" element={<ShopDesktops />} />
          <Route path="/desktops" element={<Navigate to="/shop/desktops" replace />} />
          <Route path="/shop/monitors" element={<ShopMonitors />} />
          <Route path="/monitors" element={<Navigate to="/shop/monitors" replace />} />
          <Route path="/shop/servers" element={<ShopServers />} />
          <Route path="/servers" element={<Navigate to="/shop/servers" replace />} />
          <Route path="/shop/components" element={<ShopComponents />} />
          <Route path="/components" element={<Navigate to="/shop/components" replace />} />
          <Route path="/shop/gadgets/screens" element={<ShopGadgetScreens />} />
          <Route path="/shop/gadgets/batteries" element={<ShopGadgetBatteries />} />
          <Route path="/shop/gadgets/covers" element={<ShopGadgetCovers />} />
          <Route path="/shop/gadgets/ports" element={<ShopGadgetPorts />} />
          <Route path="/shop/gadgets/accessories" element={<ShopGadgetAccessories />} />
          <Route path="/shop/network/access-points" element={<ShopNetworkAccessPoints />} />
          <Route path="/shop/network/routers" element={<ShopNetworkRouters />} />
          <Route path="/shop/network/switches" element={<ShopNetworkSwitches />} />
          <Route path="/shop/network/server-parts" element={<ShopNetworkServerParts />} />
          <Route path="/shop/network/transceivers" element={<ShopNetworkTransceivers />} />
          <Route path="/shop/repairs" element={<Repairs />} />
        </Route>
      </Routes>
      </Suspense>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/27621172653?text=Hi%2C%20I%20need%20help%20with%20my%20device" className="wa-float" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 32 32">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.736 5.584 2.138 8.021L0 32l8.188-2.083A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.14 22.53c-.347.975-1.727 1.784-2.813 2.02-.742.162-1.71.29-4.974-.98-4.17-1.62-6.85-5.87-7.06-6.14-.2-.27-1.66-2.21-1.66-4.22 0-2.01 1.05-3 1.42-3.41.37-.41.81-.51 1.08-.51.27 0 .54 0 .78.01.25.01.58-.095.91.69.34.81 1.15 2.81 1.25 3.01.1.2.17.44.03.71-.13.27-.2.44-.4.68-.2.24-.42.53-.6.71-.2.2-.41.42-.18.82.24.41 1.05 1.73 2.25 2.81 1.55 1.38 2.85 1.81 3.26 2.01.41.2.65.17.89-.1.24-.27 1.02-1.19 1.29-1.6.27-.41.54-.34.91-.2.37.13 2.37 1.12 2.78 1.32.41.2.68.31.78.48.1.17.1.98-.24 1.95z" />
        </svg>
      </a>
    </Router>
  );
}

export default App;
