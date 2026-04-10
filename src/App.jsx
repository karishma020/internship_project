import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import Hero from './components/sections/Hero'
import Story from './components/sections/Story'
import Journey from './components/sections/Journey'
import Origins from './components/sections/Origins'
import Coffees from './components/sections/Coffees'
import Roastery from './components/sections/Roastery'
import Gallery from './components/sections/Gallery'
import Ethics from './components/sections/Ethics'
import Contact from './components/sections/Contact'
import CartPage from './components/sections/CartPage'

export default function App() {
  const [showCart, setShowCart] = useState(false)

  return (
    <CartProvider>
      <div className="grain">
        <Navbar onCartOpen={() => setShowCart(true)} />
        <main>
          {showCart ? (
            <CartPage onClose={() => setShowCart(false)} />
          ) : (
            <>
              <Hero />
              <Story />
              <Journey />
              <Origins />
              <Coffees />
              <Roastery />
              <Gallery />
              <Ethics />
              <Contact />
            </>
          )}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </CartProvider>
  )
}