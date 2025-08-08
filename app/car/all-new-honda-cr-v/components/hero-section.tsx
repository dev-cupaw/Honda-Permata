"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[48vh] lg:h-[80vh] w-full overflow-hidden pt-20 lg:pt-24">
      <Image
        src="/all-new-honda-cr-v/banner-utama.webp"
        alt="All New Honda CR-V"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
