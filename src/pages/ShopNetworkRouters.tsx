import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9952846971128,
    "title": "TRENDnet TEW-691GR N450 Wireless Gigabit Router \u2014 Router (New)",
    "price": "R950.00",
    "priceNum": 950.0,
    "image": "/images/network-routers/01_ddf79a7b-a62c-4d4b-8e20-868a3355ee32.png",
    "category": "Network Routers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8736448872696,
    "title": "ASUS AC3200 Tri-Band Gigabit WiFi Router (used)",
    "price": "R3000.00",
    "priceNum": 3000.0,
    "image": "/images/network-routers/51mYNZDW8bL._AC_SL1001.png",
    "category": "Network Routers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952814956792,
    "title": "Cisco 1840 Series Modular Router \u2014 Modular Router (Used)",
    "price": "R850.00",
    "priceNum": 850.0,
    "image": "/images/network-routers/01_59184b66-7cfb-42c4-b3d4-2f59e5363df4.png",
    "category": "Network Routers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 8736450543864,
    "title": "ASUS RT-AC53 Wireless AC750 Dual Band WiFi Router (used)",
    "price": "R690.00",
    "priceNum": 690.0,
    "image": "/images/network-routers/61yhTsjNDVL._SL1500.png",
    "category": "Network Routers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952807682296,
    "title": "Cisco 887G-K9 Integrated Services Router \u2014 Router (Used)",
    "price": "R1500.00",
    "priceNum": 1500.0,
    "image": "/images/network-routers/01_3481e12f-1b4f-4c58-8211-017c8a10947e.png",
    "category": "Network Routers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952785826040,
    "title": "Cisco 1941 Integrated Services Router \u2014 Branch Router (Grade A+)",
    "price": "R2500.00",
    "priceNum": 2500.0,
    "image": "/images/network-routers/01_2c6030dd-8c54-4b2d-a19a-283c189e4e02.png",
    "category": "Network Routers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952788644088,
    "title": "Huawei AR1220CE \u2014 Access Router (Refurbished)",
    "price": "R3125.00",
    "priceNum": 3125.0,
    "image": "/images/network-routers/01_d6137198-683e-41b8-824a-2169dead9ca4.png",
    "category": "Network Routers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952810369272,
    "title": "Axesstel MV420R CDMA Fixed Wireless Modem Router \u2014 Modem Router (Used)",
    "price": "R900.00",
    "priceNum": 900.0,
    "image": "/images/network-routers/01_3d669e0c-f6ee-4a00-889f-424bc47a9d12.png",
    "category": "Network Routers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952753582328,
    "title": "Cisco 1941/K9 Integrated Services Router with 1-Port Serial HWIC \u2014 Router (Grade B)",
    "price": "R2000.00",
    "priceNum": 2000.0,
    "image": "/images/network-routers/01_8082e64f-052e-403d-8416-34273aa51e47.png",
    "category": "Network Routers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952754368760,
    "title": "Cisco C881G+7-K9 881 Ethernet Security Router with 3G \u2014 Integrated Services Router (Refurbished)",
    "price": "R1500.00",
    "priceNum": 1500.0,
    "image": "/images/network-routers/01_0e4197df-f531-4e8c-bfd0-8162bc53306a.png",
    "category": "Network Routers",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopNetworkRouters() {
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
          Home &gt; Network Routers
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Network Routers</h1>
            <span style={{ color: 'var(--gray-dark)', fontSize: '0.9rem' }}>{filteredProducts.length} products</span>
          </div>
          <div className="sort-box">
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-dark)' }}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button className="btn btn-navy" onClick={handleClearAll} style={{ marginTop: '1rem' }}>Clear all filters</button>
              </div>
            )}
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
