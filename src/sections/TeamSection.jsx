import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Plus, ChevronUp } from 'lucide-react'
import { FacebookIcon, TwitterIcon, InstagramIcon } from '../components/ui/SocialIcons'
import { resolveImageUrl } from '../utils/imageUrl'

const API_BASE = import.meta.env.VITE_API_BASE

const DEFAULT_SETTINGS = {
  sectionSubtitle: 'ज़रूरतमंदों को दान देना शुरू करें',
  sectionTitle: 'हमारे समर्पित स्वयंसेवक दल से मिलें',
}

const INITIAL_VISIBLE_COUNT = 4

const mapMemberForCard = (m) => ({
  id: m.id,
  name: m.name,
  role: m.designation,
  image: resolveImageUrl(m.image),
  facebook: m.facebook || '#',
  twitter: m.twitter || '#',
  instagram: m.instagram || '#',
  behance: m.other || '#',
})

const TeamCard = ({ member }) => {
  const [hov, setHov] = useState(false)
  const hasLink = (url) => url && url !== '#'

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#f4f6f4',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: hov ? '0 20px 40px rgba(0,0,0,0.08)' : '0 4px 16px rgba(0,0,0,0.02)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', zIndex: 1 }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%',
            height: '320px',
            objectFit: 'cover',
            objectPosition: 'top',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            filter: hov ? 'grayscale(0%)' : 'grayscale(15%)',
            transition: 'transform 0.5s ease, filter 0.5s ease',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(130, 25, 5, 0.18)',
            opacity: hov ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: hov ? '16px' : '-48px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transition: 'right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: 10,
          }}
        >
          {hasLink(member.facebook) && (
            <a
              href={member.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111827',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#821905'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#111827' }}
            >
              <FacebookIcon size={14} />
            </a>
          )}

          {hasLink(member.twitter) && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111827',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#821905'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#111827' }}
            >
              <TwitterIcon size={14} />
            </a>
          )}

          {hasLink(member.instagram) && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111827',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#821905'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#111827' }}
            >
              <InstagramIcon size={14} />
            </a>
          )}

          {hasLink(member.behance) && (
            <a
              href={member.behance}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111827',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#821905'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#111827' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.22 17.53c-1.12 0-2.07-.33-2.85-1-.77-.66-1.16-1.57-1.16-2.73s.4-2.09 1.2-2.78c.8-.69 1.77-1.04 2.91-1.04 .41 0 .88.06 1.4.19v-.63c0-.75-.19-1.32-.57-1.72s-.98-.6-1.79-.6c-.73 0-1.33.15-1.79.45s-.76.71-.89 1.22H3.7c.14-1.04.66-1.87 1.57-2.48s2.07-.92 3.49-.92c1.47 0 2.62.37 3.45 1.1s1.24 1.79 1.24 3.19v6.16h-1.63v-1.42c-.75 1.08-1.89 1.63-3.6 1.63zm.57-1.48c.84 0 1.53-.29 2.07-.86s.81-1.35.81-2.33c-.45-.16-.92-.24-1.42-.24-1.73 0-2.6 1.15-2.6 2.05 0 .42.13.77.38 1.04s.48.34.76.34zm9.32-6.52v.89h3.76v-.89H18.11zm1.75 8.16c-1.38 0-2.42-.4-3.13-1.19s-1.06-1.92-1.06-3.39c0-1.45.36-2.58 1.08-3.37s1.72-1.19 3.01-1.19c1.23 0 2.19.38 2.87 1.15s1.02 1.83 1.02 3.19h-6.32c.07.82.31 1.45.72 1.89s.94.66 1.59.66c.92 0 1.63-.4 2.13-1.22h1.69c-.66 1.65-2.03 2.48-4.11 2.48zm2.22-5.74c-.06-.75-.28-1.32-.66-1.7s-.86-.57-1.44-.57c-.6 0-1.07.19-1.42.57s-.56.95-.62 1.7H22.08z" />
              </svg>
            </a>
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            right: '20px',
            bottom: '-20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#821905',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(130, 25, 5,0.3)',
            zIndex: 15,
            transition: 'transform 0.3s ease',
            transform: hov ? 'rotate(90deg) scale(1.08)' : 'rotate(0deg) scale(1)',
          }}
        >
          <Plus size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div
        style={{
          padding: '24px 24px 28px',
          background: hov ? '#821905' : 'transparent',
          transition: 'background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <h3
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: '17px',
            color: hov ? '#ffffff' : '#111827',
            margin: '0 0 6px',
            transition: 'color 0.4s ease',
          }}
        >
          {member.name}
        </h3>
        <p
          style={{
            fontFamily: 'Hind, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: hov ? 'rgba(255,255,255,0.7)' : '#6b7280',
            margin: 0,
            transition: 'color 0.4s ease',
          }}
        >
          {member.role}
        </p>
      </div>
    </div>
  )
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const gridRef = useRef(null)

  const hasMore = teamMembers.length > INITIAL_VISIBLE_COUNT
  const visibleMembers = showAll || !hasMore
    ? teamMembers
    : teamMembers.slice(0, INITIAL_VISIBLE_COUNT)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const [membersRes, settingsRes] = await Promise.all([
          fetch(`${API_BASE}/team?activeOnly=true`),
          fetch(`${API_BASE}/team/settings`),
        ])
        const membersJson = await membersRes.json()
        const settingsJson = await settingsRes.json()

        if (membersJson.success && membersJson.data?.length) {
          setTeamMembers(membersJson.data.map(mapMemberForCard))
        }

        if (settingsJson.success && settingsJson.data) {
          setSettings({
            sectionSubtitle: settingsJson.data.sectionSubtitle || DEFAULT_SETTINGS.sectionSubtitle,
            sectionTitle: settingsJson.data.sectionTitle || DEFAULT_SETTINGS.sectionTitle,
          })
        }
      } catch (err) {
        console.error('Error fetching team:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  const handleToggleShowAll = () => {
    if (showAll) {
      setShowAll(false)
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setShowAll(true)
  }

  return (
    <section id="team" style={{ background: '#ffffff', padding: '90px 0 100px', overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          right: '5%',
          top: '40px',
          color: '#821905',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M50,85 C45,75 12,50 12,30 C12,18 22,8 35,8 C45,8 50,15 50,15 C50,15 55,8 65,8 C78,8 88,18 88,30 C88,50 55,75 50,85 Z" />
        </svg>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '18px',
                color: '#821905',
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
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#111827',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {settings.sectionTitle}
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>
            लोड हो रहा है...
          </div>
        ) : teamMembers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>
            जल्द ही हमारी टीम यहाँ दिखाई देगी।
          </div>
        ) : (
          <div
            ref={gridRef}
            className="team-main-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(visibleMembers.length, 4)}, 1fr)`,
              gap: '28px',
              marginBottom: hasMore ? '28px' : '50px',
            }}
          >
            {visibleMembers.map(m => (
              <TeamCard key={m.id || m.name} member={m} />
            ))}
          </div>
        )}

        {hasMore && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleToggleShowAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '999px',
                border: 'none',
                background: showAll ? '#faf0ee' : '#821905',
                color: showAll ? '#821905' : '#ffffff',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: showAll ? 'none' : '0 4px 16px rgba(130, 25, 5,0.25)',
              }}
              onMouseEnter={e => {
                if (!showAll) {
                  e.currentTarget.style.background = '#5a1002'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={e => {
                if (!showAll) {
                  e.currentTarget.style.background = '#821905'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {showAll ? (
                <>
                  कम देखें <ChevronUp size={16} />
                </>
              ) : (
                <>
                  सभी को देखें ({teamMembers.length}) <ArrowUpRight size={16} />
                </>
              )}
            </button>
            {!showAll && (
              <span style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: '#6b7280' }}>
                {INITIAL_VISIBLE_COUNT} में से {teamMembers.length} सदस्य दिखाए जा रहे हैं
              </span>
            )}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .team-main-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .team-main-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}} />
    </section>
  )
}

export default TeamSection
