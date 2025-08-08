"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[48vh] lg:h-[80vh] w-full overflow-hidden pt-20 lg:pt-24">
      <Image
        src="/honda-city-hatchback-rs/baner-utama.webp"
        alt="New Honda City RS Hatchback CVT - Premium Compact Hatchback"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
