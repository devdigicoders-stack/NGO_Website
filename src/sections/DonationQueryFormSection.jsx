import { useState, useEffect } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE

const DEFAULT_SETTINGS = {
  sectionTitle: 'दान के लिए हमें संदेश भेजें',
  sectionSubtitle: '',
  emailLabel: 'ईमेल',
  emailPlaceholder: 'आपका ईमेल',
  phoneLabel: 'फ़ोन',
  phonePlaceholder: 'आपका फ़ोन नंबर',
  addressLabel: 'पता',
  addressPlaceholder: 'आपका पता',
  messageLabel: 'संदेश',
  messagePlaceholder: 'दान या सहयोग के बारे में लिखें',
  submitButtonText: 'संदेश भेजें',
  successMessage: 'धन्यवाद! आपका संदेश हमें मिल गया है। हम जल्द ही आपसे संपर्क करेंगे।',
}

/**
 * Donation inquiry form — fields match DonationQuery model only:
 * email, phone, address, message
 */
const DonationQueryFormSection = ({ source = 'website', sectionId = 'donation-query-form' }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [form, setForm] = useState({ email: '', phone: '', address: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')
  const [loadingSettings, setLoadingSettings] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/donation-queries/settings`)
        const json = await res.json()
        if (json.success && json.data) {
          setSettings({ ...DEFAULT_SETTINGS, ...json.data })
        }
      } catch (err) {
        console.error('Donation query settings load error:', err)
      } finally {
        setLoadingSettings(false)
      }
    }
    load()
  }, [])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch(`${API_BASE}/donation-queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        const msg = json.errors?.[0]?.msg || json.message || 'संदेश भेजने में समस्या हुई।'
        setError(msg)
        return
      }

      setSubmitted(true)
      setForm({ email: '', phone: '', address: '', message: '' })
    } catch (err) {
      console.error('Donation query submit error:', err)
      setError('सर्वर से कनेक्ट नहीं हो पाया। कृपया बाद में पुनः प्रयास करें।')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = (field) => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 16px',
    borderRadius: '12px',
    border: `1.5px solid ${focused === field ? '#1a5c38' : '#e5e7eb'}`,
    fontFamily: 'Hind, sans-serif',
    fontSize: '14px',
    color: '#374151',
    background: focused === field ? '#f8fdf9' : '#fff',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(26,92,56,0.08)' : 'none',
  })

  const labelStyle = {
    display: 'block',
    fontFamily: 'Hind, sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  }

  return (
    <section id={sectionId} style={{ background: '#f8f9fa', padding: '72px 0' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            border: '1.5px solid #eef2ef',
            padding: '40px 36px',
            boxShadow: '0 8px 32px rgba(26,92,56,0.06)',
          }}
        >
          {loadingSettings ? (
            <p style={{ textAlign: 'center', fontFamily: 'Hind, sans-serif', color: '#6b7280', margin: 0 }}>
              लोड हो रहा है...
            </p>
          ) : (
            <>
              {settings.sectionSubtitle ? (
                <p
                  style={{
                    fontFamily: 'Hind, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#1a5c38',
                    margin: '0 0 8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {settings.sectionSubtitle}
                </p>
              ) : null}

              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  color: '#111827',
                  margin: '0 0 28px',
                  lineHeight: 1.25,
                }}
              >
                {settings.sectionTitle}
              </h2>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <CheckCircle2 size={52} style={{ color: '#1a5c38', marginBottom: '14px' }} />
                  <p
                    style={{
                      fontFamily: 'Hind, sans-serif',
                      fontSize: '15px',
                      color: '#374151',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {settings.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    style={{
                      marginTop: '22px',
                      padding: '10px 24px',
                      borderRadius: '999px',
                      border: '1.5px solid #1a5c38',
                      background: 'transparent',
                      color: '#1a5c38',
                      fontFamily: 'Hind, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    नया संदेश भेजें
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {error && (
                    <div
                      style={{
                        background: 'rgba(220,38,38,0.08)',
                        border: '1.5px solid rgba(220,38,38,0.25)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontFamily: 'Hind, sans-serif',
                        fontSize: '13.5px',
                        color: '#b91c1c',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="dq-form-row">
                    <div>
                      <label style={labelStyle}>{settings.emailLabel} *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                        placeholder={settings.emailPlaceholder}
                        disabled={submitting}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        style={inputStyle('email')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{settings.phoneLabel}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange('phone')}
                        placeholder={settings.phonePlaceholder}
                        disabled={submitting}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused('')}
                        style={inputStyle('phone')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>{settings.addressLabel}</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange('address')}
                      placeholder={settings.addressPlaceholder}
                      disabled={submitting}
                      onFocus={() => setFocused('address')}
                      onBlur={() => setFocused('')}
                      style={inputStyle('address')}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>{settings.messageLabel} *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange('message')}
                      placeholder={settings.messagePlaceholder}
                      disabled={submitting}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '100px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px 28px',
                      borderRadius: '14px',
                      background: submitting ? '#4b7a5f' : 'linear-gradient(135deg,#1a5c38,#113d25)',
                      color: '#fff',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                      border: 'none',
                      cursor: submitting ? 'wait' : 'pointer',
                      alignSelf: 'flex-start',
                      boxShadow: '0 6px 20px rgba(26,92,56,0.25)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <Send size={16} />
                    {submitting ? 'भेजा जा रहा है...' : settings.submitButtonText}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .dq-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default DonationQueryFormSection
