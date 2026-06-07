import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { l: 'हमारे बारे में', page: 'about'    },
  { l: 'ताज़ा समाचार',  page: 'news'     },
  { l: 'दान करें',      page: 'donate'   },
  { l: 'संपर्क करें',   page: 'contact'  },
  { l: 'पंजीकरण',       page: 'register' },
]

const SERVICE_LINKS = [
  { name: 'शिक्षा सहायता',       target: 'causes'        },
  { name: 'स्वास्थ्य सेवा',       target: 'causes'        },
  { name: 'महिला सशक्तिकरण',     target: 'causes'        },
  { name: 'पौष्टिक भोजन',         target: 'causes'        },
  { name: 'स्वयंसेवा कार्यक्रम', target: 'volunteer-call', page: 'contact' },
]

const GoldDash = () => (
  <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
    <div style={{ width: '14px', height: '2.5px', background: '#FDED95', borderRadius: '2px' }} />
    <div style={{ width: '5px',  height: '2.5px', background: '#FDED95', borderRadius: '2px' }} />
  </div>
)

/* Collapsible accordion for mobile columns */
const MobileAccordion = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 0', color: '#fff',
          fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px',
        }}
      >
        {title}
        <span style={{ fontSize: '18px', color: '#FDED95', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: '16px' }}>
          {children}
        </div>
      )}
    </div>
  )
}

