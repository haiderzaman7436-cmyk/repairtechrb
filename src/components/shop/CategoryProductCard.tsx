import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface CategoryProductCardProps {
  id?: number | string;
  inStock: boolean;
  isUsed?: boolean;
  image: string;
  category: string;
  title: string;
  price: string;
  priceNum?: number;
}

export default function CategoryProductCard(props: CategoryProductCardProps) {
  const { id = Math.floor(Math.random() * 10000), inStock, isUsed, image, category, title } = props;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const waMessage = encodeURIComponent(`Hi, I'm interested in the ${title}. Can I get a price for this?`);
  const waLink = `https://wa.me/27621172653?text=${waMessage}`;

  const handleCardClick = () => {
    navigate(`/product/${id}`, { state: { product: props } });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(props, 1);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="cat-product-card" onClick={handleCardClick}>
      <div className="cat-product-img-box">
        <div className="cat-product-tags">
          {inStock && <span className="tag-in-stock">IN STOCK</span>}
          {isUsed && <span className="tag-used">USED</span>}
        </div>
        <div className="premium-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          VERIFIED PART
        </div>
        <img src={image} alt={title} loading="lazy" />
      </div>
      
      <div className="cat-product-info">
        <div className="cat-product-category">{category}</div>
        <h3 className="cat-product-title">{title}</h3>
        <div className="cat-product-price">Contact for price</div>
        
        <div className="cat-product-actions">
          <button className="btn-modern btn-add-cart" onClick={handleAddToCart}>ADD TO CART</button>
          <a href={waLink} onClick={stopPropagation} target="_blank" rel="noopener noreferrer" className="btn-modern btn-wa-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
