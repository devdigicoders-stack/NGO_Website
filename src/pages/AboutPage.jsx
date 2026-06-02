import { useState } from 'react'
import { Heart, Phone, ArrowUpRight, CheckCircle2, Play, ChevronDown, ChevronRight, Check } from 'lucide-react'
import TeamSection from '../sections/TeamSection'
import Testimonials from '../sections/Testimonials'
import DonationQueryFormSection from '../sections/DonationQueryFormSection'

const AboutPage = () => {
  const bullets = [
    '3,250+ सफल सामाजिक परियोजनाओं का संचालन किया है।',
    'हम हर गरीब और वंचित बच्चे को शिक्षा का उपहार देते हैं।',
    'हम कंपनियों को उनके सामाजिक उत्तरदायित्व (CSR) को सुदृढ़ करने में मदद करते हैं।',
  ]

  return (
    <div style={{ background: '#ffffff', overflow: 'hidden' }}>
      
      {/* ─── Self-Contained Styles for Page Hero & Collage ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes hero-float-heart {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-hero-heart {
          animation: hero-float-heart 7s ease-in-out infinite;
        }
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

      {/* ─── 1. About Us Hero Banner ─── */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #05160e 0%, #0c351e 100%)',
          height: '280px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        {/* Grayscale Background Image (Luminosity Mix-Blend) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.22,
            mixBlendMode: 'luminosity',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <img 
            src="/images/volunteer_child.png" 
            alt="children support hero backdrop" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />
          {/* Subtle overlay gradients */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #05160e 10%, transparent 50%, #05160e 90%)',
            }}
          />
        </div>

        {/* Left Side: Floating Gold Heart Outline */}
        <div 
          className="animate-hero-heart"
          style={{
            position: 'absolute',
            left: '6%',
            top: '25%',
            pointerEvents: 'none',
            zIndex: 1,
            color: '#f5b400',
            opacity: 0.85,
          }}
        >
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(245,180,0,0.25))' }}
          >
            <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
          </svg>
        </div>

        {/* Center Captions Content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          
          {/* Script Green-badge Subtext */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span 
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", 
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '18px', 
                color: '#ffd54f',
                letterSpacing: '0.04em',
                textShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              ✍️ गरीब लोगों को दान देना शुरू करें
            </span>
          </div>

          {/* Heading title */}
          <h1 
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '44px',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 10px rgba(0,0,0,0.35)',
            }}
          >
            हमारे बारे में
          </h1>

        </div>

      </div>


      {/* ─── 2. Main About Us Collage & Details Section ─── */}
      <section style={{ background: '#ffffff', padding: '90px 0 100px', position: 'relative' }}>
        
        {/* Background Decorative Faint Heart (Right edge) */}
        <div 
          className="animate-hero-heart"
          style={{
            position: 'absolute',
            right: '4%',
            top: '38%',
            pointerEvents: 'none',
            zIndex: 1,
            color: '#1a5c38',
            opacity: 0.12,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
          </svg>
        </div>


        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          
          <div 
            className="about-main-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            
            {/* LEFT COLUMN: Visual Overlapping Image Collage */}
            <div className="about-collage-perspective">
              
              {/* Faint Hand Outline (Far Left Backdrop) */}
              <div style={{ position: 'absolute', left: '-56px', top: '15%', opacity: 0.05, pointerEvents: 'none', zIndex: 0, color: '#1a5c38' }}>
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
                <svg width="60" height="100" fill="#f5b400" opacity="0.8">
                  <pattern id="collageDots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2.5" cy="2.5" r="2" />
                  </pattern>
                  <rect width="60" height="100" fill="url(#collageDots)" />
                </svg>
              </div>

              {/* Green Hand-drawn Wavy Curve SVG (Above Large Card) */}
              <div style={{ position: 'absolute', top: '10px', left: '160px', zIndex: 0, opacity: 0.85 }}>
                <svg width="120" height="24" viewBox="0 0 120 24" fill="none" stroke="#1a5c38" strokeWidth="2.5">
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
                  background: '#005f3c',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,95,60,0.25)',
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
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,92,56,0.18)' }} />

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
                  <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" stroke="#1a5c38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 14C8.5 14.5 9.5 15 12 15C14.5 15 15.5 14.5 17 14" stroke="#1a5c38" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span 
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif", 
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: '18px', 
                    color: '#1a5c38',
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
                      background: 'rgba(245,180,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5b400" strokeWidth="2">
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
                      background: 'rgba(26,92,56,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a5c38" strokeWidth="2">
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
                  href="contact-page"
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('navigate-contact')) }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '13px 30px',
                    borderRadius: '999px',
                    background: '#1a5c38',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    fontFamily: 'Hind, sans-serif',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 14px rgba(26,92,56,0.3)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,92,56,0.4)'; e.currentTarget.style.background = '#124027' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,92,56,0.3)'; e.currentTarget.style.background = '#1a5c38' }}
                >
                  संपर्क करें <ArrowUpRight size={15} />
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
                    <Phone size={16} style={{ color: '#1a5c38' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>
                      फ़ोन नंबर
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>
                      +236 (456) 896 22
                    </p>
                  </div>
                </a>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ─── 3. Dynamic Mid-Page Donation CTA Banner ─── */}
      <section 
        style={{
          background: 'linear-gradient(135deg, #05160e 0%, #0c351e 100%)',
          padding: '100px 0 110px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Grayscale Background Image (Luminosity Mix-Blend) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            mixBlendMode: 'luminosity',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <img 
            src="/images/donation_children.png" 
            alt="children support donation backdrop" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />
          {/* Subtle overlay gradients */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #05160e 20%, transparent 60%, #05160e 90%)',
            }}
          />
        </div>

        {/* Left Side: Golden Paint Splash / Brush Stroke Graphic */}
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 120 300" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.95 }}>
            {/* Textured paint stroke SVG paths */}
            <path d="M -20,-10 C 20,40 50,90 25,140 C -2,180 35,230 55,280 C 65,300 40,320 -20,320 Z" fill="#f5b400" />
            <path d="M -20,20 C 15,60 35,100 12,150 C -5,190 25,240 45,290 C 52,305 25,320 -20,320 Z" fill="#ffd54f" opacity="0.6" />
            {/* Splash dots */}
            <circle cx="30" cy="50" r="3.5" fill="#f5b400" />
            <circle cx="42" cy="110" r="5" fill="#f5b400" />
            <circle cx="58" cy="170" r="2.5" fill="#ffd54f" />
            <circle cx="62" cy="220" r="4" fill="#f5b400" />
            <circle cx="48" cy="260" r="2.5" fill="#f5b400" />
            <circle cx="32" cy="295" r="4.5" fill="#ffd54f" />
            {/* Streaks */}
            <path d="M -20,70 Q 55,105 35,125 T -20,165" stroke="#f5b400" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M -20,200 Q 65,230 45,250 T -20,290" stroke="#ffd54f" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Center Content */}
        <div 
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: '0 24px', 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 10 
          }}
        >
          {/* Cursive Subtitle Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span 
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", 
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '18px', 
                color: '#ffd54f',
                letterSpacing: '0.04em',
                textShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              ✍️ जरूरतमंदों को दान देना शुरू करें
            </span>
          </div>

          {/* Heading */}
          <h2 
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 40px)',
              color: '#ffffff',
              lineHeight: 1.25,
              margin: '0 0 32px',
              textShadow: '0 4px 12px rgba(0,0,0,0.35)',
            }}
          >
            आज ही दान देकर जरूरतमंद बच्चों की मदद करें
          </h2>

          {/* Two CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {/* Discover More Outline Pill Button */}
            <a
              href="#about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 30px',
                borderRadius: '999px',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(4px)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'Hind, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.color = '#05160e'
                e.currentTarget.style.borderColor = '#ffffff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              और जानें <ArrowUpRight size={15} />
            </a>

            {/* Get A Quote Text Link */}
            <a
              href="contact-page"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('navigate-contact')) }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'Hind, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ffd54f'; e.currentTarget.style.transform = 'translateX(2px)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateX(0)' }}
            >
              कोटेशन प्राप्त करें <ArrowUpRight size={15} />
            </a>
          </div>

        </div>

        {/* Bottom Organic Paper-Tear Edge Divider */}
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '32px', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 40" fill="#ffffff" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,40 L1440,40 L1440,10 L1400,18 L1360,5 L1320,22 L1280,12 L1240,28 L1200,8 L1160,20 L1120,4 L1080,24 L1040,14 L1000,28 L960,6 L920,18 L880,12 L840,26 L800,8 L760,22 L720,10 L680,25 L640,12 L600,28 L560,6 L520,20 L480,10 L440,24 L400,8 L360,22 L320,12 L280,28 L240,6 L200,18 L160,10 L120,24 L80,8 L40,20 L0,12 Z" />
          </svg>
        </div>

      </section>

      {/* ─── Volunteer Team Section (Highly visual) ─── */}
      <TeamSection />

      {/* ─── 4. FAQ Accordion & Organic Torn Paper Collage Section ─── */}
      <FAQSection />

      {/* ─── 5. Testimonials Section (Feedback & Reviews) ─── */}
      <Testimonials />

      {/* ─── 6. Donation / Contact Form Split Section ─── */}
      <DonationQueryFormSection source="about_page" />

      {/* ─── 7. Donate Support Difference Section ─── */}
      <DonateSupportSection />

    </div>
  )
}

