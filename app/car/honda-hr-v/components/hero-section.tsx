"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[48vh] lg:h-[80vh] w-full overflow-hidden pt-20 lg:pt-24">
      <Image
        src="/honda-hr-v/Banner-Product-Desktop.png"
        alt="New Honda HR-V - Banner Desktop"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
