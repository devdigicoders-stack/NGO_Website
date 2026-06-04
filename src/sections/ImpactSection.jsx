import { useState } from 'react'
import { Check, Heart, Play, Landmark, Coins } from 'lucide-react'

const tabData = {
  mission: {
    bullets: [
      'हम कंपनियों को एक मजबूत सामाजिक उत्तरदायित्व (CSR) विकसित करने में मदद करते हैं',
      '3,265 से अधिक सामाजिक व लोक कल्याणकारी परियोजनाओं को सफल बनाया है',
      'समर्पित तकनीकी और सामाजिक सेवा दल',
    ],
    progress: {
      treatment: 75,
      raised: 90,
    }
  },
  vision: {
    bullets: [
      'दीर्घकालिक शैक्षिक सहायता और साक्षरता कार्यक्रम चलाना',
      'ग्रामीण महिलाओं को आत्मनिर्भर उद्यमी बनाना',
      'आपातकालीन मोबाइल चिकित्सा देखभाल क्लीनिक स्थापित करना',
    ],
    progress: {
      treatment: 85,
      raised: 95,
    }
  },
  excellence: {
    bullets: [
      'सभी कोष आवंटन में 100% ऑडिट पारदर्शिता',
      'राष्ट्रीय और अंतर्राष्ट्रीय स्तर पर पुरस्कृत सामाजिक परियोजनाएं',
      'स्वयंसेवकों और सहयोगियों का सक्रिय ऑन-ग्राउंड नेटवर्क',
    ],
    progress: {
      treatment: 92,
      raised: 88,
    }
  }
}

