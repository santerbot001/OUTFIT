import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import PageLoader from './components/PageLoader.jsx'
import useLenis from './hooks/useLenis.js'

const Home = lazy(() => import('./pages/Home.jsx'))
const Category = lazy(() => import('./pages/Category.jsx'))
const Product = lazy(() => import('./pages/Product.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'))
const Account = lazy(() => import('./pages/Account.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  const location = useLocation()
  useLenis()
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
