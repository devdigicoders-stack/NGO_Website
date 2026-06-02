import { useState } from 'react'
import { Download, Search, AlertCircle, CheckCircle2 } from 'lucide-react'
import { getRegistration, getIDCardTemplate } from '../utils/registrationUtils'
import IDCardGenerator from '../components/IDCardGenerator'

const IDCardDownloadPage = () => {
  const [regNumber, setRegNumber] = useState('')
  const [registration, setRegistration] = useState(null)
  const [error, setError] = useState('')
  const [idCardData, setIdCardData] = useState(null)
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    if (!regNumber.trim()) return
    setError('')
    setRegistration(null)
    setIdCardData(null)
    setSearching(true)

    try {
      const data = await getRegistration(regNumber.trim())
      
      if (data) {
        setRegistration(data)
      } else {
        setError('रजिस्ट्रेशन नंबर नहीं मिला। कृपया सही नंबर डालें।')
      }
    } catch (err) {
      console.error(err)
      setError('सर्वर से जुड़ने में असमर्थ। कृपया पुनः प्रयास करें।')
    } finally {
      setSearching(false)
    }
  }

  const handleDownload = () => {
    if (idCardData) {
      const link = document.createElement('a')
      link.download = `ID_Card_${regNumber.replace(/\//g, '_')}.png`
      link.href = idCardData
      link.click()
    }
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '36px', color: '#1a5c38', margin: '0 0 10px' }}>
            आईडी कार्ड डाउनलोड
          </h1>
          <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '16px', color: '#666', margin: 0 }}>
            अपना रजिस्ट्रेशन नंबर डालें और ID Card डाउनलोड करें
          </p>
        </div>

        {/* Search Box */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '30px' }}>
          <label style={{ fontFamily: 'Hind,sans-serif', fontSize: '15px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '12px' }}>
            रजिस्ट्रेशन नंबर
          </label>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="जैसे: RPS/2025/123456"
              style={{
                flex: 1,
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1.5px solid #e5e7eb',
                fontFamily: 'Hind,sans-serif',
                fontSize: '15px',
                outline: 'none'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              style={{
                padding: '14px 28px',
                background: searching ? '#ccc' : '#1a5c38',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontFamily: 'Hind,sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                cursor: searching ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Search size={18} />
              {searching ? 'खोज रहे हैं...' : 'खोजें'}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: '16px', padding: '12px 16px', background: '#fee', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={18} style={{ color: '#dc2626' }} />
              <span style={{ fontFamily: 'Hind,sans-serif', fontSize: '14px', color: '#dc2626' }}>{error}</span>
            </div>
          )}
        </div>

        {/* ID Card Preview */}
        {registration && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <CheckCircle2 size={24} style={{ color: '#16a34a' }} />
              <h2 style={{ fontFamily: 'Hind,sans-serif', fontSize: '20px', fontWeight: 700, color: '#16a34a', margin: 0 }}>
                ID Card मिल गया!
              </h2>
            </div>

            {idCardData && (
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <img 
                  src={idCardData} 
                  alt="ID Card" 
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
                />
              </div>
            )}

            <button
              onClick={handleDownload}
              disabled={!idCardData}
              style={{
                width: '100%',
                padding: '16px',
                background: idCardData ? '#1a5c38' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontFamily: 'Hind,sans-serif',
                fontSize: '16px',
                fontWeight: 700,
                cursor: idCardData ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <Download size={20} />
              ID Card डाउनलोड करें
            </button>

            <IDCardGenerator
              orgId={registration.orgId}
              formData={registration.formData}
              regNumber={registration.regNumber}
              onGenerated={setIdCardData}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default IDCardDownloadPage
