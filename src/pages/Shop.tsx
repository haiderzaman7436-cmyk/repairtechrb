import ShopHero from '../components/shop/ShopHero';
import CategoryGrid from '../components/shop/CategoryGrid';
import FeaturedProduct from '../components/shop/FeaturedProduct';
import ProductGrid from '../components/shop/ProductGrid';

export default function Shop() {
  const laptopParts = [
    { name: 'Laptop Memory (RAM)', desc: 'DDR3, DDR4, DDR5 sodimm', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
    { name: 'Solid State Drives', desc: 'SATA, NVMe PCIe Gen3, Gen4', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80' },
    { name: 'Laptop Batteries', desc: 'OEM replacement batteries', image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=600&q=80' },
    { name: 'Touch Screen & Assemblies', desc: 'LCD, LED, OLED Panels', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' }
  ];

  const macParts = [
    { name: 'MacBook Screens', desc: 'Retina LCD / LED panels', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
    { name: 'MacBook Batteries', desc: 'High capacity replacements', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
    { name: 'MacBook Keyboards', desc: 'Replacement top cases', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80' },
    { name: 'MacBook Chargers', desc: 'MagSafe and USB-C', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80' }
  ];

  const refurbishedLaptops = [
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'HP ProBook 450 G7 15.6" Touchscreen 10th Gen Core i5...', price: 'R 6,499.00', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'Dell Latitude 3410 14" 10th Gen Core i5 10210U 16GB RAM...', price: 'R 5,100.00', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80' },
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'Lenovo ThinkPad X390 13.3" 8th Gen Core i5 8365U 16GB RAM...', price: 'R 4,644.00', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80' },
    { tag: 'LOCAL STOCK', isUsed: true, category: 'Refurbished Laptop', title: 'Dell Latitude E5470 14" 6th Gen Core i5 6300U 8GB RAM...', price: 'R 3,595.00', image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="shop-page">
      <ShopHero />
      
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '2rem auto 4rem' }}>
        <div className="shop-promo-card" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: 'white' }}>Laptop Replacement Screens</h3>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>For HP, Dell, Lenovo, Asus, Acer, Toshiba and Mac.</p>
          <button className="btn btn-lime" style={{ boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}>SHOP SCREENS &rarr;</button>
        </div>
        <div className="shop-promo-card" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, var(--lime) 100%)', color: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: 'white' }}>Refurbished Laptops</h3>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>Quality tested, A-grade computers with a warranty.</p>
          <button className="btn btn-white" style={{ color: 'var(--navy)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>SHOP LAPTOPS &rarr;</button>
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

    </div>
  );
}
