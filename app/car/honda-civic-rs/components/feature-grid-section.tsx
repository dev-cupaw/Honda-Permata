"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=400&text=Civic+RS+Turbo+Engine",
    title: "VTEC Turbo 1.5L Engine",
    description:
      "Mesin VTEC Turbo 1.5L menghasilkan tenaga 178 PS dan torsi 240 Nm, memberikan akselerasi yang responsif dan performa yang bertenaga. Teknologi turbocharger memastikan efisiensi bahan bakar optimal tanpa mengorbankan performa.",
    detailLink: "/car/honda-civic-rs/engine",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=400&text=Civic+RS+Sporty+Design",
    title: "Desain Sporty Aerodinamis",
    description:
      "Eksterior dengan garis bodi yang aerodinamis, front grille agresif, dan detail sporty RS yang menawan. LED headlights dengan DRL signature memberikan karakter yang kuat dan modern di segala kondisi.",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=400&text=Civic+RS+Premium+Interior",
    title: "Interior Premium Sport",
    description:
      "Kabin mewah dengan material premium, kursi sport dengan aksen merah, dan dashboard modern. Sistem infotainment 9 inci dengan konektivitas smartphone lengkap untuk pengalaman berkendara yang nyaman.",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=400&text=Civic+RS+Honda+SENSING",
    title: "Honda SENSING Suite",
    description:
      "Paket lengkap teknologi keselamatan aktif termasuk Collision Mitigation Braking, Lane Keeping Assist, Adaptive Cruise Control, dan Road Departure Mitigation untuk perlindungan maksimal.",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=400&text=Civic+RS+CVT+Transmission",
    title: "CVT with Paddle Shifters",
    description:
      "Transmisi CVT yang halus dilengkapi paddle shifters untuk kontrol manual yang responsif. Mode berkendara Sport memberikan karakter yang lebih agresif sesuai dengan DNA sporty Civic RS.",
  },
]

export function FeatureGridSection() {
  const [activeFeatureId, setActiveFeatureId] = useState<number | null>(null)

  return (
    <section id="features" className="py-16 lg:py-24 bg-honda-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">
          Fitur Unggulan Honda Civic RS
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {/* First feature: full width on desktop */}
          <div
            key={features[0].id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setActiveFeatureId(features[0].id)}
          >
            <div className="aspect-[8/3] relative">
              <Image
                src={features[0].image || "/placeholder.svg"}
                alt={features[0].title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-black/20 transition-colors duration-300 ${
                  activeFeatureId === features[0].id ? "opacity-0" : "group-hover:bg-black/40"
                }`}
              />
              <div
                className={`absolute top-3 right-3 bg-honda-red-primary rounded-full p-2 transition-transform duration-300 ${
                  activeFeatureId === features[0].id ? "opacity-0 scale-0" : "group-hover:scale-110"
                }`}
              >
                <Plus className="h-4 w-4 text-white" />
              </div>

              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center ${
                  activeFeatureId === features[0].id ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-white text-lg leading-relaxed mb-4">{features[0].description}</p>
                {features[0].detailLink && (
                  <Link href={features[0].detailLink} className="text-honda-red-primary hover:underline text-base">
                    Selengkapnya tentang Mesin →
                  </Link>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-4 right-4 bg-honda-red-primary hover:bg-honda-red-dark rounded-full h-10 w-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveFeatureId(null)
                  }}
                >
                  <X className="h-5 w-5 text-white" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Second and Third features: side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {features.slice(1, 3).map((feature) => (
              <div
                key={feature.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setActiveFeatureId(feature.id)}
              >
                <div className="aspect-[4/3] relative">
                  <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
                  <div
                    className={`absolute inset-0 bg-black/20 transition-colors duration-300 ${
                      activeFeatureId === feature.id ? "opacity-0" : "group-hover:bg-black/40"
                    }`}
                  />
                  <div className={`absolute bottom-0 left-0 p-4 ${activeFeatureId === feature.id ? "opacity-0" : ""}`}>
                    <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                  </div>
                  <div
                    className={`absolute top-3 right-3 bg-honda-red-primary rounded-full p-2 transition-transform duration-300 ${
                      activeFeatureId === feature.id ? "opacity-0 scale-0" : "group-hover:scale-110"
                    }`}
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </div>

                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center ${
                      activeFeatureId === feature.id ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-white text-lg leading-relaxed mb-4">{feature.description}</p>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute bottom-4 right-4 bg-honda-red-primary hover:bg-honda-red-dark rounded-full h-10 w-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveFeatureId(null)
                      }}
                    >
                      <X className="h-5 w-5 text-white" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fourth feature: full width on desktop */}
          <div
            key={features[3].id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setActiveFeatureId(features[3].id)}
          >
            <div className="aspect-[8/3] relative">
              <Image
                src={features[3].image || "/placeholder.svg"}
                alt={features[3].title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-black/20 transition-colors duration-300 ${
                  activeFeatureId === features[3].id ? "opacity-0" : "group-hover:bg-black/40"
                }`}
              />
              <div className={`absolute bottom-0 left-0 p-4 ${activeFeatureId === features[3].id ? "opacity-0" : ""}`}>
                <h3 className="text-white font-bold text-lg">{features[3].title}</h3>
              </div>
              <div
                className={`absolute top-3 right-3 bg-honda-red-primary rounded-full p-2 transition-transform duration-300 ${
                  activeFeatureId === features[3].id ? "opacity-0 scale-0" : "group-hover:scale-110"
                }`}
              >
                <Plus className="h-4 w-4 text-white" />
              </div>

              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center ${
                  activeFeatureId === features[3].id ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-white text-lg leading-relaxed mb-4">{features[3].description}</p>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-4 right-4 bg-honda-red-primary hover:bg-honda-red-dark rounded-full h-10 w-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveFeatureId(null)
                  }}
                >
                  <X className="h-5 w-5 text-white" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Fifth feature: full width on desktop */}
          <div
            key={features[4].id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setActiveFeatureId(features[4].id)}
          >
            <div className="aspect-[8/3] relative">
              <Image
                src={features[4].image || "/placeholder.svg"}
                alt={features[4].title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-black/20 transition-colors duration-300 ${
                  activeFeatureId === features[4].id ? "opacity-0" : "group-hover:bg-black/40"
                }`}
              />
              <div className={`absolute bottom-0 left-0 p-4 ${activeFeatureId === features[4].id ? "opacity-0" : ""}`}>
                <h3 className="text-white font-bold text-lg">{features[4].title}</h3>
              </div>
              <div
                className={`absolute top-3 right-3 bg-honda-red-primary rounded-full p-2 transition-transform duration-300 ${
                  activeFeatureId === features[4].id ? "opacity-0 scale-0" : "group-hover:scale-110"
                }`}
              >
                <Plus className="h-4 w-4 text-white" />
              </div>

              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center ${
                  activeFeatureId === features[4].id ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-white text-lg leading-relaxed mb-4">{features[4].description}</p>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-4 right-4 bg-honda-red-primary hover:bg-honda-red-dark rounded-full h-10 w-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveFeatureId(null)
                  }}
                >
                  <X className="h-5 w-5 text-white" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
