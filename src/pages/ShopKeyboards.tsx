import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Flexible 108 Key Laptop PC Foldable Keyboard Silicone Soft...', price: 'R 400.00', priceNum: 400, image: '/images/keyboard_1.png' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Asus X541 Series Laptop Keyboard Replacement Keyboard...', price: 'R 550.00', priceNum: 550, image: '/images/keyboard_2.png' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'HP ProBook 450 G0 G1 455 G1 450 G2 455 G2 Laptop...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_3.png' },
  { id: 4, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Dell Inspiron 15R 5520 5525 5537 15V M501R M511R...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_1.png' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'HP EliteBook 840 G1 840 G2 850 G1 850 G2 Laptop Keyboard...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_2.png' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Acer Aspire E1-521 E1-531 E1-571 E1-581 E1...', price: 'R 550.00', priceNum: 550, image: '/images/keyboard_3.png' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Toshiba Satellite C850 C850D C855 C855D C870 C870D C...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_1.png' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Lenovo Ideapad 320-15ABR 320-15AST 320-15...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_2.png' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Lenovo Ideapad 110-15ACL 110-15IBR 110-15IGM 11...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_3.png' },
  { id: 10, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Lenovo Z570 Z575 B570 B570E V570 V570C B590 V...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_1.png' },
  { id: 11, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Dell Inspiron 15-7000 7557 7559 15-5000 5547 5...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_2.png' },
  { id: 12, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'HP ProBook 450 G3 450 G4 455 G3 470 G3 Laptop K...', price: 'R 750.00', priceNum: 750, image: '/images/keyboard_3.png' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Toshiba Satellite L50-B L50-C L55-B L55-C Laptop...', price: 'R 550.00', priceNum: 550, image: '/images/keyboard_1.png' },
  { id: 14, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Lenovo Ideapad Y500 Y510 Y510p Y590 Laptop...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_2.png' },
  { id: 15, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'HP EliteBook 8460p 8460w 8470p 8470w Laptop...', price: 'R 650.00', priceNum: 650, image: '/images/keyboard_3.png' },
  { id: 16, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Lenovo Thinkpad T440 T440p T440s T450 T450s...', price: 'R 850.00', priceNum: 850, image: '/images/keyboard_1.png' },
  { id: 17, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Lenovo Thinkpad T470 T480 Laptop Keyboard...', price: 'R 950.00', priceNum: 950, image: '/images/keyboard_2.png' },
  { id: 18, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Lenovo Thinkpad T490 T495 L390 L490 Laptop...', price: 'R 950.00', priceNum: 950, image: '/images/keyboard_3.png' },
  { id: 19, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Acer Swift 3 SF314-52 SF314-52G SF314-53 SF31...', price: 'R 950.00', priceNum: 950, image: '/images/keyboard_1.png' },
  { id: 20, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'HP Pavilion 15-BS 15-BW 15-CC 15-CD Laptop K...', price: 'R 1,150.00', priceNum: 1150, image: '/images/keyboard_2.png' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'HP Envy 15-AE 15-AH 15-AS 15-AQ Laptop K...', price: 'R 1,150.00', priceNum: 1150, image: '/images/keyboard_3.png' },
  { id: 22, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Asus ZenBook UX430 UX430UA UX430UN Lapt...', price: 'R 1,250.00', priceNum: 1250, image: '/images/keyboard_1.png' },
  { id: 23, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Dell Latitude E5450 E5470 E7450 E7470 Laptop K...', price: 'R 1,250.00', priceNum: 1250, image: '/images/keyboard_2.png' },
  { id: 24, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARDS', title: 'Samsung NP900X3C NP900X3D NP900X3E Lapt...', price: 'R 1,450.00', priceNum: 1450, image: '/images/keyboard_3.png' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopKeyboards() {
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
          Home &gt; Laptop Keyboard
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Laptop Keyboard</h1>
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
              <p>Quality replacement laptop keyboards for Acer, Asus, Dell, Lenovo, HP, Toshiba, Apple Mac and more. Keyboard issues commonly include missing keycaps, stuck keys or a lack of response when you press the buttons. Ensure you check your exact model number and layout before ordering.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
