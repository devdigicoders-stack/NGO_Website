
// ImageMarqueeStrip — Continuously scrolling photo strip just above the Footer
const ImageMarqueeStrip = () => {
  // All available images — duplicated for seamless infinite scroll
  const images = [
    { src: '/images/about_child1.png',    alt: 'Children support' },
    { src: '/images/hero.png',            alt: 'Children in need' },
    { src: '/images/about_child2.png',    alt: 'Child portrait' },
    { src: '/images/donation_children.png', alt: 'Donation children' },
    { src: '/images/about_child3.png',    alt: 'Child smiling' },
    { src: '/images/hero1.png',           alt: 'Kids together' },
    { src: '/images/volunteer_child.png', alt: 'Volunteer with child' },
    { src: '/images/team1.png',           alt: 'Team member' },
    { src: '/images/team2.png',           alt: 'Team member' },
    { src: '/images/team3.png',           alt: 'Team member' },
    { src: '/images/team4.png',           alt: 'Team member' },
  ]

  // Duplicate images for seamless loop
  const track = [...images, ...images]

  return (
    <div
      style={{
        background: '#1f0502',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '3px solid #821905',
      }}
    >
      {/* Keyframe animation injected inline */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 38s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-img-wrap {
          flex-shrink: 0;
          width: 200px;
          height: 160px;
          overflow: hidden;
          position: relative;
        }
        @media (max-width: 768px) {
          .marquee-img-wrap {
            width: 140px;
            height: 115px;
          }
        }
        .marquee-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease, filter 0.5s ease;
          filter: brightness(0.82) saturate(0.9);
        }
        .marquee-img-wrap:hover img {
          transform: scale(1.08);
          filter: brightness(1) saturate(1.1);
        }
        /* Fade-edge vignettes on both sides */
        .marquee-fade-left {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 100px;
          background: linear-gradient(to right, #1f0502 0%, transparent 100%);
          pointer-events: none;
          z-index: 5;
        }
        .marquee-fade-right {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 100px;
          background: linear-gradient(to left, #1f0502 0%, transparent 100%);
          pointer-events: none;
          z-index: 5;
        }
      `}} />

      {/* Left vignette fade */}
      <div className="marquee-fade-left" />
      {/* Right vignette fade */}
      <div className="marquee-fade-right" />

      {/* Scrolling image track */}
      <div className="marquee-track">
        {track.map((img, i) => (
          <div key={i} className="marquee-img-wrap">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageMarqueeStrip
