
import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 4446057824374,
    "title": "13\" MacBook Air Replacement Display Screen Assembly | A1466 Year MID 2013 - MID 2017  (used)",
    "price": "R3999.00",
    "priceNum": 3999,
    "image": "/images/macbook-parts-screens/1.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7664437494008,
    "title": "16 inch MacBook Pro  Space Grey Replacement Display Screen Assembly | A2141 Late 2019  (Used)",
    "price": "R7999.00",
    "priceNum": 7999,
    "image": "/images/macbook-parts-screens/2.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4446063853686,
    "title": "13\" MacBook Pro Retina  Replacement Display Screen Assembly | A1425 Year Late 2012 - Early 2013  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/3.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4445769793654,
    "title": "13\" MacBook Pro Retina Replacement Display Screen Assembly | A1502 Year Late 2013 - Mid 2014  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/4.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949130162424,
    "title": "Macbook Air 13.3\" A1369 Screen Assembly (Premium)",
    "price": "R4982.00",
    "priceNum": 4982,
    "image": "/images/macbook-parts-screens/5.webp",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129343224,
    "title": "Macbook Air 13.3\" M2 A2681 Screen Assembly (Premium)",
    "price": "R5979.00",
    "priceNum": 5979,
    "image": "/images/macbook-parts-screens/6.webp",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949128786168,
    "title": "Macbook Air 15.3\" M2 A2941 Screen Assembly (Premium)",
    "price": "R5979.00",
    "priceNum": 5979,
    "image": "/images/macbook-parts-screens/7.webp",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949127475448,
    "title": "Macbook Air 15.3\" M2 A2941 Screen Assembly (OEM)",
    "price": "R5979.00",
    "priceNum": 5979,
    "image": "/images/macbook-parts-screens/8.webp",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949124788472,
    "title": "Macbook Retina Pro 13.3\" A1502 Screen Assembly (OEM)",
    "price": "R5690.00",
    "priceNum": 5690,
    "image": "/images/macbook-parts-screens/9.webp",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7759664546040,
    "title": "A1502 13 inch MacBook Pro Silver Replacement Display Screen Assembly | Early 2015 Model  (Used)",
    "price": "R3999.00",
    "priceNum": 3999,
    "image": "/images/macbook-parts-screens/10.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7759657042168,
    "title": "A2338 13 inch MacBook Pro Space Grey Replacement Display Screen Assembly | 2020 Model  (Used)",
    "price": "R6999.00",
    "priceNum": 6999,
    "image": "/images/macbook-parts-screens/11.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7759654519032,
    "title": "A2337 13 inch MacBook Air Space Grey Replacement Display Screen Assembly | 2020 Model  (Used)",
    "price": "R5999.00",
    "priceNum": 5999,
    "image": "/images/macbook-parts-screens/12.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7759645802744,
    "title": "15 inch MacBook Pro  Silver Replacement Display Screen Assembly | A1398 Mid 2012  (Used)",
    "price": "R2999.00",
    "priceNum": 2999,
    "image": "/images/macbook-parts-screens/13.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504729583734,
    "title": "15\" MacBook Pro Retina Touch Replacement Display Screen Assembly | A1990 Late 2018 - 2019  (Resolution = 2880*1800)",
    "price": "R12900.00",
    "priceNum": 12900,
    "image": "/images/macbook-parts-screens/14.webp",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4504726634614,
    "title": "15\" MacBook Pro Retina Touch Replacement Display Screen Assembly | A1707 Late 2016 - 2017  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/15.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504724799606,
    "title": "15\" MacBook Pro Retina  Replacement Display Screen Assembly | A1398 Mid 2012 - Early 2013  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/16.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504721784950,
    "title": "15\" MacBook Pro  Retina Replacement Display Screen Assembly | A1398 Late 2013 - Mid 2014  (used)",
    "price": "R5999.00",
    "priceNum": 5999,
    "image": "/images/macbook-parts-screens/17.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504714150006,
    "title": "13\" MacBook Pro Retina Touch Bar  Replacement Display Screen Assembly | A1706 Late 2016 - 2017  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/18.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4446065623158,
    "title": "15\" MacBook Pro Retina  Replacement Display Screen Assembly | A1398 Mid 2015  (used)",
    "price": "R6999.00",
    "priceNum": 6999,
    "image": "/images/macbook-parts-screens/19.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4446060904566,
    "title": "11\" MacBook Air Replacement Display Screen Assembly | A1465 Year Early 2013 - MID 2015  (used)",
    "price": "R3999.00",
    "priceNum": 3999,
    "image": "/images/macbook-parts-screens/20.webp",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  }
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
