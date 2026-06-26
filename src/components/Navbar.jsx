import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import NavDropdown from './NavDropdown.jsx'
import './navbar.css'

const LINKS = [
  { to:'/', label:'Home' },
  { to:'/category/shoes', label:'Shoes' },
  { to:'/category/watches', label:'Watches' },
  { to:'/category/dresses', label:'Sale' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { setOpen, count } = useCart()
  const { count: wCount } = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll(); window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={'nav' + (scrolled ? ' nav--scrolled' : '')}>
      <div className="container nav__inner">
        <button className="nav__burger" aria-label="Menu" onClick={()=>setMenuOpen(true)}><Menu size={22}/></button>
        <Link to="/" className="nav__logo">OUTFIT</Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/" className={({isActive})=>'nav__link'+(isActive?' is-active':'')}>Home</NavLink>
          <NavDropdown />
          {LINKS.slice(1).map((l,i)=>(
            <NavLink key={i} to={l.to} className={({isActive})=>'nav__link'+(isActive?' is-active':'')}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <button className="nav__icon" aria-label="Search" onClick={()=>setSearchOpen(true)}><Search size={20}/></button>
          <Link to="/wishlist" className="nav__icon" aria-label="Wishlist">
            <Heart size={20}/>{wCount>0 && <span className="nav__badge">{wCount}</span>}
          </Link>
          <Link to="/account" className="nav__icon" aria-label="Account"><User size={20}/></Link>
          <button className="nav__icon" aria-label="Cart" onClick={()=>setOpen(true)}>
            <ShoppingBag size={20}/>{count>0 && <span className="nav__badge">{count}</span>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div className="nav__search" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.3,ease:[0.22,0.61,0.36,1]}}>
            <div className="container nav__search-inner">
              <Search size={20}/>
              <input autoFocus className="nav__search-input" placeholder="Search for shirts, watches, dresses…" />
              <button className="nav__icon" aria-label="Close search" onClick={()=>setSearchOpen(false)}><X size={20}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="nav__mobile" initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}} transition={{type:'tween',duration:.35,ease:[0.22,0.61,0.36,1]}}>
            <div className="nav__mobile-head"><span className="nav__logo">OUTFIT</span><button className="nav__icon" aria-label="Close" onClick={()=>setMenuOpen(false)}><X size={22}/></button></div>
            {LINKS.map((l,i)=>(<NavLink key={i} to={l.to} className="nav__mobile-link" onClick={()=>setMenuOpen(false)}>{l.label}</NavLink>))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
