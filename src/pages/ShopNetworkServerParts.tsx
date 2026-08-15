import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 3174648005,
    "title": "2GB PC2-5300F ECC Server Memory",
    "price": "R250.00",
    "priceNum": 250.0,
    "image": "/images/network-server-parts/buffered-server-memory-500x500.png",
    "category": "Network Server Parts",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 14833680402,
    "title": "8GB 4Rx8 PC3L-8500R-07-10-H0-D2 | M393B1K73CHD-YF8 Server Memory (Used)",
    "price": "R460.00",
    "priceNum": 460.0,
    "image": "/images/network-server-parts/8gb_m393b1k73chd-yf8_samsung.png",
    "category": "Network Server Parts",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952766460152,
    "title": "SK Hynix 32GB Server RAM Kit \u2014 ECC Registered DDR3 Memory (Grade B)",
    "price": "R1700.00",
    "priceNum": 1700.0,
    "image": "/images/network-server-parts/01_e3d42b6d-4c9d-4997-a5cf-a44e1b56be4f.png",
    "category": "Network Server Parts",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952782844152,
    "title": "Samsung 8GB 2Rx4 PC3-10600R DDR3 ECC Registered Server Memory \u2014 Server RAM (Grade B)",
    "price": "R1000.00",
    "priceNum": 1000.0,
    "image": "/images/network-server-parts/01_5a3af7e1-5a3c-4dcc-b3de-522c3c0538a2.png",
    "category": "Network Server Parts",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 6112922403016,
    "title": "SK Hynix 32GB 2Rx4 PC4-2666V-RB2-11 DDR4 Registered ECC RAM Server Memory Module | HMA84GR7MFR4N-VK",
    "price": "R2850.00",
    "priceNum": 2850.0,
    "image": "/images/network-server-parts/SKHynix32GB2Rx4PC4-2666V-RB2-11.png",
    "category": "Network Server Parts",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 3174645445,
    "title": "1GB PC2-5300F ECC Server Memory",
    "price": "R171.00",
    "priceNum": 171.0,
    "image": "/images/network-server-parts/Memory-RAM-PC2-5300F-555-11-PowerEdge-2950-500x500.png",
    "category": "Network Server Parts",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952831766776,
    "title": "Intel Xeon Gold 6138 \u2014 Server CPU (Refurbished)",
    "price": "R3540.00",
    "priceNum": 3540.0,
    "image": "/images/network-server-parts/01_9bfb6b2d-25d6-43d6-ac6d-269a94240fcf.png",
    "category": "Network Server Parts",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9953807073528,
    "title": "Avocent ACS 6048 \u2014 48-Port Console Server (Used)",
    "price": "R1750.00",
    "priceNum": 1750.0,
    "image": "/images/network-server-parts/01_5c343706-924e-41ec-9440-88d394dcb8af.png",
    "category": "Network Server Parts",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952797884664,
    "title": "Samsung 2GB DDR3 ECC \u2014 Server Memory Module (Refurbished)",
    "price": "R700.00",
    "priceNum": 700.0,
    "image": "/images/network-server-parts/01_1d800d3c-0313-4976-a480-314cd4bd96a3.png",
    "category": "Network Server Parts",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952787824888,
    "title": "Foxconn 042-004-593A05 \u2014 Server Rail Kit (Used)",
    "price": "R1200.00",
    "priceNum": 1200.0,
    "image": "/images/network-server-parts/01_ba3376f2-33e8-47d2-bda5-8b2e5430729e.png",
    "category": "Network Server Parts",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopNetworkServerParts() {
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
          Home &gt; Network Server Parts
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Network Server Parts</h1>
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
