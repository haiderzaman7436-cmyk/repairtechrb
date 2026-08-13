import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Dell Latitude E6400 E6410 E5500 E5510 E6500 E6510 Laptop Replacement Keyboard - US Layout', price: 'R 620.00', priceNum: 620.0, image: '/images/laptop-parts-keyboards/1_KB-DEE6400-B.jpg?v=2' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Lenovo IBM Thinkpad T440 T440P T440S T431S T450 T450S T460 Laptop Replacement Keyboard - BLACK', price: 'R 1450.00', priceNum: 1450.0, image: '/images/laptop-parts-keyboards/2_lenovo_thinkpad_T440_front_500_x_500_f251280b-7d79-45f5-98b5-63e3ba74974e.jpg?v=2' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire E1-521 Series Laptop Replacement Keyboard - US Layout', price: 'R 640.00', priceNum: 640.0, image: '/images/laptop-parts-keyboards/3_Acer-Aspire-E1-521.jpg?v=2' },
  { id: 4, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'HP ProBook 450 G0, 455 G1, 470 G1, 470 G2,  NO Frame Laptop Replacement Keyboard - US Layout', price: 'R 604.20', priceNum: 604.2, image: '/images/laptop-parts-keyboards/4_KB-HP450G0-BNF.jpg?v=2' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Dell Latitude E6320 E5420 E6220 E6420 Laptop Replacement Keyboard - US Layout', price: 'R 640.00', priceNum: 640.0, image: '/images/laptop-parts-keyboards/5_KB-DEE6420-B-2.jpg?v=2' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Toshiba Satellite L650 L655 L670 L675 L750 L755 L770 L775 Laptop Replacement Keyboard - US Layout', price: 'R 640.00', priceNum: 640.0, image: '/images/laptop-parts-keyboards/6_KB-TOL650-B.jpg?v=2' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'HP Compaq 620 621 625 CQ620 CQ621 CQ625 Laptop Replacement Keyboard - US Layout', price: 'R 575.50', priceNum: 575.5, image: '/images/laptop-parts-keyboards/7_KB-HP620.jpg?v=2' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Dell Inspiron 5547 15-5547, 15-3542, 15-3537, 15 5000 Series, MP-13N7, MP-13N73US-442  Laptop Replacement Keyboard - US Layout', price: 'R 690.00', priceNum: 690.0, image: '/images/laptop-parts-keyboards/8_KB-DE15-5000-B.jpg?v=2' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Lenovo IdeaPad G560 G560A G565 G560L Laptop Replacement Keyboard - US Layout', price: 'R 640.00', priceNum: 640.0, image: '/images/laptop-parts-keyboards/9_KB-LEG560-B.jpg?v=2' },
  { id: 10, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Asus X551 X551C X551CA X551M X551MA X551MAV Laptop Replacement Keyboard - US Layout', price: 'R 640.00', priceNum: 640.0, image: '/images/laptop-parts-keyboards/10_KB-ASX551-BNF.jpg?v=2' },
  { id: 11, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Lenovo IBM Thinkpad T430, L530, T430, T430si, T530 Laptop Replacement Keyboard - BLACK', price: 'R 1350.00', priceNum: 1350.0, image: '/images/laptop-parts-keyboards/11_Lenovo-T430-T530-X230-Keyboard-US-500x500.jpg?v=2' },
  { id: 12, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'HP EliteBook 8440p 8440w  Laptop Replacement Keyboard - UK Layout', price: 'R 615.60', priceNum: 615.6, image: '/images/laptop-parts-keyboards/12_KB-HP8440P-B.jpg?v=2' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Asus X541N X541NA X541NC X541S X541SA X541U Laptop Replacement Keyboard - US Layout', price: 'R 690.00', priceNum: 690.0, image: '/images/laptop-parts-keyboards/13_AsusVivoBookMaxX541X541NAX541NCX541SAX541SCX541UAX541UJkeyboard.jpg?v=2' },
  { id: 14, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire 3810 3810T 4810T 4810 Laptop Replacement Keyboard - US Layout', price: 'R 620.00', priceNum: 620.0, image: '/images/laptop-parts-keyboards/14_KB-AC4810T-B_cb9e894e-8201-422b-8824-dd37540bec44.jpg?v=2' },
  { id: 15, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'HP EliteBook 8560W 8570W Laptop Replacement Keyboard - US Layout', price: 'R 660.00', priceNum: 660.0, image: '/images/laptop-parts-keyboards/15_KB-HP8560W-BBF.jpg?v=2' },
  { id: 16, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'HP ProBook 4540S 4545S 4740s 4745S, NO Frame, Laptop Replacement Keyboard - US Layout', price: 'R 740.00', priceNum: 740.0, image: '/images/laptop-parts-keyboards/16_KB-HP4540S-B.jpg?v=2' },
  { id: 17, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Lenovo IdeaPad FLEX 2-15, G505S, S500, S510, S510P Black Frame, Laptop Replacement Keyboard - US Layout', price: 'R 558.40', priceNum: 558.4, image: '/images/laptop-parts-keyboards/17_KB-LE14D-BBF-2.jpg?v=2' },
  { id: 18, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Lenovo IdeaPad 500S, G50-70, Flex 2-15, Flex 2-15D Black Frame, Laptop Replacement Keyboard - US Layout', price: 'R 638.40', priceNum: 638.4, image: '/images/laptop-parts-keyboards/18_KB-LE14D-BBF.jpg?v=2' },
  { id: 19, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Asus K50 Series with Frame Laptop Replacement Keyboard - US Layout', price: 'R 640.00', priceNum: 640.0, image: '/images/laptop-parts-keyboards/19_lenovo_g550_500_x_500_c5c30f13-2fce-4843-87e2-fecb4e86ef2f.jpg?v=2' },
  { id: 20, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Macbook Pro Retina 13 inch Model A1502 | Year 2013 - 2014 Laptop Replacement Keyboard - UK/US Layout', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-keyboards/20_a1502LaptopReplacementkeyboard.jpg?v=2' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Samsung NP300 (15.6″) NP300E5C-A01US Laptop Replacement Keyboard - US Layout', price: 'R 620.00', priceNum: 620.0, image: '/images/laptop-parts-keyboards/21_KB-SANP300-BNF-156.jpg?v=2' },
  { id: 22, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'HP Pavilion 15-E 15-E000 15-N000 15-E100 Series Laptop Replacement Keyboard - US Layout', price: 'R 615.60', priceNum: 615.6, image: '/images/laptop-parts-keyboards/22_KB-HP15-E000-BBF.jpg?v=2' },
  { id: 23, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Asus K50 Series with Frame Laptop Replacement Keyboard - US Layout', price: 'R 399.00', priceNum: 399.0, image: '/images/laptop-parts-keyboards/23_KB-ASK50-BBF.jpg?v=2' },
  { id: 24, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire 5735 5535 9300 7000 7110 9300 9400 9410 9420 Laptop Replacement Keyboard - US Layout', price: 'R 444.60', priceNum: 444.6, image: '/images/laptop-parts-keyboards/24_KB-AC9400-B.jpg?v=2' },
  { id: 25, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Fujitsu Lifebook Ah532 A532 N532 Nh532 Laptop Replacement Keyboard - US Layout', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-keyboards/25_FujitsuKeyboardRK-FUJ-AH532.jpg?v=2' },
  { id: 26, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Flexible USB Keyboard | Portable, Flexible,  Fully Sealed Rubber Keyboard', price: 'R 199.00', priceNum: 199.0, image: '/images/laptop-parts-keyboards/26_Portable-USB-Flexible-Foldable-Silent-Silicon-Keyboard-1.jpg?v=2' },
  { id: 27, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Toshiba Satellite P200 P305D L505D L505 L500 Laptop Replacement Keyboard', price: 'R 640.00', priceNum: 640.0, image: '/images/laptop-parts-keyboards/27_KB-TOP200-B-2.jpg?v=2' },
  { id: 28, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Toshiba Satellite A300 A300D A305 L300 L305 M300 M500 M505 Laptop Replacement Keyboard', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-keyboards/28_KB-TOA300-B.jpg?v=2' },
  { id: 29, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire 5800, 5810T, 5542G Laptop Replacement Keyboard - US Layout', price: 'R 456.00', priceNum: 456.0, image: '/images/laptop-parts-keyboards/29_ACER_ASPIRE_5800_keyboard.jpg?v=2' },
  { id: 30, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Macbook Pro 13.3 inch Model A1278 | Year 2009 2010 2011 2012 Laptop Replacement Keyboard - US/UK Layout', price: 'R 1805.50', priceNum: 1805.5, image: '/images/laptop-parts-keyboards/30_KB-APA1278-BNF-3.jpg?v=2' },
  { id: 31, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire One D260, 532h, AO532H, NAV50, 521, 522 Laptop Replacement Keyboard - US Layout', price: 'R 456.00', priceNum: 456.0, image: '/images/laptop-parts-keyboards/31_KB-ACD260-B.jpg?v=2' },
  { id: 32, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire 5755, 5755G, 5830, 5830G, 5830T, 5830TG, Ethos 5951G, 8951G Laptop Replacement Keyboard - US Layout', price: 'R 558.60', priceNum: 558.6, image: '/images/laptop-parts-keyboards/32_KB-AC5830G-BNF_4.jpg?v=2' },
  { id: 33, inStock: true, isUsed: true, category: 'LAPTOP KEYBOARD', title: 'Apple MacBook Pro Top Case With Battery A2141 16" 2019 Space Gray (Used - Second Hand)', price: 'R 4999.00', priceNum: 4999.0, image: '/images/laptop-parts-keyboards/33_AppleMacBookProTopCaseWithBatteryA2141162019SpaceGrey.jpg?v=2' },
  { id: 34, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Lenovo IBM Thinkpad T470 T480 A475 A485 01HX459 01AX364 Laptop Replacement Keyboard - US, BLACK', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-keyboards/34_01AX446-1.jpg?v=2' },
  { id: 35, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire One D255E D257 D270 NAV50 Laptop Replacement Keyboard - US Layout', price: 'R 506.00', priceNum: 506.0, image: '/images/laptop-parts-keyboards/35_Asetos-laptop-keyboard-replacement-for-aspire-one-d255e-d257-d270-nav50-laptop-black-us-layout-6-mo__41lGeBjx7CL.jpg?v=2' },
  { id: 36, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire V5 V5-531 V5-571 V5-551G M5-581G M5-581T Laptop Replacement Keyboard - US Layout, Black (No Frame)', price: 'R 770.50', priceNum: 770.5, image: '/images/laptop-parts-keyboards/36_eyboardforAcerAspireV5V5-531V5-571.jpg?v=2' },
  { id: 37, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'MacBook  Pro 15 inch Model A1286 |  Laptop Replacement Keyboard - UK/US Layout', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-keyboards/37_MacbookPro15inchA1286-2.jpg?v=2' },
  { id: 38, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'MacBook  Pro Retina 15 inch Model A1398 |  Laptop Replacement Keyboard - UK/US Layout', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-keyboards/38_MacBookProRetina15InchModelA1398.jpg?v=2' },
  { id: 39, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Macbook Pro Retina 13 inch Model A1425 | Year 2012 2013 Laptop Replacement Keyboard - UK/US Layout', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-keyboards/39_US-Layout-Laptop-Replacement-Keyboard-for-Apple-MacBook-Pro-Retina-13-inch-A1425-2012-2013-Laptops-shop.asetos.co.za_6c9718f7-e0ed-4b84-83b0-c4b21a6bdfdf.jpg?v=2' },
  { id: 40, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'MacBook  Pro 17 inch Model A1297 |  Laptop Replacement Keyboard - UK/US Layout', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-keyboards/40_MacBookPro17inchUnibodyModelA1297-shop.asetos.co.za.jpg?v=2' },
  { id: 41, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'MacBook  Pro 13.3 inch Retina Model A1708 |  Laptop Replacement Keyboard - UK/US Layout', price: 'R 2645.00', priceNum: 2645.0, image: '/images/laptop-parts-keyboards/41_ReplacementLaptopKeyboardwithBacklightforAppleMacBookA1708.jpg?v=2' },
  { id: 42, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'MacBook  Pro 13.3 inch Model A1181 |  Laptop Replacement Keyboard - UK/US Layout', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-keyboards/42_A1181macbookkeyboard.jpg?v=2' },
  { id: 43, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'MacBook  Air 11 inch Model A1465 | Year 2011 - 2012 Laptop Replacement Keyboard - UK/US Layout', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-keyboards/43_KeyboardForMacbookAir11inchA1465A1370-1.jpg?v=2' },
  { id: 44, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'MacBook 12 inch  Retina Model A1534 | Year 2015 - 2017 Laptop Replacement Keyboard - UK/US Layout', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-keyboards/44_KeyboardForMacbookProRetina12A1534.jpg?v=2' },
  { id: 45, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Lenovo Thinkpad Edge 15" E50 14" E40 Laptop Replacement Keyboard - US Layout', price: 'R 934.80', priceNum: 934.8, image: '/images/laptop-parts-keyboards/45_KB-LEE50-B-2.jpg?v=2' },
  { id: 46, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Dell Inspiron 15 3521 Series Black frame Laptop Replacement Keyboard - US Layout', price: 'R 558.60', priceNum: 558.6, image: '/images/laptop-parts-keyboards/46_KB-DE3521-BBF-2.jpg?v=2' },
  { id: 47, inStock: true, isUsed: false, category: 'LAPTOP KEYBOARD', title: 'Acer Aspire One A110 A110X A110L A150 A150X D150 D250 ZG5 Laptop Replacement Keyboard - US Layout', price: 'R 410.40', priceNum: 410.4, image: '/images/laptop-parts-keyboards/47_KB-ACZG5-B.jpg?v=2' }
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
