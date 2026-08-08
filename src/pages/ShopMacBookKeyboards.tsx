import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: '13" MacBook Air Retina A1932 2018 2019 Laptop Keyboard US...', price: 'R 880.00', priceNum: 880, image: '/images/keyboard_1.png' },
  { id: 2, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Air 13" A1369 A1466 US Keyboard (2011-2017) Replacement...', price: 'R 1,200.00', priceNum: 1200, image: '/images/keyboard_2.png' },
  { id: 3, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Air 13" A2337 M1 2020 US Keyboard...', price: 'R 1,250.00', priceNum: 1250, image: '/images/keyboard_3.png' },
  { id: 4, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro Retina 13" A1502 2013-2015 Laptop Keyboard US...', price: 'R 1,300.00', priceNum: 1300, image: '/images/keyboard_1.png' },
  { id: 5, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro Retina 15" A1398 Keyboard (Premium)...', price: 'R 1,550.00', priceNum: 1550, image: '/images/keyboard_2.png' },
  { id: 6, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 14" 2021 A2442 Keyboard (Premium)...', price: 'R 1,800.00', priceNum: 1800, image: '/images/keyboard_3.png' },
  { id: 7, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 15.4" A1707 Keyboard (Premium)...', price: 'R 1,900.00', priceNum: 1900, image: '/images/keyboard_1.png' },
  { id: 8, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 13.3" A1708 Keyboard (Premium)...', price: 'R 1,950.00', priceNum: 1950, image: '/images/keyboard_2.png' },
  { id: 9, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 13.3" A1706 Keyboard (Premium)...', price: 'R 1,980.00', priceNum: 1980, image: '/images/keyboard_3.png' },
  { id: 10, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Retina Pro 13.3" A2251 Keyboard (Premium)...', price: 'R 1,990.00', priceNum: 1990, image: '/images/keyboard_1.png' },
  { id: 11, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Retina 12.0" A1534 Keyboard (Premium)...', price: 'R 1,995.00', priceNum: 1995, image: '/images/keyboard_2.png' },
  { id: 12, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 15" A1990 Keyboard (Premium)...', price: 'R 1,999.00', priceNum: 1999, image: '/images/keyboard_3.png' },
  { id: 13, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 13.3" A1708 Keyboard (Premium)...', price: 'R 2,007.00', priceNum: 2007, image: '/images/keyboard_1.png' },
  { id: 14, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 15.4" A1707 Keyboard (Premium)...', price: 'R 2,200.00', priceNum: 2200, image: '/images/keyboard_2.png' },
  { id: 15, inStock: true, isUsed: true, category: 'LAPTOP SCREEN', title: 'A1707 TopCase (Space Gray) for Apple MacBook Pro 15 inch retina Touch Bar...', price: 'R 2,300.00', priceNum: 2300, image: '/images/keyboard_3.png' },
  { id: 16, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 13.3" A1706 Keyboard (Premium)...', price: 'R 2,453.00', priceNum: 2453, image: '/images/keyboard_1.png' },
  { id: 17, inStock: true, isUsed: true, category: 'LAPTOP KEYBOARD', title: 'MacBook Pro 13.3 inch Retina Model A1708 Laptop Replacement Keyboard...', price: 'R 2,465.00', priceNum: 2465, image: '/images/keyboard_2.png' },
  { id: 18, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Retina 12.0" A1534 Keyboard (Premium)...', price: 'R 2,831.00', priceNum: 2831, image: '/images/keyboard_3.png' },
  { id: 19, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Retina 12.0" A1534 Keyboard (Premium)...', price: 'R 3,365.00', priceNum: 3365, image: '/images/keyboard_1.png' },
  { id: 20, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 15.4" A1707 Keyboard (Premium)...', price: 'R 4,872.00', priceNum: 4872, image: '/images/keyboard_2.png' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Apple MacBook Pro Top Case With Battery A2141 16" 2019 Space Gray...', price: 'R 4,900.00', priceNum: 4900, image: '/images/keyboard_3.png' },
  { id: 22, inStock: true, isUsed: false, category: 'MACBOOK KEYBOARD', title: 'MacBook Pro 13" M2 A2338 Keyboard (Premium)...', price: 'R 7,609.00', priceNum: 7609, image: '/images/keyboard_1.png' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopMacBookKeyboards() {
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
          Home &gt; MacBook Keyboards
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>MacBook Keyboards</h1>
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
              <h2>MacBook Keyboard Replacement Parts</h2>
              <p>Browse our selection of high-quality MacBook keyboard replacements. Whether you're dealing with unresponsive keys, liquid damage, or worn-out keyboards, we have the right part for your MacBook model.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
