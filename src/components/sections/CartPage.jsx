// import { useState } from 'react'
// import { X, Minus, Plus, ArrowLeft, CheckCircle, LogIn } from 'lucide-react'
// import { useCart } from '../../context/CartContext'
// import { useAuth } from '../../context/AuthContext'
// import { db } from '../../firebase'
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// const FREE_DELIVERY_THRESHOLD = 600
// const SHIPPING_FEE = 99
// const TAX_RATE = 0.05

// /* ── Step indicator ── */
// function StepIndicator({ step }) {
//   const steps = ['Review', 'Shipping', 'Payment']
//   return (
//     <div className="flex items-center justify-center mb-12">
//       {steps.map((label, i) => {
//         const num = i + 1
//         const done = step > num
//         const active = step === num
//         return (
//           <div key={label} className="flex items-center">
//             <div className="flex flex-col items-center">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 ${
//                 done ? 'bg-gold text-espresso' : active ? 'bg-espresso text-cream' : 'bg-parchment text-caramel/40 border border-parchment'
//               }`}>
//                 {done ? <CheckCircle size={14} /> : num}
//               </div>
//               <span className={`font-mono text-[10px] tracking-widest2 uppercase mt-1.5 ${
//                 active ? 'text-espresso' : done ? 'text-gold' : 'text-caramel/30'
//               }`}>{label}</span>
//             </div>
//             {i < steps.length - 1 && (
//               <div className={`w-16 md:w-24 h-px mx-2 mb-4 transition-colors duration-300 ${step > num ? 'bg-gold' : 'bg-parchment'}`} />
//             )}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// /* ── Order summary ── */
// function OrderSummary({ subtotal, shipping, tax, codFee = 0, buttonLabel, onAction, disabled }) {
//   const total = subtotal + shipping + tax + codFee
//   return (
//     <div className="bg-white border border-parchment p-8 sticky top-8">
//       <h3 className="font-display text-xl text-espresso mb-6">Order Summary</h3>
//       <div className="space-y-3 mb-6 font-body text-sm text-caramel">
//         <div className="flex justify-between"><span>Subtotal</span><span className="font-mono">₹{subtotal}</span></div>
//         <div className="flex justify-between"><span>Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
//         <div className="flex justify-between"><span>Tax (5% GST)</span><span className="font-mono">₹{tax}</span></div>
//         {codFee > 0 && <div className="flex justify-between text-caramel/60"><span>COD Handling</span><span className="font-mono">₹{codFee}</span></div>}
//       </div>
//       <div className="border-t border-parchment pt-4 mb-6">
//         <div className="flex justify-between font-display text-xl text-espresso">
//           <span>Total</span><span>₹{total}</span>
//         </div>
//       </div>
//       <button onClick={onAction} disabled={disabled}
//         className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed">
//         {buttonLabel}
//       </button>
//     </div>
//   )
// }

// /* ── Login prompt (shown when not logged in and tries to checkout) ── */
// function LoginPrompt({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
//       <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-mist w-full max-w-sm p-10 shadow-2xl text-center">
//         <div className="w-14 h-14 bg-parchment rounded-full flex items-center justify-center mx-auto mb-6">
//           <LogIn size={24} className="text-espresso" strokeWidth={1.5} />
//         </div>
//         <div className="font-display text-2xl italic text-espresso mb-3">Sign in to continue</div>
//         <p className="font-body font-light text-caramel text-sm leading-relaxed mb-8">
//           You need an account to place an order. Sign in or create a free account to continue.
//         </p>
//         <button onClick={onClose} className="btn-primary w-full text-center">
//           Sign In / Create Account
//         </button>
//       </div>
//     </div>
//   )
// }

// /* ── Step 1: Review ── */
// function ReviewStep({ onNext, onBrowse, onLoginRequired }) {
//   const { items, removeFromCart, updateQty, subtotal } = useCart()
//   const { user } = useAuth()
//   const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_FEE
//   const tax = Math.round(subtotal * TAX_RATE)
//   const remaining = FREE_DELIVERY_THRESHOLD - subtotal

//   const handleNext = () => {
//     if (!user) { onLoginRequired(); return }
//     onNext()
//   }

