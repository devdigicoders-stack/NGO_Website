import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, ChevronRight, CheckCircle2 } from 'lucide-react'
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from '../components/ui/SocialIcons'

const API_BASE = import.meta.env.VITE_API_BASE

const contactInfo = [
  {
    Icon: MapPin,
    title: 'हमारा पता',
    lines: ['कनॉट प्लेस, नई दिल्ली', 'पिन कोड — 110001'],
    accent: '#821905',
    light: 'rgba(130, 25, 5,0.08)',
  },
  {
    Icon: Phone,
    title: 'फोन नंबर',
    lines: [' 9569036324', ''],
    accent: '#FDED95',
    light: 'rgba(253, 237, 149,0.1)',
  },
  {
    Icon: Mail,
    title: 'ईमेल पता',
    lines: ['Shakti.singh20017@gmail.com', ''],
    accent: '#7c3aed',
    light: 'rgba(124,58,237,0.08)',
  },
  {
    Icon: Clock,
    title: 'कार्यालय समय',
    lines: ['सोम–शनि: सुबह 9 – शाम 6', 'रविवार: बंद'],
    accent: '#e05a3a',
    light: 'rgba(224,90,58,0.08)',
  },
]

const socials = [
  { Icon: FacebookIcon,  label: 'फेसबुक'  },
  { Icon: TwitterIcon,   label: 'ट्विटर'   },
  { Icon: InstagramIcon, label: 'इंस्टाग्राम' },
  { Icon: YoutubeIcon,   label: 'यूट्यूब'   },
]

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact_page' }),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        const msg = json.errors?.[0]?.msg || json.message || 'संदेश भेजने में समस्या हुई।'
        setError(msg)
        return
      }

      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      console.error('Contact form submit error:', err)
      setError('सर्वर से कनेक्ट नहीं हो पाया। कृपया बाद में पुनः प्रयास करें।')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '13px 16px', borderRadius: '12px',
    border: `1.5px solid ${focused === field ? '#821905' : '#e5e7eb'}`,
    fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#374151',
    background: focused === field ? '#f8fdf9' : '#fff',
    outline: 'none', transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(130, 25, 5,0.08)' : 'none',
  })

  return (
    <div style={{ background: '#fff', overflow: 'hidden' }}>

      {/* ── 1. Hero Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #2a0501 0%, #5a1002 100%)',
        height: '280px', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* BG image */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, mixBlendMode: 'luminosity', pointerEvents: 'none' }}>
          <img src="/images/hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #2a0501 10%, transparent 50%, #2a0501 90%)' }} />
        </div>

        {/* Floating heart */}
        <div style={{ position: 'absolute', left: '6%', top: '20%', color: '#FDED95', opacity: 0.85, pointerEvents: 'none', zIndex: 2 }}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ filter: 'drop-shadow(0 2px 8px rgba(253, 237, 149,0.3))' }}>
            <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
          </svg>
        </div>

        {/* Center content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: '17px', color: '#ffd54f', letterSpacing: '0.04em' }}>
              ✍️ हम आपकी सेवा में तत्पर हैं
            </span>
          </div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', color: '#fff', margin: '0 0 18px', letterSpacing: '-0.02em' }}>
            संपर्क करें
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '7px 20px' }}>
            <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>होम</span>
            <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: '#ffd54f', fontWeight: 600 }}>संपर्क</span>
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '28px', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 36" fill="#ffffff" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,36 L1440,36 L1440,10 L1400,18 L1360,5 L1320,22 L1280,10 L1240,26 L1200,8 L1160,20 L1120,4 L1080,22 L1040,12 L1000,26 L960,6 L920,18 L880,10 L840,24 L800,8 L760,20 L720,8 L680,22 L640,10 L600,26 L560,6 L520,20 L480,8 L440,22 L400,8 L360,22 L320,10 L280,26 L240,6 L200,18 L160,8 L120,22 L80,8 L40,20 L0,10 Z" />
          </svg>
        </div>
      </div>

      {/* ── 2. Info Cards ── */}
      <section style={{ padding: '64px 0 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }} className="contact-info-grid">
            {contactInfo.map(({ Icon, title, lines, accent, light }) => (
              <div key={title} className="contact-info-card" style={{ background: '#fff', border: '1.5px solid #f0f0f0', borderRadius: '20px', padding: '28px 24px', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.08)`; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div className="contact-icon-wrapper" style={{ width: '52px', height: '52px', borderRadius: '14px', background: light, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', flexShrink: 0 }}>
                  <Icon size={22} style={{ color: accent }} />
                </div>
                <div className="contact-text-wrapper">
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', color: '#111827', margin: '0 0 10px' }}>{title}</h3>
                  <div className="contact-accent-line" style={{ width: '28px', height: '2px', background: accent, borderRadius: '2px', marginBottom: '12px' }} />
                  {lines.map((l, i) => (
                    <p key={i} style={{ fontFamily: 'Hind, sans-serif', fontSize: '13.5px', color: '#6b7280', margin: '0 0 4px', lineHeight: 1.5 }}>{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Form + Map ── */}
      <section style={{ padding: '64px 0 80px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }} className="contact-main-grid">

            {/* Left — Form */}
            <div className="contact-form-card" style={{ background: '#f8f9fa', borderRadius: '24px', padding: '40px 36px' }}>
              {/* Header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(130, 25, 5,0.07)', border: '1px solid rgba(130, 25, 5,0.14)', borderRadius: '999px', padding: '5px 16px', marginBottom: '14px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#821905' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif' }}>संदेश भेजें</span>
                </div>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#111827', margin: 0, lineHeight: 1.25 }}>
                  हम आपकी बात{' '}
                  <span style={{ color: '#FDED95' }}>सुनना चाहते हैं</span>
                </h2>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <CheckCircle2 size={56} style={{ color: '#821905', marginBottom: '16px' }} />
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '20px', color: '#111827', margin: '0 0 8px' }}>संदेश भेज दिया गया!</h3>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#6b7280' }}>हम जल्द ही आपसे संपर्क करेंगे।</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                    style={{ marginTop: '20px', padding: '10px 24px', borderRadius: '999px', border: '1.5px solid #821905', background: 'transparent', color: '#821905', fontFamily: 'Hind, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                    नया संदेश भेजें
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {error && (
                    <div style={{
                      background: 'rgba(220,38,38,0.08)',
                      border: '1.5px solid rgba(220,38,38,0.25)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontFamily: 'Hind, sans-serif',
                      fontSize: '13.5px',
                      color: '#b91c1c',
                    }}>
                      {error}
                    </div>
                  )}
                  <div className="form-row-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'Hind, sans-serif', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>आपका नाम *</label>
                      <input required type="text" placeholder="राम कुमार" value={form.name} disabled={submitting} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} style={inputStyle('name')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'Hind, sans-serif', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>फोन नंबर</label>
                      <input type="tel" placeholder="+91 98765 43210" value={form.phone} disabled={submitting} onChange={e => setForm({ ...form, phone: e.target.value })} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} style={inputStyle('phone')} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Hind, sans-serif', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ईमेल पता *</label>
                    <input required type="email" placeholder="अपना ईमेल दर्ज करें" value={form.email} disabled={submitting} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} style={inputStyle('email')} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Hind, sans-serif', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>विषय *</label>
                    <input required type="text" placeholder="आपका संदेश किस बारे में है?" value={form.subject} disabled={submitting} onChange={e => setForm({ ...form, subject: e.target.value })} onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} style={inputStyle('subject')} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Hind, sans-serif', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>संदेश *</label>
                    <textarea required rows={5} placeholder="अपना संदेश यहाँ लिखें..." value={form.message} disabled={submitting} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} style={{ ...inputStyle('message'), resize: 'none' }} />
                  </div>

                  <button type="submit" disabled={submitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '14px', background: submitting ? '#4b7a5f' : 'linear-gradient(135deg,#821905,#5a1002)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', border: 'none', cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.9 : 1, boxShadow: '0 6px 20px rgba(130, 25, 5,0.3)', transition: 'all 0.25s ease' }}
                    onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(130, 25, 5,0.4)' } }}
                    onMouseLeave={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(130, 25, 5,0.3)' } }}
                  >
                    <Send size={16} /> {submitting ? 'भेजा जा रहा है...' : 'संदेश भेजें'}
                  </button>
                </form>
              )}
            </div>

            {/* Right — Map + Social */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Map embed */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #f0f0f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '340px', position: 'relative' }}>
                <iframe
                  title="सहायता फाउंडेशन स्थान"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9!2d77.2195!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzUzLjQiTiA3N8KwMTMnMTAuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              {/* Quick info card */}
              <div style={{ background: '#821905', borderRadius: '20px', padding: '28px 28px', color: '#fff' }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '17px', color: '#fff', margin: '0 0 6px' }}>
                  सहायता फाउंडेशन
                </h3>
                <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '0 0 20px', lineHeight: 1.6 }}>
                  15 वर्षों से जरूरतमंदों की सेवा में समर्पित। आज ही हमसे जुड़ें।
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
                  {[
                    { Icon: MapPin, text: '486/238डी डालीगंज लखनऊ उत्तर प्रदेश 226020' },
                    { Icon: Phone,  text: ' 9569036324' },
                    { Icon: Mail,   text: 'Shakti.singh20017@gmail.com' },
                  ].map(({ Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={14} style={{ color: '#FDED95' }} />
                      </div>
                      <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {socials.map(({ Icon, label }) => (
                    <a key={label} href="#" aria-label={label}
                      style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'all 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#FDED95'; e.currentTarget.style.color = '#821905'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <Icon size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .contact-info-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { 
          .contact-info-grid { grid-template-columns: 1fr !important; gap: 12px !important; } 
          .contact-info-card { 
            padding: 18px 20px !important; 
            display: flex; 
            align-items: center; 
            gap: 16px; 
          }
          .contact-icon-wrapper { margin-bottom: 0 !important; width: 44px !important; height: 44px !important; }
          .contact-icon-wrapper svg { width: 18px !important; height: 18px !important; }
          .contact-text-wrapper h3 { margin: 0 0 2px !important; font-size: 14px !important; }
          .contact-accent-line { display: none !important; }
          .contact-text-wrapper p { margin: 0 !important; font-size: 12.5px !important; line-height: 1.4 !important; }
          
          .contact-form-card { padding: 24px 20px !important; }
          .form-row-mobile { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 900px)  { .contact-main-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

export default ContactPage
