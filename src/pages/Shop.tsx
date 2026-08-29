import ShopHero from '../components/shop/ShopHero';
import CategoryGrid from '../components/shop/CategoryGrid';
import FeaturedProduct from '../components/shop/FeaturedProduct';
import ProductGrid from '../components/shop/ProductGrid';
import Reviews from '../components/shop/Reviews';
import StoreLocation from '../components/shop/StoreLocation';

export default function Shop() {
  const laptopParts = [
    { name: 'Laptop Memory (RAM)', desc: 'DDR3, DDR4, DDR5 sodimm', image: '/images/prod_laptop_ram.webp' },
    { name: 'Solid State Drives', desc: 'SATA, NVMe PCIe Gen3, Gen4', image: '/images/prod_laptop_ssd.webp' },
    { name: 'Laptop Batteries', desc: 'OEM replacement batteries', image: '/images/prod_laptop_battery.webp' },
    { name: 'Touch Screen & Assemblies', desc: 'LCD, LED, OLED Panels', image: '/images/prod_laptop_screen.webp' }
  ];

  const macParts = [
    { name: 'MacBook Screens', desc: 'Retina LCD / LED panels', image: '/images/prod_macbook_screen.webp' },
    { name: 'MacBook Batteries', desc: 'High capacity replacements', image: '/images/prod_macbook_battery.webp' },
    { name: 'MacBook Keyboards', desc: 'Replacement top cases', image: '/images/prod_macbook_keyboard.webp' },
    { name: 'MacBook Chargers', desc: 'MagSafe and USB-C', image: '/images/prod_macbook_charger.webp' }
  ];

  const refurbishedLaptops = [
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'HP ProBook 450 G7 15.6" Touchscreen 10th Gen Core i5...', price: 'Contact for price', image: '/images/prod_refurb_hp.webp', priceNum: 6499.0 },
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'Dell Latitude 3410 14" 10th Gen Core i5 10210U 16GB RAM...', price: 'Contact for price', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80', priceNum: 5100.0 },
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'Lenovo ThinkPad X390 13.3" 8th Gen Core i5 8365U 16GB RAM...', price: 'Contact for price', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80', priceNum: 4644.0 },
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'Dell Latitude E5470 14" 6th Gen Core i5 6300U 8GB RAM...', price: 'Contact for price', image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=600&q=80', priceNum: 3595.0 }
  ];

  return (
    <main className="shop-page">
      <ShopHero />

      <div className="container shop-promo-grid" style={{ margin: '2rem auto 4rem' }}>
        <div className="shop-promo-card" style={{ background: 'var(--navy)', color: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Laptop Replacement Screens</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>For HP, Dell, Lenovo, Asus, Acer, Toshiba and Mac.</p>
          <a href="/shop/laptop-parts/screens" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.75rem 1.5rem', background: 'var(--white)', color: 'var(--navy)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>SHOP SCREENS &rarr;</a>
        </div>
        <div className="shop-promo-card" style={{ background: 'var(--gray-light)', color: 'var(--navy)', border: '1px solid #e5e5e5', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Refurbished Laptops</h2>
          <p style={{ color: 'var(--gray-dark)', marginBottom: '1.5rem' }}>Quality tested, A-grade computers with a warranty.</p>
          <a href="/shop/used-laptops" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.75rem 1.5rem', background: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>SHOP LAPTOPS &rarr;</a>
        </div>
      </div>

      <CategoryGrid
        title="Laptop Parts & Upgrades"
        subtitle="Upgrade your device for better performance"
        items={laptopParts}
      />

      <FeaturedProduct />

      <CategoryGrid
        title="MacBook Parts"
        subtitle="Original and replacement parts for Apple devices"
        items={macParts}
      />

      <ProductGrid
        title="Refurbished Computers"
        subtitle="Quality tested, A-Grade, backed by warranty"
        tabs={['LAPTOPS', 'DESKTOPS', 'MONITORS', 'SERVERS']}
        products={refurbishedLaptops}
      />

      <Reviews />
      <StoreLocation />

    </main>
  );
}
