"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[48vh] lg:h-[80vh] w-full overflow-hidden pt-20 lg:pt-24">
      <Image
        src="/all-new-honda-accord/banner-utama.webp"
        alt="All New Honda Accord 2.0L RS e:HEV"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
