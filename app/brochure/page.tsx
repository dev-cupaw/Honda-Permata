"use client"

import { ParallaxHeroSection } from "@/components/shared/parallax-hero-section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Users, Phone, MessageCircle, Download } from "lucide-react"

// Expanded brochure features data with download links
const brochureFeatures = [
  {
    id: 1,
    image: "/section-gallery/Showroom-Honda-Permata-Serpong.webp",
    title: "all-new-honda-accord",
    description:
      "Explore Honda vehicles through our interactive digital brochures with 360° views, detailed specifications, and immersive galleries that bring each model to life.",
    downloadLink: "/brochures/all-new-honda-accord.pdf",
  },
  {
    id: 2,
    image: "/section-gallery/Unit-Honda-Permata-Serpong.webp",
    title: "all-new-honda-cr-v",
    description:
      "Access comprehensive technical details, performance data, safety features, and pricing information for all Honda models in easy-to-read digital format.",
    downloadLink: "/brochures/all-new-honda-cr-v.pdf",
  },
  {
    id: 3,
    image: "/section-gallery/Service-Honda-Permata-Serpong.webp",
    title: "honda-br-v-n7x",
    description:
      "Download high-quality PDF brochures instantly or share them digitally with family and friends. Access your brochures anytime, anywhere on any device.",
    downloadLink: "/brochures/honda-br-v-n7x.pdf",
  },
  {
    id: 4,
    image: "/section-gallery/Honda-Permata-Serpong.webp",
    title: "honda-city-hatchback-rs",
    description:
      "Get the latest pricing information, special offers, and promotional packages updated in real-time. Never miss out on the best Honda deals available.",
    downloadLink: "/brochures/honda-city-hatchback-rs.pdf",
  },
  {
    id: 5,
    image: "/section-gallery/Office-Honda-Permata-Serpong.webp",
    title: "honda-civic-rs",
    description:
      "Connect directly with our sales professionals through the brochure for personalized advice, test drive scheduling, and financing options tailored to your needs.",
    downloadLink: "/brochures/honda-civic-rs.pdf",
  },
  {
    id: 6,
    image: "/section-gallery/Check-Kendaraan-Honda-Permata-Serpong.webp",
    title: "honda-civic-type-r",
    description:
      "Access detailed vehicle inspection reports and quality assurance documentation. View comprehensive check-up results and maintenance history for complete transparency.",
    downloadLink: "/brochures/honda-civic-type-r.pdf",
  },
  {
    id: 7,
    image: "/section-gallery/Coating-Honda-Permata-Serpong.webp",
    title: "honda-e-n1",
    description:
      "Discover our premium coating and protection services. Learn about paint protection, ceramic coating options, and extended warranty packages to keep your Honda pristine.",
    downloadLink: "/brochures/honda-e-n1.pdf",
  },
  {
    id: 8,
    image: "/section-gallery/Honda-Gading-Serpong.webp",
    title: "honda-hr-v",
    description:
      "Take a virtual tour of our Honda Gading Serpong showroom. Explore our facilities, service areas, and display vehicles from the comfort of your home.",
    downloadLink: "/brochures/honda-hr-v.pdf",
  },
  {
    id: 9,
    image: "/section-gallery/Oli-Berkualitas-Honda-Permata-Serpong.webp",
    title: "honda-step-wgn",
    description:
      "Browse our complete catalog of genuine Honda parts, accessories, and premium oils. Ensure your vehicle maintains peak performance with authentic Honda components.",
    downloadLink: "/brochures/honda-step-wgn.pdf",
  },
  {
    id: 10,
    image: "/section-gallery/Tampak-Depan-Honda-Permata-Serpong.webp",
    title: "honda-wr-v",
    description:
      "Get an overview of our state-of-the-art facilities including our modern showroom, advanced service center, and customer comfort areas designed for your convenience.",
    downloadLink: "/brochures/honda-wr-v.pdf",
  },
  {
    id: 11,
    image: "/section-gallery/Honda-Permata-Serpong.webp",
    title: "new-honda-brio",
    description:
      "Read inspiring customer testimonials and success stories. Discover why thousands of customers choose Honda Permata Serpong for their automotive needs.",
    downloadLink: "/brochures/new-honda-brio.pdf",
  },
  {
    id: 12,
    image: "/section-gallery/Unit-Honda-Permata-Serpong.webp",
    title: "new-honda-city",
    description:
      "Check real-time inventory and vehicle availability. View current stock, upcoming arrivals, and reserve your preferred Honda model with just a few clicks.",
    downloadLink: "/brochures/new-honda-city.pdf",
  },
]

