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
  return (
    <div className="shop-category-section">
      <div className="container">
        <h2 className="shop-section-title">{title}</h2>
        <div className="shop-section-subtitle">{subtitle}</div>

        <div className="shop-category-grid">
          {items.map((item, idx) => (
            <div className="shop-category-card" key={idx}>
              <div className="shop-category-img-box" style={{ height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                <img src={item.image} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 className="shop-category-name">{item.name}</h3>
              <p className="shop-category-desc">{item.desc}</p>
              <button className="shop-category-link">Shop now &rarr;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
