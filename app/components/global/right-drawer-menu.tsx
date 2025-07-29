"use client"
import Link from "next/link"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const cars = [
  { name: "Honda STEP WGN", price: "599.000.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "Honda HR-V", price: "383.900.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "Honda Civic RS", price: "616.800.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "Honda City Hatchback RS", price: "352.500.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "New Honda Brio", price: "167.900.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "Honda WR-V", price: "274.900.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "Honda Civic Type R", price: "1.429.500.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "All New Honda CR-V", price: "749.100.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "New Honda City", price: "402.000.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "Honda BR-V N7X", price: "363.400.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "All New Honda Accord", price: "959.900.000", image: "/placeholder.svg?height=100&width=150" },
  { name: "Honda e:N1", price: "HUBUNGI DEALER", image: "/placeholder.svg?height=100&width=150" },
]

export function RightDrawerMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[80vw] bg-white p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-lg font-semibold text-honda-gray-dark">Produk Honda</SheetTitle>
        </SheetHeader>
        <div className="h-full overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {cars.map((car) => (
              <Link href="#" key={car.name} className="group block" onClick={() => setIsOpen(false)}>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    width={150}
                    height={100}
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="mt-2 text-sm font-semibold text-honda-gray-dark">{car.name}</h4>
                <div className="mt-1 text-xs text-honda-gray">HARGA MULAI DARI</div>
                <div className="text-sm font-bold text-honda-red-primary">
                  {car.price.startsWith("HUBUNGI") ? car.price : `Rp ${car.price}`}*
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-honda-gray">
            *Keterangan Harga pertama adalah harga OTR Jakarta dan dapat berubah sewaktu-waktu. Harga yang tertera
            adalah harga OTR untuk scaner sampai tahun 2024 - 2025.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
