import { Mail, Phone, Heart, MapPin } from 'lucide-react'
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from '../ui/SocialIcons'
import { goToContact } from '../../utils/navigation'

const socials = [
  { Icon: FacebookIcon, label: 'फेसबुक' },
  { Icon: TwitterIcon, label: 'ट्विटर' },
  { Icon: YoutubeIcon, label: 'यूट्यूब' },
  { Icon: InstagramIcon, label: 'इंस्टाग्राम' },
]

const ContactItem = ({ href, icon: Icon, text }) => (
  <a
    href={href}
    style={{
      display: 'flex', alignItems: 'center', gap: '7px',
      padding: '4px 10px', borderRadius: '999px',
      color: '#fff', textDecoration: 'none',
      fontSize: '12.5px', fontFamily: 'Hind, sans-serif', fontWeight: 500,
      transition: 'background 0.2s, color 0.2s',
      lineHeight: 1,
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#FDED95' }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
  >
    <Icon size={13} style={{ color: '#FDED95', flexShrink: 0, display: 'block' }} />
    <span style={{ lineHeight: 1 }} className="hidden sm:inline">{text}</span>
  </a>
)

const Topbar = () => {
  return (
    <div className="hidden md:block" style={{ background: '#821905', color: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '40px', gap: '12px',
        }}>

          {/* Left: Contact Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <ContactItem href="mailto:Shakti.singh20017@gmail.com" icon={Mail} text="Shakti.singh20017@gmail.com" />

            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', userSelect: 'none' }} className="hidden sm:inline">|</span>

            <ContactItem href="tel:+911234567890" icon={Phone} text=" 9569036324" />

            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', userSelect: 'none' }} className="hidden lg:inline">|</span>

            <div
              className="hidden lg:flex"
              style={{ alignItems: 'center', gap: '7px', padding: '4px 10px', color: 'rgba(255,255,255,0.65)', fontSize: '12.5px', fontFamily: 'Hind, sans-serif', lineHeight: 1 }}
            >
              <MapPin size={13} style={{ color: '#FDED95', flexShrink: 0, display: 'block' }} />
              <span style={{ lineHeight: 1 }}>486/238डी डालीगंज लखनऊ उत्तर प्रदेश 226020</span>
            </div>
          </div>

          {/* Right: Badge + Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>

            {/* Volunteer Badge → Contact page */}
            <button
              type="button"
              className="hidden lg:flex"
              onClick={goToContact}
              style={{
                alignItems: 'center', gap: '7px',
                background: 'rgba(253, 237, 149,0.15)',
                border: '1px solid rgba(253, 237, 149,0.3)',
                padding: '4px 14px', borderRadius: '999px',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(253, 237, 149,0.28)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(253, 237, 149,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Heart size={11} style={{ color: '#FDED95', fill: '#FDED95', flexShrink: 0, display: 'block' }} />
              <span style={{ color: '#FDED95', fontSize: '11px', fontWeight: 600, fontFamily: 'Hind, sans-serif', whiteSpace: 'nowrap', lineHeight: 1 }}>
                जरूरतमंदों की मदद करें — आज ही स्वयंसेवक बनें!
              </span>
            </button>

            {/* Divider */}
            <div className="hidden lg:block" style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.2)' }} />

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none',
                    transition: 'background 0.25s, color 0.25s, transform 0.25s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FDED95'; e.currentTarget.style.color = '#821905'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, rgba(253, 237, 149,0.4), transparent)' }} />
    </div>
  )
}

export default Topbar
