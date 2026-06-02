import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { handlePageLink } from '../utils/navigation'

/** Volunteer slide → contact page; other slides → donate page */
const slideCtaHref = (index) => (index === 1 ? 'contact-page' : 'donate-page')

const slides = [
  {
    id: 0,
    title: 'वृद्ध एवं वंचित बच्चों की सेवा',
    subtitle: 'बाल और वृद्ध कल्याण',
    image: '/images/about_child1.png',
  },
  {
    id: 1,
    title: 'स्वयंसेवक दल में शामिल हों',
    subtitle: 'ज़रूरतमंदों की मदद करें',
    image: '/images/volunteer_child.png',
  },
  {
    id: 2,
    title: 'बच्चों की शिक्षा में सहायता',
    subtitle: 'गरीब बच्चों के लिए उज्ज्वल भविष्य',
    image: '/images/about_child3.png',
  },
  {
    id: 3,
    title: 'चिकित्सा देखभाल और पोषण',
    subtitle: 'सुरक्षित स्वास्थ्य सेवाएं',
    image: '/images/hero1.png',
  },
]

const ShowcaseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Continuous autoplay that resets the timer dynamically when index changes
  useEffect(() => {
    const timer = setInterval(nextSlide, 3500)
    return () => clearInterval(timer)
  }, [activeIndex])

  return (
    <section 
      id="showcase-slider"
      style={{
        background: '#ffffff',
        padding: '80px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      
      {/* ─── Self-Contained 3D CSS Styles ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        .slider-perspective-container {
          perspective: 1200px;
          position: relative;
          height: 380px;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slide-card-3d {
          position: absolute;
          width: 440px;
          height: 310px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          transition: all 0.65s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .arrow-nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
          transition: all 0.25s ease;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 40;
        }
        .arrow-nav-left {
          left: 4%;
          background: #1a5c38;
          color: #ffffff;
        }
        .arrow-nav-left:hover {
          background: #124027;
          transform: translateY(-50%) scale(1.08);
        }
        .arrow-nav-right {
          right: 4%;
          background: #f5b400;
          color: #111827;
        }
        .arrow-nav-right:hover {
          background: #ffd54f;
          transform: translateY(-50%) scale(1.08);
        }
        @media (max-width: 768px) {
          .slide-card-3d {
            width: 88% !important;
            height: 260px !important;
          }
          .slider-perspective-container {
            height: 300px !important;
          }
        }
        @media (max-width: 768px) {
          .slide-card-3d:not(.active-3d) {
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }
        @media (max-width: 640px) {
          .arrow-nav-btn {
            display: none !important;
          }
        }
      `}} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        
        {/* ─── 3D PERSPECTIVE CAROUSEL CANVAS ─── */}
        <div className="slider-perspective-container">
          
          {slides.map((slide, index) => {
            // Infinite wrapping layout offset calculation
            let offset = index - activeIndex
            if (offset < -1) offset += slides.length
            if (offset > 1) offset -= slides.length

            const isActive = offset === 0
            const isLeft = offset === -1
            const isRight = offset === 1
            const isVisible = isActive || isLeft || isRight

            // Compute dynamic 3D styles based on offset
            let style = {}
            if (isActive) {
              style = {
                transform: 'translateX(0px) rotateY(0deg) translateZ(40px) scale(1)',
                opacity: 1,
                zIndex: 20,
                filter: 'grayscale(0%)',
              }
            } else if (isLeft) {
              style = {
                // Tilted to the right perspective
                transform: 'translateX(-220px) rotateY(24deg) translateZ(-80px) scale(0.85)',
                opacity: 0.7,
                zIndex: 10,
                filter: 'grayscale(100%)',
              }
            } else if (isRight) {
              style = {
                // Tilted to the left perspective
                transform: 'translateX(220px) rotateY(-24deg) translateZ(-80px) scale(0.85)',
                opacity: 0.7,
                zIndex: 10,
                filter: 'grayscale(100%)',
              }
            } else {
              // Completely hidden slides transition smoothly in the background
              style = {
                transform: `translateX(${offset * 320}px) rotateY(0deg) translateZ(-160px) scale(0.5)`,
                opacity: 0,
                zIndex: 0,
                pointerEvents: 'none',
              }
            }

            return (
              <div 
                key={slide.id}
                className={`slide-card-3d ${isActive ? 'active-3d' : ''}`}
                style={{
                  ...style,
                  position: 'absolute',
                }}
              >
                {/* Main Slide Image */}
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'filter 0.5s ease',
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive 
                      ? 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)' 
                      : 'rgba(0, 0, 0, 0.45)',
                    transition: 'background 0.5s',
                  }}
                />

                {/* Center Green Diagonal Arrow overlay button on active card */}
                {isActive && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      zIndex: 30,
                    }}
                  >
                    <a 
                      href={slideCtaHref(activeIndex)}
                      onClick={(e) => handlePageLink(slideCtaHref(activeIndex), e)}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: '#1a5c38',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(26,92,56,0.4)',
                        textDecoration: 'none',
                        transition: 'transform 0.25s, background-color 0.25s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.backgroundColor = '#124027' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#1a5c38' }}
                    >
                      <ArrowUpRight size={28} />
                    </a>

                    {/* Small sub-indicator square badge */}
                    <div 
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '1px',
                        background: '#1a5c38',
                        boxShadow: '0 0 0 3px rgba(255,255,255,0.4)',
                      }}
                    />
                  </div>
                )}

              </div>
            )
          })}


          {/* ─── Nav Controllers (Absolute) ─── */}
          <button 
            type="button" 
            onClick={prevSlide}
            aria-label="पिछला चित्र"
            className="arrow-nav-btn arrow-nav-left"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>

          <button 
            type="button" 
            onClick={nextSlide}
            aria-label="अगला चित्र"
            className="arrow-nav-btn arrow-nav-right"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>

        </div>


        {/* ─── Active Slide Title & Subtitle row ─── */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          
          <h3 
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '22px',
              color: '#0d2218',
              margin: '0 0 4px',
              letterSpacing: '-0.02em',
            }}
          >
            {slides[activeIndex].title}
          </h3>

          <p 
            style={{
              fontFamily: 'Hind, sans-serif',
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            {slides[activeIndex].subtitle}
          </p>

        </div>

      </div>

    </section>
  )
}

export default ShowcaseCarousel