//   if (items.length === 0) {
//     return (
//       <div className="text-center py-24">
//         <div className="font-display text-3xl italic text-espresso mb-4">Your cart is empty.</div>
//         <p className="font-body font-light text-caramel mb-8">Add some coffee to get started.</p>
//         <button onClick={onBrowse} className="btn-primary">Browse Coffees</button>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
//       <div>
//         <h2 className="font-display text-4xl text-espresso mb-8">The Harvest</h2>
//         {remaining > 0 ? (
//           <div className="bg-espresso text-cream px-6 py-4 mb-6 font-body text-sm font-light">
//             Add <span className="font-mono">₹{remaining}</span> more for free delivery.
//           </div>
//         ) : (
//           <div className="bg-gold/20 border border-gold/30 text-espresso px-6 py-4 mb-6 font-body text-sm font-light">
//             🎉 You've unlocked free delivery!
//           </div>
//         )}
//         <div className="space-y-4">
//           {items.map(item => (
//             <div key={item.id} className="bg-white border border-parchment p-5 flex gap-5 items-start">
//               <img src={item.image} alt={item.name} className="w-20 h-20 object-cover flex-shrink-0" />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between mb-1">
//                   <div>
//                     <div className="font-display text-lg text-espresso">{item.name}</div>
//                     <div className="font-mono text-xs text-caramel/50 uppercase tracking-widest2">
//                       {item.weight || '250g'} · {item.process}
//                     </div>
//                   </div>
//                   <button onClick={() => removeFromCart(item.id)} className="text-caramel/30 hover:text-espresso transition-colors ml-3">
//                     <X size={16} />
//                   </button>
//                 </div>
//                 <div className="flex items-center justify-between mt-3">
//                   <div className="flex items-center border border-parchment">
//                     <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-caramel hover:text-espresso transition-colors">
//                       <Minus size={12} />
//                     </button>
//                     <span className="font-mono text-sm w-8 text-center text-espresso">{item.qty}</span>
//                     <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-caramel hover:text-espresso transition-colors">
//                       <Plus size={12} />
//                     </button>
//                   </div>
//                   <span className="font-mono text-sm text-espresso">₹{item.price * item.qty}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Show login nudge if not signed in */}
//         {!user && (
//           <div className="mt-6 px-5 py-4 border border-gold/40 bg-gold/10 font-body text-sm text-espresso font-light">
//             You'll need to <span className="font-medium">sign in</span> before placing your order.
//           </div>
//         )}
//       </div>
//       <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} buttonLabel="Proceed to Checkout" onAction={handleNext} />
//     </div>
//   )
// }

// /* ── Step 2: Shipping ── */
// function ShippingStep({ onNext, onBack, shippingData, setShippingData }) {
//   const { subtotal } = useCart()
//   const { user } = useAuth()
//   const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_FEE
//   const tax = Math.round(subtotal * TAX_RATE)

//   const fields = [
//     { id: 'firstName', label: 'First Name', placeholder: 'Arjun', half: true },
//     { id: 'lastName', label: 'Last Name', placeholder: 'Mehta', half: true },
//     { id: 'email', label: 'Email Address', placeholder: user?.email || 'arjun@email.com', type: 'email', half: false },
//     { id: 'address', label: 'Shipping Address', placeholder: '123 MG Road', half: false },
//     { id: 'city', label: 'City', placeholder: 'Bengaluru', half: true },
//     { id: 'state', label: 'State', placeholder: 'Karnataka', half: true },
//     { id: 'zip', label: 'PIN Code', placeholder: '560001', half: true },
//   ]

//   // Pre-fill email from logged-in user
//   if (user?.email && !shippingData.email) {
//     setShippingData(prev => ({ ...prev, email: user.email }))
//   }

