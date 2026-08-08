import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: 'Apple USB-C Charge Cable (2m)...', price: 'R 370.00', priceNum: 370, image: '/images/charger_3.png' },
  { id: 2, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '45W MagSafe 2 Apple MacBook Air Generic Laptop Charger/ AC Adapter...', price: 'R 690.00', priceNum: 690, image: '/images/charger_3.png' },
  { id: 3, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '45W MagSafe 1 Apple MacBook Air Generic Laptop Charger/ AC Adapter...', price: 'R 690.00', priceNum: 690, image: '/images/charger_3.png' },
  { id: 4, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '60W MagSafe 1 Apple MacBook Pro Generic Laptop Charger/ AC Adapter...', price: 'R 782.00', priceNum: 782, image: '/images/charger_3.png' },
  { id: 5, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '60W MagSafe 2 Apple MacBook Pro Generic Laptop Charger/ AC Adapter...', price: 'R 782.00', priceNum: 782, image: '/images/charger_3.png' },
  { id: 6, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '85W MagSafe 1 Apple MacBook Pro Generic Laptop Charger/ AC Adapter...', price: 'R 805.00', priceNum: 805, image: '/images/charger_3.png' },
  { id: 7, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '30W USB Type C Apple MacBook Pro Generic Laptop Charger/ AC Adapter...', price: 'R 636.00', priceNum: 636, image: '/images/charger_3.png' },
  { id: 8, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '85W MagSafe 2 Apple MacBook Pro Generic Laptop Charger/ AC Adapter...', price: 'R 820.00', priceNum: 820, image: '/images/charger_3.png' },
  { id: 9, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '61W USB Type C Apple MacBook Pro Generic Laptop Charger/ AC Adapter...', price: 'R 680.00', priceNum: 680, image: '/images/charger_3.png' },
  { id: 10, inStock: true, isUsed: false, category: 'MACBOOK CHARGER', title: '87W USB Type C Apple MacBook Pro Generic Laptop Charger/ AC Adapter...', price: 'R 920.00', priceNum: 920, image: '/images/charger_3.png' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopMacBookChargers() {
  const [filters, setFilters] = useState<FiltersState>({
    availability: [],
    condition: [],
    location: [],
    grade: []
  });
  
  const [priceInput, setPriceInput] = useState({ min: '', max: '' });
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 0, max: Infinity });
  
  const [sortBy, setSortBy] = useState('price-ascending');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (category: keyof FiltersState, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setFilters({ availability: [], condition: [], location: [], grade: [] });
    setPriceInput({ min: '', max: '' });
    setAppliedPriceRange({ min: 0, max: Infinity });
    setCurrentPage(1);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceInput(prev => ({ ...prev, [type]: value }));
  };

  const handleApplyPrice = () => {
    const min = parseFloat(priceInput.min) || 0;
    const max = parseFloat(priceInput.max) || Infinity;
    setAppliedPriceRange({ min, max });
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      if (filters.condition.length > 0) {
        const isNewAllowed = filters.condition.includes('New');
        const isUsedAllowed = filters.condition.includes('Used');
        if (product.isUsed && !isUsedAllowed) return false;
        if (!product.isUsed && !isNewAllowed) return false;
      }
      
      if (filters.availability.length > 0) {
        const inStockAllowed = filters.availability.includes('In Stock');
        const onOrderAllowed = filters.availability.includes('On Order');
        if (product.inStock && !inStockAllowed) return false;
        if (!product.inStock && !onOrderAllowed) return false;
      }

      if (product.priceNum < appliedPriceRange.min || product.priceNum > appliedPriceRange.max) {
        return false;
      }

      return true;
    });
  }, [filters, appliedPriceRange]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-ascending') return a.priceNum - b.priceNum;
      if (sortBy === 'price-descending') return b.priceNum - a.priceNum;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return b.id - a.id; 
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb" style={{ margin: '2rem 0 1rem', fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
          Home &gt; MacBook Chargers
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>MacBook Chargers</h1>
            <span style={{ color: 'var(--gray-dark)', fontSize: '0.9rem' }}>{filteredProducts.length} products</span>
          </div>
          <div className="sort-box">
            <select 
              className="sort-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-ascending">Price: Low to High</option>
              <option value="price-descending">Price: High to Low</option>
              <option value="alphabetical">Alphabetically, A-Z</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>

        <div className="category-layout">
          <ShopSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            priceRange={priceInput}
            onPriceChange={handlePriceChange}
            onApplyPrice={handleApplyPrice}
          />
          
          <div className="category-main">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="cat-product-grid">
                  {paginatedProducts.map(product => (
                    <CategoryProductCard key={product.id} {...product} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                  />
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-dark)' }}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button className="btn btn-navy" onClick={handleClearAll} style={{ marginTop: '1rem' }}>Clear all filters</button>
              </div>
            )}
            
            <div className="seo-text-box" style={{ marginTop: '4rem' }}>
              <h2>Buy MacBook Chargers - Fast, Reliable & Compatible</h2>
              <p>Looking for a MacBook charger in South Africa? We stock high-quality MagSafe, MagSafe 2, and MagSafe 3 chargers for all current models.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
