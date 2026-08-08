import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: 'MacBook Pro Retina 15-inch Replacement Display Screen Assembly...', price: 'R 8,000.00', priceNum: 8000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: '13" MacBook Air Replacement Display Screen Assembly A1369 A1466...', price: 'R 2,500.00', priceNum: 2500, image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=800&auto=format&fit=crop' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: '13" MacBook Pro Replacement Display Screen Assembly A1502 Retina...', price: 'R 3,500.00', priceNum: 3500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { id: 4, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: 'A1278 13-inch MacBook Pro Unibody Replacement Display Screen Assembly...', price: 'R 1,500.00', priceNum: 1500, image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=800&auto=format&fit=crop' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: 'Macbook Air 13.3-inch A2337 M1 Retina Display Screen Assembly...', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: 'Macbook Pro 13-inch Retina Replacement Display Screen Assembly A1708...', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=800&auto=format&fit=crop' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: '12" MacBook Retina 12-inch A1534 Replacement Display Screen Assembly...', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: 'A1706 MacBook Pro 13-inch Retina Display Screen Assembly (2016-2017)...', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=800&auto=format&fit=crop' },
  { id: 9, inStock: true, isUsed: false, category: 'MACBOOK MAC SCREEN ASSEMBLY', title: 'MacBook Air 13.3-inch M1 Retina Display Screen Assembly (Gold)...', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { id: 10, inStock: true, isUsed: false, category: 'MACBOOK MAC SCREEN ASSEMBLY', title: 'A2159 MacBook Pro 13-inch Retina Display Screen Assembly (2019)...', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=800&auto=format&fit=crop' },
  { id: 11, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: '13" MacBook Pro Retina Replacement Display Screen Assembly A1989...', price: 'R 5,000.00', priceNum: 5000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { id: 12, inStock: true, isUsed: false, category: 'LAPTOP SCREEN', title: '15" MacBook Pro Retina Touch Bar Replacement Display Screen Assembly...', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=800&auto=format&fit=crop' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopMacBookScreens() {
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
          Home &gt; MacBook Screens
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>MacBook Screens</h1>
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
              <p>Top quality MacBook screen replacements for all Mac computers... whether your display is cracked, dim, or unresponsive, we offer a wide range of screens for various MacBook models. Careful installation is necessary, and our repair team is here to help and test your new MacBook screen thoroughly if you lack the necessary skills.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
