import { useState, useEffect, useRef } from 'react'
import { Phone, ArrowUpRight, ChevronDown, Menu, X, IdCard } from 'lucide-react'

// page: navigate to a page
// hash: scroll to section on home page
// dropdown: show dropdown menu
const navLinks = [
  { label: 'होम',           page: 'home'     },
  { label: 'हमारे बारे में', page: 'about'    },
  { label: 'समाचार',        page: 'news'     },
  { label: 'संपर्क',        page: 'contact'  },
  { label: 'दान करें',       page: 'donate'   },
  { label: 'पंजीकरण',       page: 'register' },
]

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled,      setIsScrolled]      = useState(false)
  const [mobileOpen,      setMobileOpen]      = useState(false)
  const [activeDropdown,  setActiveDropdown]  = useState(null)
  const [mobileExpanded,  setMobileExpanded]  = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  // Unified click handler for any nav link
  const handleNav = (link, closeMobile = false) => {
    if (link.dropdown) {
      // Toggle dropdown — don't navigate
      setActiveDropdown(prev => prev === link.label ? null : link.label)
      return
    }
    if (closeMobile) setMobileOpen(false)
    setActiveDropdown(null)

    if (link.page) {
      setCurrentPage(link.page)
    } else if (link.hash) {
      // If already on home, just scroll; else go home then scroll
      if (currentPage === 'home') {
        const el = document.getElementById(link.hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        setCurrentPage('home', link.hash)
      }
    }
  }

  const isActive = (link) => {
    if (link.page) return currentPage === link.page
    return false
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: isScrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(26,92,56,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* ── Logo ── */}
          <a href="#home"
            onClick={(e) => { e.preventDefault(); setCurrentPage('home') }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0, transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src="/images/logo.png" alt="सहायता फाउंडेशन" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
         
          </a>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {navLinks.map((link) => {
              const active = isActive(link)
              return (
                <div
                  key={link.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNav(link)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '8px 14px', borderRadius: '8px',
                      background: active ? 'rgba(26,92,56,0.07)' : 'transparent',
                      border: 'none', cursor: 'pointer',
                      fontSize: '14px', fontWeight: active ? 700 : 500,
                      fontFamily: 'Hind, sans-serif',
                      color: active ? '#1a5c38' : '#374151',
                      transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1a5c38'; e.currentTarget.style.background = 'rgba(26,92,56,0.06)' }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent' } }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)', color: '#9ca3af' }} />
                    )}
                  </button>

                  {/* Active underline */}
                  {active && (
                    <div style={{ position: 'absolute', bottom: 0, left: '14px', right: '14px', height: '2px', background: '#f5b400', borderRadius: '2px' }} />
                  )}

                  {/* Dropdown */}
                  {link.dropdown && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 6px)', left: '50%',
                      transform: `translate(-50%, ${activeDropdown === link.label ? '0px' : '-6px'})`,
                      minWidth: '210px', background: 'rgba(255,255,255,0.98)',
                      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                      borderRadius: '12px', padding: '6px',
                      boxShadow: '0 16px 40px -8px rgba(26,92,56,0.15), 0 4px 12px rgba(0,0,0,0.05)',
                      border: '1px solid rgba(26,92,56,0.08)', zIndex: 100,
                      opacity: activeDropdown === link.label ? 1 : 0,
                      pointerEvents: activeDropdown === link.label ? 'all' : 'none',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}>
                      {link.dropdown.map((item) => (
                        <a key={item} href="#"
                          onClick={(e) => { e.preventDefault(); handleNav(link) }}
                          style={{ display: 'block', padding: '9px 14px', fontSize: '13.5px', fontFamily: 'Hind, sans-serif', fontWeight: 500, color: '#4b5563', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.15s ease', borderLeft: '3px solid transparent' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,92,56,0.05)'; e.currentTarget.style.color = '#1a5c38'; e.currentTarget.style.borderLeftColor = '#1a5c38'; e.currentTarget.style.paddingLeft = '18px' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.borderLeftColor = 'transparent'; e.currentTarget.style.paddingLeft = '14px' }}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── Right Actions ── */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '14px' }}>
            {/* Phone pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: '#fcfcfc', border: '1.5px solid #e5e7eb',
              borderRadius: '999px', padding: '6px 16px 6px 6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a5c38'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,92,56,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)' }}
            >
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg,#1a5c38,#113d25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(26,92,56,0.3)' }}>
                <Phone size={13} color="#fff" />
              </div>
              <div style={{ lineHeight: 1 }}>
                <p style={{ fontSize: '9px', color: '#6b7280', fontWeight: 600, fontFamily: 'Hind, sans-serif', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>अभी कॉल करें</p>
                <p style={{ fontSize: '13px', color: '#1a5c38', fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>+91-123-456-7890</p>
              </div>
            </div>

            {/* ID Card */}
            <button onClick={() => handleNav({ page: 'download-id' })}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '11px 24px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #1a5c38 0%, #113d25 100%)',
                color: '#fff', fontWeight: 700, fontSize: '13.5px',
                fontFamily: 'Hind, sans-serif', border: 'none', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 4px 15px rgba(26,92,56,0.2)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(26,92,56,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(26,92,56,0.2)' }}
            >
              आईडी कार्ड <IdCard size={15} />
            </button>

            {/* Donate */}
            <button onClick={() => handleNav({ page: 'donate' })}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '11px 24px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #f5b400 0%, #e2a500 100%)',
                color: '#111827', fontWeight: 700, fontSize: '13.5px',
                fontFamily: 'Hind, sans-serif', border: 'none', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 4px 15px rgba(245,180,0,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(245,180,0,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(245,180,0,0.3)' }}
            >
              दान करें <ArrowUpRight size={15} />
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="मेनू"
            className="flex lg:hidden"
            style={{ width: '42px', height: '42px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: '#1a5c38', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a5c38' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className="lg:hidden" style={{ maxHeight: mobileOpen ? '560px' : '0', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)', borderTop: mobileOpen ? '1px solid rgba(26,92,56,0.08)' : 'none', background: '#fff' }}>
        <div style={{ padding: '12px 16px 20px' }}>
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <div key={link.label} style={{ marginBottom: '2px' }}>
                <div
                  onClick={() => {
                    if (link.dropdown) {
                      setMobileExpanded(prev => prev === link.label ? null : link.label)
                    } else {
                      handleNav(link, true)
                    }
                  }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: '10px', cursor: 'pointer', background: active ? 'rgba(26,92,56,0.07)' : mobileExpanded === link.label ? 'rgba(26,92,56,0.04)' : 'transparent', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(26,92,56,0.04)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = mobileExpanded === link.label ? 'rgba(26,92,56,0.04)' : 'transparent' }}
                >
                  <span style={{ fontSize: '14.5px', fontWeight: active ? 700 : 500, fontFamily: 'Hind, sans-serif', color: active ? '#1a5c38' : '#1f2937' }}>
                    {link.label}
                  </span>
                  {link.dropdown && (
                    <ChevronDown size={16} style={{ color: '#9ca3af', transition: 'transform 0.25s', transform: mobileExpanded === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  )}
                </div>

                {link.dropdown && mobileExpanded === link.label && (
                  <div style={{ marginLeft: '14px', paddingLeft: '14px', borderLeft: '2px solid rgba(26,92,56,0.12)', marginTop: '4px', marginBottom: '6px' }}>
                    {link.dropdown.map((item) => (
                      <div key={item} onClick={() => handleNav(link, true)}
                        style={{ padding: '9px 10px', fontSize: '13.5px', fontFamily: 'Hind, sans-serif', color: '#6b7280', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#1a5c38'; e.currentTarget.style.background = 'rgba(26,92,56,0.04)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'transparent' }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Mobile bottom */}
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(26,92,56,0.08)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(26,92,56,0.04)', border: '1px solid rgba(26,92,56,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#1a5c38,#113d25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={14} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'Hind, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>अभी कॉल करें</p>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#1a5c38', fontFamily: 'Poppins, sans-serif', margin: 0 }}>+91-123-456-7890</p>
              </div>
            </div>
            {/* ID Card Button */}
            <button onClick={() => { handleNav({ page: 'download-id' }, true) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: 'linear-gradient(135deg,#1a5c38,#113d25)', color: '#fff', fontWeight: 700, fontSize: '14.5px', fontFamily: 'Hind, sans-serif', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(26,92,56,0.2)' }}
            >
              आईडी कार्ड <IdCard size={16} />
            </button>
            {/* Donate Button */}
            <button onClick={() => { handleNav({ page: 'donate' }, true) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: 'linear-gradient(135deg,#f5b400,#e2a500)', color: '#111827', fontWeight: 700, fontSize: '14.5px', fontFamily: 'Hind, sans-serif', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(245,180,0,0.2)' }}
            >
              दान करें <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
