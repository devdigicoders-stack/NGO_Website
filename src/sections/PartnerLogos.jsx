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

const marqueeLogos = [...companyLogos, ...companyLogos, ...companyLogos]

const trustItems = [
  { label: '80G प्रमाणित',   sub: 'आयकर-मुक्त दान',        icon: '🏛️', color: '#821905', bg: 'rgba(130,25,5,0.07)',   border: 'rgba(130,25,5,0.12)'   },
  { label: 'FCRA पंजीकृत',   sub: 'सरकार द्वारा मान्यता',   icon: '📜', color: '#1d4ed8', bg: 'rgba(29,78,216,0.07)',  border: 'rgba(29,78,216,0.12)'  },
  { label: '15+ वर्षों का',  sub: 'अनुभव और विश्वास',      icon: '⭐', color: '#b45309', bg: 'rgba(180,83,9,0.07)',   border: 'rgba(180,83,9,0.12)'   },
  { label: '50,000+ परिवार', sub: 'सफलतापूर्वक लाभान्वित', icon: '🤝', color: '#065f46', bg: 'rgba(6,95,70,0.07)',    border: 'rgba(6,95,70,0.12)'    },
]

const PartnerLogos = () => {
  return (
    <section
      aria-label="हमारे सहयोगी"
      style={{ background: '#f9fafb', overflow: 'hidden', position: 'relative' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes partner-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .partner-track {
          display: flex; align-items: center;
          animation: partner-marquee 30s linear infinite;
          will-change: transform;
        }
        .partner-track:hover { animation-play-state: paused; }
        .partner-logo-item {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 0 48px; height: 120px;
          border-right: 1px solid #e5e7eb;
          filter: grayscale(100%) opacity(0.4);
          transition: filter 0.35s ease, transform 0.35s ease;
        }
        .partner-logo-item:hover {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.3);
          z-index: 10;
        }

        /* ── Trust Cards ── */
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .trust-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          border: 1.5px solid #f0f0f0;
          border-radius: 16px;
          padding: 18px 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          cursor: default;
        }
        .trust-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .trust-icon-box {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          border-width: 1.5px; border-style: solid;
        }

        /* ── Tablet: 2 cols ── */
        @media (max-width: 900px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }

        /* ── Mobile: full-width horizontal rows ── */
        @media (max-width: 600px) {
          .trust-grid {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 0 16px;
          }
          .trust-card {
            padding: 14px 16px;
            border-radius: 14px;
            gap: 14px;
            align-items: center;
          }
          .trust-icon-box {
            width: 42px; height: 42px;
            border-radius: 10px;
            font-size: 18px;
            flex-shrink: 0;
          }
          .partner-logo-item {
            padding: 0 28px;
            height: 80px;
          }
          .partner-logo-item img { height: 50px !important; }
        }

        /* ── Badge ping ── */
        @keyframes partner-ping {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(1.7); opacity: 0; }
        }
      `}} />

      {/* ══════════ HEADER ══════════ */}
      <div style={{ textAlign: 'center', padding: '56px 24px 40px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '9px',
          background: 'rgba(130,25,5,0.06)', border: '1.5px solid rgba(130,25,5,0.12)',
          borderRadius: '999px', padding: '7px 20px', marginBottom: '18px',
        }}>
          <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#821905', display: 'block' }} />
            <span style={{
              position: 'absolute', inset: '-3px', borderRadius: '50%',
              background: 'rgba(130,25,5,0.3)',
              animation: 'partner-ping 2.2s ease-in-out infinite',
            }} />
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif',
          }}>
            हमारे विश्वसनीय सहयोगी
          </span>
        </div>

        <h2 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 800,
          fontSize: 'clamp(20px, 2.8vw, 30px)', color: '#111827',
          margin: '0 0 10px', lineHeight: 1.3,
        }}>
          देश की प्रमुख संस्थाएं हमारे साथ हैं
        </h2>
        <p style={{
          fontFamily: 'Hind, sans-serif', fontSize: '14px',
          color: '#9ca3af', lineHeight: 1.6, margin: '0 auto', maxWidth: '440px',
        }}>
          हमारे सहयोगियों के साथ मिलकर हम समाज में सकारात्मक बदलाव ला रहे हैं
        </p>
      </div>

      {/* ══════════ LOGO MARQUEE ══════════ */}
      <div style={{ position: 'relative', marginBottom: '48px' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #f9fafb 10%, transparent 100%)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #f9fafb 10%, transparent 100%)' }} />

        <div style={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', background: '#ffffff', overflow: 'hidden' }}>
          <div className="partner-track">
            {marqueeLogos.map((src, i) => (
              <div key={i} className="partner-logo-item">
                <img
                  src={src}
                  alt={`Partner ${(i % companyLogos.length) + 1}`}
                  style={{ height: '70px', width: 'auto', objectFit: 'contain', maxWidth: '180px' }}
                  onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ TRUST CARDS ══════════ */}
      <div className="trust-grid" style={{ paddingBottom: '56px' }}>
        {trustItems.map(({ label, sub, icon, color, bg, border }, i) => (
          <div key={i} className="trust-card">
            {/* Icon */}
            <div
              className="trust-icon-box"
              style={{ background: bg, borderColor: border }}
            >
              <span role="img" aria-hidden="true">{icon}</span>
            </div>

            {/* Text */}
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                fontSize: '14px', color: '#111827',
                margin: '0 0 3px', lineHeight: 1.25,
                whiteSpace: 'nowrap',
              }}>
                {label}
              </p>
              <p style={{
                fontFamily: 'Hind, sans-serif', fontSize: '12px',
                color: '#6b7280', margin: 0, fontWeight: 500,
                lineHeight: 1.35,
              }}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default PartnerLogos
