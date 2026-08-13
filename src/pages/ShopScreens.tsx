
import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 3182434885,
    "title": "15.6\" 40 pin LED Laptop Screen with Bottom Left Connector (Resolution = 1366*768 )",
    "price": "R1610.00",
    "priceNum": 1610,
    "image": "/images/laptop-parts-screens/1_sparescreen2_fc01667a-7bb8-4dd2-9f67-f539449a2aca.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2703056581,
    "title": "15.6\" 30 Pin Slim HD LED Laptop Screen With Bottom Right Connector (Resolution = 1366*768 )",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/laptop-parts-screens/2_sparescreen_-_Copy_1d9a9428-669c-46d6-af2d-c5fd29e72eaf.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2703036421,
    "title": "15.6\" 40 Pin Slim HD LED Laptop Screen With Bottom Right Connector (Resolution = 1366*768 )",
    "price": "R1645.00",
    "priceNum": 1645,
    "image": "/images/laptop-parts-screens/3_15.6_40_pin_led_right.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 3182522437,
    "title": "17.3\" 40 Pin HD+ LED Replacement Laptop Screen With Bottom Left Connector (Resolution = 1600*900 )",
    "price": "R1955.00",
    "priceNum": 1955,
    "image": "/images/laptop-parts-screens/4_17.3_led_40_pin_normal_Screen.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2741427333,
    "title": "10.1\" 40 pin Slim LED Laptop Screen",
    "price": "R969.00",
    "priceNum": 969,
    "image": "/images/laptop-parts-screens/5_10.1_led_slim.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2743072517,
    "title": "14.0\" 30 pin Slim HD LED Replacement Laptop Screen With Bottom Right Connector (Resolution = 1366*768 )",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/laptop-parts-screens/6_14.0_30_pin_led_right_25fe1c2d-19f5-44b2-a56d-9472570676d0.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2742118469,
    "title": "13.3\" 30 pin Slim LED Laptop Screen With Bottom Right Connector (Resolution = 1366*768 )",
    "price": "R1610.00",
    "priceNum": 1610,
    "image": "/images/laptop-parts-screens/7_13.3_40_pin_led_right.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9749537042,
    "title": "14.0\" 30 Pin Normal HD LED Replacement Laptop Screen With Bottom Right Connector (Resolution = 1366*768)",
    "price": "R1490.00",
    "priceNum": 1490,
    "image": "/images/laptop-parts-screens/8_14.0_inch_LED_LAPTOP_SCREEN_1366768_HD_BOTTOM_RIGHT_30_PIN.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2751924485,
    "title": "15.6 inch 30 Pin Normal HD LED Replacement Laptop Screen With Bottom Left Connector (Resolution = 1366*768 )",
    "price": "R1380.00",
    "priceNum": 1380,
    "image": "/images/laptop-parts-screens/9_15.6_30_pin_led_normal.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9751590802,
    "title": "15.6\" 40 pin FHD LED Laptop Screen with Bottom Left Connector (Resolution = 1920x1080)",
    "price": "R1725.00",
    "priceNum": 1725,
    "image": "/images/laptop-parts-screens/10_15.6_40_pin_led_normal_Screen_c72d0e14-1226-4925-b8e9-3f7535cacdfd.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9730119570,
    "title": "14.1\"  30 pin LED Laptop Screen with Bottom Right Connector (Resolution = 1440*900)",
    "price": "R1755.00",
    "priceNum": 1755,
    "image": "/images/laptop-parts-screens/11_14.1_inch_LED_normal_30_pin_right.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2743130181,
    "title": "14.0\" 40 pin Slim HD LED Replacement Laptop Screen With Bottom Right Connector (Resolution = 1366*768 )",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/laptop-parts-screens/12_14.0_30_pin_led_right_5c935372-219b-405a-bdea-dbc26ec1dbac.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2740512197,
    "title": "10.1\" 40 Pin LED Laptop Screen With Bottom Left Connector (Resolution = 1024*600)",
    "price": "R877.00",
    "priceNum": 877,
    "image": "/images/laptop-parts-screens/13_10.1_40_pin_led_screen.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8234125787384,
    "title": "Asus Zenbook Flip 13 UX362/UX362F/UX362FA/UX362FN IPS LED LCD Display Touch Screen Replacement",
    "price": "R5200.00",
    "priceNum": 5200,
    "image": "/images/laptop-parts-screens/14_Asus-Zenbook-Flip-13-UX362.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8234116481272,
    "title": "Lenovo IdeaPad Flex 5-15ITL05 FHD IPS Touch LCD Screen Replacement with Frame & Touch 82HT 81X3 Series",
    "price": "R4850.00",
    "priceNum": 4850,
    "image": "/images/laptop-parts-screens/15_ideapad-Flex-5-15ITL05.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8234104226040,
    "title": "HP Envy x360 15-DR LCD Screen Replacement with Touch Digitizer Glass L53545-001 L64480-001",
    "price": "R4850.00",
    "priceNum": 4850,
    "image": "/images/laptop-parts-screens/16_HP-Envy-x360-15-DR.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8233634627832,
    "title": "HP Pavilion X360 14-EK 14T-EK 14-ES LCD LED FHD Touch Screen Assembly Replacement N09469-001",
    "price": "R4600.00",
    "priceNum": 4600,
    "image": "/images/laptop-parts-screens/17_HPPavilionX36014-DW_d364bb28-92e2-4c43-8ec0-137ccdc673f9.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8233612345592,
    "title": "Lenovo Ideapad C340-14 C340-14API 14 inches FHD 1080P IPS LCD Panel Touch Screen Digitizer Replacement",
    "price": "R4600.00",
    "priceNum": 4600,
    "image": "/images/laptop-parts-screens/18_Lenovo-Ideapad-C340-14-2.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8233535832312,
    "title": "HP Pavilion X360 14M-DW 14-DW 14T-DW LED LCD Touch Screen REPLACEMENT L96517-001",
    "price": "R4600.00",
    "priceNum": 4600,
    "image": "/images/laptop-parts-screens/19_HPPavilionX36014-DW.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7868192096504,
    "title": "14.0\" 30 pin Slim FHD LED Replacement Laptop Screen With Bottom Right Connector (Resolution = 1920*1080 )",
    "price": "R1955.00",
    "priceNum": 1955,
    "image": "/images/laptop-parts-screens/20_14.0_30_pin_led_right_a5c8131a-6266-447d-b5f5-e7154419ad90.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7559470252280,
    "title": "15.6\" 30 Pin Slim FHD IPS Non-Edge Laptop Screen With Bottom Right Connector, Fits dell 15-7560 - No Brackets (Resolution = 1920*1080)",
    "price": "R2300.00",
    "priceNum": 2300,
    "image": "/images/laptop-parts-screens/21_Innolux-N156HCE-EN1-REV.C2-15.6-fHD-Laptop-Screen-1000x1000.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7559413694712,
    "title": "17.3\" 30 Pin Slim HD+ LED Laptop Screen With Bottom Left Connector (Resolution = 1600*900)",
    "price": "R2450.00",
    "priceNum": 2450,
    "image": "/images/laptop-parts-screens/22_17.3inchledscreen.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7541271265528,
    "title": "14.0 inch 30 Pin Slim FHD LED NanoEdge Laptop Screen With Bottom Right Connector - No Brackets (Resolution = 1920*1080)",
    "price": "R2093.00",
    "priceNum": 2093,
    "image": "/images/laptop-parts-screens/23_14.0nano_5f04f651-0c3a-455c-92a9-76aaa11b7ef2.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7541260222712,
    "title": "15.6\" 30 Pin Slim FHD LED NanoEdge Laptop Screen With Bottom Right Connector - No Brackets (Resolution = 1920*1080)",
    "price": "R2300.00",
    "priceNum": 2300,
    "image": "/images/laptop-parts-screens/24_edpscreen.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7541245706488,
    "title": "15.6\" 30 Pin Slim HD LED NanoEdge Laptop Screen With Bottom Right Connector - No Brackets (Resolution = 1366*768 )",
    "price": "R1955.00",
    "priceNum": 1955,
    "image": "/images/laptop-parts-screens/25_NT156WHM-N44NanoEdgeDisplaySCREEN.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4474200490102,
    "title": "15.6\" 30 Pin Slim FHD LED Laptop Screen With Bottom Right Connector (Resolution = 1920*1080 )",
    "price": "R1955.00",
    "priceNum": 1955,
    "image": "/images/laptop-parts-screens/26_15.6_30_pin_led_right_screen_3b12842f-22e9-4560-9fb3-a48930ea4237.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 2529455931510,
    "title": "17.3\" 40 Pin FHD LED Replacement Laptop Screen With Bottom Left Connector (Resolution = 1920*1080 )",
    "price": "R2300.00",
    "priceNum": 2300,
    "image": "/images/laptop-parts-screens/27_17.3_led_40_pin_normal_Screen_41b6fbbf-8d75-4623-ad33-cb5f5d15aa14.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9749583250,
    "title": "15.6\" 40 pin HD+ LED Laptop Screen with Bottom Left Connector (Resolution = 1600x900)",
    "price": "R1645.00",
    "priceNum": 1645,
    "image": "/images/laptop-parts-screens/28_15.6_40_pin_led_normal_Screen_b00d6763-1458-48a1-8c69-d2f619f0c60b.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9729560402,
    "title": "12.5\" 40 pin LED Laptop Screen with Bottom Right Connector (Resolution = 1366*768 )",
    "price": "R1254.00",
    "priceNum": 1254,
    "image": "/images/laptop-parts-screens/29_12.5_inch_normal_right_connector.jpg?v=4",
    "category": "Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9324180498,
    "title": "Refurbished 15.4\" CCFL LCD Laptop Screen (Used)",
    "price": "R850.00",
    "priceNum": 850,
    "image": "/images/laptop-parts-screens/30_15.4_lcd_c01ae29f-935b-4afc-b244-e45978eff04b.jpg?v=4",
    "category": "Screens",
    "isUsed": true,
    "inStock": true
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopScreens() {
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
          Home &gt; Screens
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Screens</h1>
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
