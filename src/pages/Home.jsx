import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Truck, RefreshCw, ShieldCheck, Zap } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import QuickView from '../components/QuickView.jsx'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import { useState, useRef } from 'react'

const PageMotion = { initial:{opacity:0}, animate:{opacity:1}, exit:{opacity:0}, transition:{duration:.4} }
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:.06 } } }
const word = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.6,ease:[0.22,0.61,0.36,1]}} }

export default function Home() {
  const headline = ['Style','Beyond','Trends']
  const displayCategories = CATEGORIES.filter(c => c.slug !== 'pants' && c.slug !== 'dresses')
  const [quickView, setQuickView] = useState(null)
  const newArrivals = PRODUCTS.slice(0, 4)
  const categoriesRef = useRef(null)

  const handleShopClick = (e) => {
    e.preventDefault()
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <motion.div {...PageMotion}>
      {/* HERO */}
      <section className="hero">
        <motion.img className="hero__bg" src="https://picsum.photos/seed/outfit-hero/1800/1100" alt="" loading="eager"
          initial={{opacity:0,scale:1.06,y:-10}} animate={{opacity:1,scale:1,y:0}} transition={{duration:1.2,ease:[0.22,0.61,0.36,1]}} />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <motion.img className="hero__logo" src="https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F8ece058782244bdda9f1d6c2f07eec1c?format=webp&width=800&height=1200" alt="OUTFIT Logo" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:.2}} />
          <motion.span className="eyebrow" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.1}}>Premium Fashion Marketplace</motion.span>
          <motion.h1 className="hero__title" variants={stagger} initial="hidden" animate="show">
            {headline.map((w,i)=>(<motion.span key={i} variants={word} style={{display:'inline-block',marginRight:'.28em'}}>{w}</motion.span>))}
          </motion.h1>
          <motion.p className="hero__sub" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.7,duration:.6}}>
            Curated essentials for Men &amp; Women — timeless silhouettes, exceptional materials, effortless minimalism.
          </motion.p>
          <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:1,duration:.5,ease:[0.22,0.61,0.36,1]}}>
            <button onClick={handleShopClick} className="btn hero__cta">Shop Now</button>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section container" ref={categoriesRef}>
        <Reveal><div className="section__head"><span className="eyebrow">Browse</span><h2>Shop by Category</h2></div></Reveal>
        <div className="cat-grid">
          {displayCategories.map((c,i)=>(
            <Reveal key={c.slug} delay={i*.05}>
              <Link to={`/category/${c.slug}`} className="cat-card">
                <img src={c.cover} alt={c.label} loading="lazy" />
                <span className="cat-card__label">{c.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>


      {/* PROMO */}
      <section className="section"><div className="container promo">
        {[[Truck,'Free Shipping','On orders over ₹4,999'],[RefreshCw,'Easy Returns','30-day hassle-free'],[ShieldCheck,'Secure Payments','256-bit encryption'],[Zap,'Fast Delivery','2–4 business days']].map(([Icon,t,s],i)=>(
          <Reveal key={i} delay={i*.05}><div className="promo__item"><Icon size={26}/><div><strong>{t}</strong><span>{s}</span></div></div></Reveal>
        ))}
      </div></section>

      {quickView && <QuickView product={quickView} onClose={()=>setQuickView(null)} />}
    </motion.div>
  )
}
