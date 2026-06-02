import { useState } from 'react'
import { ChevronRight, CheckCircle2, Upload, User, Phone, Mail, MapPin, Calendar, FileText, Shield, Download } from 'lucide-react'
import { saveRegistration } from '../utils/registrationUtils'
import IDCardGenerator from '../components/IDCardGenerator'

const orgs = [
  { id: 'patrakar',   short: 'पत्रकार संघ',      full: 'राष्ट्रीय पत्रकार समर्पित संघ',           color: '#1a5c38', icon: '📰' },
  { id: 'crime',      short: 'क्राइम ब्यूरो',     full: 'राष्ट्रीय क्राइम इन्वेस्टिगेशन ब्यूरो',  color: '#dc2626', icon: '🔍' },
  { id: 'chikitsa',   short: 'चिकित्सा संघ',      full: 'आखिल भारतीय चिकित्सा संघ',               color: '#0ea5e9', icon: '🏥' },
  { id: 'hindu',      short: 'हिन्दू महासभा',     full: 'राष्ट्रीय हिन्दू महासभा साधू',           color: '#f97316', icon: '🕉️' },
  { id: 'journalist', short: 'जर्नलिस्ट काउंसिल', full: 'इंडियन काउंसिल ऑफ जर्नलिस्ट साधू',      color: '#7c3aed', icon: '✍️' },
  { id: 'manav',      short: 'मानवधिकार आयोग',    full: 'राष्ट्रीय मानवधिकार आयोग साधू',          color: '#059669', icon: '⚖️' },
  { id: 'bhrashtachar', short: 'भ्रष्टाचार केन्द्र', full: 'भ्रष्टाचार उन्मूलन अपराध अनुसंधान केन्द्र साधू', color: '#b45309', icon: '🛡️' },
  { id: 'recall',     short: 'राइट टू रिकॉल',    full: 'राइट टू रिकॉल मंच',                      color: '#0284c7', icon: '🗳️' },
  { id: 'muslim',     short: 'मुस्लिम मंच',       full: 'भारतीय मुस्लिम मंच',                     color: '#16a34a', icon: '☪️' },
]

// Common fields for all forms
const commonFields = [
  { id: 'name',        label: 'पूरा नाम',          type: 'text',   placeholder: 'अपना पूरा नाम लिखें',       icon: User,     required: true  },
  { id: 'father',      label: 'पिता / पति का नाम', type: 'text',   placeholder: 'पिता / पति का नाम',         icon: User,     required: true  },
  { id: 'dob',         label: 'जन्म तिथि',          type: 'date',   placeholder: '',                          icon: Calendar, required: true  },
  { id: 'mobile',      label: 'मोबाइल नंबर',        type: 'tel',    placeholder: '+91 98765 43210',           icon: Phone,    required: true  },
  { id: 'email',       label: 'ईमेल पता',           type: 'email',  placeholder: 'अपना ईमेल दर्ज करें',         icon: Mail,     required: false },
  { id: 'address',     label: 'पूरा पता',           type: 'textarea', placeholder: 'ग्राम/मोहल्ला, तहसील, जिला, राज्य', icon: MapPin, required: true },
  { id: 'pincode',     label: 'पिन कोड',            type: 'text',   placeholder: '226001',                    icon: MapPin,   required: true  },
  { id: 'aadhar',      label: 'आधार नंबर',          type: 'text',   placeholder: 'XXXX XXXX XXXX',            icon: FileText, required: true  },
  { id: 'pan',         label: 'पैन नंबर (यदि हो)', type: 'text',   placeholder: 'पैन नंबर दर्ज करें',                icon: FileText, required: false },
  { id: 'qualification', label: 'शैक्षिक योग्यता', type: 'select', options: ['हाई स्कूल', 'इंटरमीडिएट', 'स्नातक', 'परास्नातक', 'अन्य'], icon: FileText, required: true },
  { id: 'occupation',  label: 'व्यवसाय',            type: 'text',   placeholder: 'अपना व्यवसाय लिखें',       icon: FileText, required: true  },
]

