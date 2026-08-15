import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9949062201592,
    "title": "iPhone XS Max OLED Screen Assembly (OEM)",
    "price": "R3898.00",
    "priceNum": 3898.0,
    "image": "/images/gadget-screens/AS006678.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9200497492216,
    "title": "Privacy Anti-Glare Fingerprint Unlock Available Full Screen Tempered Glass Screen Protector for Samsung Galaxy S25 Ultra Black",
    "price": "R299.00",
    "priceNum": 299.0,
    "image": "/images/gadget-screens/AS167944A.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4513242284150,
    "title": "iPhone 7 LCD Screen and Digitizer - White (Premium Aftermarket)",
    "price": "R690.00",
    "priceNum": 690.0,
    "image": "/images/gadget-screens/iphone7-W.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4513236582518,
    "title": "iPhone 6s LCD Screen and Digitizer - Black (Premium Aftermarket)",
    "price": "R1799.00",
    "priceNum": 1799.0,
    "image": "/images/gadget-screens/iPhone6sLCDScreenandDigitizerBlack.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949067280632,
    "title": "iPhone XS OLED Screen Assembly (OEM)",
    "price": "R3284.00",
    "priceNum": 3284.0,
    "image": "/images/gadget-screens/AS006680_c072c64e-184b-4673-9b66-7a63f0e0ae5b.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949057450232,
    "title": "iPhone XS Max LCD (Incell) Screen Assembly (Premium)",
    "price": "R1388.00",
    "priceNum": 1388.0,
    "image": "/images/gadget-screens/AS103493_3bd97ded-468a-4f01-9641-da3766d7a4b4.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949059252472,
    "title": "iPhone XS Max LCD (Incell) Screen Assembly (Premium)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-screens/AS074548.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949058400504,
    "title": "iPhone XS Max LCD (Incell) Screen Assembly (Premium)",
    "price": "R1718.00",
    "priceNum": 1718.0,
    "image": "/images/gadget-screens/AS086397_7f7b829b-cf94-4d24-b0cc-077f23e8c23e.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949063315704,
    "title": "iPhone XS LCD (Incell) Screen Assembly (Premium)",
    "price": "R1292.00",
    "priceNum": 1292.0,
    "image": "/images/gadget-screens/AS103495_22a33a52-d456-432b-a90b-5a0b9c0b83c6.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949070393592,
    "title": "iPhone XR LCD Screen Assembly (Refurbished)",
    "price": "R2268.00",
    "priceNum": 2268.0,
    "image": "/images/gadget-screens/AS104927_a9e17120-f276-4d82-8fd8-9109f3dff083.png",
    "category": "Gadget Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949074489592,
    "title": "iPhone XR LCD Screen Assembly (OEM)",
    "price": "R2268.00",
    "priceNum": 2268.0,
    "image": "/images/gadget-screens/AS048878_c6357d2e-5807-48ec-91a8-f7cc9005a8fa.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949069541624,
    "title": "iPhone XR LCD (Incell) Screen Assembly (Premium)",
    "price": "R2268.00",
    "priceNum": 2268.0,
    "image": "/images/gadget-screens/AS130754_ba9456a3-c6df-4423-9aed-3f51b012b470.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949072294136,
    "title": "iPhone XR LCD (Incell) Screen Assembly (Premium)",
    "price": "R2268.00",
    "priceNum": 2268.0,
    "image": "/images/gadget-screens/AS086399_83d07a3c-a784-4bf6-aa40-eab17b088e92.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949071409400,
    "title": "iPhone XR LCD (Incell) Screen Assembly (Premium)",
    "price": "R2268.00",
    "priceNum": 2268.0,
    "image": "/images/gadget-screens/AS103489_0f27fa3d-e0a6-46c5-9b6b-f53174b82bda.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949080584440,
    "title": "iPhone X OLED Screen Assembly (OEM)",
    "price": "R3960.00",
    "priceNum": 3960.0,
    "image": "/images/gadget-screens/AS002606_7d6fda74-9799-4056-9755-501de303f2f6.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949079175416,
    "title": "iPhone X LCD (Incell) Screen Assembly (Premium)",
    "price": "R3570.00",
    "priceNum": 3570.0,
    "image": "/images/gadget-screens/AS074546.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4513256767606,
    "title": "iPhone X LCD Screen and Digitizer (Premium Aftermarket)",
    "price": "R2800.00",
    "priceNum": 2800.0,
    "image": "/images/gadget-screens/iphone-x-lcd-and-touch-screen-replacement-1.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949077471480,
    "title": "iPhone X LCD (Incell) Screen Assembly (Premium)",
    "price": "R3570.00",
    "priceNum": 3570.0,
    "image": "/images/gadget-screens/AS103496.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949078159608,
    "title": "iPhone X LCD (Incell) Screen Assembly (Premium)",
    "price": "R3570.00",
    "priceNum": 3570.0,
    "image": "/images/gadget-screens/AS086395_08b6e0eb-2a98-439f-b95f-21e360838705.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949082779896,
    "title": "iPhone 8 Plus LCD Screen Assembly (Refurbished)",
    "price": "R3284.00",
    "priceNum": 3284.0,
    "image": "/images/gadget-screens/AS005426_715e7b6a-3127-4bbc-9135-4acf5c983ae6.png",
    "category": "Gadget Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949083599096,
    "title": "iPhone 8 Plus LCD Screen Assembly (Refurbished)",
    "price": "R3284.00",
    "priceNum": 3284.0,
    "image": "/images/gadget-screens/AS005425_cfe78369-601a-40a8-81f9-82e765d783ce.png",
    "category": "Gadget Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949085073656,
    "title": "iPhone 8 Plus LCD Screen Assembly (Premium)",
    "price": "R844.00",
    "priceNum": 844.0,
    "image": "/images/gadget-screens/AS003297_b8506f01-a297-440b-bdd8-9c54f4232e13.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949086548216,
    "title": "iPhone 8 LCD Screen Assembly (Refurbished)",
    "price": "R1606.00",
    "priceNum": 1606.0,
    "image": "/images/gadget-screens/AS102052_e3a09c0b-0e23-4e2d-aa63-8f2c80b125d6.png",
    "category": "Gadget Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949096050936,
    "title": "iPhone 8 LCD Screen Assembly (Premium)",
    "price": "R1606.00",
    "priceNum": 1606.0,
    "image": "/images/gadget-screens/AS003293_0c21d0bd-e71d-41c4-914f-6b6e06133e94.png",
    "category": "Gadget Screens",
    "isUsed": false,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopGadgetScreens() {
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
          Home &gt; Gadget Screens
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Gadget Screens</h1>
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
