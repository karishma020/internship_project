import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '../../context/AuthContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Package, ChevronDown, ChevronUp } from 'lucide-react'

function formatDate(ts) {
  if (!ts) return '—'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function StatusBadge({ status }) {
  const map = {
    placed:    { label: 'Order Placed',  cls: 'bg-parchment text-caramel border-parchment' },
    confirmed: { label: 'Confirmed',     cls: 'bg-parchment text-gold border-gold/30' },
    shipped:   { label: 'Shipped',       cls: 'bg-espresso/10 text-espresso border-espresso/20' },
    delivered: { label: 'Delivered',     cls: 'bg-gold/10 text-gold border-gold/40' },
    cancelled: { label: 'Cancelled',     cls: 'bg-red-50 text-red-400 border-red-200' },
  }
  const s = map[status] || map.placed
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest2 px-3 py-1 border ${s.cls}`}>
      {s.label}
    </span>
  )
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-parchment bg-mist">
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-parchment/30 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-9 h-9 bg-espresso flex items-center justify-center flex-shrink-0">
            <Package size={16} className="text-cream" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] text-caramel/50 uppercase tracking-widest2">
              {formatDate(order.createdAt)}
            </p>
            <p className="font-body text-sm text-espresso font-medium truncate">
              {order.items.map(i => i.name).join(', ')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <StatusBadge status={order.status} />
          <span className="font-display text-lg text-espresso">₹{order.total}</span>
          {expanded
            ? <ChevronUp size={16} className="text-caramel/40" />
            : <ChevronDown size={16} className="text-caramel/40" />
          }
        </div>
      </button>

      {expanded && (
        <div className="border-t border-parchment px-6 py-5 space-y-5">
          <div>
            <div className="font-mono text-[10px] text-caramel/40 uppercase tracking-widest2 mb-3">
              Items ordered
            </div>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center font-body text-sm">
                  <span className="text-caramel">
                    {item.name}
                    <span className="text-caramel/40 ml-2">× {item.qty}</span>
                  </span>
                  <span className="font-mono text-espresso">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-parchment pt-4 space-y-2">
            <div className="font-mono text-[10px] text-caramel/40 uppercase tracking-widest2 mb-3">
              Price breakdown
            </div>
            <div className="flex justify-between font-body text-sm text-caramel">
              <span>Subtotal</span>
              <span className="font-mono">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-caramel">
              <span>Shipping</span>
              <span className="font-mono">
                {order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between font-body text-sm text-caramel">
              <span>Tax (5% GST)</span>
              <span className="font-mono">₹{order.tax}</span>
            </div>
            {order.codFee > 0 && (
              <div className="flex justify-between font-body text-sm text-caramel/60">
                <span>COD Handling</span>
                <span className="font-mono">₹{order.codFee}</span>
              </div>
            )}
            <div className="flex justify-between font-display text-lg text-espresso border-t border-parchment pt-3 mt-2">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {order.shipping && (
            <div className="border-t border-parchment pt-4">
              <div className="font-mono text-[10px] text-caramel/40 uppercase tracking-widest2 mb-3">
                Delivered to
              </div>
              <p className="font-body text-sm font-light text-caramel leading-relaxed">
                {order.shipping.name}<br />
                {order.shipping.address}, {order.shipping.city}<br />
                {order.shipping.state} — {order.shipping.pincode}
              </p>
            </div>
          )}

          <div className="border-t border-parchment pt-4">
            <div className="font-mono text-[10px] text-caramel/40 uppercase tracking-widest2 mb-1">
              Payment
            </div>
            <p className="font-body text-sm text-caramel capitalize">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod?.toUpperCase()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function OrderHistory({ onClose }) {
  const { user } = useAuth()
  const headingRef = useScrollAnimation()

  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!user) return
    async function fetchOrders() {
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid)
          // ✅ removed orderBy — no index needed
        )
        const snap = await getDocs(q)
        const sorted = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() ?? 0
            const bTime = b.createdAt?.toMillis?.() ?? 0
            return bTime - aTime  // newest first
          })
        setOrders(sorted)
      } catch (err) {
        console.error('Failed to fetch orders:', err)
        setError('Could not load your orders. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  return (
    <section className="bg-mist min-h-screen py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-12">

        <div ref={headingRef} className="fade-up mb-4">
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 hover:text-espresso transition-colors mb-8 flex items-center gap-2"
          >
            ← Back to shop
          </button>
          <div className="section-label mb-5">Your account</div>
          <h2 className="display-lg text-espresso">
            Order<br />
            <em>history.</em>
          </h2>
          <p className="font-body font-light text-caramel mt-4">
            Signed in as <span className="text-espresso">{user?.email}</span>
          </p>
        </div>

        <div className="divider mb-12" />

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-parchment bg-mist p-6 animate-pulse h-20" />
            ))}
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50 px-6 py-5">
            <p className="font-body text-sm text-red-400">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 border border-parchment bg-parchment/20">
            <div className="font-display text-5xl text-espresso italic mb-4">No orders yet.</div>
            <p className="font-body font-light text-caramel mb-8">
              Your order history will appear here after your first purchase.
            </p>
            <button type="button" onClick={onClose} className="btn-primary">
              Browse coffees
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 mb-6">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </div>
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
// orders 