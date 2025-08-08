"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"


const colors = [
  {
    name: "Obsidian Blue",
    code: "#1E3A8A",
    image: "/honda-e-n1/Obsidian Blue.webp",
  },
  {
    name: "Platinum White Pearl",
    code: "#F8F8FF",
    image: "/honda-e-n1/Platinum White Pearl.webp",
  },
]

const eN1Variants = [
  {
    name: "Honda e:N1",
    price: "TANYA HARGA",
    image: "/honda-e-n1/spesifikasi - honda-e-n1.webp",
    specs: [
      "AC Synchronous Motor (204 PS)",
      "68.8 kWh Lithium-ion Battery with Range (NEDC) 500km*",
      "3-Drive Mode System: ECON, NORMAL, SPORT",
      "Deceleration Paddle Selectors",
      "Push Button Shifter w/ Electric Parking Brake + Auto Brake Hold",
      "18\" Two-tone Alloy Wheels",
      "Charging Port with LED Indicator (Support DC Fast Charging)",
      "15.1\" Display Audio with Smartphone Connection",
      "10.25\" Interactive TFT Meter Cluster",
      "6-Speaker Audio System",
      "Dual Zone Auto A/C",
      "8-Way Driver Power Seat Adjustment",
      "Blue Interior Ambient Light",
      "Wireless Charger",
      "Multi-angle Rear View Camera",
      "8-Position Parking Sensors",
      "Blind Sport Information and Cross Traffic Monitor (CTM)",
      "Honda SENSING™",
    ]
  }
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [currentStep] = useState(1)


  const totalSteps = 4

  // Color navigation functions
  const currentColorIndex = colors.findIndex(color => color.name === selectedColor.name)
  const canGoPrev = currentColorIndex > 0
  const canGoNext = currentColorIndex < colors.length - 1
  
  const handlePrevColor = () => {
    if (canGoPrev) {
      setSelectedColor(colors[currentColorIndex - 1])
    }
  }
  
  const handleNextColor = () => {
    if (canGoNext) {
      setSelectedColor(colors[currentColorIndex + 1])
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
              {eN1Variants.map((variant, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="p-1">
                    <div className="max-w-2xl mx-auto text-center">
                      <div className="min-h-[450px] flex flex-col justify-start items-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">{variant.name}</h2>
                        <div className="relative mb-8 w-full">
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
            *Jarak tempuh dapat bervariasi tergantung kondisi berkendara dan penggunaan. **Spesifikasi dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.
          </p>
        </div>

        {/* Color Selection Modal - Full Screen */}
        <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
          <DialogContent className="w-screen h-screen max-w-full max-h-full bg-white p-0 m-0 flex flex-col">
            <DialogHeader className="flex-shrink-0 p-4 border-b border-honda-gray-light relative">
              <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">
                Honda e:N1
              </DialogTitle>
              <DialogDescription className="sr-only">
                Color selection modal for Honda e:N1
              </DialogDescription>
</DialogHeader>

            <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-y-auto">
              <div className="relative w-full max-w-sm aspect-[16/10] mb-8">
                <Image
                  src={selectedColor.image || "/placeholder.svg"}
                  alt={`Honda e:N1 - ${selectedColor.name}`}
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
                {colors.map((color) => (
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
                  <span>Honda e:N1</span>
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
