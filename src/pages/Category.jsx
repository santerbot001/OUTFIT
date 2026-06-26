import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/products.js'

export default function Category() {
  const { slug } = useParams()
  const meta = CATEGORIES.find(c=>c.slug===slug)
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}>
      <div className="cat-hero"><div className="container"><nav className="crumbs"><Link to="/">Home</Link> / <span>{meta?.label||slug}</span></nav><h1>{meta?.label||'Products'}</h1><p>No products available. Check back soon!</p></div></div>
    </motion.div>
  )
}
