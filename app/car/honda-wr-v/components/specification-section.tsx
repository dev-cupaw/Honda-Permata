"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Type definitions
interface Color {
  name: string
  code: string
  image: string
}

interface Variant {
  name: string
  price: string
  image: string
  specs: string[]
}

// Color configurations for each variant
const colorsByVariant: Record<string, Color[]> = {
  "Honda WR-V 1.5L E M/T": [
    {
      name: "Taffeta White (E Type only)",
      code: "#F8F8FF",
      image: "/honda-wr-v/honda - Taffeta White.webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-wr-v/honda - Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-wr-v/honda - Crystal Black Pearl.webp",
    },
  ],
  "Honda WR-V 1.5L E CVT": [
    {
      name: "Taffeta White (E Type only)",
      code: "#F8F8FF",
      image: "/honda-wr-v/honda - Taffeta White.webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-wr-v/honda - Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-wr-v/honda - Crystal Black Pearl.webp",
    },
  ],
  "Honda WR-V 1.5L RS": [
    {
      name: "Ignite Red Metallic Two Tone (RS Type Only)",
      code: "#B22222",
      image: "/honda-wr-v/honda - Ignite Red Metallic Two Tone.webp",
    },
    {
      name: "Ignite Red Metallic (RS Type Only)",
      code: "#DC143C",
      image: "/honda-wr-v/honda - Ignite Red Metallic.webp",
    },
    {
      name: "Stellar Diamond Pearl (RS Type only)",
      code: "#E0FFFF",
      image: "/honda-wr-v/honda - Stellar Diamond Pearl.webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-wr-v/honda - Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-wr-v/honda - Crystal Black Pearl.webp",
    },
  ],
  "Honda WR-V 1.5L RS with Honda Sensing": [
    {
      name: "Ignite Red Metallic Two Tone (RS Type Only)",
      code: "#B22222",
      image: "/honda-wr-v/honda - Ignite Red Metallic Two Tone.webp",
    },
    {
      name: "Ignite Red Metallic (RS Type Only)",
      code: "#DC143C",
      image: "/honda-wr-v/honda - Ignite Red Metallic.webp",
    },
    {
      name: "Stellar Diamond Pearl (RS Type only)",
      code: "#E0FFFF",
      image: "/honda-wr-v/honda - Stellar Diamond Pearl.webp",
    },
    {
      name: "Meteoroid Gray Metallic",
      code: "#708090",
      image: "/honda-wr-v/honda - Meteoroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda-wr-v/honda - Crystal Black Pearl.webp",
    },
  ],
}

