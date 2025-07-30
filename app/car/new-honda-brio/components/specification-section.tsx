"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"

// Color configurations for each variant
const brioColorsByVariant = {
  "Honda Brio Satya S M/T": [
    {
      name: "Electric Lime Metallic",
      code: "#32CD32",
      image: "/honda brio/Honda Brio Satya S M-T - Electric Lime Metallic.webp",
    },
    {
      name: "Rallye Red (Satya)",
      code: "#DC143C",
      image: "/honda brio/Honda Brio Satya S M-T - Rallye Red (Satya).webp",
    },
    {
      name: "Taffeta White (Satya)",
      code: "#F8F8FF",
      image: "/honda brio/Honda Brio Satya S M-T - Taffeta White (Satya).webp",
    },
    {
      name: "Meteroid Gray Metallic",
      code: "#708090",
      image: "/honda brio/Honda Brio Satya S M-T - Meteroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda brio/Honda Brio Satya S M-T - Crystal Black Pearl.webp",
    },
  ],
  "Honda Brio Satya E M/T": [
    {
      name: "Electric Lime Metallic",
      code: "#32CD32",
      image: "/honda brio/Honda Brio Satya E M-T - Electric Lime Metallic.webp",
    },
    {
      name: "Rallye Red (Satya)",
      code: "#DC143C",
      image: "/honda brio/Honda Brio Satya E M-T - Rallye Red (Satya).webp",
    },
    {
      name: "Taffeta White (Satya)",
      code: "#F8F8FF",
      image: "/honda brio/Honda Brio Satya E M-T - Taffeta White (Satya).webp",
    },
    {
      name: "Meteroid Gray Metallic",
      code: "#708090",
      image: "/honda brio/Honda Brio Satya E M-T - Meteroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda brio/Honda Brio Satya E M-T - Crystal Black Pearl.webp",
    },
  ],
  "Honda Brio Satya E CVT": [
    {
      name: "Electric Lime Metallic",
      code: "#32CD32",
      image: "/honda brio/Honda Brio Satya E CVT - Electric Lime Metallic.webp",
    },
    {
      name: "Rallye Red (Satya)",
      code: "#DC143C",
      image: "/honda brio/Honda Brio Satya E CVT - Rallye Red (Satya).webp",
    },
    {
      name: "Taffeta White (Satya)",
      code: "#F8F8FF",
      image: "/honda brio/Honda Brio Satya E CVT - Taffeta White (Satya).webp",
    },
    {
      name: "Meteroid Gray Metallic",
      code: "#708090",
      image: "/honda brio/Honda Brio Satya E CVT - Meteroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda brio/Honda Brio Satya E CVT - Crystal Black Pearl.webp",
    },
  ],
  "Honda Brio RS M/T": [
    {
      name: "Electric Lime Metallic",
      code: "#32CD32",
      image: "/honda brio/Honda Brio RS M-T - Electric Lime Metallic.webp",
    },
    {
      name: "Meteroid Gray Metallic",
      code: "#708090",
      image: "/honda brio/Honda Brio RS M-T - Meteroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda brio/Honda Brio RS M-T - Crystal Black Pearl.webp",
    },
    {
      name: "Phoenix Orange Pearl Two Tone (RS)",
      code: "#FF4500",
      image: "/honda brio/Honda Brio RS M-T - Phoenix Orange Pearl Two Tone (RS).webp",
    },
    {
      name: "Stellar Diamond Pearl (RS)",
      code: "#E6E6FA",
      image: "/honda brio/Honda Brio RS M-T - Stellar Diamond Pearl (RS).webp",
    },
  ],
  "Honda Brio RS CVT": [
    {
      name: "Electric Lime Metallic",
      code: "#32CD32",
      image: "/honda brio/Honda Brio RS CVT - Electric Lime Metallic.webp",
    },
    {
      name: "Meteroid Gray Metallic",
      code: "#708090",
      image: "/honda brio/Honda Brio RS CVT - Meteroid Gray Metallic.webp",
    },
    {
      name: "Crystal Black Pearl",
      code: "#000000",
      image: "/honda brio/Honda Brio RS CVT - Crystal Black Pearl.webp",
    },
    {
      name: "Phoenix Orange Pearl Two Tone (RS)",
      code: "#FF4500",
      image: "/honda brio/Honda Brio RS CVT - Phoenix Orange Pearl Two Tone (RS).webp",
    },
    {
      name: "Stellar Diamond Pearl (RS)",
      code: "#E6E6FA",
      image: "/honda brio/Honda Brio RS CVT - Stellar Diamond Pearl (RS).webp",
    },
  ],
}

