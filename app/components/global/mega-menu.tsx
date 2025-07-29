"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const cars = [
  {
    name: "Honda STEP WGN",
    price: "629.000.000",
    image: "/mobil-megamenu/Honda-STEP-WGN.webp",
    link: "/car/honda-step-wgn",
    isNew: true,
  },
  {
    name: "Honda HR-V",
    price: "399.900.000",
    image: "/mobil-megamenu/Honda-HR-V.webp",
    link: "/car/honda-hr-v",
    isNew: true,
  },
  {
    name: "Honda Civic RS",
    price: "699.000.000",
    image: "/mobil-megamenu/Honda-Civic-RS.webp",
    link: "/car/honda-civic-rs",
    isNew: true,
  },
  {
    name: "Honda City Hatchback RS",
    price: "384.500.000",
    image: "/mobil-megamenu/Honda-City-Hatchback-RS.webp",
    link: "/car/honda-city-hatchback-rs",
    isNew: false,
  },
  {
    name: "New Honda Brio",
    price: "170.400.000",
    image: "/mobil-megamenu/New-Honda-Brio.webp",
    link: "/car/new-honda-brio",
    isNew: false,
  },
  {
    name: "Honda WR-V",
    price: "280.700.000",
    image: "/mobil-megamenu/Honda-WR-V.webp",
    link: "/car/honda-wr-v",
    isNew: false,
  },
  {
    name: "Honda Civic Type R",
    price: "1.445.500.000",
    image: "/mobil-megamenu/Honda-Civic-Type-R.webp",
    link: "/car/honda-civic-type-r",
    isNew: false,
  },
  {
    name: "All New Honda CR-V",
    price: "759.000.000",
    image: "/mobil-megamenu/All-New-Honda-CR-V.webp",
    link: "/car/all-new-honda-cr-v",
    isNew: false,
  },
  {
    name: "New Honda City",
    price: "402.000.000",
    image: "/mobil-megamenu/New-Honda-City.webp",
    link: "/car/new-honda-city",
    isNew: false,
  },
  {
    name: "Honda BR-V N7X",
    price: "297.300.000",
    image: "/mobil-megamenu/Honda-BR-V-N7X.webp",
    link: "/car/honda-br-v-n7x",
    isNew: false,
  },
  {
    name: "All New Honda Accord",
    price: "970.900.000",
    image: "/mobil-megamenu/All-New-Honda-Accord.webp",
    link: "/car/all-new-honda-accord",
    isNew: false,
  },
  {
    name: "Honda e:N1",
    price: "HUBUNGI DEALER",
    image: "/mobil-megamenu/Honda-e-N1.webp",
    link: "/car/honda-e-n1",
    isNew: false,
  },
]

export function MegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 w-full bg-white shadow-xl"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="container mx-auto px-4 py-5 md:px-6">
            <div className="absolute -top-px left-0 h-px w-full bg-honda-gray-light" />
            <div className="mb-4 flex items-center gap-2 text-honda-gray-dark">
              <h3 className="text-lg font-semibold">Model Mobil</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
              {cars.map((car) => (
                <Link href={car.link} key={car.name} className="group block relative" onClick={onClose}>
                  {car.isNew && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      NEW
                    </div>
                  )}
                  <div className="relative h-[150px] w-[150px] mx-auto overflow-hidden rounded-lg">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-honda-gray-dark text-center">{car.name}</h4>
                  <div className="mt-2 mx-auto w-fit border border-honda-gray-light rounded-full px-4 py-2 text-center">
                    <div className="text-xs uppercase text-honda-gray">HARGA MULAI DARI</div>
                    <div className="text-base font-bold text-honda-red-primary">
                      {car.price.startsWith("HUBUNGI") ? car.price : `Rp ${car.price}`}*
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 border-t border-honda-gray-light pt-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="text-xs text-honda-gray text-center md:text-left">
                  *Keterangan Harga pertama adalah harga dengan tipe terendah. Harga tertera adalah harga OTR Jakarta
                  dan kepemilikan mobil pertama. Harga yang tertera adalah harga OTR untuk nomor rangka tahun 2024 -
                  2025.
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="text-honda-red-primary hover:bg-honda-red-light hover:text-honda-red-dark"
                >
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    Chat via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
