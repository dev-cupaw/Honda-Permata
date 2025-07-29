"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const products = [
  { name: "Honda HR-V", price: "Mulai dari Rp 383 Juta", image: "/placeholder.svg?height=225&width=400" },
  { name: "New Honda Brio", price: "Mulai dari Rp 167 Juta", image: "/placeholder.svg?height=225&width=400" },
  { name: "Honda WR-V", price: "Mulai dari Rp 274 Juta", image: "/placeholder.svg?height=225&width=400" },
  { name: "All New Honda CR-V", price: "Mulai dari Rp 749 Juta", image: "/placeholder.svg?height=225&width=400" },
  { name: "Honda BR-V N7X", price: "Mulai dari Rp 363 Juta", image: "/placeholder.svg?height=225&width=400" },
  { name: "Honda Civic RS", price: "Mulai dari Rp 616 Juta", image: "/placeholder.svg?height=225&width=400" },
  { name: "Honda City Hatchback RS", price: "Mulai dari Rp 352 Juta", image: "/placeholder.svg?height=225&width=400" },
  { name: "All New Honda Accord", price: "Mulai dari Rp 959 Juta", image: "/placeholder.svg?height=225&width=400" },
]

export function ProductGridSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-honda-gray-dark sm:text-5xl">
          Model Unggulan Kami
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card className="group overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center p-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={225}
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="w-full p-4 text-center">
                        <h3 className="text-lg font-semibold text-honda-gray-dark">{product.name}</h3>
                        <p className="mt-1 text-sm text-honda-gray">{product.price}</p>
                        <Button
                          asChild
                          variant="destructive"
                          className="mt-4 bg-honda-red-primary hover:bg-honda-red-dark"
                        >
                          <Link href="#">Lihat Detail</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden sm:flex" />
          <CarouselNext className="-right-4 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  )
}
