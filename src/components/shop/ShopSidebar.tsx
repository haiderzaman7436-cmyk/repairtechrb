export type FiltersState = {
  availability: string[];
  condition: string[];
  location: string[];
  grade: string[];
};

interface ShopSidebarProps {
  filters: FiltersState;
  onFilterChange: (category: keyof FiltersState, value: string) => void;
  onClearAll: () => void;
  priceRange: { min: string; max: string };
  onPriceChange: (type: 'min' | 'max', value: string) => void;
  onApplyPrice: () => void;
}

export default function ShopSidebar({ 
  filters, 
  onFilterChange, 
  onClearAll, 
  priceRange, 
  onPriceChange, 
  onApplyPrice 
}: ShopSidebarProps) {

  const renderCheckbox = (category: keyof FiltersState, label: string) => {
    const isChecked = filters[category].includes(label);
    return (
      <label className="custom-checkbox">
        <input 
          type="checkbox" 
          checked={isChecked}
          onChange={() => onFilterChange(category, label)}
        />
        <span className="checkmark"></span>
        {label}
      </label>
    );
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0) || priceRange.min !== '' || priceRange.max !== '';

  return (
    <aside className="shop-sidebar">
      {hasActiveFilters && (
        <div style={{ marginBottom: '1.5rem' }}>
          <button 
            onClick={onClearAll}
            style={{ background: 'none', border: 'none', color: 'var(--lime)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            × Clear all filters
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="filter-group" style={{ paddingTop: hasActiveFilters ? 0 : '1rem', borderTop: hasActiveFilters ? 'none' : '1px solid #eaeaea' }}>
        <h4 className="filter-title">AVAILABILITY</h4>
        {renderCheckbox('availability', 'In Stock')}
        {renderCheckbox('availability', 'On Order')}
      </div>

      <div className="filter-group">
        <h4 className="filter-title">CONDITION</h4>
        {renderCheckbox('condition', 'New')}
        {renderCheckbox('condition', 'Used')}
        {renderCheckbox('condition', 'Refurbished')}
      </div>

      <div className="filter-group">
        <h4 className="filter-title">LOCATION</h4>
        {renderCheckbox('location', 'In Store / Local Shop')}
        {renderCheckbox('location', 'Local Supplier')}
        {renderCheckbox('location', 'Imported from Overseas')}
      </div>

      <div className="filter-group">
        <h4 className="filter-title">GRADE</h4>
        {renderCheckbox('grade', 'New - Original / Unused')}
        {renderCheckbox('grade', 'A - Like New')}
        {renderCheckbox('grade', 'A - Excellent Used')}
        {renderCheckbox('grade', 'B - Good Used')}
        {renderCheckbox('grade', 'C - Fair Used')}
        {renderCheckbox('grade', 'D - Defect Used')}
      </div>

      <div className="filter-group">
        <h4 className="filter-title">PRICE (ZAR)</h4>
        <div className="price-filter-row">
          <input 
            type="number" 
            placeholder="From" 
            className="price-input" 
            value={priceRange.min}
            onChange={(e) => onPriceChange('min', e.target.value)}
          />
          <span>to</span>
          <input 
            type="number" 
            placeholder="To" 
            className="price-input" 
            value={priceRange.max}
            onChange={(e) => onPriceChange('max', e.target.value)}
          />
        </div>
        <button 
          className="btn btn-navy w-100" 
          style={{ padding: '0.5rem', marginTop: '1rem', fontSize: '0.8rem', width: '100%' }}
          onClick={onApplyPrice}
        >
          APPLY FILTER
        </button>
      </div>

      {/* Promos */}
      <div className="sidebar-promo sidebar-promo-dark">
        <h5>Can't find what you need?</h5>
        <p>Drop us a WhatsApp and we will find it for you, give you a price and let you know when you can have it.</p>
        <button className="btn btn-lime">REQUEST A QUOTE</button>
      </div>

      <div className="sidebar-promo sidebar-promo-light">
        <h5>Want us to check why?</h5>
        <p>Whatever your laptop issue is, bring it in and let's get it sorted.</p>
        <button className="btn btn-lime">BOOK A REPAIR</button>
      </div>
    </aside>
  );
}
