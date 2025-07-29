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
    image: "/section-about/Section-About-Dealer-Resmi.webp",
  },
  {
    title: "Peran Saya, Elon Musk",
    description:
      "Nah, di sinilah peran saya, Elon Musk, sebagai konsultan penjualan andalanmu. Sejak 2014, saya sudah bantu ribuan customer mewujudkan impian punya Honda. Pengalaman lebih dari satu dekade ini bikin saya ngerti banget apa yang kamu butuhin, dari Brio, HR-V, sampe CR-V terbaru.",
    image: "/section-about/Section-About-kenalan.webp",
  },
  {
    title: "Ngobrol Santai Bareng Saya",
    description:
      "Jadi, jangan sungkan buat ngobrol santai bareng saya, ya! Saya siap membantu Anda menemukan mobil yang paling pas, dengan penawaran terbaik.",
    image: "/section-about/Section-About-Obrolan.webp",
  },
]

export function AboutSection() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const mobileTargetRef = useRef<HTMLDivElement | null>(null)
  
  // Desktop scroll animation dengan range transform kecil untuk smooth scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  })

  // Mobile scroll animation dengan range transform kecil untuk smooth scroll
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTargetRef,
    offset: ["start center", "end center"],
  })

  // Range transform untuk menampilkan 1 card di awal, kemudian scroll ke card berikutnya
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-75%"])
  const mobileX = useTransform(mobileScrollYProgress, [0.1, 0.9], ["0%", "-75%"])

  return (
    <section className="bg-honda-light">
      {/* Mobile Layout - Horizontal Scroll Animation */}
      <div className="lg:hidden" ref={mobileTargetRef}>
        <div className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen items-center justify-start overflow-hidden bg-honda-light">
            <motion.div style={{ x: mobileX }} className="flex gap-2 pl-4 pr-4">
              {aboutContent.map((item) => (
                <div
                  key={item.title}
                  className="flex-shrink-0 w-[92vw] bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Top Part - Clean Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>

                  {/* Bottom Part - Text Area */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-honda-gray-dark mb-2">{item.title}</h3>
                    <p className="text-xs text-honda-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}

              {/* CTA Card */}
              <div className="flex-shrink-0 w-[92vw] bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Top Part - Clean Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/section-about/Section-About-personal.webp"
                    alt="Kenalan Lebih Jauh"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom Part - Text Area */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-honda-gray-dark mb-2">Siap Kenalan Lebih Jauh?</h3>
                  <p className="text-xs text-honda-gray mb-3">Mari wujudkan mobil Honda impian Anda bersama saya.</p>
                  <Button asChild variant="destructive" className="bg-honda-red-primary hover:bg-honda-red-dark text-xs px-4 py-2">
                    <Link href="/about">Kenalan Lebih Jauh</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal Scroll */}
      <div className="hidden lg:block" ref={targetRef}>
        <div className="relative h-[400vh]">
          <div className="sticky top-0 flex h-screen items-center justify-start overflow-hidden bg-white">
            <motion.div style={{ x }} className="flex gap-4 pl-8 pr-8">
              {aboutContent.map((item) => (
                <div
                  key={item.title}
                  className="group relative h-[400px] w-[450px] shrink-0 overflow-hidden rounded-lg shadow-lg"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
              <div className="group relative h-[400px] w-[450px] shrink-0 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/section-about/Section-About-personal.webp"
                  alt="Kenalan Lebih Jauh"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-honda-red-primary/70" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-5 text-center text-white">
                  <h3 className="text-xl font-bold">Siap Kenalan Lebih Jauh?</h3>
                  <p className="mt-2 text-honda-red-light">Mari wujudkan mobil Honda impian Anda bersama saya.</p>
                  <Button
                    asChild
                    variant="secondary"
                    className="mt-3 bg-white text-honda-red-primary hover:bg-honda-light"
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
