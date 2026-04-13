import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
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
import Feedback from './components/sections/Feedback'
import Contact from './components/sections/Contact'
import CartPage from './components/sections/CartPage'
import OrderHistory from './components/sections/Orderhistory'

export default function App() {
  const [showCart, setShowCart]       = useState(false)
  const [showOrders, setShowOrders]   = useState(false)

  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div className="grain">
            <Navbar
              onCartOpen={() => setShowCart(true)}
              onOrdersOpen={() => setShowOrders(true)}
            />
            <main>
              {showCart ? (
                <CartPage onClose={() => setShowCart(false)} />
              ) : showOrders ? (
                <OrderHistory onClose={() => setShowOrders(false)} />
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
                  <Feedback />
                  <Contact />
                </>
              )}
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}