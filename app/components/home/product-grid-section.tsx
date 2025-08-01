"use client"
import Image from "next/image"
import Link from "next/link"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const products = [
  { name: "Honda STEP WGN", price: "Rp629.000.000", image: "/mobil-megamenu/Honda-STEP-WGN.webp" },
  { name: "Honda HR-V", price: "Rp399.900.000", image: "/mobil-megamenu/Honda-HR-V.webp" },
  { name: "Honda Civic RS", price: "Rp699.000.000", image: "/mobil-megamenu/Honda-Civic-RS.webp" },
  { name: "Honda City Hatchback RS", price: "Rp384.500.000", image: "/mobil-megamenu/Honda-City-Hatchback-RS.webp" },
  { name: "New Honda Brio", price: "Rp170.400.000", image: "/mobil-megamenu/New-Honda-Brio.webp" },
  { name: "Honda WR-V", price: "Rp280.700.000", image: "/mobil-megamenu/Honda-WR-V.webp" },
  { name: "Honda Civic Type R", price: "Rp1.445.500.000", image: "/mobil-megamenu/Honda-Civic-Type-R.webp" },
  { name: "All New Honda CR-V", price: "Rp759.000.000", image: "/mobil-megamenu/All-New-Honda-CR-V.webp" },
  { name: "New Honda City", price: "Rp402.000.000", image: "/mobil-megamenu/New-Honda-City.webp" },
  { name: "Honda BR-V N7X", price: "Rp297.300.000", image: "/mobil-megamenu/Honda-BR-V-N7X.webp" },
  { name: "All New Honda Accord", price: "Rp970.900.000", image: "/mobil-megamenu/All-New-Honda-Accord.webp" },
  { name: "Honda e:N1", price: "HUBUNGI DEALER", image: "/mobil-megamenu/Honda-e-N1.webp" },
]

export function ProductGridSection() {
  return (
    <section className="w-full bg-white py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tighter text-honda-gray-dark sm:text-5xl">
          Model Unggulan Kami
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={index} className="pl-4 mb-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="group transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="pt-2 text-center">
                    {/* Car Name - Bold Heading */}
                    <h3 className="text-base font-bold text-honda-gray-dark mb-1">
                      {product.name}
                    </h3>
                    
                    {/* Price Section */}
                    <div className="mb-3">
                      <p className="text-xs text-honda-gray mb-0.5">harga mulai</p>
                      <p className="text-lg font-bold text-honda-red-primary">
                        {product.price}
                      </p>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="destructive"
                        className="flex-1 bg-honda-red-primary hover:bg-honda-red-dark text-white font-medium"
                      >
                        <Link href={`/car/${product.name.toLowerCase().replace(/\s+/g, '-').replace('all-new-', 'all-new-').replace('new-', 'new-')}`}>
                          Detail
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 border-honda-red-primary text-honda-red-primary hover:bg-honda-red-primary hover:text-white font-medium"
                      >
                        <Link href="/kontak">
                          Minta Penawaran
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 flex bg-honda-red-primary hover:bg-honda-red-dark text-white border-honda-red-primary" />
          <CarouselNext className="-right-4 flex bg-honda-red-primary hover:bg-honda-red-dark text-white border-honda-red-primary" />
        </Carousel>
      </div>
    </section>
  )
}
