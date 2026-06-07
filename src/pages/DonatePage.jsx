import { useState, useEffect, useRef } from 'react'
import { Heart, CheckCircle2, ChevronRight, Shield, Award, Users, Copy, Check, Upload, Image as ImageIcon } from 'lucide-react'
import DonationLetter from '../components/DonationLetter'

const API_BASE = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE

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

  const [screenshotFile, setScreenshotFile] = useState(null)
  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const fileInputRef = useRef(null)

  const [activeTab, setActiveTab] = useState('donate')
  const [searchId, setSearchId] = useState('')
  const [searchError, setSearchError] = useState('')
  const [searching, setSearching] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)

  const handleScreenshotSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshotFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setScreenshotPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleScreenshotUpload = async () => {
    if (!screenshotFile || !donationId) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', screenshotFile)
      const res = await fetch(`${API_BASE}/donations/${donationId}/screenshot`, {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (json.success) {
        setUploadDone(true)
        // Automatically show the pending letter as soon as the screenshot is uploaded
        if (json.data) {
          setSelectedDonation(json.data)
        }
      } else {
        alert(json.message || 'स्क्रीनशॉट अपलोड में त्रुटि हुई।')
      }
    } catch (err) {
      console.error(err)
      alert('सर्वर से कनेक्ट नहीं हो पाया।')
    } finally {
      setUploading(false)
    }
  }

  const handleLookupSearch = async () => {
    const trimmed = searchId.trim()
    if (!trimmed) {
      setSearchError('कृपया रेफरेंस ID दर्ज करें।')
      return
    }
    setSearchError('')
    setSearching(true)
    try {
      const res = await fetch(`${API_BASE}/donations/lookup?id=${encodeURIComponent(trimmed)}`)
      const json = await res.json()
      if (json.success && json.data) {
        setSelectedDonation(json.data)
      } else {
        setSearchError(json.message || 'रेफरेंस ID नहीं मिला। कृपया सही ID दर्ज करें।')
      }
    } catch (err) {
      console.error(err)
      setSearchError('कनेक्शन त्रुटि। कृपया बाद में प्रयास करें।')
    } finally {
      setSearching(false)
    }
  }

  const handleDownloadLetterFromSuccess = async (id) => {
    if (!id) return
    setSearching(true)
    try {
      const res = await fetch(`${API_BASE}/donations/lookup?id=${encodeURIComponent(id)}`)
      const json = await res.json()
      if (json.success && json.data) {
        setSelectedDonation(json.data)
      } else {
        alert('लेटर लोड करने में असमर्थ।')
      }
    } catch (err) {
      console.error(err)
      alert('कनेक्शन एरर।')
    } finally {
      setSearching(false)
    }
  }

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
    border: `1.5px solid ${focused === field ? '#821905' : '#e5e7eb'}`,
    fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#374151',
    background: focused === field ? '#f8fdf9' : '#fff',
    outline: 'none', transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(130, 25, 5,0.08)' : 'none',
  })

  if (selectedDonation) {
    return <DonationLetter donation={selectedDonation} onBack={() => setSelectedDonation(null)} />
  }

  if (settingsLoading) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Hind, sans-serif', color: '#6b7280' }}>लोड हो रहा है...</p>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', overflow: 'hidden' }}>

      <div style={{ background: 'linear-gradient(135deg,#2a0501 0%,#5a1002 100%)', height: '260px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'luminosity' }}>
          <img src="/images/hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#2a0501 10%,transparent 50%,#2a0501 90%)' }} />
        </div>
        <div style={{ position: 'absolute', left: '6%', top: '20%', color: '#FDED95', opacity: 0.8, pointerEvents: 'none' }}>
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

      <div style={{ maxWidth: '1100px', margin: '30px auto 0', padding: '0 24px' }} className="no-print">
        <div className="donate-tabs-container" style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #e5e7eb', paddingBottom: '1px' }}>
          <button
            onClick={() => { setActiveTab('donate'); setSelectedDonation(null); }}
            style={{
              padding: '12px 24px', background: 'transparent', border: 'none',
              borderBottom: activeTab === 'donate' ? '3px solid #821905' : '3px solid transparent',
              color: activeTab === 'donate' ? '#821905' : '#6b7280',
              fontFamily: 'Hind, sans-serif', fontWeight: 700, fontSize: '15px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            💝 दान करें (Donate Now)
          </button>
          <button
            onClick={() => { setActiveTab('lookup'); setSelectedDonation(null); }}
            style={{
              padding: '12px 24px', background: 'transparent', border: 'none',
              borderBottom: activeTab === 'lookup' ? '3px solid #821905' : '3px solid transparent',
              color: activeTab === 'lookup' ? '#821905' : '#6b7280',
              fontFamily: 'Hind, sans-serif', fontWeight: 700, fontSize: '15px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            📄 रसीद / लेटर डाउनलोड (Download Letter)
          </button>
        </div>
      </div>

      <div className="donate-main-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {activeTab === 'lookup' ? (
          <div className="form-card" style={{ background: '#fff', borderRadius: '24px', padding: '40px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(130,25,5,0.08)', marginBottom: '18px', color: '#821905' }}>
                <Award size={26} />
              </div>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 5vw, 24px)', color: '#111827', margin: '0 0 10px' }}>
                कन्फर्मेशन लेटर डाउनलोड करें
              </h2>
              <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '15px', color: '#6b7280', margin: '0 0 28px' }}>
                अपना दान रेफरेंस ID दर्ज करें और 80G टैक्स-सर्टिफिकेट / कन्फर्मेशन लेटर डाउनलोड करें
              </p>

              <div className="search-container" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLookupSearch() }}
                  placeholder="जैसे: don-8a9d0f12"
                  disabled={searching}
                  style={{
                    flex: 1, minWidth: '200px', padding: '14px 18px',
                    borderRadius: '12px', border: '1.5px solid #e8c4bc',
                    fontFamily: 'Hind,sans-serif', fontSize: '15px',
                    outline: 'none', color: '#5c1204', background: '#fdf6f5',
                  }}
                />
                <button
                  onClick={handleLookupSearch}
                  disabled={searching}
                  style={{
                    padding: '14px 28px',
                    background: searching ? '#c49090' : 'linear-gradient(135deg,#821905,#a8240d)',
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontFamily: 'Hind,sans-serif', fontSize: '15px', fontWeight: 700,
                    cursor: searching ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    boxShadow: searching ? 'none' : '0 4px 14px rgba(130,25,5,0.35)',
                    transition: 'all 0.2s', whiteSpace: 'nowrap'
                  }}
                >
                  {searching ? 'खोज रहे हैं...' : 'सर्च करें'}
                </button>
              </div>

              {searchError && (
                <div style={{ padding: '12px 16px', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '18px' }}>
                  <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '14px', color: '#dc2626', fontWeight: 600 }}>{searchError}</span>
                </div>
              )}

              <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: '#9a6060', marginTop: '24px' }}>
                💡 रेफरेंस ID आपके दान दर्ज करने के बाद सफलता स्क्रीन पर दिखाई देता है।
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px', alignItems: 'start' }} className="donate-main-grid">

          <div className="form-card" style={{ background: '#fff', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            {step === 1 ? (
              <>
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(130, 25, 5,0.07)', border: '1px solid rgba(130, 25, 5,0.14)', borderRadius: '999px', padding: '4px 14px', marginBottom: '12px' }}>
                    <Heart size={11} style={{ color: '#821905', fill: '#821905' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind,sans-serif' }}>{settings.formStepBadge}</span>
                  </div>
                  <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 'clamp(18px, 4.5vw, 22px)', color: '#111827', margin: 0 }}>
                    {settings.formStepTitle}
                  </h2>
                </div>

                <div className="amount-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '16px' }}>
                  {settings.presetAmounts.map((p) => {
                    const active = !custom && amount === String(p)
                    return (
                      <button key={p} type="button" onClick={() => handlePreset(p)} style={{ padding: '12px 8px', borderRadius: '12px', border: `1.5px solid ${active ? '#821905' : '#e5e7eb'}`, background: active ? '#821905' : '#fff', color: active ? '#fff' : '#374151', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                        ₹{p.toLocaleString('en-IN')}
                      </button>
                    )
                  })}
                </div>

                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '18px', color: '#821905' }}>₹</span>
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
                  <div className="causes-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {settings.causes.map((c) => (
                      <button key={c.id} type="button" onClick={() => setCause(c.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '999px', border: `1.5px solid ${cause === c.id ? '#821905' : '#e5e7eb'}`, background: cause === c.id ? 'rgba(130, 25, 5,0.07)' : '#fff', color: cause === c.id ? '#821905' : '#6b7280', fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
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
                  <div className="form-row-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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
                  style={{ width: '100%', padding: '15px', borderRadius: '14px', border: 'none', background: finalAmount > 0 && name && email && !submitting ? 'linear-gradient(135deg,#821905,#5a1002)' : '#e5e7eb', color: finalAmount > 0 && name && email && !submitting ? '#fff' : '#9ca3af', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', cursor: finalAmount > 0 && name && email && !submitting ? 'pointer' : 'not-allowed', transition: 'all 0.25s ease', boxShadow: finalAmount > 0 && name && email ? '0 6px 20px rgba(130, 25, 5,0.3)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Heart size={16} style={{ fill: 'currentColor' }} />
                  {submitting ? 'प्रोसेस हो रहा है...' : finalAmount > 0 ? `₹${finalAmount.toLocaleString('en-IN')} का दान करें` : 'राशि और जानकारी भरें'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(130, 25, 5,0.07)', border: '1px solid rgba(130, 25, 5,0.14)', borderRadius: '999px', padding: '4px 14px', marginBottom: '16px' }}>
                  <CheckCircle2 size={12} style={{ color: '#821905' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind,sans-serif' }}>QR से दान करें</span>
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
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#821905' }}>{settings.upiId}</span>
                      <button type="button" onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', border: 'none', background: copied ? '#821905' : '#e5e7eb', color: copied ? '#fff' : '#374151', fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>
                        {copied ? <><Check size={13} /> कॉपी हो गया</> : <><Copy size={13} /> कॉपी करें</>}
                      </button>
                    </div>

                    <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', textAlign: 'left' }}>
                      {paymentSteps.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: i < paymentSteps.length - 1 ? '10px' : 0 }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#821905', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins,sans-serif' }}>{i + 1}</div>
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

                {/* ── Screenshot Upload Section ── */}
                <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '16px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(22,163,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Upload size={18} style={{ color: '#16a34a' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#111827', margin: 0 }}>
                        पेमेंट स्क्रीनशॉट अपलोड करें
                      </p>
                      <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>
                        भुगतान करने के बाद स्क्रीनशॉट यहाँ अपलोड करें — एडमिन verify करेगा
                      </p>
                    </div>
                  </div>

                  {!uploadDone ? (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotSelect}
                        style={{ display: 'none' }}
                      />

                      {screenshotPreview ? (
                        <div style={{ marginBottom: '14px' }}>
                          <div style={{ position: 'relative', display: 'inline-block', borderRadius: '12px', overflow: 'hidden', border: '2px solid #d1fae5', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                            <img src={screenshotPreview} alt="Payment Screenshot" style={{ maxWidth: '100%', maxHeight: '240px', display: 'block' }} />
                            <button
                              type="button"
                              onClick={() => { setScreenshotFile(null); setScreenshotPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                              style={{ position: 'absolute', top: '8px', right: '8px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              ✕
                            </button>
                          </div>
                          <div style={{ marginTop: '12px' }}>
                            <button
                              type="button"
                              onClick={handleScreenshotUpload}
                              disabled={uploading}
                              style={{
                                padding: '11px 28px', borderRadius: '12px', border: 'none',
                                background: uploading ? '#9ca3af' : 'linear-gradient(135deg, #16a34a, #15803d)',
                                color: '#fff', fontFamily: 'Hind,sans-serif', fontWeight: 700, fontSize: '14px',
                                cursor: uploading ? 'not-allowed' : 'pointer',
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                boxShadow: uploading ? 'none' : '0 4px 14px rgba(22,163,74,0.3)',
                                transition: 'all 0.2s',
                              }}
                            >
                              <Upload size={16} />
                              {uploading ? 'अपलोड हो रहा है...' : 'स्क्रीनशॉट अपलोड करें'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            width: '100%', padding: '28px 16px', borderRadius: '12px',
                            border: '2px dashed #86efac', background: '#f0fdf4',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                          }}
                        >
                          <ImageIcon size={28} style={{ color: '#16a34a' }} />
                          <span style={{ fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '14px', color: '#16a34a' }}>
                            स्क्रीनशॉट चुनें (JPG, PNG)
                          </span>
                          <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '12px', color: '#9ca3af' }}>
                            Max 5MB
                          </span>
                        </button>
                      )}
                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#dcfce7', borderRadius: '10px' }}>
                      <CheckCircle2 size={20} style={{ color: '#16a34a', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: 'Hind,sans-serif', fontWeight: 700, fontSize: '14px', color: '#15803d', margin: 0 }}>
                          स्क्रीनशॉट सफलतापूर्वक अपलोड हो गया!
                        </p>
                        <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '12px', color: '#166534', margin: '2px 0 0' }}>
                          एडमिन द्वारा verify होने के बाद आपका लेटर confirmed हो जाएगा।
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => { setStep(1); setScreenshotFile(null); setScreenshotPreview(null); setUploadDone(false); }} style={{ padding: '10px 24px', borderRadius: '999px', border: '1.5px solid #e5e7eb', background: 'transparent', color: '#6b7280', fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                    ← वापस जाएं
                  </button>
                  {uploadDone && (
                    <button type="button" onClick={() => handleDownloadLetterFromSuccess(donationId)} style={{ padding: '10px 24px', borderRadius: '999px', border: 'none', background: '#821905', color: '#fff', fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(130,25,5,0.2)' }}>
                      📄 कन्फर्मेशन लेटर देखें
                    </button>
                  )}
                </div>
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
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(130, 25, 5,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <IconComp size={17} style={{ color: '#821905' }} />
                    </div>
                    <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13.5px', color: '#374151', fontWeight: 500 }}>{badge.text}</span>
                  </div>
                )
              })}
            </div>

            {settings.impactItems?.length > 0 && (
              <div style={{ background: 'linear-gradient(135deg,#821905,#5a1002)', borderRadius: '20px', padding: '28px 24px', color: '#fff' }}>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', margin: '0 0 16px' }}>
                  {settings.impactPanelTitle}
                </h3>
                {settings.impactItems.map(({ amountLabel, impact }) => (
                  <div key={amountLabel} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#FDED95', color: '#111827', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '999px', flexShrink: 0, whiteSpace: 'nowrap' }}>{amountLabel}</span>
                    <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{impact}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: '#fff', borderRadius: '20px', padding: '20px 24px', border: '1.5px solid #f0f0f0', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={20} style={{ color: '#FDED95', flexShrink: 0, marginTop: '2px' }} />
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
        )}
      </div>

      <style>{`
        .donate-tabs-container::-webkit-scrollbar { display: none; }
        .donate-tabs-container { scrollbar-width: none; }

        @media (max-width: 900px) { 
          .donate-main-grid { grid-template-columns: 1fr !important; } 
          .donate-main-grid > div { min-width: 0; }
        }
        @media (max-width: 640px) {
          .donate-main-wrapper { padding: 32px 16px 60px !important; }
          .donate-tabs-container {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 4px !important;
            -webkit-overflow-scrolling: touch;
          }
          .donate-tabs-container button {
            white-space: nowrap !important;
            padding: 10px 16px !important;
            font-size: 14px !important;
          }
          .form-card {
            padding: 24px 20px !important;
          }
          .amount-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .search-container {
            flex-direction: column !important;
          }
          .search-container input, .search-container button {
            width: 100% !important;
          }
          .causes-container {
            flex-wrap: wrap !important;
            overflow-x: visible !important;
            padding-bottom: 0 !important;
          }
          .causes-container button {
            white-space: normal !important;
            flex: 1 1 calc(50% - 8px) !important;
            justify-content: center !important;
            padding: 10px 12px !important;
          }
          .form-row-mobile {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default DonatePage
