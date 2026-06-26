import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Instagram, MapPin, Mail } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'
import './about.css'

const PageMotion = { initial:{opacity:0}, animate:{opacity:1}, exit:{opacity:0}, transition:{duration:.4} }

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const { show } = useToast()

  const handleEmailClick = (e) => {
    const email = 'parthiravi20@gmail.com'
    navigator.clipboard.writeText(email)
    show({ type: 'success', text: 'Email copied to clipboard!' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      show({ type: 'error', text: 'Please fill all fields' })
      return
    }
    
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      show({ type: 'success', text: 'Query submitted successfully! We\'ll get back to you soon.' })
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      show({ type: 'error', text: 'Error submitting query. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div {...PageMotion}>
      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="container about-hero__content">
          <h1>About OUTFIT</h1>
          <p>Premium fashion marketplace curated for modern minimalists who value quality and style.</p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="section container">
        <div className="about-grid">
          <motion.div className="contact-card" whileHover={{y:-4}} transition={{duration:.3}}>
            <div className="contact-card__icon"><Phone size={28}/></div>
            <h3>Call Us</h3>
            <a href="tel:+919600077554" className="contact-card__link">+91 96000 77554</a>
            <p>Available Mon-Sat, 10AM-6PM IST</p>
          </motion.div>

          <motion.div className="contact-card" whileHover={{y:-4}} transition={{duration:.3}}>
            <div className="contact-card__icon"><Instagram size={28}/></div>
            <h3>Follow Us</h3>
            <a href="https://instagram.com/outfitmenwear20" target="_blank" rel="noopener noreferrer" className="contact-card__link">@outfitmenwear20</a>
            <p>Daily styles and new arrivals</p>
          </motion.div>

          <motion.div className="contact-card" whileHover={{y:-4}} transition={{duration:.3}}>
            <div className="contact-card__icon"><MapPin size={28}/></div>
            <h3>Visit Us</h3>
            <a href="https://maps.app.goo.gl/zkG8VCkQ3NJ5kRWDA?g_st=iw" target="_blank" rel="noopener noreferrer" className="contact-card__link">View on Maps</a>
            <p>Find our store location</p>
          </motion.div>

          <motion.div className="contact-card" whileHover={{y:-4}} transition={{duration:.3}}>
            <div className="contact-card__icon"><Mail size={28}/></div>
            <h3>Email Us</h3>
            <button className="contact-card__link" onClick={handleEmailClick}>parthiravi20@gmail.com</button>
            <p>We respond within 24 hours</p>
          </motion.div>
        </div>
      </section>

      {/* QUERY SECTION */}
      <section className="section container">
        <div className="query-section">
          <div className="query-head">
            <h2>Have a Query?</h2>
            <p>Send us your questions or feedback and we'll get back to you shortly.</p>
          </div>

          <form className="query-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                className="input"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                className="input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                className="input query-textarea"
                placeholder="Your query or feedback..."
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn--block" disabled={loading}>
              {loading ? 'Sending...' : 'Submit Query'}
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  )
}
