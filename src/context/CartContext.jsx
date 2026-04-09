// import { createContext, useContext, useState } from 'react'

// const CartContext = createContext(null)

// export function CartProvider({ children }) {
//   const [items, setItems] = useState([])
//   const [open, setOpen] = useState(false)

//   function addItem(coffee, size = '250g', qty = 1) {
//     setItems(prev => {
//       const key = `${coffee.id}-${size}`
//       const existing = prev.find(i => i.key === key)
//       if (existing) {
//         return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
//       }
//       const prices = { '250g': 18, '500g': 32, '1kg': 58 }
//       return [...prev, { key, coffee, size, qty, price: prices[size] }]
//     })
//     setOpen(true)
//   }

//   function removeItem(key) {
//     setItems(prev => prev.filter(i => i.key !== key))
//   }

//   function updateQty(key, qty) {
//     if (qty < 1) { removeItem(key); return }
//     setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
//   }

//   function clearCart() {
//     setItems([])
//   }

//   const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
//   const count = items.reduce((sum, i) => sum + i.qty, 0)

//   return (
//     <CartContext.Provider value={{ items, open, setOpen, addItem, removeItem, updateQty, clearCart, total, count }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   return useContext(CartContext)
// }
import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (coffee) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === coffee.id)
      if (existing) {
        return prev.map(i => i.id === coffee.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...coffee, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQty = (id, delta) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    )
  }

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)