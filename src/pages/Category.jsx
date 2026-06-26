import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CATEGORIES, PRODUCTS, byCategory } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './category.css'

const MEN_SUBCATEGORIES = [
  { label: 'Casual wears', slug: 'mens-casual', image: 'https://images.unsplash.com/photo-1490185160400-75e656de9742?w=600&h=800&fit=crop' },
  { label: 'Formals wears', slug: 'mens-formals', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=800&fit=crop' },
  { label: 'Party wears', slug: 'mens-party', image: 'https://images.unsplash.com/photo-1539533057440-7814a9755706?w=600&h=800&fit=crop' },
  { label: 'Street wears', slug: 'mens-street', image: 'https://images.unsplash.com/photo-1529886407128-c65c84de1fb4?w=600&h=800&fit=crop' },
  { label: 'Traditional wears', slug: 'mens-traditional', image: 'https://images.unsplash.com/photo-1591209240644-b57fa99d6daa?w=600&h=800&fit=crop' },
]

const WOMEN_SUBCATEGORIES = [
  { label: 'Tops, jeans', slug: 'womens-tops', image: 'https://images.unsplash.com/photo-1551551234-5fd63aaf93fe?w=600&h=800&fit=crop' },
  { label: 'Kurta and kurta sets', slug: 'womens-kurta', image: 'https://images.unsplash.com/photo-1610271340738-b049cd451cb5?w=600&h=800&fit=crop' },
  { label: 'Dresses and jumpsuits', slug: 'womens-dresses', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop' },
  { label: 'Party wears', slug: 'womens-party', image: 'https://images.unsplash.com/photo-1595777712802-4b03f4b85b8a?w=600&h=800&fit=crop' },
  { label: 'Active wear', slug: 'womens-active', image: 'https://images.unsplash.com/photo-1535394965917-3c7b1c7d9c7d?w=600&h=800&fit=crop' },
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

  const showFilters = slug === 'shoes' || slug === 'watches'
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
