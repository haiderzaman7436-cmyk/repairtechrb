import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: true, category: 'LAPTOP SCREENS', title: 'Pre-owned 15.6" WXGA LED Laptop Screen (Glossy)', price: 'R 650.00', priceNum: 650, image: '/images/screen_1.png?v=2' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '10.1" WSVGA LED Laptop Screen (Matte) Replacement', price: 'R 775.00', priceNum: 775, image: '/images/screen_2.png?v=2' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '11.6" WXGA HD LED Laptop Screen', price: 'R 900.00', priceNum: 900, image: '/images/screen_1.png?v=2' },
  { id: 4, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '12.1" WXGA LED Laptop Screen', price: 'R 1,250.00', priceNum: 1250, image: '/images/screen_2.png?v=2' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '13.3" WXGA HD LED Laptop Screen Replacement', price: 'R 1,600.00', priceNum: 1600, image: '/images/screen_1.png?v=2' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '14.0" WXGA HD LED Laptop Screen Matte', price: 'R 1,150.00', priceNum: 1150, image: '/images/screen_2.png?v=2' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '14.1" WXGA LED Laptop Screen', price: 'R 1,150.00', priceNum: 1150, image: '/images/screen_1.png?v=2' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '15.6" WXGA HD LED Laptop Screen', price: 'R 1,250.00', priceNum: 1250, image: '/images/screen_2.png?v=2' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '17.3" WXGA HD LED Laptop Screen', price: 'R 1,500.00', priceNum: 1500, image: '/images/screen_1.png?v=2' },
  { id: 10, inStock: true, isUsed: false, category: 'APPLE MAC SCREENS', title: 'MacBook Pro 13" Screen Replacement', price: 'R 2,500.00', priceNum: 2500, image: '/images/screen_2.png?v=2' },
  { id: 11, inStock: true, isUsed: true, category: 'APPLE MAC SCREENS', title: 'MacBook Air 13" Screen Replacement', price: 'R 2,200.00', priceNum: 2200, image: '/images/screen_1.png?v=2' },
  { id: 12, inStock: true, isUsed: false, category: 'APPLE MAC SCREENS', title: 'MacBook Pro 15" Screen Replacement', price: 'R 3,500.00', priceNum: 3500, image: '/images/screen_2.png?v=2' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '15.6" FHD IPS Laptop Screen', price: 'R 1,800.00', priceNum: 1800, image: '/images/screen_1.png?v=2' },
  { id: 14, inStock: false, isUsed: true, category: 'LAPTOP SCREENS', title: 'Pre-owned 14.0" LCD Screen', price: 'R 650.00', priceNum: 650, image: '/images/screen_2.png?v=2' },
  { id: 15, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '15.6" 30 Pin Slim FHD LED NanoEdge Laptop Screen With Bottom Right...', price: 'R 2,300.00', priceNum: 2300, image: '/images/screen_1.png?v=2' },
  { id: 16, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '15.6" 30 Pin Slim FHD IPS Non-Edge Laptop Screen With Bottom Right...', price: 'R 2,300.00', priceNum: 2300, image: '/images/screen_2.png?v=2' },
  { id: 17, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: '17.3" 30 Pin Slim HD+ LED Laptop Screen With Bottom Left Connector...', price: 'R 2,450.00', priceNum: 2450, image: '/images/screen_1.png?v=2' },
  { id: 18, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: 'HP Pavilion X360 14M-DW 14-DW 14T-DW LED LCD Touch Screen...', price: 'R 4,600.00', priceNum: 4600, image: '/images/screen_2.png?v=2' },
  { id: 19, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: 'Lenovo Ideapad C340-14 C340-14API 14 inches FHD 1080P IPS LCD Panel Touch...', price: 'R 4,600.00', priceNum: 4600, image: '/images/screen_1.png?v=2' },
  { id: 20, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: 'HP Pavilion X360 14-EK 14T-EK 14-E5 LCD LED FHD Touch Screen Assembly...', price: 'R 4,600.00', priceNum: 4600, image: '/images/screen_2.png?v=2' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: 'HP Envy x360 15-DR LCD Screen Replacement with Touch Digitizer Glas...', price: 'R 4,850.00', priceNum: 4850, image: '/images/screen_1.png?v=2' },
  { id: 22, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: 'Lenovo IdeaPad Flex 5-15ITL05 FHD IPS Touch LCD Screen Replacement with...', price: 'R 4,850.00', priceNum: 4850, image: '/images/screen_2.png?v=2' },
  { id: 23, inStock: true, isUsed: false, category: 'LAPTOP SCREENS', title: 'Asus Zenbook Flip 13 UX362/UX362FA/UX362FN IP...', price: 'R 5,200.00', priceNum: 5200, image: '/images/screen_1.png?v=2' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopScreens() {
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
          Home &gt; Laptop Screens
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Laptop Screens</h1>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Replacement Laptop Screen</h3>
              <p>We stock an array of replacement laptop screens from a range of major brands. It is essential to choose the exact screen model for your device, as screens are often not interchangeable. Ensure you match the specifications of your old screen to the new one.</p>
              
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>Laptop Screen Sizes</h3>
              <p>Laptop screens come in different sizes, most commonly between 10 to 17.3 inch, but there are other factors to account for as well. Ensure you find the right connector (such as 30-pin, 40-pin) and the correct screen type (such as LCD, LED, IPS, Matte, Glossy) before ordering to ensure full compatibility with your laptop model.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
