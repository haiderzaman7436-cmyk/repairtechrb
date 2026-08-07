import { Link } from 'react-router-dom';

interface CategoryProductCardProps {
  inStock: boolean;
  isUsed?: boolean;
  image: string;
  category: string;
  title: string;
  price: string;
}

export default function CategoryProductCard({ inStock, isUsed, image, category, title, price }: CategoryProductCardProps) {
  const waMessage = encodeURIComponent(`Hi, I'm interested in the ${title} priced at ${price}.`);
  const waLink = `https://wa.me/27844644666?text=${waMessage}`;

  return (
    <div className="cat-product-card">
      <div className="cat-product-tags">
        {inStock && <span className="tag-in-stock">IN STOCK</span>}
        {isUsed && <span className="tag-used">USED</span>}
      </div>
      
      <Link to="#" className="cat-product-img-box">
        <img src={image} alt={title} loading="lazy" />
      </Link>
      
      <div className="cat-product-category">{category}</div>
      <Link to="#" style={{ textDecoration: 'none' }}>
        <h3 className="cat-product-title">{title}</h3>
      </Link>
      <div className="cat-product-price">{price}</div>
      
      <div className="cat-product-actions">
        <button className="btn btn-navy flex-1" style={{ fontSize: '0.8rem', padding: '0.5rem' }}>ADD TO CART</button>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-lime" style={{ padding: '0.5rem 0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>💬</span>
        </a>
      </div>
    </div>
  );
}
