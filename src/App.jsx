// import { useState } from 'react'
// import Navbar from './components/layout/Navbar'
// import Footer from './components/layout/Footer'
// import ScrollToTop from './components/ui/ScrollToTop'
// import Hero from './components/sections/Hero'
// import Story from './components/sections/Story'
// import Journey from './components/sections/Journey'
// import Origins from './components/sections/Origins'
// import Coffees from './components/sections/Coffees'
// import Roastery from './components/sections/Roastery'
// import Gallery from './components/sections/Gallery'
// import Ethics from './components/sections/Ethics'
// import Contact from './components/sections/Contact'
// import { AuthProvider } from './context/AuthContext'
// import { CartProvider } from './context/CartContext'
// import LoginModal from './components/cart/LoginModal'
// import CartDrawer from './components/cart/CartDrawer'
// import CheckoutPage from './components/cart/CheckoutPage'

// function AppContent() {
//   const [showLogin, setShowLogin] = useState(false)
//   const [showCheckout, setShowCheckout] = useState(false)

//   return (
//     <div className="grain">
//       <Navbar onLoginClick={() => setShowLogin(true)} />
//       <main>
//         <Hero />
//         <Story />
//         <Journey />
//         <Origins />
//         <Coffees onLoginRequired={() => setShowLogin(true)} />
//         <Roastery />
//         <Gallery />
//         <Ethics />
//         <Contact />
//       </main>
//       <Footer />
//       <ScrollToTop />

//       <CartDrawer onCheckout={() => { setShowCheckout(true) }} />
//       {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
//       {showCheckout && <CheckoutPage onClose={() => setShowCheckout(false)} />}
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <AppContent />
//       </CartProvider>
//     </AuthProvider>
//   )
// }

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
            <CartPage />
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