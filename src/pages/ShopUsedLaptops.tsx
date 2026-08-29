
import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 10253490520312,
    "title": "HP EliteBook 820 G3 12.5 Inch Touchscreen Business Laptop \u2013 i5 6300U \u2013 8GB DDR4 \u2013 256GB SATA SSD \u2013 Win10Pro (Used)",
    "price": "R4130.00",
    "priceNum": 4130,
    "image": "/images/used-laptops/1_820.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10237926605048,
    "title": "Lenovo ThinkPad 13 2nd Gen 13.3 Inch Office Laptop \u2013 i7 7500U \u2013 16GB DDR4 \u2013 256GB NVMe \u2013 Win11Pro (Used)",
    "price": "R5015.00",
    "priceNum": 5015,
    "image": "/images/used-laptops/2_thinkpad13-2ndgen-clean.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9985557299448,
    "title": "Lenovo Thinkpad L490 14 Inch Administration Laptop - I5 8265U - 8GB DDR4 - 256GB Nvme - Win11Pro (Used)",
    "price": "R5900.00",
    "priceNum": 5900,
    "image": "/images/used-laptops/3_itx_LenovoL490.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10254993883384,
    "title": "Lenovo ThinkPad T470 14 Inch Office Laptop \u2013 i7 7600U \u2013 16GB DDR4 \u2013 256GB NVMe \u2013 Win10Pro (Used)",
    "price": "R5900.00",
    "priceNum": 5900,
    "image": "/images/used-laptops/4_f47e85fa-b5b9-4ca1-b3a9-a63d15252acb.87ab15c2a2612152b0def1f816a4b032.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9182471520504,
    "title": "Dell Vostro 3510 15.6-inch Core i5-1135G7 8GB RAM 256GB SSD Win 11 Pro Laptop Notebook (Used)",
    "price": "R5999.00",
    "priceNum": 5999,
    "image": "/images/used-laptops/5_DellVostro351015.6-inchCorei5-1135G7.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10237921263864,
    "title": "Dell Latitude 5400 14 Inch Business Laptop \u2013 i5 8265U \u2013 8GB DDR4 \u2013 500GB NVMe \u2013 Win11Pro (Used)",
    "price": "R6195.00",
    "priceNum": 6195,
    "image": "/images/used-laptops/6_5400_1.4_49b5dfbf-8b3c-424a-8e78-02591c83f87a.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10237929226488,
    "title": "Lenovo ThinkPad X390 13.3 Inch Business Laptop \u2013 Intel Core i5-8265U \u2013 8GB DDR4 \u2013 256GB SATA \u2013 Win11Pro (Refurbished)",
    "price": "R6490.00",
    "priceNum": 6490,
    "image": "/images/used-laptops/7_XX390.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7590595100920,
    "title": "Lenovo Thinkpad T480: 8th Gen Core i5, 8GB RAM, 256GB SSD, Windows 10 Pro Notebook Laptop (Used)",
    "price": "R6999.00",
    "priceNum": 6999,
    "image": "/images/used-laptops/8_LenovoT480-i5.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7787401445624,
    "title": "Dell Latitude 15 3520 11th Gen Core i5 - 1145G7 256GB HDD 8GB RAM Win 11 Pro Laptop (Used)",
    "price": "R6999.00",
    "priceNum": 6999,
    "image": "/images/used-laptops/9_DellLatitude1535201.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7791216328952,
    "title": "Dell Latitude 15 3520 11th Gen Core i5 - 1145G7 256GB HDD 8GB RAM Win 10 Pro Laptop (Used)",
    "price": "R6999.00",
    "priceNum": 6999,
    "image": "/images/used-laptops/10_DellLatitude1535201.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949265002744,
    "title": "Dell Latitude 5490 | Core i5-8350U | 8GB DDR4 | 256GB SSD | Windows 11 Pro (Grade A)",
    "price": "R7149.00",
    "priceNum": 7149,
    "image": "/images/used-laptops/11_01_7adb5f48-b08a-46c4-ba61-4f8528d88413.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4576720420982,
    "title": "Lenovo Thinkpad T490 Ultrabook!! 8th Gen Core i5 Laptop, 8GB RAM, 256GB SSD, LTE, Win 10 Pro (Used)",
    "price": "R7499.00",
    "priceNum": 7499,
    "image": "/images/used-laptops/12_LenovoT490-3.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7502610661624,
    "title": "Dell Latitude 5420 11th Gen Core i5 - 1145G7 512GB SSD 16GB RAM Win 11 Pro Laptop (Used)",
    "price": "R7499.00",
    "priceNum": 7499,
    "image": "/images/used-laptops/13_DellLatitude5420.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10237927391480,
    "title": "Dell Latitude 7300 13.3 Inch Business Laptop \u2013  i7-8665U \u2013 8GB DDR4 \u2013 256GB NVMe SSD \u2013 Win11Pro (Used)",
    "price": "R7552.00",
    "priceNum": 7552,
    "image": "/images/used-laptops/14_7300_9471ce74-5c7f-4ae8-8fb3-fd56c1774700.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949251010808,
    "title": "Dell Latitude 5400 | i5-8365U | 8GB RAM | 256GB SSD | Windows 11 Pro (Refurbished)",
    "price": "R7699.00",
    "priceNum": 7699,
    "image": "/images/used-laptops/15_01_c8dd237a-730d-41fb-af71-eee6945d640b.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949255827704,
    "title": "Lenovo ThinkPad T14 Gen 1 | Ryzen 5 PRO 4650U | 16GB DDR4 | 512GB SSD | 14\" FHD | Windows 11 Pro (Grade A)",
    "price": "R7919.00",
    "priceNum": 7919,
    "image": "/images/used-laptops/16_01_9aebb337-bcdf-4151-a703-5d23cfd87d81.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949270049016,
    "title": "Dell Latitude 5490 | Core i5-8350U | 16GB DDR4 | 512GB SSD | Windows 11 Pro (Grade A)",
    "price": "R7919.00",
    "priceNum": 7919,
    "image": "/images/used-laptops/17_01_146cd0e2-7ca5-48ab-b1e0-18c1e06072a3.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9182476140792,
    "title": "Dell Latitude 5510 10th Gen Core i5 Laptop, 8GB RAM, 512GB SSD, 15.6\" FHD, Win 10 Pro (Used)",
    "price": "R7999.00",
    "priceNum": 7999,
    "image": "/images/used-laptops/18_dell_latitude_5510_3_3.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9863155417336,
    "title": "Lenovo ThinkPad T14: 11th Gen Core i5 Processor, 16GB RAM, 512GB SSD, Windows 11 Pro (Used)",
    "price": "R7999.00",
    "priceNum": 7999,
    "image": "/images/used-laptops/19_LenovoT14-i7.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949261922552,
    "title": "Dell Latitude 5490 | Core i5-8350U | 8GB DDR4 | 256GB SSD + 19\" Monitor | Windows 11 Pro (Grade A)",
    "price": "R8029.00",
    "priceNum": 8029,
    "image": "/images/used-laptops/20_01_c9ad69c6-d46d-4f03-a0a6-64e3723c331c.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952734839032,
    "title": "Dell Latitude 5400 | Core i5-8350U | 16GB DDR4 | 512GB NVMe SSD | Windows 11 Pro (Refurbished)",
    "price": "R8142.00",
    "priceNum": 8142,
    "image": "/images/used-laptops/21_01_35cc03fa-de62-4248-bef8-906c0313698a.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949270212856,
    "title": "Lenovo ThinkPad T480 | Core i5-8250U | 16GB RAM | 512GB SSD | Windows 11 Pro (Grade A)",
    "price": "R8249.00",
    "priceNum": 8249,
    "image": "/images/used-laptops/22_01_d5ca5c3f-6c40-43eb-8529-609d4c6bfd9c.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949251174648,
    "title": "Dell Latitude 5400 | i5-8365U | 8GB RAM | 256GB SSD | Windows 11 Pro (Refurbished)",
    "price": "R8579.00",
    "priceNum": 8579,
    "image": "/images/used-laptops/23_01_a29326c5-9fd0-46ea-ac9d-652720bcea84.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949250715896,
    "title": "Dell Latitude 5410 | Core i5-10310U | 8GB RAM | 256GB SSD | Windows 11 Pro (Refurbished)",
    "price": "R8799.00",
    "priceNum": 8799,
    "image": "/images/used-laptops/24_01_4d3a0ff9-5318-4df7-bff3-24b035bf61d6.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949255991544,
    "title": "Dell Latitude 5490 | Core i5-8350U | 16GB DDR4 | 512GB SSD + 19\" Monitor | Windows 11 Pro (Grade A)",
    "price": "R8799.00",
    "priceNum": 8799,
    "image": "/images/used-laptops/25_01_e8d35821-e3cd-4a74-a946-86923648eb40.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949259858168,
    "title": "Dell Latitude 7410 | Core i7-10610U | 8GB | 512GB SSD | 14\" FHD | Windows 11 Pro (Grade A)",
    "price": "R8799.00",
    "priceNum": 8799,
    "image": "/images/used-laptops/26_01_c7fbfa14-9716-4116-8fd7-0d750107c7c2.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949265297656,
    "title": "Dell Latitude 5400 | i5-8365U | 16GB RAM | 512GB SSD | Windows 11 Pro (Refurbished)",
    "price": "R8799.00",
    "priceNum": 8799,
    "image": "/images/used-laptops/27_01_63ce0259-e805-4093-b77e-e17d1ff691ed.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949267460344,
    "title": "Lenovo ThinkPad T490 | Core i5-8265U | 16GB RAM | 512GB SSD | Windows 11 Pro (Grade A)",
    "price": "R8799.00",
    "priceNum": 8799,
    "image": "/images/used-laptops/28_01_e4d92675-3f55-436b-b897-234be409dbbb.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949268410616,
    "title": "Lenovo ThinkPad E490 | Intel Core i5-8265U (8th Gen) | 16GB DDR4 | 256GB SSD | Windows 11 Pro (Grade A)",
    "price": "R8799.00",
    "priceNum": 8799,
    "image": "/images/used-laptops/29_01_72ea2c4f-8d5f-4903-b8a3-2956714db82f.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9034964074744,
    "title": "Lenovo ThinkPad X13 Yoga 2-in-1:  11th Gen Core i5 Processor, 16GB RAM, 256GB SSD, Windows 11 Pro (Used)",
    "price": "R8999.00",
    "priceNum": 8999,
    "image": "/images/used-laptops/30_21aw000aza-2-in-1-laptops-59494831358319.webp?v=4",
    "category": "Used Laptops",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopUsedLaptops() {
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
    return initialProducts.filter((product: any) => {
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
    return [...filteredProducts].sort((a: any, b: any) => {
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
          Home &gt; Used Laptops
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Used Laptops</h1>
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
                  {paginatedProducts.map((product: any) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}
