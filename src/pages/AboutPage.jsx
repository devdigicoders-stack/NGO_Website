import { useState } from 'react'
import { Heart, Phone, ArrowUpRight, CheckCircle2, Play, ChevronDown, ChevronRight, Check } from 'lucide-react'
import TeamSection from '../sections/TeamSection'
import Testimonials from '../sections/Testimonials'
import DonationQueryFormSection from '../sections/DonationQueryFormSection'

const AboutPage = () => {
  const bullets = [
    '3,250+ सफल सामाजिक परियोजनाओं का संचालन किया है।',
    'हम हर गरीब और वंचित बच्चे को शिक्षा का उपहार देते हैं।',
    'हम कंपनियों को उनके सामाजिक उत्तरदायित्व (CSR) को सुदृढ़ करने में मदद करते हैं।',
  ]

  const cells = [
    { 
      name: 'राष्ट्रीय क्राइम इन्वेस्टिगेशन ब्यूरो', 
      img: '/ID/crime.png', 
      desc: 'समाज में बढ़ते अपराधों के उन्मूलन, जन-जागरूकता फैलाने और स्थानीय प्रशासन व पुलिस के सहयोग से अपराध मुक्त समाज बनाना।' 
    },
    { 
      name: 'भ्रष्टाचार उन्मूलन अपराध अनुसंधान केन्द्र साधू', 
      img: '/ID/bhrast.png', 
      desc: 'शासकीय और गैर-शासकीय स्तर पर व्याप्त भ्रष्टाचार के खिलाफ जन-आंदोलन खड़ा करना तथा पारदर्शिता व ईमानदारी को बढ़ावा देना।' 
    },
    { 
      name: 'राइट टू रिकॉल मंच',
      img: '/ID/right.png', 
      desc: 'शोषण, अन्याय और अत्याचार के शिकार वंचितों को कानूनी सहायता प्रदान करना तथा मानवाधिकारों के संरक्षण के प्रति सजगता बढ़ाना।' 
    },
    { 
      name: 'राष्ट्रीय पत्रकार समर्पित संघ ', 
      img: '/ID/press.png', 
      desc: 'निष्पक्ष पत्रकारिता को बढ़ावा देना, पत्रकारों के हितों व अधिकारों की रक्षा करना तथा लोक-कल्याणकारी संवाद माध्यमों का संचालन करना।' 
    },
    { 
      name: 'राष्ट्रीय हिन्दू महासभा साधू', 
      img: '/ID/hindu.png', 
      desc: 'सनातनी संस्कृति, संस्कारों का संवर्धन, हिंदू समाज में आपसी समरसता बढ़ाना तथा धार्मिक उत्सवों व परंपराओं का संरक्षण करना।' 
    },
    { 
      name: 'भारतीय मुस्लिम मंच', 
      img: '/ID/mushlim.png', 
      desc: 'अल्पसंख्यक वर्ग के युवाओं को शिक्षा, रोजगारपरक कौशल और मुख्यधारा से जोड़ना तथा आपसी भाईचारे व सामाजिक विकास में योगदान देना।' 
    },
    { 
      name: 'इंडियन काउंसिल ऑफ जर्नलिस्ट साधू', 
      img: '/ID/indian_council.png', 
      desc: 'राष्ट्रीय एकता, अखंडता, संवैधानिक मूल्यों की रक्षा तथा देशप्रेम की भावना को जन-जन तक पहुँचाने हेतु संगठित प्रयास करना।' 
    },
    { 
      name: 'आखिल भारतीय चिकित्सा संघ', 
      img: '/ID/akhil.png', 
      desc: 'राष्ट्रीय स्तर पर समाज कल्याण, आपदा राहत, स्वास्थ्य व शिक्षा सेवाओं का सुचारू प्रबंधन एवं स्वयंसेवक नेटवर्क का संचालन करना।' 
    },
  ]

  return (
    <div style={{ background: '#ffffff', overflow: 'hidden' }}>
      
      {/* ─── Self-Contained Styles for Page Hero & Collage ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes hero-float-heart {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-hero-heart {
          animation: hero-float-heart 7s ease-in-out infinite;
        }
        .about-collage-perspective {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 440px;
        }
        @media (max-width: 900px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-collage-perspective {
            margin: 0 auto 30px !important;
          }
        }
        @media (max-width: 480px) {
          .about-collage-perspective {
            transform: scale(0.85);
            transform-origin: center top;
            height: 380px !important;
          }
        }
        @media (max-width: 400px) {
          .about-collage-perspective {
            transform: scale(0.72);
            transform-origin: center top;
            height: 320px !important;
          }
        }
      `}} />

      {/* ─── 1. About Us Hero Banner ─── */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #2a0501 0%, #5a1002 100%)',
          height: '280px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        {/* Grayscale Background Image (Luminosity Mix-Blend) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.22,
            mixBlendMode: 'luminosity',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <img 
            src="/images/volunteer_child.png" 
            alt="children support hero backdrop" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />
          {/* Subtle overlay gradients */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #2a0501 10%, transparent 50%, #2a0501 90%)',
            }}
          />
        </div>

        {/* Left Side: Floating Gold Heart Outline */}
        <div 
          className="animate-hero-heart"
          style={{
            position: 'absolute',
            left: '6%',
            top: '25%',
            pointerEvents: 'none',
            zIndex: 1,
            color: '#FDED95',
            opacity: 0.85,
          }}
        >
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(253, 237, 149,0.25))' }}
          >
            <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
          </svg>
        </div>

        {/* Center Captions Content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          
          {/* Script Green-badge Subtext */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span 
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", 
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '18px', 
                color: '#ffd54f',
                letterSpacing: '0.04em',
                textShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              ✍️ गरीब लोगों को दान देना शुरू करें
            </span>
          </div>

          {/* Heading title */}
          <h1 
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '44px',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 10px rgba(0,0,0,0.35)',
            }}
          >
            हमारे बारे में
          </h1>

        </div>

      </div>


      {/* ─── 2. Grand Trust Section (Introduction, Mission/Vision, Cells Grid) ─── */}
      <section style={{ background: '#ffffff', padding: '90px 0 100px', position: 'relative' }}>
        
        {/* Background Decorative Faint Heart (Right edge) */}
        <div 
          className="animate-hero-heart"
          style={{
            position: 'absolute',
            right: '4%',
            top: '15%',
            pointerEvents: 'none',
            zIndex: 1,
            color: '#821905',
            opacity: 0.08,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M50,30 C50,30 45,15 30,15 C15,15 10,30 25,50 C40,70 50,85 50,85 C50,85 60,70 75,50 C90,30 85,15 70,15 C55,15 50,30 50,30 Z" />
          </svg>
        </div>

        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          
          {/* Part 1: Split-column Intro & trust.png */}
          <div 
            className="about-main-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '60px',
              alignItems: 'center',
              marginBottom: '90px'
            }}
          >
            {/* Left Column: Intro Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#821905', fontWeight: 800, fontFamily: 'Hind, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  ✦ परिचय एवं उद्देश्य ✦
                </span>
              </div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 38px)', color: '#821905', lineHeight: 1.2, margin: 0 }}>
                साधू लक्ष्मी जनकल्याण ट्रस्ट
              </h2>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '15px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                साधू लक्ष्मी जनकल्याण ट्रस्ट एक सामाजिक एवं जनहितकारी संस्था है, जिसका उद्देश्य समाज के गरीब, असहाय, जरूरतमंद एवं वंचित वर्ग के लोगों के जीवन स्तर को बेहतर बनाना है। हमारी संस्था "सेवा, सहयोग और समर्पण" के मूल सिद्धांतों पर कार्य करती है तथा मानव सेवा को ही सबसे बड़ी साधना मानती है।
              </p>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '15px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                हमारा विश्वास है कि एक सशक्त और समृद्ध समाज का निर्माण तभी संभव है जब प्रत्येक व्यक्ति को शिक्षा, स्वास्थ्य, भोजन, वस्त्र एवं सम्मानजनक जीवन जीने के समान अवसर प्राप्त हों। इसी सोच के साथ हमारा ट्रस्ट समाज के हर उस व्यक्ति तक सहायता पहुँचाने का प्रयास करता है जो किसी न किसी रूप में सहयोग का पात्र है।
              </p>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '15px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                साधू लक्ष्मी जनकल्याण ट्रस्ट विभिन्न सामाजिक कल्याणकारी गतिविधियों के माध्यम से समाज में सकारात्मक परिवर्तन लाने के लिए निरंतर कार्यरत है। हमारी प्रमुख सेवाओं में भोजन वितरण, शिक्षा सहयोग, स्वास्थ्य शिविर, वस्त्र वितरण, आर्थिक एवं सामाजिक सहायता तथा पर्यावरण संरक्षण हेतु वृक्षारोपण अभियान शामिल हैं। इन कार्यों के माध्यम से हम न केवल जरूरतमंद लोगों की तत्काल सहायता करते हैं, बल्कि उनके जीवन को आत्मनिर्भर और सम्मानजनक बनाने का भी प्रयास करते हैं।
              </p>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '15px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                हमारी संस्था का उद्देश्य केवल सहायता प्रदान करना ही नहीं, बल्कि समाज में सेवा, करुणा, भाईचारे और मानवीय मूल्यों को बढ़ावा देना भी है। हम मानते हैं कि प्रत्येक व्यक्ति का छोटा-सा सहयोग किसी जरूरतमंद के जीवन में बड़ा बदलाव ला सकता है। इसी भावना के साथ हम समाज के सभी जागरूक नागरिकों, सामाजिक कार्यकर्ताओं, युवाओं एवं दानदाताओं को हमारे इस सेवा अभियान से जुड़ने के लिए प्रेरित करते हैं।
              </p>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '15.5px', color: '#111827', fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
                साधू लक्ष्मी जनकल्याण ट्रस्ट समाज के सर्वांगीण विकास के लिए पारदर्शिता, ईमानदारी एवं उत्तरदायित्व के साथ कार्य करने के लिए प्रतिबद्ध है। हमारा प्रयास है कि समाज के अंतिम व्यक्ति तक सहायता पहुँचे और कोई भी व्यक्ति शिक्षा, स्वास्थ्य, भोजन या अन्य मूलभूत आवश्यकताओं से वंचित न रहे।
              </p>
              <div 
                style={{ 
                  background: 'rgba(253, 237, 149, 0.12)', 
                  borderLeft: '4px solid #821905', 
                  borderRadius: '0 16px 16px 0', 
                  padding: '16px 20px', 
                  marginTop: '10px' 
                }}
              >
                <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '16px', fontWeight: 800, color: '#821905', margin: 0, fontStyle: 'italic' }}>
                  "मानव सेवा ही सच्ची साधना है"
                </p>
                <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '12.5px', color: '#6b7280', margin: '4px 0 0' }}>
                  — इसी विचार के साथ साधू लक्ष्मी जनकल्याण ट्रस्ट निरंतर समाज सेवा के कार्यों में समर्पित है।
                </p>
              </div>
            </div>

            {/* Right Column: trust.png Frame */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              {/* Dotted Grid Background Accent */}
              <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', backgroundImage: 'radial-gradient(#FDED95 2px, transparent 2px)', backgroundSize: '16px 16px', opacity: 0.5, zIndex: 0 }} />
              
              <div 
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(130, 25, 5, 0.08)',
                  border: '6px solid #ffffff',
                  outline: '1.5px solid #FDED95',
                  background: '#ffffff',
                  maxWidth: '100%',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img 
                  src="/images/trust.png" 
                  alt="साधू लक्ष्मी जनकल्याण ट्रस्ट सेवा कार्य" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                />
              </div>
            </div>
          </div>

          {/* Part 2: Mission, Vision, & Values Grid */}
          <div style={{ marginBottom: '90px' }}>
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <span style={{ fontSize: '11px', color: '#821905', fontWeight: 800, fontFamily: 'Hind, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>✦ हमारे सिद्धांत ✦</span>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '28px', color: '#821905', margin: '6px 0 0' }}>मिशन, विजन एवं मूल मूल्य</h3>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
              }}
            >
              {/* Mission Card */}
              <div 
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #faf0ee',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FDED95'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(130, 25, 5, 0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#faf0ee'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.02)' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(130, 25, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#821905' }}>
                  <Heart size={22} fill="#821905" />
                </div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '18px', color: '#821905', margin: 0 }}>हमारा मिशन</h4>
                <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13.5px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                  समाज के जरूरतमंद, गरीब एवं वंचित लोगों को शिक्षा, स्वास्थ्य, भोजन, वस्त्र एवं सामाजिक सहायता प्रदान कर उन्हें आत्मनिर्भर और सम्मानजनक जीवन जीने के लिए सक्षम बनाना।
                </p>
              </div>

              {/* Vision Card */}
              <div 
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #faf0ee',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FDED95'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(130, 25, 5, 0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#faf0ee'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.02)' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(130, 25, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#821905' }}>
                  <Play size={20} fill="#821905" style={{ transform: 'rotate(-90deg)' }} />
                </div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '18px', color: '#821905', margin: 0 }}>हमारा विजन</h4>
                <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13.5px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                  एक ऐसे समतामूलक, शिक्षित, स्वस्थ और सशक्त समाज का निर्माण करना जहाँ प्रत्येक व्यक्ति को विकास के समान अवसर प्राप्त हों और कोई भी व्यक्ति अभाव एवं असहायता का जीवन जीने के लिए मजबूर न हो।
                </p>
              </div>

              {/* Values Card */}
              <div 
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #faf0ee',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FDED95'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(130, 25, 5, 0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#faf0ee'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.02)' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(130, 25, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#821905' }}>
                  <CheckCircle2 size={22} />
                </div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '18px', color: '#821905', margin: 0 }}>हमारे मूल्य</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { name: 'सेवा', desc: 'मानवता की निस्वार्थ सेवा।' },
                    { name: 'सहयोग', desc: 'समाज के प्रत्येक वर्ग को साथ लेकर चलना।' },
                    { name: 'समर्पण', desc: 'सामाजिक कल्याण के प्रति पूर्ण प्रतिबद्धता।' },
                    { name: 'पारदर्शिता', desc: 'प्रत्येक कार्य में ईमानदारी और जवाबदेही।' },
                    { name: 'मानवता', desc: 'हर व्यक्ति के सम्मान और अधिकारों का संरक्षण।' },
                  ].map((val, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px' }}>
                      <span style={{ color: '#821905', fontWeight: 800, fontFamily: 'Hind, sans-serif' }}>• {val.name}:</span>
                      <span style={{ color: '#6b7280', fontFamily: 'Hind, sans-serif' }}>{val.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Part 3: Associated Cells & Wings Showcase Grid */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <span style={{ fontSize: '11px', color: '#821905', fontWeight: 800, fontFamily: 'Hind, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>✦ हमारे कार्य अंग ✦</span>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '28px', color: '#821905', margin: '6px 0 0' }}>सहयोगी प्रकोष्ठ एवं विशिष्ट शाखाएं</h3>
              <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '14.5px', color: '#6b7280', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0', lineHeight: 1.5 }}>
                ट्रस्ट के कार्यों को सुचारू रूप से संचालित करने के लिए विभिन्न प्रकोष्ठों का गठन किया गया है, जो संबंधित क्षेत्रों में सेवा अभियान चलाते हैं।
              </p>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {cells.map((cell, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #faf0ee',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.015)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.borderColor = '#FDED95'
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(130, 25, 5, 0.08)'
                    const img = e.currentTarget.querySelector('img')
                    if (img) img.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#faf0ee'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.015)'
                    const img = e.currentTarget.querySelector('img')
                    if (img) img.style.transform = 'scale(1)'
                  }}
                >
                  <div 
                    style={{
                      width: '100%',
                      height: '95px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.01), 0 2px 8px rgba(130, 25, 5, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      border: '1.5px solid #faf0ee',
                      padding: '8px',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                    }}
                  >
                    <img 
                      src={cell.img} 
                      alt={cell.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease',
                      }} 
                    />
                  </div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '16px', color: '#821905', margin: '0 0 10px' }}>
                    {cell.name}
                  </h4>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '13px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                    {cell.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Dynamic Mid-Page Donation CTA Banner ─── */}
      <section 
        style={{
          background: 'linear-gradient(135deg, #2a0501 0%, #5a1002 100%)',
          padding: '100px 0 110px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Grayscale Background Image (Luminosity Mix-Blend) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            mixBlendMode: 'luminosity',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <img 
            src="/images/donation_children.png" 
            alt="children support donation backdrop" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />
          {/* Subtle overlay gradients */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #2a0501 20%, transparent 60%, #2a0501 90%)',
            }}
          />
        </div>

        {/* Left Side: Golden Paint Splash / Brush Stroke Graphic */}
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 120 300" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.95 }}>
            {/* Textured paint stroke SVG paths */}
            <path d="M -20,-10 C 20,40 50,90 25,140 C -2,180 35,230 55,280 C 65,300 40,320 -20,320 Z" fill="#FDED95" />
            <path d="M -20,20 C 15,60 35,100 12,150 C -5,190 25,240 45,290 C 52,305 25,320 -20,320 Z" fill="#ffd54f" opacity="0.6" />
            {/* Splash dots */}
            <circle cx="30" cy="50" r="3.5" fill="#FDED95" />
            <circle cx="42" cy="110" r="5" fill="#FDED95" />
            <circle cx="58" cy="170" r="2.5" fill="#ffd54f" />
            <circle cx="62" cy="220" r="4" fill="#FDED95" />
            <circle cx="48" cy="260" r="2.5" fill="#FDED95" />
            <circle cx="32" cy="295" r="4.5" fill="#ffd54f" />
            {/* Streaks */}
            <path d="M -20,70 Q 55,105 35,125 T -20,165" stroke="#FDED95" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M -20,200 Q 65,230 45,250 T -20,290" stroke="#ffd54f" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Center Content */}
        <div 
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: '0 24px', 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 10 
          }}
        >
          {/* Cursive Subtitle Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span 
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", 
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '18px', 
                color: '#ffd54f',
                letterSpacing: '0.04em',
                textShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              ✍️ जरूरतमंदों को दान देना शुरू करें
            </span>
          </div>

          {/* Heading */}
          <h2 
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 40px)',
              color: '#ffffff',
              lineHeight: 1.25,
              margin: '0 0 32px',
              textShadow: '0 4px 12px rgba(0,0,0,0.35)',
            }}
          >
            आज ही दान देकर जरूरतमंद बच्चों की मदद करें
          </h2>

          {/* Two CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {/* Discover More Outline Pill Button */}
            <a
              href="#about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 30px',
                borderRadius: '999px',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(4px)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'Hind, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.color = '#2a0501'
                e.currentTarget.style.borderColor = '#ffffff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              और जानें <ArrowUpRight size={15} />
            </a>

            {/* Get A Quote Text Link */}
            <a
              href="contact-page"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('navigate-contact')) }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'Hind, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ffd54f'; e.currentTarget.style.transform = 'translateX(2px)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateX(0)' }}
            >
              कोटेशन प्राप्त करें <ArrowUpRight size={15} />
            </a>
          </div>

        </div>

        {/* Bottom Organic Paper-Tear Edge Divider */}
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '32px', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 40" fill="#ffffff" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,40 L1440,40 L1440,10 L1400,18 L1360,5 L1320,22 L1280,12 L1240,28 L1200,8 L1160,20 L1120,4 L1080,24 L1040,14 L1000,28 L960,6 L920,18 L880,12 L840,26 L800,8 L760,22 L720,10 L680,25 L640,12 L600,28 L560,6 L520,20 L480,10 L440,24 L400,8 L360,22 L320,12 L280,28 L240,6 L200,18 L160,10 L120,24 L80,8 L40,20 L0,12 Z" />
          </svg>
        </div>

      </section>

      {/* ─── Volunteer Team Section (Highly visual) ─── */}
      <TeamSection />

      {/* ─── 4. FAQ Accordion & Organic Torn Paper Collage Section ─── */}
      <FAQSection />

      {/* ─── 5. Testimonials Section (Feedback & Reviews) ─── */}
      <Testimonials />

      {/* ─── 6. Donation / Contact Form Split Section ─── */}
      <DonationQueryFormSection source="about_page" />

      {/* ─── 7. Donate Support Difference Section ─── */}
      <DonateSupportSection />

    </div>
  )
}

