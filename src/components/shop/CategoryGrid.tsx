import { Link } from 'react-router-dom';

interface CategoryItem {
  name: string;
  desc: string;
  image: string;
}

interface CategoryGridProps {
  title: string;
  subtitle: string;
  items: CategoryItem[];
}

export default function CategoryGrid({ title, subtitle, items }: CategoryGridProps) {
  const getSlug = (name: string, isMac: boolean) => {
    const n = name.toLowerCase();
    const prefix = isMac ? '/shop/macbook-parts' : '/shop/laptop-parts';
    if (n.includes('screen')) return `${prefix}/screens`;
    if (n.includes('batter')) return `${prefix}/batteries`;
    if (n.includes('charg')) return `${prefix}/chargers`;
    if (n.includes('keyboard')) return `${prefix}/keyboards`;
    if (n.includes('drive')) return `${prefix}/storage`;
    if (n.includes('memory')) return `${prefix}/memory`;
    return '/shop';
  };

  const isMacParts = title.toLowerCase().includes('mac');

  return (
    <div className="shop-category-section">
      <div className="container">
        <h2 className="shop-section-title">{title}</h2>
        <div className="shop-section-subtitle">{subtitle}</div>

        <div className="shop-category-grid">
          {items.map((item, idx) => (
            <Link to={getSlug(item.name, isMacParts)} className="shop-category-card" key={idx} style={{ textDecoration: 'none' }}>
              <div className="shop-category-img-box" style={{ height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                <img src={item.image} alt={item.name} loading="lazy" width="800" height="533" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 className="shop-category-name">{item.name}</h3>
              <p className="shop-category-desc">{item.desc}</p>
              <div className="shop-category-link">Shop now &rarr;</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
