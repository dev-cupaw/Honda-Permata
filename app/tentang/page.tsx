import { ParallaxHeroSection } from "@/components/shared/parallax-hero-section"
import { AboutSection } from "../components/home/about-section"
import { ContactSection } from "../components/home/contact-section"
import { SalesProfessionalTimelineSection } from "../components/home/sales-professional-timeline-section"
import { OurValuesSection } from "../components/home/our-values-section"

export default function AboutPage() {
  return (
    <>
      <ParallaxHeroSection
        title="About Us"
        subtitle="Discover the story behind Honda Permata Serpong and our commitment to excellence."
      />
      <AboutSection />
      <SalesProfessionalTimelineSection />
      <OurValuesSection />
      <ContactSection />
    </>
  )
}
