import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight, Heart } from 'lucide-react'
import { resolveImageUrl } from '../utils/imageUrl'

const CausesSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/programs?activeOnly=true`);
        const json = await res.json();
        if (json.success) {
          setCampaigns(json.data);
        } else {
          console.error('Failed to fetch programs:', json.message);
          setCampaigns([]);
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Safe maxIndex — never negative
  const maxIndex = Math.max(0, campaigns.length - visibleCount);

  // Clamp currentIndex when visibleCount or campaigns change
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(Math.max(0, maxIndex))
  }, [visibleCount, campaigns.length, maxIndex])

  // Auto‑slide carousel every 4 seconds
  useEffect(() => {
    if (campaigns.length <= visibleCount) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [campaigns.length, visibleCount, maxIndex]);

  const goNext = () => setCurrentIndex(p => Math.min(p + 1, maxIndex))
  const goPrev = () => setCurrentIndex(p => Math.max(p - 1, 0))

  // Calculate slide width as percentage of the visible area
  const slideWidthPercent = campaigns.length > 0 ? (100 / campaigns.length) : 100;
  const trackWidthPercent = campaigns.length > 0 ? (campaigns.length / visibleCount) * 100 : 100;
  const translatePercent = campaigns.length > 0 ? currentIndex * (100 / campaigns.length) : 0;

  return (
    <section id="causes" style={{ background: '#f8f9fa', padding: '80px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', gap: '24px', flexWrap: 'wrap' }}>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26,92,56,0.07)', border: '1px solid rgba(26,92,56,0.14)', borderRadius: '999px', padding: '5px 16px', marginBottom: '14px' }}>
              <Heart size={12} style={{ color: '#1a5c38', fill: '#1a5c38' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1a5c38', fontFamily: 'Hind, sans-serif' }}>
                हमारे कार्यक्रम
              </span>
            </div>

            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 38px)', color: '#111827', lineHeight: 1.2, margin: 0 }}>
              जरूरतमंदों की मदद करें,{' '}
              <span style={{ color: '#f5b400' }}>दान करें</span>
            </h2>
          </div>

          {/* Arrows */}
          {campaigns.length > visibleCount && (
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
              {[
                { onClick: goPrev, disabled: currentIndex === 0, bg: '#111827', disabledBg: '#e5e7eb', icon: ChevronLeft },
                { onClick: goNext, disabled: currentIndex >= maxIndex, bg: '#f5b400', disabledBg: '#e5e7eb', icon: ChevronRight },
              ].map(({ onClick, disabled, bg, disabledBg, icon: Icon }, i) => (
                <button
                  key={i}
                  onClick={onClick}
                  disabled={disabled}
                  style={{
                    width: '44px', height: '44px', borderRadius: '50%', border: 'none',
                    background: disabled ? disabledBg : bg,
                    color: disabled ? '#9ca3af' : (i === 0 ? '#fff' : '#111827'),
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.12)',
                  }}
                  onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'scale(1.08)' }}
                  onMouseLeave={e => { if (!disabled) e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Loading state ── */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              border: '3px solid #e5e7eb', borderTopColor: '#1a5c38',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── Carousel ── */}
        {!loading && campaigns.length > 0 && (
          <>
            <div style={{ overflow: 'hidden', paddingBottom: '8px' }}>
              <div style={{
                display: 'flex',
                transform: `translateX(-${translatePercent}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                width: `${trackWidthPercent}%`,
              }}>
                {campaigns.map((c, i) => (
                  <div
                    key={c.id || c._id || i}
                    style={{
                      width: `${slideWidthPercent}%`,
                      padding: '0 10px',
                      boxSizing: 'border-box',
                      flexShrink: 0,
                    }}
                  >
                    <CampaignCard campaign={c} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Dots ── */}
            {maxIndex > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: i === currentIndex ? '28px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      background: i === currentIndex ? '#1a5c38' : '#d1d5db',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Empty state ── */}
        {!loading && campaigns.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif', fontSize: '16px' }}>
            अभी कोई कार्यक्रम उपलब्ध नहीं है।
          </div>
        )}

      </div>
    </section>
  )
}

const CampaignCard = ({ campaign: c }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1.5px solid #f0f0f0',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.10)' : '0 4px 16px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
        <img
          src={resolveImageUrl(c.image)}
          alt={c.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
        }} />

        {/* Tag */}
        {c.tag && (
          <div style={{
            position: 'absolute', top: '14px', left: '14px',
            background: c.tagBg, color: c.tagColor,
            padding: '4px 14px', borderRadius: '999px',
            fontSize: '11px', fontWeight: 700,
            fontFamily: 'Hind, sans-serif',
            letterSpacing: '0.04em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}>
            {c.tag}
          </div>
        )}

        {/* Percentage badge */}
        <div style={{
          position: 'absolute', bottom: '14px', right: '14px',
          background: '#fff',
          borderRadius: '10px',
          padding: '4px 10px',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.accentColor }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif' }}>
            {c.percentage}%
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 22px 24px' }}>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700,
          fontSize: '16px', color: '#111827',
          margin: '0 0 8px', lineHeight: 1.35,
        }}>
          {c.title}
        </h3>

        {/* Desc */}
        <p style={{
          fontFamily: 'Hind, sans-serif', fontSize: '13.5px',
          color: '#6b7280', lineHeight: 1.65,
          margin: '0 0 18px',
        }}>
          {c.desc}
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{
            height: '6px', background: '#f3f4f6',
            borderRadius: '999px', overflow: 'hidden', marginBottom: '10px',
          }}>
            <div style={{
              height: '100%', width: `${c.percentage}%`,
              background: `linear-gradient(to right, ${c.accentColor}cc, ${c.accentColor})`,
              borderRadius: '999px',
              transition: 'width 0.6s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontFamily: 'Hind, sans-serif', color: '#6b7280' }}>
              एकत्रित: <strong style={{ color: '#111827', fontWeight: 700 }}>{c.raised}</strong>
            </span>
            <span style={{ fontSize: '12px', fontFamily: 'Hind, sans-serif', color: '#6b7280' }}>
              लक्ष्य: <strong style={{ color: '#111827', fontWeight: 700 }}>{c.goal}</strong>
            </span>
          </div>
        </div>

        {/* Button */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('navigate-donate')) }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            width: '100%', padding: '11px',
            background: hovered ? c.accentColor : 'transparent',
            color: hovered ? (c.accentColor === '#f5b400' ? '#111827' : '#fff') : '#111827',
            border: `1.5px solid ${hovered ? c.accentColor : '#e5e7eb'}`,
            borderRadius: '12px',
            fontFamily: 'Hind, sans-serif', fontWeight: 700, fontSize: '13.5px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
          }}
        >
          अभी दान करें <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  )
}

export default CausesSection
