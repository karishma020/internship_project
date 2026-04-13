import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

// ─── helpers ────────────────────────────────────────────────────────────────

function getInitials(name) {
  return name
    .trim()
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'
}

function formatDate(ts) {
  if (!ts) return 'Just now'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function StarRow({ rating, size = 'sm' }) {
  const cls = size === 'lg'
    ? 'text-gold text-xl'
    : 'text-gold text-sm'
  const emptyCls = size === 'lg'
    ? 'text-parchment text-xl'
    : 'text-parchment text-sm'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? cls : emptyCls}>★</span>
      ))}
    </div>
  )
}

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!']

// ─── review card ─────────────────────────────────────────────────────────────

function ReviewCard({ review }) {
  return (
    <div className="border border-parchment bg-mist p-6 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-mahogany flex items-center justify-center font-body text-xs font-medium text-cream flex-shrink-0">
            {getInitials(review.name)}
          </div>
          <div>
            <p className="font-body text-sm font-medium text-espresso">{review.name}</p>
            <p className="font-mono text-xs text-caramel/50">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <StarRow rating={review.rating} />
      </div>
      <p className="font-body text-sm font-light text-caramel leading-relaxed italic">
        "{review.text}"
      </p>
    </div>
  )
}

// ─── main component ──────────────────────────────────────────────────────────

export default function Feedback() {
  const headingRef = useScrollAnimation()
  const leftRef    = useScrollAnimation()
  const rightRef   = useScrollAnimation()

  // reviews state
  const [reviews, setReviews]     = useState([])
  const [loading, setLoading]     = useState(true)

  // form state
  const [hoveredStar, setHoveredStar] = useState(0)
  const [rating, setRating]           = useState(0)
  const [name, setName]               = useState('')
  const [text, setText]               = useState('')
  const [errors, setErrors]           = useState({})
  const [status, setStatus]           = useState('idle') // idle | submitting | done

  // ── fetch reviews from Firestore ──────────────────────────────────────────

  useEffect(() => {
    async function fetchReviews() {
      try {
        const q = query(
          collection(db, 'feedback'),
          orderBy('createdAt', 'desc')
        )
        const snap = await getDocs(q)
        setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Failed to load reviews:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  // ── derived stats ─────────────────────────────────────────────────────────

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null

  // ── validation & submit ───────────────────────────────────────────────────

  function validate() {
    const e = {}
    if (!rating)       e.rating = 'Please select a rating'
    if (!name.trim())  e.name   = 'Please enter your name'
    if (!text.trim())  e.text   = 'Please write a review'
    return e
  }

  async function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStatus('submitting')

    try {
      const doc = {
        name:      name.trim(),
        rating,
        text:      text.trim(),
        createdAt: serverTimestamp(),
      }
      const ref = await addDoc(collection(db, 'feedback'), doc)

      // optimistically prepend (serverTimestamp not yet resolved locally)
      setReviews((prev) => [{ id: ref.id, ...doc, createdAt: null }, ...prev])
      setStatus('done')
    } catch (err) {
      console.error('Failed to save review:', err)
      setStatus('idle')
      setErrors({ submit: 'Something went wrong. Please try again.' })
    }
  }

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <section id="feedback" className="bg-cream py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* heading */}
        <div ref={headingRef} className="fade-up mb-16">
          <div className="section-label mb-5">Reviews</div>
          <h2 className="display-lg text-espresso">
            Honest sips,<br />
            <em>honest words.</em>
          </h2>
          <p className="font-body font-light text-caramel mt-4 max-w-md">
            Every cup tells a story — we'd love to hear yours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* ── left: existing reviews ── */}
          <div ref={leftRef} className="fade-up space-y-6">

            {/* average score */}
            {avgRating && (
              <div className="flex items-center gap-5 pb-6 border-b border-parchment">
                <div>
                  <span className="font-display text-5xl text-espresso">{avgRating}</span>
                  <span className="font-body text-sm text-caramel/60 ml-2">/ 5</span>
                </div>
                <div className="space-y-1">
                  <StarRow rating={Math.round(parseFloat(avgRating))} size="lg" />
                  <p className="font-mono text-xs text-caramel/50 uppercase tracking-widest2">
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
              </div>
            )}

            {/* list */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="border border-parchment bg-mist p-6 animate-pulse h-28" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="border border-parchment bg-mist p-8 text-center">
                <p className="font-display text-2xl text-espresso italic mb-2">Be the first.</p>
                <p className="font-body text-sm font-light text-caramel">
                  Share your experience and help fellow coffee lovers.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            )}
          </div>

          {/* ── right: submit form ── */}
          <div ref={rightRef} className="fade-up">

            {status === 'done' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-parchment px-8">
                <div className="font-display text-5xl text-gold mb-4">✦</div>
                <div className="font-display text-4xl text-espresso mb-4 italic">Thank you.</div>
                <p className="font-body font-light text-caramel leading-relaxed max-w-xs">
                  Your review has been saved. It means a lot to us and to fellow coffee lovers.
                </p>
              </div>
            ) : (
              <div className="space-y-7">
                <div className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 mb-2">
                  Leave a review
                </div>

                {/* star picker */}
                <div>
                  <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-3">
                    Your rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseEnter={() => setHoveredStar(i)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => { setRating(i); setErrors((e) => ({ ...e, rating: '' })) }}
                        className="text-3xl leading-none transition-transform hover:scale-110 focus:outline-none"
                        style={{ color: i <= (hoveredStar || rating) ? '#C8923A' : '#EDE0C4' }}
                        aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                      >
                        ★
                      </button>
                    ))}
                    {(hoveredStar || rating) > 0 && (
                      <span className="ml-3 font-body text-sm text-caramel self-center">
                        {RATING_LABELS[hoveredStar || rating]}
                      </span>
                    )}
                  </div>
                  {errors.rating && (
                    <p className="font-mono text-xs text-red-400 mt-1">{errors.rating}</p>
                  )}
                </div>

                {/* name */}
                <div>
                  <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
                    placeholder="e.g. Ananya S."
                    className={`w-full bg-transparent border px-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-300' : 'border-parchment focus:border-gold'
                    }`}
                  />
                  {errors.name && (
                    <p className="font-mono text-xs text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* review text */}
                <div>
                  <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">
                    Your review
                  </label>
                  <textarea
                    rows={5}
                    value={text}
                    onChange={(e) => { setText(e.target.value); setErrors((p) => ({ ...p, text: '' })) }}
                    placeholder="What did you love about your order?"
                    className={`w-full bg-transparent border px-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none transition-colors resize-none ${
                      errors.text ? 'border-red-300' : 'border-parchment focus:border-gold'
                    }`}
                  />
                  {errors.text && (
                    <p className="font-mono text-xs text-red-400 mt-1">{errors.text}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="font-mono text-xs text-red-400">{errors.submit}</p>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === 'submitting'}
                  className="btn-primary w-full text-center disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit review'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}