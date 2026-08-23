
import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 4446971625590,
    "title": "IPD Trackpad Keyboard Flex Cables - MacBook Retina 12\" A1534 Early 2015 2016 2017",
    "price": "R690.00",
    "priceNum": 690,
    "image": "/images/macbook-parts-keyboards/1.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445734764662,
    "title": "Macbook Pro Retina 13 inch Model A1502 | Year 2013 - 2014 Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1150.00",
    "priceNum": 1150,
    "image": "/images/macbook-parts-keyboards/2.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9232793362,
    "title": "Macbook Pro 13.3 inch Model A1278 | Year 2009 2010 2011 2012 Laptop Replacement Keyboard - US/UK Layout",
    "price": "R1805.00",
    "priceNum": 1805,
    "image": "/images/macbook-parts-keyboards/3.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949132685560,
    "title": "MacBook Retina 12.6\" A1534 Keyboard (Premium)",
    "price": "R2831.00",
    "priceNum": 2831,
    "image": "/images/macbook-parts-keyboards/4.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949131538680,
    "title": "MacBook Retina 12.6\" A1534 Keyboard (Premium)",
    "price": "R3395.00",
    "priceNum": 3395,
    "image": "/images/macbook-parts-keyboards/5.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949130719480,
    "title": "Macbook Air 13.3\" A1466 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/6.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949130064120,
    "title": "Macbook Air 11.6\" A1370 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/7.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129769208,
    "title": "MacBook Air 13.3\" A2179 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/8.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129703672,
    "title": "Macbook Air 13.3\" M1 A2337 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/9.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129605368,
    "title": "Macbook Air 13.3\" M1 A2337 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/10.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129375992,
    "title": "Macbook Air 13.3\" M1 A2337 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/11.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129277688,
    "title": "Macbook Air 13.3\" M2 A2681 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/12.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949126820088,
    "title": "Macbook Retina Pro 13.3\" A1502 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/13.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949122593016,
    "title": "MacBook Pro 13.3\" A1706 Keyboard (Premium)",
    "price": "R2453.00",
    "priceNum": 2453,
    "image": "/images/macbook-parts-keyboards/14.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949119840504,
    "title": "MacBook Pro 15.4\" A1707 Keyboard (Premium)",
    "price": "R2266.00",
    "priceNum": 2266,
    "image": "/images/macbook-parts-keyboards/15.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949118300408,
    "title": "MacBook Pro 15.4\" A1707 Keyboard (Premium)",
    "price": "R4672.00",
    "priceNum": 4672,
    "image": "/images/macbook-parts-keyboards/16.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949116596472,
    "title": "MacBook Pro 13.3\" A1708 Keyboard (Premium)",
    "price": "R1607.00",
    "priceNum": 1607,
    "image": "/images/macbook-parts-keyboards/17.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949115482360,
    "title": "MacBook Pro 13.3\" A1708 Keyboard (Premium)",
    "price": "R2007.00",
    "priceNum": 2007,
    "image": "/images/macbook-parts-keyboards/18.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949108338936,
    "title": "MacBook Pro 13.3\" M1 A2338 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/19.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949107814648,
    "title": "MacBook Pro 13.3\" M1 A2338 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/20.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949107257592,
    "title": "MacBook Pro 13.3\" M1 A2338 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/21.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949105946872,
    "title": "MacBook Pro 14\" 2021 A2442 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/22.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949104832760,
    "title": "MacBook Pro 13\" M2 A2338 Keyboard (Premium)",
    "price": "R7569.00",
    "priceNum": 7569,
    "image": "/images/macbook-parts-keyboards/23.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949103292664,
    "title": "MacBook Pro M3 Max 16\" A2991 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/24.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8804641177848,
    "title": "A1707 TopCase (Space Grey) for Apple MacBook Pro 15 inch retina Touch Bar A1707 Late 2016 to Mid 2017 (Used)",
    "price": "R2300.00",
    "priceNum": 2300,
    "image": "/images/macbook-parts-keyboards/25.webp",
    "category": "MacBook Keyboards",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7664467345656,
    "title": "Apple MacBook Pro Top Case With Battery A2141 16\" 2019 Space Gray (Used - Second Hand)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-keyboards/26.webp",
    "category": "MacBook Keyboards",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4445750198390,
    "title": "MacBook  Pro 15 inch Model A1286 |  Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/27.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445740662902,
    "title": "MacBook  Pro Retina 15 inch Model A1398 |  Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/28.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445729521782,
    "title": "Macbook Pro Retina 13 inch Model A1425 | Year 2012 2013 Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/29.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445720412278,
    "title": "MacBook  Pro 17 inch Model A1297 |  Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/30.webp",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  }
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