export default function BrochurePage() {
  return (
    <>
      {/* 1 Column - Hero Section */}
      <ParallaxHeroSection
        title="Honda Digital Brochures"
        subtitle="Explore our complete collection of Honda vehicles through interactive digital brochures and comprehensive specifications."
      />

      {/* Interactive Brochure Features - Updated Layout */}
      <section id="brochure-features" className="py-16 lg:py-24 bg-honda-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">
            Interactive Brochure Features
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {/* Feature 1: full width */}
            <div
              key={brochureFeatures[0].id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[8/3] relative">
                <Image
                  src={brochureFeatures[0].image || "/placeholder.svg"}
                  alt={brochureFeatures[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                {/* Title always visible */}
                <div className="absolute bottom-4 left-4 p-2">
                  <h3 className="text-white font-bold text-2xl">{brochureFeatures[0].title}</h3>
                </div>
                {/* Download Button */}
                <div className="absolute bottom-4 right-4">
                  <Button
                    asChild
                    className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                  >
                    <a href={brochureFeatures[0].downloadLink} download>
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Features 2-3: side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {brochureFeatures.slice(1, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                    {/* Title always visible */}
                    <div className="absolute bottom-4 left-4 p-2">
                      <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                    </div>
                    {/* Download Button */}
                    <div className="absolute bottom-4 right-4">
                      <Button
                        asChild
                        className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                      >
                        <a href={feature.downloadLink} download>
                          <Download className="h-5 w-5 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature 4: full width */}
            <div
              key={brochureFeatures[3].id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[8/3] relative">
                <Image
                  src={brochureFeatures[3].image || "/placeholder.svg"}
                  alt={brochureFeatures[3].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                {/* Title always visible */}
                <div className="absolute bottom-4 left-4 p-2">
                  <h3 className="text-white font-bold text-2xl">{brochureFeatures[3].title}</h3>
                </div>
                {/* Download Button */}
                <div className="absolute bottom-4 right-4">
                  <Button
                    asChild
                    className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                  >
                    <a href={brochureFeatures[3].downloadLink} download>
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Feature 5: full width */}
            <div
              key={brochureFeatures[4].id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[8/3] relative">
                <Image
                  src={brochureFeatures[4].image || "/placeholder.svg"}
                  alt={brochureFeatures[4].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                {/* Title always visible */}
                <div className="absolute bottom-4 left-4 p-2">
                  <h3 className="text-white font-bold text-2xl">{brochureFeatures[4].title}</h3>
                </div>
                {/* Download Button */}
                <div className="absolute bottom-4 right-4">
                  <Button
                    asChild
                    className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                  >
                    <a href={brochureFeatures[4].downloadLink} download>
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Features 6-7: side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {brochureFeatures.slice(5, 7).map((feature) => (
                <div
                  key={feature.id}
                  className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                    {/* Title always visible */}
                    <div className="absolute bottom-4 left-4 p-2">
                      <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                    </div>
                    {/* Download Button */}
                    <div className="absolute bottom-4 right-4">
                      <Button
                        asChild
                        className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                      >
                        <a href={feature.downloadLink} download>
                          <Download className="h-5 w-5 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features 8-9: side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {brochureFeatures.slice(7, 9).map((feature) => (
                <div
                  key={feature.id}
                  className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                    {/* Title always visible */}
                    <div className="absolute bottom-4 left-4 p-2">
                      <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                    </div>
                    {/* Download Button */}
                    <div className="absolute bottom-4 right-4">
                      <Button
                        asChild
                        className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                      >
                        <a href={feature.downloadLink} download>
                          <Download className="h-5 w-5 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature 10: full width */}
            <div
              key={brochureFeatures[9].id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[8/3] relative">
                <Image
                  src={brochureFeatures[9].image || "/placeholder.svg"}
                  alt={brochureFeatures[9].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                {/* Title always visible */}
                <div className="absolute bottom-4 left-4 p-2">
                  <h3 className="text-white font-bold text-2xl">{brochureFeatures[9].title}</h3>
                </div>
                {/* Download Button */}
                <div className="absolute bottom-4 right-4">
                  <Button
                    asChild
                    className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                  >
                    <a href={brochureFeatures[9].downloadLink} download>
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Features 11-12: side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {brochureFeatures.slice(10, 12).map((feature) => (
                <div
                  key={feature.id}
                  className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Static overlay for readability */}
                    {/* Title always visible */}
                    <div className="absolute bottom-4 left-4 p-2">
                      <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                    </div>
                    {/* Download Button */}
                    <div className="absolute bottom-4 right-4">
                      <Button
                        asChild
                        className="bg-honda-red-primary hover:bg-honda-red-dark text-white px-4 py-2 rounded-md"
                      >
                        <a href={feature.downloadLink} download>
                          <Download className="h-5 w-5 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1 Column - Call to Action */}
      <div className="bg-honda-red-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold mb-6">Ready to Explore Honda Vehicles?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Access our complete collection of digital brochures, schedule a test drive, or speak with our professional
              sales team for personalized assistance.
            </p>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center justify-center space-x-3 bg-honda-red-dark rounded-lg p-4 hover:bg-honda-red-darker transition-colors">
                <Phone className="h-6 w-6" />
                <div className="text-left">
                  <p className="font-semibold">Call Sales Team</p>
                  <p className="text-sm opacity-90">+62 812-8000-2015</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 bg-honda-red-dark rounded-lg p-4 hover:bg-honda-red-darker transition-colors">
                <MessageCircle className="h-6 w-6" />
                <div className="text-left">
                  <p className="font-semibold">WhatsApp Chat</p>
                  <p className="text-sm opacity-90">Instant Response</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 bg-honda-red-dark rounded-lg p-4 hover:bg-honda-red-darker transition-colors">
                <Users className="h-6 w-6" />
                <div className="text-left">
                  <p className="font-semibold">Visit Showroom</p>
                  <p className="text-sm opacity-90">Gading Serpong</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
