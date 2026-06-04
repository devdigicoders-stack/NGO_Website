import { useState, useEffect } from 'react'
import { handlePageLink } from '../utils/navigation'
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart, HandHeart } from 'lucide-react'

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
    sub: 'सहायता फाउंडेशन के साथ जुड़ें और उन लोगों के जीवन में बदलाव लाएं जिन्हें आपकी मदद की सबसे ज़्यादा जरूरत है। आपका एक छोटा योगदान किसी के जीवन को पूरी तरह बदल सकता है।',
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
    sub: 'हम प्रतिबद्ध हैं कि भारत का हर बच्चा गुणवत्तापूर्ण शिक्षा पाए। स्कूल छोड़ने वाले बच्चों को वापस लाना और उन्हें एक उज्जवल भविष्य देना हमारा संकल्प है।',
    btn1: { label: 'हमारे कार्यक्रम', href: '#causes' },
    btn2: { label: 'स्वयंसेवक बनें', href: 'contact-page' },
  },
]


const HeroSection = () => {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => goToSlide((current + 1) % slides.length), 6500)
    return () => clearInterval(timer)
  }, [current])

  const goToSlide = (index) => {
    if (animating || index === current) return
    setAnimating(true)
    setTimeout(() => { setCurrent(index); setAnimating(false) }, 350)
  }

  const slide = slides[current]
  const BadgeIcon = slide.BadgeIcon

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
      className="hero-section"
    >
      {/* ── Background ── */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: animating ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}>
        <img
          src={slide.image}
          alt="हीरो बैनर"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* ── Main Content — same container as Navbar ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1280px',
        margin: '0 auto',
      }}
        className="hero-content-wrapper"
      >

        {/* Yellow left accent bar */}
        <div className="hero-accent-bar" style={{
          position: 'absolute',
          left: 0, bottom: '60px',
          width: '4px', height: '180px',
          background: '#FDED95',
          borderRadius: '0 4px 4px 0',
        }} />

        {/* Content block — left aligned, max half width on large screens */}
        <div
          style={{
            paddingLeft: '20px',
            maxWidth: '620px',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(16px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >

          {/* Badge */}
          <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '2px', background: '#FDED95', borderRadius: '2px' }} />
            <BadgeIcon size={14} style={{ color: '#FDED95', fill: '#FDED95', flexShrink: 0 }} />
            <span style={{
              color: '#FDED95', fontWeight: 600, fontSize: '12px',
              letterSpacing: '0.12em', fontFamily: 'Hind, sans-serif',
              textTransform: 'uppercase',
            }}>
              {slide.badge}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up-delay-1"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              margin: 0,
              marginBottom: '16px',
            }}
          >
            <span style={{ display: 'block', fontSize: 'clamp(26px, 3.2vw, 42px)', marginBottom: '6px' }}>
              {slide.line1}
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(26px, 3.2vw, 42px)' }}>
              {slide.line2}{' '}
              <em style={{ fontStyle: 'normal', color: '#FDED95', textShadow: '0 0 30px rgba(253, 237, 149,0.3)' }}>
                {slide.highlight}
              </em>
              {slide.line2end && <> {slide.line2end}</>}
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="animate-fade-up-delay-2"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.4,
              marginBottom: '20px',
            }}
          >
            {slide.tagline}
          </p>

          {/* Subtext */}
          <p
            className="animate-fade-up-delay-2"
            style={{
              fontFamily: 'Hind, sans-serif',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75,
              marginBottom: '36px',
              maxWidth: '560px',
            }}
          >
            {slide.sub}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '40px' }}>
            <a
              href={slide.btn1.href}
              className="btn-outline"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '999px',
                fontSize: '14px', fontFamily: 'Hind, sans-serif', fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {slide.btn1.label} <ArrowUpRight size={16} />
            </a>
            <a
              href={slide.btn2.href}
              className="btn-primary"
              onClick={(e) => handlePageLink(slide.btn2.href, e)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '999px',
                fontSize: '14px', fontFamily: 'Hind, sans-serif', fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {slide.btn2.label} <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Slider Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`स्लाइड ${i + 1}`}
                className={`slider-dot ${i === current ? 'active' : ''}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── Arrow Controls ── */}
      <div className="hidden md:flex" style={{
        position: 'absolute', right: '24px', top: '50%',
        transform: 'translateY(-50%)', zIndex: 20,
        flexDirection: 'column', gap: '10px',
      }}>
        {[
          { dir: -1, label: 'पिछली स्लाइड', Icon: ChevronLeft, style: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' } },
          { dir: 1,  label: 'अगली स्लाइड',  Icon: ChevronRight, style: { background: '#FDED95', border: '1px solid #FDED95', color: '#821905' } },
        ].map(({ dir, label, Icon, style: s }) => (
          <button
            key={dir}
            onClick={() => goToSlide((current + dir + slides.length) % slides.length)}
            aria-label={label}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
              ...s,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FDED95'; e.currentTarget.style.borderColor = '#FDED95'; e.currentTarget.style.color = '#821905' }}
            onMouseLeave={e => { e.currentTarget.style.background = s.background; e.currentTarget.style.borderColor = s.border; e.currentTarget.style.color = s.color }}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>



    </section>
  )
}

export default HeroSection