//   const isValid = fields.every(f => shippingData[f.id]?.trim())

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
//       <div>
//         <h2 className="font-display text-4xl text-espresso mb-8">Shipping Details</h2>
//         <div className="bg-white border border-parchment p-8">
//           <div className="flex flex-wrap gap-5">
//             {fields.map(f => (
//               <div key={f.id} className={f.half ? 'w-[calc(50%-10px)]' : 'w-full'}>
//                 <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">{f.label}</label>
//                 <input
//                   type={f.type || 'text'}
//                   value={shippingData[f.id] || ''}
//                   onChange={e => setShippingData(prev => ({ ...prev, [f.id]: e.target.value }))}
//                   placeholder={f.placeholder}
//                   className="w-full bg-transparent border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <button onClick={onBack} className="flex items-center gap-2 mt-6 font-body text-sm text-caramel hover:text-espresso transition-colors">
//           <ArrowLeft size={14} /> Back
//         </button>
//       </div>
//       <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} buttonLabel="Select Payment" onAction={onNext} disabled={!isValid} />
//     </div>
//   )
// }

// /* ── Step 3: Payment ── */
// function PaymentStep({ onBack, onComplete, shippingData }) {
//   const { subtotal, items, clearCart } = useCart()
//   const { user } = useAuth()
//   const [method, setMethod] = useState('upi')
//   const [saving, setSaving] = useState(false)
//   const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_FEE
//   const tax = Math.round(subtotal * TAX_RATE)
//   const codFee = method === 'cod' ? 49 : 0
//   const total = subtotal + shipping + tax + codFee

//   const methods = [
//     { id: 'upi', label: 'UPI / PhonePe', icon: '⚡' },
//     { id: 'card', label: 'Card Payment', icon: '💳' },
//     { id: 'cod', label: 'Cash / COD', icon: '🏠' },
//   ]

