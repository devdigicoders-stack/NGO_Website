import { useState, useEffect } from 'react'
import { handlePageLink } from '../utils/navigation'
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart, HandHeart, Sparkles } from 'lucide-react'

const bannerImages = [
  '/banner/banner1.png',
  '/banner/banner2.png',
  '/banner/banner3.png',
  '/banner/banner4.png',
  '/banner/banner5.png',
  '/banner/banner6.png',
  '/banner/banner7.png',
  '/banner/banner8.png',
  '/banner/banner9.png',
];

const slides = [
  {
    image: bannerImages[0],
    badge: 'भ्रष्टाचार मुक्त भारत',
    BadgeIcon: Sparkles,
    line1: 'आओ मिलकर बनाएं',
    line2: 'एक',
    highlight: 'भ्रष्टाचार मुक्त',
    line2end: 'समाज',
    tagline: 'सत्य, निष्ठा और सेवा हमारा संकल्प है।',
    sub: 'भ्रष्टाचार उन्मूलन अपराध अनुसंधान केन्द्र के साथ जुड़ें और देश से भ्रष्टाचार मिटाने में अपना योगदान दें।',
    btn1: { label: 'हमारे बारे में', href: '#about' },
    btn2: { label: 'सदस्य बनें', href: 'contact-page' },
  },
  {
    image: bannerImages[1],
    badge: 'सामाजिक न्याय',
    BadgeIcon: HandHeart,
    line1: 'हर नागरिक को मिले',
    line2: 'उसका',
    highlight: 'अधिकार',
    line2end: '',
    tagline: 'न्याय के लिए हमारी लड़ाई जारी है।',
    sub: 'हमारा उद्देश्य हर शोषित और पीड़ित वर्ग को न्याय दिलाना और उनके अधिकारों की रक्षा करना है।',
    btn1: { label: 'कानूनी सहायता', href: '#services' },
    btn2: { label: 'शिकायत करें', href: 'contact-page' },
  },
  {
    image: bannerImages[2],
    badge: 'समाज कल्याण',
    BadgeIcon: Heart,
    line1: 'जरूरतमंदों की',
    line2: 'सेवा ही सच्चा',
    highlight: 'धर्म',
    line2end: 'है',
    tagline: 'साधू लक्ष्मी जनकल्याण ट्रस्ट का संकल्प।',
    sub: 'समाज के सबसे कमजोर वर्ग के उत्थान के लिए हम निरंतर कार्य कर रहे हैं। इस पुनीत कार्य में हमारा साथ दें।',
    btn1: { label: 'प्रोजेक्ट्स', href: '#projects' },
    btn2: { label: 'दान करें', href: 'donate-page' },
  },
  {
    image: bannerImages[3],
    badge: 'महिला सशक्तिकरण',
    BadgeIcon: Sparkles,
    line1: 'नारी शक्ति का',
    line2: 'हो',
    highlight: 'सम्मान',
    line2end: '',
    tagline: 'महिलाएं देश का भविष्य हैं।',
    sub: 'हम महिलाओं को आत्मनिर्भर बनाने और उनके खिलाफ हो रहे अपराधों को रोकने के लिए प्रतिबद्ध हैं।',
    btn1: { label: 'महिला सुरक्षा', href: '#causes' },
    btn2: { label: 'जुड़ें', href: 'contact-page' },
  },
  {
    image: bannerImages[4],
    badge: 'बाल कल्याण',
    BadgeIcon: HandHeart,
    line1: 'हर बच्चे को मिले',
    line2: 'बेहतर',
    highlight: 'कल',
    line2end: '',
    tagline: 'शिक्षा और सुरक्षा बच्चों का अधिकार है।',
    sub: 'बच्चों के शोषण के खिलाफ आवाज उठाएं और उन्हें सुरक्षित भविष्य प्रदान करने में मदद करें।',
    btn1: { label: 'बाल अधिकार', href: '#causes' },
    btn2: { label: 'स्वयंसेवक', href: 'contact-page' },
  },
  {
    image: bannerImages[5],
    badge: 'अपराध अनुसंधान',
    BadgeIcon: Sparkles,
    line1: 'अपराध मुक्त हो',
    line2: 'हमारा',
    highlight: 'राष्ट्र',
    line2end: '',
    tagline: 'सतर्कता ही सुरक्षा की पहली सीढ़ी है।',
    sub: 'अपराधों को रोकने और अपराधियों को बेनकाब करने में हमारी संस्था प्रशासन के साथ मिलकर काम कर रही है।',
    btn1: { label: 'जागरूकता', href: '#campaigns' },
    btn2: { label: 'सूचना दें', href: 'contact-page' },
  },
  {
    image: bannerImages[6],
    badge: 'जन-जागरूकता',
    BadgeIcon: Heart,
    line1: 'अपने अधिकारों के प्रति',
    line2: 'बनें',
    highlight: 'जागरूक',
    line2end: '',
    tagline: 'जागरूक नागरिक ही बदलाव ला सकता है।',
    sub: 'कानून और अधिकारों की सही जानकारी होना सबसे बड़ा हथियार है। जागरूकता अभियानों का हिस्सा बनें।',
    btn1: { label: 'कार्यक्रम', href: '#events' },
    btn2: { label: 'संपर्क करें', href: 'contact-page' },
  },
  {
    image: bannerImages[7],
    badge: 'पर्यावरण संरक्षण',
    BadgeIcon: HandHeart,
    line1: 'प्रकृति की रक्षा ही',
    line2: 'जीवन की',
    highlight: 'सुरक्षा',
    line2end: 'है',
    tagline: 'आने वाली पीढ़ियों के लिए पर्यावरण बचाएं।',
    sub: 'स्वच्छ और हरित भारत के निर्माण के लिए हमारे वृक्षारोपण और स्वच्छता अभियानों से जुड़ें।',
    btn1: { label: 'पर्यावरण पहल', href: '#projects' },
    btn2: { label: 'सहयोग करें', href: 'donate-page' },
  },
  {
    image: bannerImages[8],
    badge: 'राष्ट्र निर्माण',
    BadgeIcon: Sparkles,
    line1: 'देश की सेवा में',
    line2: 'हमारा',
    highlight: 'योगदान',
    line2end: '',
    tagline: 'राष्ट्र सर्वोपरि।',
    sub: 'एक मजबूत, सुरक्षित और विकसित भारत के निर्माण में हम सब की भागीदारी सुनिश्चित करें।',
    btn1: { label: 'उपलब्धियां', href: '#achievements' },
    btn2: { label: 'सदस्यता लें', href: 'contact-page' },
  },
];

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

        /* ─── Background image & Layout Base ─── */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .hero-img-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          animation: imgKen 10s ease-out both;
        }

        /* ─── Desktop overlay ─── */
        .hero-overlay-desktop {
          display: none;
        }

        /* ─── Desktop accent bar ─── */
        .hero-accent-bar {
          display: none;
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

        /* ─── Desktop: hide mobile elements & Setup Split Layout ─── */
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
          .hero-stats-bar { display: flex; }
          
          .hero-section {
            display: flex !important;
            flex-direction: row-reverse !important; /* Put image on right, text on left */
            align-items: center !important;
            justify-content: center !important;
            gap: 40px !important;
            padding: 80px 40px 140px 40px !important;
            background: #050100 !important;
            min-height: calc(100vh - 80px) !important;
            position: relative;
            overflow: hidden;
          }
          
          .hero-img-wrapper {
            position: relative !important;
            inset: auto !important;
            width: 55% !important;
            max-width: 850px !important;
            flex: none !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 10 !important;
          }
          
          .hero-bg-img {
            width: 100% !important;
            height: auto !important;
            max-height: 78vh !important;
            object-fit: contain !important;
            border-radius: 16px !important;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) !important;
            animation: none !important;
          }
          
          .hero-content-wrapper { 
            position: relative !important;
            width: 42% !important; 
            max-width: 540px !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            margin: 0 !important;
            z-index: 10 !important;
          }
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .hero-stats-bar { display: none; }
          
          .hero-section {
            min-height: auto !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            background-color: #050100 !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .hero-img-wrapper {
            position: relative !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex;
            justify-content: center;
          }
          .hero-bg-img {
            height: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            object-fit: contain !important;
            object-position: center top !important;
            display: block;
            animation: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .hero-content-wrapper {
            padding: 0 !important;
            max-width: 100% !important;
          }

          /* Bottom content area */
          .hero-mobile-panel {
            background: linear-gradient(to top, rgba(5,1,0,0.95) 0%, rgba(5,1,0,0.4) 100%);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 24px 24px 44px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            border-top: 1px solid rgba(255,255,255,0.08);
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            z-index: 10;
            position: relative;
            margin-top: -20px;
          }

          /* Mobile buttons */
          .mobile-btn-primary {
            display: flex; align-items: center; justify-content: center; gap: 6px;
            width: 100%;
            padding: 14px 16px;
            border-radius: 999px;
            background: linear-gradient(135deg, #FDED95 0%, #f5d76e 100%);
            color: #111827;
            font-family: 'Hind', sans-serif;
            font-weight: 800;
            font-size: 14.5px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(253,237,149,0.3);
            transition: all 0.25s ease;
            letter-spacing: 0.02em;
          }
          .mobile-btn-secondary {
            display: flex; align-items: center; justify-content: center; gap: 6px;
            width: 100%;
            padding: 14px 16px;
            border-radius: 999px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.25);
            backdrop-filter: blur(10px);
            color: #ffffff;
            font-family: 'Hind', sans-serif;
            font-weight: 700;
            font-size: 14.5px;
            text-decoration: none;
            cursor: pointer;
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
      >

        {/* ── Dynamic Immersive Blurred Background ── */}
        <div 
          className="hero-dynamic-bg"
          style={{
            position: 'absolute',
            inset: -20, /* expand slightly to avoid blurred edges showing */
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <img
            src={slide.image}
            alt="bg"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'blur(40px) brightness(0.45)',
              transform: 'scale(1.1)',
              opacity: animating ? 0 : 1,
              transition: 'opacity 0.55s ease',
            }}
          />
        </div>

        {/* ── Main Hero Image (Foreground) ── */}
        <div 
          className="hero-img-wrapper"
          style={{
            opacity: animating ? 0 : 1,
            transition: 'opacity 0.55s ease',
            zIndex: 10,
          }}
        >
          <img
            src={slide.image}
            alt="हीरो बैनर"
            className="hero-bg-img"
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
              padding: '36px 40px',
              marginLeft: '60px',
              maxWidth: '680px',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.7)',
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
              borderRadius: '999px', padding: '6px 16px',
              marginBottom: '20px',
            }}>
              <BadgeIcon size={14} style={{ color: '#FDED95', fill: '#FDED95', flexShrink: 0 }} />
              <span style={{
                color: '#FDED95', fontWeight: 600, fontSize: '11px',
                letterSpacing: '0.14em', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase',
              }}>
                {slide.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="h-title" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#fff',
              lineHeight: 1.15, margin: 0, marginBottom: '14px',
              fontSize: 'clamp(28px, 3.2vw, 46px)',
            }}>
              <span style={{ display: 'block', marginBottom: '4px' }}>{slide.line1}</span>
              <span style={{ display: 'block' }}>
                {slide.line2}{' '}
                <span style={{
                  color: '#FDED95',
                  textShadow: '0 0 30px rgba(253,237,149,0.4)',
                  position: 'relative',
                }}>
                  {slide.highlight}
                </span>
                {slide.line2end && <> {slide.line2end}</>}
              </span>
            </h1>

            {/* Tagline */}
            <p className="h-tag" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 500,
              fontSize: 'clamp(14px, 1.3vw, 18px)',
              color: 'rgba(255,255,255,0.88)', lineHeight: 1.4, marginBottom: '12px',
            }}>
              {slide.tagline}
            </p>

            {/* Sub */}
            <p className="h-sub" style={{
              fontFamily: 'Hind, sans-serif', fontSize: '14px',
              color: 'rgba(255,255,255,0.7)', lineHeight: 1.7,
              marginBottom: '28px', maxWidth: '520px', fontWeight: 400,
            }}>
              {slide.sub}
            </p>

            {/* CTA Buttons */}
            <div className="h-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
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
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #FDED95 0%, #f5d76e 100%)',
              padding: '8px 16px', borderRadius: '999px',
              marginBottom: '16px',
              boxShadow: '0 4px 14px rgba(253,237,149,0.4)',
            }}>
              <Sparkles size={12} style={{ color: '#821905', flexShrink: 0 }} />
              <span style={{
                color: '#111827', fontWeight: 800, fontSize: '10.5px',
                letterSpacing: '0.12em', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase',
              }}>
                {slide.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="h-title" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 900,
              color: '#ffffff', lineHeight: 1.35,
              margin: 0, marginBottom: '14px',
              fontSize: '25px',
            }}>
              <span style={{ display: 'block', marginBottom: '4px' }}>{slide.line1}</span>
              <span style={{ display: 'block' }}>
                {slide.line2}{' '}
                <span style={{
                  color: '#111827',
                  background: 'linear-gradient(135deg, #FDED95, #f5d76e)',
                  padding: '2px 10px', borderRadius: '6px',
                  display: 'inline-block',
                  boxShadow: '0 3px 8px rgba(253,237,149,0.2)',
                }}>
                  {slide.highlight}
                </span>
                {slide.line2end && <> {slide.line2end}</>}
              </span>
            </h1>

            {/* Tagline */}
            <p className="h-tag" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 600,
              fontSize: '14.5px', color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.5, marginBottom: '10px',
            }}>
              {slide.tagline}
            </p>

            {/* Sub */}
            <p className="h-sub" style={{
              fontFamily: 'Hind, sans-serif', fontSize: '13.5px',
              color: 'rgba(255,255,255,0.75)', lineHeight: 1.6,
              marginBottom: '24px', fontWeight: 400,
            }}>
              {slide.sub}
            </p>

            {/* CTA Buttons */}
            <div className="h-btns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', marginBottom: '16px' }}>
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