// Extra fields per org
const extraFields = {
  patrakar:     [{ id: 'press_id', label: 'प्रेस आईडी (यदि हो)', type: 'text', placeholder: 'प्रेस आईडी नंबर', icon: FileText, required: false }, { id: 'publication', label: 'समाचार पत्र / चैनल का नाम', type: 'text', placeholder: 'संस्था का नाम', icon: FileText, required: false }],
  crime:        [{ id: 'exp', label: 'अनुभव (वर्षों में)', type: 'text', placeholder: 'जैसे: 5 वर्ष', icon: FileText, required: false }, { id: 'prev_org', label: 'पूर्व संस्था (यदि हो)', type: 'text', placeholder: 'पूर्व संस्था का नाम', icon: FileText, required: false }],
  chikitsa:     [{ id: 'degree', label: 'चिकित्सा डिग्री', type: 'text', placeholder: 'MBBS / BAMS / BHMS आदि', icon: FileText, required: true }, { id: 'reg_no', label: 'मेडिकल रजिस्ट्रेशन नंबर', type: 'text', placeholder: 'रजिस्ट्रेशन नंबर', icon: FileText, required: false }],
  hindu:        [{ id: 'shakha', label: 'शाखा / क्षेत्र', type: 'text', placeholder: 'अपनी शाखा का नाम', icon: MapPin, required: false }],
  journalist:   [{ id: 'press_id', label: 'प्रेस आईडी', type: 'text', placeholder: 'प्रेस आईडी नंबर', icon: FileText, required: false }, { id: 'lang', label: 'भाषा', type: 'select', options: ['हिंदी', 'अंग्रेजी', 'उर्दू', 'अन्य'], icon: FileText, required: true }],
  manav:        [{ id: 'complaint_area', label: 'कार्य क्षेत्र', type: 'text', placeholder: 'जिला / राज्य', icon: MapPin, required: true }],
  bhrashtachar: [{ id: 'dept', label: 'संबंधित विभाग', type: 'text', placeholder: 'जैसे: पुलिस, राजस्व आदि', icon: FileText, required: false }],
  recall:       [{ id: 'ward', label: 'वार्ड / विधानसभा क्षेत्र', type: 'text', placeholder: 'अपना क्षेत्र लिखें', icon: MapPin, required: true }],
  muslim:       [{ id: 'masjid', label: 'मस्जिद / मदरसा (यदि संबद्ध हो)', type: 'text', placeholder: 'नाम लिखें', icon: FileText, required: false }],
}

