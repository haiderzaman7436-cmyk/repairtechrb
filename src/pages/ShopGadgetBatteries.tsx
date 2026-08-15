import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9949063905528,
    "title": "iPhone XS Replacement Battery (Premium)",
    "price": "R954.00",
    "priceNum": 954.0,
    "image": "/images/gadget-batteries/AS080898_d5a6e522-5b80-465b-ac25-f1be28e8d278.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949076193528,
    "title": "iPhone X Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS127750_ac80a96f-8021-48a2-b23d-a52d022e0643.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948794585336,
    "title": "iPhone 16e Replacement Battery (Premium)",
    "price": "R3537.00",
    "priceNum": 3537.0,
    "image": "/images/gadget-batteries/AS161965_61efa6f9-a20f-4fc0-a984-a4abe317aa84.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948931424504,
    "title": "iPhone SE 2022 Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS111136_040023da-f9ea-4547-a54c-f681f17efa64.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949029204216,
    "title": "iPhone SE 2020 Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS067692.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949091692792,
    "title": "iPhone 8 Replacement Battery (Premium)",
    "price": "R650.00",
    "priceNum": 650.0,
    "image": "/images/gadget-batteries/AS005505.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949092249848,
    "title": "iPhone 8 Replacement Battery (OEM)",
    "price": "R722.00",
    "priceNum": 722.0,
    "image": "/images/gadget-batteries/AS005392_72e66742-784b-41d6-83e7-862b0eedad87.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949027795192,
    "title": "iPhone SE 2020 Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS127736.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4506066911350,
    "title": "iPhone 8 Plus Li-Ion Replacement Battery 2691mAh",
    "price": "R450.00",
    "priceNum": 450.0,
    "image": "/images/gadget-batteries/iPhone8PlusLi-IonReplacementBattery2691mAh.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949085663480,
    "title": "iPhone 8 Replacement Battery (OEM)",
    "price": "R722.00",
    "priceNum": 722.0,
    "image": "/images/gadget-batteries/AS127753.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949084123384,
    "title": "iPhone 8 Plus Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS005391.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949081960696,
    "title": "iPhone 8 Plus Back Cover (Black) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-batteries/AS053711.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949090578680,
    "title": "iPhone 8 Back Cover (Black) (OEM)",
    "price": "R1128.00",
    "priceNum": 1128.0,
    "image": "/images/gadget-batteries/AS053710.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949099983096,
    "title": "iPhone 7 Replacement Battery (OEM)",
    "price": "R722.00",
    "priceNum": 722.0,
    "image": "/images/gadget-batteries/AS005394.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949101261048,
    "title": "iPhone 6S Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS005396.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949100703992,
    "title": "iPhone 6S Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS127759.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4506056654966,
    "title": "iPhone 6s Plus Li-Ion Replacement Battery 2750mAh",
    "price": "R299.00",
    "priceNum": 299.0,
    "image": "/images/gadget-batteries/iPhone6sPlusLi-IonReplacementBattery2750mAh-2.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948822733048,
    "title": "iPhone 16 Replacement Battery (Premium)",
    "price": "R2122.00",
    "priceNum": 2122.0,
    "image": "/images/gadget-batteries/AS165697_86ee2ff9-d9e6-4826-801f-09a726d0fc45.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948801827064,
    "title": "iPhone 16 Pro Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS152692.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948813459704,
    "title": "iPhone 16 Plus Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS152694.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948798943480,
    "title": "iPhone 16 Pro Max Replacement Battery (OEM)",
    "price": "R1156.00",
    "priceNum": 1156.0,
    "image": "/images/gadget-batteries/AS152690.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948814246136,
    "title": "iPhone 16 Plus Replacement Battery (Premium)",
    "price": "R3006.00",
    "priceNum": 3006.0,
    "image": "/images/gadget-batteries/AS165698_527ea45f-012f-42b3-9b2b-bd5bfb0f5410.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948880109816,
    "title": "iPhone 15 Replacement Battery (OEM)",
    "price": "R1060.00",
    "priceNum": 1060.0,
    "image": "/images/gadget-batteries/AS139199_55a3d2e5-90c3-4d39-92db-b3aa2832731e.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9948854419704,
    "title": "iPhone 15 Pro Replacement Battery (Premium)",
    "price": "R2212.00",
    "priceNum": 2212.0,
    "image": "/images/gadget-batteries/AS133391.png",
    "category": "Gadget Batteries",
    "isUsed": false,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopGadgetBatteries() {
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
          Home &gt; Gadget Batteries
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Gadget Batteries</h1>
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
