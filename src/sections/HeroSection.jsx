import { useState, useEffect } from 'react'
import { handlePageLink } from '../utils/navigation'
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart, HandHeart, Sparkles } from 'lucide-react'

const slides = [
  {
    image: '/images/hero.png',
    badge: 'जरूरतमंद लोगों की मदद करें',
    BadgeIcon: Heart,
    line1: 'उनकी मदद करना',
    line2: 'जो हैं',
    highlight: 'जरूरतमंद',
    line2end: '',
    tagline: 'हर जिंदगी है कीमती।',
    sub: 'सहायता फाउंडेशन के साथ जुड़ें और उन लोगों के जीवन में बदलाव लाएं जिन्हें आपकी मदद की सबसे ज़्यादा जरूरत है।',
    btn1: { label: 'हमारे बारे में जानें', href: '#about' },
    btn2: { label: 'दान करें', href: 'donate-page' },
  },
  {
    image: '/images/hero1.png',
    badge: 'एक बेहतर कल की ओर',
    BadgeIcon: HandHeart,
    line1: 'शिक्षा से बदलेगा',
    line2: 'हर',
    highlight: 'बच्चे',
    line2end: 'का कल।',
    tagline: 'ज्ञान ही सबसे बड़ी शक्ति है।',
    sub: 'हम प्रतिबद्ध हैं कि भारत का हर बच्चा गुणवत्तापूर्ण शिक्षा पाए। स्कूल छोड़ने वाले बच्चों को वापस लाना हमारा संकल्प है।',
    btn1: { label: 'हमारे कार्यक्रम', href: '#causes' },
    btn2: { label: 'स्वयंसेवक बनें', href: 'contact-page' },
  },
]