//   const handleComplete = async () => {
//     setSaving(true)
//     try {
//       // Save order to Firestore
//       await addDoc(collection(db, 'orders'), {
//         userId: user.uid,
//         userEmail: user.email,
//         items: items.map(i => ({
//           id: i.id,
//           name: i.name,
//           price: i.price,
//           qty: i.qty,
//           weight: i.weight || '250g',
//         })),
//         shipping: shippingData,
//         paymentMethod: method,
//         subtotal,
//         shippingFee: shipping,
//         tax,
//         codFee,
//         total,
//         status: 'confirmed',
//         createdAt: serverTimestamp(),
//       })
//       clearCart()
//       onComplete()
//     } catch (e) {
//       console.error('Order save failed:', e)
//       // Still proceed even if Firestore fails
//       clearCart()
//       onComplete()
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
//       <div>
//         <h2 className="font-display text-4xl text-espresso mb-8">Payment Method</h2>
//         <div className="bg-white border border-parchment p-8">
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             {methods.map(m => (
//               <button key={m.id} onClick={() => setMethod(m.id)}
//                 className={`flex flex-col items-center gap-2 p-5 border transition-all duration-200 ${
//                   method === m.id ? 'border-espresso bg-espresso/5' : 'border-parchment hover:border-caramel/40'
//                 }`}>
//                 <span className="text-2xl">{m.icon}</span>
//                 <span className="font-mono text-[10px] tracking-widest2 uppercase text-caramel">{m.label}</span>
//               </button>
//             ))}
//           </div>
//           <div className="bg-parchment/60 px-5 py-4 border-l-2 border-gold font-body text-sm text-caramel font-light">
//             {method === 'cod' && 'A handling fee of ₹49 applies for COD orders.'}
//             {method === 'upi' && "You'll be redirected to complete UPI payment after placing the order."}
//             {method === 'card' && 'Secure card payment via Razorpay. All major cards accepted.'}
//           </div>
//         </div>
//         <button onClick={onBack} className="flex items-center gap-2 mt-6 font-body text-sm text-caramel hover:text-espresso transition-colors">
//           <ArrowLeft size={14} /> Back
//         </button>
//       </div>
//       <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} codFee={codFee}
//         buttonLabel={saving ? 'Placing order...' : 'Complete Purchase'}
//         onAction={handleComplete} disabled={saving} />
//     </div>
//   )
// }

// /* ── Step 4: Confirmation ── */
// function ConfirmationStep({ onContinue }) {
//   return (
//     <div className="text-center py-24 max-w-lg mx-auto">
//       <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
//         <CheckCircle size={32} className="text-gold" strokeWidth={1.5} />
//       </div>
//       <div className="font-display text-4xl italic text-espresso mb-4">Order placed.</div>
//       <p className="font-body font-light text-caramel leading-relaxed mb-3">
//         Thank you for your order. We'll roast your coffee fresh and dispatch it within 2–3 business days.
//       </p>
//       <p className="font-mono text-xs text-caramel/40 tracking-widest2 uppercase mb-10">Confirmation email sent</p>
//       <button onClick={onContinue} className="btn-primary">Continue Shopping</button>
//     </div>
//   )
// }

// /* ── Main export ── */
// export default function CartPage({ onClose, onShowAuth }) {
//   const [step, setStep] = useState(1)
//   const [shippingData, setShippingData] = useState({})
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false)

//   const handleContinueShopping = () => {
//     onClose()
//     setTimeout(() => {
//       const el = document.getElementById('coffees')
//       if (el) el.scrollIntoView({ behavior: 'smooth' })
//     }, 100)
//   }

//   const handleLoginRequired = () => {
//     setShowLoginPrompt(true)
//   }

//   const handleLoginPromptClose = () => {
//     setShowLoginPrompt(false)
//     onShowAuth()
//   }

//   return (
//     <section className="bg-mist min-h-screen pt-32 pb-24">
//       <div className="max-w-5xl mx-auto px-6 md:px-12">
//         {step <= 3 && <StepIndicator step={step} />}
//         {step === 1 && <ReviewStep onNext={() => setStep(2)} onBrowse={handleContinueShopping} onLoginRequired={handleLoginRequired} />}
//         {step === 2 && <ShippingStep onNext={() => setStep(3)} onBack={() => setStep(1)} shippingData={shippingData} setShippingData={setShippingData} />}
//         {step === 3 && <PaymentStep onBack={() => setStep(2)} onComplete={() => setStep(4)} shippingData={shippingData} />}
//         {step === 4 && <ConfirmationStep onContinue={handleContinueShopping} />}
//       </div>
//       {showLoginPrompt && <LoginPrompt onClose={handleLoginPromptClose} />}
//     </section>
//   )
// }
// src/components/sections/CartPage.jsx
import { useState } from 'react'
import { X, Minus, Plus, ArrowLeft, CheckCircle, LogIn } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import LoginModal from '../cart/LoginModal'

const FREE_DELIVERY_THRESHOLD = 600
const SHIPPING_FEE = 99
const TAX_RATE = 0.05

/* ── Step indicator ── */
function StepIndicator({ step }) {
  const steps = ['Review', 'Shipping', 'Payment']
  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((label, i) => {
        const num = i + 1
        const done = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                done ? 'bg-gold text-espresso' : active ? 'bg-espresso text-cream' : 'bg-parchment text-caramel/40 border border-parchment'
              }`}>
                {done ? <CheckCircle size={14} /> : num}
              </div>
              <span className={`font-mono text-[10px] tracking-widest2 uppercase mt-1.5 ${
                active ? 'text-espresso' : done ? 'text-gold' : 'text-caramel/30'
              }`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 md:w-24 h-px mx-2 mb-4 transition-colors duration-300 ${step > num ? 'bg-gold' : 'bg-parchment'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Order summary sidebar ── */
function OrderSummary({ subtotal, shipping, tax, codFee = 0, buttonLabel, onAction, disabled }) {
  const total = subtotal + shipping + tax + codFee
  return (
    <div className="bg-white border border-parchment p-8 sticky top-8">
      <h3 className="font-display text-xl text-espresso mb-6">Order Summary</h3>
      <div className="space-y-3 mb-6 font-body text-sm text-caramel">
        <div className="flex justify-between"><span>Subtotal</span><span className="font-mono">₹{subtotal}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
        <div className="flex justify-between"><span>Tax (5% GST)</span><span className="font-mono">₹{tax}</span></div>
        {codFee > 0 && (
          <div className="flex justify-between text-caramel/60"><span>COD Handling</span><span className="font-mono">₹{codFee}</span></div>
        )}
      </div>
      <div className="border-t border-parchment pt-4 mb-6">
        <div className="flex justify-between font-display text-xl text-espresso">
          <span>Total</span><span>₹{total}</span>
        </div>
      </div>
      <button
        onClick={onAction}
        disabled={disabled}
        className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonLabel}
      </button>
    </div>
  )
}

/* ── Step 1: Review ── */
function ReviewStep({ onNext, onBrowse }) {
  const { items, removeFromCart, updateQty, subtotal } = useCart()
  const { user } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_FEE
  const tax = Math.round(subtotal * TAX_RATE)
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal

  function handleCheckout() {
    if (!user) {
      setShowLoginModal(true)
    } else {
      onNext()
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="font-display text-3xl italic text-espresso mb-4">Your cart is empty.</div>
        <p className="font-body font-light text-caramel mb-8">Add some coffee to get started.</p>
        <button onClick={onBrowse} className="btn-primary">Browse Coffees</button>
      </div>
    )
  }

  return (
    <>
      {showLoginModal && (
        <LoginModal onClose={() => {
          setShowLoginModal(false)
          // if they logged in, proceed
        }} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
        <div>
          <h2 className="font-display text-4xl text-espresso mb-8">The Harvest</h2>
          {remaining > 0 ? (
            <div className="bg-espresso text-cream px-6 py-4 mb-6 font-body text-sm font-light">
              Add <span className="font-mono">₹{remaining}</span> more for free delivery.
            </div>
          ) : (
            <div className="bg-gold/20 border border-gold/30 text-espresso px-6 py-4 mb-6 font-body text-sm font-light">
              🎉 You've unlocked free delivery!
            </div>
          )}

          {!user && (
            <div className="flex items-center gap-3 bg-parchment/60 border border-parchment px-6 py-4 mb-6">
              <LogIn size={16} className="text-caramel shrink-0" />
              <p className="font-body text-sm text-caramel font-light">
                Sign in to save your orders and track deliveries.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white border border-parchment p-5 flex gap-5 items-start">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="font-display text-lg text-espresso">{item.name}</div>
                      <div className="font-mono text-xs text-caramel/50 uppercase tracking-widest2">
                        {item.weight || '250g'} · {item.process}
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-caramel/30 hover:text-espresso transition-colors ml-3">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-0 border border-parchment">
                      <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-caramel hover:text-espresso transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-sm w-8 text-center text-espresso">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-caramel hover:text-espresso transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-mono text-sm text-espresso">₹{item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          buttonLabel={user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
          onAction={handleCheckout}
        />
      </div>
    </>
  )
}

/* ── Step 2: Shipping ── */
function ShippingStep({ onNext, onBack, shippingData, setShippingData }) {
  const { subtotal } = useCart()
  const { user } = useAuth()
  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_FEE
  const tax = Math.round(subtotal * TAX_RATE)

  // Pre-fill email from auth user
  const fields = [
    { id: 'firstName', label: 'First Name', placeholder: 'Arjun', half: true },
    { id: 'lastName',  label: 'Last Name',  placeholder: 'Mehta', half: true },
    { id: 'email',     label: 'Email Address', placeholder: user?.email || 'arjun@email.com', type: 'email', half: false },
    { id: 'address',   label: 'Shipping Address', placeholder: '123 MG Road', half: false },
    { id: 'city',      label: 'City',    placeholder: 'Bengaluru', half: true },
    { id: 'state',     label: 'State',   placeholder: 'Karnataka', half: true },
    { id: 'zip',       label: 'PIN Code', placeholder: '560001',   half: true },
  ]

  // Pre-fill email on mount
  if (user?.email && !shippingData.email) {
    setShippingData(prev => ({ ...prev, email: user.email }))
  }

  const isValid = fields.every(f => shippingData[f.id]?.trim())

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
      <div>
        <h2 className="font-display text-4xl text-espresso mb-8">Shipping Details</h2>
        <div className="bg-white border border-parchment p-8">
          <div className="flex flex-wrap gap-5">
            {fields.map(f => (
              <div key={f.id} className={f.half ? 'w-[calc(50%-10px)]' : 'w-full'}>
                <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">{f.label}</label>
                <input
                  type={f.type || 'text'}
                  value={shippingData[f.id] || ''}
                  onChange={e => setShippingData(prev => ({ ...prev, [f.id]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full bg-transparent border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 mt-6 font-body text-sm text-caramel hover:text-espresso transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
      </div>
      <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} buttonLabel="Select Payment" onAction={onNext} disabled={!isValid} />
    </div>
  )
}

/* ── Step 3: Payment ── */
function PaymentStep({ onBack, onComplete, shippingData }) {
  const { subtotal, items, clearCart } = useCart()
  const { user } = useAuth()
  const [method, setMethod]   = useState('upi')
  const [saving, setSaving]   = useState(false)
  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_FEE
  const tax      = Math.round(subtotal * TAX_RATE)
  const codFee   = method === 'cod' ? 49 : 0
  const total    = subtotal + shipping + tax + codFee

  const methods = [
    { id: 'upi',  label: 'UPI / PhonePe', icon: '⚡' },
    { id: 'card', label: 'Card Payment',  icon: '💳' },
    { id: 'cod',  label: 'Cash / COD',    icon: '🏠' },
  ]

  async function handleComplete() {
    setSaving(true)
    try {
      // Save order to Firestore
      await addDoc(collection(db, 'orders'), {
        userId:    user.uid,
        userEmail: user.email,
        items:     items.map(i => ({
          id:    i.id,
          name:  i.name,
          price: i.price,
          qty:   i.qty,
        })),
        shipping:        shippingData,
        paymentMethod:   method,
        subtotal,
        shippingFee:     shipping,
        tax,
        codFee,
        total,
        status:          'placed',
        createdAt:       serverTimestamp(),
      })
      clearCart()
      onComplete()
    } catch (err) {
      console.error('Failed to save order:', err)
      // Still complete the flow even if Firestore write fails
      clearCart()
      onComplete()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">
      <div>
        <h2 className="font-display text-4xl text-espresso mb-8">Payment Method</h2>
        <div className="bg-white border border-parchment p-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex flex-col items-center gap-2 p-5 border transition-all duration-200 ${
                  method === m.id ? 'border-espresso bg-espresso/5' : 'border-parchment hover:border-caramel/40'
                }`}
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="font-mono text-[10px] tracking-widest2 uppercase text-caramel">{m.label}</span>
              </button>
            ))}
          </div>
          <div className="bg-parchment/60 px-5 py-4 border-l-2 border-gold font-body text-sm text-caramel font-light">
            {method === 'cod'  && 'A handling fee of ₹49 applies for COD orders.'}
            {method === 'upi'  && "You'll be redirected to complete UPI payment after placing the order."}
            {method === 'card' && 'Secure card payment via Razorpay. All major cards accepted.'}
          </div>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 mt-6 font-body text-sm text-caramel hover:text-espresso transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        codFee={codFee}
        buttonLabel={saving ? 'Placing Order…' : 'Complete Purchase'}
        onAction={handleComplete}
        disabled={saving}
      />
    </div>
  )
}

