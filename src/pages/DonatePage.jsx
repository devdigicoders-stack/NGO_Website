import { useState, useEffect } from 'react'
import { Heart, CheckCircle2, ChevronRight, Shield, Award, Users, Copy, Check } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE

const TRUST_ICONS = {
  shield: Shield,
  award: Award,
  users: Users,
}

const DEFAULT_SETTINGS = {
  heroSubtitle: '✍️ आपका दान किसी की जिंदगी बदल सकता है',
  heroTitle: 'दान करें',
  upiId: '',
  upiPayeeName: '',
  presetAmounts: [100, 500, 1000, 2500, 5000, 10000],
  causes: [
    { id: 'education', label: 'शिक्षा सहायता', icon: '📚' },
    { id: 'health', label: 'स्वास्थ्य सेवा', icon: '🏥' },
    { id: 'food', label: 'पौष्टिक भोजन', icon: '🍱' },
    { id: 'women', label: 'महिला सशक्तिकरण', icon: '👩' },
    { id: 'general', label: 'सामान्य दान', icon: '💚' },
  ],
  trustBadges: [
    { text: '100% सुरक्षित भुगतान', icon: 'shield' },
    { text: '80G कर-मुक्ति प्रमाणित', icon: 'award' },
    { text: '50,000+ लाभार्थी', icon: 'users' },
  ],
  impactItems: [],
  taxExemptTitle: '80G कर-मुक्ति',
  taxExemptDescription: '',
  paymentSteps: [],
  formStepBadge: 'दान राशि चुनें',
  formStepTitle: 'आप कितना दान करना चाहते हैं?',
  trustPanelTitle: 'आपका दान सुरक्षित है',
  impactPanelTitle: 'आपके दान का प्रभाव',
}

