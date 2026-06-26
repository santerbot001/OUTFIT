import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Package, Heart, MapPin, Lock } from 'lucide-react'

const TABS = [['profile','Profile',User],['orders','Orders',Package],['wishlist','Wishlist',Heart],['address','Addresses',MapPin],['password','Password',Lock]]
export default function Account() {
  const [authed,setAuthed] = useState(false)
  const [mode,setMode] = useState('login')
  const [tab,setTab] = useState('profile')
  if(!authed) return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="container section" style={{maxWidth:440}}>
      <div className="auth">
        <div className="auth__tabs"><button className={mode==='login'?'is-on':''} onClick={()=>setMode('login')}>Login</button><button className={mode==='register'?'is-on':''} onClick={()=>setMode('register')}>Register</button></div>
        <form onSubmit={e=>{e.preventDefault();setAuthed(true)}} className="auth__form">
          {mode==='register' && <div className="field"><label>Full name</label><input className="input" required/></div>}
          <div className="field"><label>Email</label><input className="input" type="email" required/></div>
          <div className="field"><label>Password</label><input className="input" type="password" required/></div>
          <button className="btn btn--block">{mode==='login'?'Sign In':'Create Account'}</button>
        </form>
      </div>
    </motion.div>
  )
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="container section account">
      <aside className="account__nav">{TABS.map(([k,l,Icon])=>(<button key={k} className={tab===k?'is-on':''} onClick={()=>setTab(k)}><Icon size={17}/> {l}</button>))}<button onClick={()=>setAuthed(false)} className="account__logout">Sign out</button></aside>
      <div className="account__panel">
        {tab==='profile' && <div><h2>Profile</h2><div className="grid grid--2" style={{marginTop:16}}>{['First name','Last name','Email','Phone'].map(l=>(<div key={l} className="field"><label>{l}</label><input className="input"/></div>))}</div><button className="btn" style={{marginTop:16}}>Save changes</button></div>}
        {tab==='orders' && <div><h2>Order History</h2>{[['#OUT-1042','Delivered','₹6,998'],['#OUT-1039','In transit','₹12,999'],['#OUT-1031','Delivered','₹2,499']].map(([id,st,amt])=>(<div key={id} className="account__order"><div><strong>{id}</strong><span>{st}</span></div><strong>{amt}</strong></div>))}</div>}
        {tab==='wishlist' && <div><h2>Wishlist</h2><p style={{color:'var(--muted)',marginTop:8}}>Saved items appear on your <a href="/wishlist">wishlist page</a>.</p></div>}
        {tab==='address' && <div><h2>Saved Addresses</h2><div className="account__order"><div><strong>Home</strong><span>221B, MG Road, Bengaluru 560001</span></div><button className="btn btn--ghost">Edit</button></div></div>}
        {tab==='password' && <div><h2>Change Password</h2><div style={{maxWidth:380,marginTop:16,display:'grid',gap:14}}>{['Current password','New password','Confirm password'].map(l=>(<div key={l} className="field"><label>{l}</label><input className="input" type="password"/></div>))}</div><button className="btn" style={{marginTop:16}}>Update password</button></div>}
      </div>
    </motion.div>
  )
}
