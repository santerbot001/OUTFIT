import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist() {
  const { ids } = useWishlist()
  const items = PRODUCTS.filter(p=>ids.includes(p.id))
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="container section">
      <div className="section__head"><span className="eyebrow">Saved for later</span><h1>Your Wishlist</h1></div>
      {items.length===0 ? <div style={{textAlign:'center',padding:'48px 0',color:'var(--muted)'}}><p>No saved items yet.</p><Link className="btn" to="/category/shirts">Discover pieces</Link></div>
        : <div className="grid grid--4">{items.map(p=>(<ProductCard key={p.id} product={p} />))}</div>}
    </motion.div>
  )
}
