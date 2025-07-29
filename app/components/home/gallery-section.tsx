"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const galleryImages = Array.from({ length: 15 }, (_, i) => `/placeholder.svg?height=400&width=400&text=Gallery${i + 1}`)

export function GallerySection() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const translateFirst = useTransform(scrollYProgress, [0.1, 1], [0, -150])
  const translateSecond = useTransform(scrollYProgress, [0.1, 1], [0, 150])
  const translateThird = useTransform(scrollYProgress, [0.1, 1], [0, -150])

  const third = Math.ceil(galleryImages.length / 3)
  const imageParts = [
    galleryImages.slice(0, third),
    galleryImages.slice(third, 2 * third),
    galleryImages.slice(2 * third),
  ]

  const transforms = [translateFirst, translateSecond, translateThird]

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-white">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden pt-20">
        <div className="relative z-10 mx-auto max-w-7xl bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-honda-gray-dark sm:text-4xl">
            Intip Dealer Kami Lebih Dekat
          </h2>
          <p className="mt-2 text-lg leading-8 text-honda-gray">
            Lihat koleksi mobil terbaru dan suasana modern di Honda Permata Serpong.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {imageParts.map((images, columnIndex) => (
            <div key={columnIndex} className="grid gap-10">
              {images.map((image, imageIndex) => (
                <motion.div style={{ y: transforms[columnIndex] }} key={`grid-${columnIndex}-${imageIndex}`}>
                  <Image
                    src={image || "/placeholder.svg"}
                    className="h-80 w-full rounded-lg object-cover object-left-top"
                    height="400"
                    width="400"
                    alt={`Gallery image ${imageIndex + 1}`}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