const ImpactSection = () => {
  const [activeTab, setActiveTab] = useState('mission')
  const currentTab = tabData[activeTab]

  return (
    <section 
      id="impact-section" 
      style={{ 
        background: '#ffffff',
        padding: '100px 0 110px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      
      {/* ─── Self-Contained Styles ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        .impact-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr 0.6fr;
          gap: 40px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .tab-btn {
          font-family: 'Poppins', 'Hind', sans-serif;
          font-weight: 700;
          font-size: 13.5px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 8px 18px;
          border-radius: 999px;
          transition: all 0.3s ease;
          color: #4b5563;
        }
        .tab-btn.active {
          background: #821905;
          color: #ffffff;
        }
        .progress-circle-svg {
          transform: rotate(-90deg);
        }
        @media (max-width: 1100px) {
          .impact-main-grid {
            grid-template-columns: 1fr 1.2fr !important;
            gap: 30px !important;
          }
          .floating-stats-card-panel {
            grid-column: span 2 !important;
            justify-self: center !important;
            width: 100% !important;
            max-width: 500px !important;
            display: flex !important;
            flex-direction: row !important;
            gap: 20px !important;
            padding: 20px !important;
          }
          .stats-card-divider {
            width: 2px !important;
            height: 50px !important;
            margin: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .impact-main-grid {
            grid-template-columns: 1fr !important;
          }
          .floating-stats-card-panel {
            grid-column: span 1 !important;
            flex-direction: column !important;
            gap: 0px !important;
          }
          .stats-card-divider {
            width: 100% !important;
            height: 1px !important;
            margin: 16px 0 !important;
          }
          .collage-container {
            margin-bottom: 40px !important;
          }
        }
        @media (max-width: 480px) {
          .collage-container {
            transform: scale(0.85);
            transform-origin: center top;
            margin: 0 auto 20px !important;
            height: 340px !important;
            width: 290px !important;
          }
        }
      `}} />

      {/* ─── Faint Decorative Heart Outline (Top-Right Background) ─── */}
      <div 
        style={{
          position: 'absolute',
          right: '4%',
          top: '8%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.15,
          color: '#821905',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
        </svg>
      </div>


      {/* ─── MAIN CONTENT WRAPPER ─── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        <div className="impact-main-grid">
          
          {/* ─── COLUMN 1: Overlapping Photo Collage ─── */}
          <div className="collage-container" style={{ position: 'relative', display: 'flex', flexShrink: 0 }}>
            
            {/* Top-Left Dotted Accent Grid */}
            <div style={{ position: 'absolute', top: '-18px', left: '-18px', zIndex: 0 }}>
              <svg width="84" height="84" fill="#FDED95">
                <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="2.5" />
                </pattern>
                <rect width="84" height="84" fill="url(#dotPattern)" />
              </svg>
            </div>

            {/* Large Background Image Card */}
            <div 
              style={{
                width: '290px',
                height: '390px',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                zIndex: 1,
              }}
            >
              <img 
                src="/images/hero.png" 
                alt="support child backdrop" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(20%) brightness(85%) contrast(105%)',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(130, 25, 5,0.18)' }} />

              {/* Central Yellow Play Button */}
              <a 
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#FDED95',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(253, 237, 149,0.45)',
                  textDecoration: 'none',
                  transition: 'transform 0.25s, background-color 0.25s',
                  zIndex: 10,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)'; e.currentTarget.style.backgroundColor = '#ffd54f' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; e.currentTarget.style.backgroundColor = '#FDED95' }}
              >
                <Play size={20} fill="#ffffff" stroke="none" style={{ marginLeft: '3px' }} />
              </a>
            </div>

            {/* Small Foreground Overlapping Image Card (Bottom-Right) */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-28px',
                right: '0px',
                width: '190px',
                height: '190px',
                borderRadius: '24px',
                border: '6px solid #ffffff',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.14)',
                zIndex: 5,
              }}
            >
              <img 
                src="/images/volunteer_child.png" 
                alt="smiling boy impact" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

          </div>


          {/* ─── COLUMN 2: Mission tabs and progress meters ─── */}
          <div>
            
            {/* Green Script Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Heart size={14} style={{ color: '#821905', fill: '#821905' }} />
              <span 
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif", 
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '18px', 
                  color: '#821905',
                }}
              >
                ज़रूरतमंदों को दान देना शुरू करें
              </span>
            </div>

            {/* Title Header */}
            <h2 
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(26px, 3.2vw, 36px)',
                color: '#111827',
                lineHeight: 1.25,
                margin: '0 0 18px',
              }}
            >
              दान से समाज में <span style={{ color: '#FDED95' }}>बड़ा बदलाव</span> लाएं
            </h2>

            {/* Quote paragraph */}
            <p 
              style={{
                fontFamily: 'Hind, sans-serif',
                fontSize: '13.5px',
                color: '#6b7280',
                lineHeight: 1.75,
                margin: '0 0 24px',
              }}
            >
              दान जरूरतमंदों की मदद करने का एक स्वैच्छिक कार्य है, जो आमतौर पर धन, समय या संसाधनों के रूप में होता है। धर्मार्थ संगठनों का उद्देश्य गरीबी जैसे मुद्दों को संबोधित करके सामाजिक, पर्यावरणीय और आर्थिक चुनौतियों का समाधान करना है।
            </p>

            {/* Tabs Controller Row */}
            <div 
              style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '1.5px solid #f3f4f6',
                paddingBottom: '10px',
                marginBottom: '22px',
              }}
            >
              {['mission', 'vision', 'excellence'].map((tabKey) => (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setActiveTab(tabKey)}
                  className={`tab-btn ${activeTab === tabKey ? 'active' : ''}`}
                >
                  {tabKey === 'mission' ? 'हमारा मिशन' : tabKey === 'vision' ? 'हमारा दृष्टिकोण' : 'उत्कृष्टता'}
                </button>
              ))}
            </div>

            {/* Bullet Checkmarks list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', spaceY: '10px' }}>
              {currentTab.bullets.map((bullet, i) => (
                <li 
                  key={i} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'Hind, sans-serif',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#4b5563',
                    marginBottom: '8px',
                  }}
                >
                  <div 
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(253, 237, 149,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={11} style={{ color: '#FDED95', strokeWidth: 3 }} />
                  </div>
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Animated Circular Progress Meters */}
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              
              {/* Progress 1: Treatment Helping */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ProgressCircle percent={currentTab.progress.treatment} />
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: '0 0 2px' }}>
                    चिकित्सा
                  </h4>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0, fontWeight: 500 }}>
                    सहायता
                  </p>
                </div>
              </div>

              {/* Progress 2: Highest Fund Raised */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ProgressCircle percent={currentTab.progress.raised} />
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: '0 0 2px' }}>
                    अधिकतम
                  </h4>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0, fontWeight: 500 }}>
                    कोष जुटाया
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* ─── COLUMN 3: Floating Vertical Counters Card ─── */}
          <div 
            className="floating-stats-card-panel"
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1.5px solid #efefef',
              boxShadow: '0 12px 36px rgba(0,0,0,0.04)',
              padding: '30px 24px',
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              flexShrink: 0,
              justifySelf: 'end',
            }}
          >
            
            {/* Top Stat: Donate Now */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(253, 237, 149,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}
              >
                <Coins size={20} style={{ color: '#FDED95' }} />
              </div>

              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#111827', margin: '0 0 4px' }}>
                अभी दान करें
              </h4>
              
              <span 
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#FDED95',
                }}
              >
                ₹40,956
              </span>
            </div>

            {/* Separation Divider line */}
            <div 
              className="stats-card-divider"
              style={{
                height: '1.5px',
                background: '#efefef',
                margin: '20px 0',
                width: '100%',
              }}
            />

            {/* Bottom Stat: Total Fundraised */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(130, 25, 5,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}
              >
                <Landmark size={18} style={{ color: '#821905' }} />
              </div>

              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#111827', margin: '0 0 4px' }}>
                कुल एकत्रित कोष
              </h4>
              
              <span 
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#FDED95',
                }}
              >
                ₹15,40,456
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

// Subcomponent: Circular Progress Circle
const ProgressCircle = ({ percent }) => {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div style={{ position: 'relative', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="56" height="56" className="progress-circle-svg">
        {/* Background Circle */}
        <circle 
          cx="28" 
          cy="28" 
          r={radius} 
          fill="transparent" 
          stroke="#f3f4f6" 
          strokeWidth="4" 
        />
        {/* Active Animated Progress Circle */}
        <circle 
          cx="28" 
          cy="28" 
          r={radius} 
          fill="transparent" 
          stroke="#821905" 
          strokeWidth="4.5" 
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      {/* Centered Percentage Label */}
      <span 
        style={{
          position: 'absolute',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 750,
          fontSize: '11px',
          color: '#111827',
        }}
      >
        {percent}%
      </span>
    </div>
  )
}

export default ImpactSection
