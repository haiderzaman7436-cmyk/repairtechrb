import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9949081960696,
    "title": "iPhone 8 Plus Back Cover (Black) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949073604856,
    "title": "iPhone XR Back Cover (Black) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS056177.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949072851192,
    "title": "iPhone XR Back Cover (Black) (OEM)",
    "price": "R2464.00",
    "priceNum": 2464.0,
    "image": "/images/gadget-covers/AS077503.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949059842296,
    "title": "iPhone XS Max Back Cover (White) (OEM)",
    "price": "R2996.00",
    "priceNum": 2996.0,
    "image": "/images/gadget-covers/AS052405.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949065249016,
    "title": "iPhone XS Back Cover (Black) (OEM)",
    "price": "R1860.00",
    "priceNum": 1860.0,
    "image": "/images/gadget-covers/AS051890.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949096968440,
    "title": "iPhone 7 Plus Back Cover (White) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS071010_3af65f08-5818-4c02-a477-97d635efd1c3.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949096509688,
    "title": "iPhone 7 Plus Back Cover (Black) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS071011_e1fa6861-5940-4f45-9dcb-d7076406a0aa.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949090578680,
    "title": "iPhone 8 Back Cover (Black) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS053710.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948797239544,
    "title": "iPhone 16e Back Cover (White) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS161982_41d726ce-eb07-4f47-9af9-2d85f86db57a.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948795404536,
    "title": "iPhone 16e Back Cover (White) (OEM)",
    "price": "R1596.00",
    "priceNum": 1596.0,
    "image": "/images/gadget-covers/AS165594.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4510269112438,
    "title": "iPhone 6 LCD Screen and Digitizer - White (Premium Aftermarket)",
    "price": "R575.00",
    "priceNum": 575.0,
    "image": "/images/gadget-covers/iphone6-W_f04eb2c9-0422-4d4f-a080-3bba73164415.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4510241325174,
    "title": "iPhone 6 LCD Screen and Digitizer - Black (Premium Aftermarket)",
    "price": "R575.00",
    "priceNum": 575.0,
    "image": "/images/gadget-covers/iphone6.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948796125432,
    "title": "iPhone 16e Back Cover (Black) (OEM)",
    "price": "R1424.00",
    "priceNum": 1424.0,
    "image": "/images/gadget-covers/AS165593.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799533304,
    "title": "iPhone 16 Pro Max Back Cover (White Titanium) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS154836_b524fe6d-3315-4380-baf3-27819db0c265.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948797632760,
    "title": "iPhone 16e Back Cover (Black) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS161981.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799172856,
    "title": "iPhone 16 Pro Max Back Cover (White Titanium) (OEM)",
    "price": "R1706.00",
    "priceNum": 1706.0,
    "image": "/images/gadget-covers/AS161567.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799467768,
    "title": "iPhone 16 Pro Max Back Cover (Natural Titanium) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS155668_b755f3f4-7bb2-4a55-bce3-562240ad712f.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799140088,
    "title": "iPhone 16 Pro Max Back Cover (Natural Titanium) (OEM)",
    "price": "R1706.00",
    "priceNum": 1706.0,
    "image": "/images/gadget-covers/AS161568_ee34d72a-1290-4539-b207-94abc84fb456.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799303928,
    "title": "iPhone 16 Pro Max Back Cover (Natural Titanium) (OEM)",
    "price": "R1532.00",
    "priceNum": 1532.0,
    "image": "/images/gadget-covers/AS160005.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799402232,
    "title": "iPhone 16 Pro Max Back Cover (Desert Titanium) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS155669_5bdc2b86-3ab8-4489-8c10-929f2a8efcf8.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799369464,
    "title": "iPhone 16 Pro Max Back Cover (Desert Titanium) (OEM)",
    "price": "R1532.00",
    "priceNum": 1532.0,
    "image": "/images/gadget-covers/AS160002_a4aaefa1-cb04-44ab-b427-7e56722d7ff6.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799500536,
    "title": "iPhone 16 Pro Max Back Cover (Black Titanium) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-covers/AS155667.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799238392,
    "title": "iPhone 16 Pro Max Back Cover (Black Titanium) (OEM)",
    "price": "R1706.00",
    "priceNum": 1706.0,
    "image": "/images/gadget-covers/AS161566_ba5148a1-1cd2-4378-8380-4602de9de5e5.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799336696,
    "title": "iPhone 16 Pro Max Back Cover (Black Titanium) (OEM)",
    "price": "R1578.00",
    "priceNum": 1578.0,
    "image": "/images/gadget-covers/AS160004.webp",
    "category": "Gadget Covers",
    "isUsed": false,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopGadgetCovers() {
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
          Home &gt; Gadget Back Covers
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Gadget Back Covers</h1>
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
