import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from '../components/ui/SocialIcons'
import SectionHeader from '../components/ui/SectionHeader'

const contactInfo = [
  { Icon: Mail, label: 'ईमेल पता', value: 'Shakti.singh20017@gmail.com', href: 'mailto:Shakti.singh20017@gmail.com' },
  { Icon: Phone, label: 'फोन नंबर', value: ' 9569036324', href: 'tel:+911234567890' },
  { Icon: MapPin, label: 'मुख्य कार्यालय', value: '486/238डी डालीगंज लखनऊ उत्तर प्रदेश 226020', href: '#' },
]

const socials = [
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: YoutubeIcon, label: 'YouTube' },
]

const ContactSection = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const API_BASE = import.meta.env.VITE_API_BASE

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)
    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })
      const json = await res.json()
      if (json.success) {
        setContactForm({ name: '', email: '', subject: '', message: '' })
        setSubmitSuccess(true)
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        setSubmitError(json.message || 'संदेश भेजने में समस्या हुई।')
      }
    } catch (err) {
      setSubmitError('सर्वर से कनेक्ट नहीं हो पाया। कृपया पुनः प्रयास करें।')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#821905]/20 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl icon-bg-light group-hover:bg-[#821905] flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Icon size={20} className="text-[#821905] group-hover:text-white transition-colors duration-200" />
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
                    className="w-9 h-9 rounded-full icon-bg-light hover:bg-[#821905] flex items-center justify-center text-[#821905] hover:text-white transition-all duration-200"
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

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="आपका नाम"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                required
                className="col-span-2 sm:col-span-1 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] focus:outline-none focus:border-[#821905] transition-colors"
              />
              <input
                type="email"
                placeholder="ईमेल"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                required
                className="col-span-2 sm:col-span-1 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] focus:outline-none focus:border-[#821905] transition-colors"
              />
              <input
                type="text"
                placeholder="विषय"
                value={contactForm.subject}
                onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                required
                className="col-span-2 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] focus:outline-none focus:border-[#821905] transition-colors"
              />
              <textarea
                rows={4}
                placeholder="आपका संदेश लिखें..."
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                required
                className="col-span-2 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm font-['Hind'] focus:outline-none focus:border-[#821905] transition-colors resize-none"
              />
              {submitError && (
                <div className="col-span-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-['Hind']">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="col-span-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-['Hind']">
                  ✓ धन्यवाद! आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="col-span-2 btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold font-['Hind'] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={15} />
                {isSubmitting ? 'भेज रहे हैं...' : 'संदेश भेजें'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection
