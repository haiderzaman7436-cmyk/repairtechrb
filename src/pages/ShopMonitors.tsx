import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 1787496427016,
    "title": "16 Inch LCD Monitor – VGA (Used)",
    "price": "R 800.00",
    "priceNum": 800,
    "image": "/images/monitors/images_21.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427020,
    "title": "Dell E1912H | 18.5\" HD | TN | VGA (Used)",
    "price": "R 900.00",
    "priceNum": 900,
    "image": "/images/monitors/E1912H.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427023,
    "title": "Dell E1914HEF | 19\" HD | VGA | LED Backlight Monitor (Grade B)",
    "price": "R 900.00",
    "priceNum": 900,
    "image": "/images/monitors/01_95e7c800-065a-4e53-abac-3a0d2612391e.webp",
    "category": "Monitors",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 1787496427026,
    "title": "19\" Widescreen LCD Monitor — VGA, DVI (Used)",
    "price": "R 900.00",
    "priceNum": 900,
    "image": "/images/monitors/itadstore_19inchwidemonitor_1_a22d1355-217b-4ed1-9572-f6d10a3f9446.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427029,
    "title": "19\" Wide LCD Monitor | VGA | Compact Desktop Display (Used)",
    "price": "R 900.00",
    "priceNum": 900,
    "image": "/images/monitors/itadstore_19inchwidemonitor_1.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427032,
    "title": "Lenovo ThinkVision T2054PC | 19.5\" IPS | 1440x900 | HDMI, DisplayPort, VGA | No Stand (Refurbished)",
    "price": "R 940.00",
    "priceNum": 940,
    "image": "/images/monitors/01_a2cb3921-228e-4d8b-8054-98f4abf12e15.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427035,
    "title": "20\" Wide LCD Monitor | VGA (Refurbished)",
    "price": "R 950.00",
    "priceNum": 950,
    "image": "/images/monitors/01_e1afbd52-da3a-4606-b422-99303bff054a.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427038,
    "title": "HP W2072a | 20\" LED | 1600 x 900 | VGA & DVI (Refurbished)",
    "price": "R 1,000.00",
    "priceNum": 1000,
    "image": "/images/monitors/01_a83c3310-1ecf-4583-8f07-8b6fe1f09bd2.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427041,
    "title": "20\" Wide LCD Monitor | 1600 x 900 | VGA + DVI (Refurbished)",
    "price": "R 1,000.00",
    "priceNum": 1000,
    "image": "/images/monitors/01_33a4a69b-fc62-4927-b285-6ea426c5beaa.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427044,
    "title": "19\" Widescreen LCD Monitor | 1600 x 900 | VGA & DVI (Grade B)",
    "price": "R 1,025.00",
    "priceNum": 1025,
    "image": "/images/monitors/itadstore_19inchwidemonitor.webp",
    "category": "Monitors",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 1787496427047,
    "title": "Dell E1916He | 18.5\" HD | DisplayPort & VGA (Refurbished)",
    "price": "R 1,050.00",
    "priceNum": 1050,
    "image": "/images/monitors/01_d4e0785d-7f75-4931-87b1-d6fffcff7f74.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427050,
    "title": "Dell E2016H 19.5 Inch HD Monitor – VGA & DisplayPort (Used)",
    "price": "R 1,150.00",
    "priceNum": 1150,
    "image": "/images/monitors/dell-e2016h-60hz-widescreen-gaming-monitor-1000px-v1-0001.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427053,
    "title": "22\" Wide LCD Monitor | VGA & DVI (Used)",
    "price": "R 1,250.00",
    "priceNum": 1250,
    "image": "/images/monitors/01_ef8caae0-1ad2-4a17-b956-162208990429.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427056,
    "title": "22\" Widescreen LCD Monitor | 1650 x 1050 | VGA + DVI-D (Refurbished)",
    "price": "R 1,300.00",
    "priceNum": 1300,
    "image": "/images/monitors/01_bd696c82-65b9-4089-818a-acf41ea38bd4.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427059,
    "title": "LG 22MP48HQ-PB 21.5 Inch Full HD IPS Monitor – HDMI & VGA (Used)",
    "price": "R 1,400.00",
    "priceNum": 1400,
    "image": "/images/monitors/LG1.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427062,
    "title": "LG 22MP48HQ-PB 21.5 Inch Full HD IPS Monitor - HDMI & VGA - Refurb Special (Refurbished)",
    "price": "R 1,500.00",
    "priceNum": 1500,
    "image": "/images/monitors/8_6f0bdcf2-b335-4177-b989-7c4422991b14.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427065,
    "title": "Dell P2422H | 23.8\" FHD | IPS | DisplayPort, HDMI & VGA (Used)",
    "price": "R 1,800.00",
    "priceNum": 1800,
    "image": "/images/monitors/01_ef9b94cd-2bf0-42a0-b33b-cdc446e8f465.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427068,
    "title": "24 Inch LCD Wide Monitor - VGA, DisplayPort & HDMI (Refurbished)",
    "price": "R 1,800.00",
    "priceNum": 1800,
    "image": "/images/monitors/rn-image_picker_lib_temp_d225b9a7-f404-4745-a96f-98f747a4252f.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427071,
    "title": "Samsung UA32N5003BR | 32\" Full HD | 1920 x 1080 | HDMI | No Stand (Used)",
    "price": "R 2,250.00",
    "priceNum": 2250,
    "image": "/images/monitors/01_0e6c9802-7d29-48bc-b4d0-5947d1f282fe.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427074,
    "title": "Dell 23 inch 16:9 Full HD Ultrathin Bezel IPS Display Monitor - P2319H ( (Refurbished / Used)",
    "price": "R 2,499.00",
    "priceNum": 2499,
    "image": "/images/monitors/dell-p2319h-monitors-20596286554276_700x_96c70ca1-2a9a-4ef9-b2c5-3c8bc2ddacca.webp",
    "category": "Monitors",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 1787496427077,
    "title": "Dell SE2225HM 21.5 Inch Full HD Monitor – HDMI & VGA (New)",
    "price": "R 2,813.00",
    "priceNum": 2813,
    "image": "/images/monitors/SE2225HM.webp",
    "category": "Monitors",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 1787496427080,
    "title": "Dell E2425HM | 23.8\" Full HD | IPS 100Hz | DisplayPort/HDMI/VGA (New)",
    "price": "R 2,875.00",
    "priceNum": 2875,
    "image": "/images/monitors/01_da85f33f-ea45-4f01-a7df-b245fecda9f1.webp",
    "category": "Monitors",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 1787496427083,
    "title": "Lenovo ThinkVision S22e-20 | 22\" FHD | WLED | HDMI/VGA (New)",
    "price": "R 3,125.00",
    "priceNum": 3125,
    "image": "/images/monitors/01_ddfe84df-6b41-4eb8-9157-d8be455213e9.webp",
    "category": "Monitors",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 1787496427086,
    "title": "Dell P2425H | 23.8\" FHD IPS | 100Hz | HDMI, DisplayPort, VGA, USB-C (New)",
    "price": "R 3,188.00",
    "priceNum": 3188,
    "image": "/images/monitors/01_d9cb0d67-7b05-4c69-a68e-f97986d7d669.webp",
    "category": "Monitors",
    "isUsed": false,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopMonitors() {
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
    }).sort((a, b) => {
      if (sortBy === 'price-ascending') return a.priceNum - b.priceNum;
      if (sortBy === 'price-descending') return b.priceNum - a.priceNum;
      if (sortBy === 'title-ascending') return a.title.localeCompare(b.title);
      if (sortBy === 'title-descending') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [filters, appliedPriceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Used / Refurbished Monitors</h1>
        <div className="flex items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="price-ascending">Price: Low to High</option>
            <option value="price-descending">Price: High to Low</option>
            <option value="title-ascending">Alphabetically: A-Z</option>
            <option value="title-descending">Alphabetically: Z-A</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <ShopSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            priceInput={priceInput}
            onPriceChange={handlePriceChange}
            onApplyPrice={handleApplyPrice}
          />
        </div>
        
        <div className="flex-1">
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to see more results.</p>
              <button
                onClick={handleClearAll}
                className="mt-4 text-blue-600 hover:text-blue-500 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentProducts.map(product => (
                  <CategoryProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
