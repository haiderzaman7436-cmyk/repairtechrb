import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro Retina 15" A1398 2012 2013 Replacement Battery...', price: 'R 1,200.00', priceNum: 1200, image: '/images/battery_3.png?v=2' },
  { id: 2, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 15" A1707 2016 2017 Replacement Battery...', price: 'R 1,800.00', priceNum: 1800, image: '/images/battery_3.png?v=2' },
  { id: 3, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 15" A1990 2018 2019 Replacement Battery...', price: 'R 1,950.00', priceNum: 1950, image: '/images/battery_2.png?v=2' },
  { id: 4, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 13.3" A1502 2013-2015 Replacement Battery...', price: 'R 1,450.00', priceNum: 1450, image: '/images/battery_3.png?v=2' },
  { id: 5, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 13.3" A1708 2016-2017 Replacement Battery...', price: 'R 1,500.00', priceNum: 1500, image: '/images/battery_3.png?v=2' },
  { id: 6, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 13.3" A1989 2018-2019 Replacement Battery...', price: 'R 1,650.00', priceNum: 1650, image: '/images/battery_2.png?v=2' },
  { id: 7, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 13.3" A1278 2009-2012 Replacement Battery...', price: 'R 850.00', priceNum: 850, image: '/images/battery_1.png?v=2' },
  { id: 8, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Air 13.3" A1369 A1466 2010-2017 Replacement Battery...', price: 'R 950.00', priceNum: 950, image: '/images/battery_3.png?v=2' },
  { id: 9, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Air 13.3" A1932 2018-2019 Replacement Battery...', price: 'R 1,200.00', priceNum: 1200, image: '/images/battery_3.png?v=2' },
  { id: 10, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Air 13.3" A2179 2020 Replacement Battery...', price: 'R 1,250.00', priceNum: 1250, image: '/images/battery_3.png?v=2' },
  { id: 11, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Air 13.3" A2337 M1 Replacement Battery...', price: 'R 1,350.00', priceNum: 1350, image: '/images/battery_2.png?v=2' },
  { id: 12, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Retina 12" A1534 2015-2017 Replacement Battery...', price: 'R 1,550.00', priceNum: 1550, image: '/images/battery_3.png?v=2' },
  { id: 13, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 14" A2442 2021 Replacement Battery...', price: 'R 2,200.00', priceNum: 2200, image: '/images/battery_3.png?v=2' },
  { id: 14, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 16" A2141 2019 Replacement Battery...', price: 'R 2,400.00', priceNum: 2400, image: '/images/battery_2.png?v=2' },
  { id: 15, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 16" A2485 2021 Replacement Battery...', price: 'R 2,600.00', priceNum: 2600, image: '/images/battery_3.png?v=2' },
  { id: 16, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Air 15" A2941 2023 Replacement Battery...', price: 'R 1,950.00', priceNum: 1950, image: '/images/battery_3.png?v=2' },
  { id: 17, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro Retina 15" A1398 Replacement Battery (OEM)...', price: 'R 2,852.00', priceNum: 2852, image: '/images/battery_1.png?v=2' },
  { id: 18, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro Retina 15" A1398 Replacement Battery (Premium)...', price: 'R 2,852.00', priceNum: 2852, image: '/images/battery_2.png?v=2' },
  { id: 19, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Retina Pro 15.4" A1398 Replacement Battery (OEM)...', price: 'R 2,852.00', priceNum: 2852, image: '/images/battery_3.png?v=2' },
  { id: 20, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Retina Pro 15.4" A1398 Replacement Battery (Premium)...', price: 'R 2,852.00', priceNum: 2852, image: '/images/battery_1.png?v=2' },
  { id: 21, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 16" 2019 A2141 Replacement Battery (Premium)...', price: 'R 2,948.00', priceNum: 2948, image: '/images/battery_2.png?v=2' },
  { id: 22, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 14" 2021 A2442 Replacement Battery (Premium)...', price: 'R 3,046.00', priceNum: 3046, image: '/images/battery_3.png?v=2' },
  { id: 23, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro 16" 2021 A2485 Replacement Battery (Premium)...', price: 'R 3,440.00', priceNum: 3440, image: '/images/battery_1.png?v=2' },
  { id: 24, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'A1382 Apple MacBook Pro 15" Retina Replacement Battery (Early 2011)...', price: 'R 3,450.00', priceNum: 3450, image: '/images/battery_2.png?v=2' },
  { id: 25, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Air 15.3" M2 A2941 Replacement Battery (Premium)...', price: 'R 3,732.00', priceNum: 3732, image: '/images/battery_3.png?v=2' },
  { id: 26, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro M3 Max 16" A2991 Replacement Battery (OEM)...', price: 'R 4,089.00', priceNum: 4089, image: '/images/battery_1.png?v=2' },
  { id: 27, inStock: true, isUsed: false, category: 'MACBOOK BATTERY', title: 'MacBook Pro M3 Pro 14" A2992 Replacement Battery (Premium)...', price: 'R 4,089.00', priceNum: 4089, image: '/images/battery_2.png?v=2' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopMacBookBatteries() {
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
          Home &gt; MacBook Batteries
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>MacBook Batteries</h1>
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
              <p>Find high-quality replacement batteries for your MacBook. Whether you have a MacBook Pro, MacBook Air, or MacBook Retina, we offer reliable batteries to restore your Mac's portable power and battery life.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
