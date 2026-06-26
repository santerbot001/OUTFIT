import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CATEGORIES, PRODUCTS, byCategory } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './category.css'

const MEN_SUBCATEGORIES = [
  { label: 'Casual wears', slug: 'mens-casual', image: 'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJ3MlMjBjYXN1YWx8ZW58MHx8MHx8fDA%3D' },
  { label: 'Formals wears', slug: 'mens-formals', image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?q=80&w=670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D4' },
  { label: 'Party wears', slug: 'mens-party', image: 'https://images.unsplash.com/photo-1741709846033-67a45021fcb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFydHlzJTIwd2VhciUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D' },
  { label: 'Street wears', slug: 'mens-street', image: 'https://images.unsplash.com/photo-1587715362716-f55bde292cd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbidzJTIwc3RyZWV0JTIwZHJlc3MlMjBjb2RlfGVufDB8fDB8fHww' },
  { label: 'Traditional wears', slug: 'mens-traditional', image: 'https://plus.unsplash.com/premium_photo-1691030254390-aa56b22e6a45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRyYWRpdGlvbmFsJTIwZm9yJTIwbWVufGVufDB8fDB8fHww' },
]

const WOMEN_SUBCATEGORIES = [
  { label: 'Tops, jeans', slug: 'womens-tops', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Kurta and kurta sets', slug: 'womens-kurta', image: 'https://images.unsplash.com/photo-1604436607823-d721dfe2df46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW5zLWt1cnRhfGVufDB8fDB8fHww' },
  { label: 'Dresses and jumpsuits', slug: 'womens-dresses', image: 'https://images.unsplash.com/photo-1651047454187-a7a066e5ad8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8anVtcCUyMHN1aXRzfGVufDB8fDB8fHww' },
  { label: 'Party wears', slug: 'womens-party', image: 'https://images.unsplash.com/photo-1604384294297-7362af7ea2d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBhcnQlMjB3ZWFyJTIwZm9yJTIwd29tZW58ZW58MHx8MHx8fDA%3D' },
  { label: 'Active wear', slug: 'womens-active', image: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWN0aXZlJTIwd2VhciUyMGZvciUyMHdvbWVufGVufDB8fDB8fHww' },
]

export default function Category() {
  const { slug } = useParams()
  const meta = CATEGORIES.find(c=>c.slug===slug)
  const allProducts = byCategory(slug)

  const [selectedGender, setSelectedGender] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  const genders = ['men', 'women']
  const colors = [...new Set(allProducts.flatMap(p => p.colors))].sort()

  const filteredProducts = allProducts.filter(p => {
    const genderMatch = !selectedGender || p.gender === selectedGender
    const colorMatch = !selectedColor || p.colors.includes(selectedColor)
    return genderMatch && colorMatch
  })

  const showFilters = slug === 'shoes' || slug === 'Accesories'
  const showMenSubcategories = slug === 'shirts'
  const showWomenSubcategories = slug === 'women-dresses'

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}>
      <div className="cat-hero"><div className="container"><nav className="crumbs"><Link to="/">Home</Link> / <span>{meta?.label||slug}</span></nav><h1>{meta?.label||'Products'}</h1></div></div>

      <section className="section container">
        {showMenSubcategories && (
          <div className="cat-grid">
            {MEN_SUBCATEGORIES.map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="cat-card">
                <img src={cat.image} alt={cat.label} />
                <div className="cat-card__veil"></div>
                <div className="cat-card__label">{cat.label}</div>
              </Link>
            ))}
          </div>
        )}

        {showWomenSubcategories && (
          <div className="cat-grid">
            {WOMEN_SUBCATEGORIES.map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="cat-card">
                <img src={cat.image} alt={cat.label} />
                <div className="cat-card__veil"></div>
                <div className="cat-card__label">{cat.label}</div>
              </Link>
            ))}
          </div>
        )}

        {showFilters && (
          <div className="cat-toolbar">
            <div className="cat-filters">
              <div className="filter-group">
                <label className="filter-label">Gender</label>
                <div className="filter-options">
                  {genders.map(g => (
                    <button
                      key={g}
                      className={`filter-option${selectedGender === g ? ' is-active' : ''}`}
                      onClick={() => setSelectedGender(selectedGender === g ? null : g)}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Color</label>
                <div className="filter-options">
                  {colors.map(c => (
                    <button
                      key={c}
                      className={`filter-option${selectedColor === c ? ' is-active' : ''}`}
                      onClick={() => setSelectedColor(selectedColor === c ? null : c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="pcard-grid">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  )
}