const RegistrationPage = () => {
  const [activeTab, setActiveTab] = useState('patrakar')
  const [forms, setForms] = useState({})
  const [submitted, setSubmitted] = useState({})
  const [focused, setFocused] = useState('')
  const [regNumbers, setRegNumbers] = useState({})
  const [idCards, setIdCards] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState({})

  const org = orgs.find(o => o.id === activeTab)
  const fields = [...commonFields, ...(extraFields[activeTab] || [])]
  const formData = forms[activeTab] || {}

  const setValue = (field, val) => {
    setForms(prev => ({ ...prev, [activeTab]: { ...(prev[activeTab] || {}), [field]: val } }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(prev => ({ ...prev, [activeTab]: null }))
    
    try {
      // Save registration data
      const res = await saveRegistration(activeTab, formData)
      
      if (res.success) {
        const regNumber = res.data.regNumber
        // Store registration number
        setRegNumbers(prev => ({ ...prev, [activeTab]: regNumber }))
        setSubmitted(prev => ({ ...prev, [activeTab]: true }))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(prev => ({ ...prev, [activeTab]: res.error || 'पंजीकरण विफल रहा। कृपया पुन: प्रयास करें।' }))
      }
    } catch (err) {
      console.error(err)
      setError(prev => ({ ...prev, [activeTab]: 'सर्वर से जुड़ने में असमर्थ। कृपया पुन: प्रयास करें।' }))
    } finally {
      setSubmitting(false)
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setValue('photo', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownloadIDCard = () => {
    const idCardData = idCards[activeTab]
    if (idCardData) {
      const link = document.createElement('a')
      link.download = `ID_Card_${regNumbers[activeTab].replace(/\//g, '_')}.png`
      link.href = idCardData
      link.click()
    }
  }

  const inputBase = (field) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '11px 14px 11px 40px',
    borderRadius: '10px',
    border: `1.5px solid ${focused === `${activeTab}-${field}` ? org.color : '#e5e7eb'}`,
    fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#374151',
    background: focused === `${activeTab}-${field}` ? '#fafffe' : '#fff',
    outline: 'none', transition: 'all 0.2s ease',
    boxShadow: focused === `${activeTab}-${field}` ? `0 0 0 3px ${org.color}18` : 'none',
  })

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>

      {/* ── Hero Banner ── */}
      <div style={{ background: 'linear-gradient(135deg,#05160e 0%,#0c351e 100%)', padding: '48px 24px 56px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, mixBlendMode: 'luminosity' }}>
          <img src="/images/hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#05160e 10%,transparent 50%,#05160e 90%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Trust badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,180,0,0.15)', border: '1px solid rgba(245,180,0,0.3)', borderRadius: '999px', padding: '6px 18px', marginBottom: '16px' }}>
            <Shield size={13} style={{ color: '#f5b400' }} />
            <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '12px', fontWeight: 700, color: '#f5b400', letterSpacing: '0.08em' }}>
              साधू लक्ष्मी जनकल्याण ट्रस्ट • रजि. नं. IV/175/26 • दर्पण नं. UP/2026/1079895
            </span>
          </div>

          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 'clamp(24px,4vw,42px)', color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>
            सदस्यता पंजीकरण
          </h1>
          <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.65)', margin: '0 0 20px' }}>
            नीचे अपनी संस्था चुनें और पंजीकरण फॉर्म भरें
          </p>

          {/* Breadcrumb */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '6px 18px' }}>
            <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>होम</span>
            <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: '#ffd54f', fontWeight: 600 }}>पंजीकरण</span>
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '28px', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 36" fill="#f8f9fa" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,36 L1440,36 L1440,10 L1400,18 L1360,5 L1320,22 L1280,10 L1240,26 L1200,8 L1160,20 L1120,4 L1080,22 L1040,12 L1000,26 L960,6 L920,18 L880,10 L840,24 L800,8 L760,20 L720,8 L680,22 L640,10 L600,26 L560,6 L520,20 L480,8 L440,22 L400,8 L360,22 L320,10 L280,26 L240,6 L200,18 L160,8 L120,22 L80,8 L40,20 L0,10 Z" />
          </svg>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* ── Org Tabs ── */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px', justifyContent: 'center' }}>
          {orgs.map(o => (
            <button key={o.id} onClick={() => { setActiveTab(o.id); setFocused('') }}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '9px 16px', borderRadius: '999px',
                border: `1.5px solid ${activeTab === o.id ? o.color : '#e5e7eb'}`,
                background: activeTab === o.id ? o.color : '#fff',
                color: activeTab === o.id ? '#fff' : '#374151',
                fontFamily: 'Hind,sans-serif', fontWeight: 600, fontSize: '13px',
                cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: activeTab === o.id ? `0 4px 14px ${o.color}40` : 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (activeTab !== o.id) { e.currentTarget.style.borderColor = o.color; e.currentTarget.style.color = o.color } }}
              onMouseLeave={e => { if (activeTab !== o.id) { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151' } }}
            >
              <span style={{ fontSize: '15px' }}>{o.icon}</span>
              {o.short}
            </button>
          ))}
        </div>

        {/* ── Form Card ── */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Org header */}
          <div style={{ background: org.color, borderRadius: '20px 20px 0 0', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
              {org.icon}
            </div>
            <div>
              <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                सदस्यता पंजीकरण फॉर्म
              </p>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 'clamp(16px,2vw,22px)', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                {org.full}
              </h2>
            </div>
          </div>

          {/* Form body */}
          <div style={{ background: '#fff', borderRadius: '0 0 20px 20px', padding: '36px 32px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

            {submitted[activeTab] ? (
              /* Success state */
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: `${org.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={36} style={{ color: org.color }} />
                </div>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '22px', color: '#111827', margin: '0 0 8px' }}>
                  पंजीकरण सफल हुआ!
                </h3>
                <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '15px', color: '#6b7280', margin: '0 0 12px' }}>
                  {org.full} में आपका पंजीकरण हो गया है।
                </p>
                
                {/* Registration Number */}
                <div style={{ background: `${org.color}10`, border: `2px solid ${org.color}`, borderRadius: '12px', padding: '16px 24px', margin: '0 auto 20px', maxWidth: '400px' }}>
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '12px', color: '#6b7280', margin: '0 0 6px', fontWeight: 600 }}>आपका रजिस्ट्रेशन नंबर</p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '24px', fontWeight: 800, color: org.color, margin: 0, letterSpacing: '0.02em' }}>
                    {regNumbers[activeTab]}
                  </p>
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '11px', color: '#9ca3af', margin: '6px 0 0' }}>इस नंबर को सुरक्षित रखें</p>
                </div>

                {/* ID Card Preview */}
                {idCards[activeTab] && (
                  <div style={{ margin: '0 auto 24px', maxWidth: '500px' }}>
                    <img src={idCards[activeTab]} alt="ID Card" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }} />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={handleDownloadIDCard} disabled={!idCards[activeTab]}
                    style={{ padding: '11px 28px', borderRadius: '999px', border: 'none', background: idCards[activeTab] ? org.color : '#ccc', color: '#fff', fontFamily: 'Hind,sans-serif', fontWeight: 700, fontSize: '14px', cursor: idCards[activeTab] ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={16} />
                    ID Card डाउनलोड करें
                  </button>
                  <button onClick={() => setSubmitted(prev => ({ ...prev, [activeTab]: false }))}
                    style={{ padding: '11px 28px', borderRadius: '999px', border: `1.5px solid ${org.color}`, background: 'transparent', color: org.color, fontFamily: 'Hind,sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                    नया पंजीकरण करें
                  </button>
                </div>

                {/* ID Card Generator */}
                <IDCardGenerator
                  orgId={activeTab}
                  formData={formData}
                  regNumber={regNumbers[activeTab]}
                  onGenerated={(data) => setIdCards(prev => ({ ...prev, [activeTab]: data }))}
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Info notice */}
                <div style={{ display: 'flex', gap: '10px', background: `${org.color}0d`, border: `1px solid ${org.color}30`, borderRadius: '12px', padding: '12px 16px', marginBottom: '28px' }}>
                  <Shield size={16} style={{ color: org.color, flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.6 }}>
                    <strong>साधू लक्ष्मी जनकल्याण ट्रस्ट</strong> — रजि. नं. <strong>IV/175/26</strong> | दर्पण नं. <strong>UP/2026/1079895</strong> के अंतर्गत पंजीकरण। सभी जानकारी गोपनीय रखी जाएगी।
                  </p>
                </div>

                {/* Fields grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="reg-form-grid">
                  {fields.map(f => {
                    const fkey = `${activeTab}-${f.id}`
                    const IconComp = f.icon
                    return (
                      <div key={f.id} style={{ gridColumn: f.type === 'textarea' ? 'span 2' : 'span 1' }}>
                        <label style={{ display: 'block', fontFamily: 'Hind,sans-serif', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {f.label} {f.required && <span style={{ color: '#dc2626' }}>*</span>}
                        </label>

                        <div style={{ position: 'relative' }}>
                          <IconComp size={15} style={{ position: 'absolute', left: '13px', top: f.type === 'textarea' ? '13px' : '50%', transform: f.type === 'textarea' ? 'none' : 'translateY(-50%)', color: focused === fkey ? org.color : '#9ca3af', pointerEvents: 'none', transition: 'color 0.2s', zIndex: 1 }} />

                          {f.type === 'textarea' ? (
                            <textarea rows={3} required={f.required} placeholder={f.placeholder}
                              value={formData[f.id] || ''}
                              onChange={e => setValue(f.id, e.target.value)}
                              onFocus={() => setFocused(fkey)} onBlur={() => setFocused('')}
                              style={{ ...inputBase(f.id), paddingTop: '11px', resize: 'vertical', minHeight: '80px' }}
                            />
                          ) : f.type === 'select' ? (
                            <select required={f.required}
                              value={formData[f.id] || ''}
                              onChange={e => setValue(f.id, e.target.value)}
                              onFocus={() => setFocused(fkey)} onBlur={() => setFocused('')}
                              style={{ ...inputBase(f.id), appearance: 'none', cursor: 'pointer' }}
                            >
                              <option value="">-- चुनें --</option>
                              {f.options.map(op => <option key={op} value={op}>{op}</option>)}
                            </select>
                          ) : (
                            <input type={f.type} required={f.required} placeholder={f.placeholder}
                              value={formData[f.id] || ''}
                              onChange={e => setValue(f.id, e.target.value)}
                              onFocus={() => setFocused(fkey)} onBlur={() => setFocused('')}
                              style={inputBase(f.id)}
                            />
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {/* Photo upload */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontFamily: 'Hind,sans-serif', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      पासपोर्ट साइज फोटो <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '10px', border: `1.5px dashed ${org.color}60`, background: `${org.color}06`, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = `${org.color}10`}
                      onMouseLeave={e => e.currentTarget.style.background = `${org.color}06`}
                    >
                      <Upload size={18} style={{ color: org.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13.5px', color: formData.photo ? '#16a34a' : '#6b7280', fontWeight: formData.photo ? 600 : 400 }}>
                        {formData.photo ? '✓ फोटो अपलोड हो गई' : 'फोटो अपलोड करें (जेपीजी/पीएनजी, अधिकतम 2 एमबी)'}
                      </span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} required style={{ display: 'none' }} />
                    </label>
                    {formData.photo && (
                      <div style={{ marginTop: '12px', textAlign: 'center' }}>
                        <img src={formData.photo} alt="Preview" style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #e5e7eb' }} />
                      </div>
                    )}
                  </div>

                  {/* Declaration */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" required style={{ marginTop: '3px', accentColor: org.color, width: '16px', height: '16px', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
                        मैं घोषणा करता/करती हूँ कि उपरोक्त सभी जानकारी सत्य है। मैं <strong>{org.full}</strong> एवं <strong>साधू लक्ष्मी जनकल्याण ट्रस्ट</strong> के नियमों व शर्तों से सहमत हूँ।
                      </span>
                    </label>
                  </div>
                </div>

                {error[activeTab] && (
                  <div style={{ marginTop: '16px', padding: '12px 16px', background: '#fee', borderRadius: '10px', color: '#dc2626', fontFamily: 'Hind,sans-serif', fontSize: '14px', border: '1px solid #fecaca' }}>
                    {error[activeTab]}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={submitting}
                  style={{ width: '100%', marginTop: '28px', padding: '15px', borderRadius: '14px', border: 'none', background: submitting ? '#ccc' : `linear-gradient(135deg, ${org.color}, ${org.color}cc)`, color: '#fff', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', cursor: submitting ? 'not-allowed' : 'pointer', boxShadow: submitting ? 'none' : `0 6px 20px ${org.color}40`, transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 28px ${org.color}55` } }}
                  onMouseLeave={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 20px ${org.color}40` } }}
                >
                  <CheckCircle2 size={17} />
                  {submitting ? 'पंजीकरण हो रहा है...' : `${org.full} में पंजीकरण करें`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .reg-form-grid { grid-template-columns: 1fr !important; } .reg-form-grid > div { grid-column: span 1 !important; } }
      `}</style>
    </div>
  )
}

export default RegistrationPage
