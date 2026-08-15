import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 9952736280824,
    "title": "AMD Ryzen 7 9850X3D \u2014 Desktop CPU (New)",
    "price": "R11710.00",
    "priceNum": 11710.0,
    "image": "/images/components/01_cd7de4ce-9090-477d-9181-d80a5a88f34d.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952737329400,
    "title": "AMD Ryzen 7 5700G \u2014 8-Core AM4 Desktop Processor (New)",
    "price": "R5375.00",
    "priceNum": 5375.0,
    "image": "/images/components/01_451142fb-bff5-41a4-ab9e-b624f9796414.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736575736,
    "title": "AMD Ryzen 7 8700G \u2014 AM5 8-Core Processor with Radeon 780M (New)",
    "price": "R6791.00",
    "priceNum": 6791.0,
    "image": "/images/components/01_5edb7982-a7ab-40e7-ab40-b6d2e5468e76.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952737067256,
    "title": "AMD Ryzen 7 7800X3D \u2014 8-Core AM5 Processor (New)",
    "price": "R9493.00",
    "priceNum": 9493.0,
    "image": "/images/components/01_e16a3acd-9aaf-4171-8d60-ba2a28272171.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10170089938,
    "title": "IBM System X 1TB 9ZM273-039 42D0781 7200RPM 6Gb/s SAS 3.5\" Hard Drive with Caddy (Pre-owned)",
    "price": "R950.00",
    "priceNum": 950.0,
    "image": "/images/components/1tb_IBM.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736444664,
    "title": "AMD Ryzen 5 7400 | 6-Core | 3.3GHz | AM5 Socket \u2014 Processor (New)",
    "price": "R4077.00",
    "priceNum": 4077.0,
    "image": "/images/components/01_fa323ec1-ab3b-4667-b31e-7701c14c06a6.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736542968,
    "title": "AMD Ryzen 5 9600X \u2014 6-Core AM5 Desktop CPU (New)",
    "price": "R5552.00",
    "priceNum": 5552.0,
    "image": "/images/components/01_07b19565-80a0-4245-9c47-453c259eec17.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736706808,
    "title": "AMD Ryzen 9 9900X3D \u2014 12-Core AM5 Processor (New)",
    "price": "R13468.00",
    "priceNum": 13468.0,
    "image": "/images/components/01_b6cedc25-0e1f-4c95-855c-0b5f2dd5c611.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736346360,
    "title": "AMD Ryzen 7 8700F \u2014 8-Core AM5 Processor (New)",
    "price": "R6543.00",
    "priceNum": 6543.0,
    "image": "/images/components/01_15792ce2-f3cc-4779-9462-895b6b52afad.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9953681801464,
    "title": "AMD Ryzen 9 9950X3D2 Dual Edition | 16-Core | 4.3GHz | AM5 (New)",
    "price": "R21073.00",
    "priceNum": 21073.0,
    "image": "/images/components/01_ebc5c0c1-0131-4f92-b86a-83aa8c1a9a25.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952738083064,
    "title": "AMD Ryzen 7 9700X \u2014 8-Core AM5 Processor (New)",
    "price": "R8018.00",
    "priceNum": 8018.0,
    "image": "/images/components/01_6f3c3c53-78bf-411c-933f-627833841498.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736936184,
    "title": "AMD Ryzen 9 9900X | 12-Core | 4.4GHz | AM5 (New)",
    "price": "R9623.00",
    "priceNum": 9623.0,
    "image": "/images/components/01_3fd83e64-92d6-441d-b637-6c91ba7b400f.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736477432,
    "title": "AMD Ryzen 9 9950X3D \u2014 Desktop Processor (New)",
    "price": "R16974.00",
    "priceNum": 16974.0,
    "image": "/images/components/01_36f043dc-c02c-451c-b276-ff2c81c5f75c.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736739576,
    "title": "AMD Ryzen 5 8600G | 6-Core / 12-Thread | 4.3GHz Base, up to 5.0GHz | AM5 | Radeon Graphics (New)",
    "price": "R4289.00",
    "priceNum": 4289.0,
    "image": "/images/components/01_a39fd6f1-1c16-4b1f-b5c2-b17d249532fb.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952737755384,
    "title": "AMD Ryzen 7 9800X3D \u2014 8-Core AM5 Processor (New)",
    "price": "R11346.00",
    "priceNum": 11346.0,
    "image": "/images/components/01_0eec2e53-e015-4610-9e97-6ce02d61e793.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736411896,
    "title": "AMD Ryzen 5 8500G \u2014 6-Core AM5 Processor with Radeon Graphics (New)",
    "price": "R4726.00",
    "priceNum": 4726.0,
    "image": "/images/components/01_7e14df24-4bff-423f-84b9-ff5cca73ced6.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7994071515384,
    "title": "Intel\u00ae Xeon\u00ae Silver 4208 Processor (Pre-owned)",
    "price": "R4999.00",
    "priceNum": 4999.0,
    "image": "/images/components/Xeon4208.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952737100024,
    "title": "Intel Core i7-14700 | 20 Cores | LGA1700 | 2.1GHz | DDR5 (New)",
    "price": "R9894.00",
    "priceNum": 9894.0,
    "image": "/images/components/01_fece26a2-b4c6-42c8-9973-30c1a59e5d12.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952737788152,
    "title": "AMD Ryzen 5 7600 \u2014 6-Core AM5 Processor (New)",
    "price": "R4938.00",
    "priceNum": 4938.0,
    "image": "/images/components/01_1bf2b293-edb9-41b7-bd0a-dce6e776c2a3.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952736837880,
    "title": "AMD Ryzen 5 8400F \u2014 6-Core AM5 Processor (New)",
    "price": "R3947.00",
    "priceNum": 3947.0,
    "image": "/images/components/01_933948e2-2d1f-4926-92e9-65bf1822f212.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952737460472,
    "title": "AMD Ryzen 5 7500X3D \u2014 AM5 Processor (New)",
    "price": "R6166.00",
    "priceNum": 6166.0,
    "image": "/images/components/01_16c84a79-07d6-4f49-9fa4-bb0b2cc622e5.jpg",
    "category": "Components",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952674873592,
    "title": "Used Intel Core I3-3220 - Processor Only (Used)",
    "price": "R700.00",
    "priceNum": 700.0,
    "image": "/images/components/intel-core-i3-3220.jpg",
    "category": "Components",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopComponents() {
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
          Home &gt; PC Components
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>PC Components</h1>
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
            
            <div className="seo-text-box" style={{ marginTop: '4rem' }}>
              <p>Build or upgrade your dream PC with our wide selection of components. We stock everything from high-performance graphics cards (GPUs) and processors (CPUs) to power supplies, motherboards, and cooling solutions to keep your system running at its best.</p>
              <p>Whether you are putting together a brand new gaming rig or just replacing a faulty part on your office desktop, our new and professionally refurbished components provide you with reliable options that fit any budget.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
