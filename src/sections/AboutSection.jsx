import { Soup, Stethoscope, GraduationCap, CheckCircle2, ArrowUpRight, Phone, Play } from 'lucide-react'

const programs = [
  { Icon: Soup,          title: 'पौष्टिक भोजन', desc: 'वंचित बच्चों और गरीब परिवारों के लिए दैनिक स्तर पर शुद्ध व पौष्टिक भोजन।', color: '#821905',  bg: 'rgba(130,25,5,0.08)'    },
  { Icon: Stethoscope,   title: 'स्वास्थ्य सेवा', desc: 'चिकित्सा सहायता, शिविर और आपातकालीन सेवाएं — लाखों जीवन सुरक्षित।',     color: '#e05a3a',  bg: 'rgba(224,90,58,0.08)'   },
  { Icon: GraduationCap, title: 'बाल शिक्षा',     desc: 'स्कूल छोड़ने वाले बच्चों को पुनः गुणवत्तापूर्ण शिक्षा से जोड़ना।',         color: '#b45309',  bg: 'rgba(180,83,9,0.08)'    },
]

const bullets = [
  '3,250+ सफल सामाजिक परियोजनाओं का संचालन।',
  'देश के हर वंचित बच्चे को शिक्षा का उपहार।',
  'CSR सहयोगियों के साथ मिलकर स्थायी बदलाव।',
]

