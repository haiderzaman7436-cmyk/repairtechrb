import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 9952835928312,
    "title": "NComputing XD2 Thin Client 300-0032 | Ethernet Access Device | 5x RJ-45 | Rackmountable (Grade A+)",
    "price": "R1100.00",
    "priceNum": 1100.0,
    "image": "/images/desktops/01_28c491ef-6c66-494a-8369-dffe2677612a.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/01_28c491ef-6c66-494a-8369-dffe2677612a.webp?v=1782139069",
    "category": "Desktops",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10254993850616,
    "title": "Lenovo ThinkCentre Edge 72 MT Computer - i5 3330S - 4GB DDR3 - 500GB HDD - Win10Pro - Used Desktop PC (Used)",
    "price": "R1400.00",
    "priceNum": 1400.0,
    "image": "/images/desktops/3330s.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/3330s.webp?v=1785987031",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9997643907320,
    "title": "Dell Wyse Dx0D Class Thin Office Computer - G-T48E - 4GB DDR3 - 16GB SSD - Radeon HD 6250 - No OS (New)",
    "price": "R1500.00",
    "priceNum": 1500.0,
    "image": "/images/desktops/342ab6ef-27c2-45f2-94b2-2fc30005067d.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/342ab6ef-27c2-45f2-94b2-2fc30005067d.webp?v=1782876080",
    "category": "Desktops",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10105439977720,
    "title": "Lenovo ThinkCentre M710q Office Tiny Business Computer \u2013 i3 7100T \u2013 8GB DDR4 \u2013 128GB SATA SSD \u2013 Win11Pro (Refurbished)",
    "price": "R2300.00",
    "priceNum": 2300.0,
    "image": "/images/desktops/m710q.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/m710q.webp?v=1785554264",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10254993817848,
    "title": "Dell OptiPlex 3020 MT Business Computer - i5 4590 - 4GB DDR3 - 500GB HDD - Win10Pro - Pre-Owned Desktop PC (Used)",
    "price": "R1700.00",
    "priceNum": 1700.0,
    "image": "/images/desktops/3020_1.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/3020_1.webp?v=1785987029",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10253495140600,
    "title": "Dell OptiPlex 790 USFF Administrative Computer \u2013 i7 2600S \u2013 4GB DDR3 \u2013 500GB SATA \u2013 Win10Pro (Refurbished)",
    "price": "R1700.00",
    "priceNum": 1700.0,
    "image": "/images/desktops/dell-optiplex-790-usff-1.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/dell-optiplex-790-usff-1.webp?v=1785900742",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10253493502200,
    "title": "Dell OptiPlex 3040 SFF Business Computer \u2013 i3 6100 \u2013 8GB DDR3 \u2013 500GB HDD \u2013 Win11Pro (Used)",
    "price": "R2000.00",
    "priceNum": 2000.0,
    "image": "/images/desktops/1495712359_img_581686_3040744d-3d3e-4cdf-bfb1-78027bc068e5-546193.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/1495712359_img_581686_3040744d-3d3e-4cdf-bfb1-78027bc068e5-546193.webp?v=1785900712",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10237920379128,
    "title": "Lenovo V520S-08IKL SFF Office Computer \u2013 i3 7100 \u2013 8GB DDR4 \u2013 256GB SATA SSD \u2013 Win11 Pro \u2013 Pre-Owned Desktop PC (Used)",
    "price": "R2300.00",
    "priceNum": 2300.0,
    "image": "/images/desktops/lenovo_610b82a8-0c9b-43eb-9aba-13d5335e1038.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/lenovo_610b82a8-0c9b-43eb-9aba-13d5335e1038.webp?v=1785036624",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4359919501430,
    "title": "Core i3-8100T 8th Gen Lenovo ThinkCentre M720q Tiny Desktop: 8GB, 256GB, HDMI, Win10 Pro,  (Used)",
    "price": "R3500.00",
    "priceNum": 3500.0,
    "image": "/images/desktops/Lenovo_m720q-1.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/products/Lenovo_m720q-1.webp?v=1575055991",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 90330923026,
    "title": "Dell Optiplex 7020 SFF Desktop Core i5-4590 3.3GHz  4GB 500GB DVD Win 7 Pro, No Keyboard & Mouse (Used)",
    "price": "R2500.00",
    "priceNum": 2500.0,
    "image": "/images/desktops/Dell_Optiplex_7010_SFF.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/products/Dell_Optiplex_7010_SFF.webp?v=1534309279",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9953720566008,
    "title": "Dell OptiPlex 3060 SFF | i3-8100 | 8GB DDR4 | 256GB SSD | Windows 11 Pro (Grade B)",
    "price": "R3375.00",
    "priceNum": 3375.0,
    "image": "/images/desktops/3060sff_d06c8c76-c062-4ff6-bc29-4c4f8282fb57.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/3060sff_d06c8c76-c062-4ff6-bc29-4c4f8282fb57.webp?v=1782876053",
    "category": "Desktops",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4359836565622,
    "title": "Dell Optiplex 3020 Ultra Tiny Desktop: 4th Gen Core i5-4590T@2Ghz, 8GB MEM, 500GB HDD, WiFi, Bluetooth, Win 10 Pro, Compact, & Powerful (Used)",
    "price": "R2800.00",
    "priceNum": 2800.0,
    "image": "/images/desktops/dell_optiplex_D08U_3020.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/products/dell_optiplex_D08U_3020.webp?v=1575045350",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952742473976,
    "title": "Proline Prime H510M-K | Core i3-10100 | 8GB DDR4 | 1TB HDD | Windows 11 Pro (Used)",
    "price": "R3500.00",
    "priceNum": 3500.0,
    "image": "/images/desktops/01_8d7590a8-4c12-47d2-a512-592912ca9fab.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/01_8d7590a8-4c12-47d2-a512-592912ca9fab.webp?v=1782138011",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10087054835960,
    "title": "HP 290 G2 MT Administrative Computer \u2013 i3 8100 \u2013 8GB DDR4 \u2013 256GB SSD \u2013 Win11Pro \u2013 Pre-Owned Desktop PC (Used)",
    "price": "R3540.00",
    "priceNum": 3540.0,
    "image": "/images/desktops/HP_290_G2.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/HP_290_G2.webp?v=1785554259",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952747258104,
    "title": "Dell OptiPlex 3060 SFF | Core i3-8100 | 8GB DDR4 | 512GB SSD | Windows 11 Pro (Refurbished)",
    "price": "R3540.00",
    "priceNum": 3540.0,
    "image": "/images/desktops/3060sff.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/3060sff.webp?v=1782011084",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10105444466936,
    "title": "HP ProDesk 400 G6 MT Business Computer \u2013 i3 9100 \u2013 8GB DDR4 \u2013 512GB SSD \u2013 Win11Pro (Used)",
    "price": "R3540.00",
    "priceNum": 3540.0,
    "image": "/images/desktops/hp-prodesk-400-g6-i3-9100-8gb-256gb-ssd-desktop-pc.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/hp-prodesk-400-g6-i3-9100-8gb-256gb-ssd-desktop-pc.webp?v=1783135840",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1971139739766,
    "title": "Lenovo ThinkCentre M700 SFF Desktop Intel Core i5-6400 2.7GHz 4GB 500GB Win 10 Computer PC (Used)",
    "price": "R3999.00",
    "priceNum": 3999.0,
    "image": "/images/desktops/M700-sff-hero.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/products/M700-sff-hero.webp?v=1533950294",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 10253490127096,
    "title": "Dell Vostro 3670 MT Warehouse Computer - i5 8400 - 8GB DDR4 - 1TB HDD - Win11Pro - Used Desktop PC (Used)",
    "price": "R4012.00",
    "priceNum": 4012.0,
    "image": "/images/desktops/DELLVOSTRO3670I5.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/DELLVOSTRO3670I5.webp?v=1785900637",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952742605048,
    "title": "Proline Prime H570M-PLUS | Intel Core i3-10100 | 8GB DDR4 | 1TB HDD | Windows 11 Pro (Refurbished)",
    "price": "R4484.00",
    "priceNum": 4484.0,
    "image": "/images/desktops/01_484f2116-72cd-4db4-a21f-23fc5f2c8081.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/01_484f2116-72cd-4db4-a21f-23fc5f2c8081.webp?v=1782138840",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952763085048,
    "title": "Dell OptiPlex 3060 MT | Core i5-8500 | 8GB DDR4 | 1TB HDD | Windows 11 Pro (Refurbished)",
    "price": "R4248.00",
    "priceNum": 4248.0,
    "image": "/images/desktops/01_61403b8b-2d14-4fb8-8e91-f0f237a526d7.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/01_61403b8b-2d14-4fb8-8e91-f0f237a526d7.webp?v=1782138539",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952746930424,
    "title": "HP ProDesk 600 G4 DM | Core i5-8500T | 8GB DDR4 | 256GB NVMe | Windows 11 Pro (Grade B)",
    "price": "R4720.00",
    "priceNum": 4720.0,
    "image": "/images/desktops/01_812210af-0398-4ab0-8618-7a07ad54fa34.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/01_812210af-0398-4ab0-8618-7a07ad54fa34.webp?v=1782139023",
    "category": "Desktops",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10231568662776,
    "title": "HP 290 G2 MT Business Computer \u2013 i5 8500 \u2013 8GB DDR4 \u2013 512GB NVMe \u2013 Win11 Pro \u2013 Pre-Owned Desktop PC (Used)",
    "price": "R4484.00",
    "priceNum": 4484.0,
    "image": "/images/desktops/71Dwj_h8cSL_c208a972-ba27-49e2-b348-83f0b760ef0a.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/71Dwj_h8cSL_c208a972-ba27-49e2-b348-83f0b760ef0a.webp?v=1784777422",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9953708998904,
    "title": "Dell OptiPlex 3060 SFF | Core i5-8400 | 16GB DDR4 | 256GB SSD | Windows 11 Pro (Used)",
    "price": "R4720.00",
    "priceNum": 4720.0,
    "image": "/images/desktops/01_2cfd67c3-e3a7-4e36-809e-58b2aabacbfe.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/01_2cfd67c3-e3a7-4e36-809e-58b2aabacbfe.webp?v=1782139103",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9953709654264,
    "title": "Dell OptiPlex 3060 SFF | i5-8400 | 8GB DDR4 | 256GB SSD | Windows 11 Pro (Refurbished)",
    "price": "R4720.00",
    "priceNum": 4720.0,
    "image": "/images/desktops/01_1714cff5-72d0-4901-a6f6-4f3b096b62de.webp",
    "img_src": "https://cdn.shopify.com/s/files/1/1029/9525/files/01_1714cff5-72d0-4901-a6f6-4f3b096b62de.webp?v=1782138421",
    "category": "Desktops",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopDesktops() {
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
          Home &gt; Refurbished Desktops
        </div>

        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Refurbished Desktops</h1>
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
              <p>Upgrade your workspace with our professionally refurbished desktop computers. Whether you need a reliable machine for the office, a powerful workstation for demanding tasks, or a budget-friendly home PC, we have top brands like Dell, HP, and Lenovo at a fraction of the cost of buying new.</p>
              <p>Each refurbished desktop goes through a rigorous testing and quality assurance process to ensure maximum performance and longevity. Enjoy the peace of mind that comes with our 6-month warranty on all used and refurbished systems.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
