import { useState } from 'react'
import { Heart, ArrowUpRight, Users, Trophy, HandHeart, Play } from 'lucide-react'
import { handlePageLink } from '../utils/navigation'

const stats = [
  { Icon: Users,     number: '50,000+', label: 'लाभार्थी परिवार' },
  { Icon: Trophy,    number: '200+',    label: 'सफल परियोजनाएं' },
  { Icon: Heart,     number: '15+',     label: 'वर्षों की सेवा'  },
  { Icon: HandHeart, number: '5,000+',  label: 'सक्रिय स्वयंसेवक'},
]

const VolunteerCall = () => {
  const [videoHovered, setVideoHovered] = useState(false)

  return (
    <section id="volunteer-call" style={{ background: '#fff', padding: '72px 0 80px', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ping-ring {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%       { transform: scale(1.22); opacity: 0.15; }
        }
        @keyframes vc-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(253,237,149,0.0); }
          50%       { box-shadow: 0 0 0 10px rgba(253,237,149,0.2); }
        }

        /* ── Main banner grid ── */
        .vc-banner-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 32px;
          padding: 52px 48px;
        }

        /* ── Stats grid ── */
        .vc-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .vc-banner-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 16px;
            padding: 32px 24px;
          }
          /* Video play button spans full width on mobile */
          .vc-play-col {
            display: none !important;
          }
          .vc-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .vc-banner-grid {
            grid-template-columns: 1fr;
            grid-template-rows: unset;
            padding: 24px 18px 28px;
            gap: 14px;
          }
          .vc-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .vc-stat-card {
            padding: 16px 14px !important;
            gap: 12px !important;
            border-radius: 14px !important;
          }
          .vc-stat-icon { width: 40px !important; height: 40px !important; border-radius: 11px !important; }
          .vc-stat-num  { font-size: 18px !important; }
          .vc-stat-lbl  { font-size: 11.5px !important; }
          .vc-cta-card  { padding: 22px 18px !important; border-radius: 18px !important; }
          .vc-cta-card h3 { font-size: 16px !important; }
        }
      `}} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* ══════════ SECTION HEADER ══════════ */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(130,25,5,0.07)', border: '1.5px solid rgba(130,25,5,0.14)',
            borderRadius: '999px', padding: '6px 18px', marginBottom: '16px',
          }}>
            <Heart size={12} style={{ color: '#821905', fill: '#821905' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif' }}>
              हमारे साथ जुड़ें
            </span>
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 36px)', color: '#111827', lineHeight: 1.25, margin: 0 }}>
            बदलाव की शुरुआत{' '}
            <span style={{ color: '#821905', borderBottom: '3px solid #FDED95', paddingBottom: '1px' }}>आपसे होती है</span>
          </h2>
        </div>

        {/* ══════════ MAIN BANNER ══════════ */}
        <div style={{
          position: 'relative', borderRadius: '24px', overflow: 'hidden',
          marginBottom: '20px',
          background: '#1a0501',
        }}>
          {/* Background image */}
          <img
            src="/images/hero.png"
            alt="volunteer background"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
          />
          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(25,5,1,0.97) 0%, rgba(130,25,5,0.88) 55%, rgba(130,25,5,0.7) 100%)' }} />

          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(253,237,149,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          {/* Content Grid */}
          <div className="vc-banner-grid" style={{ position: 'relative', zIndex: 5 }}>

            {/* LEFT: Volunteer CTA */}
            <CtaCard
              accent="#821905"
              accentBg="rgba(130,25,5,0.3)"
              icon={<Users size={26} color="#fff" />}
              tag="स्वयंसेवक बनें"
              heading="अपना समय दें, किसी की जिंदगी बदलें"
              desc="हमारे साथ जुड़कर समाज सेवा, शिक्षा और स्वास्थ्य अभियानों में योगदान दें।"
              btnLabel="अभी जुड़ें"
              btnHref="contact-page"
              btnStyle="dark"
            />

            {/* CENTER: Video button (hidden on mobile via CSS) */}
            <div className="vc-play-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <button
                aria-label="वीडियो देखें"
                onMouseEnter={() => setVideoHovered(true)}
                onMouseLeave={() => setVideoHovered(false)}
                style={{
                  position: 'relative', width: '70px', height: '70px',
                  borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: videoHovered ? '#FDED95' : 'rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  animation: 'vc-pulse 2.5s ease-in-out infinite',
                }}
              >
                <span style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '2px solid rgba(253,237,149,0.35)', animation: 'ping-ring 2s ease-in-out infinite' }} />
                <Play size={24} style={{ color: videoHovered ? '#111827' : '#fff', marginLeft: '3px', transition: 'color 0.3s' }} />
              </button>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontFamily: 'Hind, sans-serif', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                हमारी कहानी देखें
              </span>
            </div>

            {/* RIGHT: Donate CTA */}
            <CtaCard
              accent="#FDED95"
              accentBg="rgba(253,237,149,0.2)"
              icon={<Heart size={26} color="#111827" style={{ fill: '#111827' }} />}
              tag="दान करें"
              heading="आपका दान किसी की मुस्कान बन सकता है"
              desc="हर छोटा योगदान एक बड़ा बदलाव लाता है। आज ही दान करें और फर्क महसूस करें।"
              btnLabel="अभी दान करें"
              btnHref="donate-page"
              btnStyle="yellow"
            />

          </div>
        </div>

        {/* ══════════ STATS GRID ══════════ */}
        <div className="vc-stats-grid">
          {stats.map(({ Icon, number, label }) => (
            <div
              key={label}
              className="vc-stat-card"
              style={{
                background: '#f8f9fa', border: '1.5px solid #f0f0f0',
                borderRadius: '16px', padding: '22px 18px',
                display: 'flex', alignItems: 'center', gap: '14px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#821905'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(130,25,5,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div
                className="vc-stat-icon"
                style={{ width: '46px', height: '46px', borderRadius: '13px', background: 'rgba(130,25,5,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <Icon size={20} style={{ color: '#821905' }} />
              </div>
              <div>
                <p className="vc-stat-num" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '20px', color: '#111827', lineHeight: 1, margin: '0 0 4px' }}>
                  {number}
                </p>
                <p className="vc-stat-lbl" style={{ fontFamily: 'Hind, sans-serif', fontSize: '12.5px', color: '#6b7280', lineHeight: 1, margin: 0 }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ════════════ CTA Card ════════════ */
const CtaCard = ({ accent, accentBg, icon, tag, heading, desc, btnLabel, btnHref, btnStyle }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="vc-cta-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${hovered ? accent : 'rgba(255,255,255,0.12)'}`,
        borderRadius: '20px', padding: '28px 24px',
        backdropFilter: 'blur(14px)',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Icon + tag row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </div>
        <span style={{
          background: accent,
          color: btnStyle === 'yellow' ? '#111827' : '#fff',
          fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em',
          textTransform: 'uppercase', fontFamily: 'Hind, sans-serif',
          padding: '4px 12px', borderRadius: '999px',
        }}>
          {tag}
        </span>
      </div>

      {/* Heading */}
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '17px', color: '#fff', lineHeight: 1.35, marginBottom: '10px' }}>
        {heading}
      </h3>

      {/* Desc */}
      <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, marginBottom: '22px' }}>
        {desc}
      </p>

      {/* Button */}
      <a
        href={btnHref === 'donate-page' || btnHref === 'contact-page' ? '#' : btnHref}
        onClick={e => handlePageLink(btnHref, e)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '999px',
          background: btnStyle === 'yellow' ? '#FDED95' : '#821905',
          color: btnStyle === 'yellow' ? '#111827' : '#fff',
          fontFamily: 'Hind, sans-serif', fontWeight: 800, fontSize: '13.5px',
          textDecoration: 'none',
          boxShadow: btnStyle === 'yellow'
            ? '0 5px 18px rgba(253,237,149,0.4)'
            : '0 5px 18px rgba(130,25,5,0.4)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = '' }}
      >
        {btnLabel} <ArrowUpRight size={15} strokeWidth={2.5} />
      </a>
    </div>
  )
}

export default VolunteerCall
