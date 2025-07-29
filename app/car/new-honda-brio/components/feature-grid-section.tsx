"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=400&text=Brio+Stylish+Design",
    title: "Desain Stylish & Modern",
    description:
      "New Honda Brio tampil dengan desain eksterior yang lebih segar dan modern, dilengkapi garis bodi yang dinamis dan detail sporty yang menarik perhatian di jalanan kota.",
    detailLink: "/car/new-honda-brio/design",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=400&text=Brio+Fuel+Efficiency",
    title: "Efisiensi Bahan Bakar Tinggi",
    description:
      "Mesin i-VTEC 1.2L yang efisien memastikan konsumsi bahan bakar yang irit, menjadikannya pilihan ideal untuk penggunaan sehari-hari di perkotaan tanpa khawatir biaya operasional.",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=400&text=Brio+Spacious+Interior",
    title: "Interior Luas & Nyaman",
    description:
      "Meskipun kompak, New Honda Brio menawarkan ruang kabin yang surprisingly luas untuk 5 penumpang, dengan desain ergonomis dan material berkualitas untuk kenyamanan maksimal.",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=400&text=Brio+Agile+Handling",
    title: "Handling Lincah & Responsif",
    description:
      "Dengan dimensi yang kompak dan sistem kemudi yang responsif, New Honda Brio sangat lincah untuk bermanuver di lalu lintas padat dan parkir di ruang sempit, memberikan pengalaman berkendara yang menyenangkan.",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=400&text=Brio+Safety+Features",
    title: "Fitur Keselamatan Lengkap",
    description:
      "Dilengkapi dengan Dual Front SRS Airbags, G-CON + ACE™ Body, ABS + EBD, dan Pretensioner with Load Limiter Seatbelt, New Honda Brio memberikan perlindungan optimal untuk semua penumpang.",
  },
]

export function FeatureGridSection() {
  const [activeFeatureId, setActiveFeatureId] = useState<number | null>(null)

  return (
    <section id="features" className="py-16 lg:py-24 bg-honda-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">
          Fitur Unggulan New Honda Brio
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
                    Selengkapnya tentang Desain →
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
