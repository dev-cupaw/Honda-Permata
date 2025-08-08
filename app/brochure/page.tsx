"use client"

import { ParallaxHeroSection } from "@/components/shared/parallax-hero-section"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import Image from "next/image"
import { Users, Phone, MessageCircle, Download } from "lucide-react"

// Expanded brochure features data with download links
const brochureFeatures = [
  {
    id: 1,
    image: "/all-new-honda-accord/banner-utama.webp",
    title: "All New Honda Accord",
    description:
      "Sedan premium dengan teknologi hybrid e:HEV terdepan, desain elegan, dan performa yang efisien untuk pengalaman berkendara yang tak terlupakan.",
    downloadLink: "/brochure/Accord.pdf",
  },
  {
    id: 2,
    image: "/all-new-honda-cr-v/banner-utama.webp",
    title: "All New Honda CR-V",
    description:
      "SUV terpopuler dengan teknologi hybrid e:HEV, ruang kabin luas, dan fitur keselamatan Honda SENSING untuk petualangan keluarga yang aman.",
    downloadLink: "/brochure/CR-V.pdf",
  },
  {
    id: 3,
    image: "/honda-br-v-n7x/banner-utama.webp",
    title: "Honda BR-V N7X",
    description:
      "SUV 7 seater dengan desain sporty N7X Edition, cocok untuk keluarga besar dengan kenyamanan dan gaya yang tak tertandingi.",
    downloadLink: "/brochure/BR-V%20N7X.pdf",
  },
  {
    id: 4,
    image: "/honda-city-hatchback-rs/baner-utama.webp",
    title: "Honda City Hatchback RS",
    description:
      "Hatchback sporty dengan desain dinamis, teknologi canggih, dan efisiensi bahan bakar terbaik untuk mobilitas urban yang stylish.",
    downloadLink: "/brochure/City%20Hatchback%20RS.pdf",
  },
  {
    id: 5,
    image: "/honda-civic-rs/banner-utama.webp",
    title: "Honda Civic RS",
    description:
      "Sedan sporty dengan mesin turbo berperforma tinggi, desain futuristik, dan teknologi terdepan untuk pengalaman berkendara yang menggairahkan.",
    downloadLink: "/brochure/Civic.pdf",
  },
  {
    id: 6,
    image: "/honda-e-n1/banner-utama.webp",
    title: "Honda e:N1",
    description:
      "Kendaraan listrik pertama Honda di Indonesia dengan teknologi ramah lingkungan, desain modern, dan efisiensi energi yang optimal.",
    downloadLink: "/brochure/e_N1.pdf",
  },
  {
    id: 7,
    image: "/honda-hr-v/banner-hr-v.webp",
    title: "Honda HR-V",
    description:
      "SUV kompak dengan teknologi hybrid e:HEV, desain stylish, dan fleksibilitas ruang yang sempurna untuk gaya hidup aktif Anda.",
    downloadLink: "/brochure/HR-V.pdf",
  },
  {
    id: 8,
    image: "/Honda-STEP-WGN/Banner-Product-Desktop.webp",
    title: "Honda STEP WGN",
    description:
      "MPV premium dengan pintu geser otomatis, ruang kabin super luas, dan kenyamanan berkelas untuk keluarga modern Indonesia.",
    downloadLink: "/brochure/StepWGN.pdf",
  },
  {
    id: 9,
    image: "/honda-wr-v/banner-utama.webp",
    title: "Honda WR-V",
    description:
      "Crossover kompak dengan ground clearance tinggi, desain tangguh, dan Honda SENSING untuk petualangan di segala medan.",
    downloadLink: "/brochure/WR-V.pdf",
  },
  {
    id: 10,
    image: "/honda-brio/banner-utama.webp",
    title: "New Honda Brio",
    description:
      "Hatchback kompak dengan desain fresh, teknologi modern, dan efisiensi bahan bakar terbaik untuk mobilitas harian yang ekonomis.",
    downloadLink: "/brochure/Brio.pdf",
  },
  {
    id: 11,
    image: "/new-honda-city/banner-city.webp",
    title: "New Honda City",
    description:
      "Sedan kompak dengan ruang kabin luas, teknologi canggih, dan desain elegan untuk kenyamanan berkendara sehari-hari.",
    downloadLink: "/brochure/City.pdf",
  },
  {
    id: 12,
    image: "/mobil-megamenu/New-Honda-Brio.webp",
    title: "Honda Mobilio",
    description:
      "MPV 7 seater dengan harga terjangkau, ruang fleksibel, dan efisiensi bahan bakar optimal untuk keluarga Indonesia.",
    downloadLink: "/brochure/Mobilio.pdf",
  },
]

export default function BrochurePage() {
  return (
    <ErrorBoundary>
      <div className="relative">
        {/* 1 Column - Hero Section */}
        <ErrorBoundary>
          <ParallaxHeroSection
            title="Honda Digital Brochures"
            subtitle="Explore our complete collection of Honda vehicles through interactive digital brochures and comprehensive specifications."
          />
        </ErrorBoundary>

        {/* Interactive Brochure Features - Updated Layout */}
        <section id="brochure-features" className="py-16 lg:py-24 bg-honda-light" style={{ position: 'relative' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">
              Interactive Brochure Features
            </h2>

            <div className="grid grid-cols-1 gap-4 lg:gap-6 max-w-6xl mx-auto" style={{ willChange: 'transform' }}>
              {/* Feature 1: full width */}
              <div
                key={brochureFeatures[0].id}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ position: 'relative' }}
              >
                <div className="aspect-[8/3] relative">
                  <Image
                    src={brochureFeatures[0].image || "/placeholder.svg"}
                    alt={brochureFeatures[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                    priority
                    loading="eager"
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
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
      </div>
    </ErrorBoundary>
  )
}