const brioVariants = [
  {
    name: "Honda Brio Satya S M/T",
    price: "Rp170.400.000",
    specs: [
      "1.2L i-VTEC 90PS with 4 cylinder",
      "5 M/T",
      "Digital A/C",
      "Chrome Front Grille",
      "14\" Trim Wheels",
      "Black & Gray Interior Color with New Fabric Seat Pattern",
      "Auto Up/Down Windows with Anti Pinch",
      "2nd Row Adjustable Headrest",
      "Tilt Steering",
      "Electric Power Steering",
      "ABS + EBD",
      "Parking Sensor",
      "7\" Touchscreen Display Audio, USB Port, AM/FM Radio, Bluetooth, Hands-free Telephone, Screen Mirroring",
    ],
    image: "/honda brio/Spesifikasi-Honda Brio Satya S M-T.webp",
  },
  {
    name: "Honda Brio Satya E M/T",
    price: "Rp185.500.000",
    specs: [
      "Memiliki semua fitur di tipe S, ditambah:",
      "Headlamp with LED DRL",
      "14\" Two Tone Alloy Wheels",
      "Rear Wiper",
      "Audio Steering Switch with Illumination",
      "Auto Door Lock by Speed",
      "Alarm System",
      "Shifter Illumination",
    ],
    image: "/honda brio/Spesifikasi Honda Brio Satya E M-T.webp",
  },
  {
    name: "Honda Brio Satya E CVT",
    price: "Rp202.500.000",
    specs: [
      "Memiliki semua fitur di tipe S, ditambah:",
      "Headlamp with LED DRL",
      "14\" Two Tone Alloy Wheels",
      "Rear Wiper",
      "Audio Steering Switch with Illumination",
      "Auto Door Lock by Speed",
      "Alarm System",
      "Shifter Illumination",
    ],
    image: "/honda brio/Spesifikasi Honda Brio Satya E CVT.webp",
  },
  {
    name: "Honda Brio RS M/T",
    price: "Rp248.200.000",
    specs: [
      "Memiliki semua fitur di tipe E, ditambah:",
      "LED Headlights with LED Day Running Light",
      "Dark Chrome Front Grille with New RS Emblem",
      "LED Fog Lights",
      "One Push Ignition System",
      "Smart Entry System",
      "1 Row Adjustable Headrest",
      "Power Retractable Door Mirror with LED Turning Signal",
      "15\" Dark Chrome Alloy Wheels",
      "Smoked Rear Combi Lamp",
      "Black Color Interior with Orange Stitch",
      "Tailgate Spoiler with LED High Mount Stop Lamp",
      "Rear Bumper with Diffuser",
      "Sporty Dashboard Panel Pattern with Red & Gray Lining",
      "Sporty Meter Cluster with Multi Information LCD Display",
      "7\" Advanced Capacitive Touchscreen Display Audio with USB Port, AM/FM Radio, Bluetooth & HFT, Screen Mirroring, and Smartphone Connection",
      "Tweeter Speakers",
      "*Tambahan harga Rp 2,500,000 untuk two tone color",
    ],
    image: "/honda brio/Spesifikasi Honda Brio RS M-T.webp",
  },
  {
    name: "Honda Brio RS CVT",
    price: "Rp258.200.000",
    specs: [
      "Memiliki semua fitur di tipe E, ditambah:",
      "LED Headlights with LED Day Running Light",
      "Dark Chrome Front Grille with New RS Emblem",
      "LED Fog Lights",
      "One Push Ignition System",
      "Smart Entry System",
      "1 Row Adjustable Headrest",
      "Power Retractable Door Mirror with LED Turning Signal",
      "15\" Dark Chrome Alloy Wheels",
      "Smoked Rear Combi Lamp",
      "Black Color Interior with Orange Stitch",
      "Tailgate Spoiler with LED High Mount Stop Lamp",
      "Rear Bumper with Diffuser",
      "Sporty Dashboard Panel Pattern with Red & Gray Lining",
      "Sporty Meter Cluster with Multi Information LCD Display",
      "7\" Advanced Capacitive Touchscreen Display Audio with USB Port, AM/FM Radio, Bluetooth & HFT, Screen Mirroring, and Smartphone Connection",
      "Tweeter Speakers",
      "*Tambahan harga Rp 2,500,000 untuk two tone color",
    ],
    image: "/honda brio/Spesifikasi - Honda Brio RS CVT.webp",
  },
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [api, setApi] = useState<CarouselApi>()
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0)

  const totalSteps = 4

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))
  const handleNextStep = () => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrentVariantIndex(api.selectedScrollSnap())
    })
  }, [api])

  const currentVariant = brioVariants[currentVariantIndex]
  const currentColors = brioColorsByVariant[currentVariant?.name as keyof typeof brioColorsByVariant] || []
  const [selectedColor, setSelectedColor] = useState(currentColors[0])

  // Update selected color when variant changes
  useEffect(() => {
    if (currentColors.length > 0) {
      setSelectedColor(currentColors[0])
    }
  }, [currentVariantIndex, currentColors])

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-full overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {brioVariants.map((variant, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2">
                  <div className="p-1">
                    <div className="max-w-lg mx-auto text-center">
                      <div className="min-h-[450px] flex flex-col justify-start items-center">
                        <h2 className="text-xl font-bold text-honda-gray-dark text-center mb-6">{variant.name}</h2>
                        <div className="relative mb-6 w-full">
                          <Image
                            src={variant.image || "/placeholder.svg"}
                            alt={`${variant.name} Specifications`}
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
            **Harga dapat berubah sewaktu-waktu. Harga yang tertera adalah harga OTR Jakarta.
          </p>
        </div>

        {/* Color Selection Modal - Full Screen */}
        <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
          <DialogContent className="w-screen h-screen max-w-full max-h-full bg-white p-0 m-0 flex flex-col">
            <DialogHeader className="flex-shrink-0 p-4 border-b border-honda-gray-light relative">
              <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">
                {currentVariant?.name || "Pilih Varian"}
              </DialogTitle>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-y-auto">
              {/* Car Image */}
              <div className="relative w-full max-w-xl aspect-[3/2] mb-8">
                <Image
                  src={selectedColor?.image || "/placeholder.svg"}
                  alt={`${currentVariant?.name || "Honda Brio"} - ${selectedColor?.name || "Default Color"}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Stepper - Visual only, no click functionality */}
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

              {/* Color Swatches */}
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

              {/* Navigation Buttons */}
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

              {/* Detail Section */}
              <div className="w-full max-w-md border-t border-honda-gray-light pt-6">
                <h3 className="text-xl font-bold text-honda-red-primary mb-4">DETAIL</h3>
                <div className="grid grid-cols-2 gap-y-2 text-honda-gray-dark">
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