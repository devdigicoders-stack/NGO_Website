import { useState, useEffect } from 'react'
import { ArrowRight, ArrowUpRight, User, MessageCircle } from 'lucide-react'
import { resolveImageUrl } from '../utils/imageUrl'

const API_BASE = import.meta.env.VITE_API_BASE

const getFullDescription = (post) => {
  const full = post.content?.trim()
  return full || post.excerpt || ''
}

const DEFAULT_SETTINGS = {
  blogSectionSubtitle: 'ज़रूरतमंदों को दान देना शुरू करें',
  blogSectionTitlePrefix: 'हमारे नवीनतम ',
  blogSectionTitleHighlight: 'समाचार',
  blogSectionTitleSuffix: ' और प्रेरणादायक लेख',
  blogSectionCtaText: 'सभी लेख देखें',
  homeDisplayLimit: 3,
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const settingsRes = await fetch(`${API_BASE}/news/settings`)
        const settingsJson = await settingsRes.json()
        let limit = 3
        if (settingsJson.success && settingsJson.data) {
          limit = settingsJson.data.homeDisplayLimit || 3
          setSettings({
            blogSectionSubtitle: settingsJson.data.blogSectionSubtitle || DEFAULT_SETTINGS.blogSectionSubtitle,
            blogSectionTitlePrefix: settingsJson.data.blogSectionTitlePrefix ?? DEFAULT_SETTINGS.blogSectionTitlePrefix,
            blogSectionTitleHighlight: settingsJson.data.blogSectionTitleHighlight || DEFAULT_SETTINGS.blogSectionTitleHighlight,
            blogSectionTitleSuffix: settingsJson.data.blogSectionTitleSuffix ?? DEFAULT_SETTINGS.blogSectionTitleSuffix,
            blogSectionCtaText: settingsJson.data.blogSectionCtaText || DEFAULT_SETTINGS.blogSectionCtaText,
            homeDisplayLimit: limit,
          })
        }

        const postsRes = await fetch(
          `${API_BASE}/news?activeOnly=true&showOnHome=true&limit=${limit}`,
        )
        const postsJson = await postsRes.json()
        if (postsJson.success && postsJson.data?.length) {
          setBlogPosts(
            postsJson.data.map((p) => ({
              id: p.id,
              title: p.title,
              excerpt: p.excerpt || '',
              content: p.content || '',
              category: p.category,
              comments: `टिप्पणियाँ (${String(p.commentCount || 0).padStart(2, '0')})`,
              image: resolveImageUrl(p.image),
              author: p.author || 'सहायता फाउंडेशन',
            })),
          )
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [])

  const gridCols = blogPosts.length === 0 ? 3 : Math.min(blogPosts.length, 3)

  const goToNewsPage = (e) => {
    e.preventDefault()
    window.dispatchEvent(new Event('navigate-news'))
  }

  return (
    <section
      id="blog-section"
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
          .blog-cards-grid {
            grid-template-columns: 1fr !important;
            max-width: 500px !important;
            padding: 0 12px !important;
          }
        }
        @keyframes float-heart-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        .animate-float-heart {
          animation: float-heart-slow 8s ease-in-out infinite;
        }
      `}} />

      <div
        className="animate-float-heart"
        style={{
          position: 'absolute',
          left: '4%',
          top: '22%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.8,
          color: '#FDED95',
        }}
      >
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ filter: 'drop-shadow(0 4px 10px rgba(253, 237, 149,0.25))' }}>
          <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
        </svg>
      </div>

      <div
        className="animate-float-heart"
        style={{
          position: 'absolute',
          right: '4%',
          top: '12%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.16,
          color: '#821905',
          animationDelay: '1.5s',
        }}
      >
        <svg width="105" height="105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
        </svg>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" stroke="#821905" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 14C8.5 14.5 9.5 15 12 15C14.5 15 15.5 14.5 17 14" stroke="#821905" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '20px',
                color: '#821905',
                letterSpacing: '0.02em',
              }}
            >
              {settings.blogSectionSubtitle}
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
            {settings.blogSectionTitlePrefix}
            <span style={{ color: '#821905', borderBottom: '3px solid #FDED95', paddingBottom: '1px' }}>{settings.blogSectionTitleHighlight}</span>
            {settings.blogSectionTitleSuffix}
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>
            लोड हो रहा है...
          </div>
        ) : blogPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>
            जल्द ही नए समाचार यहाँ दिखाई देंगे।
          </div>
        ) : (
          <div
            className="blog-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gap: '30px',
              maxWidth: '1140px',
              margin: '0 auto',
              marginBottom: '52px',
            }}
          >
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="/news"
            onClick={goToNewsPage}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FDED95',
              color: '#111827',
              fontFamily: 'Hind, sans-serif',
              fontWeight: 800,
              fontSize: '14.5px',
              padding: '13px 36px',
              borderRadius: '999px',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(253, 237, 149,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(253, 237, 149,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(253, 237, 149,0.3)' }}
          >
            {settings.blogSectionCtaText} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

const BlogCard = ({ post }) => {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const description = expanded ? getFullDescription(post) : post.excerpt

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1.5px solid #efefef',
        padding: '14px',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.07)' : '0 8px 24px rgba(0,0,0,0.015)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%', aspectRatio: '16/11', borderRadius: '18px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(0%)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)' }} />
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: '#821905',
            color: '#ffffff',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: 'Hind, sans-serif',
            padding: '4px 12px',
            borderRadius: '999px',
          }}
        >
          {post.category}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '18px 6px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <User size={14} style={{ color: '#FDED95' }} />
          <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '12.5px', color: '#6b7280', fontWeight: 600 }}>
            {post.author}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MessageCircle size={14} style={{ color: '#FDED95' }} />
          <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '12.5px', color: '#6b7280', fontWeight: 600 }}>
            {post.comments}
          </span>
        </div>
      </div>

      <h3
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 750,
          fontSize: '14.5px',
          color: '#111827',
          lineHeight: 1.45,
          margin: '0 6px 10px',
        }}
      >
        {post.title}
      </h3>

      {post.excerpt && (
        <p
          style={{
            fontFamily: 'Hind, sans-serif',
            fontSize: '13px',
            color: '#6b7280',
            lineHeight: 1.65,
            margin: '0 6px 14px',
            flexGrow: 1,
            whiteSpace: 'pre-wrap',
            ...(!expanded && {
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }),
          }}
        >
          {description}
        </p>
      )}

      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '14px', margin: '0 6px 4px', marginTop: 'auto' }}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#821905',
            fontFamily: 'Hind, sans-serif',
            fontWeight: 800,
            fontSize: '13px',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          {expanded ? 'कम पढ़ें' : 'विस्तार से पढ़ें'}
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'rgba(130, 25, 5,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: hovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 0.2s',
            }}
          >
            <ArrowRight size={12} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default BlogSection
