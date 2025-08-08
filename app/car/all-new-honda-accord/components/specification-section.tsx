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
    name: "Ignite Red Metallic",
    code: "#DC143C",
    image: "/all-new-honda-accord/Ignite Red Metallic.webp",
  },
  {
    name: "Crystal Black Pearl",
    code: "#000000",
    image: "/all-new-honda-accord/Crystal Black Pearl.webp",
  },
  {
    name: "Platinum White Pearl",
    code: "#F8F8FF",
    image: "/all-new-honda-accord/Platinum White Pearl.webp",
  },
]

const accordVariants = [
  {
    name: "All New Honda Accord 2.0L RS e:HEV",
    price: "Rp 970.900.000",
    image: "/all-new-honda-accord/spesifikasi - All New Honda Accord 2.0L RS e-HEV.webp",
    specs: [
      "2.0L DOHC i-VTEC Engine + Electric Motor (207 PS)",
      "Stylish RS Aero Kit",
      "Power Panoramic Sunroof",
      "Full LED Headlights with LED Daytime Running Light",
      "Full LED Taillights",
      "Front and Rear LED Sequential Turning Signal",
      "Multi-View Camera Assist",
      "Experience Selection Dial",
      "Multicolor Interior Ambient Light",
      "EV Switch",
      "4-Drive Mode System",
      "12.3\" Advanced Capacitive Touchscreen Display Audio with Google built-in",
      "11.5\" Interactive Head-Up Display",
      "10.2\" TFT Display",
      "BOSE 12 Speakers Audio System",
      "Honda SENSING™",
      "Honda CONNECT with Digital Key",
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
              {accordVariants.map((variant, index) => (
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
            **Harga dapat berubah sewaktu-waktu. Harga yang tertera adalah harga OTR Jakarta.
          </p>
        </div>

        {/* Color Selection Modal - Full Screen */}
        <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
          <DialogContent className="w-screen h-screen max-w-full max-h-full bg-white p-0 m-0 flex flex-col">
            <DialogHeader className="flex-shrink-0 p-4 border-b border-honda-gray-light relative">
              <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">
                All New Honda Accord 2.0L RS e:HEV
              </DialogTitle>
              <DialogDescription className="sr-only">
                Color selection modal for All New Honda Accord
              </DialogDescription>
</DialogHeader>

            <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-y-auto">
              <div className="relative w-full max-w-sm aspect-[16/10] mb-8">
                <Image
                  src={selectedColor.image || "/placeholder.svg"}
                  alt={`All New Honda Accord 2.0L RS e:HEV - ${selectedColor.name}`}
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
                  <span>All New Honda Accord 2.0L RS e:HEV</span>
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