"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[48vh] lg:h-[80vh] w-full overflow-hidden pt-20 lg:pt-24">
      <Image
        src="/honda-br-v-n7x/banner-utama.webp"
        alt="Honda BR-V N7X"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
