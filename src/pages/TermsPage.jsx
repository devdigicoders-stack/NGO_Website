import { ShieldAlert, BookOpen, AlertCircle, Scale, FileText } from 'lucide-react'

const TermsPage = () => {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg,#05160e 0%,#0c351e 100%)', height: '220px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, mixBlendMode: 'luminosity' }}>
          <img src="/images/hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#05160e 10%,transparent 50%,#05160e 90%)' }} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#fff', margin: '0 0 10px' }}>
            नियम और शर्तें
          </h1>
          <p style={{ fontFamily: 'Hind,sans-serif', fontSize: '14.5px', color: '#ffd54f', fontWeight: 600 }}>
            सहायता फाउंडेशन — उपयोग की शर्तें और दिशानिर्देश
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26,92,56,0.07)', border: '1px solid rgba(26,92,56,0.14)', borderRadius: '999px', padding: '4px 14px', alignSelf: 'flex-start' }}>
            <FileText size={12} style={{ color: '#1a5c38' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a5c38', fontFamily: 'Hind,sans-serif' }}>अंतिम अपडेट: मई 2026</span>
          </div>

          <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '15px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
            सहायता फाउंडेशन ("संस्था", "हम", या "हमारे") की वेबसाइट पर आपका स्वागत है। इस वेबसाइट का उपयोग करके आप निम्नलिखित नियमों और शर्तों को पूरी तरह से स्वीकार करते हैं। कृपया इन्हें ध्यान से पढ़ें। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />

          {/* Section 1 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245,180,0,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#f5b400', justifyContent: 'center' }}>
              <BookOpen size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                1. सेवाओं का उपयोग (Usage of Services)
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                यह वेबसाइट और इसकी सामग्री केवल सामाजिक कल्याण, जन जागरूकता, और गैर-लाभकारी दान गतिविधियों को बढ़ावा देने के लिए है। किसी भी गैर-कानूनी गतिविधि या दुरुपयोग के लिए इस वेबसाइट का उपयोग सख्त वर्जित है।
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(26,92,56,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#1a5c38', justifyContent: 'center' }}>
              <Scale size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                2. दान के नियम (Donation Terms & Conditions)
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                सभी दान पूरी तरह से स्वैच्छिक हैं। एक बार दान की गई राशि किसी भी परिस्थिति में रिफंड (वापस) नहीं की जाएगी। आपके द्वारा किया गया प्रत्येक दान सीधे गरीबों और वंचित बच्चों की शिक्षा, स्वास्थ्य और पोषण सुरक्षा में लगाया जाता है।
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245,180,0,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#f5b400', justifyContent: 'center' }}>
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                3. कर छूट (Tax Exemption Under 80G)
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                सहायता फाउंडेशन के तहत किए गए सभी पात्र दान आयकर अधिनियम की धारा 80G के तहत कर छूट के पात्र हैं। भुगतान पूरा होने के उपरांत कर-मुक्ति रसीद आपके द्वारा पंजीकृत ईमेल पते पर भेजी जाएगी। पैन (PAN) विवरण की सत्यता के लिए आप स्वयं जिम्मेदार होंगे।
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(26,92,56,0.08)', display: 'flex', alignItems: 'center', flexShrink: 0, color: '#1a5c38', justifyContent: 'center' }}>
              <AlertCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px' }}>
                4. बौद्धिक संपदा और कॉपीराइट (Intellectual Property)
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                इस वेबसाइट पर प्रदर्शित सभी लोगो, चित्र, टेक्स्ट, वीडियो, और डिज़ाइन सहायता फाउंडेशन की बौद्धिक संपदा हैं। हमारी पूर्व लिखित अनुमति के बिना इनका किसी भी व्यावसायिक उद्देश्य के लिए पुनरुत्पादन या प्रतिलिपि बनाना पूर्णतः प्रतिबंधित है।
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TermsPage
