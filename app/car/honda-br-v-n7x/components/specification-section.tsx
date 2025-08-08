"use client"

import React, { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"

// Types
type ColorOption = {
  name: string
  code: string
  image: string
}

type VariantType = {
  name: string
  price: string
  image: string
  specs: string[]
}

// Color configurations for each variant
const colorsByVariant: Record<string, ColorOption[]> = {
  "Honda BR-V S M/T": [
    {
      name: "Taffeta White (S Type)",
      code: "#F8F8FF",
      image: "/honda-br-v-n7x/Taffeta White (S Type).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
  "Honda BR-V E M/T": [
    {
      name: "Premium Opal White Pearl (Prestige & E Type)",
      code: "#F8F8FF",
      image: "/honda-br-v-n7x/Premium Opal White Pearl (Prestige & E Type).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
  "Honda BR-V E CVT": [
    {
      name: "Premium Opal White Pearl (Prestige & E Type)",
      code: "#F8F8FF",
      image: "/honda-br-v-n7x/Premium Opal White Pearl (Prestige & E Type).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
  "Honda BR-V Prestige CVT": [
    {
      name: "Premium Opal White Pearl (Prestige & E Type)",
      code: "#F8F8FF",
      image: "/honda-br-v-n7x/Premium Opal White Pearl (Prestige & E Type).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
  "Honda BR-V Prestige with Honda Sensing": [
    {
      name: "Premium Opal White Pearl (Prestige & E Type)",
      code: "#F8F8FF",
      image: "/honda-br-v-n7x/Premium Opal White Pearl (Prestige & E Type).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
  "New Honda BR-V N7X E CVT": [
    {
      name: "Sand Khaki Pearl (N7X Edition)",
      code: "#D2B48C",
      image: "/honda-br-v-n7x/Sand Khaki Pearl (N7X Edition).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
  "New Honda BR-V N7X Prestige CVT": [
    {
      name: "Sand Khaki Pearl (N7X Edition)",
      code: "#D2B48C",
      image: "/honda-br-v-n7x/Sand Khaki Pearl (N7X Edition).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
  "New Honda BR-V N7X Prestige with Honda Sensing": [
    {
      name: "Sand Khaki Pearl (N7X Edition)",
      code: "#D2B48C",
      image: "/honda-br-v-n7x/Sand Khaki Pearl (N7X Edition).webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-br-v-n7x/Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-br-v-n7x/Crystal Black Pearl.webp",
    },
  ],
}

const brvVariants: VariantType[] = [
  {
    name: "Honda BR-V S M/T",
    price: "Rp 297.300.000",
    image: "/honda-br-v-n7x/spesifikasi - Honda BR-V S M-T.webp",
    specs: [
      "1.5L DOHC i-VTEC Engine 121 PS",
      "ABS + EBD + BA",
      '16" Trim Wheels',
      "LED Headlamp with LED DRL",
      '9" Touchscreen Display Audio with Smartphone Connection',
      "HSA (Hill Start Assist)",
      "VSA (Vehicle Stability Assist)",
      "4 Airbags",
    ]
  },
  {
    name: "Honda BR-V E M/T",
    price: "Rp 312.800.000",
    image: "/honda-br-v-n7x/spesifikasi - Honda BR-V E M-T.webp",
    specs: [
      "Memiliki semua fitur dari Honda BR-V tipe S, ditambah:",
      '16" Alloy Wheels',
      "LED foglight",
      "Smart Entry System",
      "Walk-Away Auto Lock",
      "TFT Meter",
      "2nd Row Accessories Power Outlet",
    ]
  },
  {
    name: "Honda BR-V E CVT",
    price: "Rp 318.400.000",
    image: "/honda-br-v-n7x/spesifikasi - Honda BR-V E CVT.webp",
    specs: [
      "Memiliki semua fitur dari Honda BR-V tipe S, ditambah:",
      '16" Alloy Wheels',
      "LED foglight",
      "Smart Entry System",
      "Walk-Away Auto Lock",
      "TFT Meter",
      "2nd Row Accessories Power Outlet",
      "Remote Engine Start",
    ]
  },
  {
    name: "Honda BR-V Prestige CVT",
    price: "Rp 342.400.000",
    image: "/honda-br-v-n7x/spesifikasi - Honda BR-V Prestige CVT.webp",
    specs: [
      "Memiliki semua fitur dari Honda BR-V tipe E CVT, ditambah:",
      "Auto Foldable Side Door Mirror with LED Turning Signal",
      '17" Alloy Wheel',
      "2nd Row Armrest Console",
      "3rd Row Accessories Power Outlet",
      "Leather Seat",
      "Auto A/C",
    ]
  },
  {
    name: "Honda BR-V Prestige with Honda Sensing",
    price: "Rp 362.400.000",
    image: "/honda-br-v-n7x/spesifikasi - Honda BR-V Prestige with Honda Sensing.webp",
    specs: [
      "Memiliki semua fitur dari Honda BR-V tipe Prestige CVT, ditambah:",
      '7" Touchscreen Display Audio with Smartphone Connection',
      "Honda SENSING",
      "Honda LaneWatch™",
      "6 Airbags",
    ]
  },
  {
    name: "New Honda BR-V N7X E CVT",
    price: "Rp 325.500.000",
    image: "/honda-br-v-n7x/spesifikasi - New Honda BR-V N7X E CVT.webp",
    specs: [
      "Memiliki semua fitur dari New Honda BR-V tipe E CVT, ditambah:",
      "New Sleek Dark Chrome Front Grille with N7X Edition Emblem",
      'New 16" Stylish Black Alloy Wheel Design',
      "New Power Retractable Black Door Mirror with LED Turning Signal",
      "New Black Door Handle",
      "New Black Door Lower Protector",
      "New Black Shark Fin Antenna",
      "New Dark Chrome Emblem",
      "New Black Interior",
    ]
  },
  {
    name: "New Honda BR-V N7X Prestige CVT",
    price: "Rp 350.400.000",
    image: "/honda-br-v-n7x/spesifikasi - New Honda BR-V N7X Prestige CVT.webp",
    specs: [
      "Memiliki semua fitur New Honda BR-V N7X E tipe CVT, ditambah:",
      "New Sleek Dark Chrome Front Grille with N7X Edition Emblem and Chrome Garnish",
      "New LED Foglight with Stylish Chrome Garnish",
      "New Front Under Spoiler",
      'New 17" Progressive Black Alloy Wheel Design',
      "New Side Under Spoiler",
      "New Black Tailgate Spoiler",
      "New Rear Under Spoiler and Dark Chrome Prestige Emblem",
      "New Reflector Garnish",
    ]
  },
  {
    name: "New Honda BR-V N7X Prestige with Honda Sensing",
    price: "Rp 370.400.000",
    image: "/honda-br-v-n7x/spesifikasi - New Honda BR-V N7X Prestige with Honda Sensing.webp",
    specs: [
      "Memiliki semua fitur New Honda BR-V N7X Prestige CVT, ditambah:",
      '7" Touchscreen Display Audio with Smartphone Connection',
      "Honda SENSING",
      "Honda LaneWatch™",
    ]
  }
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [currentStep] = useState(1)
  const [api, setApi] = useState<CarouselApi>()
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const totalSteps = 4

  useEffect(() => {
    if (!api) {
      return
    }

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      setCurrentVariantIndex(api.selectedScrollSnap())
    }

    updateScrollState()
    api.on("select", updateScrollState)
    api.on("reInit", updateScrollState)

    return () => {
      api.off("select", updateScrollState)
      api.off("reInit", updateScrollState)
    }
  }, [api])

  const currentVariant = brvVariants[currentVariantIndex]
  const currentColors = useMemo(() => colorsByVariant[currentVariant?.name] || [], [currentVariant?.name])
  const [selectedColor, setSelectedColor] = useState(currentColors[0])

  // Update selected color when variant changes
  useEffect(() => {
    if (currentColors.length > 0) {
      setSelectedColor(currentColors[0])
    }
  }, [currentVariantIndex, currentColors])

  // Color navigation functions
  const currentColorIndex = currentColors.findIndex((color) => color.name === selectedColor?.name)
  const canGoPrev = currentColorIndex > 0
  const canGoNext = currentColorIndex < currentColors.length - 1
  
  const handlePrevColor = () => {
    if (canGoPrev) {
      setSelectedColor(currentColors[currentColorIndex - 1])
    }
  }
  
  const handleNextColor = () => {
    if (canGoNext) {
      setSelectedColor(currentColors[currentColorIndex + 1])
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-full overflow-hidden relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {brvVariants.map((variant, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2">
                  <div className="p-1">
                    <div className="max-w-lg mx-auto text-center">
                      <div className="min-h-[450px] flex flex-col justify-start items-center">
                        <h2 className="text-xl font-bold text-honda-gray-dark text-center mb-6">{variant.name}</h2>
                        <div className="relative mb-6 w-full">
                          <Image
                            src={variant.image}
                            alt={variant.name}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg shadow-lg mx-auto"
                          />
                        </div>
                        <Button
                          onClick={() => setIsColorModalOpen(true)}
                          size="lg"
                          className="w-full max-w-xs mx-auto bg-honda-red-primary hover:bg-honda-red-dark text-white font-bold py-4 text-lg flex items-center justify-center gap-2"
                        >
                          {variant.price} <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="space-y-6 mt-12 text-left">
                        <h3 className="text-xl font-bold text-honda-gray-dark text-center mb-4">Spesifikasi Utama</h3>
                        <div className="space-y-2">
                          {variant.specs.map((spec, specIndex) => (
                            <div key={specIndex} className="py-2 border-b border-honda-gray-light flex items-start">
                              <span className="text-honda-red-primary mr-2 mt-1">•</span>
                              <span className="text-honda-gray-dark text-sm font-semibold leading-6">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Navigation buttons positioned outside carousel */}
          <button
            onClick={() => api?.scrollPrev()}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 rounded-full border border-honda-red-primary bg-white hover:bg-honda-red-primary hover:text-white text-honda-red-primary items-center justify-center transition-all duration-200 shadow-lg ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!canScrollPrev}
          >
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 rounded-full border border-honda-red-primary bg-white hover:bg-honda-red-primary hover:text-white text-honda-red-primary items-center justify-center transition-all duration-200 shadow-lg ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!canScrollNext}
          >
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Consolidated Keterangan Section */}
        <div className="bg-honda-light p-4 rounded-lg mt-12 text-left max-w-6xl mx-auto">
          <h4 className="font-semibold text-honda-gray-dark mb-2">Keterangan:</h4>
          <p className="text-sm text-honda-gray">
            **Harga dapat berubah sewaktu-waktu. Harga yang tertera adalah harga OTR Jakarta.
          </p>
        </div>

        {/* Color Selection Modal - Full Screen */}
        <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
          <DialogContent className="w-screen h-screen max-w-full max-h-full bg-white p-0 m-0 flex flex-col">
            <DialogHeader className="flex-shrink-0 p-4 border-b border-honda-gray-light relative">
              <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">
                {currentVariant?.name || "Honda BR-V N7X Edition"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Color selection modal for Honda BR-V N7X Edition
              </DialogDescription>
</DialogHeader>

            <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-y-auto">
              <div className="relative w-full max-w-sm aspect-[16/10] mb-8">
                <Image
                  src={selectedColor?.image || "/placeholder.svg"}
                  alt={`${currentVariant?.name || "Honda BR-V N7X Edition"} - ${selectedColor?.name || "Default Color"}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

              <div className="relative flex justify-between items-center w-full max-w-2xl mb-8">
                {Array.from({ length: totalSteps }, (_, i) => {
                  const step = i + 1
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center z-10">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-semibold",
                            "bg-white text-honda-gray-dark border border-honda-red-primary",
                            step === currentStep && "bg-honda-red-primary text-white",
                          )}
                        >
                          {step}
                        </div>
                        <span
                          className={cn(
                            "text-xs mt-1",
                            step === currentStep ? "text-honda-red-primary font-semibold" : "text-honda-gray",
                          )}
                        >
                          {step === 1 && "COLOR"}
                          {step === 2 && "MAINTENANCE"}
                          {step === 3 && "ACCESSORIES"}
                          {step === 4 && "FINISH"}
                        </span>
                      </div>
                      {i < totalSteps - 1 && (
                        <div className="flex-grow border-t-2 border-dashed border-honda-red-primary mx-6" />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {currentColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full transition-all duration-200 border ${selectedColor?.name === color.name
                      ? "border-honda-red-primary scale-110"
                      : "border-gray-300 hover:border-honda-red-light"
                      }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-honda-gray-dark font-medium text-lg mb-8">{selectedColor?.name || "Pilih Warna"}</p>

              <div className="flex justify-between w-full max-w-2xl mb-8">
                <Button
                  onClick={handlePrevColor}
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent text-honda-gray-dark border-honda-gray-light hover:bg-honda-light"
                  disabled={!canGoPrev}
                >
                  PREV
                </Button>
                <Button
                  onClick={handleNextColor}
                  variant="destructive"
                  className="flex items-center gap-2 bg-honda-red-primary hover:bg-honda-red-dark"
                  disabled={!canGoNext}
                >
                  NEXT <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-full max-w-3xl border-t border-honda-gray-light pt-6">
                <h3 className="text-xl font-bold text-honda-red-primary mb-4">DETAIL</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-honda-gray-dark">
                  <span className="font-medium">Variant</span>
                  <span>{currentVariant?.name || "N/A"}</span>
                  <span className="font-medium">Color</span>
                  <span className="flex items-center gap-2">
                    {selectedColor?.name || "N/A"}
                    {selectedColor && (
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: selectedColor.code }}
                      ></span>
                    )}
                  </span>
                  <span className="font-medium">Maintenance</span>
                  <span>—</span>
                  <span className="font-medium">Accessories</span>
                  <span>—</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
