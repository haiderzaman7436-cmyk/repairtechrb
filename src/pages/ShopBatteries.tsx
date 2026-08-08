import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Toshiba PA3817U-1BRS/PA3819U-1BRS Laptop...', price: 'R 795.00', priceNum: 795, image: '/images/battery_1.png' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For Thinkpad T440 T450s X240s S440 X250...', price: 'R 750.00', priceNum: 750, image: '/images/battery_2.png' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For Toshiba PA3534U-1BRS PA3535U-1BRS T...', price: 'R 750.00', priceNum: 750, image: '/images/battery_3.png' },
  { id: 4, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'A32-K55 A33-K55 A41-K55 BATTERY FOR ASUS K55 A45...', price: 'R 750.00', priceNum: 750, image: '/images/battery_1.png' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For HP ProBook 4530s 4535s 4540s 4545s...', price: 'R 750.00', priceNum: 750, image: '/images/battery_2.png' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For HP Compaq 6720s 6820s 6730s 6735s...', price: 'R 750.00', priceNum: 750, image: '/images/battery_3.png' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'AL31-1005 Battery For Asus Eee PC...', price: 'R 700.00', priceNum: 700, image: '/images/battery_1.png' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For Dell Latitude E5420 E5520 E6420 E6520...', price: 'R 750.00', priceNum: 750, image: '/images/battery_2.png' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For Asus X550 X550C X550CA X550CC X550E...', price: 'R 750.00', priceNum: 750, image: '/images/battery_3.png' },
  { id: 10, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For Dell Inspiron 15R 17R N5110 N5010 N7110...', price: 'R 750.00', priceNum: 750, image: '/images/battery_1.png' },
  { id: 11, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for LENOVO Y400 Y410 Y410P Y500 Y510...', price: 'R 850.00', priceNum: 850, image: '/images/battery_2.png' },
  { id: 12, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For HP Envy 15 17 M6 Pavilion 15 17 Notebook...', price: 'R 950.00', priceNum: 950, image: '/images/battery_3.png' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Toshiba Satellite P850 P855 P870 P875...', price: 'R 850.00', priceNum: 850, image: '/images/battery_1.png' },
  { id: 14, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Acer Aspire V5 V5-471 V5-471G V5-571...', price: 'R 850.00', priceNum: 850, image: '/images/battery_2.png' },
  { id: 15, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for HP Compaq 8510p 8510w 8710p 8710w...', price: 'R 850.00', priceNum: 850, image: '/images/battery_3.png' },
  { id: 16, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Dell Inspiron 14z-5423 15z-5523 14z...', price: 'R 950.00', priceNum: 950, image: '/images/battery_1.png' },
  { id: 17, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for HP EliteBook 2530p 2540p Series...', price: 'R 850.00', priceNum: 850, image: '/images/battery_2.png' },
  { id: 18, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for LENOVO G400s G405s G410s G500s G505s...', price: 'R 850.00', priceNum: 850, image: '/images/battery_3.png' },
  { id: 19, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Asus A32-N56 N56 N56V N56VM N56VZ...', price: 'R 850.00', priceNum: 850, image: '/images/battery_1.png' },
  { id: 20, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for HP ProBook 4320s 4321s 4420s 4421s...', price: 'R 850.00', priceNum: 850, image: '/images/battery_2.png' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Dell Vostro 3300 3350 3360 3400 3450...', price: 'R 850.00', priceNum: 850, image: '/images/battery_3.png' },
  { id: 22, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Lenovo G40 G50 G40-70 G50-70 G50-45...', price: 'R 850.00', priceNum: 850, image: '/images/battery_1.png' },
  { id: 23, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for HP Pavilion dv4 dv5 dv6 CQ40 CQ41 CQ45...', price: 'R 850.00', priceNum: 850, image: '/images/battery_2.png' },
  { id: 24, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Asus K52 K52F K52J K52JB K52JC K52JE...', price: 'R 850.00', priceNum: 850, image: '/images/battery_3.png' },
  { id: 25, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for Sony Vaio VGP-BPS26 BPS26A BPL26 VPC-CA...', price: 'R 850.00', priceNum: 850, image: '/images/battery_1.png' },
  { id: 26, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for EliteBook 8460p 8460w 8470p 8470w 8560p...', price: 'R 950.00', priceNum: 950, image: '/images/battery_2.png' },
  { id: 27, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery For Dell Latitude E6420 E6520 Primary 9-cell 97Wh...', price: 'R 1,250.00', priceNum: 1250, image: '/images/battery_3.png' },
  { id: 28, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for HP Zbook 15 G1 G2 17 G1 G2...', price: 'R 1,150.00', priceNum: 1150, image: '/images/battery_1.png' },
  { id: 29, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Battery for LENOVO THINKPAD T440p T540p W540 L440...', price: 'R 1,500.00', priceNum: 1500, image: '/images/battery_2.png' },
  { id: 30, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Original Battery For DELL XPS 13 L321X L322X Series...', price: 'R 1,250.00', priceNum: 1250, image: '/images/battery_3.png' },
  { id: 31, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Replacement Battery for Lenovo IdeaPad 320-15IKB 320-15AST...', price: 'R 1,250.00', priceNum: 1250, image: '/images/battery_1.png' },
  { id: 32, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Replacement Battery for HP 250 G4 255 G4 256 G4 HS04...', price: 'R 1,150.00', priceNum: 1150, image: '/images/battery_2.png' },
  { id: 33, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Replacement Battery for HP ProBook 430 G3 440 G3 440 G3...', price: 'R 1,250.00', priceNum: 1250, image: '/images/battery_3.png' },
  { id: 34, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Replacement Battery for Dell Inspiron 13 5378 7378 7368...', price: 'R 1,250.00', priceNum: 1250, image: '/images/battery_1.png' },
  { id: 35, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Replacement Battery for Dell Latitude 5280 5480 5580...', price: 'R 1,450.00', priceNum: 1450, image: '/images/battery_2.png' },
  { id: 36, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'Replacement Battery for Dell Latitude 7280 7290 7380 7390...', price: 'R 1,250.00', priceNum: 1250, image: '/images/battery_3.png' },
  { id: 37, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'A1382 Apple MacBook Pro 15" Unibody Replacement Battery. Fits A1286 Early...', price: 'R 2,587.50', priceNum: 2587.5, image: '/images/battery_1.png' },
  { id: 38, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'A1534 Apple MacBook Pro Retina 12" Replacement Battery. Fits A1527 A153...', price: 'R 2,645.00', priceNum: 2645, image: '/images/battery_2.png' },
  { id: 39, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'A1820 Apple MacBook Pro Retina 15.4" Replacement Battery. Fits A1820 A170...', price: 'R 2,850.00', priceNum: 2850, image: '/images/battery_3.png' },
  { id: 40, inStock: true, isUsed: false, category: 'LAPTOP BATTERIES', title: 'A1502 Apple MacBook Pro 13" Retina Replacement Battery (Early 2015)...', price: 'R 3,450.00', priceNum: 3450, image: '/images/battery_1.png' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopBatteries() {
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
          Home &gt; Laptop Batteries
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Laptop Batteries</h1>
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
              <p>We stock replacement laptop batteries for a wide range of top tier brands. Your battery may eventually fail to hold a charge over time. If your battery indicator constantly shows a low level or rapidly depletes, replacing the battery can add a new lease of life to your computer. Remember to find the exact battery model that perfectly matches your current laptop or Mac model to ensure seamless operation and stability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
