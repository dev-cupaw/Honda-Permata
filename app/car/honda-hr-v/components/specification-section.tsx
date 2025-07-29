"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel" // Import Carousel components

const hrvVariants = [
  {
    name: "New Honda HR-V E CVT",
    price: "Rp399.900.000",
    specs: [
      "1.5L DOHC i-VTEC Engine (Power 121 PS, Torque 145Nm)",
      "17” Alloy Wheels",
      "Full LED Headlights with LED Sequential Turning Signal",
      "LED Fog Light",
      "Full-Width Rear Lights with 3D Effect",
      "Remote Engine Start",
      "Honda SENSING",
      "Honda CONNECT",
      "4.2 Inch TFT Meter Cluster",
      "7” Capacitive Touchscreen Display Audio, Wired Smartphone Connection, Bluetooth, Hands-Free Telephone, USB Player, AM/FM Radio, Voice Command Switch",
      "4 Speakers + 2 Tweeters",
      "4 Airbags (Front & Side)",
      "Hill Start Assist (HSA)",
      "Hill Decent Control (HDC)",
      "Vehicle Stability Assist (VSA)",
      "Walk-Away Auto Lock",
      "Rear Seat Reminder",
    ],
    image: "/honda-hr-v/Spesifikasi - New Honda HR-V E CVT.png",
  },
  {
    name: "New Honda HR-V E+ CVT",
    price: "Rp422.000.000",
    specs: [
      "Memiliki fitur dari Honda HR-V tipe E, ditambah:",
      '18" Alloy Sports Wheels',
      "Piano Black Power Window Panel",
      '8" Capacitive Touchscreen Display Audio, Wireless Smartphone Connection, Bluetooth (Hands-Free Telephone & Music), USB (Photo, Music, Video), AM/FM Radio, Wired WebLink, Bluetooth Remote Control App (Auto Remote Control), Integrated with Honda LaneWatch™ (with Sleek Frame Design)',
      "Honda LaneWatch™",
      "Hands-Free Access Power Tailgate with Walk-Away Close",
      "Wireless Charging Console",
      "4 Speakers + 4 Tweeters",
    ],
    image: "/honda-hr-v/spesifikasi - New Honda HR-V E+ CVT.png",
  },
  {
    name: "New Honda HR-V e:HEV",
    price: "Rp449.000.000",
    specs: [
      "Memiliki fitur dari New Honda HR-V tipe E+, ditambah:",
      "Atkinson 1.5L DOHC i-VTEC Engine (Power: 131 PS (Motor) / 106 PS (Engine), Torque: 253 Nm (Motor) / 127 Nm (Engine)",
      "Reverse Auto-Tilt Side Door Mirror",
      "Full-Width Rear Lights Strip (Full LED)",
      "7 Inch TFT Meter Cluster",
      "All Auto Power Window",
      "Auto High-Beam with Adaptive Driving Beam",
      "Deceleration Paddle Selectors",
      "Untuk 1.5L e:HEV Modulo dilengkapi dengan:",
      "Front Under Spoiler Garnish",
      "Side Lower Garnish",
      "Rear Under Spoiler Garnish",
      "Door Visor",
      "Exhaust Pipe Finisher",
    ],
    image: "/honda-hr-v/spesifikasi - New Honda HR-V e-HEV.png",
  },
  {
    name: "New Honda HR-V RS e:HEV",
    price: "Rp488.000.000",
    specs: [
      "Memiliki fitur dari New Honda HR-V tipe e:HEV, ditambah:",
      "Stylish RS Aero Kit",
      "3-Mode Drive System (Sport, Normal, ECON)",
      "Panoramic Glass Roof",
      "Electrostatic Touch LED Map Light",
      "Stylish Black Interior with Red Lining",
      "Leather-Trimmed Seat with Red Stitches and RS Emboss",
      "Auto-Dimming Rear View Mirror",
      "8-Way Driver Power Seat",
      "6 Airbags (Front, Side & Side Curtains)",
      "Auto Wiper",
    ],
    image: "/honda-hr-v/Spesifikasi - New Honda HR-V RS e-HEV.png",
  },
]

const hrvColors = [
  {
    name: "Sand Khaki Pearl Two Tone",
    code: "rgb(137, 127, 106)",
    image: "/honda-hr-v/New Honda HR-V E CVT - Sand Khaki Pearl Two Tone.png",
  },
  {
    name: "Platinum White Pearl",
    code: "rgb(234, 234, 233)",
    image: "/honda-hr-v/New Honda HR-V E CVT - Platinum White Pearl.png",
  },
  {
    name: "Meteoroid Gray Metallic",
    code: "rgb(130, 131, 133)",
    image: "/honda-hr-v/New Honda HR-V E CVT - Meteoroid Gray Metallic.png",
  },
  {
    name: "Crystal Black Pearl",
    code: "rgb(0, 0, 0)",
    image: "/honda-hr-v/New Honda HR-V E CVT - Crystal Black Pearl.png",
  },
  {
    name: "Sand Khaki Pearl",
    code: "rgb(137, 127, 106)",
    image: "/honda-hr-v/New Honda HR-V E CVT - Sand Khaki Pearl.png",
  },
  {
    name: "Ignite Red Metallic (Type RS)",
    code: "rgb(204, 51, 51)",
    image: "/honda-hr-v/New Honda HR-V RS e-HEV - Ignite Red Metallic (Type RS).png",
  },
  {
    name: "Ignite Red Metallic Two Tone (Type RS)",
    code: "rgb(204, 51, 51)",
    image: "/honda-hr-v/New Honda HR-V RS e-HEV - Ignite Red Metallic Two Tone (Type RS).png",
  },
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(hrvColors[0])
  const [currentStep, setCurrentStep] = useState(1) // For the 1,2,3,4 stepper in the modal

  const totalSteps = 4 // Total steps for the modal stepper

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))
  const handleNextStep = () => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-full overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: false, // Set to false for sequential viewing of specs
            }}
            className="w-full"
          >
            <CarouselContent>
              {hrvVariants.map((variant, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2">
                  {" "}
                  {/* 1 item on mobile, 2 on desktop */}
                  <div className="p-1">
                    {" "}
                    {/* Added padding for spacing within carousel item */}
                    <div className="max-w-lg mx-auto text-center">
                      {/* Fixed height container for consistent alignment */}
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
            <CarouselPrevious className="-left-4 hidden sm:flex" /> {/* Adjust positioning if needed */}
            <CarouselNext className="-right-4 hidden sm:flex" /> {/* Adjust positioning if needed */}
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
                {/* The modal should show the currently visible variant's name.
                    Since Carousel doesn't expose current index directly, we'll default to the first variant
                    or you might need to add state management for the active carousel index if this is critical.
                    For now, using the first variant as a placeholder. */}
                {hrvVariants[0]?.name || "Pilih Varian"}{" "}
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
                  alt={`${hrvVariants[0]?.name || "Honda HR-V"} - ${selectedColor.name}`}
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
                {hrvColors.map((color) => (
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
                  <span>{hrvVariants[0]?.name || "N/A"}</span> {/* Placeholder */}
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
