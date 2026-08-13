import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP MEMORY', title: '1GB DDR2 Laptop Memory RAM', price: 'R 150.00', priceNum: 150.0, image: '/images/laptop-parts-memory/1_DDR2-Memory-Laptop-500x500.jpg?v=2' },
  { id: 2, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '4GB DDR3 1600MHz PC3-12800 SO-DIMM 204 Pin Mix Branded Notebook Laptop Memory RAM (Refurbished 1 x 4GB Module)', price: 'R 230.00', priceNum: 230.0, image: '/images/laptop-parts-memory/2_Laptop_Memory_main_f16a4609-7d3f-407d-b706-3d8db733018e.JPG' },
  { id: 3, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '4GB DDR3 1600MHz PC3L-12800S SO-DIMM 204 Pin Mix Branded Notebook Laptop Memory RAM (Refurbished 1 x 4GB Module)', price: 'R 230.00', priceNum: 230.0, image: '/images/laptop-parts-memory/3_samsung-4gb-ddr3l-pc3l-12800-1600mhz-laptop-macbook-imac-memory.jpg?v=2' },
  { id: 4, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '8GB DDR3 1600MHz PC3L-12800S SO-DIMM 204 Pin Assorted Brands Notebook Laptop Memory RAM (Refurbished 1 x 8GB Module)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-memory/4_hp_h6y75aa_aba_hp_4gb_ddr3l_1600_1_35v_1023394_1024x1024_7e211fa2-ad34-4ba0-879b-1d4d7e6533b0.jpg?v=2' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP MEMORY', title: '8GB DDR4 2133MHz 288PIN SO-DIMM Notebook Laptop Memory (RAM)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-memory/5_Crucial_8GB_DDR4_2133MHz_SO-DIMM_Single_Rank.jpg?v=2' },
  { id: 6, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '8GB DDR4 2133MHz SO-DIMM Notebook Laptop Memory | Mix Branded Used RAM with 1 year warranty', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-memory/6_DDR4RAM.jpg?v=2' },
  { id: 7, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '8GB DDR4 2400MHz SO-DIMM Notebook Laptop Memory | Mix Branded Used RAM with 1 year warranty', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-memory/7_DDR4RAM-2.jpg?v=2' },
  { id: 8, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: '8GB DDR4 2666MHz SO-DIMM Notebook Laptop Memory | Mix Branded Used RAM', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-memory/8_LD0003448587_2_0004529700_0004529775_0005116301.jpg?v=2' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP MEMORY', title: 'Kingston 16GB RAM DDR4 2666MHz Single Rank SODIMM Laptop Memory Module – KCP426SD8/16', price: 'R 2300.00', priceNum: 2300.0, image: '/images/laptop-parts-memory/9_kINGSTON16GB.jpg?v=2' },
  { id: 10, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'Pre-owned 1GB DDR2 Laptop Memory RAM', price: 'R 120.00', priceNum: 120.0, image: '/images/laptop-parts-memory/10_DDR2-Memory-Laptop-500x500_37c690f8-80e4-413d-8614-511cf5159454.jpg?v=2' },
  { id: 11, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'Pre-owned 2GB DDR3-10600 1333MHz Mix-Branded Laptop Memory RAM (Refurbished 1 x 2GB Module)', price: 'R 230.00', priceNum: 230.0, image: '/images/laptop-parts-memory/11_Laptop_Memory_main.JPG' },
  { id: 12, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'Pre-owned 2GB DDR3-12800 1600MHz Mix-Branded Laptop Memory RAM (Refurbished 1 x 2GB Module)', price: 'R 230.00', priceNum: 230.0, image: '/images/laptop-parts-memory/12_hp_h6y75aa_aba_hp_4gb_ddr3l_1600_1_35v_1023394_1024x1024_e9dcbde4-2f80-4cce-8f99-f635b6ae817e.jpg?v=2' },
  { id: 13, inStock: true, isUsed: true, category: 'LAPTOP MEMORY', title: 'Pre-owned 512MB DDR2 Laptop Memory RAM', price: 'R 50.00', priceNum: 50.0, image: '/images/laptop-parts-memory/13_DDR2-Memory-Laptop-500x500_53c45c5c-251b-4272-b54d-34f1eea3d910.jpg?v=2' }
];

const ITEMS_PER_PAGE = 24;

export default function ShopMemory() {
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
      const current = prev[category] as string[];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setFilters({
      availability: [],
      condition: [],
      location: [],
      grade: []
    });
    setPriceInput({ min: '', max: '' });
    setAppliedPriceRange({ min: 0, max: Infinity });
    setCurrentPage(1);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceInput(prev => ({ ...prev, [type]: value }));
  };

  const handleApplyPrice = () => {
    const min = priceInput.min ? parseFloat(priceInput.min) : 0;
    const max = priceInput.max ? parseFloat(priceInput.max) : Infinity;
    setAppliedPriceRange({ min, max });
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      if (filters.condition.length > 0) {
        const isUsedAllowed = filters.condition.includes('Used');
        const isNewAllowed = filters.condition.includes('New');
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
          Home &gt; Laptop Parts &gt; Memory (RAM)
        </div>
        
        <div className="category-header">
          <div>
            <h1 className="category-title">Memory (RAM)</h1>
            <p className="category-desc">Showing {sortedProducts.length} results</p>
          </div>
          
          <div className="category-sort">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}>
              <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option>
              <option value="alphabetical">Alphabetically, A-Z</option>
            </select>
          </div>
        </div>

        <div className="category-layout">
          <aside className="category-sidebar-wrapper">
            <ShopSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAllFilters}
              priceRange={priceInput}
              onPriceChange={handlePriceChange}
              onApplyPrice={handleApplyPrice}
            />
          </aside>
          
          <main className="category-main">
            {currentProducts.length > 0 ? (
              <div className="cat-product-grid">
                {currentProducts.map((product) => (
                  <CategoryProductCard
                    key={product.id}
                    id={product.id}
                    inStock={product.inStock}
                    isUsed={product.isUsed}
                    image={product.image}
                    category={product.category}
                    title={product.title}
                    price={product.price}
                  />
                ))}
              </div>
            ) : (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-dark)' }}>
                No memory modules found matching your current filters.
              </div>
            )}
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </main>
        </div>
      </div>
    </div>
  );
}
