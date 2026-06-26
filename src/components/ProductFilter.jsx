import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './product-filter.css'

export default function ProductFilter({ products, onFilter, showGenderFilter = false }) {
  const [expanded, setExpanded] = useState({ gender: true, price: false, size: false, color: false })
  const [filters, setFilters] = useState({ gender: [], price: [0, 20000], size: [], color: [] })

  const genders = ['Men', 'Women']
  const priceRanges = [
    { label: 'Under ₹2,000', min: 0, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000+', min: 10000, max: 50000 },
  ]
  const allSizes = ['S', 'M', 'L', 'XL', '7', '8', '9', '10', '11']
  const allColors = ['Black', 'White', 'Beige', 'Navy', 'Olive', 'Brown', 'Silver', 'Gold']

  const handleSizeChange = (size) => {
    const newSizes = filters.size.includes(size)
      ? filters.size.filter(s => s !== size)
      : [...filters.size, size]
    const updated = { ...filters, size: newSizes }
    setFilters(updated)
    applyFilters(updated)
  }

  const handleColorChange = (color) => {
    const newColors = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color]
    const updated = { ...filters, color: newColors }
    setFilters(updated)
    applyFilters(updated)
  }

  const handlePriceRange = (min, max) => {
    const updated = { ...filters, price: [min, max] }
    setFilters(updated)
    applyFilters(updated)
  }

  const getProductGender = (product) => {
    if (product.category === 'dresses') return 'Women'
    if (product.name?.toLowerCase().includes("women's")) return 'Women'
    if (product.name?.toLowerCase().includes("men's")) return 'Men'
    return 'Unisex'
  }

  const handleGenderChange = (gender) => {
    const newGenders = filters.gender.includes(gender)
      ? filters.gender.filter(g => g !== gender)
      : [...filters.gender, gender]
    const updated = { ...filters, gender: newGenders }
    setFilters(updated)
    applyFilters(updated)
  }

  const applyFilters = (activeFilters) => {
    const filtered = products.filter(p => {
      // Gender filter
      if (showGenderFilter && activeFilters.gender.length > 0) {
        const productGender = getProductGender(p)
        if (!activeFilters.gender.includes(productGender)) {
          return false
        }
      }

      // Price filter
      if (p.price < activeFilters.price[0] || p.price > activeFilters.price[1]) {
        return false
      }

      // Size filter
      if (activeFilters.size.length > 0) {
        const hasSize = activeFilters.size.some(s => p.sizes?.includes(s))
        if (!hasSize) return false
      }

      // Color filter
      if (activeFilters.color.length > 0) {
        const hasColor = activeFilters.color.some(c => p.colors?.includes(c))
        if (!hasColor) return false
      }

      return true
    })

    onFilter(filtered)
  }

  const toggleExpand = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const activeCount = filters.gender.length + filters.size.length + filters.color.length + (filters.price[0] > 0 || filters.price[1] < 20000 ? 1 : 0)

  return (
    <div className="product-filter">
      <div className="filter-header">
        <h3>Filters</h3>
        {activeCount > 0 && (
          <button
            className="filter-reset"
            onClick={() => {
              setFilters({ gender: [], price: [0, 20000], size: [], color: [] })
              applyFilters({ gender: [], price: [0, 20000], size: [], color: [] })
            }}
          >
            Clear ({activeCount})
          </button>
        )}
      </div>

      {showGenderFilter && (
        <div className="filter-section">
          <button className="filter-toggle" onClick={() => toggleExpand('gender')}>
            <span>Gender</span>
            <ChevronDown size={16} className={expanded.gender ? 'expanded' : ''} />
          </button>
          {expanded.gender && (
            <div className="filter-options">
              {genders.map(gender => (
                <label key={gender} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.gender.includes(gender)}
                    onChange={() => handleGenderChange(gender)}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Filter */}
      <div className="filter-section">
        <button className="filter-toggle" onClick={() => toggleExpand('price')}>
          <span>Price</span>
          <ChevronDown size={16} className={expanded.price ? 'expanded' : ''} />
        </button>
        {expanded.price && (
          <div className="filter-options">
            {priceRanges.map((range, idx) => (
              <label key={idx} className="filter-checkbox">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price[0] === range.min && filters.price[1] === range.max}
                  onChange={() => handlePriceRange(range.min, range.max)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="filter-section">
        <button className="filter-toggle" onClick={() => toggleExpand('size')}>
          <span>Size</span>
          <ChevronDown size={16} className={expanded.size ? 'expanded' : ''} />
        </button>
        {expanded.size && (
          <div className="filter-options size-grid">
            {allSizes.map(size => (
              <label key={size} className="filter-size">
                <input
                  type="checkbox"
                  checked={filters.size.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="filter-section">
        <button className="filter-toggle" onClick={() => toggleExpand('color')}>
          <span>Color</span>
          <ChevronDown size={16} className={expanded.color ? 'expanded' : ''} />
        </button>
        {expanded.color && (
          <div className="filter-options">
            {allColors.map(color => (
              <label key={color} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.color.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
                <span>{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
