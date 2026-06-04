import { Soup, Stethoscope, GraduationCap, Handshake, Heart, Phone, ArrowUpRight, CheckCircle2, Play } from 'lucide-react'

const programs = [
  {
    Icon: Soup,
    title: 'पौष्टिक भोजन',
    desc: 'वंचित बच्चों और गरीब परिवारों के लिए दैनिक स्तर पर शुद्ध, स्वच्छ और पौष्टिक भोजन की व्यवस्था करते हैं।',
    color: '#821905',
    light: 'rgba(130, 25, 5,0.08)',
  },
  {
    Icon: Stethoscope,
    title: 'स्वास्थ्य सेवा',
    desc: 'चिकित्सा सहायता, स्वास्थ्य शिविर और आपातकालीन सेवाएं प्रदान कर हम लाखों जीवन सुरक्षित करते हैं।',
    color: '#e05a3a',
    light: 'rgba(224,90,58,0.08)',
  },
  {
    Icon: GraduationCap,
    title: 'बाल शिक्षा',
    desc: 'स्कूल छोड़ने वाले वंचित बच्चों को पुनः मुख्यधारा से जोड़कर गुणवत्तापूर्ण शिक्षा और संसाधन देते हैं।',
    color: '#FDED95',
    light: 'rgba(253, 237, 149,0.08)',
  },
]

const bullets = [
  '3,250+ सफल सामाजिक परियोजनाओं का संचालन किया है।',
  'देश के हर गरीब और वंचित बच्चे को शिक्षा का उपहार देते हैं।',
  'कॉर्पोरेट सामाजिक दायित्वों (CSR) को सुदृढ़ करने में मदद करते हैं।',
]

