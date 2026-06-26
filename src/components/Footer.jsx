import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import './footer.css'

const COLS = [
  { h:'Company', links:['About','Contact','FAQ','Careers'] },
  { h:'Policies', links:['Privacy Policy','Shipping Policy','Returns','Terms & Conditions'] },
  { h:'Shop', links:["Men's Shirts","Men's Pants","Women's Dresses",'Shoes','Watches'] },
]
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <span className="nav__logo">OUTFIT</span>
          <p>Style Beyond Trends. Premium fashion for Men &amp; Women, crafted for the modern minimalist.</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram"><Instagram size={18}/></a>
            <a href="#" aria-label="Twitter"><Twitter size={18}/></a>
            <a href="#" aria-label="Facebook"><Facebook size={18}/></a>
            <a href="#" aria-label="YouTube"><Youtube size={18}/></a>
          </div>
        </div>
        {COLS.map((c,i)=>(
          <div key={i} className="footer__col"><h4>{c.h}</h4>{c.links.map((l,j)=>(<Link key={j} to="/">{l}</Link>))}</div>
        ))}
      </div>
      <div className="container footer__bar"><span>© {new Date().getFullYear()} OUTFIT. All rights reserved.</span><span>Made for a world-class fashion ecosystem.</span></div>
    </footer>
  )
}
