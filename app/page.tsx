import { HeroSection } from "./components/home/hero-section"
import { AboutSection } from "./components/home/about-section"
import { ProductGridSection } from "./components/home/product-grid-section"
import { PromoSection } from "./components/home/promo-section"
import { TestimonialSection } from "./components/home/testimonial-section"
import { GallerySection } from "./components/home/gallery-section"
import { ContactSection } from "./components/home/contact-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductGridSection />
      <PromoSection />
      <TestimonialSection />
      <GallerySection />
      <ContactSection />
    </>
  )
}
