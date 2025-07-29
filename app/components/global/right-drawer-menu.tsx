"use client"
import Link from "next/link"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const cars = [
  { name: "Honda STEP WGN", price: "599.000.000", image: "/mobil-megamenu/Honda-STEP-WGN.webp", href: "/car/honda-step-wgn" },
  { name: "Honda HR-V", price: "383.900.000", image: "/mobil-megamenu/Honda-HR-V.webp", href: "/car/honda-hr-v" },
  { name: "Honda Civic RS", price: "616.800.000", image: "/mobil-megamenu/Honda-Civic-RS.webp", href: "/car/honda-civic-rs" },
  { name: "Honda City Hatchback RS", price: "352.500.000", image: "/mobil-megamenu/Honda-City-Hatchback-RS.webp", href: "/car/honda-city-hatchback-rs" },
  { name: "New Honda Brio", price: "167.900.000", image: "/mobil-megamenu/New-Honda-Brio.webp", href: "/car/new-honda-brio" },
  { name: "Honda WR-V", price: "274.900.000", image: "/mobil-megamenu/Honda-WR-V.webp", href: "/car/honda-wr-v" },
  { name: "Honda Civic Type R", price: "1.429.500.000", image: "/mobil-megamenu/Honda-Civic-Type-R.webp", href: "/car/honda-civic-type-r" },
  { name: "All New Honda CR-V", price: "749.100.000", image: "/mobil-megamenu/All-New-Honda-CR-V.webp", href: "/car/all-new-honda-cr-v" },
  { name: "New Honda City", price: "402.000.000", image: "/mobil-megamenu/New-Honda-City.webp", href: "/car/new-honda-city" },
  { name: "Honda BR-V N7X", price: "363.400.000", image: "/mobil-megamenu/Honda-BR-V-N7X.webp", href: "/car/honda-br-v-n7x" },
  { name: "All New Honda Accord", price: "959.900.000", image: "/mobil-megamenu/All-New-Honda-Accord.webp", href: "/car/all-new-honda-accord" },
  { name: "Honda e:N1", price: "HUBUNGI DEALER", image: "/mobil-megamenu/Honda-e-N1.webp", href: "/car/honda-e-n1" },
]

export function RightDrawerMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[80vw] bg-white p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-center text-base font-semibold text-honda-gray-dark">Produk Honda</SheetTitle>
        </SheetHeader>
        <div className="h-full overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {cars.map((car) => (
              <Link href={car.href} key={car.name} className="group block text-center" onClick={() => setIsOpen(false)}>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    width={180}
                    height={120}
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="mt-2 text-sm font-semibold text-honda-gray-dark">{car.name}</h4>
                <div className="mt-1 text-[8px] text-honda-gray">HARGA MULAI DARI</div>
                <div className="mt-1 inline-block rounded border border-honda-red-primary bg-honda-red-primary px-2 py-1 text-xs font-bold text-white transition-colors hover:bg-honda-red-dark">
                  {car.price.startsWith("HUBUNGI") ? car.price : `Rp ${car.price}`}*
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center text-[10px] text-honda-gray">
            *Keterangan Harga pertama adalah harga OTR Jakarta dan dapat berubah sewaktu-waktu. Harga yang tertera
            adalah harga OTR untuk scaner sampai tahun 2024 - 2025.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