const Footer = ({ setCurrentPage }) => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{ background: '#1f0502', color: '#fff', padding: '50px 0 28px', position: 'relative', overflow: 'hidden' }}>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes footer-float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(2.5deg); }
        }
        .animate-footer-heart { animation: footer-float-slow 8s ease-in-out infinite; }

        /* ── Links ── */
        .footer-link-item {
          display: flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.5);
          font-family: 'Hind', sans-serif; font-size: 13.5px; font-weight: 500;
          text-decoration: none; transition: all 0.25s ease; margin-bottom: 10px;
        }
        .footer-link-item:hover { color: #FDED95; transform: translateX(4px); }

        /* ── Social buttons ── */
        .footer-social-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none; transition: all 0.25s ease;
        }
        .footer-social-btn:hover { background: #FDED95; color: #1f0502; border-color: #FDED95; transform: translateY(-2px); }

        /* ── Desktop 4-col grid ── */
        .footer-links-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr 0.9fr 1fr;
          gap: 40px;
          margin-bottom: 44px;
        }
        /* ── Desktop accordion: hidden ── */
        .footer-mobile-accordion { display: none; }

        /* ── Bottom bar ── */
        .footer-bottom-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          gap: 16px; flex-wrap: wrap;
        }
        .footer-credit-link { color: #FDED95; font-weight: 650; text-decoration: none; transition: color 0.2s; }
        .footer-credit-link:hover { color: #fff; text-decoration: underline; }

        /* ── Tablet: 2-col ── */
        @media (max-width: 1024px) {
          .footer-links-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }

        /* ── Mobile: switch to accordion ── */
        @media (max-width: 640px) {
          .footer-links-grid { display: none !important; }
          .footer-mobile-accordion { display: block !important; }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 14px !important;
          }
          .footer-bottom-bar > p { text-align: center !important; line-height: 1.7 !important; }
          .footer-legal-links { justify-content: center !important; flex-wrap: wrap !important; gap: 12px !important; }
          footer { padding-top: 48px !important; }
          /* Hide big decorative hearts on mobile */
          .footer-deco { display: none !important; }
        }
      `}} />

      {/* ── Decorative hearts ── */}
      <div className="footer-deco animate-footer-heart" style={{ position: 'absolute', left: '3%', top: '25%', pointerEvents: 'none', zIndex: 1, opacity: 0.65, color: '#FDED95' }}>
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 10px rgba(253,237,149,0.15))' }}>
          <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
        </svg>
      </div>
      <div className="footer-deco animate-footer-heart" style={{ position: 'absolute', right: '4%', top: '35%', pointerEvents: 'none', zIndex: 1, opacity: 0.15, color: '#FDED95', animationDelay: '2s' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
        </svg>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>

        {/* ═══════════════════════════════════════════
            DESKTOP: 4-column grid
        ═══════════════════════════════════════════ */}
        <div className="footer-links-grid">

          {/* Col 1: Logo + About */}
          <LogoCol />

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '15px', color: '#fff', margin: '0 0 10px' }}>त्वरित लिंक</h4>
            <GoldDash />
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map(({ l, page }) => (
                <a key={l} href="#" className="footer-link-item"
                  onClick={e => { e.preventDefault(); setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                  <span style={{ fontSize: '11px', color: '#FDED95' }}>↗</span> {l}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '15px', color: '#fff', margin: '0 0 10px' }}>हमारी सेवाएं</h4>
            <GoldDash />
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {SERVICE_LINKS.map(({ name, target, page }) => (
                <a key={name} href={page ? '/contact' : `#${target}`} className="footer-link-item"
                  onClick={e => { e.preventDefault(); if (page) setCurrentPage(page); else setCurrentPage('home', target) }}>
                  <span style={{ fontSize: '11px', color: '#FDED95' }}>↗</span> {name}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '15px', color: '#fff', margin: '0 0 10px' }}>संपर्क करें</h4>
            <GoldDash />
            <ContactInfo />
          </div>

        </div>

        {/* ═══════════════════════════════════════════
            MOBILE: Logo strip + Accordion
        ═══════════════════════════════════════════ */}
        <div className="footer-mobile-accordion">

          {/* Logo strip at top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ background: '#fff', borderRadius: '50%', width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', flexShrink: 0 }}>
              <img src="/main_logo.png" alt="साधु लक्ष्मी जनकल्याण ट्रस्ट लोगो" style={{ height: '62px', width: '62px', objectFit: 'contain' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '14px', color: '#fff', margin: '0 0 4px' }}>साधु लक्ष्मी जनकल्याण</p>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>सेवा, शिक्षा और स्वास्थ्य</p>
            </div>
          </div>

          {/* Social buttons row */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            {[
              { label: 'Facebook',  path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z' },
              { label: 'Twitter',   path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
            ].map(({ label, path }) => (
              <a key={label} href="#" aria-label={label} className="footer-social-btn">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
              </a>
            ))}
          </div>

          {/* Accordion sections */}
          <MobileAccordion title="त्वरित लिंक">
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map(({ l, page }) => (
                <a key={l} href="#" className="footer-link-item"
                  onClick={e => { e.preventDefault(); setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                  <span style={{ fontSize: '11px', color: '#FDED95' }}>↗</span> {l}
                </a>
              ))}
            </nav>
          </MobileAccordion>

          <MobileAccordion title="हमारी सेवाएं">
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {SERVICE_LINKS.map(({ name, target, page }) => (
                <a key={name} href={page ? '/contact' : `#${target}`} className="footer-link-item"
                  onClick={e => { e.preventDefault(); if (page) setCurrentPage(page); else setCurrentPage('home', target) }}>
                  <span style={{ fontSize: '11px', color: '#FDED95' }}>↗</span> {name}
                </a>
              ))}
            </nav>
          </MobileAccordion>

          <MobileAccordion title="संपर्क करें">
            <ContactInfo />
          </MobileAccordion>

        </div>

        {/* ════ BOTTOM BAR ════ */}
        <div className="footer-bottom-bar">
          <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', margin: 0, fontWeight: 500 }}>
            कॉपीराइट © 2026 <span style={{ color: '#FDED95', fontWeight: 650 }}>साधु लक्ष्मी जनकल्याण ट्रस्ट</span> — crafted with ❤️ by{' '}
            <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="footer-credit-link">Team Digicoders</a>
          </p>
          <div className="footer-legal-links" style={{ display: 'flex', gap: '16px' }}>
            {[
              { label: 'नियम और शर्तें', page: 'terms'   },
              { label: 'गोपनीयता नीति',  page: 'privacy' },
              { label: 'कुकी सेटिंग्स',  page: null      },
            ].map(({ label, page }) => (
              <a key={label} href="#"
                onClick={e => { e.preventDefault(); if (page) setCurrentPage(page) }}
                style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll-to-top button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="वापस ऊपर जाएं"
        style={{
          position: 'fixed', bottom: '28px', right: '20px',
          width: '44px', height: '44px', borderRadius: '50%',
          background: '#821905', color: '#fff', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(130,25,5,0.35)',
          transition: 'all 0.35s cubic-bezier(0.25,0.8,0.25,1)',
          zIndex: 999,
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'; e.currentTarget.style.background = '#5a1002' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.background = '#821905' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
        </svg>
      </button>

    </footer>
  )
}

/* ════ Logo + About sub-component ════ */
const LogoCol = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <div style={{ background: '#fff', borderRadius: '50%', width: '88px', height: '88px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>
        <img src="/main_logo.png" alt="साधु लक्ष्मी जनकल्याण ट्रस्ट लोगो" style={{ height: '78px', width: '78px', objectFit: 'contain' }} />
      </div>
    </div>
    <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 0 22px', maxWidth: '280px' }}>
      हमारा सुरक्षित ऑनलाइन दान प्लेटफॉर्म आपको जल्दी और सुरक्षित रूप से योगदान करने की अनुमति देता है।
    </p>
    <div style={{ display: 'flex', gap: '8px' }}>
      {[
        { label: 'Facebook',  path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z' },
        { label: 'Twitter',   path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
        { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
        { label: 'LinkedIn',  path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
      ].map(({ label, path }) => (
        <a key={label} href="#" aria-label={label} className="footer-social-btn">
          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
        </a>
      ))}
    </div>
  </div>
)

/* ════ Contact info sub-component ════ */
const ContactInfo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
    {[
      {
        icon: 'M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z',
        text: '486/238डी डालीगंज लखनऊ, उत्तर प्रदेश 226020',
        href: 'https://www.google.com/maps?q=26.87766587666813,80.93232087454065',
        multiline: true,
      },
      {
        icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
        text: '9569036324',
        href: 'tel:9569036324',
      },
      {
        icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
        text: 'Shakti.singh20017@gmail.com',
        href: 'mailto:Shakti.singh20017@gmail.com',
        email: true,
      },
    ].map(({ icon, text, multiline, email, href }, i) => (
      <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ display: 'flex', gap: '10px', alignItems: multiline ? 'flex-start' : 'center', textDecoration: 'none', transition: 'transform 0.2s ease' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.children[1].style.color = '#FDED95' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.children[1].style.color = 'rgba(255,255,255,0.5)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FDED95" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: multiline ? '2px' : 0 }}>
          {email
            ? (<><path d={icon.split(' M')[0]} /><path d={'M' + icon.split(' M')[1]} /></>)
            : <path d={icon} />
          }
        </svg>
        <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, transition: 'color 0.2s ease' }}>
          {text}
        </span>
      </a>
    ))}

    {/* Embedded Map */}
    <div style={{ marginTop: '10px', borderRadius: '12px', overflow: 'hidden', height: '110px', width: '100%', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.813499081199!2d80.93232087454065!3d26.87766587666813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd86f4b26be1%3A0xf33bb8c5d8eb13!2sLDA%20Flats%2C%20486%2F159%2C%20Daliganj%20Crossing%20Rd%2C%20Bans%20Mandi%2C%20Nirala%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226020!5e0!3m2!1sen!2sin!4v1780838746309!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
)

export default Footer
