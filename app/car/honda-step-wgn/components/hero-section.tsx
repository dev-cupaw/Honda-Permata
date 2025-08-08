"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[48vh] lg:h-[80vh] w-full overflow-hidden pt-20 lg:pt-24">
      <Image
        src="/Honda-STEP-WGN/Banner-Product-Desktop.webp"
        alt="Honda STEP WGN e:HEV - Banner Desktop"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
