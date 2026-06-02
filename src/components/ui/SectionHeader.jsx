// ── Reusable Section Header Component ──
// Props:
//   tag      : string  — small label above title (e.g. "हमारे बारे में")
//   title    : string  — main heading
//   subtitle : string  — optional paragraph below heading
//   light    : bool    — true = white text (for dark backgrounds)

const SectionHeader = ({ tag, title, subtitle, light = false }) => (
  <div className="text-center mb-10">
    <span
      className={`text-xs font-bold tracking-[0.2em] uppercase font-['Hind'] ${
        light ? 'text-[#f5b400]' : 'text-[#1a5c38]'
      }`}
    >
      {tag}
    </span>
    <h2
      className={`text-2xl md:text-3xl font-bold font-['Poppins'] mt-2 ${
        light ? 'text-white' : 'text-gray-900'
      }`}
    >
      {title}
    </h2>
    <div className="w-12 h-1 bg-[#f5b400] mx-auto mt-3 rounded-full" />
    {subtitle && (
      <p
        className={`mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed font-['Hind'] ${
          light ? 'text-white/70' : 'text-gray-500'
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
)

export default SectionHeader
