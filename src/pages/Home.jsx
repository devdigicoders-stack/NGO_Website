// Home Page — assembles all sections in order
import HeroSection from '../sections/HeroSection'
import PartnerLogos from '../sections/PartnerLogos'
import AboutSection from '../sections/AboutSection'
import CausesSection from '../sections/CausesSection'
import VolunteerCall from '../sections/VolunteerCall'
import TeamSection from '../sections/TeamSection'
import DonationBanner from '../sections/DonationBanner'
import Testimonials from '../sections/Testimonials'
import ShowcaseCarousel from '../sections/ShowcaseCarousel'
import ImpactSection from '../sections/ImpactSection'
import BlogSection from '../sections/BlogSection'

const Home = () => {
  return (
    <main>
      <HeroSection />
      <PartnerLogos />
      <AboutSection />
      <CausesSection />
      <VolunteerCall />
      <TeamSection />
      <DonationBanner />

      <Testimonials />
      <ShowcaseCarousel />
      <ImpactSection />
      <BlogSection />
    </main>
  )
}

export default Home