/* ── Step 4: Confirmation ── */
function ConfirmationStep({ onContinue }) {
  return (
    <div className="text-center py-24 max-w-lg mx-auto">
      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle size={32} className="text-gold" strokeWidth={1.5} />
      </div>
      <div className="font-display text-4xl italic text-espresso mb-4">Order placed.</div>
      <p className="font-body font-light text-caramel leading-relaxed mb-3">
        Thank you for your order. We'll roast your coffee fresh and dispatch it within 2–3 business days.
      </p>
      <p className="font-mono text-xs text-caramel/40 tracking-widest2 uppercase mb-10">
        Confirmation email sent
      </p>
      <button onClick={onContinue} className="btn-primary">Continue Shopping</button>
    </div>
  )
}

/* ── Main export ── */
export default function CartPage({ onClose }) {
  const [step, setStep]               = useState(1)
  const [shippingData, setShippingData] = useState({})

  const handleContinueShopping = () => {
    onClose()
    setTimeout(() => {
      const el = document.getElementById('coffees')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section className="bg-mist min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {step <= 3 && <StepIndicator step={step} />}
        {step === 1 && <ReviewStep onNext={() => setStep(2)} onBrowse={handleContinueShopping} />}
        {step === 2 && (
          <ShippingStep
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            shippingData={shippingData}
            setShippingData={setShippingData}
          />
        )}
        {step === 3 && (
          <PaymentStep
            onBack={() => setStep(2)}
            onComplete={() => setStep(4)}
            shippingData={shippingData}
          />
        )}
        {step === 4 && <ConfirmationStep onContinue={handleContinueShopping} />}
      </div>
    </section>
  )
}