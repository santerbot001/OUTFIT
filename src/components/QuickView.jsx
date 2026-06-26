import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'
import Price from './Price.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function QuickView({ product, onClose }) {
  const { addItem } = useCart()
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div className="drawer__scrim" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} />
          <motion.div role="dialog" aria-label={product.name}
            style={{position:'fixed',inset:0,zIndex:80,display:'grid',placeItems:'center',padding:24,pointerEvents:'none'}}>
            <motion.div initial={{opacity:0,scale:.96,y:16}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:16}} transition={{duration:.3,ease:[0.22,0.61,0.36,1]}}
              style={{pointerEvents:'auto',background:'#fff',borderRadius:'var(--r-lg)',maxWidth:760,width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',overflow:'hidden',boxShadow:'var(--shadow-lg)'}}>
              <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',minHeight:360}} />
              <div style={{padding:28,display:'flex',flexDirection:'column',gap:12}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span className="eyebrow">{product.brand}</span><button className="nav__icon" onClick={onClose} aria-label="Close"><X size={18}/></button></div>
                <h3 style={{fontSize:24}}>{product.name}</h3>
                <Rating value={product.rating} count={product.reviews} />
                <Price price={product.price} original={product.original} />
                <p style={{color:'var(--muted)',fontSize:14}}>{product.description}</p>
                <button className="btn btn--block" onClick={()=>{addItem(product,{size:product.sizes[0],color:product.colors[0]});onClose()}}>Add to Cart</button>
                <Link to={`/product/${product.id}`} className="btn btn--ghost btn--block" onClick={onClose}>View Full Details</Link>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
