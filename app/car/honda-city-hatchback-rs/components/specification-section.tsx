"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"


const cityHatchbackColors = [
  {
    name: "Electric Lime Metallic",
    code: "#32CD32",
    image: "/honda-city-hatchback-rs/Electric Lime Metallic.webp",
  },
  {
    name: "Phoenix Orange Pearl",
    code: "#FF4500",
    image: "/honda-city-hatchback-rs/Phoenix Orange Pearl.webp",
  },
  {
    name: "Crystal Black Pearl",
    code: "#000000",
    image: "/honda-city-hatchback-rs/Crystal Black Pearl.webp",
  },
  {
    name: "Meteoroid Gray Metallic",
    code: "#708090",
    image: "/honda-city-hatchback-rs/Meteoroid Gray Metallic.webp",
  },
  {
    name: "Platinum White Pearl",
    code: "#F8F8FF",
    image: "/honda-city-hatchback-rs/Platinum White Pearl.webp",
  },
  {
    name: "Rallye Red",
    code: "#DC143C",
    image: "/honda-city-hatchback-rs/Rallye Red.webp",
  },
]

const cityHatchbackVariants = [
  {
    name: "New Honda City RS Hatchback CVT",
    price: "Rp 384.500.000",
    image: "/honda-city-hatchback-rs/spesifikasi.webp",
    specs: [
      "1.5L DOHC i-VTEC Engine (121 PS)",
      "CVT with Earth Dreams Technology",
      "Full LED Headlights with LED DRL",
      "LED Fog Light",
      "Black Door Mirror with LED Turning Signal",
      "New 16\" Sporty Alloy Wheels Design",
      "One Push Ignition System",
      "Auto A/C with Red Illumination",
      "Suede-Fabric Leather Combi Trimmed Seats",
      "8\" Capacitive Touchscreen Display Audio",
      "8 Speakers",
      "2nd Row Power Outlet",
      "Multi-Angle Rear View Camera",
      "Remote Engine Start",
      "ABS + EBD + BA",
      "Brake Override System",
      "Honda SENSING",
      "Honda CONNECT",
      "7\" Interactive TFT Meter Cluster",
      "Honda LaneWatch",
      "Auto Headlight",
      "Walk-Away Auto Lock",
    ]
  }
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(cityHatchbackColors[0])
  const [currentStep] = useState(1)

  const totalSteps = 4

  // Color navigation functions
  const currentColorIndex = cityHatchbackColors.findIndex((color) => color.name === selectedColor.name)
  const canGoPrev = currentColorIndex > 0
  const canGoNext = currentColorIndex < cityHatchbackColors.length - 1
  
  const handlePrevColor = () => {
    if (canGoPrev) {
      setSelectedColor(cityHatchbackColors[currentColorIndex - 1])
    }
  }
  
  const handleNextColor = () => {
    if (canGoNext) {
      setSelectedColor(cityHatchbackColors[currentColorIndex + 1])
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
            className="w-full"
          >
            <CarouselContent>
              {cityHatchbackVariants.map((variant, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="p-1">
                    <div className="max-w-2xl mx-auto text-center">
                      <div className="min-h-[450px] flex flex-col justify-start items-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">{variant.name}</h2>
                        <div className="relative mb-8 w-full">
                          <Image
                            src={variant.image}
                            alt={`${variant.name} Specifications - 1.5L i-VTEC Engine 121 PS`}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg shadow-lg mx-auto"
                          />
                        </div>
                        <Button
                          onClick={() => setIsColorModalOpen(true)}
                          size="lg"
                          className="w-full max-w-sm mx-auto bg-honda-red-primary hover:bg-honda-red-dark text-white font-bold py-6 text-xl flex items-center justify-center gap-2"
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
              <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">
                New Honda City RS Hatchback CVT
              </DialogTitle>
              <DialogDescription className="sr-only">
                Color selection modal for Honda City Hatchback RS
              </DialogDescription>
</DialogHeader>

            <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-y-auto">
              <div className="relative w-full max-w-md aspect-[16/10] mb-8">
                <Image
                  src={selectedColor.image || "/placeholder.svg"}
                  alt={`Honda City Hatchback RS - ${selectedColor.name}`}
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
                {cityHatchbackColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border transition-all duration-200 ${
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
                  <span>New Honda City RS Hatchback CVT</span>
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
