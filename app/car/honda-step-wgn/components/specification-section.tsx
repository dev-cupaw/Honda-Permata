"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const colors = [
  {
    name: "Premium Crystal Garnet Metallic",
    code: "#8B0000",
    image: "/placeholder.svg?height=400&width=600&text=Premium+Crystal+Garnet+Metallic+Honda+STEP+WGN",
  },
  {
    name: "Twilight Mist Black Pearl",
    code: "#2C3E50", // A dark, slightly bluish-black
    image: "/placeholder.svg?height=400&width=600&text=Twilight+Mist+Black+Pearl+Honda+STEP+WGN",
  },
  {
    name: "Platinum White Pearl",
    code: "#F8F8FF",
    image: "/placeholder.svg?height=400&width=600&text=Platinum+White+Pearl+Honda+STEP+WGN",
  },
  {
    name: "Meteroid Grey Metallic",
    code: "#708090",
    image: "/placeholder.svg?height=400&width=600&text=Meteroid+Grey+Metallic+Honda+STEP+WGN",
  },
  {
    name: "Crystal Black Pearl",
    code: "#000000",
    image: "/placeholder.svg?height=400&width=600&text=Crystal+Black+Pearl+Honda+STEP+WGN",
  },
]

const specifications = [
  {
    label: "Mesin",
    value:
      "2.0L DOHC i-VTEC Atkinson Cycle (Power: 184 PS(Motor) /145 PS (Engine), Torque: 315 Nm (Motor) / 175 Nm (Engine)",
  },
  { label: "Lampu Depan", value: "Full LED Headlights with Sequential Turning Signal" },
  { label: "Velg", value: "Elegant 16” Alloy Wheels" },
  { label: "Paddle Selector", value: "Deceleration Paddle Selector" },
  { label: "Setir", value: "Tilt & Telescopic Steering Wheel" },
  { label: "Audio Display", value: "8” Advanced Capacitive Touchscreen Display Audio" },
  { label: "Meter Cluster", value: "10.2” TFT Cluster Meter Display" },
  { label: "Kursi Baris Kedua", value: "2nd Row Captain Seats with Ottoman" },
  { label: "Kursi Baris Ketiga", value: "3rd Row Magic Seat with Floor Mat" },
  { label: "Sensor Parkir", value: "8-Points Parking Sensors" },
  { label: "AC", value: "Tri-Zone Automatic Air Conditioner with Plasmacluster Technology" },
  { label: "Charger Depan", value: "Front USB-C & USB-A Charger" },
  { label: "Charger Baris Kedua & Ketiga", value: "2nd & 3rd USB-C Charger" },
  { label: "Power Tailgate", value: "Power Tailgate with Memory Multi-angle Adjustment" },
  { label: "Pengaturan Kunci", value: "Lock Presetting" },
  { label: "Pintu Geser", value: "Electrostatic Touch Sliding Door" },
  { label: "Keselamatan", value: "Honda SENSING" },
  { label: "Airbag", value: "6 Airbags" },
  { label: "Stabilitas Kendaraan", value: "Vehicle Stability Assist (VSA)" },
  { label: "Bantuan Tanjakan", value: "Hill Start Assist (HSA)" },
  { label: "Kunci Otomatis", value: "Walk-Away Auto Lock" },
]

export function SpecificationSection() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [currentStep, setCurrentStep] = useState(1)

  const totalSteps = 4

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))
  const handleNextStep = () => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">
              Honda STEP WGN e:HEV
            </h2>

            <div className="relative mb-8">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Honda+STEP+WGN+Side+Profile"
                alt="Honda STEP WGN e:HEV"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mx-auto" // Added mx-auto for centering image
              />
            </div>

            <Button
              onClick={() => setIsColorModalOpen(true)}
              size="lg"
              className="w-full max-w-sm mx-auto bg-honda-red-primary hover:bg-honda-red-dark text-white font-bold py-6 text-xl flex items-center justify-center gap-2" // Added max-w-sm, mx-auto, flex, items-center, justify-center, gap-2
            >
              Rp 629.000.000 <ChevronRight className="h-5 w-5" /> {/* Added ChevronRight icon */}
            </Button>

            <div className="space-y-6 mt-12 text-left">
              <h3 className="text-xl font-bold text-honda-gray-dark text-center mb-4">Spesifikasi Utama</h3>
              <div className="space-y-2">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-honda-gray-light">
                    <span className="text-honda-gray font-medium">{spec.label}</span>
                    <span className="text-honda-gray-dark font-semibold leading-7 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-honda-light p-4 rounded-lg mt-8 text-left">
              <h4 className="font-semibold text-honda-gray-dark mb-2">Keterangan:</h4>
              <p className="text-sm text-honda-gray">
                *Harga dapat berubah sewaktu-waktu. Harga yang tertera adalah harga OTR Jakarta.
              </p>
            </div>
          </div>

          {/* Color Selection Modal - Full Screen */}
          <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
            <DialogContent className="w-screen h-screen max-w-full max-h-full bg-white p-0 m-0 flex flex-col">
              <DialogHeader className="flex-shrink-0 p-4 border-b border-honda-gray-light relative">
                <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">
                  Honda STEP WGN e:HEV
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
                    alt={`Honda STEP WGN - ${selectedColor.name}`}
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
                  {colors.map((color) => (
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
                    <span>Honda STEP WGN e:HEV</span>
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
      </div>
    </section>
  )
}