const AboutSection = () => {
  return (
    <section id="about" style={{ background: '#fff', padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Part 1: Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(130, 25, 5,0.07)', border: '1px solid rgba(130, 25, 5,0.14)',
            borderRadius: '999px', padding: '5px 16px', marginBottom: '16px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#821905' }} />
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif',
            }}>
              सहायता फाउंडेशन कार्यक्रम
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)', color: '#111827',
            lineHeight: 1.25, margin: '0 0 14px',
          }}>
            अनोखी समाज सेवा
          </h2>

          <div style={{ width: '48px', height: '3px', background: '#FDED95', borderRadius: '2px', margin: '0 auto 16px' }} />

          <p style={{
            fontSize: '15px', color: '#6b7280', fontFamily: 'Hind, sans-serif',
            lineHeight: 1.7, maxWidth: '560px', margin: '0 auto',
          }}>
            हमारे मासिक दान कार्यक्रम से जुड़ें और हमारी पहलों को निरंतर सहयोग प्रदान करें।
            आपका एक छोटा नियमित योगदान हमें दीर्घकालिक परियोजनाओं को बनाए रखने में मदद करता है।
          </p>
        </div>

        {/* ── Part 2: Program Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '80px',
        }}>
          {programs.map(({ Icon, title, desc, color, light }) => (
            <div
              key={title}
              style={{
                background: '#fff',
                border: '1.5px solid #f0f0f0',
                borderRadius: '20px',
                padding: '36px 28px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = color
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = '#f0f0f0'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: light, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '22px', flexShrink: 0,
              }}>
                <Icon size={26} style={{ color }} />
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                fontSize: '17px', color: '#111827', marginBottom: '10px',
              }}>
                {title}
              </h3>

              {/* Divider */}
              <div style={{ width: '32px', height: '2px', background: color, borderRadius: '2px', marginBottom: '14px' }} />

              {/* Desc */}
              <p style={{
                fontFamily: 'Hind, sans-serif', fontSize: '14px',
                color: '#6b7280', lineHeight: 1.7, margin: 0,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Part 3: Image + Text ── */}
        <style dangerouslySetInnerHTML={{__html: `
          .about-collage-perspective {
            position: relative;
            width: 100%;
            max-width: 480px;
            height: 440px;
          }
          @media (max-width: 900px) {
            .about-main-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .about-collage-perspective {
              margin: 0 auto 30px !important;
            }
          }
          @media (max-width: 480px) {
            .about-collage-perspective {
              transform: scale(0.85);
              transform-origin: center top;
              height: 380px !important;
            }
          }
          @media (max-width: 400px) {
            .about-collage-perspective {
              transform: scale(0.72);
              transform-origin: center top;
              height: 320px !important;
            }
          }
        `}} />

        <div 
          className="about-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '60px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          
          {/* LEFT COLUMN: Visual Overlapping Image Collage */}
          <div className="about-collage-perspective">
            
            {/* Faint Hand Outline (Far Left Backdrop) */}
            <div style={{ position: 'absolute', left: '-56px', top: '15%', opacity: 0.05, pointerEvents: 'none', zIndex: 0, color: '#821905' }}>
              <svg width="100" height="150" viewBox="0 0 100 200" fill="none">
                <path d="M20 200 C30 160 35 150 25 120 C18 100 25 90 35 85 C42 82 52 85 58 92 C62 98 62 108 55 125 C48 140 55 160 62 200" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
                <path d="M32 90 C32 75 28 65 24 55 C22 50 26 44 31 46 C36 48 38 56 42 66" stroke="currentColor" strokeWidth="2.5" />
                <path d="M42 66 C44 52 44 40 42 32 C41 27 46 23 50 26 C54 29 52 42 50 56" stroke="currentColor" strokeWidth="2.5" />
                <path d="M50 56 C54 46 58 38 60 30 C62 25 68 25 68 31 C68 37 60 49 56 64" stroke="currentColor" strokeWidth="2.5" />
                <path d="M56 64 C64 56 72 50 78 44 C82 40 86 44 82 50 C78 56 68 70 60 82" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Dotted Gold Grid Accent (Bottom Left) */}
            <div style={{ position: 'absolute', left: '-18px', bottom: '15px', zIndex: 0 }}>
              <svg width="60" height="100" fill="#FDED95" opacity="0.8">
                <pattern id="collageDotsHome" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2.5" cy="2.5" r="2" />
                </pattern>
                <rect width="60" height="100" fill="url(#collageDotsHome)" />
              </svg>
            </div>

            {/* Green Hand-drawn Wavy Curve SVG (Above Large Card) */}
            <div style={{ position: 'absolute', top: '10px', left: '160px', zIndex: 0, opacity: 0.85 }}>
              <svg width="120" height="24" viewBox="0 0 120 24" fill="none" stroke="#821905" strokeWidth="2.5">
                <path d="M0,12 Q15,0 30,12 T60,12 T90,12 T120,12" strokeLinecap="round" />
              </svg>
            </div>

            {/* Tall Vertical Green Capsule Banner */}
            <div 
              style={{
                position: 'absolute',
                left: '0px',
                bottom: '36px',
                width: '44px',
                height: '240px',
                background: '#821905',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(130, 25, 5,0.25)',
                zIndex: 10,
              }}
            >
              <span 
                style={{
                  fontFamily: 'Hind, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180deg)',
                  lineHeight: 1.2,
                }}
              >
                गरीबों की मदद करें
              </span>
            </div>

            {/* Image 1: Large Central Card (Grayscale Child Face with Play Button) */}
            <div 
              style={{
                position: 'absolute',
                left: '60px',
                top: '40px',
                width: '320px',
                height: '320px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                zIndex: 2,
              }}
            >
              <img 
                src="/images/about_child2.png" 
                alt="children support visual background"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(105%) brightness(90%)',
                }}
              />
              
              {/* Overlay Green Vignette */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(130, 25, 5,0.18)' }} />

              {/* Circular Outline Play Icon Centered */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '2px dashed #ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(3px)',
                  zIndex: 10,
                }}
              >
                <Play size={20} fill="#ffffff" stroke="none" style={{ marginLeft: '4px' }} />
              </div>
            </div>

            {/* Image 2: Small Foreground Top-Left (Color kids eating) */}
            <div 
              style={{
                position: 'absolute',
                left: '12px',
                top: '0px',
                width: '120px',
                height: '120px',
                borderRadius: '16px',
                border: '4px solid #ffffff',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                zIndex: 5,
              }}
            >
              <img 
                src="/images/about_child1.png" 
                alt="kids eating healthy food"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Image 3: Small Foreground Bottom-Right (Color smiling boy) */}
            <div 
              style={{
                position: 'absolute',
                right: '40px',
                bottom: '0px',
                width: '140px',
                height: '140px',
                borderRadius: '20px',
                border: '5px solid #ffffff',
                overflow: 'hidden',
                boxShadow: '0 10px 28px rgba(0,0,0,0.15)',
                zIndex: 5,
              }}
            >
              <img 
                src="/images/volunteer_child.png" 
                alt="smiling child support"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Copywriting details in Hindi */}
          <div>
            
            {/* Green Script Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              {/* Elegant hand-heart SVG icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" stroke="#821905" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 14C8.5 14.5 9.5 15 12 15C14.5 15 15.5 14.5 17 14" stroke="#821905" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span 
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif", 
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '18px', 
                  color: '#821905',
                  letterSpacing: '0.02em',
                }}
              >
                गरीब लोगों को दान देना शुरू करें
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
                margin: '0 0 16px',
              }}
            >
              एक-दूसरे की मदद से ही संसार बेहतर बनेगा
            </h2>

            {/* Paragraph */}
            <p 
              style={{
                fontFamily: 'Hind, sans-serif',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: 1.75,
                margin: '0 0 28px',
              }}
            >
              स्वयंसेवा हमें नए कौशल विकसित करने और बहुमूल्य अनुभव प्राप्त करने का अनूठा अवसर देती है। आप हमारे साथ जुड़कर समाज सेवा, संवाद और टीम वर्क की क्षमताओं का विकास कर सकते हैं।
            </p>

            {/* Two Feature Blocks */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px', 
                marginBottom: '28px' 
              }}
            >
              {/* Feature 1: Start Helping Them */}
              <div 
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  background: '#fafafa',
                  border: '1px solid #f0f0f0',
                  borderRadius: '14px',
                  padding: '16px',
                }}
              >
                {/* Hands + Globe custom inline SVG */}
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(253, 237, 149,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FDED95" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13px', color: '#111827', margin: '0 0 4px' }}>
                    मदद की शुरुआत करें
                  </h4>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '11.5px', color: '#9ca3af', lineHeight: 1.45, margin: 0 }}>
                    संस्था के लक्ष्यों के प्रति समाज में जागरूकता फैलाना।
                  </p>
                </div>
              </div>

              {/* Feature 2: Make Donations */}
              <div 
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  background: '#fafafa',
                  border: '1px solid #f0f0f0',
                  borderRadius: '14px',
                  padding: '16px',
                }}
              >
                {/* Hands cradling heart custom inline SVG */}
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(130, 25, 5,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#821905" strokeWidth="2">
                    <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13px', color: '#111827', margin: '0 0 4px' }}>
                    दान का योगदान दें
                  </h4>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '11.5px', color: '#9ca3af', lineHeight: 1.45, margin: 0 }}>
                    आर्थिक या वस्तु दान देकर जरूरतमंदों को सशक्त बनाना।
                  </p>
                </div>
              </div>

            </div>

            {/* Bullet list checkmarks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {bullets.map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div 
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={11} style={{ color: '#ffffff', strokeWidth: 3 }} />
                  </div>
                  <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13.5px', color: '#374151', lineHeight: 1.5 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Row: More About Us & Phone Call Widget */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
              <a
                href="#about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 30px',
                  borderRadius: '999px',
                  background: '#821905',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: 'Hind, sans-serif',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 14px rgba(130, 25, 5,0.3)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(130, 25, 5,0.4)'; e.currentTarget.style.background = '#5a1002' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(130, 25, 5,0.3)'; e.currentTarget.style.background = '#821905' }}
              >
                हमारे बारे में और जानें <ArrowUpRight size={15} />
              </a>

              {/* Phone Widget */}
              <a href="tel:+23645689622" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '1.5px solid #e5e7eb',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={16} style={{ color: '#821905' }} />
                </div>
                <div>
                  <p style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>
                    फ़ोन नंबर
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>
                     9569036324
                  </p>
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
