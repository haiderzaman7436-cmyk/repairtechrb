import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9948931391736,
    "title": "iPhone SE 2022 Charging Port Flex (Premium)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS119688_e4f37ff3-b407-4087-8aa9-a826af314f86.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949060792568,
    "title": "iPhone XS Max Charging Port Flex (Premium)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS007334.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949066264824,
    "title": "iPhone XS Charging Port Flex (Premium)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS007541.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949075505400,
    "title": "iPhone XR Charging Port Flex (Premium)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS007736.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949081207032,
    "title": "iPhone 8 Plus Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS069658.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949064429816,
    "title": "iPhone XS Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS069662_179f034f-dae2-44e2-a4ef-ea04ff14eabc.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949028483320,
    "title": "iPhone SE 2020 Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS105244.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949089431800,
    "title": "iPhone 8 Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS069655.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949099000056,
    "title": "iPhone 7 Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS069647.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949089988856,
    "title": "iPhone 8 Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS069654.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949098443000,
    "title": "iPhone 7 Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS069648.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949088841976,
    "title": "iPhone 8 Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS069656.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948798877944,
    "title": "iPhone 16 Pro Max Charging Port Flex (Used, Grade A)",
    "price": "R781.00",
    "priceNum": 781.0,
    "image": "/images/gadget-ports/AS168194_5c4a8c16-bc37-46ca-84a2-bb639a7b8042.webp",
    "category": "Gadget Ports",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9948798484728,
    "title": "iPhone 16e Charging Port Flex (Premium)",
    "price": "R1136.00",
    "priceNum": 1136.0,
    "image": "/images/gadget-ports/AS161957_dd8d6e87-6968-4efd-a6b0-3a14dbc80bcf.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948798845176,
    "title": "iPhone 16e Charging Port Flex (Premium)",
    "price": "R1392.00",
    "priceNum": 1392.0,
    "image": "/images/gadget-ports/AS161956_40aa9bc2-8a28-45f3-b595-1ed939d3a008.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948800418040,
    "title": "iPhone 16 Pro Max Charging Port Flex (Premium)",
    "price": "R1136.00",
    "priceNum": 1136.0,
    "image": "/images/gadget-ports/AS150871.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948801073400,
    "title": "iPhone 16 Pro Max Charging Port Flex (Premium)",
    "price": "R1200.00",
    "priceNum": 1200.0,
    "image": "/images/gadget-ports/AS150870_099d3c4c-a285-44c3-8072-922901596b15.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948810674424,
    "title": "iPhone 16 Pro Charging Port Flex (Premium)",
    "price": "R1082.00",
    "priceNum": 1082.0,
    "image": "/images/gadget-ports/AS151678_d600ac06-ace5-4657-bf8b-c0415767168b.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948799828216,
    "title": "iPhone 16 Pro Max Charging Port Flex (Premium)",
    "price": "R1040.00",
    "priceNum": 1040.0,
    "image": "/images/gadget-ports/AS150872_b4aacf74-1ceb-425d-8e37-09de23778589.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948812542200,
    "title": "iPhone 16 Plus Charging Port Flex (Premium)",
    "price": "R1328.00",
    "priceNum": 1328.0,
    "image": "/images/gadget-ports/AS151708_3549b095-6579-4b76-9c25-949aafbe3409.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948836462840,
    "title": "iPhone 15 Pro Max Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS134748.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948839411960,
    "title": "iPhone 15 Pro Max Charging Port Flex (Premium)",
    "price": "R1456.00",
    "priceNum": 1456.0,
    "image": "/images/gadget-ports/AS134601_8b3a1c97-7aca-457b-a297-3c513e2baf78.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948821881080,
    "title": "iPhone 16 Charging Port Flex (Used, Grade A)",
    "price": "R717.00",
    "priceNum": 717.0,
    "image": "/images/gadget-ports/AS168178.webp",
    "category": "Gadget Ports",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9948835873016,
    "title": "iPhone 15 Pro Max Charging Port Flex (OEM)",
    "price": "R934.00",
    "priceNum": 934.0,
    "image": "/images/gadget-ports/AS134602.webp",
    "category": "Gadget Ports",
    "isUsed": false,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopGadgetPorts() {
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
          Home &gt; Gadget Charging Ports
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Gadget Charging Ports</h1>
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
