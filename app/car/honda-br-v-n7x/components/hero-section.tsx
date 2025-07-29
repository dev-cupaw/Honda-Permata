"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[60vh] lg:h-screen w-full overflow-hidden">
      <Image
        src="/placeholder.svg?height=1080&width=1920&text=Honda+BR-V+N7X+Hero"
        alt="Honda BR-V N7X"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          size="lg"
          className="bg-honda-red-primary hover:bg-honda-red-dark text-white font-bold px-8 py-4 text-lg lg:text-xl"
        >
          BOOK NOW
        </Button>
      </div>
    </section>
  )
}
