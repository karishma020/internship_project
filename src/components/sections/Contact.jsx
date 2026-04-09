import { useState } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react'

export default function Contact() {
  const r1 = useScrollAnimation()
  const r2 = useScrollAnimation()

  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: 'General enquiry', message: '' })
      } else {
        const err = await res.json()
        console.error('Resend error:', err)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-mist py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div ref={r1} className="fade-up mb-16">
          <div className="section-label mb-5">Contact</div>
          <h2 className="display-lg text-espresso">
            Let's talk<br />
            <em>coffee.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          <div ref={r2} className="fade-up space-y-10">
            <div>
              <div className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 mb-4">For customers</div>
              <p className="font-body font-light text-caramel leading-relaxed">
                Wholesale enquiries, subscription questions, tasting events, farm tours — 
                we read every message and reply personally.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-xs text-caramel/40 uppercase tracking-widest2 mb-1">Roastery</div>
                  <div className="font-body text-sm text-caramel font-light leading-relaxed">
                    12 Roastery Lane, Indiranagar<br />
                    Bengaluru, Karnataka 560038<br />
                    India
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={16} className="text-gold flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-xs text-caramel/40 uppercase tracking-widest2 mb-1">Call us</div>
                  <a href="tel:+919876543210" className="font-body text-sm text-caramel hover:text-espresso transition-colors">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={16} className="text-gold flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-xs text-caramel/40 uppercase tracking-widest2 mb-1">Email</div>
                  <a href="mailto:karishma.cs22@sahyadri.edu.in" className="font-body text-sm text-caramel hover:text-espresso transition-colors">karishma.cs22@sahyadri.edu.in</a>
                </div>
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-caramel/40 uppercase tracking-widest2 mb-4">Follow our journey</div>
              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-2 font-body text-sm text-caramel hover:text-espresso transition-colors">
                  <Instagram size={16} strokeWidth={1.5} /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 font-body text-sm text-caramel hover:text-espresso transition-colors">
                  <Twitter size={16} strokeWidth={1.5} /> Twitter
                </a>
              </div>
            </div>

            <div className="bg-parchment px-6 py-6 border-l-2 border-gold">
              <div className="font-mono text-xs text-caramel/40 uppercase tracking-widest2 mb-3">Roastery hours</div>
              <div className="space-y-1.5 font-body text-sm text-caramel font-light">
                <div className="flex justify-between"><span>Monday – Friday</span><span>8am – 5pm</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>9am – 2pm</span></div>
                <div className="flex justify-between text-caramel/40"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </div>

          <div>
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-parchment px-8">
                <div className="font-display text-4xl text-espresso mb-4 italic">Thank you.</div>
                <p className="font-body font-light text-caramel leading-relaxed max-w-xs">
                  We've received your message and will get back to you personally within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-transparent border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-transparent border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-mist border border-parchment px-4 py-3 font-body text-sm text-caramel focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    <option>General enquiry</option>
                    <option>Wholesale / B2B</option>
                    <option>Subscription</option>
                    <option>Farm tour</option>
                    <option>Press & media</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-transparent border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-red-500">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full text-center disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}