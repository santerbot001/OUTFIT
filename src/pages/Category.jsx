import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CATEGORIES, PRODUCTS, byCategory } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './category.css'

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

  const showFilters = slug === 'shoes' || slug === 'watches'

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}>
      <div className="cat-hero"><div className="container"><nav className="crumbs"><Link to="/">Home</Link> / <span>{meta?.label||slug}</span></nav><h1>{meta?.label||'Products'}</h1></div></div>

      <section className="section container">
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

        {filteredProducts.length > 0 ? (
          <div className="pcard-grid">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="no-products">No products available. Check back soon!</p>
        )}
      </section>
    </motion.div>
  )
}
