const companyLogos = [
  '/company/main/1.png',
  '/company/main/2.png',
  '/company/main/3.png',
  '/company/main/4.png',
  '/company/main/5.png',
  '/company/main/6.png',
  '/company/main/7.png',
  '/company/main/8.png',
]

// Triple for seamless loop
const marqueeLogos = [...companyLogos, ...companyLogos, ...companyLogos]

const PartnerLogos = () => {
  return (
    <section
      aria-label="हमारे सहयोगी"
      style={{
        background: '#ffffff',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        padding: '52px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee-scroll 22s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', padding: '0 24px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: 'rgba(130, 25, 5,0.06)', border: '1px solid rgba(130, 25, 5,0.12)',
          borderRadius: '999px', padding: '6px 18px', marginBottom: '14px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#821905' }} />
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif',
          }}>
            हमारे विश्वसनीय सहयोगी
          </span>
        </div>
        <p style={{
          fontSize: '14px', color: '#9ca3af', fontFamily: 'Hind, sans-serif',
          lineHeight: 1.6, maxWidth: '420px', margin: '0 auto',
        }}>
          देश की प्रमुख संस्थाएं और कंपनियां हमारे मिशन में साथ हैं
        </p>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative' }}>

        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '160px', zIndex: 10,
          background: 'linear-gradient(to right, #ffffff 30%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '160px', zIndex: 10,
          background: 'linear-gradient(to left, #ffffff 30%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Track */}
        <div style={{ overflow: 'hidden' }}>
          <div
            className="marquee-track"
            style={{ display: 'flex', alignItems: 'center', gap: '0' }}
          >
            {marqueeLogos.map((src, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 48px',
                  height: '100px',
                  borderRight: '1px solid #f3f4f6',
                  filter: 'grayscale(100%) opacity(0.55)',
                  transition: 'filter 0.3s ease, transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.filter = 'grayscale(0%) opacity(1)'
                  e.currentTarget.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.filter = 'grayscale(100%) opacity(0.55)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <img
                  src={src}
                  alt={`Partner ${(i % companyLogos.length) + 1}`}
                  style={{ height: '60px', width: 'auto', objectFit: 'contain', maxWidth: '160px' }}
                  onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '32px', marginTop: '36px', padding: '0 24px',
        flexWrap: 'wrap',
      }}>
        {['80G कर-मुक्ति प्रमाणित', 'FCRA पंजीकृत', '15+ वर्षों का विश्वास', '50,000+ लाभार्थी'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FDED95', flexShrink: 0 }} />
            <span style={{ fontSize: '12.5px', color: '#6b7280', fontFamily: 'Hind, sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>
              {item}
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}

export default PartnerLogos
