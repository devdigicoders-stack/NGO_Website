import { useState, useRef, useEffect } from 'react'
import { Download, Search, AlertCircle, CheckCircle2, CreditCard, Loader2, RefreshCw, Clock, XCircle } from 'lucide-react'
import IDCardGenerator from '../components/IDCardGenerator'
import JoiningLetterGenerator from '../components/JoiningLetterGenerator'

// Use relative /api in dev (Vite proxy → localhost:5002), full URL in prod
const API_BASE = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE

const IDCardDownloadPage = () => {
  const [regNumber, setRegNumber]       = useState('')
  const [registration, setRegistration] = useState(null)
  const [error, setError]               = useState('')
  const [idCardData, setIdCardData]     = useState(null)
  const [joiningLetterData, setJoiningLetterData] = useState(null)
  const [searching, setSearching]       = useState(false)
  const [generating, setGenerating]     = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { if (registration) setGenerating(true) }, [registration])

  const handleSearch = async () => {
    const trimmed = regNumber.trim().toUpperCase()
    if (!trimmed) { setError('कृपया रजिस्ट्रेशन नंबर दर्ज करें।'); return }
    setError(''); setRegistration(null); setIdCardData(null); setJoiningLetterData(null); setGenerating(false); setSearching(true)

    // 1️⃣  API first (query param avoids slash-in-path issue with Express)
    try {
      const res  = await fetch(`${API_BASE}/registrations?regNumber=${encodeURIComponent(trimmed)}`)
      const json = await res.json()
      if (json.success && json.data) { setRegistration(json.data); setSearching(false); return }
    } catch (_) {}

    // 2️⃣  localStorage fallback
    try {
      const local = JSON.parse(localStorage.getItem('trust_registrations') || '{}')
      if (local[trimmed]) { setRegistration(local[trimmed]); setSearching(false); return }
    } catch (_) {}

    setError('रजिस्ट्रेशन नंबर नहीं मिला। कृपया सही नंबर डालें।')
    setSearching(false)
  }

  const handleKeyDown   = (e) => { if (e.key === 'Enter') handleSearch() }
  const handleGenerated = (data) => { setIdCardData(data); setGenerating(false) }

  const downloadPart = (part) => {
    let url, filename;
    const reg = registration?.regNumber || regNumber
    if (part === 'joining_letter') {
      url = joiningLetterData
      filename = `Joining_Letter_${reg.replace(/\//g, '_')}.png`
    } else {
      url = idCardData?.[part]
      filename = `ID_Card_${part === 'front' ? 'Front' : 'Back'}_${reg.replace(/\//g, '_')}.png`
    }
    
    if (!url) return
    const link = document.createElement('a')
    link.download = filename
    link.href = url; link.click()
  }
  const downloadBoth = () => { downloadPart('front'); setTimeout(() => downloadPart('back'), 400); setTimeout(() => downloadPart('joining_letter'), 800) }
  const reset = () => {
    setRegNumber(''); setRegistration(null); setIdCardData(null); setJoiningLetterData(null); setError(''); setGenerating(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // ── Website theme colors (maroon/red) ──
  const primary   = '#821905'
  const primaryDk = '#5c1204'
  const primaryLt = '#a8240d'
  const bgPage    = 'linear-gradient(135deg,#fdf6f5 0%,#f9ece9 100%)'
  const borderClr = 'rgba(130,25,5,0.14)'
  const inputBg   = '#fdf6f5'
  const inputBdr  = '#e8c4bc'
  const subtleClr = '#9a6060'
  const successClr= '#16a34a'

  return (
    <div style={{ background: bgPage, minHeight: '100vh', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '20px',
            background: `linear-gradient(135deg,${primary},${primaryLt})`,
            boxShadow: `0 8px 24px rgba(130,25,5,0.30)`,
            marginBottom: '20px'
          }}>
            <CreditCard size={30} color="#fff" />
          </div>
          <h1 style={{
            fontFamily: 'Poppins,sans-serif', fontWeight: 800,
            fontSize: 'clamp(28px,5vw,40px)', color: primary,
            margin: '0 0 10px', lineHeight: 1.2
          }}>
            आईडी कार्ड डाउनलोड
          </h1>
          <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '16px', color: subtleClr, margin: 0 }}>
            अपना रजिस्ट्रेशन नंबर डालें और ID Card डाउनलोड करें
          </p>
        </div>

        {/* ── Search Box ── */}
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '32px',
          boxShadow: '0 4px 30px rgba(130,25,5,0.09)',
          border: `1px solid ${borderClr}`, marginBottom: '28px'
        }}>
          <label style={{
            fontFamily: 'Hind,sans-serif', fontSize: '15px', fontWeight: 700,
            color: primaryDk, display: 'block', marginBottom: '12px'
          }}>
            रजिस्ट्रेशन नंबर
          </label>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              ref={inputRef}
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="जैसे: RPS/2026/123456"
              disabled={searching}
              style={{
                flex: 1, minWidth: '200px', padding: '14px 18px',
                borderRadius: '12px', border: `1.5px solid ${inputBdr}`,
                fontFamily: 'Hind,sans-serif', fontSize: '15px',
                outline: 'none', color: primaryDk, background: inputBg, transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = primary}
              onBlur={e  => e.target.style.borderColor = inputBdr}
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              style={{
                padding: '14px 28px',
                background: searching ? '#c49090' : `linear-gradient(135deg,${primary},${primaryLt})`,
                color: '#fff', border: 'none', borderRadius: '12px',
                fontFamily: 'Hind,sans-serif', fontSize: '15px', fontWeight: 700,
                cursor: searching ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: searching ? 'none' : `0 4px 14px rgba(130,25,5,0.35)`,
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              {searching
                ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> खोज रहे हैं...</>
                : <><Search size={18} /> खोजें</>}
            </button>
          </div>

          {error && (
            <div style={{
              marginTop: '16px', padding: '12px 16px',
              background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <AlertCircle size={18} color="#dc2626" />
              <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '14px', color: '#dc2626' }}>{error}</span>
            </div>
          )}
        </div>

        {/* ── Result Card ── */}
        {registration && (
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '32px',
            boxShadow: '0 4px 30px rgba(130,25,5,0.09)',
            border: `1px solid ${borderClr}`,
          }}>
            {/* Success header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '12px', marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color={successClr} />
                <div>
                  <h2 style={{ fontFamily: 'Hind,sans-serif', fontSize: '18px', fontWeight: 800, color: successClr, margin: 0 }}>
                    ID Card मिल गया!
                  </h2>
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    रजिस्ट्रेशन नं:{' '}
                    <strong style={{ color: primary, fontFamily: 'monospace' }}>{registration.regNumber}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={reset}
                style={{
                  padding: '8px 16px', background: 'transparent', color: primary,
                  border: `1.5px solid ${primary}`, borderRadius: '10px',
                  fontFamily: 'Hind,sans-serif', fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <RefreshCw size={14} /> नया खोजें
              </button>
            </div>

            {/* Status Checks */}
            {registration.status === 'pending' && (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <Clock size={48} color="#f59e0b" />
                  <h3 style={{ fontFamily: 'Hind,sans-serif', fontSize: '20px', fontWeight: 800, color: '#92400e', margin: 0 }}>लंबित (Pending Approval)</h3>
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '15px', color: subtleClr, margin: 0, maxWidth: '400px' }}>
                    आपका पंजीकरण अभी एडमिन द्वारा सत्यापित किया जा रहा है। अप्रूव होने के बाद ही आप अपना ID Card और Joining Letter डाउनलोड कर सकेंगे।
                  </p>
                </div>
              </div>
            )}

            {registration.status === 'rejected' && (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <XCircle size={48} color="#ef4444" />
                  <h3 style={{ fontFamily: 'Hind,sans-serif', fontSize: '20px', fontWeight: 800, color: '#991b1b', margin: 0 }}>अस्वीकृत (Rejected)</h3>
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '15px', color: subtleClr, margin: 0, maxWidth: '400px' }}>
                    क्षमा करें, आपका पंजीकरण किसी कारणवश अस्वीकृत कर दिया गया है। अधिक जानकारी के लिए कृपया हमसे संपर्क करें।
                  </p>
                </div>
              </div>
            )}

            {/* Generating spinner */}
            {generating && registration.status === 'approved' && (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    border: `4px solid #f5e0dc`, borderTopColor: primary,
                    animation: 'spin 0.9s linear infinite'
                  }} />
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '15px', color: subtleClr, margin: 0 }}>
                    ID Card बन रहा है, कृपया प्रतीक्षा करें...
                  </p>
                </div>
              </div>
            )}

            {/* Card previews */}
            {idCardData && !generating && registration.status === 'approved' && (
              <>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>

                  {/* Front */}
                  <div style={{ flex: '1 1 280px', maxWidth: '380px', textAlign: 'center' }}>
                    <p style={{
                      fontFamily: 'Hind,sans-serif', fontWeight: 700, fontSize: '13px',
                      marginBottom: '10px', color: primaryDk, textTransform: 'uppercase', letterSpacing: '1px'
                    }}>🪪 सामने का भाग (Front)</p>
                    <img
                      src={idCardData.front} alt="Front ID Card"
                      style={{
                        width: '100%', height: 'auto', borderRadius: '14px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                        border: `1px solid ${borderClr}`, display: 'block'
                      }}
                    />
                    <button
                      onClick={() => downloadPart('front')}
                      style={{
                        width: '100%', marginTop: '14px', padding: '13px',
                        background: `linear-gradient(135deg,${primary},${primaryLt})`,
                        color: '#fff', border: 'none', borderRadius: '12px',
                        fontFamily: 'Hind,sans-serif', fontSize: '14px', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '8px',
                        boxShadow: `0 4px 14px rgba(130,25,5,0.32)`, transition: 'opacity 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
                      onMouseOut={e  => e.currentTarget.style.opacity = '1'}
                    >
                      <Download size={16} /> सामने का भाग डाउनलोड करें
                    </button>
                  </div>

                  {/* Back */}
                  <div style={{ flex: '1 1 280px', maxWidth: '380px', textAlign: 'center' }}>
                    <p style={{
                      fontFamily: 'Hind,sans-serif', fontWeight: 700, fontSize: '13px',
                      marginBottom: '10px', color: primaryDk, textTransform: 'uppercase', letterSpacing: '1px'
                    }}>🔲 पीछे का भाग (Back)</p>
                    <img
                      src={idCardData.back} alt="Back ID Card"
                      style={{
                        width: '100%', height: 'auto', borderRadius: '14px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                        border: `1px solid ${borderClr}`, display: 'block'
                      }}
                    />
                    <button
                      onClick={() => downloadPart('back')}
                      style={{
                        width: '100%', marginTop: '14px', padding: '13px',
                        background: 'transparent', color: primary,
                        border: `2px solid ${primary}`, borderRadius: '12px',
                        fontFamily: 'Hind,sans-serif', fontSize: '14px', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '8px', transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.background = primary; e.currentTarget.style.color = '#fff' }}
                      onMouseOut={e  => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = primary }}
                    >
                      <Download size={16} /> पीछे का भाग डाउनलोड करें
                    </button>
                  </div>
                </div>

                {/* Joining Letter Preview */}
                {joiningLetterData && (
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
                    <div style={{ flex: '1 1 280px', maxWidth: '380px', textAlign: 'center' }}>
                      <p style={{
                        fontFamily: 'Hind,sans-serif', fontWeight: 700, fontSize: '13px',
                        marginBottom: '10px', color: primaryDk, textTransform: 'uppercase', letterSpacing: '1px'
                      }}>📜 जॉइनिंग लेटर (Joining Letter)</p>
                      <img
                        src={joiningLetterData} alt="Joining Letter"
                        style={{
                          width: '100%', height: 'auto', borderRadius: '14px',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                          border: `1px solid ${borderClr}`, display: 'block'
                        }}
                      />
                      <button
                        onClick={() => downloadPart('joining_letter')}
                        style={{
                          width: '100%', marginTop: '14px', padding: '13px',
                          background: `linear-gradient(135deg,${primary},${primaryLt})`,
                          color: '#fff', border: 'none', borderRadius: '12px',
                          fontFamily: 'Hind,sans-serif', fontSize: '14px', fontWeight: 700,
                          cursor: 'pointer', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', gap: '8px',
                          boxShadow: `0 4px 14px rgba(130,25,5,0.32)`, transition: 'opacity 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
                        onMouseOut={e  => e.currentTarget.style.opacity = '1'}
                      >
                        <Download size={16} /> जॉइनिंग लेटर डाउनलोड करें
                      </button>
                    </div>
                  </div>
                )}

                {/* Download both */}
                <div style={{ textAlign: 'center', paddingTop: '8px', borderTop: `1px solid ${borderClr}` }}>
                  <button
                    onClick={downloadBoth}
                    style={{
                      padding: '14px 36px',
                      background: `linear-gradient(135deg,${primaryDk},${primary})`,
                      color: '#fff', border: 'none', borderRadius: '14px',
                      fontFamily: 'Hind,sans-serif', fontSize: '15px', fontWeight: 800,
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px',
                      boxShadow: `0 6px 20px rgba(130,25,5,0.35)`,
                      letterSpacing: '0.3px', transition: 'opacity 0.2s', marginTop: '20px'
                    }}
                    onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseOut={e  => e.currentTarget.style.opacity = '1'}
                  >
                    <Download size={18} /> दोनों एक साथ डाउनलोड करें
                  </button>
                </div>
              </>
            )}

            {/* Hidden generator canvas */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
              {registration.status === 'approved' && (
                <>
                  <IDCardGenerator
                    orgId={registration.orgId}
                    formData={{ ...registration.formData, role: registration.role, validFrom: registration.validFrom, validUntil: registration.validUntil }}
                    regNumber={registration.regNumber}
                    onGenerated={handleGenerated}
                  />
                  <JoiningLetterGenerator
                    orgId={registration.orgId}
                    formData={{ ...registration.formData, role: registration.role, validFrom: registration.validFrom, validUntil: registration.validUntil }}
                    regNumber={registration.regNumber}
                    onGenerated={setJoiningLetterData}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Help text */}
        {!registration && !searching && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: '#b08080' }}>
              💡 रजिस्ट्रेशन नंबर आपके पंजीकरण के बाद दिए गए प्रमाण पत्र में होता है।<br />
              जैसे:{' '}
              <strong style={{ fontFamily: 'monospace', color: primary }}>RPS/2026/123456</strong>
            </p>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default IDCardDownloadPage
