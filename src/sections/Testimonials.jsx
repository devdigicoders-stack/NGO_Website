import { useState, useEffect } from 'react'
import { resolveImageUrl } from '../utils/imageUrl'

const API_BASE = import.meta.env.VITE_API_BASE

const DEFAULT_SETTINGS = {
  sectionSubtitle: 'ज़रूरतमंदों को दान देना शुरू करें',
  sectionTitlePrefix: 'हमारे दानदाताओं और ',
  sectionTitleHighlight: 'शुभचिंतकों',
  sectionTitleSuffix: ' के विचार',
}

const Testimonials = () => {
  const [feedbackList, setFeedbackList] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activeMobile, setActiveMobile] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const [itemsRes, settingsRes] = await Promise.all([
          fetch(`${API_BASE}/testimonials?activeOnly=true`),
          fetch(`${API_BASE}/testimonials/settings`),
        ])
        const itemsJson = await itemsRes.json()
        const settingsJson = await settingsRes.json()

        if (itemsJson.success && itemsJson.data?.length) {
          setFeedbackList(itemsJson.data.map(item => ({
            id: item.id,
            name: item.name,
            role: item.role,
            image: resolveImageUrl(item.image),
            rating: item.rating || 5,
            highlight: Boolean(item.highlight),
            quote: item.quote,
          })))
        }

        if (settingsJson.success && settingsJson.data) {
          setSettings({
            sectionSubtitle:       settingsJson.data.sectionSubtitle       || DEFAULT_SETTINGS.sectionSubtitle,
            sectionTitlePrefix:    settingsJson.data.sectionTitlePrefix     ?? DEFAULT_SETTINGS.sectionTitlePrefix,
            sectionTitleHighlight: settingsJson.data.sectionTitleHighlight  || DEFAULT_SETTINGS.sectionTitleHighlight,
            sectionTitleSuffix:    settingsJson.data.sectionTitleSuffix     ?? DEFAULT_SETTINGS.sectionTitleSuffix,
          })
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const gridCols = feedbackList.length === 0 ? 3 : Math.min(feedbackList.length, 3)

  return (
    <section
      id="testimonials"
      style={{
        background: '#FAF9F6',
        backgroundImage: 'radial-gradient(#e5e7eb 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
        padding: '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        /* ── Cards grid ── */
        .feedback-cards-grid {
          display: grid;
          grid-template-columns: repeat(${gridCols}, 1fr);
          gap: 24px;
          max-width: 1140px;
          margin: 0 auto;
        }
        .feedback-card-hover {
          transition: all 0.35s cubic-bezier(0.25,0.8,0.25,1) !important;
        }

        /* ── Tablet: 2 cols ── */
        @media (max-width: 960px) {
          .feedback-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          /* Hide 3rd+ cards on tablet if more than 2 */
        }

        /* ── Mobile: horizontal swipe carousel ── */
        @media (max-width: 640px) {
          .testi-section-inner { padding: 0 16px !important; }
          .feedback-cards-grid { display: none !important; }
          .testi-mobile-carousel { display: block !important; }
          .testi-header { margin-bottom: 32px !important; }
          .testi-subtitle { font-size: 16px !important; }
          .testi-title   { font-size: 22px !important; }
        }
      `}} />

      <div className="testi-section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 5 }}>

        {/* ══════════ HEADER ══════════ */}
        <div className="testi-header" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" stroke="#821905" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 14C8.5 14.5 9.5 15 12 15C14.5 15 15.5 14.5 17 14" stroke="#821905" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              className="testi-subtitle"
              style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: '19px', color: '#821905', letterSpacing: '0.02em' }}
            >
              {settings.sectionSubtitle}
            </span>
          </div>

          <h2
            className="testi-title"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3.5vw, 40px)', color: '#111827', lineHeight: 1.25, margin: '0 auto' }}
          >
            {settings.sectionTitlePrefix}
            <span style={{ color: '#821905', borderBottom: '3px solid #FDED95', paddingBottom: '1px' }}>{settings.sectionTitleHighlight}</span>
            {settings.sectionTitleSuffix}
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>लोड हो रहा है...</div>
        ) : feedbackList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>जल्द ही समीक्षाएँ यहाँ दिखाई देंगी।</div>
        ) : (
          <>
            {/* ════ DESKTOP / TABLET Grid ════ */}
            <div className="feedback-cards-grid">
              {feedbackList.map(card => {
                const isHovered = hoveredCard === card.id
                const isHighlighted = card.highlight
                return (
                  <TestiCard
                    key={card.id}
                    card={card}
                    isHovered={isHovered}
                    isHighlighted={isHighlighted}
                    onEnter={() => setHoveredCard(card.id)}
                    onLeave={() => setHoveredCard(null)}
                  />
                )
              })}
            </div>

            {/* ════ MOBILE Swipeable Carousel ════ */}
            <div className="testi-mobile-carousel" style={{ display: 'none' }}>
              {/* Active card */}
              <TestiCardMobile card={feedbackList[activeMobile]} />

              {/* Dots */}
              {feedbackList.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                  {feedbackList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMobile(i)}
                      style={{
                        width: i === activeMobile ? '28px' : '8px',
                        height: '8px', borderRadius: '999px', border: 'none', padding: 0, cursor: 'pointer',
                        background: i === activeMobile ? '#821905' : '#d1d5db',
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Prev / Next arrows */}
              {feedbackList.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                  <button
                    onClick={() => setActiveMobile(p => (p - 1 + feedbackList.length) % feedbackList.length)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#374151' }}
                  >←</button>
                  <button
                    onClick={() => setActiveMobile(p => (p + 1) % feedbackList.length)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: '#821905', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#fff' }}
                  >→</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/* ════════════ Desktop Card ════════════ */
const TestiCard = ({ card, isHovered, isHighlighted, onEnter, onLeave }) => (
  <div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className="feedback-card-hover"
    style={{
      background: '#ffffff',
      borderRadius: '24px',
      padding: '36px 28px 30px',
      position: 'relative',
      overflow: 'hidden',
      border: isHighlighted
        ? '2.5px solid #FDED95'
        : isHovered ? '2.5px solid #821905' : '2.5px solid #f0f0f0',
      boxShadow: isHovered ? '0 24px 50px rgba(0,0,0,0.08)' : isHighlighted ? '0 16px 36px rgba(253,237,149,0.06)' : '0 6px 20px rgba(0,0,0,0.03)',
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}
  >
    {/* Quotation mark */}
    <div style={{ position: 'absolute', top: '8px', right: '20px', fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '110px', color: '#eae9e5', opacity: 0.5, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
      "
    </div>
    <div>
      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
        {[...Array(card.rating)].map((_, i) => (
          <span key={i} style={{ color: '#FDED95', fontSize: '17px' }}>★</span>
        ))}
      </div>
      <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13.5px', fontWeight: 600, color: '#4b5563', lineHeight: 1.85, margin: 0, position: 'relative', zIndex: 2 }}>
        "{card.quote}"
      </p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '28px', position: 'relative', zIndex: 2 }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: `1.5px solid ${isHighlighted ? '#FDED95' : '#e5e7eb'}`, flexShrink: 0 }}>
        <img src={card.image} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
      <div>
        <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14px', color: '#111827', margin: '0 0 2px' }}>{card.name}</h4>
        <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '11px', fontWeight: 500, color: '#9ca3af', margin: 0 }}>{card.role}</p>
      </div>
    </div>
  </div>
)

/* ════════════ Mobile Card (full-width, clean) ════════════ */
const TestiCardMobile = ({ card }) => {
  if (!card) return null
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      padding: '28px 24px 24px',
      position: 'relative',
      overflow: 'hidden',
      border: card.highlight ? '2px solid #FDED95' : '2px solid #f0f0f0',
      boxShadow: '0 8px 28px rgba(0,0,0,0.06)',
    }}>
      {/* Big quote mark */}
      <div style={{ position: 'absolute', top: '4px', right: '16px', fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '90px', color: '#f3f4f6', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(card.rating || 5)].map((_, i) => (
          <span key={i} style={{ color: '#FDED95', fontSize: '18px' }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14px', fontWeight: 600, color: '#374151', lineHeight: 1.8, margin: '0 0 22px', position: 'relative', zIndex: 2 }}>
        "{card.quote}"
      </p>

      {/* Person */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid #f3f4f6', paddingTop: '18px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${card.highlight ? '#FDED95' : '#e5e7eb'}`, flexShrink: 0 }}>
          <img src={card.image} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>
        <div>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '15px', color: '#111827', margin: '0 0 3px' }}>{card.name}</h4>
          <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px', fontWeight: 500, color: '#9ca3af', margin: 0 }}>{card.role}</p>
        </div>
        {/* Highlight badge */}
        {card.highlight && (
          <div style={{ marginLeft: 'auto', background: '#FDED95', borderRadius: '999px', padding: '4px 10px', fontSize: '10px', fontWeight: 700, color: '#92400e', fontFamily: 'Hind, sans-serif', flexShrink: 0 }}>
            ⭐ चुनिंदा
          </div>
        )}
      </div>
    </div>
  )
}

export default Testimonials
