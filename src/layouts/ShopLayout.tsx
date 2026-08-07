import { Outlet } from 'react-router-dom';
import ShopHeader from '../components/shop/ShopHeader';
import ShopNav from '../components/shop/ShopNav';
import Footer from '../components/Footer'; // Reusing standard footer for now

export default function ShopLayout() {
  return (
    <div className="shop-layout" style={{ background: '#f8f9fa' }}>
      <ShopHeader />
      <ShopNav />
      <Outlet />
      <Footer />
    </div>
  );
}
