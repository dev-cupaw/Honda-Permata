"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CarColorModal } from "@/components/shared/car-color-modal"
import { ChevronRight } from "lucide-react"

const colors = [
  {
    name: "Premium Crystal Garnet Metallic",
    code: "#8B0000",
    image: "/Honda-STEP-WGN/Premium Crystal Garnet Metallic.webp",
  },
  {
    name: "Twilight Mist Black Pearl",
    code: "#2C3E50", // A dark, slightly bluish-black
    image: "/Honda-STEP-WGN/Twilight Mist Black Pearl.webp",
  },
  {
    name: "Platinum White Pearl",
    code: "#F8F8FF",
    image: "/Honda-STEP-WGN/Platinum White Pearl.webp",
  },
  {
    name: "Meteroid Grey Metallic",
    code: "#708090",
    image: "/Honda-STEP-WGN/Meteroid Grey Metallic.webp",
  },
  {
    name: "Crystal Black Pearl",
    code: "#000000",
    image: "/Honda-STEP-WGN/Crystal Black Pearl.webp",
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
  const [currentStep] = useState(1)

  const totalSteps = 4



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
                src="/Honda-STEP-WGN/stepwgn-spesifikasi.webp"
                alt="Honda STEP WGN e:HEV - Spesifikasi"
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
                  <div key={index} className="py-2 border-b border-honda-gray-light flex items-start">
                    <span className="text-honda-red-primary mr-2 mt-1">•</span>
                    <span className="text-honda-gray-dark text-sm font-semibold leading-6">{spec.value}</span>
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

          <CarColorModal
            isOpen={isColorModalOpen}
            onOpenChange={setIsColorModalOpen}
            carName="Honda STEP WGN e:HEV"
            selectedColor={selectedColor}
            colors={colors}
            onColorSelect={setSelectedColor}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
      </div>
    </section>
  )
}
