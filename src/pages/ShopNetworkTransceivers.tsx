import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9072837820664,
    "title": "Cisco ONS-SI-GE-SX 1000 Base SFP Transceiver Module",
    "price": "R999.00",
    "priceNum": 999.0,
    "image": "/images/network-transceivers/CISCOONS-SI-GE-SX.webp",
    "category": "Network Transceivers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9178003276024,
    "title": "Cisco GLC-TE= 1000BASE-T SFP Transceiver Module 100m Copper RJ45 (Hologram)",
    "price": "R1610.00",
    "priceNum": 1610.0,
    "image": "/images/network-transceivers/GLC-TE-1-800x800.webp",
    "category": "Network Transceivers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9062918422776,
    "title": "Cisco QSFP-100G-SR4-S 100GB BASE-SR4 860nm MMF Optical QSFP Transceiver",
    "price": "R4600.00",
    "priceNum": 4600.0,
    "image": "/images/network-transceivers/Cisco-QSFP-100G-SR4-S-Transceiver-1__34261.webp",
    "category": "Network Transceivers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9059336814840,
    "title": "Cisco ONS-SC+-10G-SR 10GB SFP+ SR Transceiver Module",
    "price": "R999.00",
    "priceNum": 999.0,
    "image": "/images/network-transceivers/s-l1600_9.webp",
    "category": "Network Transceivers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9177790251256,
    "title": "Cisco SFP-10G-LR-S 10GBASE-LR SFP+ Transceiver Module with Hologram",
    "price": "R1610.00",
    "priceNum": 1610.0,
    "image": "/images/network-transceivers/CiscoSFP-10G-LR-S10GBASE-LRSFP_TransceiverModulewithHologram3.webp",
    "category": "Network Transceivers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9115760034040,
    "title": "Cisco XFP10GLR-192SR-L 10-2542-01 | 10GBaseLR/LW Transceiver Module with Hologram",
    "price": "R2500.00",
    "priceNum": 2500.0,
    "image": "/images/network-transceivers/XFP10GLR-192SR-L_3.webp",
    "category": "Network Transceivers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952792281336,
    "title": "HP AJ718A Compatible 8Gb Fibre Channel SW SFP+ Transceiver \u2014 Optical Transceiver (Refurbished)",
    "price": "R2200.00",
    "priceNum": 2200.0,
    "image": "/images/network-transceivers/01_b21d0048-9d91-4e3d-bec6-ae0767896660.webp",
    "category": "Network Transceivers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952799817976,
    "title": "HP AJ716B 8Gb Short-Wave Fibre Channel SFP+ Transceiver \u2014 Transceiver (Refurbished)",
    "price": "R1050.00",
    "priceNum": 1050.0,
    "image": "/images/network-transceivers/01_90292cb6-a424-4181-9888-c0a6172f4c1e.webp",
    "category": "Network Transceivers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9059318431992,
    "title": "Cisco XFP10GLR-192SR-L 10-2542-01 | 10GBaseLR/LW Transceiver Module (Used)",
    "price": "R1150.00",
    "priceNum": 1150.0,
    "image": "/images/network-transceivers/XFP10GLR-192SR-L.webp",
    "category": "Network Transceivers",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952799719672,
    "title": "Avaya FTLX8571D3BNL-N2 10GBASE-SR/SW 850nm SFP+ Optical Transceiver \u2014 Transceiver Module (Refurbished)",
    "price": "R1150.00",
    "priceNum": 1150.0,
    "image": "/images/network-transceivers/16.1.webp",
    "category": "Network Transceivers",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopNetworkTransceivers() {
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
          Home &gt; Network Transceivers
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Network Transceivers</h1>
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
