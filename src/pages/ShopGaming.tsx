import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  // Page 1 products
  { id: 1, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'MSI MAG B550 TOMAHAWK WIFI AM4 ATX Motherboard (Refurbished)', price: 'R 3,755.00', priceNum: 3755, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 2, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'MSI B550 PRO-VDH WIFI Micro-ATX AM4 Motherboard (Refurbished)', price: 'R 2,243.00', priceNum: 2243, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 3, inStock: true, isUsed: true, category: 'GAMING MEMORY', title: 'Patriot Viper Steel RGB 16GB (2 x 8GB) DDR4-3600MHz (Refurbished)', price: 'R 1,273.00', priceNum: 1273, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  { id: 4, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS TUF GAMING X570-PLUS (Wi-Fi) ATX AM4 Motherboard (Refurbished)', price: 'R 3,989.00', priceNum: 3989, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 5, inStock: true, isUsed: true, category: 'GAMING MEMORY', title: 'G.Skill Trident Z Neo Series 32GB (2 x 16GB) RGB (Refurbished)', price: 'R 2,050.00', priceNum: 2050, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  { id: 6, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS ROG STRIX B550-F GAMING (Wi-Fi) ATX AM4 (Refurbished)', price: 'R 4,050.00', priceNum: 4050, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 7, inStock: true, isUsed: true, category: 'GAMING MEMORY', title: 'Patriot Premium 32GB (2 x 16GB) DDR4 3200MHz (Refurbished)', price: 'R 1,185.00', priceNum: 1185, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  { id: 8, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS TUF Gaming B550M-PLUS (Wi-Fi) Micro-ATX (Refurbished)', price: 'R 3,250.00', priceNum: 3250, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 9, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'GIGABYTE B550 AORUS ELITE AX V2 ATX AM4 Motherboard (Refurbished)', price: 'R 4,125.00', priceNum: 4125, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 10, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'MSI MPG GAMING PLUS B550 AM4 ATX Motherboard (Refurbished)', price: 'R 3,347.00', priceNum: 3347, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 11, inStock: true, isUsed: true, category: 'GAMING COOLER', title: 'MSI MAG CORELIQUID 240R V2 Liquid CPU Cooler (Refurbished)', price: 'R 1,749.00', priceNum: 1749, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80' },
  { id: 12, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS ROG STRIX B450-F GAMING II ATX AM4 (Refurbished)', price: 'R 2,750.00', priceNum: 2750, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 13, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'GIGABYTE B550I AORUS PRO AX Mini-ITX AM4 Motherboard (Refurbished)', price: 'R 3,699.00', priceNum: 3699, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 14, inStock: true, isUsed: true, category: 'GAMING MEMORY', title: 'Patriot Viper Elite II 16GB (2 x 8GB) DDR4-4000MHz (Refurbished)', price: 'R 1,714.00', priceNum: 1714, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  { id: 15, inStock: true, isUsed: true, category: 'GAMING MEMORY', title: 'Crucial Ballistix RGB 16GB (2 x 8GB) DDR4-3600MHz (Refurbished)', price: 'R 1,775.00', priceNum: 1775, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  { id: 16, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS Prime B550M-A (Wi-Fi) Micro-ATX (Refurbished)', price: 'R 2,125.00', priceNum: 2125, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 17, inStock: true, isUsed: true, category: 'GAMING MEMORY', title: 'Patriot Viper Steel 16GB (2 x 8GB) DDR4-3600MHz (Refurbished)', price: 'R 1,029.00', priceNum: 1029, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  { id: 18, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS ROG Strix B550-A Gaming ATX AM4 Motherboard (Refurbished)', price: 'R 3,555.00', priceNum: 3555, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 19, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'MSI B550 Gaming Plus ATX AM4 Motherboard (Refurbished)', price: 'R 2,775.00', priceNum: 2775, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 20, inStock: true, isUsed: true, category: 'GAMING MEMORY', title: 'Corsair Vengeance RGB Pro 16GB (2 x 8GB) DDR4-3200MHz (Refurbished)', price: 'R 1,225.00', priceNum: 1225, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  
  // Page 2 & 3 products
  { id: 21, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS PRIME H610M-K D4 LGA 1700 Micro-ATX Motherboard (Refurbished)', price: 'R 1,755.00', priceNum: 1755, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 22, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS Prime B660M-K D4 LGA 1700 Micro-ATX Motherboard (Refurbished)', price: 'R 2,125.00', priceNum: 2125, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 23, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'GIGABYTE Z690 AORUS ELITE AX LGA 1700 ATX Motherboard (Refurbished)', price: 'R 5,125.00', priceNum: 5125, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 24, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'MSI PRO Z690-A DDR4 LGA 1700 ATX Motherboard (Refurbished)', price: 'R 4,250.00', priceNum: 4250, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 25, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'GIGABYTE Z690 UD AX DDR4 LGA 1700 ATX Motherboard (Refurbished)', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 26, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS TUF Gaming Z690-PLUS WIFI D4 ATX Motherboard (Refurbished)', price: 'R 5,800.00', priceNum: 5800, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 27, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'MSI MPG Z690 EDGE WIFI DDR4 ATX Motherboard (Refurbished)', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 28, inStock: true, isUsed: true, category: 'GAMING MOTHERBOARD', title: 'ASUS ROG STRIX Z690-A GAMING WIFI D4 ATX Motherboard (Refurbished)', price: 'R 7,200.00', priceNum: 7200, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  
  // Gaming Laptops
  { id: 29, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Acer Nitro 5 15.6" FHD IPS 144Hz Core i5 11400H 8GB 512GB SSD RTX 3050', price: 'R 16,499.00', priceNum: 16499, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 30, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Acer Nitro 5 15.6" FHD IPS 144Hz Core i7 11800H 16GB 512GB SSD RTX 3050 Ti', price: 'R 20,499.00', priceNum: 20499, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 31, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Dash F15 15.6" FHD 144Hz Core i7 12650H 16GB 512GB SSD RTX 3060', price: 'R 24,999.00', priceNum: 24999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 32, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'ASUS ROG Strix G15 15.6" FHD 144Hz Ryzen 7 4800H 16GB 512GB SSD RTX 3060', price: 'R 22,999.00', priceNum: 22999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 33, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Gaming A15 15.6" FHD 144Hz Ryzen 7 5800H 16GB 512GB SSD RTX 3060', price: 'R 23,499.00', priceNum: 23499, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 34, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G15 15.6" WQHD 165Hz Ryzen 9 5900HX 16GB 1TB SSD RTX 3070', price: 'R 32,999.00', priceNum: 32999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 35, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Acer Predator Helios 300 15.6" FHD 144Hz Core i7 11800H 16GB 1TB SSD RTX 3070', price: 'R 31,999.00', priceNum: 31999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 36, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Lenovo Legion 5 15.6" FHD 165Hz Ryzen 7 5800H 16GB 512GB SSD RTX 3060', price: 'R 25,499.00', priceNum: 25499, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 37, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Gaming F15 (i7-12650H | 16GB DDR5 | RTX 3060 | 1TB SSD)', price: 'R 31,587.00', priceNum: 31587, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 38, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Gaming A15 Gaming Laptop 15" | Ryzen 7 6800H | 16GB DDR5 | RTX 3060', price: 'R 31,587.00', priceNum: 31587, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 39, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'MSI Vector 17 HX A12VHG | Intel Core Ultra 9 185H | 32GB RAM | RTX 4080', price: 'R 63,010.00', priceNum: 63010, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 40, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G16 | Ryzen 9 6940HX | 16GB DDR5 | RTX 4060 8GB | 1TB SSD', price: 'R 47,317.00', priceNum: 47317, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 41, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G16 | Core i9-13980HX | 32GB DDR5 | 1TB SSD | RTX 4080', price: 'R 64,456.00', priceNum: 64456, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 42, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G16 | Ryzen 9 6940HX | 16GB DDR5 | RTX 4070 | Windows 11', price: 'R 54,456.00', priceNum: 54456, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 43, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Zephyrus G16 | Intel Core Ultra 9 185H | RTX 4080 8GB | 16GB', price: 'R 82,019.00', priceNum: 82019, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 44, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Zephyrus G16 | Intel Core Ultra 9 185H | 16GB DDR5 | RTX 4070', price: 'R 66,298.00', priceNum: 66298, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 45, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G16 | Core Ultra 9 185HX | 32GB DDR5 | RTX 4080 16GB | 1TB SSD', price: 'R 72,711.00', priceNum: 72711, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 46, inStock: true, isUsed: true, category: 'GAMING DESKTOP', title: 'PCBuilder Ryzen 9 5950X REMBRANDT Windows 11 Creator PC (Refurbished)', price: 'R 106,925.00', priceNum: 106925, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80' }
];

const ITEMS_PER_PAGE = 20;

export default function ShopGaming() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FiltersState>({
    availability: [],
    condition: [],
    location: [],
    grade: []
  });
  
  const [priceInput, setPriceInput] = useState({ min: '', max: '' });
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 0, max: Infinity });
  
  const [sortBy, setSortBy] = useState('price-ascending');

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
        const isRefurbAllowed = filters.condition.includes('Refurbished');
        
        const isRefurb = product.title.includes('Refurbished');
        
        if (product.isUsed && !isRefurb && !isUsedAllowed) return false;
        if (!product.isUsed && !isRefurb && !isNewAllowed) return false;
        if (isRefurb && !isRefurbAllowed) return false;
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
    const sorted = [...filteredProducts];
    if (sortBy === 'price-ascending') return sorted.sort((a, b) => a.priceNum - b.priceNum);
    if (sortBy === 'price-descending') return sorted.sort((a, b) => b.priceNum - a.priceNum);
    if (sortBy === 'alphabetical') return sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted.sort((a, b) => b.id - a.id);
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb" style={{ margin: '2rem 0 1rem', fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
          Home &gt; Gaming Computers & Components
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Gaming Computers</h1>
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
              <option value="alphabetical">Alphabetical</option>
              <option value="latest">Newest Arrivals</option>
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
            {currentProducts.length > 0 ? (
              <>
                <div className="cat-product-grid">
                  {currentProducts.map((product) => (
                    <CategoryProductCard key={product.id} {...product} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                  />
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-dark)' }}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button className="btn btn-navy" onClick={handleClearAll} style={{ marginTop: '1rem' }}>Clear all filters</button>
              </div>
            )}
            
            <div className="seo-text-box" style={{ marginTop: '4rem' }}>
              <p>Explore our extensive range of high-performance gaming computers, laptops, and components. Whether you're a casual gamer or a competitive esports professional, we have the gear to elevate your gameplay. All our refurbished gaming products undergo rigorous testing to ensure maximum reliability, frame rates, and cooling efficiency so you can game with confidence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