const wrvVariants = [
  {
    name: "Honda WR-V 1.5L E M/T",
    price: "Rp 280.700.000",
    image: "/honda-wr-v/spesifikasi Honda WR-V 1.5L E M-T.webp",
    specs: [
      "1.5L DOHC i-VTEC Engine 121 PS",
      "One Push Ignition System",
      '7" Touchscreen Display Audio',
      "2nd Power Outlet",
      '16" Alloy Wheels',
      "Door Mirror with LED Turning Signal",
      "Rear Parking Camera with Multi Angle View",
      "ABS + EBD + BA",
      "HSA (Hill Start Assist)",
      "VSA (Vehicle Stability Assist)",
      "4 Speakers",
      "Digital A/C",
      "Fabric Seat",
      "4 Airbags",
      "Keyless Entry",
    ]
  },
  {
    name: "Honda WR-V 1.5L E CVT",
    price: "Rp 290.700.000",
    image: "/honda-wr-v/spesifikasi Honda WR-V 1.5L E CVT.webp",
    specs: [
      "1.5L DOHC i-VTEC Engine 121 PS",
      "One Push Ignition System",
      "Remote Engine Start",
      '7" Touchscreen Display Audio',
      "2nd Power Outlet",
      '16" Alloy Wheels',
      "Door Mirror with LED Turning Signal",
      "Rear Parking Camera with Multi Angle View",
      "ABS + EBD + BA",
      "HSA (Hill Start Assist)",
      "VSA (Vehicle Stability Assist)",
      "4 Speakers",
      "Digital A/C",
      "Fabric Seat",
      "4 Airbags",
      "Keyless Entry",
    ]
  },
  {
    name: "Honda WR-V 1.5L RS",
    price: "Rp 310.700.000",
    image: "/honda-wr-v/spesifikasi Honda WR-V 1.5L RS.webp",
    specs: [
      "Memiliki semua fitur dari Honda WR-V tipe E CVT, ditambah:",
      "Full LED Headlight with LED DRL",
      "Rear Seat Reminder",
      "Walk Away Auto Lock",
      '17" Two Tone Alloy Wheel',
      "Meter Cluster with 4.2\" TFT Display",
      "6 Speakers",
      "Leather Wrap Steering Wheel & Shift Knob",
      "Leather-Fabric Combi Seat",
      "Auto A/C",
      "Door Mirror with LED Turning Signal (Auto Foldable)",
      "*Penambahan harga sebesar Rp 2.500.000 untuk Two-Tone Color",
    ]
  },
  {
    name: "Honda WR-V 1.5L RS with Honda Sensing",
    price: "Rp 330.700.000",
    image: "/honda-wr-v/spesifikasi Honda WR-V 1.5L RS with Honda Sensing.webp",
    specs: [
      "Memiliki semua fitur dari Honda WR-V tipe RS CVT, ditambah:",
      "Honda SENSING",
      "Honda LaneWatch™",
      "6 Airbags",
      "USB Power Outlet",
      "Auto Headlight",
      "*Penambahan harga sebesar Rp 2.500.000 untuk Two-Tone Color",
    ]
  }
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [selectedVariantForModal, setSelectedVariantForModal] = useState(wrvVariants[0])
  const [selectedColor, setSelectedColor] = useState(colorsByVariant[wrvVariants[0].name][0])
  const [currentStep, setCurrentStep] = useState(1)

  const totalSteps = 4

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))
  const handleNextStep = () => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))

  const handleOpenColorModal = (variant: Variant) => {
    setSelectedVariantForModal(variant)
    const availableColors = colorsByVariant[variant.name]
    setSelectedColor(availableColors[0])
    setIsColorModalOpen(true)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-full overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {wrvVariants.map((variant, index) => (
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
                          onClick={() => handleOpenColorModal(variant)}
                          size="lg"
                          className="w-full max-w-xs mx-auto bg-honda-red-primary hover:bg-honda-red-dark text-white font-bold py-4 text-lg flex items-center justify-center gap-2"
                        >
                          {variant.price} <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="space-y-4 mt-8 text-left">
                        <h3 className="text-lg font-bold text-honda-gray-dark text-center mb-3">Spesifikasi Utama</h3>
                        <div className="space-y-1">
                          {variant.specs.map((spec, specIndex) => (
                            <div key={specIndex} className="py-1 border-b border-honda-gray-light">
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
            <CarouselPrevious className="-left-4 hidden sm:flex" />
            <CarouselNext className="-right-4 hidden sm:flex" />
          </Carousel>
        </div>

        {/* Consolidated Keterangan Section */}
        <div className="bg-honda-light p-4 rounded-lg mt-12 text-left max-w-6xl mx-auto">
          <h4 className="font-semibold text-honda-gray-dark mb-2">Keterangan:</h4>
          <p className="text-sm text-honda-gray">
            *Harga dapat berubah sewaktu-waktu. Harga yang tertera adalah harga OTR Jakarta.
          </p>
        </div>

        {/* Color Selection Modal - Full Screen */}
        <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
          <DialogContent className="w-screen h-screen max-w-full max-h-full bg-white p-0 m-0 flex flex-col">
            <DialogHeader className="flex-shrink-0 p-4 border-b border-honda-gray-light relative">
              <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">{selectedVariantForModal?.name || "Honda WR-V"}</DialogTitle>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-y-auto">
              <div className="relative w-full max-w-xl aspect-[3/2] mb-8">
                <Image
                  src={selectedColor.image}
                  alt={`${selectedVariantForModal?.name || "Honda WR-V"} - ${selectedColor.name}`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="relative flex justify-between items-center w-full max-w-md mb-8">
                {Array.from({ length: totalSteps }, (_, i) => {
                  const step = i + 1
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center z-10">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-semibold",
                            "bg-white text-honda-gray-dark border-2 border-honda-red-primary",
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
                {colorsByVariant[selectedVariantForModal?.name]?.map((color: Color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                      selectedColor.name === color.name
                        ? "border-honda-red-primary scale-110"
                        : "border-gray-300 hover:border-honda-red-light"
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-honda-gray-dark font-medium text-lg mb-8">{selectedColor.name}</p>

              <div className="flex justify-between w-full max-w-md mb-8">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent text-honda-gray-dark border-honda-gray-light hover:bg-honda-light"
                  disabled={currentStep === 1}
                >
                  PREV
                </Button>
                <Button
                  onClick={handleNextStep}
                  variant="destructive"
                  className="flex items-center gap-2 bg-honda-red-primary hover:bg-honda-red-dark"
                  disabled={currentStep === totalSteps}
                >
                  NEXT <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-full max-w-md border-t border-honda-gray-light pt-6">
                <h3 className="text-xl font-bold text-honda-red-primary mb-4">DETAIL</h3>
                <div className="grid grid-cols-2 gap-y-2 text-honda-gray-dark">
                  <span className="font-medium">Variant</span>
                  <span>{selectedVariantForModal?.name || "N/A"}</span>
                  <span className="font-medium">Color</span>
                  <span className="flex items-center gap-2">
                    {selectedColor.name}
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedColor.code }}
                    ></span>
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
