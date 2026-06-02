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
          setFeedbackList(
            itemsJson.data.map((item) => ({
              id: item.id,
              name: item.name,
              role: item.role,
              image: resolveImageUrl(item.image),
              rating: item.rating || 5,
              highlight: Boolean(item.highlight),
              quote: item.quote,
            })),
          )
        }

        if (settingsJson.success && settingsJson.data) {
          setSettings({
            sectionSubtitle: settingsJson.data.sectionSubtitle || DEFAULT_SETTINGS.sectionSubtitle,
            sectionTitlePrefix: settingsJson.data.sectionTitlePrefix ?? DEFAULT_SETTINGS.sectionTitlePrefix,
            sectionTitleHighlight: settingsJson.data.sectionTitleHighlight || DEFAULT_SETTINGS.sectionTitleHighlight,
            sectionTitleSuffix: settingsJson.data.sectionTitleSuffix ?? DEFAULT_SETTINGS.sectionTitleSuffix,
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

  const gridCols = feedbackList.length === 0
    ? 3
    : Math.min(feedbackList.length, 3)

  return (
    <section
      id="testimonials"
      style={{
        background: '#FAF9F6',
        backgroundImage: 'radial-gradient(#e5e7eb 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
        padding: '90px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .feedback-cards-grid {
            grid-template-columns: 1fr !important;
            max-width: 500px !important;
            padding: 0 12px !important;
          }
        }
        .feedback-card-hover {
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
      `}} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" stroke="#1a5c38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 14C8.5 14.5 9.5 15 12 15C14.5 15 15.5 14.5 17 14" stroke="#1a5c38" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '20px',
                color: '#1a5c38',
                letterSpacing: '0.02em',
              }}
            >
              {settings.sectionSubtitle}
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              color: '#111827',
              lineHeight: 1.25,
              margin: '0 auto',
            }}
          >
            {settings.sectionTitlePrefix}
            <span style={{ color: '#f5b400' }}>{settings.sectionTitleHighlight}</span>
            {settings.sectionTitleSuffix}
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>
            लोड हो रहा है...
          </div>
        ) : feedbackList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>
            जल्द ही समीक्षाएँ यहाँ दिखाई देंगी।
          </div>
        ) : (
          <div
            className="feedback-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gap: '30px',
              maxWidth: '1140px',
              margin: '0 auto',
            }}
          >
            {feedbackList.map((card) => {
              const isHovered = hoveredCard === card.id
              const isHighlighted = card.highlight

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="feedback-card-hover"
                  style={{
                    background: '#ffffff',
                    borderRadius: '28px',
                    padding: '44px 34px 38px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: isHighlighted
                      ? '2.5px solid #f5b400'
                      : isHovered ? '2.5px solid #1a5c38' : '2.5px solid #ffffff',
                    boxShadow: isHovered
                      ? '0 24px 50px rgba(0,0,0,0.08)'
                      : isHighlighted ? '0 16px 36px rgba(245,180,0,0.06)' : '0 10px 30px rgba(0,0,0,0.02)',
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '24px',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 900,
                      fontSize: '128px',
                      color: '#eae9e5',
                      opacity: 0.45,
                      lineHeight: 1,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    99
                  </div>

                  <div>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '22px' }}>
                      {[...Array(card.rating)].map((_, i) => (
                        <span key={i} style={{ color: '#f5b400', fontSize: '18px' }}>★</span>
                      ))}
                    </div>

                    <p
                      style={{
                        fontFamily: 'Hind, sans-serif',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#4b5563',
                        lineHeight: 1.85,
                        margin: 0,
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      “{card.quote}”
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      marginTop: '34px',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: `1.5px solid ${isHighlighted ? '#f5b400' : '#e5e7eb'}`,
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top',
                        }}
                      />
                    </div>

                    <div>
                      <h4
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 700,
                          fontSize: '14.5px',
                          color: '#111827',
                          margin: '0 0 2px',
                        }}
                      >
                        {card.name}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'Hind, sans-serif',
                          fontSize: '11.5px',
                          fontWeight: 500,
                          color: '#9ca3af',
                          margin: 0,
                        }}
                      >
                        {card.role}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