const HeroSection = () => {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => goToSlide((current + 1) % slides.length), 7000)
    return () => clearInterval(timer)
  }, [current])

  const goToSlide = (index) => {
    if (animating || index === current) return
    setAnimating(true)
    setTimeout(() => { setCurrent(index); setAnimating(false) }, 450)
  }

  const slide = slides[current]
  const BadgeIcon = slide.BadgeIcon

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ─── Hero Keyframes ─── */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes heroPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%       { transform: scale(1.06); opacity: 1; }
        }
        @keyframes heroSlideRight {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: scaleX(1); }
          50%       { transform: scaleX(1.15); }
        }
        @keyframes imgKen {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(253,237,149,0.0); }
          50%       { box-shadow: 0 0 20px 6px rgba(253,237,149,0.35); }
        }

        /* ─── Entrance classes ─── */
        .h-badge  { opacity: 0; animation: heroSlideRight 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; }
        .h-title  { opacity: 0; animation: heroFadeUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.3s forwards; }
        .h-tag    { opacity: 0; animation: heroFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.45s forwards; }
        .h-sub    { opacity: 0; animation: heroFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.55s forwards; }
        .h-btns   { opacity: 0; animation: heroFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.7s forwards; }
        .h-dots   { opacity: 0; animation: heroFadeIn 0.5s ease 0.95s forwards; }

        /* ─── Background image ─── */
        .hero-bg-img {
          animation: imgKen 10s ease-out both;
        }

        /* ─── Desktop overlay ─── */
        .hero-overlay-desktop {
          background: linear-gradient(
            105deg,
            rgba(25,5,2,0.97) 0%,
            rgba(40,8,3,0.88) 38%,
            rgba(40,8,3,0.55) 60%,
            rgba(40,8,3,0.12) 80%,
            transparent 100%
          );
        }

        /* ─── Desktop accent bar ─── */
        .hero-accent-bar {
          position: absolute;
          left: 0; bottom: 70px;
          width: 5px; height: 200px;
          background: linear-gradient(to bottom, #FDED95, #f5a623);
          border-radius: 0 6px 6px 0;
          box-shadow: 0 0 18px rgba(253,237,149,0.5);
        }

        /* ─── Desktop hero stats bar ─── */
        .hero-stats-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(135deg, rgba(130,25,5,0.85) 0%, rgba(42,5,1,0.9) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(253,237,149,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 20px 24px;
          z-index: 15;
        }
        .hero-stat-item {
          display: flex; align-items: center; gap: 12px;
          padding: 0 36px;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .hero-stat-item:last-child { border-right: none; }

        /* ─── Desktop: hide mobile elements ─── */
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
          .hero-stats-bar { display: flex; }
          .hero-content-wrapper { padding: 80px 48px 140px; }
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .hero-stats-bar { display: none; }
          
          /* Fullscreen section */
          .hero-section {
            min-height: calc(100svh - 70px) !important;
            align-items: flex-end !important;
          }
          .hero-content-wrapper {
            padding: 0 !important;
            max-width: 100% !important;
          }

          /* Bottom card panel */
          .hero-mobile-panel {
            background: linear-gradient(175deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,1) 100%);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border-radius: 28px 28px 0 0;
            border-top: 2.5px solid rgba(253,237,149,0.6);
            box-shadow: 0 -20px 60px rgba(0,0,0,0.25), 0 -4px 20px rgba(130,25,5,0.1);
            padding: 0 16px 20px;
            width: 100%;
          }

          /* Mobile buttons */
          .mobile-btn-primary {
            display: flex; align-items: center; justify-content: center; gap: 6px;
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            background: linear-gradient(135deg, #821905 0%, #5a1002 100%);
            color: #fff;
            font-family: 'Hind', sans-serif;
            font-weight: 800;
            font-size: 14px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(130,25,5,0.35);
            transition: all 0.25s ease;
            letter-spacing: 0.02em;
          }
          .mobile-btn-secondary {
            display: flex; align-items: center; justify-content: center; gap: 6px;
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            background: linear-gradient(135deg, #FDED95 0%, #f5d76e 100%);
            color: #111827;
            font-family: 'Hind', sans-serif;
            font-weight: 800;
            font-size: 14px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(253,237,149,0.35);
            transition: all 0.25s ease;
            letter-spacing: 0.02em;
          }
          .mobile-btn-primary:active { transform: scale(0.97); }
          .mobile-btn-secondary:active { transform: scale(0.97); }
        }

        @media (max-width: 480px) {
          .hero-mobile-panel { padding: 0 14px 16px; }
        }
      `}} />

      <section
        id="home"
        className="hero-section"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >

        {/* ── Background Image ── */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: animating ? 0 : 1,
          transition: 'opacity 0.55s ease',
          overflow: 'hidden',
        }}>
          <img
            src={slide.image}
            alt="हीरो बैनर"
            className="hero-bg-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />

          {/* Desktop gradient overlay */}
          <div
            className="hero-overlay-desktop desktop-only"
            style={{ position: 'absolute', inset: 0 }}
          />

          {/* Mobile: top fade (soft vignette on top so image is slightly visible) */}
          <div
            className="mobile-only"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.78) 80%)',
            }}
          />
        </div>

        {/* ── Decorative accent dots (desktop) ── */}
        <div className="desktop-only" style={{
          position: 'absolute', right: '8%', bottom: '160px', zIndex: 2, pointerEvents: 'none',
        }}>
          <svg width="80" height="80" fill="#FDED95" opacity="0.18">
            <pattern id="hdots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2.5" />
            </pattern>
            <rect width="80" height="80" fill="url(#hdots)" />
          </svg>
        </div>

        {/* ── Main Content Wrapper ── */}
        <div
          className="hero-content-wrapper"
          style={{
            position: 'relative', zIndex: 10,
            width: '100%', maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {/* Desktop: Yellow left accent bar */}
          <div className="hero-accent-bar desktop-only" />

          {/* ══════════ DESKTOP LAYOUT ══════════ */}
          <div
            className="desktop-only"
            style={{
              paddingLeft: '60px',
              maxWidth: '640px',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(18px)' : 'translateY(0)',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
            }}
          >
            {/* Badge */}
            <div className="h-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'rgba(253,237,149,0.12)',
              border: '1px solid rgba(253,237,149,0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: '999px', padding: '8px 20px',
              marginBottom: '28px',
            }}>
              <BadgeIcon size={14} style={{ color: '#FDED95', fill: '#FDED95', flexShrink: 0 }} />
              <span style={{
                color: '#FDED95', fontWeight: 700, fontSize: '11px',
                letterSpacing: '0.14em', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase',
              }}>
                {slide.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="h-title" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#fff',
              lineHeight: 1.15, margin: 0, marginBottom: '18px',
              fontSize: 'clamp(32px, 3.8vw, 54px)',
            }}>
              <span style={{ display: 'block', marginBottom: '4px' }}>{slide.line1}</span>
              <span style={{ display: 'block' }}>
                {slide.line2}{' '}
                <span style={{
                  color: '#FDED95',
                  textShadow: '0 0 40px rgba(253,237,149,0.4)',
                  position: 'relative',
                }}>
                  {slide.highlight}
                </span>
                {slide.line2end && <> {slide.line2end}</>}
              </span>
            </h1>

            {/* Tagline */}
            <p className="h-tag" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 600,
              fontSize: 'clamp(15px, 1.5vw, 20px)',
              color: 'rgba(255,255,255,0.88)', lineHeight: 1.4, marginBottom: '16px',
            }}>
              {slide.tagline}
            </p>

            {/* Sub */}
            <p className="h-sub" style={{
              fontFamily: 'Hind, sans-serif', fontSize: '15px',
              color: 'rgba(255,255,255,0.68)', lineHeight: 1.8,
              marginBottom: '38px', maxWidth: '520px', fontWeight: 400,
            }}>
              {slide.sub}
            </p>

            {/* CTA Buttons */}
            <div className="h-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '44px' }}>
              <a
                href={slide.btn2.href}
                onClick={(e) => handlePageLink(slide.btn2.href, e)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #FDED95 0%, #f5d76e 100%)',
                  color: '#111827', fontFamily: 'Hind, sans-serif', fontWeight: 800,
                  fontSize: '14px', textDecoration: 'none',
                  boxShadow: '0 6px 24px rgba(253,237,149,0.4)',
                  transition: 'all 0.3s ease',
                  animation: 'glowPulse 3s ease-in-out infinite',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(253,237,149,0.55)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(253,237,149,0.4)'
                }}
              >
                {slide.btn2.label} <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
              <a
                href={slide.btn1.href}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px', borderRadius: '999px',
                  background: 'transparent',
                  border: '2px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff', fontFamily: 'Hind, sans-serif', fontWeight: 600,
                  fontSize: '14px', textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {slide.btn1.label} <ArrowUpRight size={17} />
              </a>
            </div>

            {/* Dots */}
            <div className="h-dots" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`स्लाइड ${i + 1}`}
                  style={{
                    height: '6px',
                    width: i === current ? '36px' : '6px',
                    borderRadius: '999px',
                    background: i === current
                      ? 'linear-gradient(to right, #FDED95, #f5a623)'
                      : 'rgba(255,255,255,0.35)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    padding: 0,
                    boxShadow: i === current ? '0 0 10px rgba(253,237,149,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ══════════ MOBILE LAYOUT ══════════ */}
          <div
            className="hero-mobile-panel mobile-only"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(14px)' : 'translateY(0)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* Handle bar */}
            <div style={{
              width: '36px', height: '4px',
              background: 'linear-gradient(to right, rgba(130,25,5,0.25), rgba(253,237,149,0.4))',
              borderRadius: '10px', margin: '10px auto 14px',
            }} />

            {/* Badge */}
            <div className="h-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'linear-gradient(135deg, #FDED95 0%, #f5d76e 100%)',
              padding: '6px 12px', borderRadius: '999px',
              marginBottom: '10px',
              boxShadow: '0 4px 14px rgba(253,237,149,0.4)',
            }}>
              <Sparkles size={11} style={{ color: '#821905', flexShrink: 0 }} />
              <span style={{
                color: '#111827', fontWeight: 800, fontSize: '9px',
                letterSpacing: '0.1em', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase',
              }}>
                {slide.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="h-title" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 900,
              color: '#111827', lineHeight: 1.2,
              margin: 0, marginBottom: '8px',
              fontSize: '22px',
            }}>
              <span style={{ display: 'block', marginBottom: '2px' }}>{slide.line1}</span>
              <span style={{ display: 'block' }}>
                {slide.line2}{' '}
                <span style={{
                  color: '#111827',
                  background: 'linear-gradient(135deg, #FDED95, #f5d76e)',
                  padding: '2px 8px', borderRadius: '6px',
                  display: 'inline-block',
                  boxShadow: '0 3px 8px rgba(253,237,149,0.4)',
                }}>
                  {slide.highlight}
                </span>
                {slide.line2end && <> {slide.line2end}</>}
              </span>
            </h1>

            {/* Tagline */}
            <p className="h-tag" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: '12.5px', color: '#821905',
              lineHeight: 1.4, marginBottom: '6px',
            }}>
              {slide.tagline}
            </p>

            {/* Sub */}
            <p className="h-sub" style={{
              fontFamily: 'Hind, sans-serif', fontSize: '12px',
              color: '#4b5563', lineHeight: 1.5,
              marginBottom: '14px', fontWeight: 500,
            }}>
              {slide.sub}
            </p>

            {/* CTA Buttons */}
            <div className="h-btns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <a
                href={slide.btn2.href}
                className="mobile-btn-primary"
                onClick={(e) => handlePageLink(slide.btn2.href, e)}
              >
                {slide.btn2.label} <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
              <a
                href={slide.btn1.href}
                className="mobile-btn-secondary"
              >
                {slide.btn1.label} <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </div>

            {/* Dots */}
            <div className="h-dots" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`स्लाइड ${i + 1}`}
                  style={{
                    height: '7px',
                    width: i === current ? '32px' : '7px',
                    borderRadius: '999px',
                    background: i === current
                      ? 'linear-gradient(to right, #821905, #e05a3a)'
                      : 'rgba(130,25,5,0.2)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ── Desktop: Stats Bar at bottom ── */}
        <div className="hero-stats-bar desktop-only">
          {[
            { num: '50,000+', lbl: 'लाभार्थी परिवार' },
            { num: '15+',     lbl: 'वर्षों की सेवा' },
            { num: '3,250+',  lbl: 'सफल परियोजनाएं' },
            { num: '5,000+',  lbl: 'सक्रिय स्वयंसेवक' },
          ].map(({ num, lbl }, i) => (
            <div key={i} className="hero-stat-item">
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '22px', color: '#FDED95', margin: 0, lineHeight: 1 }}>
                  {num}
                </p>
                <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: '4px 0 0', fontWeight: 500 }}>
                  {lbl}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Arrow Controls (Desktop) ── */}
        <div className="desktop-only" style={{
          position: 'absolute', right: '28px', top: '50%',
          transform: 'translateY(-60%)', zIndex: 20,
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          {[
            { dir: -1, label: 'पिछली स्लाइड', Icon: ChevronLeft, isPrev: true },
            { dir: 1, label: 'अगली स्लाइड', Icon: ChevronRight, isPrev: false },
          ].map(({ dir, label, Icon, isPrev }) => (
            <button
              key={dir}
              onClick={() => goToSlide((current + dir + slides.length) % slides.length)}
              aria-label={label}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.25s ease',
                backdropFilter: 'blur(12px)',
                background: isPrev ? 'rgba(255,255,255,0.12)' : '#FDED95',
                border: isPrev ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #FDED95',
                color: isPrev ? '#fff' : '#821905',
                boxShadow: isPrev ? 'none' : '0 4px 16px rgba(253,237,149,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#FDED95'
                e.currentTarget.style.borderColor = '#FDED95'
                e.currentTarget.style.color = '#821905'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isPrev ? 'rgba(255,255,255,0.12)' : '#FDED95'
                e.currentTarget.style.borderColor = isPrev ? 'rgba(255,255,255,0.25)' : '#FDED95'
                e.currentTarget.style.color = isPrev ? '#fff' : '#821905'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Icon size={20} strokeWidth={2.5} />
            </button>
          ))}
        </div>

      </section>
    </>
  )
}

export default HeroSection
