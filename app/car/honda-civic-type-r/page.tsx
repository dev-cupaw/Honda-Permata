import { HeroSection } from "./components/hero-section"
import { IntroductionSection } from "./components/introduction-section"
import { FeatureGridSection } from "./components/feature-grid-section"
import { SpecificationSection } from "./components/specification-section"
import { BookingFormSection } from "./components/booking-form-section"
import { SubscriptionSection } from "./components/subscription-section"

export default function HondaCivicTypeRPage() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <FeatureGridSection />
      <SpecificationSection />
      <BookingFormSection />
      <SubscriptionSection />
    </>
  )
}
