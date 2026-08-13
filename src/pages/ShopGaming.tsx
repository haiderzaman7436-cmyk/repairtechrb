
import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 10259176128760,
    "title": "MSI A520M-A PRO AM4 AMD MATX Gaming Motherboard (New)",
    "price": "R1765.00",
    "priceNum": 1765,
    "image": "/images/gaming-computers/1_A520M-A-PRO_wr_05.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10259176063224,
    "title": "MSI X870E Gaming Plus WIFI AM5 ATX Gaming Motherboard (New)",
    "price": "R7570.00",
    "priceNum": 7570,
    "image": "/images/gaming-computers/2_MAGX870EGAMINGPLUSWIFI_MSI-X870E-GAM-PLS-WIFI-AM5-ATX-4X-DDR5_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10256881942776,
    "title": "MSI MPG Z790 CARBON WIFI DDR5 LGA1700 ATX Gaming Motherboard (New)",
    "price": "R12046.00",
    "priceNum": 12046,
    "image": "/images/gaming-computers/3_MPGZ790CARBONWIFI_wr_01a.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10227060441336,
    "title": "Asus ROG Crosshair X870E EXTREME AM5 E-ATX Gaming Motherboard (New)",
    "price": "R26230.00",
    "priceNum": 26230,
    "image": "/images/gaming-computers/4_ROGCROSSHAIRX870EEXTREME_Asus-ROG-Crosshair-X870E-EXTREME-AM5-E-ATX-Gaming-Motherboard-Black_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10219561910520,
    "title": "Patriot Viper Venom 16GB 6000MHz DDR5 Desktop Gaming Memory RGB (New)",
    "price": "R7039.00",
    "priceNum": 7039,
    "image": "/images/gaming-computers/5_PVVR516G60C30_wr_01_f3ab7754-156d-400f-9f25-f8d5b03c41c9.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211032105208,
    "title": "Patriot Vipersteel 16GB 3600MHz DDR4 Desktop Gaming Memory RGB (New)",
    "price": "R3888.00",
    "priceNum": 3888,
    "image": "/images/gaming-computers/6_PVSR416G360C0_wr_-3.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211035906296,
    "title": "Geil Orion V RGB 16GB 6000MHz DDR5 Desktop Gaming Memory - White (New)",
    "price": "R5776.00",
    "priceNum": 5776,
    "image": "/images/gaming-computers/7_GAVSW516GB6000C36CSC_Geil-Orion-V-RGB-16GB-6000MHz-DDR5-Desktop-Gaming-Memory-White_wr_02.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211035709688,
    "title": "Patriot Vipersteel 8GB 3600MHz DDR4 Desktop Gaming Memory RGB (New)",
    "price": "R2275.00",
    "priceNum": 2275,
    "image": "/images/gaming-computers/8_PVSR48G360C0_wr_04.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211037282552,
    "title": "Geil Orion RGB 16GB 6000MHz DDR5 Desktop Gaming Memory - Grey (New)",
    "price": "R5741.00",
    "priceNum": 5741,
    "image": "/images/gaming-computers/9_GAVSG516GB6000C36CSC_Geil-Orion-V-RGB-16GB-6000MHz-DDR5-Desktop-Gaming-Memory-Grey_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211035250936,
    "title": "Patriot Vipersteel 32GB KIT (2x16GB) 3600MHz DDR4 Desktop Gaming Memory RGB (New)",
    "price": "R6425.00",
    "priceNum": 6425,
    "image": "/images/gaming-computers/10_PVSR432G360C8K_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034333432,
    "title": "Asus PRIME X870-P WIFI ATX Gaming Motherboard (New)",
    "price": "R6508.00",
    "priceNum": 6508,
    "image": "/images/gaming-computers/11_ASUS_PRIME-X870-PWIFI_wr_01a.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034693880,
    "title": "Asus ROG Strix B850-F Gaming WiFi Motherboard - AMD AM5 (New)",
    "price": "R8113.00",
    "priceNum": 8113,
    "image": "/images/gaming-computers/12_ROGSTRIXX850-FGAMINGWIFI-WR-01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211035480312,
    "title": "MSI B840 GAMING PLUS WIFI AM5 ATX Gaming Motherboard (New)",
    "price": "R4313.00",
    "priceNum": 4313,
    "image": "/images/gaming-computers/13_MSI_B840GAMINGPLUSWIFI_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034857720,
    "title": "MSI B850 GAMING PLUS WIFI AM5 ATX Gaming Motherboard (New)",
    "price": "R5304.00",
    "priceNum": 5304,
    "image": "/images/gaming-computers/14_b50-wr-01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034300664,
    "title": "Asus TUF Gaming X870-PLUS WIFI AMD AM5 ATX Gaming Motherboard (New)",
    "price": "R9824.00",
    "priceNum": 9824,
    "image": "/images/gaming-computers/15_Asus_TUFGAMINGX870-PLUS-WIFI_wr_01a.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034824952,
    "title": "Asus ROG Strix X870-F Gaming WiFi Motherboard - ATX AMD AM5 (New)",
    "price": "R11945.00",
    "priceNum": 11945,
    "image": "/images/gaming-computers/16_ROGSTRIXX870-FGAMINGWIFI-WR-01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211032465656,
    "title": "Asus PRIME B840-PLUS WIFI AMD AM5 ATX Gaming Motherboard (New)",
    "price": "R3865.00",
    "priceNum": 3865,
    "image": "/images/gaming-computers/17_Asus_PRIME-B840-PLUSWIFI_wr_01a.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211037380856,
    "title": "MSI A520M-PRO AMD AM4 MATX Gaming Motherboard (New)",
    "price": "R1815.00",
    "priceNum": 1815,
    "image": "/images/gaming-computers/18_A520M-PRO_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211037151480,
    "title": "MSI B650M Gaming Plus WiFi AM5 M-ATX Gaming Motherboard (New)",
    "price": "R3519.00",
    "priceNum": 3519,
    "image": "/images/gaming-computers/19_B650MGAMINGPLUSWIFI_OFFICE_MSI-B650M-Gaming-Plus-WiFi-AM5-M-ATX-Gaming-Motherboard_wr_01a.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211036070136,
    "title": "MSI B760M GAMING PLUS WIFI DDR5 Intel LGA1700 M-ATX Gaming Motherboard (New)",
    "price": "R4089.00",
    "priceNum": 4089,
    "image": "/images/gaming-computers/20_B760MGAMINGPLUSWIFI_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211036856568,
    "title": "MSI B860M Gaming PLUS WIFI Intel LGA1851 DDR5 M-ATX Motherboard (New)",
    "price": "R4643.00",
    "priceNum": 4643,
    "image": "/images/gaming-computers/21_B860MGAMINGPLUSWIFI_MSI-B860M-Gaming-PLUS-WIFI-Intel-LGA1851-DDR5-M-ATX-Motherboard_wr_01a.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211036332280,
    "title": "Asus ROG Strix Z890-H GAMING WIFI Intel LGA1851 ATX Motherboard (New)",
    "price": "R10756.00",
    "priceNum": 10756,
    "image": "/images/gaming-computers/22_ROGSTRIXZ890-HGAMINGWIFI_Asus-ROG-Strix-Z890-H-GAMING-WIFI-Intel-LGA1851-ATX-Motherboard_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034628344,
    "title": "MSI MAG Z890 TOMAHAWK WIFI Intel LGA1851 ATX Gaming Motherboard (New)",
    "price": "R8502.00",
    "priceNum": 8502,
    "image": "/images/gaming-computers/23_MAGZ890TOMAHAWKWIFI_wr_01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211032891640,
    "title": "Asus TUF Gaming Z890-PLUS WIFI Intel LGA1851 ATX Gaming Motherboard (New)",
    "price": "R9222.00",
    "priceNum": 9222,
    "image": "/images/gaming-computers/24_Asus_TUFGAMINGZ890-PLUSWIFI_wr_01b.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034530040,
    "title": "Asus ROG STRIX B860-F Gaming Wi-Fi Motherboard - Intel LGA1851 (New)",
    "price": "R7735.00",
    "priceNum": 7735,
    "image": "/images/gaming-computers/25_ROGSTRIXB860-FGAMINGWIFI-wr-01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211037118712,
    "title": "Asus ROG Strix B760-F Gaming WiFi Motherboard - Intel LGA1700 (New)",
    "price": "R7511.00",
    "priceNum": 7511,
    "image": "/images/gaming-computers/26_ROGSTRIXB760-FGAMINGWIFI-WR-01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034431736,
    "title": "MSI MAG B760 TOMAHAWK WIFI DDR5 Intel LGA1700 ATX Gaming Motherboard (New)",
    "price": "R5635.00",
    "priceNum": 5635,
    "image": "/images/gaming-computers/27_MAGB760TOMAHAWKWIFI_01_wr_01a.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211036922104,
    "title": "Asus TUF Gaming B760M-PLUS WIFI II - mATX Motherboard (New)",
    "price": "R4195.00",
    "priceNum": 4195,
    "image": "/images/gaming-computers/28_TUFGAMINGB760M-PLUSWIFIII-WR-01.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211034235128,
    "title": "Asus TUF Gaming B860M-Plus Wi-Fi M-ATX Motherboard \u2013 Intel LGA1851, DDR5, PCIe 5.0. Wi-Fi 7 (New)",
    "price": "R6189.00",
    "priceNum": 6189,
    "image": "/images/gaming-computers/29_TUFGAMINGB860M-PLUSWIFI-wr-07.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 10211033972984,
    "title": "PCBuilder Ryzen 5 5600GT DEFENDER Windows 11 Gaming PC (New)",
    "price": "R14420.00",
    "priceNum": 14420,
    "image": "/images/gaming-computers/30_PCB_DEFENDER_05_wr_01e.jpg?v=4",
    "category": "Gaming Computers",
    "isUsed": false,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopGaming() {
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
          Home &gt; Gaming Computers
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
