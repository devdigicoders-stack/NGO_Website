import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight, Heart } from 'lucide-react'
import { resolveImageUrl } from '../utils/imageUrl'

const CausesSection = () => {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/programs?activeOnly=true`)
        const json = await res.json()
        if (json.success) setCampaigns(json.data)
        else setCampaigns([])
      } catch {
        setCampaigns([])
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [])

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, campaigns.length - visibleCount)

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(Math.max(0, maxIndex))
  }, [visibleCount, campaigns.length, maxIndex])

  useEffect(() => {
    if (campaigns.length <= visibleCount) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1 > maxIndex ? 0 : prev + 1))
    }, 4500)
    return () => clearInterval(interval)
  }, [campaigns.length, visibleCount, maxIndex])

  const goNext = () => setCurrentIndex(p => Math.min(p + 1, maxIndex))
  const goPrev = () => setCurrentIndex(p => Math.max(p - 1, 0))

  const slideWidthPercent = campaigns.length > 0 ? (100 / campaigns.length) : 100
  const trackWidthPercent = campaigns.length > 0 ? (campaigns.length / visibleCount) * 100 : 100
  const translatePercent  = campaigns.length > 0 ? currentIndex * (100 / campaigns.length) : 0

  const showArrows = campaigns.length > visibleCount

  return (
    <section id="causes" style={{ background: '#f8f9fa', padding: '72px 0 80px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cs-spin { to { transform: rotate(360deg); } }

        /* ── Header row ── */
        .causes-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: nowrap;
        }
        .causes-arrows {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
          align-self: flex-end;
          padding-bottom: 4px;
        }
        .causes-arrow-btn {
          width: 46px; height: 46px;
          border-radius: 50%; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          flex-shrink: 0;
        }
        .causes-arrow-btn:not(:disabled):hover { transform: scale(1.1); }

        /* ── Dots ── */
        .causes-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }
        .causes-dot {
          height: 7px; border-radius: 999px;
          border: none; cursor: pointer; padding: 0;
          transition: all 0.3s ease;
        }

        /* ── Mobile tweaks ── */
        @media (max-width: 640px) {
          .causes-header { align-items: flex-start; gap: 16px; }
          .causes-arrows { gap: 8px; padding-bottom: 0; align-self: flex-start; margin-top: 12px; }
          .causes-arrow-btn { width: 42px; height: 42px; }
        }
      `}} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* ══════════ HEADER ══════════ */}
        <div className="causes-header">

          {/* Left: badge + heading */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(130,25,5,0.07)', border: '1.5px solid rgba(130,25,5,0.14)',
              borderRadius: '999px', padding: '6px 16px', marginBottom: '14px',
            }}>
              <Heart size={12} style={{ color: '#821905', fill: '#821905', flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#821905', fontFamily: 'Hind, sans-serif' }}>
                हमारे कार्यक्रम
              </span>
            </div>

            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 3vw, 36px)', color: '#111827', lineHeight: 1.2, margin: 0 }}>
              जरूरतमंदों की मदद करें,{' '}
              <span style={{ color: '#821905', borderBottom: '3px solid #FDED95', paddingBottom: '1px' }}>दान करें</span>
            </h2>
          </div>

          {/* Right: arrows — always visible if needed */}
          {showArrows && (
            <div className="causes-arrows">
              <button
                className="causes-arrow-btn"
                onClick={goPrev}
                disabled={currentIndex === 0}
                aria-label="पिछला"
                style={{
                  background: currentIndex === 0 ? '#e5e7eb' : '#111827',
                  color: currentIndex === 0 ? '#9ca3af' : '#fff',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: currentIndex === 0 ? 'none' : '0 4px 14px rgba(0,0,0,0.18)',
                }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="causes-arrow-btn"
                onClick={goNext}
                disabled={currentIndex >= maxIndex}
                aria-label="अगला"
                style={{
                  background: currentIndex >= maxIndex ? '#e5e7eb' : '#FDED95',
                  color: currentIndex >= maxIndex ? '#9ca3af' : '#111827',
                  cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer',
                  boxShadow: currentIndex >= maxIndex ? 'none' : '0 4px 14px rgba(253,237,149,0.5)',
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>

        {/* ══════════ LOADING ══════════ */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#821905', animation: 'cs-spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* ══════════ CAROUSEL ══════════ */}
        {!loading && campaigns.length > 0 && (
          <>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                transform: `translateX(-${translatePercent}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                width: `${trackWidthPercent}%`,
              }}>
                {campaigns.map((c, i) => (
                  <div
                    key={c.id || c._id || i}
                    style={{ width: `${slideWidthPercent}%`, padding: '0 10px', boxSizing: 'border-box', flexShrink: 0 }}
                  >
                    <CampaignCard campaign={c} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            {maxIndex > 0 && (
              <div className="causes-dots">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="causes-dot"
                    style={{
                      width: i === currentIndex ? '28px' : '8px',
                      background: i === currentIndex ? '#821905' : '#d1d5db',
                    }}
                    aria-label={`स्लाइड ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ══════════ EMPTY ══════════ */}
        {!loading && campaigns.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif', fontSize: '16px' }}>
            अभी कोई कार्यक्रम उपलब्ध नहीं है।
          </div>
        )}

      </div>
    </section>
  )
}

/* ════════════════════════════════
   Campaign Card
════════════════════════════════ */
const CampaignCard = ({ campaign: c }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: hovered ? '0 24px 50px rgba(0,0,0,0.08)' : '0 8px 24px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={resolveImageUrl(c.image)}
          alt={c.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1.01)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />

        {/* Category tag */}
        {c.tag && (
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            background: 'rgba(255,255,255,0.95)', color: c.tagColor || '#111827',
            padding: '6px 14px', borderRadius: '10px',
            fontSize: '11.5px', fontWeight: 800, fontFamily: 'Hind, sans-serif',
            letterSpacing: '0.04em', boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(8px)',
          }}>
            {c.tag}
          </div>
        )}

        {/* % badge */}
        <div style={{
          position: 'absolute', bottom: '16px', right: '16px',
          background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: '6px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.accentColor || '#821905', flexShrink: 0, boxShadow: `0 0 8px ${c.accentColor || '#821905'}88` }} />
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif' }}>
            {c.percentage}%
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '24px' }}>

        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '17px', color: '#111827', margin: '0 0 8px', lineHeight: 1.35 }}>
          {c.title}
        </h3>

        <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13.5px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 20px', minHeight: '44px' }}>
          {c.desc}
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(c.percentage, 100)}%`,
              background: `linear-gradient(to right, ${c.accentColor || '#821905'}bb, ${c.accentColor || '#821905'})`,
              borderRadius: '999px',
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 0 10px ${c.accentColor || '#821905'}66`,
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontFamily: 'Hind, sans-serif', color: '#6b7280', fontWeight: 500 }}>
              एकत्रित: <strong style={{ color: '#111827', fontWeight: 800, marginLeft: '4px' }}>{c.raised}</strong>
            </span>
            <span style={{ fontSize: '12px', fontFamily: 'Hind, sans-serif', color: '#6b7280', fontWeight: 500 }}>
              लक्ष्य: <strong style={{ color: '#111827', fontWeight: 800, marginLeft: '4px' }}>{c.goal}</strong>
            </span>
          </div>
        </div>

        {/* CTA button — always styled, no hover-only */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.dispatchEvent(new Event('navigate-donate')) }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '14px',
            background: hovered ? 'linear-gradient(135deg, #821905 0%, #5a1002 100%)' : 'rgba(130,25,5,0.06)',
            color: hovered ? '#fff' : '#821905',
            border: 'none',
            borderRadius: '14px',
            fontFamily: 'Hind, sans-serif', fontWeight: 800, fontSize: '14.5px',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxSizing: 'border-box',
            boxShadow: hovered ? `0 8px 24px rgba(130,25,5,0.35)` : 'none',
          }}
        >
          अभी दान करें <ArrowUpRight size={17} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  )
}

export default CausesSection
