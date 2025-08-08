"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { getWhatsAppNumber } from "@/lib/contact-config"

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
  const whatsappNumber = getWhatsAppNumber()
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed left-0 top-24 w-full bg-white shadow-xl z-40 overflow-y-auto"
          style={{ height: 'calc(100vh - 6rem)' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="container mx-auto px-2 md:px-4 h-full flex flex-col">
            <div className="absolute -top-px left-0 h-px w-full bg-honda-gray-light" />

            {/* Grid 4x3 terpusat dalam kotak yang lebih compact */}
            <div className="flex-1 flex items-start justify-center pt-2 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-6 max-w-5xl mx-auto">
                {cars.map((car) => (
                  <Link
                    href={car.link}
                    key={car.name}
                    className="group block relative"
                    onClick={onClose}>
                    {car.isNew && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        NEW
                      </div>
                    )}
                    {/* Container gambar mobil dengan ukuran yang lebih proporsional */}
                    <div className="relative h-[120px] w-[180px] md:h-[140px] md:w-[200px] lg:h-[140px] lg:w-[220px] mx-auto overflow-hidden">
                      <Image
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        fill
                        sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"
                        className="object-contain"
                      />
                    </div>

                    {/* Nama mobil */}
                    <h4 className="mt-1.5 md:mt-2 text-[10px] md:text-xs font-semibold text-honda-gray-dark text-center">{car.name}</h4>

                    {/* Container harga dengan CTA yang lebih compact */}
                    <div className="mt-2 mx-auto w-full max-w-[160px] md:max-w-[180px] lg:max-w-[200px] border border-honda-gray-light rounded-full px-2 py-1 md:px-3 md:py-1.5 text-center transition-all duration-300 hover:bg-red-600 hover:border-red-600 group/price cursor-pointer">
                      <div className="text-[8px] md:text-[9px] uppercase text-honda-gray group-hover/price:text-white transition-colors duration-300">HARGA MULAI DARI</div>
                      <div className="text-[10px] md:text-xs font-bold text-honda-red-primary group-hover/price:text-white transition-colors duration-300">
                        {car.price.startsWith("HUBUNGI") ? car.price : `Rp ${car.price}`}*
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer section */}
            <div className="mt-4 border-t border-honda-gray-light pt-4 pb-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-w-5xl mx-auto">
                <p className="text-[9px] md:text-[10px] text-honda-gray text-center md:text-left">
                  *Keterangan Harga pertama adalah harga dengan tipe terendah. Harga tertera adalah harga OTR Jakarta
                  dan kepemilikan mobil pertama. Harga yang tertera adalah harga OTR untuk nomor rangka tahun 2024 -
                  2025.
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="text-xs px-4 py-2 flex-shrink-0 transition-all duration-300"
                  style={{
                    color: 'rgb(0, 111, 188)',
                    backgroundColor: 'transparent',
                    border: '1px solid rgb(0, 111, 188)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(0, 111, 188)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'rgb(0, 111, 188)'
                  }}
                >
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    Chat via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