const FAQSection = () => {
  const [activeIdx, setActiveIdx] = useState(0)

  const faqs = [
    {
      q: 'मैं सहायता फाउंडेशन में दान कैसे कर सकता हूँ?',
      a: 'आप हमारी वेबसाइट पर "दान करें" बटन पर क्लिक करके सीधे ऑनलाइन सुरक्षित भुगतान (UPI, कार्ड, नेट बैंकिंग) के माध्यम से दान कर सकते हैं। आपका हर योगदान एक बच्चे के जीवन को संवारता है।'
    },
    {
      q: 'मेरा दान किया हुआ पैसा कहाँ उपयोग होता है?',
      a: 'आपका दान सीधे बच्चों की पौष्टिक भोजन व्यवस्था, गुणवत्तापूर्ण बाल शिक्षा, स्कूल सामग्री और स्वास्थ्य सहायता कार्यक्रमों में निवेश किया जाता है। हम पाई-पाई की पारदर्शिता बनाए रखते हैं।'
    },
    {
      q: 'क्या मैं स्वयंसेवक (Volunteer) के रूप में जुड़ सकता हूँ?',
      a: 'हाँ! हम हमेशा नए स्वयंसेवकों का स्वागत करते हैं। आप हमारे "स्वयंसेवक बनें" फ़ॉर्म को भरकर हमारी सामाजिक गतिविधियों और ऑन-ग्राउंड पहलों में सीधे योगदान दे सकते हैं।'
    },
    {
      q: 'क्या दान की गई राशि पर टैक्स छूट (Tax Benefit) मिलती है?',
      a: 'हाँ, सहायता फाउंडेशन के माध्यम से किया गया सभी दान आयकर अधिनियम की धारा 80G के तहत टैक्स छूट के लिए पात्र है। दान के पश्चात आपको ईमेल द्वारा 80G सर्टिफिकेट प्रदान किया जाएगा।'
    }
  ]

  return (
    <section 
      style={{ 
        background: '#ffffff', 
        borderTop: '1px solid #f0f0f0', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
          .faq-green-col {
            height: 400px !important;
          }
          .faq-green-col svg {
            transform: rotate(90deg);
            width: 100% !important;
            height: 20px !important;
            top: -2px !important;
            bottom: auto !important;
            left: 0 !important;
            right: 0 !important;
          }
        }
      `}} />

      <div 
        className="faq-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          minHeight: '600px',
        }}
      >
        {/* LEFT COLUMN: FAQ Accordion */}
        <div 
          style={{
            padding: '90px 6% 90px 8%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Cursive Subtitle Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span 
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", 
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '18px', 
                color: '#1a5c38',
                letterSpacing: '0.02em',
              }}
            >
              ✍️ जरूरतमंदों को दान देना शुरू करें
            </span>
          </div>

          {/* Heading */}
          <h2 
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              color: '#111827',
              lineHeight: 1.25,
              margin: '0 0 40px',
            }}
          >
            अक्सर पूछे जाने वाले प्रश्न
          </h2>

          {/* Accordion Wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((item, idx) => {
              const isActive = activeIdx === idx
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Header Bar */}
                  <div
                    onClick={() => setActiveIdx(isActive ? -1 : idx)}
                    style={{
                      background: isActive ? '#005f3c' : '#ffffff',
                      border: '1.5px solid #e5e7eb',
                      borderColor: isActive ? '#005f3c' : '#e5e7eb',
                      borderRadius: isActive ? '14px 14px 0 0' : '14px',
                      padding: '18px 24px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: isActive ? '#ffffff' : '#111827',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = '#1a5c38'
                        e.currentTarget.style.color = '#1a5c38'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                        e.currentTarget.style.color = '#111827'
                      }
                    }}
                  >
                    <span 
                      style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 700, 
                        fontSize: '15px',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.q}
                    </span>
                    {isActive ? (
                      <ChevronDown size={18} strokeWidth={2.5} style={{ transform: 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
                    ) : (
                      <ChevronRight size={18} strokeWidth={2.5} style={{ transition: 'transform 0.3s ease' }} />
                    )}
                  </div>

                  {/* Body Content */}
                  {isActive && (
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #e5e7eb',
                        borderTop: 'none',
                        borderRadius: '0 0 14px 14px',
                        padding: '20px 24px',
                        color: '#6b7280',
                        fontFamily: 'Hind, sans-serif',
                        fontSize: '14px',
                        lineHeight: 1.7,
                        animation: 'faqSlideDown 0.3s ease-out',
                      }}
                    >
                      <style dangerouslySetInnerHTML={{__html: `
                        @keyframes faqSlideDown {
                          from { opacity: 0; transform: translateY(-8px); }
                          to { opacity: 1; transform: translateY(0); }
                        }
                      `}} />
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: Dark Green Visual Block with Overlapping Photos */}
        <div 
          className="faq-green-col"
          style={{
            background: '#041d11',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Vertical Organic Torn-Paper SVG divider on the left edge */}
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              bottom: 0, 
              left: '-2px', 
              width: '20px', 
              zIndex: 5, 
              pointerEvents: 'none' 
            }}
          >
            <svg viewBox="0 0 20 600" fill="#ffffff" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <path d="M20,0 L0,0 L0,600 L20,600 L8,580 L18,560 L5,540 L16,520 L8,500 L18,480 L6,460 L15,440 L7,420 L16,400 L9,380 L18,360 L6,340 L16,320 L7,300 L15,280 L8,260 L18,240 L6,220 L15,200 L9,180 L18,160 L7,140 L15,120 L9,100 L18,80 L7,60 L15,40 L9,20 Z" />
            </svg>
          </div>

          {/* Collage Images container */}
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '440px', 
              height: '420px' 
            }}
          >
            
            {/* Image 1: Main Tall Grayscale Photo */}
            <div
              style={{
                position: 'absolute',
                left: '20px',
                top: '0px',
                width: '270px',
                height: '380px',
                border: '6px solid #ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            >
              <img 
                src="/images/about_child3.png" 
                alt="children playing" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(105%) brightness(95%)',
                }}
              />
            </div>

            {/* Image 2: Small Color Overlapping Photo on the right */}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                top: '60px',
                width: '210px',
                height: '210px',
                border: '6px solid #ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                zIndex: 3,
              }}
            >
              <img 
                src="/images/about_child1.png" 
                alt="happy children" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

const DonateSupportSection = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const tabContent = {
    mission: {
      desc: "दान जरूरतमंदों की मदद करने का एक स्वैच्छिक कार्य है, जो आमतौर पर धन, समय या संसाधनों के रूप में होता है। धर्मार्थ संगठनों का उद्देश्य गरीबी जैसे मुद्दों को संबोधित करके सामाजिक, पर्यावरणीय और आर्थिक चुनौतियों का समाधान करना है।",
      bullets: [
        "हम कंपनियों को एक मजबूत सामाजिक उत्तरदायित्व (CSR) विकसित करने में मदद करते हैं",
        "3,265 से अधिक सामाजिक व लोक कल्याणकारी परियोजनाओं को सफल बनाया है",
        "समर्पित तकनीकी और सामाजिक सेवा दल"
      ]
    },
    vision: {
      desc: "हमारा दृष्टिकोण एक ऐसा आत्मनिर्भर पारिस्थितिकी तंत्र बनाना है जहां प्रत्येक वंचित बच्चे को व्यापक स्वास्थ्य सेवा, स्वच्छ पोषण और वैश्विक स्तर की शिक्षा मिले, जिससे वे अपनी पूर्ण क्षमता का विकास कर सकें।",
      bullets: [
        "वैश्विक आउटरीच और शैक्षिक सहयोग कार्यक्रम",
        "प्रत्येक योग्य बच्चे के लिए समान अवसर सुनिश्चित करना",
        "सतत विकास और उन्नत तकनीकी एकीकरण"
      ]
    },
    excellence: {
      desc: "हम पेशेवर नैतिकता, परिचालन पारदर्शिता और वित्तीय जवाबदेही के उच्चतम मानकों का पालन करते हैं, जिससे यह सुनिश्चित होता है कि हर योगदान का अधिकतम प्रभाव हो।",
      bullets: [
        "100% ऑडिट पारदर्शिता और प्रत्यक्ष जमीनी कार्यान्वयन",
        "पुरस्कार विजेता सामाजिक कल्याण और पर्यावरणीय प्रभाव पहल",
        "अत्यधिक कुशल परिचालन प्रक्रियाएं"
      ]
    }
  };

  const current = tabContent[activeTab];

  return (
    <section 
      style={{
        background: '#ffffff',
        padding: '90px 0 100px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      
      {/* Top Right Heart Watermark */}
      <div 
        style={{
          position: 'absolute',
          right: '5%',
          top: '40px',
          color: '#005f3c',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-8deg)' }}>
          <path d="M50,30 C50,30 46,14 31,14 C16,14 11,28 26,48 C41,68 50,83 50,83 C50,83 59,68 74,48 C89,28 84,14 69,14 C54,14 50,30 50,30 Z" strokeWidth="2.2" />
          <path d="M52,32 C52,32 48,17 34,17 C21,17 16,30 29,49 C42,68 52,82 52,82" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tabContentFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-fade-in {
          animation: tabContentFade 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @media (max-width: 900px) {
          .donate-support-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          .donate-support-collage {
            margin: 0 auto 30px !important;
          }
          .donate-support-stats-box {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        <div 
          className="donate-support-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '70px',
            alignItems: 'center',
          }}
        >
          
          {/* LEFT COLUMN: Visual Overlapping Image Collage */}
          <div 
            className="donate-support-collage"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              height: '480px',
              margin: '0 auto',
            }}
          >
            {/* Dotted Grid Background Accent */}
            <div 
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '140px',
                height: '140px',
                backgroundImage: 'radial-gradient(#ffd54f 2px, transparent 2px)',
                backgroundSize: '16px 16px',
                opacity: 0.4,
                zIndex: 0,
              }}
            />

            {/* Main Photo Card (Grayscale Child Portrait) */}
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '80%',
                height: '80%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '6px solid #ffffff',
                zIndex: 1,
              }}
            >
              <img 
                src="/images/about_child2.png" 
                alt="child portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.9)',
                }}
              />
            </div>

            {/* Foreground Photo Card (Color Smiling Running Boy) */}
            <div 
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '55%',
                height: '55%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '8px solid #ffffff',
                zIndex: 2,
              }}
            >
              <img 
                src="/images/volunteer_child.png" 
                alt="happy smiling boy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Floating Gold Sparkle Accent */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '40px',
                color: '#ffd54f',
                zIndex: 3,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
              </svg>
            </div>

          </div>

          {/* RIGHT COLUMN: Copywriting, Tabs, Progress & Stats */}
          <div>
            
            {/* Cursive Subtitle Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ color: '#005f3c', display: 'flex', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" />
                </svg>
              </span>
              <span 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px', 
                  color: '#005f3c',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                जरूरतमंदों को दान देना शुरू करें
              </span>
            </div>

            {/* Title Header */}
            <h2 
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(26px, 3.2vw, 36px)',
                color: '#111827',
                lineHeight: 1.2,
                margin: '0 0 20px',
              }}
            >
              दान से समाज में बड़ा बदलाव लाएं
            </h2>

            {/* Dynamic Tab Content Wrapper */}
            <div key={activeTab} className="tab-fade-in">
              {/* Paragraph Description */}
              <p 
                style={{
                  fontFamily: 'Hind, sans-serif',
                  fontSize: '14.5px',
                  color: '#6b7280',
                  lineHeight: 1.75,
                  margin: '0 0 24px',
                }}
              >
                {current.desc}
              </p>

              {/* Tabs Bar */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1.5px solid #f3f4f6', paddingBottom: '16px', marginBottom: '24px' }}>
                {['mission', 'vision', 'excellence'].map((tab) => {
                  const label = tab === 'mission' ? 'हमारा मिशन' : tab === 'vision' ? 'हमारा दृष्टिकोण' : 'उत्कृष्टता';
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        padding: '10px 24px',
                        borderRadius: '999px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        background: isActive ? '#005f3c' : 'transparent',
                        color: isActive ? '#ffffff' : '#6b7280',
                        boxShadow: isActive ? '0 4px 12px rgba(0, 95, 60, 0.15)' : 'none',
                        transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                        transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#005f3c';
                          e.currentTarget.style.background = 'rgba(26, 92, 56, 0.04)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#6b7280';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Checkmark Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {current.bullets.map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(0, 95, 60, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} style={{ color: '#005f3c', strokeWidth: 3 }} />
                    </div>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500, color: '#4b5563', lineHeight: 1.5 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Two SVG Circular Progress Bars */}
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '36px' }}>
              
              {/* Progress 1: 75% Treatment Helping */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                  <svg width="56" height="56" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#005f3c" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" />
                  </svg>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif' }}>
                    75%
                  </span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#111827', margin: 0 }}>
                    चिकित्सा सहायता
                  </h4>
                </div>
              </div>

              {/* Progress 2: 90% Highest Fund Raised */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                  <svg width="56" height="56" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#005f3c" strokeWidth="3" strokeDasharray="90, 100" strokeLinecap="round" />
                  </svg>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif' }}>
                    90%
                  </span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#111827', margin: 0 }}>
                    अधिकतम कोष जुटाया गया
                  </h4>
                </div>
              </div>
            </div>

            {/* Bottom Dual Stats Display Container */}
            <div 
              className="donate-support-stats-box"
              style={{
                background: '#fafafa',
                border: '1.5px solid #e5e7eb',
                borderRadius: '18px',
                padding: '24px 30px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
              }}
            >
              
              {/* Stats Col 1: Donate Now */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(26,92,56,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a5c38" strokeWidth="2.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                    <path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '11.5px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 2px' }}>
                    अभी दान करें
                  </p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>
                    ₹40,456
                  </p>
                </div>
              </div>

              {/* Stats Col 2: Total Fundraised */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '1.5px solid #e5e7eb', paddingLeft: '30px' }} className="stats-divider-left">
                <style dangerouslySetInnerHTML={{__html: `
                  @media (max-width: 900px) {
                    .stats-divider-left {
                      border-left: none !important;
                      padding-left: 0 !important;
                    }
                  }
                `}} />
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,180,0,0.1)', display: 'flex', alignItems: 'center', justifyContainer: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5b400" strokeWidth="2.5">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '11.5px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 2px' }}>
                    कुल एकत्रित कोष
                  </p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '17px', fontWeight: 800, color: '#1a5c38', margin: 0 }}>
                    ₹15,40,456
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutPage
