import { useState, useEffect } from 'react'
import { ArrowUpRight, Calendar, ChevronRight, Search } from 'lucide-react'
import { resolveImageUrl } from '../utils/imageUrl'

const API_BASE = import.meta.env.VITE_API_BASE

const getFullDescription = (article) => {
  const full = article.content?.trim()
  return full || article.excerpt || ''
}

const categoryColors = {
  'शिक्षा':           { bg: 'rgba(130, 25, 5,0.1)',  text: '#821905' },
  'स्वास्थ्य':        { bg: 'rgba(130, 25, 5,0.08)',   text: '#821905' },
  'महिला सशक्तिकरण': { bg: 'rgba(253, 237, 149,0.12)', text: '#b07d00' },
  'दान':              { bg: 'rgba(253, 237, 149,0.12)', text: '#b07d00' },
  'आगामी कार्यक्रम': { bg: 'rgba(79,70,229,0.08)', text: '#4f46e5' },
  'स्वयंसेवा':        { bg: 'rgba(236,72,153,0.08)', text: '#be185d' },
}

const tagColors = {
  'ताज़ा':      { bg: '#821905', color: '#fff' },
  'महत्वपूर्ण': { bg: '#dc2626', color: '#fff' },
  'नया':        { bg: '#2563eb', color: '#fff' },
  'बड़ी खबर':   { bg: '#7c3aed', color: '#fff' },
  'आगामी':      { bg: '#0284c7', color: '#fff' },
  'उत्साहजनक':  { bg: '#d97706', color: '#fff' },
}

