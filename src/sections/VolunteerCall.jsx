import { useState } from 'react'
import { Heart, ArrowUpRight, Phone, Users, Trophy, HandHeart, Play } from 'lucide-react'
import { handlePageLink } from '../utils/navigation'

const stats = [
  { Icon: Users,     number: '50,000+', label: 'लाभार्थी परिवार' },
  { Icon: Trophy,    number: '200+',    label: 'सफल परियोजनाएं' },
  { Icon: Heart,     number: '15+',     label: 'वर्षों की सेवा' },
  { Icon: HandHeart, number: '5,000+',  label: 'सक्रिय स्वयंसेवक' },
]

const VolunteerCall = () => {
  const [videoHovered, setVideoHovered] = useState(false)

  return (
    <section id="volunteer-call" style={{ background: '#fff', padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Section Label ── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(130, 25, 5,0.07)', border: '1px solid rgba(130, 25, 5,0.14)',
            borderRadius: '999px', padding: '5px 16px', marginBottom: '16px',
          }}>
            <Heart size={12} style={{ color: '#821905', fill: '#821905' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif' }}>
              हमारे साथ जुड़ें
            </span>
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 38px)', color: '#111827', lineHeight: 1.25, margin: 0 }}>
            बदलाव की शुरुआत{' '}
            <span style={{ color: '#FDED95' }}>आपसे होती है</span>
          </h2>
        </div>

        {/* ── Main Banner ── */}
        <div style={{
          position: 'relative', borderRadius: '24px', overflow: 'hidden',
          minHeight: '420px', display: 'flex', alignItems: 'center',
          marginBottom: '24px',
        }}>
          {/* Background image */}
          <img
            src="/images/hero.png"
            alt="volunteer background"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(42, 5, 1, 0.95) 0%, rgba(130, 25, 5, 0.85) 50%, rgba(130, 25, 5, 0.6) 100%)' }} />

          {/* Decorative yellow circle top-right */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'rgba(253, 237, 149,0.08)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-40px', left: '-40px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'rgba(130, 25, 5,0.15)', pointerEvents: 'none',
          }} />

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 10, width: '100%',
            padding: '56px 48px',
            display: 'grid', gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center', gap: '40px',
          }}
            className="volunteer-grid"
          >

            {/* Left CTA — Volunteer */}
            <CtaCard
              accent="#821905"
              accentLight="rgba(130, 25, 5,0.25)"
              icon={<Users size={28} color="#fff" />}
              tag="स्वयंसेवक बनें"
              heading="अपना समय दें, किसी की जिंदगी बदलें"
              desc="हमारे साथ जुड़कर समाज सेवा, शिक्षा और स्वास्थ्य अभियानों में योगदान दें।"
              btnLabel="अभी जुड़ें"
              btnHref="contact-page"
              btnStyle="green"
            />

            {/* Center — Video Play */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <button
                aria-label="वीडियो देखें"
                onMouseEnter={() => setVideoHovered(true)}
                onMouseLeave={() => setVideoHovered(false)}
                style={{
                  position: 'relative', width: '72px', height: '72px',
                  borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: videoHovered ? '#FDED95' : 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: videoHovered ? '0 0 0 8px rgba(253, 237, 149,0.2)' : '0 0 0 8px rgba(255,255,255,0.08)',
                }}
              >
                {/* Ping ring */}
                <span style={{
                  position: 'absolute', inset: '-8px', borderRadius: '50%',
                  border: '2px solid rgba(253, 237, 149,0.4)',
                  animation: 'ping-ring 2s ease-in-out infinite',
                }} />
                <Play size={26} style={{ color: videoHovered ? '#111827' : '#fff', marginLeft: '3px', transition: 'color 0.3s' }} />
              </button>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Hind, sans-serif', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                हमारी कहानी देखें
              </span>
            </div>

            {/* Right CTA — Donate */}
            <CtaCard
              accent="#FDED95"
              accentLight="rgba(253, 237, 149,0.2)"
              icon={<Heart size={28} color="#111827" style={{ fill: '#111827' }} />}
              tag="दान करें"
              heading="आपका दान किसी की मुस्कान बन सकता है"
              desc="हर छोटा योगदान एक बड़ा बदलाव लाता है। आज ही दान करें और फर्क महसूस करें।"
              btnLabel="अभी दान करें"
              btnHref="donate-page"
              btnStyle="yellow"
            />

          </div>
        </div>

        {/* ── Stats Row ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
          className="stats-grid"
        >
          {stats.map(({ Icon, number, label }) => (
            <div
              key={label}
              style={{
                background: '#f8f9fa', border: '1.5px solid #f0f0f0',
                borderRadius: '16px', padding: '24px 20px',
                display: 'flex', alignItems: 'center', gap: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#821905'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(130, 25, 5,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'rgba(130, 25, 5,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={22} style={{ color: '#821905' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '22px', color: '#111827', lineHeight: 1, marginBottom: '4px' }}>
                  {number}
                </p>
                <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: '#6b7280', lineHeight: 1 }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes ping-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.18); opacity: 0.2; }
        }
        @media (max-width: 900px) {
          .volunteer-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const CtaCard = ({ accent, accentLight, icon, tag, heading, desc, btnLabel, btnHref, btnStyle }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${hovered ? accent : 'rgba(255,255,255,0.12)'}`,
        borderRadius: '20px', padding: '32px 28px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: '56px', height: '56px', borderRadius: '16px',
        background: accentLight,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '18px',
      }}>
        {icon}
      </div>

      {/* Tag */}
      <span style={{
        display: 'inline-block',
        background: accent, color: btnStyle === 'yellow' ? '#111827' : '#fff',
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', fontFamily: 'Hind, sans-serif',
        padding: '3px 12px', borderRadius: '999px', marginBottom: '12px',
      }}>
        {tag}
      </span>

      {/* Heading */}
      <h3 style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 700,
        fontSize: '18px', color: '#fff', lineHeight: 1.35,
        marginBottom: '10px',
      }}>
        {heading}
      </h3>

      {/* Desc */}
      <p style={{
        fontFamily: 'Hind, sans-serif', fontSize: '13.5px',
        color: 'rgba(255,255,255,0.65)', lineHeight: 1.65,
        marginBottom: '24px',
      }}>
        {desc}
      </p>

      {/* Button */}
      <a
        href={btnHref === 'donate-page' || btnHref === 'contact-page' ? '#' : btnHref}
        onClick={(e) => handlePageLink(btnHref, e)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '11px 24px', borderRadius: '999px',
          background: btnStyle === 'yellow' ? '#FDED95' : '#821905',
          color: btnStyle === 'yellow' ? '#111827' : '#fff',
          fontFamily: 'Hind, sans-serif', fontWeight: 700, fontSize: '13.5px',
          textDecoration: 'none',
          boxShadow: btnStyle === 'yellow' ? '0 4px 16px rgba(253, 237, 149,0.35)' : '0 4px 16px rgba(130, 25, 5,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = btnStyle === 'yellow' ? '0 8px 24px rgba(253, 237, 149,0.5)' : '0 8px 24px rgba(130, 25, 5,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = btnStyle === 'yellow' ? '0 4px 16px rgba(253, 237, 149,0.35)' : '0 4px 16px rgba(130, 25, 5,0.35)' }}
      >
        {btnLabel} <ArrowUpRight size={15} />
      </a>
    </div>
  )
}

export default VolunteerCall
