import { useState } from 'react'
import { Check, Heart, Play, Landmark, Coins } from 'lucide-react'

const tabData = {
  mission: {
    bullets: [
      'कंपनियों को CSR विकसित करने में मदद करते हैं',
      '3,265+ सामाजिक परियोजनाओं को सफल बनाया है',
      'समर्पित तकनीकी और सामाजिक सेवा दल',
    ],
    progress: { treatment: 75, raised: 90 }
  },
  vision: {
    bullets: [
      'दीर्घकालिक शैक्षिक सहायता और साक्षरता कार्यक्रम',
      'ग्रामीण महिलाओं को आत्मनिर्भर उद्यमी बनाना',
      'आपातकालीन मोबाइल चिकित्सा देखभाल क्लीनिक',
    ],
    progress: { treatment: 85, raised: 95 }
  },
  excellence: {
    bullets: [
      '100% ऑडिट पारदर्शिता — सभी कोष आवंटन में',
      'राष्ट्रीय और अंतर्राष्ट्रीय स्तर पर पुरस्कृत',
      'स्वयंसेवकों का सक्रिय ऑन-ग्राउंड नेटवर्क',
    ],
    progress: { treatment: 92, raised: 88 }
  }
}

const ImpactSection = () => {
  const [activeTab, setActiveTab] = useState('mission')
  const currentTab = tabData[activeTab]

  return (
    <section
      id="impact-section"
      style={{ background: '#ffffff', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        /* ── New Animations ── */
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes pulseGlow {
          0%   { box-shadow: 0 0 0 0 rgba(253, 237, 149, 0.6); }
          70%  { box-shadow: 0 0 0 16px rgba(253, 237, 149, 0); }
          100% { box-shadow: 0 0 0 0 rgba(253, 237, 149, 0); }
        }
        .impact-animate-float { animation: floatUpDown 6s ease-in-out infinite; }

        /* ── Tab buttons ── */
        .tab-btn {
          font-family: 'Poppins', 'Hind', sans-serif;
          font-weight: 700; font-size: 13.5px;
          border: 1px solid transparent; background: transparent;
          cursor: pointer; padding: 10px 22px;
          border-radius: 999px;
          transition: all 0.3s ease;
          color: #6b7280; white-space: nowrap;
        }
        .tab-btn:hover { color: #111827; background: rgba(0,0,0,0.03); }
        .tab-btn.active { 
          background: linear-gradient(135deg, #821905 0%, #5a1002 100%); 
          color: #fff; 
          box-shadow: 0 8px 20px rgba(130,25,5,0.3); 
        }

        .progress-circle-svg { transform: rotate(-90deg); }

        /* ── Desktop 3-col layout ── */
        .impact-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr 0.55fr;
          gap: 40px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Collage desktop ── */
        .impact-collage {
          position: relative;
          width: 290px;
          height: 420px;
          flex-shrink: 0;
        }

        /* ── Stats card desktop ── */
        .impact-stats-card {
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
          border-radius: 28px;
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          padding: 34px 24px;
          display: flex;
          flex-direction: column;
          width: 200px;
          justify-self: end;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .impact-stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.09);
        }

        /* ── Tablet ── */
        @media (max-width: 1100px) {
          .impact-main-grid {
            grid-template-columns: 1fr 1.2fr !important;
            gap: 28px !important;
          }
          .impact-stats-card {
            grid-column: span 2 !important;
            width: 100% !important; max-width: 440px !important;
            flex-direction: row !important;
            padding: 20px !important;
            justify-self: center !important;
          }
          .stats-divider {
            width: 1.5px !important; height: 50px !important; margin: 0 !important;
            align-self: center !important;
          }
        }

        /* ── Mobile: single column ── */
        @media (max-width: 768px) {
          .impact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          /* Hide the desktop absolute collage on mobile */
          .impact-collage { display: none !important; }
          /* Show the mobile image strip instead */
          .impact-mobile-images { display: flex !important; }
          /* Stats card full-width horizontal */
          .impact-stats-card {
            grid-column: span 1 !important;
            width: 100% !important; max-width: 100% !important;
            flex-direction: row !important;
            padding: 18px 16px !important;
            border-radius: 18px !important;
            margin-top: 20px !important;
          }
          .stats-divider {
            width: 1.5px !important; height: 40px !important;
            margin: 0 12px !important; align-self: center !important;
          }
          .impact-tabs-row { flex-wrap: wrap !important; gap: 6px !important; }
          .tab-btn { font-size: 12px !important; padding: 7px 12px !important; }
        }
      `}} />

      {/* Faint heart decoration */}
      <div className="impact-animate-float" style={{ position: 'absolute', right: '4%', top: '8%', pointerEvents: 'none', zIndex: 1, opacity: 0.1, color: '#821905' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
        </svg>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 5 }}>

        {/* ════ MOBILE: 2-image horizontal strip (shown only on mobile via CSS) ════ */}
        <div
          className="impact-mobile-images"
          style={{ display: 'none', gap: '12px', marginBottom: '32px' }}
        >
          <div style={{ flex: '1 1 0', borderRadius: '20px', overflow: 'hidden', height: '210px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', position: 'relative' }}>
            <img src="/images/hero.png" alt="impact background" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) brightness(85%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(130,25,5,0.15)' }} />
            {/* Mini play button */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '44px', height: '44px', borderRadius: '50%', background: '#FDED95', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(253,237,149,0.5)' }}>
              <Play size={16} fill="#111827" stroke="none" style={{ marginLeft: '2px' }} />
            </div>
          </div>
          <div style={{ flex: '0 0 38%', borderRadius: '20px', overflow: 'hidden', height: '210px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <img src="/images/volunteer_child.png" alt="smiling child" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div className="impact-main-grid">

          {/* ════ COL 1: Desktop Collage ════ */}
          <div className="impact-collage">
            {/* Dot accent */}
            <div style={{ position: 'absolute', top: '-16px', left: '-16px', zIndex: 0 }}>
              <svg width="80" height="80" fill="#FDED95">
                <pattern id="idots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="2.5" />
                </pattern>
                <rect width="80" height="80" fill="url(#idots)" />
              </svg>
            </div>

            {/* Main image */}
            <div style={{ width: '290px', height: '390px', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 15px 35px rgba(0,0,0,0.12)', zIndex: 1 }}>
              <img src="/images/hero.png" alt="support child" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) brightness(85%) contrast(105%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(130,25,5,0.18)' }} />
              <a
                href="https://www.youtube.com"
                target="_blank" rel="noopener noreferrer"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '58px', height: '58px', borderRadius: '50%', background: '#FDED95', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(253,237,149,0.45)', textDecoration: 'none', transition: 'transform 0.25s', zIndex: 10, animation: 'pulseGlow 2s infinite' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)' }}
              >
                <Play size={20} fill="#111827" stroke="none" style={{ marginLeft: '4px' }} />
              </a>
            </div>

            {/* Overlay small image */}
            <div style={{ position: 'absolute', bottom: '-28px', right: '-10px', width: '175px', height: '175px', borderRadius: '22px', border: '5px solid #fff', overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,0.14)', zIndex: 5 }}>
              <img src="/images/volunteer_child.png" alt="smiling child" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* ════ COL 2: Tabs + Content ════ */}
          <div>
            {/* Script badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', background: 'rgba(253,237,149,0.2)', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(253,237,149,0.5)' }}>
              <Heart size={14} style={{ color: '#821905', fill: '#821905' }} />
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: '12px', color: '#821905', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ज़रूरतमंदों को दान देना शुरू करें
              </span>
            </div>

            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#111827', lineHeight: 1.25, margin: '0 0 16px' }}>
              दान से समाज में <span style={{ color: '#111827', background: 'linear-gradient(135deg, #FDED95, #f5d76e)', padding: '3px 12px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(253,237,149,0.4)', display: 'inline-block' }}>बड़ा बदलाव</span> लाएं
            </h2>

            <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#4b5563', lineHeight: 1.7, margin: '0 0 26px' }}>
              दान जरूरतमंदों की मदद करने का एक स्वैच्छिक कार्य है। धर्मार्थ संगठनों का उद्देश्य गरीबी, शिक्षा और स्वास्थ्य जैसे मुद्दों को संबोधित करना है।
            </p>

            {/* Tabs */}
            <div
              className="impact-tabs-row"
              style={{ display: 'flex', gap: '8px', borderBottom: '1.5px solid #f3f4f6', paddingBottom: '10px', marginBottom: '20px', overflowX: 'auto', scrollbarWidth: 'none' }}
            >
              {['mission', 'vision', 'excellence'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab === 'mission' ? 'हमारा मिशन' : tab === 'vision' ? 'हमारा दृष्टिकोण' : 'उत्कृष्टता'}
                </button>
              ))}
            </div>

            {/* Bullets */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
              {currentTab.bullets.map((bullet, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontFamily: 'Hind, sans-serif', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px', lineHeight: 1.5 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #821905 0%, #e05a3a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', boxShadow: '0 2px 8px rgba(130,25,5,0.25)' }}>
                    <Check size={11} style={{ color: '#fff', strokeWidth: 3 }} />
                  </div>
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Progress circles */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { pct: currentTab.progress.treatment, title: 'चिकित्सा',   sub: 'सहायता'     },
                { pct: currentTab.progress.raised,    title: 'अधिकतम',    sub: 'कोष जुटाया' },
              ].map(({ pct, title, sub }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <ProgressCircle percent={pct} />
                  <div>
                    <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '14.5px', color: '#111827', margin: '0 0 2px' }}>{title}</h4>
                    <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12.5px', color: '#6b7280', margin: 0, fontWeight: 500 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════ COL 3: Stats Card ════ */}
          <div className="impact-stats-card">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(253,237,149,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Coins size={18} style={{ color: '#b45309' }} />
              </div>
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: '0 0 4px' }}>अभी दान करें</h4>
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: '15px', color: '#821905' }}>₹40,956</span>
            </div>

            <div className="stats-divider" style={{ height: '1.5px', background: '#efefef', margin: '18px 0', width: '100%' }} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(130,25,5,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Landmark size={18} style={{ color: '#821905' }} />
              </div>
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: '0 0 4px' }}>कुल एकत्रित</h4>
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: '15px', color: '#821905' }}>₹15,40,456</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Circular progress ── */
const ProgressCircle = ({ percent }) => {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div style={{ position: 'relative', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="26" cy="26" r={radius} fill="transparent" stroke="#f3f4f6" strokeWidth="4" />
        <circle cx="26" cy="26" r={radius} fill="transparent" stroke="#821905" strokeWidth="4.5"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <span style={{ position: 'absolute', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '10.5px', color: '#111827' }}>
        {percent}%
      </span>
    </div>
  )
}

export default ImpactSection
