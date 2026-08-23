import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    id: 301,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell PowerEdge R730 2x E5-2680 v3 64GB RAM 4x 1.2TB HDD",
    price: "R 18,500.00",
    priceNum: 18500,
    image: "/images/servers/1.webp"
  },
  {
    id: 302,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "HP ProLiant DL380 Gen9 2x E5-2660 v3 128GB RAM",
    price: "R 22,000.00",
    priceNum: 22000,
    image: "/images/servers/2.webp"
  },
  {
    id: 303,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell PowerEdge T430 Tower Server E5-2620 32GB RAM",
    price: "R 12,000.00",
    priceNum: 12000,
    image: "/images/servers/3.webp"
  },
  {
    id: 304,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R710 2 X 2 93ghz Quad Core No Ram No Drives 2 5 Drive Bays Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/4.webp"
  },
  {
    id: 305,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R410 2 X 2 23ghz Quad Core 16gb Ram 2 X 500gb 3 5 Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/5.webp"
  },
  {
    id: 306,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360p Gen8 1u Rackmount Server 8 Sff Xeon E5 2630 64gb Ddr3 2 X 300gb Sas P420i 1gb 2 Port 332t 2 X 460w 2 X Caddies 6 X Blanks Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/6.webp"
  },
  {
    id: 307,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R320 1u Rackmount Server 4 Lff Xeon E5 1410 V2 16gb Ddr3 2 X 500gb Sata Perc H310 Mini Broadcom Bcm5720 2 X 550w Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/7.webp"
  },
  {
    id: 308,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R810 2 X 2 26ghz Six Core 16gb Ram 2 X 500gb 2 5 Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/8.webp"
  },
  {
    id: 309,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360 G6 2 X Xeon E5540 Quad Core 16gb Ram 2 X 146gb 2 5 10k Sas Drive 1u Rack Server",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/9.webp"
  },
  {
    id: 310,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Huawei Vcn510 16p 8 Channel Video Surveillance Server With Poe Demo New",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/10.webp"
  },
  {
    id: 311,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380p Gen8 2u Rackmount Server 8 Sff 2 X Xeon E5 2609 64gb Ddr3 2 X 300gb Sas P420i 1gb 4 Port 331flr 8gb Pci E Fc Hba 2 X 460w 2 X Caddies 1 X Blank Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/11.webp"
  },
  {
    id: 312,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380p Gen8 2u Rackmount Server 8 Sff 2 X Xeon E5 2620 64gb Ddr3 2 X 300gb Sas P420i 1gb 4 Port 331flr 8gb Pci E Fc Hba 2 X 460w 2 X Caddies 6 X Blanks Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/12.webp"
  },
  {
    id: 313,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R710 2 X 2 93ghz Quad Core 16gb Ram 2 X 146gb 3 5 15k Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/13.webp"
  },
  {
    id: 314,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R320 Intel Xeon E 2407 2 20ghz Quad Core 16gb Ram 2 X 146gb 3 5 15k Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/14.webp"
  },
  {
    id: 315,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Mcafee Inc Erc 1260 2u Rackmount Server 4 Sff Xeon E3 1275 V3 16gb Ddr3 1tb Sata I340 T4 I210 1 X 350 Watts 4 X Caddies Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/15.webp"
  },
  {
    id: 316,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R620 Intel Xeon E5 2640 Six Core 64gb Ram 2 X 300gb Inch 10k Sas Drive 4 Bays 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/16.webp"
  },
  {
    id: 317,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R420 Intel Xeon E5 2407 V2 Processor 48gb Ram 2 X 300gb 3 5 Inch Sas Drive 4 Bays 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/17.webp"
  },
  {
    id: 318,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360 G9 Intel Xeon E5 2620 V2 Processors 32gb Ram 2 X 300gb 2 5 10k Sas Drive 1u Rack Server",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/18.webp"
  },
  {
    id: 319,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380p Gen8 File Server 8 Bay Sff 2 X Xeon E5 2690 64gb Ddr3 2 X 300gb Sas P420i Raid Qp 1gb 2 X 460 Watt No Front Bezel No Rail Kit Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/19.webp"
  },
  {
    id: 320,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl20 Gen 9 1u Rackmount 4 Sff 1 X Xeon E3 1240 V5 16gb Ddr4 1 X 600gb Sas Smart Hba H240 Hp 332i Adapter 1 X 550 Watt Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/20.webp"
  },
  {
    id: 321,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R620 Intel Xeon E5 2640 Six Core 64gb Ram 2 X 300gb 2 5 10k Sas Drive 8 Bays 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/21.webp"
  },
  {
    id: 322,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R620 Intel Xeon E5 2640 Six Core 64gb Ram 2 X 300gb 2 5 10k Sas Drive 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/22.webp"
  },
  {
    id: 323,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360 Gen9 1u Rackmount Server 8 Sff Xeon E5 2620 V3 32gb Ddr4 2 X 300gb Sas P440ar Raid Broadcom Bcm5719 2 X 500 Watts 6 X Blanks Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/23.webp"
  },
  {
    id: 324,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380 G7 2 X 6 Core Intel Xeon Cpu Server 2 5 Backplane",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/24.webp"
  },
  {
    id: 325,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge T150 4u Tower Server Pentium Gold G6405t 8gb Ddr4 3 X 2tb Sata Perc H755 Broadcom Bcm5720 Demo New",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/25.webp"
  },
  {
    id: 326,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R530 2u Rackmount Server 8 Lff Xeon E5 2640 V4 64gb Ddr4 No Hdd H730 Mini Broadcom Bcm5720 2 X 750w Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/26.webp"
  },
  {
    id: 327,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge T150 4u Tower Server Pentium Gold G6405t 8gb Ddr4 3 X 2tb Sata Perc H755 Broadcom Bcm5720 New Special New",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/27.webp"
  },
  {
    id: 328,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R710 2 X 2 93ghz Quad Core No Ram No Drives 2 5 Drive Bays Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/28.webp"
  },
  {
    id: 329,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R410 2 X 2 23ghz Quad Core 16gb Ram 2 X 500gb 3 5 Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/29.webp"
  },
  {
    id: 330,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360p Gen8 1u Rackmount Server 8 Sff Xeon E5 2630 64gb Ddr3 2 X 300gb Sas P420i 1gb 2 Port 332t 2 X 460w 2 X Caddies 6 X Blanks Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/30.webp"
  },
  {
    id: 331,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R320 1u Rackmount Server 4 Lff Xeon E5 1410 V2 16gb Ddr3 2 X 500gb Sata Perc H310 Mini Broadcom Bcm5720 2 X 550w Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/31.webp"
  },
  {
    id: 332,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R810 2 X 2 26ghz Six Core 16gb Ram 2 X 500gb 2 5 Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/32.webp"
  },
  {
    id: 333,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360 G6 2 X Xeon E5540 Quad Core 16gb Ram 2 X 146gb 2 5 10k Sas Drive 1u Rack Server",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/33.webp"
  },
  {
    id: 334,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Huawei Vcn510 16p 8 Channel Video Surveillance Server With Poe Demo New",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/34.webp"
  },
  {
    id: 335,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380p Gen8 2u Rackmount Server 8 Sff 2 X Xeon E5 2609 64gb Ddr3 2 X 300gb Sas P420i 1gb 4 Port 331flr 8gb Pci E Fc Hba 2 X 460w 2 X Caddies 1 X Blank Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/35.webp"
  },
  {
    id: 336,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380p Gen8 2u Rackmount Server 8 Sff 2 X Xeon E5 2620 64gb Ddr3 2 X 300gb Sas P420i 1gb 4 Port 331flr 8gb Pci E Fc Hba 2 X 460w 2 X Caddies 6 X Blanks Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/36.webp"
  },
  {
    id: 337,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R710 2 X 2 93ghz Quad Core 16gb Ram 2 X 146gb 3 5 15k Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/37.webp"
  },
  {
    id: 338,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R320 Intel Xeon E 2407 2 20ghz Quad Core 16gb Ram 2 X 146gb 3 5 15k Sas Drive Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/38.webp"
  },
  {
    id: 339,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Mcafee Inc Erc 1260 2u Rackmount Server 4 Sff Xeon E3 1275 V3 16gb Ddr3 1tb Sata I340 T4 I210 1 X 350 Watts 4 X Caddies Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/39.webp"
  },
  {
    id: 340,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R620 Intel Xeon E5 2640 Six Core 64gb Ram 2 X 300gb Inch 10k Sas Drive 4 Bays 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/40.webp"
  },
  {
    id: 341,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R420 Intel Xeon E5 2407 V2 Processor 48gb Ram 2 X 300gb 3 5 Inch Sas Drive 4 Bays 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/41.webp"
  },
  {
    id: 342,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360 G9 Intel Xeon E5 2620 V2 Processors 32gb Ram 2 X 300gb 2 5 10k Sas Drive 1u Rack Server",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/42.webp"
  },
  {
    id: 343,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380p Gen8 File Server 8 Bay Sff 2 X Xeon E5 2690 64gb Ddr3 2 X 300gb Sas P420i Raid Qp 1gb 2 X 460 Watt No Front Bezel No Rail Kit Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/43.webp"
  },
  {
    id: 344,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl20 Gen 9 1u Rackmount 4 Sff 1 X Xeon E3 1240 V5 16gb Ddr4 1 X 600gb Sas Smart Hba H240 Hp 332i Adapter 1 X 550 Watt Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/44.webp"
  },
  {
    id: 345,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R620 Intel Xeon E5 2640 Six Core 64gb Ram 2 X 300gb 2 5 10k Sas Drive 8 Bays 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/45.webp"
  },
  {
    id: 346,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R620 Intel Xeon E5 2640 Six Core 64gb Ram 2 X 300gb 2 5 10k Sas Drive 1u Rack Server Used",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/46.webp"
  },
  {
    id: 347,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl360 Gen9 1u Rackmount Server 8 Sff Xeon E5 2620 V3 32gb Ddr4 2 X 300gb Sas P440ar Raid Broadcom Bcm5719 2 X 500 Watts 6 X Blanks Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/47.webp"
  },
  {
    id: 348,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Hp Proliant Dl380 G7 2 X 6 Core Intel Xeon Cpu Server 2 5 Backplane",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/48.webp"
  },
  {
    id: 349,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge T150 4u Tower Server Pentium Gold G6405t 8gb Ddr4 3 X 2tb Sata Perc H755 Broadcom Bcm5720 Demo New",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/49.webp"
  },
  {
    id: 350,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge R530 2u Rackmount Server 8 Lff Xeon E5 2640 V4 64gb Ddr4 No Hdd H730 Mini Broadcom Bcm5720 2 X 750w Refurbished",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/50.webp"
  },
  {
    id: 351,
    inStock: true,
    isUsed: true,
    category: "SERVERS",
    title: "Dell Poweredge T150 4u Tower Server Pentium Gold G6405t 8gb Ddr4 3 X 2tb Sata Perc H755 Broadcom Bcm5720 New Special New",
    price: "R 0.00",
    priceNum: 0,
    image: "/images/servers/51.webp"
  }
];

const ITEMS_PER_PAGE = 12;

export default function ShopServers() {
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
          Home &gt; Refurbished Servers
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Refurbished Servers</h1>
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
              <p>Power your business infrastructure with our enterprise-grade refurbished servers. We supply reliable rack and tower servers from industry leaders like Dell PowerEdge and HP ProLiant, fully tested and ready to handle your networking, storage, and computing needs.</p>
              <p>Buying refurbished servers is a highly cost-effective way to scale your IT infrastructure without compromising on reliability or performance. Talk to our team today for a tailored server solution.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
