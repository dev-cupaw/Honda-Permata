"use client"
import React, { useState } from "react"
import { OptimizedImage, RESPONSIVE_SIZES } from "@/components/ui/optimized-image"
import Link from "next/link"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"
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

// Product Card Component - Reusable for both mobile and desktop
function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[5/3] overflow-hidden">
        <OptimizedImage
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes={RESPONSIVE_SIZES.card}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          fallbackSrc="/placeholder.svg"
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
  )
}

export function ProductGridSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateScrollState()
    api.on("select", updateScrollState)
    api.on("reInit", updateScrollState)

    return () => {
      api.off("select", updateScrollState)
      api.off("reInit", updateScrollState)
    }
  }, [api])

  return (
    <section className="w-full bg-white py-3 md:py-4 lg:py-6">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tighter text-honda-gray-dark sm:text-5xl">
          Model Unggulan Kami
        </h2>
        
        {/* Mobile Version - Vertical Grid (No Carousel) */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {products.map((product, index) => (
              <div key={index} className="w-full max-w-sm mx-auto">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Version - Carousel with Navigation */}
        <div className="hidden md:block">
          <div className="relative px-16 md:px-20">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {products.map((product, index) => (
                  <CarouselItem key={index} className="pl-4 mb-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation buttons positioned completely outside carousel area */}
            <button
              onClick={() => api?.scrollPrev()}
              className={`absolute -left-2 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 rounded-full border border-honda-red-primary bg-white hover:bg-honda-red-primary hover:text-white text-honda-red-primary items-center justify-center transition-all duration-200 shadow-lg ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canScrollPrev}
            >
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className={`absolute -right-2 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 rounded-full border border-honda-red-primary bg-white hover:bg-honda-red-primary hover:text-white text-honda-red-primary items-center justify-center transition-all duration-200 shadow-lg ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canScrollNext}
            >
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
