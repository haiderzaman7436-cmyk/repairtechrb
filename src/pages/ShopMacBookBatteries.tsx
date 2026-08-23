
import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 4445623287926,
    "title": "A1398 Apple MacBook Pro Retina 15\" Replacement Battery. Fits A1398, A1417, A1494 (Late 2013 mid 2014, Mid 2015)",
    "price": "R2300.00",
    "priceNum": 2300,
    "image": "/images/macbook-parts-batteries/1.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445635051638,
    "title": "A1406 Apple MacBook Air 11\" Replacement Battery. Fits A1406 A1370 (Mid 2011)",
    "price": "R1518.00",
    "priceNum": 1518,
    "image": "/images/macbook-parts-batteries/2.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4443679850614,
    "title": "A1502 Apple MacBook Pro 13\" Retina Replacement Battery (Early 2015) MF839LL/A,  A1582",
    "price": "R3450.00",
    "priceNum": 3450,
    "image": "/images/macbook-parts-batteries/3.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949132161272,
    "title": "MacBook Retina 12.6\" A1534 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/4.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949130096888,
    "title": "Macbook Air 13.3\" A1369 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/5.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129998584,
    "title": "Macbook Air 11.6\" A1370 Replacement Battery (OEM)",
    "price": "R1988.00",
    "priceNum": 1988,
    "image": "/images/macbook-parts-batteries/6.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129965816,
    "title": "MacBook Air 13.3 A1932 Replacement Battery (OEM)",
    "price": "R2164.00",
    "priceNum": 2164,
    "image": "/images/macbook-parts-batteries/7.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129834744,
    "title": "MacBook Air 13.3\" A2179 Replacement Battery (Premium)",
    "price": "R2164.00",
    "priceNum": 2164,
    "image": "/images/macbook-parts-batteries/8.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129670904,
    "title": "Macbook Air 13.3\" M1 A2337 Replacement Battery (Premium)",
    "price": "R2320.00",
    "priceNum": 2320,
    "image": "/images/macbook-parts-batteries/9.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129474296,
    "title": "Macbook Air 13.3\" M1 A2337 Replacement Battery (OEM)",
    "price": "R2262.00",
    "priceNum": 2262,
    "image": "/images/macbook-parts-batteries/10.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129212152,
    "title": "Macbook Air 13.3\" M2 A2681 Replacement Battery (OEM)",
    "price": "R2458.00",
    "priceNum": 2458,
    "image": "/images/macbook-parts-batteries/11.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129146616,
    "title": "Macbook Air 13.3\" M2 A2681 Replacement Battery (OEM)",
    "price": "R2458.00",
    "priceNum": 2458,
    "image": "/images/macbook-parts-batteries/12.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949128032504,
    "title": "Macbook Air 15.3\" M2 A2941 Replacement Battery (Premium)",
    "price": "R3732.00",
    "priceNum": 3732,
    "image": "/images/macbook-parts-batteries/13.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949126230264,
    "title": "Macbook Retina Pro 13.3\" A1502 Replacement Battery (OEM)",
    "price": "R2556.00",
    "priceNum": 2556,
    "image": "/images/macbook-parts-batteries/14.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949125509368,
    "title": "Macbook Retina Pro 13.3\" A1502 Replacement Battery (OEM)",
    "price": "R2556.00",
    "priceNum": 2556,
    "image": "/images/macbook-parts-batteries/15.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949123903736,
    "title": "MacBook Retina Pro 15.4\" A1398 Replacement Battery (OEM)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/16.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949123084536,
    "title": "MacBook Retina Pro 15.4\" A1398 Replacement Battery (OEM)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/17.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949121478904,
    "title": "MacBook Pro 13.3\" A1706 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/18.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949120495864,
    "title": "MacBook Pro 13.3\" A1706 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/19.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949119086840,
    "title": "MacBook Pro 15.4\" A1707 Replacement Battery (OEM)",
    "price": "R2652.00",
    "priceNum": 2652,
    "image": "/images/macbook-parts-batteries/20.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949117382904,
    "title": "MacBook Pro 15.4\" A1707 Replacement Battery (OEM)",
    "price": "R2810.00",
    "priceNum": 2810,
    "image": "/images/macbook-parts-batteries/21.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949114663160,
    "title": "MacBook Pro 13.3\" A1708 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/22.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949112238328,
    "title": "Macbook Pro Retina 13\" A1989 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/23.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949111550200,
    "title": "Macbook Pro Retina 15\" A1990 Replacement Battery (Premium)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/24.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949111025912,
    "title": "Macbook Pro Retina 15\" A1990 Replacement Battery (OEM)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/25.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949110403320,
    "title": "Macbook Pro 16\" 2019 A2141 Replacement Battery (Premium)",
    "price": "R2948.00",
    "priceNum": 2948,
    "image": "/images/macbook-parts-batteries/26.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949109911800,
    "title": "MacBook Pro 13.3\" A2289 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/27.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949109387512,
    "title": "MacBook Pro 13.3\" A2289 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/28.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949108830456,
    "title": "MacBook Pro Retina 13.3\" A2251 Replacement Battery (Premium)",
    "price": "R2516.00",
    "priceNum": 2516,
    "image": "/images/macbook-parts-batteries/29.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949106503928,
    "title": "MacBook Pro 16\" 2021 A2485 Replacement Battery (Premium)",
    "price": "R3440.00",
    "priceNum": 3440,
    "image": "/images/macbook-parts-batteries/30.webp",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  }
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
    return initialProducts.filter((product: any) => {
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
    return [...filteredProducts].sort((a: any, b: any) => {
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
                  {paginatedProducts.map((product: any) => (
                    <CategoryProductCard key={product.id} {...product} />
                  ))}
                </div>
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
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
