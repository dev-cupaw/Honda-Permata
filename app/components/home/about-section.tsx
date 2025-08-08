"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { OptimizedImage, RESPONSIVE_SIZES } from "@/components/ui/optimized-image"

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
    offset: ["start 60%", "end 40%"],
  })

  // Mobile scroll animation dengan range transform kecil untuk smooth scroll
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTargetRef,
    offset: ["start 60%", "end 40%"],
  })

  // Range transform untuk menampilkan 1 card di awal, kemudian scroll ke card berikutnya
  const x = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-75%"])
  const mobileX = useTransform(mobileScrollYProgress, [0.15, 0.85], ["0%", "-75%"])

  return (
    <section className="bg-honda-light">
      {/* Mobile Layout - Horizontal Scroll Animation */}
      <div className="lg:hidden relative" ref={mobileTargetRef} style={{ position: 'relative' }}>
        <div className="relative h-[240vh]">
          <div className="sticky top-0 flex h-screen items-center justify-start overflow-hidden bg-honda-light">
            <motion.div style={{ x: mobileX }} className="flex gap-2 pl-4 pr-4">
              {aboutContent.map((item) => (
                <div
                  key={item.title}
                  className="flex-shrink-0 w-[92vw] bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Top Part - Clean Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <OptimizedImage 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.title} 
                      fill 
                      sizes={RESPONSIVE_SIZES.card}
                      className="object-cover" 
                      placeholder="blur"
                      fallbackSrc="/placeholder.svg"
                    />
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
                  <OptimizedImage
                    src="/section-about/Section-About-personal.webp"
                    alt="Kenalan Lebih Jauh"
                    fill
                    sizes={RESPONSIVE_SIZES.card}
                    className="object-cover"
                    placeholder="blur"
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
      <div className="hidden lg:block relative" ref={targetRef} style={{ position: 'relative' }}>
        <div className="relative h-[320vh]">
          <div className="sticky top-0 flex h-screen items-center justify-start overflow-hidden bg-white">
            <motion.div style={{ x }} className="flex gap-4 pl-8 pr-8">
              {aboutContent.map((item) => (
                <div
                  key={item.title}
                  className="group relative h-[400px] w-[450px] shrink-0 overflow-hidden rounded-lg shadow-lg"
                >
                  <OptimizedImage
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes={RESPONSIVE_SIZES.card}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholder="blur"
                    fallbackSrc="/placeholder.svg"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
              <div className="group relative h-[400px] w-[450px] shrink-0 overflow-hidden rounded-lg shadow-lg">
                <OptimizedImage
                  src="/section-about/Section-About-personal.webp"
                  alt="Kenalan Lebih Jauh"
                  fill
                  sizes={RESPONSIVE_SIZES.card}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  placeholder="blur"
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
