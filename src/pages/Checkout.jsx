import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { inr } from '../components/Price.jsx'

const STEPS = ['Address','Payment','Review']
export default function Checkout() {
  const { items, subtotal, discount, tax, shipping, total, clear } = useCart()
  const [step,setStep] = useState(0)
  const [done,setDone] = useState(false)
  const next = ()=> step<STEPS.length-1 ? setStep(s=>s+1) : (setDone(true), clear())
  if(done) return (
    <div className="container section" style={{textAlign:'center',maxWidth:560}}>
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200,damping:14}} style={{width:72,height:72,borderRadius:'50%',background:'var(--ink)',color:'#fff',display:'grid',placeItems:'center',margin:'0 auto 20px'}}><Check size={34}/></motion.div>
      <h1>Order confirmed</h1><p style={{color:'var(--muted)'}}>Thank you for shopping with OUTFIT. A confirmation has been sent to your email.</p>
    </div>
  )
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="container section checkout">
      <div className="checkout__main">
        <div className="steps">{STEPS.map((s,i)=>(<div key={s} className={'steps__item'+(i<=step?' is-on':'')}><span className="steps__dot">{i<step?<Check size={14}/>:i+1}</span><span>{s}</span></div>))}</div>
        <motion.div key={step} initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{duration:.35}} className="checkout__panel">
          {step===0 && <Form fields={[['Full name','text'],['Phone','tel'],['Address line','text'],['City','text'],['State','text'],['PIN code','text']]} title="Shipping address" />}
          {step===1 && <div className="opts">{[['Card','Visa, Mastercard, Amex'],['UPI','GPay, PhonePe, Paytm'],['Cash on Delivery','Pay when it arrives']].map(([t,s],i)=>(<label key={t} className="opt"><input type="radio" name="pay" defaultChecked={i===0}/><div><strong>{t}</strong><span>{s}</span></div></label>))}</div>}
          {step===2 && <div><h3 style={{marginBottom:12}}>Review your order</h3>{items.map(it=>(<div key={it.key} className="checkout__line"><span>{it.name} × {it.qty}</span><strong>{inr(it.price*it.qty)}</strong></div>))}{items.length===0 && <p style={{color:'var(--muted)'}}>Your cart is empty.</p>}</div>}
        </motion.div>
        <div className="checkout__nav">{step>0 && <button className="btn btn--ghost" onClick={()=>setStep(s=>s-1)}>Back</button>}<button className="btn" onClick={next}>{step===STEPS.length-1?'Place Order':'Continue'}</button></div>
      </div>
      <aside className="checkout__summary">
        <h3>Order Summary</h3>
        <Row l="Subtotal" v={inr(subtotal)} />{discount>0 && <Row l="Discount" v={'-'+inr(discount)} />}<Row l="Tax" v={inr(tax)} /><Row l="Shipping" v={shipping===0?'Free':inr(shipping)} /><Row l="Total" v={inr(total)} strong />
      </aside>
    </motion.div>
  )
}
function Form({fields,title}){return <div><h3 style={{marginBottom:14}}>{title}</h3><div className="grid grid--2">{fields.map(([l,t])=>(<div key={l} className="field"><label>{l}</label><input className="input" type={t}/></div>))}</div></div>}
function Row({l,v,strong}){return <div className={'drawer__row'+(strong?' is-total':'')}><span>{l}</span><span>{v}</span></div>}