const DonatePage = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [amount, setAmount] = useState('')
  const [custom, setCustom] = useState(false)
  const [cause, setCause] = useState('general')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [focused, setFocused] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [donationId, setDonationId] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/donations/settings`)
        const json = await res.json()
        if (json.success && json.data) {
          const data = json.data
          setSettings({
            ...DEFAULT_SETTINGS,
            ...data,
            upiId: data.upiId?.trim() || '',
            upiPayeeName: data.upiPayeeName?.trim() || '',
            presetAmounts: data.presetAmounts?.length ? data.presetAmounts : DEFAULT_SETTINGS.presetAmounts,
            causes: data.causes?.length ? data.causes : DEFAULT_SETTINGS.causes,
          })
          const firstCause = json.data.causes?.[0]?.id
          if (firstCause) setCause(firstCause)
        }
      } catch (err) {
        console.error('Failed to load donation settings:', err)
      } finally {
        setSettingsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const finalAmount = parseInt(amount, 10) || 0
  const selectedCause = settings.causes.find((c) => c.id === cause) || settings.causes[0]

  const handlePreset = (val) => {
    setAmount(String(val))
    setCustom(false)
  }

  const handleCustom = (val) => {
    setAmount(val)
    setCustom(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(settings.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleProceed = async () => {
    if (finalAmount <= 0 || !name.trim() || !email.trim()) return
    setSubmitError('')
    setSubmitting(true)

    try {
      const res = await fetch(`${API_BASE}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          causeId: cause,
          causeLabel: selectedCause?.label || '',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          paymentMethod: 'upi',
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        const msg = json.errors?.[0]?.msg || json.message || 'दान दर्ज करने में समस्या हुई।'
        setSubmitError(msg)
        return
      }
      setDonationId(json.data?.id || null)
      setStep(2)
    } catch (err) {
      console.error(err)
      setSubmitError('सर्वर से कनेक्ट नहीं हो पाया। कृपया पुनः प्रयास करें।')
    } finally {
      setSubmitting(false)
    }
  }

  const formatStep = (text, index) => {
    let s = text.replace(/\{amount\}/g, `₹${finalAmount.toLocaleString('en-IN')}`)
    if (index === 2 && !text.includes('{amount}')) {
      s = `₹${finalAmount.toLocaleString('en-IN')} की राशि confirm करें`
    }
    return s
  }

  const paymentSteps = settings.paymentSteps?.length
    ? settings.paymentSteps
    : [
        'अपने UPI ऐप (PhonePe, GPay, Paytm) खोलें',
        'QR कोड स्कैन करें या UPI ID दर्ज करें',
        'राशि confirm करें',
        'भुगतान पूरा करें — रसीद ईमेल पर मिलेगी',
      ]

  const upiConfigured = Boolean(settings.upiId?.trim())

  const qrUrl = upiConfigured
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `upi://pay?pa=${settings.upiId.trim()}&pn=${encodeURIComponent(settings.upiPayeeName || 'Donation')}&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(selectedCause?.label || 'Donation')}`,
    )}`
    : ''

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '12px 16px', borderRadius: '12px',
    border: `1.5px solid ${focused === field ? '#1a5c38' : '#e5e7eb'}`,
    fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#374151',
    background: focused === field ? '#f8fdf9' : '#fff',
    outline: 'none', transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(26,92,56,0.08)' : 'none',
  })

  if (settingsLoading) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Hind, sans-serif', color: '#6b7280' }}>लोड हो रहा है...</p>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', overflow: 'hidden' }}>

      <div style={{ background: 'linear-gradient(135deg,#05160e 0%,#0c351e 100%)', height: '260px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'luminosity' }}>
          <img src="/images/hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#05160e 10%,transparent 50%,#05160e 90%)' }} />
        </div>
        <div style={{ position: 'absolute', left: '6%', top: '20%', color: '#f5b400', opacity: 0.8, pointerEvents: 'none' }}>
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
          </svg>
        </div>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontFamily: "'Georgia',serif", fontStyle: 'italic', fontWeight: 700, fontSize: '16px', color: '#ffd54f' }}>
              {settings.heroSubtitle}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,5vw,48px)', color: '#fff', margin: '0 0 16px' }}>
            {settings.heroTitle}
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '6px 18px' }}>
            <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>होम</span>
            <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: '#ffd54f', fontWeight: 600 }}>दान करें</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '28px', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 36" fill="#f8f9fa" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,36 L1440,36 L1440,10 L1400,18 L1360,5 L1320,22 L1280,10 L1240,26 L1200,8 L1160,20 L1120,4 L1080,22 L1040,12 L1000,26 L960,6 L920,18 L880,10 L840,24 L800,8 L760,20 L720,8 L680,22 L640,10 L600,26 L560,6 L520,20 L480,8 L440,22 L400,8 L360,22 L320,10 L280,26 L240,6 L200,18 L160,8 L120,22 L80,8 L40,20 L0,10 Z" />
          </svg>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px', alignItems: 'start' }} className="donate-main-grid">

          <div style={{ background: '#fff', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            {step === 1 ? (
              <>
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26,92,56,0.07)', border: '1px solid rgba(26,92,56,0.14)', borderRadius: '999px', padding: '4px 14px', marginBottom: '12px' }}>
                    <Heart size={11} style={{ color: '#1a5c38', fill: '#1a5c38' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a5c38', fontFamily: 'Hind,sans-serif' }}>{settings.formStepBadge}</span>
                  </div>
                  <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '22px', color: '#111827', margin: 0 }}>
                    {settings.formStepTitle}
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '16px' }}>
                  {settings.presetAmounts.map((p) => {
                    const active = !custom && amount === String(p)
                    return (
                      <button key={p} type="button" onClick={() => handlePreset(p)} style={{ padding: '12px 8px', borderRadius: '12px', border: `1.5px solid ${active ? '#1a5c38' : '#e5e7eb'}`, background: active ? '#1a5c38' : '#fff', color: active ? '#fff' : '#374151', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                        ₹{p.toLocaleString('en-IN')}
                      </button>
                    )
                  })}
                </div>

                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '18px', color: '#1a5c38' }}>₹</span>
                  <input
                    type="number" min="1" placeholder="अन्य राशि दर्ज करें..."
                    value={custom ? amount : ''}
                    onChange={(e) => handleCustom(e.target.value)}
                    onFocus={() => { setFocused('amount'); setCustom(true) }}
                    onBlur={() => setFocused('')}
                    style={{ ...inputStyle('amount'), paddingLeft: '36px', fontSize: '16px', fontWeight: 700 }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontFamily: 'Hind,sans-serif', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>किस कार्य के लिए दान करें?</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {settings.causes.map((c) => (
                      <button key={c.id} type="button" onClick={() => setCause(c.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '999px', border: `1.5px solid ${cause === c.id ? '#1a5c38' : '#e5e7eb'}`, background: cause === c.id ? 'rgba(26,92,56,0.07)' : '#fff', color: cause === c.id ? '#1a5c38' : '#6b7280', fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                        <span>{c.icon}</span> {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Hind,sans-serif', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>आपका नाम *</label>
                    <input required type="text" placeholder="राम कुमार" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} style={inputStyle('name')} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'Hind,sans-serif', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ईमेल *</label>
                      <input required type="email" placeholder="अपना ईमेल दर्ज करें" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} style={inputStyle('email')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'Hind,sans-serif', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>फोन</label>
                      <input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} style={inputStyle('phone')} />
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div style={{ marginBottom: '16px', padding: '12px', borderRadius: '12px', background: 'rgba(220,38,38,0.08)', color: '#b91c1c', fontFamily: 'Hind,sans-serif', fontSize: '13.5px' }}>
                    {submitError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleProceed}
                  disabled={finalAmount <= 0 || !name.trim() || !email.trim() || submitting}
                  style={{ width: '100%', padding: '15px', borderRadius: '14px', border: 'none', background: finalAmount > 0 && name && email && !submitting ? 'linear-gradient(135deg,#1a5c38,#113d25)' : '#e5e7eb', color: finalAmount > 0 && name && email && !submitting ? '#fff' : '#9ca3af', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', cursor: finalAmount > 0 && name && email && !submitting ? 'pointer' : 'not-allowed', transition: 'all 0.25s ease', boxShadow: finalAmount > 0 && name && email ? '0 6px 20px rgba(26,92,56,0.3)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Heart size={16} style={{ fill: 'currentColor' }} />
                  {submitting ? 'प्रोसेस हो रहा है...' : finalAmount > 0 ? `₹${finalAmount.toLocaleString('en-IN')} का दान करें` : 'राशि और जानकारी भरें'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26,92,56,0.07)', border: '1px solid rgba(26,92,56,0.14)', borderRadius: '999px', padding: '4px 14px', marginBottom: '16px' }}>
                  <CheckCircle2 size={12} style={{ color: '#1a5c38' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a5c38', fontFamily: 'Hind,sans-serif' }}>QR से दान करें</span>
                </div>

                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '20px', color: '#111827', margin: '0 0 6px' }}>
                  ₹{finalAmount.toLocaleString('en-IN')} का दान
                </h2>
                {donationId && (
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '12px', color: '#9ca3af', margin: '0 0 20px' }}>
                    रेफरेंस ID: {donationId}
                  </p>
                )}

                {upiConfigured ? (
                  <>
                    <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '13.5px', color: '#6b7280', margin: '0 0 20px' }}>
                      नीचे QR कोड स्कैन करें या UPI ID से भुगतान करें
                    </p>

                    <div style={{ display: 'inline-block', padding: '16px', background: '#fff', border: '2px solid #f0f0f0', borderRadius: '20px', marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                      <img src={qrUrl} alt="UPI QR Code" style={{ width: '200px', height: '200px', display: 'block' }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#f8f9fa', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#1a5c38' }}>{settings.upiId}</span>
                      <button type="button" onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', border: 'none', background: copied ? '#1a5c38' : '#e5e7eb', color: copied ? '#fff' : '#374151', fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>
                        {copied ? <><Check size={13} /> कॉपी हो गया</> : <><Copy size={13} /> कॉपी करें</>}
                      </button>
                    </div>

                    <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', textAlign: 'left' }}>
                      {paymentSteps.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: i < paymentSteps.length - 1 ? '10px' : 0 }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#1a5c38', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins,sans-serif' }}>{i + 1}</div>
                          <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13.5px', color: '#374151', lineHeight: 1.5 }}>{formatStep(s, i)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '14px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
                    <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '14px', color: '#92400e', lineHeight: 1.65, margin: 0 }}>
                      आपका दान अनुरोध दर्ज हो गया है। UPI भुगतान विवरण अभी सेट नहीं है — हमारी टीम जल्द ही आपके ईमेल पर भुगतान की जानकारी भेजेगी।
                    </p>
                  </div>
                )}

                <button type="button" onClick={() => setStep(1)} style={{ padding: '10px 24px', borderRadius: '999px', border: '1.5px solid #e5e7eb', background: 'transparent', color: '#6b7280', fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                  ← वापस जाएं
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#111827', margin: '0 0 16px' }}>{settings.trustPanelTitle}</h3>
              {settings.trustBadges.map((badge) => {
                const IconComp = TRUST_ICONS[badge.icon] || Shield
                return (
                  <div key={badge.text} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(26,92,56,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <IconComp size={17} style={{ color: '#1a5c38' }} />
                    </div>
                    <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13.5px', color: '#374151', fontWeight: 500 }}>{badge.text}</span>
                  </div>
                )
              })}
            </div>

            {settings.impactItems?.length > 0 && (
              <div style={{ background: 'linear-gradient(135deg,#1a5c38,#113d25)', borderRadius: '20px', padding: '28px 24px', color: '#fff' }}>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', margin: '0 0 16px' }}>
                  {settings.impactPanelTitle}
                </h3>
                {settings.impactItems.map(({ amountLabel, impact }) => (
                  <div key={amountLabel} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#f5b400', color: '#111827', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '999px', flexShrink: 0, whiteSpace: 'nowrap' }}>{amountLabel}</span>
                    <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{impact}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: '#fff', borderRadius: '20px', padding: '20px 24px', border: '1.5px solid #f0f0f0', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={20} style={{ color: '#f5b400', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: '0 0 4px' }}>{settings.taxExemptTitle}</p>
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '12.5px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                    {settings.taxExemptDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .donate-main-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

export default DonatePage
