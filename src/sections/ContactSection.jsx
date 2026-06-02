import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from '../components/ui/SocialIcons'
import SectionHeader from '../components/ui/SectionHeader'

const contactInfo = [
  { Icon: Mail, label: 'ईमेल पता', value: 'sahayata@example.com', href: 'mailto:sahayata@example.com' },
  { Icon: Phone, label: 'फोन नंबर', value: '+91-123-456-7890', href: 'tel:+911234567890' },
  { Icon: MapPin, label: 'मुख्य कार्यालय', value: 'कनॉट प्लेस, नई दिल्ली — 110001', href: '#' },
]

const socials = [
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: YoutubeIcon, label: 'YouTube' },
]

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <SectionHeader
          tag="संपर्क करें"
          title="हम आपकी बात सुनना चाहते हैं"
          subtitle="किसी भी जानकारी, सहयोग या स्वयंसेवा के लिए हमसे बेझिझक संपर्क करें। हमारी टीम 24 घंटे आपकी मदद के लिए तत्पर है।"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Info Cards */}
          <div className="space-y-4">
            {contactInfo.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#1a5c38]/20 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl icon-bg-light group-hover:bg-[#1a5c38] flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Icon size={20} className="text-[#1a5c38] group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-['Hind']">{label}</p>
                  <p className="text-gray-800 font-semibold text-sm font-['Hind']">{value}</p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="p-4 rounded-xl border border-gray-100">
              <p className="text-gray-400 text-xs font-['Hind'] mb-3">सोशल मीडिया पर जुड़ें</p>
              <div className="flex gap-2">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-full icon-bg-light hover:bg-[#1a5c38] flex items-center justify-center text-[#1a5c38] hover:text-white transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-900 font-['Poppins'] mb-4">संदेश भेजें</h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="आपका नाम"
                className="col-span-2 sm:col-span-1 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] focus:outline-none focus:border-[#1a5c38] transition-colors"
              />
              <input
                type="email"
                placeholder="ईमेल"
                className="col-span-2 sm:col-span-1 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] focus:outline-none focus:border-[#1a5c38] transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="विषय"
              className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] mb-3 focus:outline-none focus:border-[#1a5c38] transition-colors"
            />
            <textarea
              rows={4}
              placeholder="आपका संदेश लिखें..."
              className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] mb-4 focus:outline-none focus:border-[#1a5c38] transition-colors resize-none"
            />
            <button
              id="contact-submit-btn"
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold font-['Hind']"
            >
              <Send size={15} />
              संदेश भेजें
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection
