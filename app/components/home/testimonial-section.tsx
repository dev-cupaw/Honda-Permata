"use client"

import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"
import Image from "next/image"

const testimonials = [
  {
    name: "Ibu Santi",
    location: "Tangerang",
    body: "Pelayanan di Honda Permata Serpong juara! Saya dibantu Elon Musk dari awal sampai akhir, prosesnya cepat dan nggak ribet. Mobil Honda CR-V impian akhirnya di tangan!",
    img: "/section-testimoni/Ibu-Santi.webp",
  },
  {
    name: "Bapak Budi",
    location: "Gading Serpong",
    body: "Cari Honda Brio di Gading Serpong? Langsung aja ke Elon Musk. Orangnya ramah, penjelasannya detail, dan bantu banget cariin promo terbaik. Highly recommended!",
    img: "/section-testimoni/Bapak-Budi.webp",
  },
  {
    name: "Mbak Rina",
    location: "Serpong",
    body: "Setelah keliling beberapa dealer, cuma di sini yang saya ngerasa nyaman. Mas Elon Musk sabar banget ngejelasin semua fitur Honda HR-V. Service after sales-nya juga oke banget!",
    img: "/section-testimoni/Mbak-Rina.webp",
  },
  {
    name: "Bapak Rahman",
    location: "Jakarta Barat",
    body: "Awalnya bingung mau beli Honda tipe apa, tapi setelah konsultasi sama Mas Elon Musk, semua jadi jelas. Beliau ngerti banget kebutuhan keluarga saya, akhirnya pilih Honda BR-V.",
    img: "/section-testimoni/Bapak-Rahman.webp",
  },
  {
    name: "Ibu Diana",
    location: "Gading Serpong",
    body: "Saya udah langganan sama Mas Elon Musk sejak 2016. Dulu beli Honda Jazz, sekarang tukar tambah ke Honda HR-V. Pelayanannya konsisten luar biasa!",
    img: "/section-testimoni/Ibu-Diana.webp",
  },
  {
    name: "Sdr. Kevin",
    location: "Tangerang Selatan",
    body: "Pertama kali beli mobil, agak deg-degan. Tapi Mas Elon Musk bikin saya tenang. Semua pertanyaan dijawab sabar, dan dikasih opsi pembiayaan yang pas. Terima kasih!",
    img: "/placeholder-user.jpg",
  },
]

const ReviewCard = ({ img, name, location, body }: { img: string; name: string; location: string; body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "flex-shrink-0",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image 
          className="rounded-full" 
          width="32" 
          height="32" 
          alt={name} 
          src={img || "/placeholder-user.jpg"} 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-user.jpg";
          }}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-honda-gray-dark">{name}</figcaption>
          <p className="text-xs font-medium text-honda-gray">{location}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-honda-gray">{body}</blockquote>
    </figure>
  )
}

export function TestimonialSection() {
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2))
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2))

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-honda-gray-dark sm:text-4xl">
            Kata Mereka Tentang Honda Permata Serpong & Pelayanan Elon Musk
          </h2>
          <p className="mt-2 text-lg leading-8 text-honda-gray">
            Kami bangga menjadi bagian dari setiap impian Honda yang terwujud di Tangerang dan sekitarnya.
          </p>
        </div>
        <div className="relative mt-16 overflow-hidden">
          {/* Baris pertama - bergerak ke kiri (default) */}
          <Marquee pauseOnHover className="[--duration:20s] [--gap:1rem] mb-4">
            {firstRow.map((review, index) => (
              <ReviewCard key={`${review.name}-${index}`} {...review} />
            ))}
          </Marquee>

          {/* Baris kedua - bergerak ke kanan (reverse) */}
          <Marquee reverse pauseOnHover className="[--duration:20s] [--gap:1rem]">
            {secondRow.map((review, index) => (
              <ReviewCard key={`${review.name}-${index}-second`} {...review} />
            ))}
          </Marquee>

          {/* Gradient overlay untuk fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
    </section>
  )
}
