"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden -mt-20 lg:-mt-24">
      <Image
        src="/honda-wr-v/banner-utama.webp"
        alt="Honda WR-V"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
