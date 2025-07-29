"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

// Gambar gallery dealer Honda Permata Serpong dengan deskripsi SEO-friendly
const galleryImages = [
  {
    src: "/section-gallery/Showroom-Honda-Permata-Serpong.webp",
    alt: "Showroom Honda Permata Serpong - Dealer Resmi Honda Gading Serpong Tangerang",
    title: "Showroom Honda Permata Serpong"
  },
  {
    src: "/section-gallery/Unit-Honda-Permata-Serpong.webp",
    alt: "Unit Mobil Honda Terbaru di Honda Permata Serpong - Koleksi Lengkap",
    title: "Unit Honda Terbaru"
  },
  {
    src: "/section-gallery/Honda-Gading-Serpong.webp",
    alt: "Honda Gading Serpong - Dealer Resmi Honda Terpercaya di Tangerang Selatan",
    title: "Honda Gading Serpong"
  },
  {
    src: "/section-gallery/Service-Honda-Permata-Serpong.webp",
    alt: "Service Honda Permata Serpong - Bengkel Resmi dengan Teknisi Berpengalaman",
    title: "Service Honda Resmi"
  },
  {
    src: "/section-gallery/Office-Honda-Permata-Serpong.webp",
    alt: "Office Honda Permata Serpong - Ruang Konsultasi Kredit dan Trade In",
    title: "Office Honda Permata"
  },
  {
    src: "/section-gallery/Coating-Honda-Permata-Serpong.webp",
    alt: "Coating Honda Permata Serpong - Layanan Perlindungan Cat Mobil Terbaik",
    title: "Layanan Coating Premium"
  },
  {
    src: "/section-gallery/Check-Kendaraan-Honda-Permata-Serpong.webp",
    alt: "Check Kendaraan Honda Permata Serpong - Inspeksi Menyeluruh Sebelum Pembelian",
    title: "Check Kendaraan"
  },
  {
    src: "/section-gallery/Oli-Berkualitas-Honda-Permata-Serpong.webp",
    alt: "Oli Berkualitas Honda Permata Serpong - Spare Part dan Oli Original Honda",
    title: "Oli Berkualitas Honda"
  },
  {
    src: "/section-gallery/Tampak-Depan-Honda-Permata-Serpong.webp",
    alt: "Tampak Depan Honda Permata Serpong - Dealer Honda Terpercaya Gading Serpong",
    title: "Tampak Depan Dealer"
  },
  {
    src: "/section-gallery/Honda-Permata-Serpong.webp",
    alt: "Honda Permata Serpong - Dealer Resmi Honda dengan Pelayanan Terbaik",
    title: "Honda Permata Serpong"
  }
]

export function GallerySection() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const translateFirst = useTransform(scrollYProgress, [0.1, 1], [0, -200])
  const translateSecond = useTransform(scrollYProgress, [0.1, 1], [0, 200])
  const translateThird = useTransform(scrollYProgress, [0.1, 1], [0, -200])

  // Membagi gambar menjadi 3 kolom untuk layout parallax desktop dengan distribusi seimbang
  const totalImages = galleryImages.length
  const imagesPerColumn = Math.floor(totalImages / 3)
  const remainder = totalImages % 3
  
  // Distribusi: kolom 1 dan 2 mendapat 3 gambar, kolom 3 mendapat 4 gambar
  const imageParts = [
    galleryImages.slice(0, imagesPerColumn + (remainder > 0 ? 1 : 0)), // 4 gambar
    galleryImages.slice(imagesPerColumn + (remainder > 0 ? 1 : 0), 2 * imagesPerColumn + (remainder > 0 ? 1 : 0) + (remainder > 1 ? 1 : 0)), // 3 gambar
    galleryImages.slice(2 * imagesPerColumn + (remainder > 0 ? 1 : 0) + (remainder > 1 ? 1 : 0)), // 3 gambar
  ]

  const transforms = [translateFirst, translateSecond, translateThird]

  return (
    <section className="bg-white">
      {/* Mobile Layout - Simple Grid */}
      <div className="lg:hidden py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-honda-gray-dark sm:text-4xl">
              Intip Dealer Kami Lebih Dekat
            </h2>
            <p className="mt-4 text-lg leading-8 text-honda-gray">
              Lihat koleksi mobil terbaru dan suasana modern di Honda Permata Serpong.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group aspect-square relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Parallax Scroll */}
      <div className="hidden lg:block" ref={targetRef}>
        <div className="relative h-[250vh]">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden pt-20">
            <div className="relative z-10 mx-auto max-w-7xl bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl text-center lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight text-honda-gray-dark sm:text-4xl">
                Intip Dealer Kami Lebih Dekat
              </h2>
              <p className="mt-2 text-lg leading-8 text-honda-gray">
                Lihat koleksi mobil terbaru dan suasana modern di Honda Permata Serpong.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 items-start gap-12 max-w-7xl mx-auto px-6">
              {imageParts.map((images, columnIndex) => (
                <div key={columnIndex} className="grid gap-12">
                  {images.map((image, imageIndex) => (
                    <motion.div 
                      style={{ y: transforms[columnIndex] }} 
                      key={`grid-${columnIndex}-${imageIndex}`}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        <Image
                          src={image.src}
                          className="h-96 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          height="500"
                          width="500"
                          alt={image.alt}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