const FAQSection = () => {
  const [activeIdx, setActiveIdx] = useState(0)

  const faqs = [
    {
      q: 'मैं सहायता फाउंडेशन में दान कैसे कर सकता हूँ?',
      a: 'आप हमारी वेबसाइट पर "दान करें" बटन पर क्लिक करके सीधे ऑनलाइन सुरक्षित भुगतान (UPI, कार्ड, नेट बैंकिंग) के माध्यम से दान कर सकते हैं। आपका हर योगदान एक बच्चे के जीवन को संवारता है।'
    },
    {
      q: 'मेरा दान किया हुआ पैसा कहाँ उपयोग होता है?',
      a: 'आपका दान सीधे बच्चों की पौष्टिक भोजन व्यवस्था, गुणवत्तापूर्ण बाल शिक्षा, स्कूल सामग्री और स्वास्थ्य सहायता कार्यक्रमों में निवेश किया जाता है। हम पाई-पाई की पारदर्शिता बनाए रखते हैं।'
    },
    {
      q: 'क्या मैं स्वयंसेवक (Volunteer) के रूप में जुड़ सकता हूँ?',
      a: 'हाँ! हम हमेशा नए स्वयंसेवकों का स्वागत करते हैं। आप हमारे "स्वयंसेवक बनें" फ़ॉर्म को भरकर हमारी सामाजिक गतिविधियों और ऑन-ग्राउंड पहलों में सीधे योगदान दे सकते हैं।'
    },
    {
      q: 'क्या दान की गई राशि पर टैक्स छूट (Tax Benefit) मिलती है?',
      a: 'हाँ, सहायता फाउंडेशन के माध्यम से किया गया सभी दान आयकर अधिनियम की धारा 80G के तहत टैक्स छूट के लिए पात्र है। दान के पश्चात आपको ईमेल द्वारा 80G सर्टिफिकेट प्रदान किया जाएगा।'
    }
  ]

  return (
    <section 
      style={{ 
        background: '#ffffff', 
        borderTop: '1px solid #f0f0f0', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
          .faq-green-col {
            height: 400px !important;
          }
          .faq-green-col svg {
            transform: rotate(90deg);
            width: 100% !important;
            height: 20px !important;
            top: -2px !important;
            bottom: auto !important;
            left: 0 !important;
            right: 0 !important;
          }
        }
      `}} />

      <div 
        className="faq-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          minHeight: '600px',
        }}
      >
        {/* LEFT COLUMN: FAQ Accordion */}
        <div 
          style={{
            padding: '90px 6% 90px 8%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Cursive Subtitle Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
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
              ✍️ जरूरतमंदों को दान देना शुरू करें
            </span>
          </div>

          {/* Heading */}
          <h2 
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              color: '#111827',
              lineHeight: 1.25,
              margin: '0 0 40px',
            }}
          >
            अक्सर पूछे जाने वाले प्रश्न
          </h2>

          {/* Accordion Wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((item, idx) => {
              const isActive = activeIdx === idx
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Header Bar */}
                  <div
                    onClick={() => setActiveIdx(isActive ? -1 : idx)}
                    style={{
                      background: isActive ? '#821905' : '#ffffff',
                      border: '1.5px solid #e5e7eb',
                      borderColor: isActive ? '#821905' : '#e5e7eb',
                      borderRadius: isActive ? '14px 14px 0 0' : '14px',
                      padding: '18px 24px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: isActive ? '#ffffff' : '#111827',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
                        e.currentTarget.style.color = '#111827'
                      }
                    }}
                  >
                    <span 
                      style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 700, 
                        fontSize: '15px',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.q}
                    </span>
                    {isActive ? (
                      <ChevronDown size={18} strokeWidth={2.5} style={{ transform: 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
                    ) : (
                      <ChevronRight size={18} strokeWidth={2.5} style={{ transition: 'transform 0.3s ease' }} />
                    )}
                  </div>

                  {/* Body Content */}
                  {isActive && (
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #e5e7eb',
                        borderTop: 'none',
                        borderRadius: '0 0 14px 14px',
                        padding: '20px 24px',
                        color: '#6b7280',
                        fontFamily: 'Hind, sans-serif',
                        fontSize: '14px',
                        lineHeight: 1.7,
                        animation: 'faqSlideDown 0.3s ease-out',
                      }}
                    >
                      <style dangerouslySetInnerHTML={{__html: `
                        @keyframes faqSlideDown {
                          from { opacity: 0; transform: translateY(-8px); }
                          to { opacity: 1; transform: translateY(0); }
                        }
                      `}} />
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: Dark Green Visual Block with Overlapping Photos */}
        <div 
          className="faq-green-col"
          style={{
            background: '#1a0401',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Vertical Organic Torn-Paper SVG divider on the left edge */}
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              bottom: 0, 
              left: '-2px', 
              width: '20px', 
              zIndex: 5, 
              pointerEvents: 'none' 
            }}
          >
            <svg viewBox="0 0 20 600" fill="#ffffff" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <path d="M20,0 L0,0 L0,600 L20,600 L8,580 L18,560 L5,540 L16,520 L8,500 L18,480 L6,460 L15,440 L7,420 L16,400 L9,380 L18,360 L6,340 L16,320 L7,300 L15,280 L8,260 L18,240 L6,220 L15,200 L9,180 L18,160 L7,140 L15,120 L9,100 L18,80 L7,60 L15,40 L9,20 Z" />
            </svg>
          </div>

          {/* Collage Images container */}
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '440px', 
              height: '420px' 
            }}
          >
            
            {/* Image 1: Main Tall Grayscale Photo */}
            <div
              style={{
                position: 'absolute',
                left: '20px',
                top: '0px',
                width: '270px',
                height: '380px',
                border: '6px solid #ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            >
              <img 
                src="/images/about_child3.png" 
                alt="children playing" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(105%) brightness(95%)',
                }}
              />
            </div>

            {/* Image 2: Small Color Overlapping Photo on the right */}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                top: '60px',
                width: '210px',
                height: '210px',
                border: '6px solid #ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                zIndex: 3,
              }}
            >
              <img 
                src="/images/about_child1.png" 
                alt="happy children" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

const DonateSupportSection = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const tabContent = {
    mission: {
      desc: "दान जरूरतमंदों की मदद करने का एक स्वैच्छिक कार्य है, जो आमतौर पर धन, समय या संसाधनों के रूप में होता है। धर्मार्थ संगठनों का उद्देश्य गरीबी जैसे मुद्दों को संबोधित करके सामाजिक, पर्यावरणीय और आर्थिक चुनौतियों का समाधान करना है।",
      bullets: [
        "हम कंपनियों को एक मजबूत सामाजिक उत्तरदायित्व (CSR) विकसित करने में मदद करते हैं",
        "3,265 से अधिक सामाजिक व लोक कल्याणकारी परियोजनाओं को सफल बनाया है",
        "समर्पित तकनीकी और सामाजिक सेवा दल"
      ]
    },
    vision: {
      desc: "हमारा दृष्टिकोण एक ऐसा आत्मनिर्भर पारिस्थितिकी तंत्र बनाना है जहां प्रत्येक वंचित बच्चे को व्यापक स्वास्थ्य सेवा, स्वच्छ पोषण और वैश्विक स्तर की शिक्षा मिले, जिससे वे अपनी पूर्ण क्षमता का विकास कर सकें।",
      bullets: [
        "वैश्विक आउटरीच और शैक्षिक सहयोग कार्यक्रम",
        "प्रत्येक योग्य बच्चे के लिए समान अवसर सुनिश्चित करना",
        "सतत विकास और उन्नत तकनीकी एकीकरण"
      ]
    },
    excellence: {
      desc: "हम पेशेवर नैतिकता, परिचालन पारदर्शिता और वित्तीय जवाबदेही के उच्चतम मानकों का पालन करते हैं, जिससे यह सुनिश्चित होता है कि हर योगदान का अधिकतम प्रभाव हो।",
      bullets: [
        "100% ऑडिट पारदर्शिता और प्रत्यक्ष जमीनी कार्यान्वयन",
        "पुरस्कार विजेता सामाजिक कल्याण और पर्यावरणीय प्रभाव पहल",
        "अत्यधिक कुशल परिचालन प्रक्रियाएं"
      ]
    }
  };

  const current = tabContent[activeTab];

  return (
    <section 
      style={{
        background: '#ffffff',
        padding: '90px 0 100px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      
      {/* Top Right Heart Watermark */}
      <div 
        style={{
          position: 'absolute',
          right: '5%',
          top: '40px',
          color: '#821905',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-8deg)' }}>
          <path d="M50,30 C50,30 46,14 31,14 C16,14 11,28 26,48 C41,68 50,83 50,83 C50,83 59,68 74,48 C89,28 84,14 69,14 C54,14 50,30 50,30 Z" strokeWidth="2.2" />
          <path d="M52,32 C52,32 48,17 34,17 C21,17 16,30 29,49 C42,68 52,82 52,82" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tabContentFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-fade-in {
          animation: tabContentFade 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @media (max-width: 900px) {
          .donate-support-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          .donate-support-collage {
            margin: 0 auto 30px !important;
          }
          .donate-support-stats-box {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        <div 
          className="donate-support-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '70px',
            alignItems: 'center',
          }}
        >
          
          {/* LEFT COLUMN: Visual Overlapping Image Collage */}
          <div 
            className="donate-support-collage"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              height: '480px',
              margin: '0 auto',
            }}
          >
            {/* Dotted Grid Background Accent */}
            <div 
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '140px',
                height: '140px',
                backgroundImage: 'radial-gradient(#ffd54f 2px, transparent 2px)',
                backgroundSize: '16px 16px',
                opacity: 0.4,
                zIndex: 0,
              }}
            />

            {/* Main Photo Card (Grayscale Child Portrait) */}
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '80%',
                height: '80%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '6px solid #ffffff',
                zIndex: 1,
              }}
            >
              <img 
                src="/images/about_child2.png" 
                alt="child portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.9)',
                }}
              />
            </div>

            {/* Foreground Photo Card (Color Smiling Running Boy) */}
            <div 
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '55%',
                height: '55%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '8px solid #ffffff',
                zIndex: 2,
              }}
            >
              <img 
                src="/images/volunteer_child.png" 
                alt="happy smiling boy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Floating Gold Sparkle Accent */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '40px',
                color: '#ffd54f',
                zIndex: 3,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
              </svg>
            </div>

          </div>

          {/* RIGHT COLUMN: Copywriting, Tabs, Progress & Stats */}
          <div>
            
            {/* Cursive Subtitle Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ color: '#821905', display: 'flex', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C11 4 12 5 12 5C12 5 13 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" />
                </svg>
              </span>
              <span 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px', 
                  color: '#821905',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                जरूरतमंदों को दान देना शुरू करें
              </span>
            </div>

            {/* Title Header */}
            <h2 
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(26px, 3.2vw, 36px)',
                color: '#111827',
                lineHeight: 1.2,
                margin: '0 0 20px',
              }}
            >
              दान से समाज में बड़ा बदलाव लाएं
            </h2>

            {/* Dynamic Tab Content Wrapper */}
            <div key={activeTab} className="tab-fade-in">
              {/* Paragraph Description */}
              <p 
                style={{
                  fontFamily: 'Hind, sans-serif',
                  fontSize: '14.5px',
                  color: '#6b7280',
                  lineHeight: 1.75,
                  margin: '0 0 24px',
                }}
              >
                {current.desc}
              </p>

              {/* Tabs Bar */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1.5px solid #f3f4f6', paddingBottom: '16px', marginBottom: '24px' }}>
                {['mission', 'vision', 'excellence'].map((tab) => {
                  const label = tab === 'mission' ? 'हमारा मिशन' : tab === 'vision' ? 'हमारा दृष्टिकोण' : 'उत्कृष्टता';
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        padding: '10px 24px',
                        borderRadius: '999px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        background: isActive ? '#821905' : 'transparent',
                        color: isActive ? '#ffffff' : '#6b7280',
                        boxShadow: isActive ? '0 4px 12px rgba(130, 25, 5, 0.15)' : 'none',
                        transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                        transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#821905';
                          e.currentTarget.style.background = 'rgba(130, 25, 5, 0.04)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#6b7280';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Checkmark Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {current.bullets.map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(130, 25, 5, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} style={{ color: '#821905', strokeWidth: 3 }} />
                    </div>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500, color: '#4b5563', lineHeight: 1.5 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Two SVG Circular Progress Bars */}
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '36px' }}>
              
              {/* Progress 1: 75% Treatment Helping */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                  <svg width="56" height="56" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#821905" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" />
                  </svg>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif' }}>
                    75%
                  </span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#111827', margin: 0 }}>
                    चिकित्सा सहायता
                  </h4>
                </div>
              </div>

              {/* Progress 2: 90% Highest Fund Raised */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                  <svg width="56" height="56" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#821905" strokeWidth="3" strokeDasharray="90, 100" strokeLinecap="round" />
                  </svg>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif' }}>
                    90%
                  </span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#111827', margin: 0 }}>
                    अधिकतम कोष जुटाया गया
                  </h4>
                </div>
              </div>
            </div>

            {/* Bottom Dual Stats Display Container */}
            <div 
              className="donate-support-stats-box"
              style={{
                background: '#fafafa',
                border: '1.5px solid #e5e7eb',
                borderRadius: '18px',
                padding: '24px 30px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
              }}
            >
              
              {/* Stats Col 1: Donate Now */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(130, 25, 5,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#821905" strokeWidth="2.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                    <path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '11.5px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 2px' }}>
                    अभी दान करें
                  </p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>
                    ₹40,456
                  </p>
                </div>
              </div>

              {/* Stats Col 2: Total Fundraised */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '1.5px solid #e5e7eb', paddingLeft: '30px' }} className="stats-divider-left">
                <style dangerouslySetInnerHTML={{__html: `
                  @media (max-width: 900px) {
                    .stats-divider-left {
                      border-left: none !important;
                      padding-left: 0 !important;
                    }
                  }
                `}} />
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(253, 237, 149,0.1)', display: 'flex', alignItems: 'center', justifyContainer: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FDED95" strokeWidth="2.5">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Hind, sans-serif', fontSize: '11.5px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 2px' }}>
                    कुल एकत्रित कोष
                  </p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '17px', fontWeight: 800, color: '#821905', margin: 0 }}>
                    ₹15,40,456
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutPage
