import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP MEMORY', title: 'Pre-owned 512MB DDR2 Laptop Memory RAM', price: 'R 30.00', priceNum: 30, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP MEMORY', title: 'Pre-owned 1GB DDR2 Laptop Memory RAM', price: 'R 120.00', priceNum: 120, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP MEMORY', title: '1GB DDR3 Laptop Memory RAM', price: 'R 250.00', priceNum: 250, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80' },
  { id: 4, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'Pre-owned SAMSUNG 2GB PC3-10600S Mac Rounded Laptop Memory RAM...', price: 'R 230.00', priceNum: 230, image: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&w=400&q=80' },
  { id: 5, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'SAMSUNG 2GB PC3-10600S Mac Rounded Laptop Memory...', price: 'R 250.00', priceNum: 250, image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80' },
  { id: 6, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'SAMSUNG 4GB PC3-12800S Mac Rounded Notebook...', price: 'R 250.00', priceNum: 250, image: 'https://images.unsplash.com/photo-1597673030062-8a3915bc8210?auto=format&fit=crop&w=400&q=80' },
  { id: 7, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'Pre-owned 8GB DDR3 1600MHz Mac Rounded Laptop Memory RAM...', price: 'R 790.00', priceNum: 790, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
  { id: 8, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '8GB DDR4 2133MHz SO-DIMM Notebook Laptop Memory RAM', price: 'R 1,150.00', priceNum: 1150, image: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&w=400&q=80' },
  { id: 9, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '8GB DDR4 2400MHz SO-DIMM Notebook Laptop Memory RAM | NANYA...', price: 'R 1,150.00', priceNum: 1150, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80' },
  { id: 10, inStock: true, isUsed: false, category: 'APPLE MAC MEMORY', title: '8GB DDR4 2400MHz SO-DIMM Notebook Laptop Memory RAM Brands...', price: 'R 1,150.00', priceNum: 1150, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80' },
  { id: 11, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '8GB DDR4 2666MHz PC4-12800S SO-DIMM 260-Pin Assorted Brands...', price: 'R 1,150.00', priceNum: 1150, image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80' },
  { id: 12, inStock: true, isUsed: false, category: 'APPLE MAC MEMORY', title: '8GB DDR4 2666MHz SO-DIMM Notebook Laptop Memory Mac Brands...', price: 'R 1,150.00', priceNum: 1150, image: 'https://images.unsplash.com/photo-1597673030062-8a3915bc8210?auto=format&fit=crop&w=400&q=80' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP MEMORY', title: 'Kingston 16GB KVR32S22D8/16 260-Pin PC4-25600 3200MHz Laptop Memory...', price: 'R 2,200.00', priceNum: 2200, image: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&w=400&q=80' },
  { id: 14, inStock: false, isUsed: true, category: 'LAPTOP MEMORY', title: 'Pre-owned 4GB DDR3 Laptop Memory RAM', price: 'R 450.00', priceNum: 450, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' }
];

const ITEMS_PER_PAGE = 8;

export default function ShopCategory() {
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
    setCurrentPage(1); // Reset page on filter change
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

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      // Condition Filter (Mapping New/Used to product.isUsed)
      if (filters.condition.length > 0) {
        const isNewAllowed = filters.condition.includes('New');
        const isUsedAllowed = filters.condition.includes('Used');
        if (product.isUsed && !isUsedAllowed) return false;
        if (!product.isUsed && !isNewAllowed) return false;
      }
      
      // Availability Filter
      if (filters.availability.length > 0) {
        const inStockAllowed = filters.availability.includes('In Stock');
        const onOrderAllowed = filters.availability.includes('On Order');
        if (product.inStock && !inStockAllowed) return false;
        if (!product.inStock && !onOrderAllowed) return false;
      }

      // Price Range Filter
      if (product.priceNum < appliedPriceRange.min || product.priceNum > appliedPriceRange.max) {
        return false;
      }

      // We skip Location and Grade filtering for the mockup since products don't have those properties
      
      return true;
    });
  }, [filters, appliedPriceRange]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-ascending') return a.priceNum - b.priceNum;
      if (sortBy === 'price-descending') return b.priceNum - a.priceNum;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      // 'latest' would be by ID descending in this mockup
      return b.id - a.id; 
    });
  }, [filteredProducts, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb" style={{ margin: '2rem 0 1rem', fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
          Home &gt; Laptop Memory
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Laptop Memory</h1>
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
                  {paginatedProducts.map(product => (
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
            
            <div className="seo-text-box" style={{ marginTop: '4rem' }}>
              <p>Whether for your computer's lifespan, the easiest and most cost-effective way to get more performance from your laptop is by upgrading your system memory. Memory upgrades help make multitasking easier, running everything smoother, and getting the most out of your hardware.</p>
              <p>With prices for memory falling there is no better time to stock up and go bigger. You can select from a wide assortment of speeds, capacities whether 2GB DDR2, 4GB DDR3, 16GB DDR4 or 32GB PC RAM in the market currently up with MAC memory, USED AND NEW MEMORY, KINGSTON STANDARD, CRUCIAL AND OTHER BRANDS, we have the right solution for your computers upgrades needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
