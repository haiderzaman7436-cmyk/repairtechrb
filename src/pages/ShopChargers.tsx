import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: 'Solid state Acer/Asus/Lenovo laptop charger 19V 3.42A Square...', price: 'R 250.00', priceNum: 250, image: '/images/charger_1.png' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '19V 2.37A Asus/Toshiba/Lenovo Square Power Supply / 45W As...', price: 'R 270.00', priceNum: 270, image: '/images/charger_2.png' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '19V Laptop Charger for Asus / Lenovo / Asus EEE PC (Square / 45W...', price: 'R 250.00', priceNum: 250, image: '/images/charger_3.png' },
  { id: 4, inStock: true, isUsed: false, category: 'MACBOOK CHARGERS', title: 'Apple Mac MagSafe L-Shape 45w Type C to Mag...', price: 'R 390.00', priceNum: 390, image: '/images/charger_1.png' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '45W Dell Replacement AC Adapter Laptop Charger 19.5V 2.31A 4.5*3.0mm...', price: 'R 450.00', priceNum: 450, image: '/images/charger_2.png' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '45w HP/Dell/Asus/Lenovo Laptop Charger 19.5V, 2.31A, 4.5*3.0mm...', price: 'R 450.00', priceNum: 450, image: '/images/charger_3.png' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '45W Lenovo / ThinkPad 20V 2.25A Square Laptop Charger / AC Adapter...', price: 'R 350.00', priceNum: 350, image: '/images/charger_1.png' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Lenovo / Asus 20V 3.25A Square Laptop Charger with Square Type...', price: 'R 380.00', priceNum: 380, image: '/images/charger_2.png' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Dell/HP 19.5V 3.33A Laptop Charger / AC Adapter with Blue Tip...', price: 'R 450.00', priceNum: 450, image: '/images/charger_3.png' },
  { id: 10, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Lenovo/Asus/Toshiba/Acer Laptop Charger 19V 3.42A Square...', price: 'R 350.00', priceNum: 350, image: '/images/charger_1.png' },
  { id: 11, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Lenovo/Acer/Asus/Toshiba Laptop Charger 19V 3.42A Square...', price: 'R 350.00', priceNum: 350, image: '/images/charger_2.png' },
  { id: 12, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W HP Square Laptop Charger 19.5V 3.33A Blue Tip...', price: 'R 400.00', priceNum: 400, image: '/images/charger_3.png' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Square Lenovo AC Adapter/Laptop Charger 20V 3.25A Square...', price: 'R 420.00', priceNum: 420, image: '/images/charger_1.png' },
  { id: 14, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '90W Original Lenovo AC Adapter / Laptop Charger 20V 4.5A Square...', price: 'R 550.00', priceNum: 550, image: '/images/charger_2.png' },
  { id: 15, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '90W Original Lenovo Laptop Charger 20V 4.5A Square Tip...', price: 'R 650.00', priceNum: 650, image: '/images/charger_3.png' },
  { id: 16, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Original Lenovo AC Adapter / Laptop Charger 20V 3.25A Square...', price: 'R 450.00', priceNum: 450, image: '/images/charger_1.png' },
  { id: 17, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: 'Original 130W Dell AC Adapter / Laptop Charger 19.5V 6.7A 7.4x5...', price: 'R 600.00', priceNum: 600, image: '/images/charger_2.png' },
  { id: 18, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: 'Original 130W Dell AC Adapter / Laptop Charger 19.5V 6.7A 4.5x3...', price: 'R 600.00', priceNum: 600, image: '/images/charger_3.png' },
  { id: 19, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Dell AC Adapter / Laptop Charger 19.5V 3.34A Octagonal...', price: 'R 380.00', priceNum: 380, image: '/images/charger_1.png' },
  { id: 20, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '45W Dell AC Adapter / Laptop Charger 19.5V 2.31A Octagonal...', price: 'R 280.00', priceNum: 280, image: '/images/charger_2.png' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W HP AC Adapter / Laptop Charger 19.5V 3.33A Blue Tip...', price: 'R 420.00', priceNum: 420, image: '/images/charger_3.png' },
  { id: 22, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '90W HP AC Adapter / Laptop Charger 19.5V 4.62A Blue Tip...', price: 'R 450.00', priceNum: 450, image: '/images/charger_1.png' },
  { id: 23, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '45W HP AC Adapter / Laptop Charger 19.5V 2.31A Blue Tip...', price: 'R 350.00', priceNum: 350, image: '/images/charger_2.png' },
  { id: 24, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Asus AC Adapter / Laptop Charger 19V 3.42A Square...', price: 'R 350.00', priceNum: 350, image: '/images/charger_3.png' },
  { id: 25, inStock: true, isUsed: false, category: 'MACBOOK CHARGERS', title: '45W MagSafe 2 Power Adapter / Mac Charger for Macbook Air...', price: 'R 850.00', priceNum: 850, image: '/images/charger_1.png' },
  { id: 26, inStock: true, isUsed: false, category: 'MACBOOK CHARGERS', title: '60W MagSafe 2 Power Adapter / Mac Charger for Macbook Pro...', price: 'R 950.00', priceNum: 950, image: '/images/charger_2.png' },
  { id: 27, inStock: true, isUsed: false, category: 'MACBOOK CHARGERS', title: '85W MagSafe 2 Power Adapter / Mac Charger for Macbook Pro...', price: 'R 950.00', priceNum: 950, image: '/images/charger_3.png' },
  { id: 28, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '120W Original Asus ROG / Lenovo AC Adapter / Laptop Charger...', price: 'R 800.00', priceNum: 800, image: '/images/charger_1.png' },
  { id: 29, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '150W Original Asus ROG / HP Pavilion Gaming / Omen AC...', price: 'R 900.00', priceNum: 900, image: '/images/charger_2.png' },
  { id: 30, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '65W Original Asus AC Adapter / Laptop Charger 19V 3.42A 5.5...', price: 'R 450.00', priceNum: 450, image: '/images/charger_3.png' },
  { id: 31, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '90W Original Asus AC Adapter / Laptop Charger 19V 4.74A 5.5...', price: 'R 550.00', priceNum: 550, image: '/images/charger_1.png' },
  { id: 32, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '120W Original Asus AC Adapter / Laptop Charger 19V 6.32A 5.5...', price: 'R 750.00', priceNum: 750, image: '/images/charger_2.png' },
  { id: 33, inStock: true, isUsed: false, category: 'MACBOOK CHARGERS', title: '45W MagSafe 1 Power Adapter / Mac Charger for Macbook Air...', price: 'R 750.00', priceNum: 750, image: '/images/charger_3.png' },
  { id: 34, inStock: true, isUsed: false, category: 'MACBOOK CHARGERS', title: '60W MagSafe 1 Power Adapter / Mac Charger for Macbook Pro...', price: 'R 850.00', priceNum: 850, image: '/images/charger_1.png' },
  { id: 35, inStock: true, isUsed: false, category: 'MACBOOK CHARGERS', title: '85W MagSafe 1 Power Adapter / Mac Charger for Macbook Pro...', price: 'R 950.00', priceNum: 950, image: '/images/charger_2.png' },
  { id: 36, inStock: true, isUsed: false, category: 'LAPTOP CHARGERS', title: '130W Original Dell AC Adapter / Laptop Charger...', price: 'R 800.00', priceNum: 800, image: '/images/charger_3.png' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopChargers() {
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
          Home &gt; Laptop Chargers
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Laptop Chargers</h1>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Laptop Charger and Adapter Options</h3>
              <p>Choosing the right charger is critical. Ensure your voltage matches your device to prevent damage. We supply high-quality replacement chargers designed for durability and consistent power delivery. Please confirm your tip size before purchasing.</p>
              
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>Can my Laptop use a Charger with different voltage?</h3>
              <p>No, you should never use a charger with a different voltage than what your laptop specifies, as this can severely damage your computer. You can use a charger with higher amperage, but never lower. Always stick to the recommended voltage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
