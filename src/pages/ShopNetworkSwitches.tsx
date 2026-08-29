import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9952827998456,
    "title": "D-Link DES-1024D 24-Port Fast Ethernet Switch \u2014 Rackmount Switch (Refurbished)",
    "price": "R1000.00",
    "priceNum": 1000.0,
    "image": "/images/network-switches/01_67ac9bc0-76d0-49fe-bcaf-950efea8fca9.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952762298616,
    "title": "Netgear JGS524 V1 ProSafe 24-Port Gigabit Switch \u2014 Unmanaged Switch (Refurbished)",
    "price": "R1500.00",
    "priceNum": 1500.0,
    "image": "/images/network-switches/01_15d75481-f4a2-42f5-a9f5-8c0d2adacefa.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952772751608,
    "title": "3Com 3CR17501-91 SuperStack 3 Switch 3250 \u2014 48-Port Fast Ethernet Switch (Used)",
    "price": "R1700.00",
    "priceNum": 1700.0,
    "image": "/images/network-switches/01_b5272ebc-a712-4ea3-99ca-ca1b8a04f5de.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952811581688,
    "title": "HP StorageWorks 8/24 SAN Switch \u2014 Fibre Channel Switch (Refurbished)",
    "price": "R4130.00",
    "priceNum": 4130.0,
    "image": "/images/network-switches/01_d39acb47-8aa3-4298-89ae-fc9374bd7c2e.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952800571640,
    "title": "HP StorageWorks 8/8 SAN Switch (HSTNM-N019) \u2014 8Gb Fibre Channel Switch (Used)",
    "price": "R7670.00",
    "priceNum": 7670.0,
    "image": "/images/network-switches/01_020f536d-5a74-4378-b29b-58b48cff9e16.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7722388062456,
    "title": "TPS62177DQCR TPS62177DQCT Power Switch ICs Switching Voltage Regulator 28V 0.5A SD Cnvtr",
    "price": "R150.00",
    "priceNum": 150.0,
    "image": "/images/network-switches/TPS62177DQCR.webp",
    "category": "Network Switches",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9953804714232,
    "title": "Huawei S6730-H24X6C \u2014 Layer 3 Ethernet Switch (Refurbished)",
    "price": "R24750.00",
    "priceNum": 24750.0,
    "image": "/images/network-switches/01_f7c2e48e-3364-4415-9546-55d452567d4b.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952772063480,
    "title": "Dell 4322DS \u2014 32-Port KVM Switch (Refurbished)",
    "price": "R5900.00",
    "priceNum": 5900.0,
    "image": "/images/network-switches/01_40687f83-247b-49b1-b835-5144092c0e95.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952762560760,
    "title": "TRENDnet TEG-S224TXA \u2014 26-Port Rackmount Switch (Refurbished)",
    "price": "R1750.00",
    "priceNum": 1750.0,
    "image": "/images/network-switches/01_bcd6f128-a895-460b-a1f8-8f7f940eab2a.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952775799032,
    "title": "Huawei ATN 905 \u2014 Ethernet Access Switch (Refurbished)",
    "price": "R3125.00",
    "priceNum": 3125.0,
    "image": "/images/network-switches/01_619c5374-38ae-430b-8eef-7ba54ab3728d.webp",
    "category": "Network Switches",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopNetworkSwitches() {
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
          Home &gt; Network Switches
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Network Switches</h1>
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