// ─── NewsPage Component ───────────────────────────────────────────────────────
const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('सभी')
  const [searchQuery, setSearchQuery] = useState('')
  const [newsArticles, setNewsArticles] = useState([])
  const [categories, setCategories] = useState(['सभी'])
  const [heroSettings, setHeroSettings] = useState({
    newsPageHeroTitle: 'ताज़ा समाचार',
    newsPageHeroSubtitle: '✍️ जरूरतमंदों की सेवा में समर्पित',
  })
  const [loading, setLoading] = useState(true)
  const [expandedIds, setExpandedIds] = useState(() => new Set())

  const toggleExpanded = (id, e) => {
    e?.preventDefault()
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [articlesRes, settingsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/news?activeOnly=true`),
          fetch(`${API_BASE}/news/settings`),
          fetch(`${API_BASE}/news/categories`),
        ])
        const articlesJson = await articlesRes.json()
        const settingsJson = await settingsRes.json()
        const categoriesJson = await categoriesRes.json()

        if (articlesJson.success && articlesJson.data?.length) {
          setNewsArticles(
            articlesJson.data.map((a) => ({
              id: a.id,
              category: a.category,
              categoryEn: a.categoryEn,
              date: a.dateLabel,
              title: a.title,
              excerpt: a.excerpt,
              content: a.content || '',
              image: resolveImageUrl(a.image),
              tag: a.tag,
              featured: Boolean(a.featured),
            })),
          )
        }

        if (settingsJson.success && settingsJson.data) {
          setHeroSettings({
            newsPageHeroTitle: settingsJson.data.newsPageHeroTitle || 'ताज़ा समाचार',
            newsPageHeroSubtitle: settingsJson.data.newsPageHeroSubtitle || '✍️ जरूरतमंदों की सेवा में समर्पित',
          })
        }

        if (categoriesJson.success && categoriesJson.data?.length) {
          setCategories(['सभी', ...categoriesJson.data])
        }
      } catch (err) {
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const filtered = newsArticles.filter(a => {
    const matchCat = activeCategory === 'सभी' || a.category === activeCategory
    const matchSearch = searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.content || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered.find(a => a.featured) || filtered[0]
  const rest = filtered.filter(a => a.id !== (featured?.id))

  return (
    <div style={{ background: '#ffffff', overflow: 'hidden' }}>

      {/* ─── Self-Contained Styles ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes news-float-heart {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50%       { transform: translateY(-12px) rotate(0deg); }
        }
        .news-float-heart { animation: news-float-heart 6s ease-in-out infinite; }

        @keyframes news-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .news-fade-up { animation: news-fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

        .news-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid #f0f0f0;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .news-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(130, 25, 5, 0.1);
          border-color: rgba(130, 25, 5, 0.18);
        }
        .news-card-img img {
          transition: transform 0.5s ease;
        }
        .news-card:hover .news-card-img img {
          transform: scale(1.06);
        }
        .news-cat-filter {
          padding: 9px 20px;
          border-radius: 999px;
          font-family: 'Hind', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .news-search-input:focus {
          outline: none;
          border-color: #821905 !important;
          box-shadow: 0 0 0 3px rgba(130, 25, 5, 0.08);
        }
        @media (max-width: 900px) {
          .news-featured-grid {
            grid-template-columns: 1fr !important;
          }
          .news-featured-img {
            height: 260px !important;
          }
          .news-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />

      {/* ═══════════════════════════════════════════
          1. HERO BANNER — matching the screenshot
      ═══════════════════════════════════════════ */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2a0501 0%, #5a1002 100%)',
          height: '300px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Grayscale BG Image with luminosity blend */}
        <div
          style={{
            position: 'absolute', inset: 0,
            opacity: 0.22,
            mixBlendMode: 'luminosity',
            pointerEvents: 'none', zIndex: 0,
          }}
        >
          <img
            src="/images/hero1.png"
            alt="news hero backdrop"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #2a0501 10%, transparent 50%, #2a0501 90%)',
          }} />
        </div>

        {/* Right-side faint child silhouette (like screenshot) */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '35%', pointerEvents: 'none', zIndex: 1, opacity: 0.35,
        }}>
          <img
            src="/images/about_child2.png"
            alt=""
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'grayscale(100%) contrast(110%) brightness(60%)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #2a0501 0%, transparent 60%)',
          }} />
        </div>

        {/* Left floating gold heart — identical to About page */}
        <div
          className="news-float-heart"
          style={{
            position: 'absolute', left: '6%', top: '22%',
            pointerEvents: 'none', zIndex: 2,
            color: '#FDED95', opacity: 0.9,
          }}
        >
          <svg
            width="72" height="72" viewBox="0 0 100 100"
            fill="none" stroke="currentColor" strokeWidth="2"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(253, 237, 149,0.3))' }}
          >
            <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
          </svg>
        </div>

        {/* Decorative dots top-right */}
        <div style={{ position: 'absolute', right: '38%', top: '18px', pointerEvents: 'none', zIndex: 2 }}>
          <svg width="60" height="60" fill="#FDED95" opacity="0.18">
            <pattern id="newsDots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="2" />
            </pattern>
            <rect width="60" height="60" fill="url(#newsDots)" />
          </svg>
        </div>

        {/* Center breadcrumb + heading */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }} className="news-fade-up">

          {/* Cursive italic badge — matching screenshot exactly */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '17px',
              color: '#ffd54f',
              letterSpacing: '0.04em',
              textShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}>
              {heroSettings.newsPageHeroSubtitle}
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 52px)',
            color: '#ffffff',
            margin: '0 0 18px',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}>
            {heroSettings.newsPageHeroTitle}
          </h1>

          {/* Breadcrumb */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '7px 20px',
          }}>
            <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
              होम
            </span>
            <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: '#ffd54f', fontWeight: 600 }}>
              समाचार
            </span>
          </div>
        </div>

        {/* Bottom wave edge — white */}
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '28px', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 36" fill="#ffffff" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,36 L1440,36 L1440,10 L1400,18 L1360,5 L1320,22 L1280,10 L1240,26 L1200,8 L1160,20 L1120,4 L1080,22 L1040,12 L1000,26 L960,6 L920,18 L880,10 L840,24 L800,8 L760,20 L720,8 L680,22 L640,10 L600,26 L560,6 L520,20 L480,8 L440,22 L400,8 L360,22 L320,10 L280,26 L240,6 L200,18 L160,8 L120,22 L80,8 L40,20 L0,10 Z" />
          </svg>
        </div>
      </div>


      {/* ═══════════════════════════════════════════
          2. FILTER BAR + SEARCH
      ═══════════════════════════════════════════ */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0', padding: '24px 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>

            {/* Category filter pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {categories.map(cat => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    className="news-cat-filter"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: isActive ? '#821905' : '#ffffff',
                      color: isActive ? '#ffffff' : '#6b7280',
                      borderColor: isActive ? '#821905' : '#e5e7eb',
                      boxShadow: isActive ? '0 4px 12px rgba(130, 25, 5,0.2)' : 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = '#821905'
                        e.currentTarget.style.color = '#821905'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                        e.currentTarget.style.color = '#6b7280'
                      }
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Search box */}
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <Search size={15} style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none',
              }} />
              <input
                type="text"
                className="news-search-input"
                placeholder="समाचार खोजें..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 16px 11px 40px',
                  borderRadius: '12px',
                  border: '1.5px solid #e5e7eb',
                  fontFamily: 'Hind, sans-serif',
                  fontSize: '14px',
                  color: '#374151',
                  background: '#ffffff',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>
      </div>


      {/* ═══════════════════════════════════════════
          3. NEWS CONTENT AREA
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '70px 0 100px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'Hind, sans-serif', color: '#6b7280' }}>
              लोड हो रहा है...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" style={{ marginBottom: '20px' }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '20px', color: '#374151', margin: '0 0 8px' }}>
                कोई समाचार नहीं मिला
              </h3>
              <p style={{ fontFamily: 'Hind, sans-serif', color: '#9ca3af', fontSize: '14px' }}>
                अपनी खोज बदलकर पुनः प्रयास करें
              </p>
            </div>
          ) : (
            <>
              {/* ── Featured Article (large card) ── */}
              {featured && (() => {
                const isExpanded = expandedIds.has(featured.id)
                const description = isExpanded ? getFullDescription(featured) : featured.excerpt
                return (
                <div style={{ marginBottom: '56px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    marginBottom: '24px',
                  }}>
                    <div style={{ width: '28px', height: '2px', background: '#821905' }} />
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                      fontSize: '12px', color: '#821905', letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>मुख्य समाचार</span>
                  </div>

                  <div
                    className="news-featured-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.15fr 1fr',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: '1.5px solid #f0f0f0',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 50px rgba(130, 25, 5,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)'}
                  >
                    {/* Image */}
                    <div
                      className="news-featured-img"
                      style={{ height: '400px', overflow: 'hidden', position: 'relative' }}
                    >
                      <img
                        src={featured.image}
                        alt={featured.title}
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      {/* Tag badge */}
                      <div style={{
                        position: 'absolute', top: '18px', left: '18px',
                        background: tagColors[featured.tag]?.bg || '#821905',
                        color: tagColors[featured.tag]?.color || '#fff',
                        fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                        fontSize: '11px', padding: '5px 14px', borderRadius: '999px',
                        letterSpacing: '0.04em',
                      }}>
                        {featured.tag}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{
                      padding: '44px 40px',
                      background: '#ffffff',
                      display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    }}>
                      {/* Category + Date */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                        <span style={{
                          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '12px',
                          padding: '4px 12px', borderRadius: '999px',
                          background: categoryColors[featured.category]?.bg || 'rgba(130, 25, 5,0.08)',
                          color: categoryColors[featured.category]?.text || '#821905',
                        }}>
                          {featured.category}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#9ca3af' }}>
                          <Calendar size={13} />
                          <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '12.5px' }}>{featured.date}</span>
                        </div>
                      </div>

                      <h2 style={{
                        fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(18px, 2vw, 24px)',
                        color: '#111827', lineHeight: 1.35, margin: '0 0 18px',
                      }}>
                        {featured.title}
                      </h2>

                      <p style={{
                        fontFamily: 'Hind, sans-serif', fontSize: '14.5px',
                        color: '#6b7280', lineHeight: 1.75, margin: '0 0 30px',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {description}
                      </p>

                      <button
                        type="button"
                        onClick={(e) => toggleExpanded(featured.id, e)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '12px 28px', borderRadius: '999px',
                          background: '#821905', color: '#ffffff',
                          fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13.5px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          alignSelf: 'flex-start',
                          boxShadow: '0 4px 14px rgba(130, 25, 5,0.25)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#5a1002'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 8px 22px rgba(130, 25, 5,0.35)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = '#821905'
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 4px 14px rgba(130, 25, 5,0.25)'
                        }}
                      >
                        {isExpanded ? 'कम पढ़ें' : 'पूरा पढ़ें'} <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
                )
              })()}

              {/* ── Rest articles grid ── */}
              {rest.length > 0 && (
                <>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
                    <div style={{ width: '28px', height: '2px', background: '#821905' }} />
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '12px',
                      color: '#821905', letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      और समाचार
                    </span>
                  </div>

                  <div
                    className="news-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                      gap: '28px',
                    }}
                  >
                    {rest.map((article, idx) => {
                      const isExpanded = expandedIds.has(article.id)
                      const description = isExpanded ? getFullDescription(article) : article.excerpt
                      return (
                      <div key={article.id} className="news-card" style={{ animationDelay: `${idx * 0.08}s` }}>
                        {/* Image */}
                        <div
                          className="news-card-img"
                          style={{ height: '210px', overflow: 'hidden', position: 'relative' }}
                        >
                          <img
                            src={article.image}
                            alt={article.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {/* Gradient overlay */}
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(5,22,14,0.55) 0%, transparent 55%)',
                          }} />
                          {/* Tag badge */}
                          <div style={{
                            position: 'absolute', top: '14px', left: '14px',
                            background: tagColors[article.tag]?.bg || '#821905',
                            color: tagColors[article.tag]?.color || '#fff',
                            fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                            fontSize: '10.5px', padding: '4px 12px', borderRadius: '999px',
                            letterSpacing: '0.04em',
                          }}>
                            {article.tag}
                          </div>
                          {/* Category badge bottom-left */}
                          <div style={{
                            position: 'absolute', bottom: '14px', left: '14px',
                            background: categoryColors[article.category]?.bg || 'rgba(130, 25, 5,0.8)',
                            color: categoryColors[article.category]?.text || '#821905',
                            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '11px',
                            padding: '3px 10px', borderRadius: '999px',
                            backdropFilter: 'blur(4px)',
                          }}>
                            {article.category}
                          </div>
                        </div>

                        {/* Text content */}
                        <div style={{ padding: '24px' }}>
                          {/* Date */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', color: '#9ca3af' }}>
                            <Calendar size={12} />
                            <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '12px' }}>{article.date}</span>
                          </div>

                          {/* Title */}
                          <h3 style={{
                            fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                            fontSize: '15.5px', color: '#111827',
                            lineHeight: 1.45, margin: '0 0 12px',
                          }}>
                            {article.title}
                          </h3>

                          {/* Excerpt / full content */}
                          <p style={{
                            fontFamily: 'Hind, sans-serif', fontSize: '13.5px',
                            color: '#6b7280', lineHeight: 1.7, margin: '0 0 20px',
                            whiteSpace: 'pre-wrap',
                            ...(!isExpanded && {
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }),
                          }}>
                            {description}
                          </p>

                          {/* Read more */}
                          <button
                            type="button"
                            onClick={(e) => toggleExpanded(article.id, e)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13px',
                              color: '#821905', textDecoration: 'none',
                              background: 'none', border: 'none', padding: 0,
                              cursor: 'pointer',
                              transition: 'gap 0.2s ease, color 0.2s ease',
                              borderBottom: '1.5px solid transparent',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.gap = '10px'
                              e.currentTarget.style.borderBottomColor = '#821905'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.gap = '6px'
                              e.currentTarget.style.borderBottomColor = 'transparent'
                            }}
                          >
                            {isExpanded ? 'कम पढ़ें' : 'पूरा पढ़ें'} <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── Load More Button ── */}
          {filtered.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button
                style={{
                  padding: '15px 42px', borderRadius: '999px',
                  border: '1.5px solid #821905',
                  background: 'transparent', color: '#821905',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14px',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#821905'
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(130, 25, 5,0.25)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#821905'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                और समाचार देखें
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default NewsPage
