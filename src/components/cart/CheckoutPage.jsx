import { useState } from 'react'
import { X, Check, ArrowLeft } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function CheckoutPage({ onClose }) {
  const { items, total, clearCart, setOpen: setCartOpen } = useCart()
  const { user } = useAuth()
  const [step, setStep] = useState('shipping') // shipping | payment | confirm
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    card: '',
    expiry: '',
    cvv: '',
  })

  function update(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  function handleOrder() {
    clearCart()
    setCartOpen(false)
    setStep('confirm')
  }

  return (
    <div className="fixed inset-0 z-[200] bg-mist overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 bg-mist border-b border-parchment z-10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl text-espresso italic">Kōhi</span>
          <button
            onClick={onClose}
            className="text-caramel hover:text-espresso transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest2"
          >
            <X size={16} /> Close
          </button>
        </div>
      </div>

      {step === 'confirm' ? (
        <ConfirmStep onClose={onClose} />
      ) : (
        <div className="max-w-3xl mx-auto px-6 py-12 grid md:grid-cols-[1fr_300px] gap-12">
          {/* Left: form */}
          <div>
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-10">
              {['shipping', 'payment'].map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <button
                    onClick={() => step === 'payment' && s === 'shipping' && setStep('shipping')}
                    className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 transition-colors ${
                      step === s ? 'text-espresso' : 'text-caramel/50'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                      step === s
                        ? 'bg-espresso text-cream border-espresso'
                        : s === 'shipping' && step === 'payment'
                        ? 'bg-gold border-gold text-cream'
                        : 'border-parchment text-caramel/40'
                    }`}>
                      {s === 'shipping' && step === 'payment' ? <Check size={10} /> : i + 1}
                    </span>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                  {i === 0 && <span className="text-parchment">—</span>}
                </div>
              ))}
            </div>

            {step === 'shipping' && (
              <ShippingForm form={form} update={update} onNext={() => setStep('payment')} />
            )}
            {step === 'payment' && (
              <PaymentForm form={form} update={update} onBack={() => setStep('shipping')} onOrder={handleOrder} />
            )}
          </div>

          {/* Right: order summary */}
          <div>
            <div className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 mb-5">Order Summary</div>
            <ul className="flex flex-col gap-4 mb-6">
              {items.map(item => (
                <li key={item.key} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={item.coffee.image} alt={item.coffee.name} className="w-14 h-14 object-cover" />
                    <span className="absolute -top-1.5 -right-1.5 bg-caramel text-cream font-mono text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-espresso truncate">{item.coffee.name}</p>
                    <p className="font-mono text-xs text-caramel/60">{item.size}</p>
                  </div>
                  <span className="font-mono text-sm text-espresso">£{(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-parchment pt-4 flex flex-col gap-2">
              <div className="flex justify-between font-mono text-xs text-caramel/60">
                <span>Subtotal</span><span>£{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-caramel/60">
                <span>Shipping</span><span>Free</span>
              </div>
              <div className="flex justify-between font-mono text-sm text-espresso font-medium mt-2 pt-2 border-t border-parchment">
                <span>Total</span><span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 block mb-2">{label}</label>
      {children}
    </div>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full bg-cream border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/40 focus:outline-none focus:border-caramel transition-colors"
    />
  )
}

function ShippingForm({ form, update, onNext }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-espresso italic mb-8">Shipping details</h2>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full name">
            <Input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jane Smith" />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@example.com" />
          </Field>
        </div>
        <Field label="Address">
          <Input value={form.address} onChange={e => update('address', e.target.value)} placeholder="123 High Street" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="City">
            <Input value={form.city} onChange={e => update('city', e.target.value)} placeholder="London" />
          </Field>
          <Field label="Postcode">
            <Input value={form.postcode} onChange={e => update('postcode', e.target.value)} placeholder="EC1A 1BB" />
          </Field>
        </div>
        <Field label="Country">
          <Input value={form.country} onChange={e => update('country', e.target.value)} />
        </Field>
        <button onClick={onNext} className="btn-primary mt-2">Continue to Payment</button>
      </div>
    </div>
  )
}

function PaymentForm({ form, update, onBack, onOrder }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-espresso italic mb-8">Payment</h2>
      <div className="flex flex-col gap-5">
        <Field label="Card number">
          <Input
            value={form.card}
            onChange={e => update('card', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
            placeholder="1234 5678 9012 3456"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Expiry">
            <Input value={form.expiry} onChange={e => update('expiry', e.target.value)} placeholder="MM / YY" />
          </Field>
          <Field label="CVV">
            <Input value={form.cvv} onChange={e => update('cvv', e.target.value.slice(0, 4))} placeholder="123" type="password" />
          </Field>
        </div>
        <div className="flex gap-3 mt-2">
          <button onClick={onBack} className="btn-outline flex items-center gap-2">
            <ArrowLeft size={14} /> Back
          </button>
          <button onClick={onOrder} className="btn-primary flex-1 text-center">
            Place Order
          </button>
        </div>
        <p className="font-mono text-xs text-caramel/40 text-center">🔒 Demo only — no real payment processed.</p>
      </div>
    </div>
  )
}

function ConfirmStep({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-espresso flex items-center justify-center mb-6">
        <Check size={28} className="text-cream" />
      </div>
      <div className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 mb-3">Order confirmed</div>
      <h2 className="font-display text-4xl text-espresso italic mb-4">Thank you.</h2>
      <p className="font-body font-light text-caramel max-w-sm leading-relaxed mb-8">
        Your coffee is on its way. We'll send a tracking link to your email shortly. Enjoy every cup.
      </p>
      <button onClick={onClose} className="btn-primary">Back to Kōhi</button>
    </div>
  )
}