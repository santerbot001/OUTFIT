import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import Rating from './Rating.jsx'
import Price from './Price.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import './product-card.css'

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const liked = has(product.id)
  return (
    <motion.article className="pcard" whileHover="hover" initial="rest" animate="rest">
      <div className="pcard__media">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <motion.img loading="lazy" src={product.image} alt={product.name}
            variants={{ rest:{ scale:1 }, hover:{ scale:1.05 } }} transition={{ duration:.6, ease:[0.22,0.61,0.36,1] }} />
        </Link>
        {product.discount>0 && <span className="pcard__badge">-{product.discount}%</span>}
        <motion.button className={'pcard__wish'+(liked?' is-on':'')} aria-label="Wishlist"
          onClick={()=>toggle(product.id)}
          variants={{ rest:{ opacity:0, y:-6 }, hover:{ opacity:1, y:0 } }}>
          <Heart size={18} fill={liked?'#0A0A0A':'none'} />
        </motion.button>
        <motion.div className="pcard__actions" variants={{ rest:{ opacity:0, y:14 }, hover:{ opacity:1, y:0 } }} transition={{ duration:.3 }}>
          <button className="pcard__qv" onClick={()=>onQuickView?.(product)}><Eye size={15}/> Quick View</button>
          <button className="pcard__add" onClick={()=>addItem(product,{ size:product.sizes[0], color:product.colors[0] })}><ShoppingBag size={15}/> Add</button>
        </motion.div>
      </div>
      <div className="pcard__body">
        <span className="pcard__brand">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="pcard__name">{product.name}</Link>
        <Rating value={product.rating} count={product.reviews} />
        <div className="pcard__foot">
          <Price price={product.price} original={product.original} />
          <div className="pcard__colors">{product.colors.slice(0,4).map((c,i)=>(<span key={i} className="pcard__dot" title={c} style={{background:swatch(c)}} />))}</div>
        </div>
      </div>
    </motion.article>
  )
}
function swatch(c){const m={Black:'#0A0A0A',White:'#fff',Beige:'#D9CBB8',Navy:'#1E2A44',Olive:'#5C6B4C',Brown:'#6B4A2E',Silver:'#C7CDD1',Gold:'#C9A24B'};return m[c]||'#ddd'}
