import { useState, useRef, useEffect } from 'react'
import { Heart, AlertTriangle, CreditCard, Landmark, Coins, ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE

const DonationBanner = () => {
  const [amount, setAmount] = useState('1000')
  const [selectedPreset, setSelectedPreset] = useState(1000) // matches 500, 1000, 2000, 5000, 'custom'
  const [paymentMethod, setPaymentMethod] = useState('test') // 'test', 'offline', 'credit'
  const [step, setStep] = useState(1) // 1 = form, 2 = QR flow
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)
  const [upiId, setUpiId] = useState('')
  const [upiPayeeName, setUpiPayeeName] = useState('')
  const [presetAmounts, setPresetAmounts] = useState([500, 1000, 2000, 5000])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/donations/settings`)
        const json = await res.json()
        if (json.success && json.data) {
          setUpiId(json.data.upiId?.trim() || '')
          setUpiPayeeName(json.data.upiPayeeName?.trim() || '')
          if (json.data.presetAmounts?.length) {
            setPresetAmounts(json.data.presetAmounts)
            setAmount(String(json.data.presetAmounts[1] || json.data.presetAmounts[0] || 1000))
            setSelectedPreset(json.data.presetAmounts[1] || json.data.presetAmounts[0] || 1000)
          }
        }
      } catch (err) {
        console.error('DonationBanner settings load error:', err)
      }
    }
    load()
  }, [])

  const upiConfigured = Boolean(upiId)

  const handlePresetClick = (val) => {
    setSelectedPreset(val)
    if (val === 'custom') {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    } else {
      setAmount(val.toString())
    }
  }

  const handleInputChange = (e) => {
    const val = e.target.value
    setAmount(val)
    // If the input matches a preset, highlight it; otherwise, set to 'custom'
    const numericVal = parseFloat(val)
    if (presetAmounts.includes(numericVal)) {
      setSelectedPreset(numericVal)
    } else {
      setSelectedPreset('custom')
    }
  }

  const handleCopy = () => {
    if (!upiId) return
    navigator.clipboard.writeText(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section 
      id="donation-banner" 
      style={{ 
        background: 'linear-gradient(135deg, #061910 0%, #0d3820 100%)',
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      
      {/* ─── Self-Contained Styles & Keyframes ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-breathing {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-15px) rotate(3deg) scale(1.03); }
        }
        @keyframes heart-beat-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.4)); }
          50% { transform: scale(1.12); filter: drop-shadow(0 0 16px rgba(239, 68, 68, 0.85)); }
        }
        @keyframes wave-paint {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.05) translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float-breathing {
          animation: float-breathing 8s ease-in-out infinite;
        }
        .animate-heart-pulse {
          animation: heart-beat-pulse 2.2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }
        .animate-wave-paint {
          animation: wave-paint 10s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.45s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .luxury-preset-btn {
          font-family: 'Poppins', 'Hind', sans-serif;
          font-weight: 700;
          font-size: 13.5px;
          border-radius: 999px;
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .luxury-payment-radio {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1.5px solid #efefef;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'Hind', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #4b5563;
        }
        @media (max-width: 1024px) {
          .banner-main-grid {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .donation-card-overlay {
            grid-template-columns: 1fr !important;
          }
          .donation-card-image-panel {
            display: none !important;
          }
        }
      `}} />

      {/* ─── Background Decorative Graphics ─── */}

      {/* 1. Grayscale Kids Photo Background (Right side) */}
      <div 
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          opacity: 0.16,
          mixBlendMode: 'luminosity',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <img 
          src="/images/volunteer_child.png" 
          alt="बाल सहायता पृष्ठभूमि"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center right',
          }}
        />
        {/* Dark vignette blending mask */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to left, transparent 20%, #061910 100%), linear-gradient(to bottom, #061910 0%, transparent 20%, transparent 80%, #061910 100%)',
          }}
        />
      </div>

      {/* 2. Massive Floating Glowing Gold Outline Heart */}
      <div 
        className="animate-float-breathing"
        style={{
          position: 'absolute',
          right: '8%',
          top: '12%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.85,
        }}
      >
        <svg 
          width="260" 
          height="260" 
          viewBox="0 0 200 200" 
          fill="none" 
          stroke="#f5b400" 
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(245, 180, 0, 0.45))',
          }}
        >
          {/* A beautiful organic hand-drawn fluid outline heart */}
          <path d="M100,50 C100,50 88,18 55,18 C25,18 15,48 45,85 C72,118 100,165 100,165 C100,165 128,118 155,85 C185,48 175,18 145,18 C112,18 100,50 100,50 Z" />
        </svg>
      </div>

      {/* 3. Bottom-Left Gold Paint Brush Stroke SVG */}
      <div 
        className="animate-wave-paint"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '32%',
          pointerEvents: 'none',
          zIndex: 1,
          transformOrigin: 'bottom left',
        }}
      >
        <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          <path d="M0 120H400C320 85 240 100 190 70C120 30 70 50 0 0V120Z" fill="#f5b400" opacity="0.95" />
          <path d="M0 120H380C310 95 250 110 200 85C140 50 80 65 0 20V120Z" fill="#ffd54f" opacity="0.4" />
        </svg>
      </div>

      {/* 4. Whimsical Hand-and-Heart Vector Illustration (Middle-Left) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2%',
          left: '4%',
          pointerEvents: 'none',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Pulsing red/pink glowing vector heart */}
        <div className="animate-heart-pulse" style={{ transformOrigin: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 64 64" fill="#ff4d6d">
            <path d="M32 14 C32 14 28 4 18 4 C8 4 4 14 14 26 C24 38 32 54 32 54 C32 54 40 38 50 26 C60 14 56 4 46 4 C36 4 32 14 32 14 Z" />
          </svg>
        </div>

        {/* Hand/Arm Vector Line Art */}
        <svg width="80" height="150" viewBox="0 0 100 200" fill="none">
          {/* Hand/arm sleeve outline */}
          <path d="M20 200 C30 160 35 150 25 120 C18 100 25 90 35 85 C42 82 52 85 58 92 C62 98 62 108 55 125 C48 140 55 160 62 200" stroke="#4ade80" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Palm and fingers cradling upwards */}
          <path d="M32 90 C32 75 28 65 24 55 C22 50 26 44 31 46 C36 48 38 56 42 66" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 66 C44 52 44 40 42 32 C41 27 46 23 50 26 C54 29 52 42 50 56" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 56 C54 46 58 38 60 30 C62 25 68 25 68 31 C68 37 60 49 56 64" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M56 64 C64 56 72 50 78 44 C82 40 86 44 82 50 C78 56 68 70 60 82" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          {/* Swirling organic accent inside */}
          <path d="M38 110 Q45 130 38 150" stroke="#4ade80" strokeWidth="1.5" opacity="0.6" />
          <circle cx="48" cy="120" r="3" fill="#4ade80" opacity="0.5" />
          <circle cx="42" cy="142" r="2" fill="#4ade80" opacity="0.5" />
        </svg>
      </div>


      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <div 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 24px', 
          position: 'relative', 
          zIndex: 10,
        }}
      >
        
        {/* ── Header Titles ── */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          
          {/* Script badge / Subtitle */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px',
              marginBottom: '14px',
            }}
          >
            <span 
              style={{ 
                fontFamily: "'Playfair Display', 'Georgia', serif", 
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: '22px', 
                color: '#ffd54f',
                letterSpacing: '0.04em',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              ज़रूरतमंदों को दान देना शुरू करें
            </span>
          </div>

          {/* Heading */}
          <h2 
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 800, 
              fontSize: 'clamp(28px, 4vw, 42px)', 
              color: '#ffffff', 
              lineHeight: 1.25, 
              maxWidth: '820px', 
              margin: '0 auto',
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            बच्चों की शिक्षा के लिए आज ही <span style={{ color: '#f5b400', position: 'relative' }}>हमारे साथ</span> जुड़ें
          </h2>

        </div>


        {/* ── Overlap Donation Card ── */}
        <div 
          className="donation-card-overlay"
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '32px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            overflow: 'hidden',
          }}
        >
          
          {/* LEFT PANEL: The Interactive Calculator Form */}
          <div style={{ padding: '40px 36px 44px' }}>
            
            {step === 1 ? (
              <div className="animate-fade-in">
                {/* Header label */}
                <h3 
                  style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 800, 
                    fontSize: '20px', 
                    color: '#111827', 
                    marginBottom: '18px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  सही जगह पर सहायता पहुँचाएँ
                </h3>

                {/* Warning Box */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    background: '#fffbeb',
                    border: '1.5px solid #fef3c7',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    marginBottom: '26px',
                  }}
                >
                  <AlertTriangle size={18} style={{ color: '#b45309', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p 
                      style={{ 
                        fontFamily: 'Hind, sans-serif', 
                        fontSize: '12px', 
                        fontWeight: 700, 
                        color: '#b5580f', 
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      सूचना: <span style={{ fontWeight: 500, color: '#b45309' }}>टेस्ट मोड सक्षम है। टेस्ट मोड में रहने के दौरान कोई वास्तविक दान संसाधित नहीं किया जाता है।</span>
                    </p>
                  </div>
                </div>

                {/* Input & Calculator Section */}
                <div style={{ marginBottom: '24px' }}>
                  <label 
                    style={{ 
                      display: 'block',
                      fontFamily: 'Hind, sans-serif', 
                      fontSize: '13.5px', 
                      fontWeight: 700, 
                      color: '#374151', 
                      marginBottom: '10px',
                    }}
                  >
                    आपकी दान राशि:
                  </label>

                  {/* Amount Display and Custom Input */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: '#f3f4f6', 
                      borderRadius: '16px', 
                      padding: '6px 14px',
                      border: '2px solid transparent',
                      transition: 'border-color 0.25s',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#1a5c38'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    {/* Custom Dollar Badge */}
                    <div 
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#111827',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        fontSize: '16px',
                        marginRight: '12px',
                        flexShrink: 0,
                      }}
                    >
                      ₹
                    </div>

                    <input 
                      ref={inputRef}
                      type="number" 
                      value={amount}
                      onChange={handleInputChange}
                      placeholder="0"
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        fontSize: '22px',
                        color: '#111827',
                        padding: '4px 0',
                      }}
                    />
                  </div>
                </div>

                {/* Quick Presets row */}
                <div 
                  style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px', 
                    marginBottom: '28px',
                  }}
                >
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className="luxury-preset-btn"
                      style={{
                        background: selectedPreset === preset ? '#111827' : '#ffffff',
                        color: selectedPreset === preset ? '#ffffff' : '#4b5563',
                        border: `1.5px solid ${selectedPreset === preset ? '#111827' : '#d1d5db'}`,
                      }}
                      onMouseEnter={(e) => {
                        if (selectedPreset !== preset) {
                          e.currentTarget.style.borderColor = '#111827';
                          e.currentTarget.style.background = '#f9fafb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedPreset !== preset) {
                          e.currentTarget.style.borderColor = '#d1d5db';
                          e.currentTarget.style.background = '#ffffff';
                        }
                      }}
                    >
                      ₹{preset}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handlePresetClick('custom')}
                    className="luxury-preset-btn"
                    style={{
                      background: selectedPreset === 'custom' ? '#111827' : '#ffffff',
                      color: selectedPreset === 'custom' ? '#ffffff' : '#4b5563',
                      border: `1.5px solid ${selectedPreset === 'custom' ? '#111827' : '#d1d5db'}`,
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPreset !== 'custom') {
                        e.currentTarget.style.borderColor = '#111827';
                        e.currentTarget.style.background = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPreset !== 'custom') {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.background = '#ffffff';
                      }
                    }}
                  >
                    अन्य राशि
                  </button>
                </div>


                {/* Secure Online Payment Notice */}
                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a5c38' }} />
                  <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>
                    सुरक्षित ऑनलाइन भुगतान (UPI / QR कोड)
                  </span>
                </div>


                {/* Submit Button */}
                <button
                  type="button"
                  onClick={() => {
                    const parsedVal = parseFloat(amount);
                    if (parsedVal > 0) {
                      setStep(2);
                    }
                  }}
                  style={{
                    width: '100%',
                    background: '#f5b400',
                    color: '#111827',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '16px 24px',
                    fontFamily: 'Hind, sans-serif',
                    fontWeight: 800,
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(245,180,0,0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(245,180,0,0.45)';
                    e.currentTarget.style.background = '#ffd54f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,180,0,0.3)';
                    e.currentTarget.style.background = '#f5b400';
                  }}
                >
                  अभी दान करें <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                {/* Step 2 Badge */}
                <div 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: 'rgba(26,92,56,0.07)', 
                    border: '1px solid rgba(26,92,56,0.14)', 
                    borderRadius: '999px', 
                    padding: '4px 14px', 
                    marginBottom: '16px' 
                  }}
                >
                  <CheckCircle2 size={12} style={{ color: '#1a5c38' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a5c38', fontFamily: 'Hind, sans-serif' }}>
                    QR से भुगतान करें
                  </span>
                </div>

                <h3 
                  style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 800, 
                    fontSize: '22px', 
                    color: '#111827', 
                    margin: '0 0 6px' 
                  }}
                >
                  ₹{parseFloat(amount).toLocaleString('en-IN')} का दान पूरा करें
                </h3>
                
                {upiConfigured ? (
                  <>
                    <p
                      style={{
                        fontFamily: 'Hind, sans-serif',
                        fontSize: '13.5px',
                        color: '#6b7280',
                        margin: '0 0 24px',
                        lineHeight: 1.5,
                      }}
                    >
                      नीचे दिए गए QR कोड को अपने मोबाइल ऐप से स्कैन करें या UPI ID कॉपी करके दान करें।
                    </p>

                    <div
                      style={{
                        display: 'inline-block',
                        padding: '16px',
                        background: '#ffffff',
                        border: '2px solid #f3f4f6',
                        borderRadius: '24px',
                        marginBottom: '20px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                      }}
                    >
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(upiId)}%26pn=${encodeURIComponent(upiPayeeName || 'Donation')}%26am=${amount}%26cu=INR%26tn=Sahayata%20Donation`}
                        alt="UPI QR Code"
                        style={{ width: '180px', height: '180px', display: 'block' }}
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        background: '#f9fafb',
                        border: '1.5px solid #e5e7eb',
                        borderRadius: '16px',
                        padding: '10px 14px',
                        marginBottom: '22px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 700,
                          fontSize: '14.5px',
                          color: '#1a5c38',
                        }}
                      >
                        {upiId}
                      </span>

                      <button
                        type="button"
                        onClick={handleCopy}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 12px',
                          borderRadius: '10px',
                          border: 'none',
                          background: copied ? '#1a5c38' : '#e5e7eb',
                          color: copied ? '#ffffff' : '#374151',
                          fontFamily: 'Hind, sans-serif',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {copied ? (
                          <>
                            <Check size={13} />
                            <span>कॉपी हो गया</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>कॉपी करें</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      background: '#fffbeb',
                      border: '1.5px solid #fde68a',
                      borderRadius: '16px',
                      padding: '16px 18px',
                      marginBottom: '22px',
                      textAlign: 'left',
                    }}
                  >
                    <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#92400e', lineHeight: 1.65, margin: 0 }}>
                      UPI भुगतान अभी सेट नहीं है। Admin panel → Donations → Page Settings में UPI ID भरकर Save करें।
                    </p>
                  </div>
                )}

                {/* Steps Guidelines */}
                <div 
                  style={{ 
                    background: '#f9fafb', 
                    borderRadius: '16px', 
                    padding: '14px 18px', 
                    marginBottom: '26px', 
                    textAlign: 'left' 
                  }}
                >
                  {[
                    'अपने UPI ऐप (PhonePe, GPay, Paytm) को खोलें।',
                    'कैमरा खोलकर ऊपर दिए गए QR कोड को स्कैन करें।',
                    `₹${parseFloat(amount).toLocaleString('en-IN')} की दान राशि की पुष्टि करें और अपना UPI पिन डालें।`,
                    'भुगतान सफल होने के बाद आपकी रसीद जल्द ही ईमेल पर भेज दी जाएगी।'
                  ].map((stepText, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px', 
                        marginBottom: idx < 3 ? '10px' : 0 
                      }}
                    >
                      <div 
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          borderRadius: '50%', 
                          background: '#1a5c38', 
                          color: '#ffffff', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          flexShrink: 0, 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          fontFamily: 'Poppins, sans-serif' 
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span 
                        style={{ 
                          fontFamily: 'Hind, sans-serif', 
                          fontSize: '13px', 
                          color: '#4b5563', 
                          lineHeight: 1.5 
                        }}
                      >
                        {stepText}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Go Back button */}
                <button 
                  type="button"
                  onClick={() => setStep(1)} 
                  style={{ 
                    padding: '10px 24px', 
                    borderRadius: '999px', 
                    border: '1.5px solid #d1d5db', 
                    background: 'transparent', 
                    color: '#6b7280', 
                    fontFamily: 'Hind, sans-serif', 
                    fontWeight: 600, 
                    fontSize: '13px', 
                    cursor: 'pointer', 
                    transition: 'all 0.25s' 
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a5c38'; e.currentTarget.style.color = '#1a5c38' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#6b7280' }}
                >
                  ← वापस जाएं
                </button>
              </div>
            )}

          </div>


          {/* RIGHT PANEL: Image panel with vertical paint jagged mask */}
          <div 
            className="donation-card-image-panel"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {/* The Main Children Photo */}
            <img 
              src="/images/donation_children.png" 
              alt="मदद पा रहे मुस्कुराते हुए बच्चे"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />

            {/* Overlay Gradient on Image */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 100%)',
              }}
            />

            {/* Custom Vertical White Jagged Paint Brush Stroke Overlay */}
            {/* Placed absolute left of this image, extending all the way down, covering the left edge */}
            <div 
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '42px',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            >
              <svg 
                viewBox="0 0 100 1000" 
                preserveAspectRatio="none"
                style={{
                  width: '100%',
                  height: '100%',
                  fill: '#ffffff',
                }}
              >
                {/* A detailed, highly organic jagged brush stroke edge path */}
                <path d="M0 0 H50 Q55 25 35 50 T48 100 Q32 125 45 150 T38 200 Q48 225 32 250 T46 300 Q35 325 48 350 T35 400 Q46 425 32 450 T48 500 Q34 525 45 550 T38 600 Q48 625 32 650 T46 700 Q35 725 48 750 T35 800 Q46 825 32 850 T48 900 Q34 925 45 950 T38 1000 H0 Z" />
              </svg>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default DonationBanner
