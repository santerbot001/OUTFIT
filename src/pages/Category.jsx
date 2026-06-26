import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CATEGORIES, PRODUCTS, byCategory } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './category.css'

const MEN_SUBCATEGORIES = [
  { label: 'Casual wears', slug: 'mens-casual' },
  { label: 'Formals wears', slug: 'mens-formals' },
  { label: 'Party wears', slug: 'mens-party' },
  { label: 'Street wears', slug: 'mens-street' },
  { label: 'Traditional wears', slug: 'mens-traditional' },
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

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}>
      <div className="cat-hero"><div className="container"><nav className="crumbs"><Link to="/">Home</Link> / <span>{meta?.label||slug}</span></nav><h1>{meta?.label||'Products'}</h1></div></div>

      <section className="section container">
        {showMenSubcategories && (
          <div className="cat-grid">
            {MEN_SUBCATEGORIES.map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="cat-card">
                <div style={{backgroundColor:'#E8DDD5',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontSize:'18px',fontWeight:'600',color:'var(--ink)',textAlign:'center'}}>{cat.label}</span>
                </div>
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
