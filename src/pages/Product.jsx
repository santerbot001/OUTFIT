import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Minus, Plus } from 'lucide-react'
import { getProduct, related } from '../data/products.js'
import Rating from '../components/Rating.jsx'
import Price from '../components/Price.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const p = getProduct(id)
  const { addItem, setOpen } = useCart()
  const { has, toggle } = useWishlist()
  const { isLoggedIn } = useAuth()
  const { addToast } = useToast()
  const [active,setActive] = useState(0)
  const [size,setSize] = useState(p?.sizes[0]||'')
  const [color,setColor] = useState(p?.colors[0]||'')
  const [qty,setQty] = useState(1)
  const [tab,setTab] = useState('desc')

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      addToast('Please log in to continue', {
        action: {
          label: 'Sign In',
          onClick: () => window.location.href = '/account'
        },
        duration: 0
      })
      return
    }
    addItem(p, { size, color, qty })
    setOpen(true)
  }
  if(!p) return <div className="container section"><h2>Product not found</h2><Link className="btn" to="/">Back home</Link></div>
  const liked = has(p.id)
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}>
      <section className="section container pdp">
        <div className="pdp__gallery">
          <div className="pdp__main"><motion.img key={active} src={p.gallery[active]} alt={p.name} initial={{opacity:0,scale:1.02}} animate={{opacity:1,scale:1}} transition={{duration:.4}} /></div>
          <div className="pdp__thumbs">{p.gallery.map((g,i)=>(<button key={i} className={'pdp__thumb'+(i===active?' is-on':'')} onClick={()=>setActive(i)}><img src={g} alt="" loading="lazy" /></button>))}</div>
        </div>
        <div className="pdp__info">
          <nav className="crumbs"><Link to="/">Home</Link> / <Link to={`/category/${p.category}`}>{p.category}</Link> / <span>{p.name}</span></nav>
          <span className="eyebrow">{p.brand}</span>
          <h1>{p.name}</h1>
          <div className="pdp__rate"><Rating value={p.rating} count={p.reviews} /></div>
          <div className="pdp__price"><Price price={p.price} original={p.original} />{p.discount>0 && <span className="pdp__save">Save {p.discount}%</span>}</div>
          <p className="pdp__desc">{p.description}</p>
          {p.colors.length>0 && <div className="pdp__opt"><span className="pdp__opt-label">Color: <strong>{color}</strong></span><div className="pdp__swatches">{p.colors.map(c=>(<button key={c} className={'pdp__sw'+(c===color?' is-on':'')} onClick={()=>setColor(c)}>{c}</button>))}</div></div>}
          {p.sizes.length>0 && <div className="pdp__opt"><span className="pdp__opt-label">Size: <strong>{size}</strong></span><div className="pdp__sizes">{p.sizes.map(s=>(<button key={s} className={'pdp__size'+(s===size?' is-on':'')} onClick={()=>setSize(s)}>{s}</button>))}</div></div>}
          <div className="pdp__buyrow">
            <div className="drawer__qty"><button aria-label="Decrease" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={14}/></button><span>{qty}</span><button aria-label="Increase" onClick={()=>setQty(q=>q+1)}><Plus size={14}/></button></div>
            <span className={'pdp__stock'+(p.stock<8?' is-low':'')}>{p.stock<8?`Only ${p.stock} left`:'In stock'}</span>
          </div>
          <div className="pdp__cta">
            <button className="btn btn--block" onClick={()=>addItem(p,{size,color,qty})}><ShoppingBag size={16}/> Add to Cart</button>
            <button className="btn btn--ghost" onClick={handleBuyNow}>Buy Now</button>
            <button className={'pdp__wish'+(liked?' is-on':'')} aria-label="Wishlist" onClick={()=>toggle(p.id)}><Heart size={18} fill={liked?'#0A0A0A':'none'} /></button>
          </div>
          <div className="pdp__assure">
            <span><Truck size={16}/> Est. delivery 2–4 days</span><span><RefreshCw size={16}/> 30-day returns</span><span><ShieldCheck size={16}/> Secure checkout</span>
          </div>
          <div className="pdp__tabs">
            <div className="pdp__tabnav">{[['desc','Description'],['specs','Specifications'],['care','Care']].map(([k,l])=>(<button key={k} className={tab===k?'is-on':''} onClick={()=>setTab(k)}>{l}</button>))}</div>
            <div className="pdp__tabbody">
              {tab==='desc' && <p>{p.description} Designed in-house and finished by hand, every OUTFIT piece is built to outlast seasons.</p>}
              {tab==='specs' && <ul className="pdp__list">{p.specs.map(([k,v])=>(<li key={k}><span>{k}</span><strong>{v}</strong></li>))}</ul>}
              {tab==='care' && <ul className="pdp__bullets">{p.care.map(c=>(<li key={c}>{c}</li>))}</ul>}
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <Reveal><div className="section__head"><span className="eyebrow">You may also like</span><h2>Related Products</h2></div></Reveal>
        <div className="grid grid--4">{related(p).map((r,i)=>(<Reveal key={r.id} delay={i*.05}><ProductCard product={r} /></Reveal>))}</div>
      </section>
    </motion.div>
  )
}
