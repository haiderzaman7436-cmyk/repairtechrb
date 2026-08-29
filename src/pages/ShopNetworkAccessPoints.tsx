import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts: any[] = [
  {
    "id": 9952733102328,
    "title": "Zyxel WAP3205 \u2014 Wireless Access Point (Used)",
    "price": "R950.00",
    "priceNum": 950.0,
    "image": "/images/network-access-points/01_a0568657-c2e4-4e72-8baf-1fcedef37197.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952764297464,
    "title": "TP-Link EAP783 BE19000 | Wi-Fi 7 Tri-Band | Dual 10G Ethernet | Ceiling-Mount Access Point (New)",
    "price": "R8260.00",
    "priceNum": 8260.0,
    "image": "/images/network-access-points/01_9db8a579-5b55-4ab8-bce1-efef60760da9.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952793002232,
    "title": "Samsung WEC8050 \u2014 Wireless LAN Access Point Controller (Used)",
    "price": "R1350.00",
    "priceNum": 1350.0,
    "image": "/images/network-access-points/01_ec8e9660-425a-4982-986e-07f584d08077.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952783958264,
    "title": "Sophos AP 30 Rev 2 \u2014 Wireless Access Point (Used)",
    "price": "R1000.00",
    "priceNum": 1000.0,
    "image": "/images/network-access-points/01_585c8bfb-cb9e-4656-80c4-c54564b96181.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952769966328,
    "title": "Open-Mesh OM5P-AC \u2014 Dual-Band Cloud-Managed Access Point, No Adapter (Used)",
    "price": "R800.00",
    "priceNum": 800.0,
    "image": "/images/network-access-points/01_3931016d-5a63-45fd-841d-719fd603419a.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952823705848,
    "title": "Open-Mesh MR900 \u2014 Wireless Access Point (Used)",
    "price": "R1000.00",
    "priceNum": 1000.0,
    "image": "/images/network-access-points/01_c887e82a-8cc7-45f3-9b75-56bb269412c5.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952817873144,
    "title": "Open Mesh OM2P-HS \u2014 Wireless-N Access Point (Used)",
    "price": "R950.00",
    "priceNum": 950.0,
    "image": "/images/network-access-points/om2.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4487753007222,
    "title": "MikroTik hAP 2.4GHz 1.5dBi 5 Port Ethernet WiFi Router | RB951Ui-2nD",
    "price": "R1030.00",
    "priceNum": 1030.0,
    "image": "/images/network-access-points/RB-HAP_2020-05-11_15-43-30_r0q0FVHLgl.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952801030392,
    "title": "Huawei AP8050TN-HD \u2014 Outdoor Wi-Fi 6 Access Point (Grade A+)",
    "price": "R7670.00",
    "priceNum": 7670.0,
    "image": "/images/network-access-points/01_292c4b25-5a0a-4938-b223-97f2fb9a91be.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952775110904,
    "title": "Huawei AP8050DN \u2014 Wireless Access Point (Grade A+)",
    "price": "R5310.00",
    "priceNum": 5310.0,
    "image": "/images/network-access-points/01_25bf8f6a-a21d-4ba9-8dcc-2e78157fb640.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952833470712,
    "title": "Huawei AP8150DN \u2014 802.11ac Wave 2 Outdoor Access Point (Refurbished)",
    "price": "R7670.00",
    "priceNum": 7670.0,
    "image": "/images/network-access-points/01_008accde-3f5b-40b4-a3df-8f6ece70124a.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952803094776,
    "title": "Huawei AP7060DN \u2014 Wi-Fi 6 Indoor Access Point (Grade A+)",
    "price": "R4130.00",
    "priceNum": 4130.0,
    "image": "/images/network-access-points/01_d82791d6-c816-41b4-be25-b78962104322.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952811679992,
    "title": "Huawei AP6050DN \u2014 11ac Wave 2 Indoor 4x4 Dual-Band Access Point (New)",
    "price": "R1500.00",
    "priceNum": 1500.0,
    "image": "/images/network-access-points/01_6abcfa39-db5b-4a10-9053-eb4033185a26.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952773734648,
    "title": "Huawei AP6010DN-AGN \u2014 Wireless LAN Access Point (Grade A+)",
    "price": "R3500.00",
    "priceNum": 3500.0,
    "image": "/images/network-access-points/01_934d2548-d867-4ae7-b9b7-53fe89d2c0e8.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952779174136,
    "title": "Huawei AP4050DN \u2014 Indoor Dual-Band Access Point (Grade A+)",
    "price": "R2000.00",
    "priceNum": 2000.0,
    "image": "/images/network-access-points/01_fef8ecaf-46ea-4c08-9ea9-0b4040fa1e34.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952787955960,
    "title": "Huawei AD9431DN-24X \u2014 Central Access Point (Grade B)",
    "price": "R5900.00",
    "priceNum": 5900.0,
    "image": "/images/network-access-points/ad9431dn-24x.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9953806352632,
    "title": "Huawei AirEngine 9700D-M \u2014 Wireless Access Controller (Refurbished)",
    "price": "R22550.00",
    "priceNum": 22550.0,
    "image": "/images/network-access-points/01_21af7334-e354-4437-bfb2-11185533b7b7.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9952764264696,
    "title": "Huawei AP362E \u2014 AX3000 Wi-Fi 6 Dual-Radio Access Point (New)",
    "price": "R2000.00",
    "priceNum": 2000.0,
    "image": "/images/network-access-points/01_ef1d892e-170f-4187-9b35-e7577a72ac94.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952833306872,
    "title": "Huawei AirEngine 6760-X1E \u2014 Wi-Fi 6 Access Point (Grade B)",
    "price": "R10030.00",
    "priceNum": 10030.0,
    "image": "/images/network-access-points/01_a1ad692e-4779-41ad-8ac0-8ba1e3f1bc62.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952803782904,
    "title": "Huawei AirEngine 5760-22WD \u2014 Wi-Fi 6 Wall Plate Access Point (Refurbished)",
    "price": "R4720.00",
    "priceNum": 4720.0,
    "image": "/images/network-access-points/01_95cedd01-5cce-47b7-a5a1-2a41d989901f.webp",
    "category": "Network Access Points",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 8142173798648,
    "title": "HPE Aruba R2H22A AP-504 802.11ax 1.77 Gbit/s Wireless Access Point",
    "price": "R4600.00",
    "priceNum": 4600.0,
    "image": "/images/network-access-points/ArubaAP.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952847102200,
    "title": "Dell Ruckus P300 | 802.11ac 5GHz | Outdoor Point-to-Point Bridge | IP67 (New)",
    "price": "R4130.00",
    "priceNum": 4130.0,
    "image": "/images/network-access-points/01_9fd0543b-3564-4f8c-a601-a3e1136f3e6c.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952801095928,
    "title": "D-Link DWL-8610AP \u2014 AC1750 Dual-Band Access Point (Grade B)",
    "price": "R1150.00",
    "priceNum": 1150.0,
    "image": "/images/network-access-points/01_0d8c00a6-6265-4b90-a99b-1a259458a284.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9952769442040,
    "title": "EnGenius EAP300 \u2014 N300 Indoor Wireless Access Point (Grade A+)",
    "price": "R1000.00",
    "priceNum": 1000.0,
    "image": "/images/network-access-points/01_0b6435c7-ca4b-4131-831b-73d1f0c920e8.webp",
    "category": "Network Access Points",
    "isUsed": false,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopNetworkAccessPoints() {
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
          Home &gt; Network Access Points
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Network Access Points</h1>
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
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
