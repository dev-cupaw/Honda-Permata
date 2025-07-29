"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel" // Import type for CarouselApi

const brioColors = [
  {
    name: "Taffeta White",
    code: "#F8F8FF",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "Crystal Black Pearl",
    code: "#000000",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "Modern Steel Metallic",
    code: "#708090",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "Carnival Yellow",
    code: "#FFD700",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "Phoenix Orange Pearl",
    code: "#FF4500",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const brioVariants = [
  {
    name: "New Honda Brio S M/T",
    price: "Rp167.900.000",
    specs: [
      "1.2L SOHC i-VTEC Engine",
      "5-Speed Manual Transmission",
      "14” Steel Wheels",
      "Halogen Headlights",
      "2DIN Audio System",
      "Dual Front SRS Airbags",
      "ABS + EBD",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "New Honda Brio E M/T",
    price: "Rp182.800.000",
    specs: [
      "Memiliki fitur dari Brio S M/T, ditambah:",
      "14” Alloy Wheels",
      "Power Retractable Door Mirror",
      "Rear Wiper",
      "Seatback Pocket",
      "Alarm System",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "New Honda Brio E CVT",
    price: "Rp198.300.000",
    specs: [
      "Memiliki fitur dari Brio E M/T, ditambah:",
      "CVT Transmission with Earth Dreams Technology",
      "Digital AC",
      "Auto Door Lock by Speed",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "New Honda Brio RS M/T",
    price: "Rp212.600.000",
    specs: [
      "Memiliki fitur dari Brio E CVT, ditambah:",
      "Stylish RS Aero Kit",
      "15” Sporty Alloy Wheels",
      "LED Headlights with LED Daytime Running Lights",
      "Black Front Grille",
      "Side Under Spoiler",
      "Rear Bumper with Diffuser",
      "RS Emblem",
      "6.2” Touchscreen Display Audio",
      "Tweeter Speakers",
      "Sporty Dashboard Design",
      "Orange Stitching on Seats",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    name: "New Honda Brio RS CVT",
    price: "Rp228.400.000",
    specs: [
      "Memiliki fitur dari Brio RS M/T, ditambah:",
      "CVT Transmission with Earth Dreams Technology",
      "Paddle Shift",
      "Cruise Control",
      "Smart Entry System",
      "Engine Start/Stop Button",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(brioColors[0])
  const [currentStep, setCurrentStep] = useState(1)
  const [api, setApi] = useState<CarouselApi>()
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0) // State to track current carousel item

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

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-full overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            setApi={setApi} // Set the API instance
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
                  src={selectedColor.image || "/placeholder.svg"}
                  alt={`${currentVariant?.name || "Honda Brio"} - ${selectedColor.name}`}
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
                {brioColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full transition-all duration-200 border ${
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
