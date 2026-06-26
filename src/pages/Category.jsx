import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard.jsx'
import QuickView from '../components/QuickView.jsx'
import Reveal from '../components/Reveal.jsx'
import { byCategory, CATEGORIES } from '../data/products.js'

export default function Category() {
  const { slug } = useParams()
  const meta = CATEGORIES.find(c=>c.slug===slug)
  const all = byCategory(slug)
  const [sort,setSort] = useState('featured')
  const [qv,setQv] = useState(null)
  const items = useMemo(()=>{
    const a=[...all]
    if(sort==='low') a.sort((x,y)=>x.price-y.price)
    if(sort==='high') a.sort((x,y)=>y.price-x.price)
    if(sort==='rating') a.sort((x,y)=>y.rating-x.rating)
    return a
  },[sort,slug])
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}>
      <div className="cat-hero"><div className="container"><nav className="crumbs"><Link to="/">Home</Link> / <span>{meta?.label||slug}</span></nav><h1>{meta?.label||'Products'}</h1><p>{all.length} pieces · curated for the season</p></div></div>
      <section className="section container">
        <div className="cat-toolbar"><span>{all.length} results</span>
          <label className="field" style={{flexDirection:'row',alignItems:'center',gap:8}}>Sort
            <select className="input" style={{width:'auto'}} value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Top Rated</option>
            </select>
          </label>
        </div>
        <div className="grid grid--4">
          {items.map((p,i)=>(<Reveal key={p.id} delay={(i%4)*.05}><ProductCard product={p} onQuickView={setQv} /></Reveal>))}
        </div>
      </section>
      <QuickView product={qv} onClose={()=>setQv(null)} />
    </motion.div>
  )
}
