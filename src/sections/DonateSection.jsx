import { useState, useEffect } from 'react'
import { CheckCircle2, Heart } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE

const DEFAULT_FEATURES = [
  '100% पारदर्शी उपयोग',
  '80G कर-मुक्ति प्रमाण पत्र',
  'हर दान की डिजिटल रसीद',
  'वार्षिक प्रभाव रिपोर्ट',
]

const DonateSection = () => {
  const [selected, setSelected] = useState(null)
  const [amounts, setAmounts] = useState(['₹500', '₹1,000', '₹2,500', '₹5,000'])
  const [features, setFeatures] = useState(DEFAULT_FEATURES)

  useEffect(() => {
    fetch(`${API_BASE}/donations/settings`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.presetAmounts?.length) {
          setAmounts(json.data.presetAmounts.slice(0, 4).map((n) => `₹${n.toLocaleString('en-IN')}`))
        }
        if (json.success && json.data?.trustBadges?.length) {
          setFeatures(json.data.trustBadges.map((b) => b.text))
        }
      })
      .catch(() => {})
  }, [])

  const goToDonate = (e) => {
    e.preventDefault()
    window.dispatchEvent(new Event('navigate-donate'))
  }

  return (
    <section id="donate" className="py-16 bg-[#1a5c38] relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <div>
            <span className="text-[#f5b400] text-xs font-bold tracking-[0.2em] uppercase font-['Hind']">
              दान करें
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-['Poppins'] mt-2 mb-4">
              आपका दान बदल सकता है<br />
              <span className="text-[#f5b400]">किसी की पूरी ज़िंदगी</span>
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed font-['Hind'] mb-6">
              आपका हर रुपया सीधे जरूरतमंद लोगों तक पहुंचता है। हम पूरी पारदर्शिता के साथ काम करते हैं और आपको आपके दान का पूरा हिसाब देते हैं।
            </p>
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-white/80 text-sm font-['Hind']">
                  <CheckCircle2 size={16} className="text-[#f5b400] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Donation Form Card */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900 font-['Poppins'] mb-4">
              दान की राशि चुनें
            </h3>

            {/* Amount Selector */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelected(amt)}
                  className={`py-2.5 rounded-lg border-2 text-sm font-bold font-['Hind'] transition-all duration-200 ${
                    selected === amt
                      ? 'border-[#1a5c38] bg-[#1a5c38] text-white'
                      : 'border-gray-200 text-[#1a5c38] hover:border-[#1a5c38]'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="अन्य राशि दर्ज करें (₹)"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 font-['Hind'] mb-3 focus:outline-none focus:border-[#1a5c38] transition-colors"
            />
            <input
              type="text"
              placeholder="आपका पूरा नाम"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 font-['Hind'] mb-3 focus:outline-none focus:border-[#1a5c38] transition-colors"
            />
            <input
              type="email"
              placeholder="ईमेल पता"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 font-['Hind'] mb-4 focus:outline-none focus:border-[#1a5c38] transition-colors"
            />

            <a
              href="/donate"
              id="donate-submit-btn"
              onClick={goToDonate}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold font-['Hind'] no-underline"
            >
              <Heart size={16} className="fill-current" />
              अभी दान करें
            </a>
            <p className="text-center text-gray-400 text-[11px] mt-3 font-['Hind']">
              100% सुरक्षित भुगतान • SSL एन्क्रिप्टेड
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DonateSection
