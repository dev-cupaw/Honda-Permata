"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const aboutContent = [
  {
    title: "Lebih dari Sekadar Dealer Resmi",
    description:
      "Di Honda Permata Serpong, kami lebih dari sekadar dealer resmi. Kami adalah rumah bagi pecinta Honda di Gading Serpong dan sekitarnya. Dengan fasilitas showroom modern dan bengkel berstandar Honda, kami siap memberikan yang terbaik untukmu.",
    image: "/placeholder.svg?height=350&width=400",
  },
  {
    title: "Peran Saya, Elon Musk",
    description:
      "Nah, di sinilah peran saya, Elon Musk, sebagai konsultan penjualan andalanmu. Sejak 2014, saya sudah bantu ribuan customer mewujudkan impian punya Honda. Pengalaman lebih dari satu dekade ini bikin saya ngerti banget apa yang kamu butuhin, dari Brio, HR-V, sampe CR-V terbaru.",
    image: "/placeholder.svg?height=350&width=400",
  },
  {
    title: "Ngobrol Santai Bareng Saya",
    description:
      "Jadi, jangan sungkan buat ngobrol santai bareng saya, ya! Saya siap membantu Anda menemukan mobil yang paling pas, dengan penawaran terbaik.",
    image: "/placeholder.svg?height=350&width=400",
  },
]

export function AboutSection() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-50%"])

  return (
    <section className="bg-honda-light">
      {/* Mobile Layout - Horizontal Swipeable Carousel */}
      <div className="lg:hidden">
        <div className="py-12">
          <div
            className="flex gap-4 px-4 overflow-x-auto scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {aboutContent.map((item) => (
              <div
                key={item.title}
                className="flex-shrink-0 w-[85vw] bg-white rounded-lg shadow-lg overflow-hidden"
                style={{ scrollSnapAlign: "center" }}
              >
                {/* Top Part - Clean Image */}
                <div className="aspect-square relative overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>

                {/* Bottom Part - Text Area */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-honda-gray-dark mb-3">{item.title}</h3>
                  <p className="text-sm text-honda-gray leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div
              className="flex-shrink-0 w-[85vw] bg-white rounded-lg shadow-lg overflow-hidden"
              style={{ scrollSnapAlign: "center" }}
            >
              {/* Top Part - Clean Image */}
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/placeholder.svg?height=350&width=400"
                  alt="Kenalan Lebih Jauh"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Part - Text Area */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-honda-gray-dark mb-3">Siap Kenalan Lebih Jauh?</h3>
                <p className="text-sm text-honda-gray mb-4">Mari wujudkan mobil Honda impian Anda bersama saya.</p>
                <Button asChild variant="destructive" className="bg-honda-red-primary hover:bg-honda-red-dark">
                  <Link href="/about">Kenalan Lebih Jauh</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal Scroll */}
      <div className="hidden lg:block" ref={targetRef}>
        <div className="relative h-[180vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-white">
            <motion.div style={{ x }} className="flex gap-8 p-8">
              {aboutContent.map((item) => (
                <div
                  key={item.title}
                  className="group relative h-[350px] w-[400px] shrink-0 overflow-hidden rounded-lg shadow-lg"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
              <div className="group relative h-[350px] w-[400px] shrink-0 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/placeholder.svg?height=350&width=400"
                  alt="Kenalan Lebih Jauh"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-honda-red-primary/70" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                  <h3 className="text-2xl font-bold">Siap Kenalan Lebih Jauh?</h3>
                  <p className="mt-2 text-honda-red-light">Mari wujudkan mobil Honda impian Anda bersama saya.</p>
                  <Button
                    asChild
                    variant="secondary"
                    className="mt-4 bg-white text-honda-red-primary hover:bg-honda-light"
                  >
                    <Link href="/about">Kenalan Lebih Jauh</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