const AboutSection = () => {
  return (
    <section id="about" style={{ background: '#fff', padding: '72px 0 80px', overflow: 'hidden' }}>

      <style dangerouslySetInnerHTML={{__html: `
        /* ── Program cards grid ── */
        .about-programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 72px;
        }
        @media (max-width: 900px) {
          .about-programs-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
        }
        @media (max-width: 640px) {
          .about-programs-grid { grid-template-columns: 1fr; gap: 12px; margin-bottom: 48px; }
        }

        /* ── Main grid: image left, text right ── */
        .about-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-main-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        /* ── Collage: desktop ── */
        .about-collage {
          position: relative;
          width: 100%;
          max-width: 460px;
          height: 420px;
          margin: 0 auto;
        }
        /* ── Collage: mobile — flat 2-image stack ── */
        @media (max-width: 900px) {
          .about-collage {
            height: auto;
            max-width: 100%;
            display: flex;
            gap: 12px;
            margin-bottom: 40px;
          }
          /* Hide all absolutely-positioned decorative items on mobile */
          .about-collage .collage-absolute {
            display: none !important;
          }
          /* Mobile: large center image */
          .about-img-main {
            position: static !important;
            width: 100% !important;
            flex: 1 1 0;
            height: 220px !important;
            border-radius: 20px !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
            border: none !important;
          }
          .about-img-small1 {
            position: static !important;
            width: 100% !important;
            flex: 0 0 36%;
            height: 220px !important;
            border-radius: 20px !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
            border: none !important;
          }
          /* Remove the play overlay for cleanliness */
          .about-play-btn { display: none !important; }
          .about-img-small2 { display: none !important; }
          .about-label-pill { display: none !important; }
        }

        /* ── Feature blocks ── */
        .about-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 24px;
        }
        @media (max-width: 480px) {
          .about-features-grid { grid-template-columns: 1fr; gap: 10px; }
        }

        /* ── Bottom CTA row ── */
        .about-cta-row {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        /* ── Program card mobile: horizontal ── */
        @media (max-width: 640px) {
          .about-prog-card {
            flex-direction: row !important;
            align-items: center !important;
            padding: 16px !important;
            gap: 14px !important;
          }
          .about-prog-icon { margin-bottom: 0 !important; }
          .about-prog-divider { display: none !important; }
        }

        /* ── New Animations & Hover effects ── */
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes pulseGlow {
          0%   { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5); }
          70%  { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .animate-float { animation: floatUpDown 6s ease-in-out infinite; }
        .feature-card { transition: all 0.3s ease; cursor: default; }
        .feature-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 16px 32px rgba(0,0,0,0.06); 
          border-color: rgba(130,25,5,0.2) !important; 
          background: #fff !important; 
        }
      `}} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* ══════════ HEADER ══════════ */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(130,25,5,0.07)', border: '1.5px solid rgba(130,25,5,0.14)',
            borderRadius: '999px', padding: '6px 18px', marginBottom: '16px',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#821905' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif' }}>
              सहायता फाउंडेशन कार्यक्रम
            </span>
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 34px)', color: '#111827', lineHeight: 1.25, margin: '0 0 12px' }}>
            अनोखी समाज सेवा
          </h2>
          <div style={{ width: '44px', height: '3.5px', background: 'linear-gradient(to right,#821905,#FDED95)', borderRadius: '2px', margin: '0 auto 14px' }} />
          <p style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'Hind, sans-serif', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            हमारे मासिक दान कार्यक्रम से जुड़ें और हमारी पहलों को निरंतर सहयोग प्रदान करें।
          </p>
        </div>

        {/* ══════════ PROGRAM CARDS ══════════ */}
        <div className="about-programs-grid">
          {programs.map(({ Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="about-prog-card"
              style={{
                background: '#fff', border: '1.5px solid #f0f0f0', borderRadius: '20px',
                padding: '28px 22px', display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start', transition: 'all 0.3s ease', cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = color }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#f0f0f0' }}
            >
              <div className="about-prog-icon" style={{ width: '52px', height: '52px', borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', flexShrink: 0 }}>
                <Icon size={24} style={{ color }} />
              </div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', color: '#111827', marginBottom: '8px' }}>{title}</h3>
              <div className="about-prog-divider" style={{ width: '28px', height: '2px', background: color, borderRadius: '2px', marginBottom: '10px' }} />
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* ══════════ IMAGE + TEXT GRID ══════════ */}
        <div className="about-main-grid">

          {/* LEFT: Collage */}
          <div className="about-collage">

            {/* DESKTOP absolute elements */}
            {/* Wavy SVG decoration */}
            <div className="collage-absolute animate-float" style={{ position: 'absolute', top: '16px', left: '170px', zIndex: 0, opacity: 0.8, animationDelay: '0s' }}>
              <svg width="110" height="22" viewBox="0 0 110 22" fill="none" stroke="#821905" strokeWidth="2.5">
                <path d="M0,11 Q14,0 27,11 T54,11 T81,11 T110,11" strokeLinecap="round" />
              </svg>
            </div>
            {/* Dot grid accent */}
            <div className="collage-absolute animate-float" style={{ position: 'absolute', left: '-14px', bottom: '20px', zIndex: 0, animationDelay: '2s' }}>
              <svg width="52" height="90" fill="#FDED95" opacity="0.9">
                <pattern id="adots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2.5" cy="2.5" r="2" />
                </pattern>
                <rect width="52" height="90" fill="url(#adots)" />
              </svg>
            </div>

            {/* Vertical pill label */}
            <div className="collage-absolute about-label-pill" style={{
              position: 'absolute', left: '2px', bottom: '40px',
              width: '42px', height: '220px', background: '#821905',
              borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 22px rgba(130,25,5,0.3)', zIndex: 10,
            }}>
              <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                गरीबों की मदद करें
              </span>
            </div>

            {/* Main large image */}
            <div
              className="about-img-main"
              style={{ position: 'absolute', left: '58px', top: '36px', width: '300px', height: '300px', borderRadius: '22px', overflow: 'hidden', boxShadow: '0 14px 32px rgba(0,0,0,0.12)', zIndex: 2 }}
            >
              <img src="/images/about_child2.png" alt="बच्चों की शिक्षा" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(88%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(130,25,5,0.16)' }} />
              {/* Play button */}
              <div className="about-play-btn" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(130,25,5,0.5)', backdropFilter: 'blur(4px)', zIndex: 5, animation: 'pulseGlow 2s infinite', cursor: 'pointer', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)'}>
                <Play size={20} fill="#fff" stroke="none" style={{ marginLeft: '4px' }} />
              </div>
            </div>

            {/* Small top-left image */}
            <div
              className="about-img-small1"
              style={{ position: 'absolute', left: '14px', top: '0px', width: '112px', height: '112px', borderRadius: '14px', border: '4px solid #fff', overflow: 'hidden', boxShadow: '0 8px 22px rgba(0,0,0,0.14)', zIndex: 5 }}
            >
              <img src="/images/about_child1.png" alt="बच्चों का भोजन" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Small bottom-right image */}
            <div
              className="about-img-small2"
              style={{ position: 'absolute', right: '30px', bottom: '0px', width: '132px', height: '132px', borderRadius: '18px', border: '5px solid #fff', overflow: 'hidden', boxShadow: '0 10px 26px rgba(0,0,0,0.14)', zIndex: 5 }}
            >
              <img src="/images/volunteer_child.png" alt="स्वयंसेवक बच्चे" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

          </div>

          {/* RIGHT: Text content */}
          <div>

            {/* Script badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', background: 'rgba(253,237,149,0.2)', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(253,237,149,0.5)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" stroke="#821905" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 14C8.5 14.5 9.5 15 12 15C14.5 15 15.5 14.5 17 14" stroke="#821905" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: '12px', color: '#821905', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                गरीब लोगों को दान देना शुरू करें
              </span>
            </div>

            {/* Heading */}
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#111827', lineHeight: 1.25, margin: '0 0 16px' }}>
              एक-दूसरे की मदद से ही <span style={{ color: '#821905' }}>संसार बेहतर बनेगा</span>
            </h2>

            {/* Para */}
            <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', color: '#6b7280', lineHeight: 1.75, margin: '0 0 24px' }}>
              स्वयंसेवा हमें नए कौशल विकसित करने और बहुमूल्य अनुभव प्राप्त करने का अनूठा अवसर देती है। आप हमारे साथ जुड़कर समाज सेवा और टीम वर्क की क्षमताओं का विकास कर सकते हैं।
            </p>

            {/* Feature blocks */}
            <div className="about-features-grid">
              {[
                { icon: '🛡️', bg: 'rgba(253,237,149,0.15)', title: 'मदद की शुरुआत करें', desc: 'संस्था के लक्ष्यों के प्रति समाज में जागरूकता फैलाएं।' },
                { icon: '❤️', bg: 'rgba(130,25,5,0.08)',    title: 'दान का योगदान दें',  desc: 'आर्थिक दान देकर जरूरतमंदों को सशक्त बनाएं।' },
              ].map(({ icon, bg, title, desc }) => (
                <div key={title} className="feature-card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#fafafa', border: '1.5px solid #e5e7eb', borderRadius: '16px', padding: '18px 16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px' }}>
                    {icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14px', color: '#111827', margin: '0 0 4px' }}>{title}</h4>
                    <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {bullets.map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #821905 0%, #e05a3a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', boxShadow: '0 2px 6px rgba(130,25,5,0.2)' }}>
                    <CheckCircle2 size={12} style={{ color: '#fff', strokeWidth: 3 }} />
                  </div>
                  <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', fontWeight: 500, color: '#374151', lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="about-cta-row">
              <a
                href="#about"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #821905 0%, #5a1002 100%)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'Hind, sans-serif', textDecoration: 'none', boxShadow: '0 8px 24px rgba(130,25,5,0.3)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(130,25,5,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 24px rgba(130,25,5,0.3)' }}
              >
                हमारे बारे में जानें <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>

              <a href="tel:9569036324" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <Phone size={16} style={{ color: '#821905' }} />
                </div>
                <div>
                  <p style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>फ़ोन नंबर</p>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>9569036324</p>
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutSection
