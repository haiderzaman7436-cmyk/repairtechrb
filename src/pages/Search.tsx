import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allProducts } from '../data/allProducts';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const ITEMS_PER_PAGE = 12;

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    
    // Simple deduplication based on ID
    const uniqueProducts = Array.from(new Map(allProducts.map((p: any) => [p.id, p])).values());

    return uniqueProducts.filter((product: any) => {
      return product.title?.toLowerCase().includes(q) || 
             product.category?.toLowerCase().includes(q);
    });
  }, [query]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a: any, b: any) => {
      if (sortBy === 'price-ascending') return a.priceNum - b.priceNum;
      if (sortBy === 'price-descending') return b.priceNum - a.priceNum;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return 0; // relevance (default order)
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="category-page">
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div className="breadcrumb" style={{ margin: '2rem 0 1rem', fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
          Home &gt; Search
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Search Results for "{query}"</h1>
            <span style={{ color: 'var(--gray-dark)', fontSize: '0.9rem' }}>{filteredProducts.length} products found</span>
          </div>
          <div className="sort-box">
            <select 
              className="sort-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-ascending">Price: Low to High</option>
              <option value="price-descending">Price: High to Low</option>
              <option value="alphabetical">Alphabetically, A-Z</option>
            </select>
          </div>
        </div>

        <div className="category-main" style={{ marginTop: '2rem' }}>
          {paginatedProducts.length > 0 ? (
            <>
              <div className="cat-product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
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
            <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--gray-dark)' }}>
              <h3>No products found matching "{query}"</h3>
              <p>Try checking your spelling or using more general terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
