import { Shield, Eye, Lock, HardDrive, Info } from 'lucide-react'

const PrivacyPage = () => {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg,#2a0501 0%,#5a1002 100%)', height: '220px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, mixBlendMode: 'luminosity' }}>
          <img src="/images/hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#2a0501 10%,transparent 50%,#2a0501 90%)' }} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#fff', margin: '0 0 10px' }}>
            गोपनीयता नीति
          </h1>
          <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '14.5px', color: '#ffd54f', fontWeight: 600 }}>
            सहायता फाउंडेशन — आपकी गोपनीयता और सुरक्षा हमारी प्राथमिकता
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '28px', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 36" fill="#f8f9fa" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,36 L1440,36 L1440,10 L1400,18 L1360,5 L1320,22 L1280,10 L1240,26 L1200,8 L1160,20 L1120,4 L1080,22 L1040,12 L1000,26 L960,6 L920,18 L880,10 L840,24 L800,8 L760,20 L720,8 L680,22 L640,10 L600,26 L560,6 L520,20 L480,8 L440,22 L400,8 L360,22 L320,10 L280,26 L240,6 L200,18 L160,8 L120,22 L80,8 L40,20 L0,10 Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px 36px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(130, 25, 5,0.07)', border: '1px solid rgba(130, 25, 5,0.14)', borderRadius: '999px', padding: '4px 14px', alignSelf: 'flex-start' }}>
            <Shield size={12} style={{ color: '#821905' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind,sans-serif' }}>गोपनीयता आश्वासन</span>
          </div>

          <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '15px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
            सहायता फाउंडेशन में, हम अपने दानदाताओं, स्वयंसेवकों, और आगंतुकों की व्यक्तिगत जानकारी की सुरक्षा के लिए पूरी तरह से प्रतिबद्ध हैं। यह गोपनीयता नीति स्पष्ट करती है कि जब आप हमारी वेबसाइट का उपयोग करते हैं, तो हम आपकी जानकारी का संग्रह, सुरक्षा और उपयोग किस प्रकार करते हैं।
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />

          {/* Section 1 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(130, 25, 5,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#821905', justifyContent: 'center' }}>
              <Eye size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                1. जानकारी का संग्रह (Information We Collect)
              </h3>
              <div style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                जब आप हमारी वेबसाइट पर दान करते हैं या किसी कार्यक्रम के लिए पंजीकरण करते हैं, तो हम निम्नलिखित जानकारी एकत्र कर सकते हैं:
                <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>आपका नाम, ईमेल आईडी और संपर्क नंबर</li>
                  <li>दान और 80G रसीदों के लिए पैन (PAN) नंबर</li>
                  <li>भुगतान के रिकॉर्ड (कोई भी संवेदनशील कार्ड पिन या नेट बैंकिंग क्रेडेंशियल हमारे सर्वर पर संग्रहीत नहीं किए जाते हैं)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(253, 237, 149,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#FDED95', justifyContent: 'center' }}>
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                2. डेटा सुरक्षा और गोपनीयता (Data Security & Sharing)
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                हम आपकी जानकारी को किसी भी बाहरी व्यावसायिक या मार्केटिंग एजेंसी के साथ न तो बेचते हैं, न ही साझा करते हैं। आपकी व्यक्तिगत जानकारी पूर्ण रूप से सुरक्षित सर्वर पर कूटबद्ध (encrypted) रखी जाती है और इसका उपयोग केवल दान रसीदें और अपडेट भेजने के लिए किया जाता है।
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(130, 25, 5,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#821905', justifyContent: 'center' }}>
              <HardDrive size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                3. कुकीज़ नीति (Cookies Policy)
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                हमारी वेबसाइट बेहतर उपयोगकर्ता अनुभव प्रदान करने के लिए कुकीज़ का उपयोग करती है। यह हमें यह समझने में मदद करती है कि कौन से पृष्ठ आगंतुकों को सबसे अधिक पसंद आ रहे हैं। आप अपने ब्राउज़र सेटिंग्स में जाकर कभी भी कुकीज़ को बंद कर सकते हैं।
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(253, 237, 149,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#FDED95', justifyContent: 'center' }}>
              <Info size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                4. हमसे संपर्क करें (Contact Us)
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                यदि आपके पास इस गोपनीयता नीति या अपने व्यक्तिगत डेटा के संबंध में कोई प्रश्न हैं, तो आप हमें <strong style={{ color: '#821905' }}>Shakti.singh20017@gmail.com</strong> पर ईमेल कर सकते हैं।
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
