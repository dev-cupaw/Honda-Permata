"use client"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { Phone, Clock, MessageCircle } from "lucide-react"

const content = [
  {
    title: "Konsultasi Sales Professional",
    description:
      "Hubungi sales consultant Honda Permata Serpong yang berpengalaman. Tim kami siap membantu Anda menemukan mobil Honda yang sesuai dengan kebutuhan dan budget Anda. Dapatkan penawaran terbaik dan informasi lengkap tentang semua model Honda.",
    content: (
      <div className="flex h-full w-full flex-col items-center justify-center text-white p-6">
        <Phone className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-bold mb-2">Sales Hotline</h3>
        <p className="text-lg font-semibold">0812-8888-1234</p>
        <p className="text-sm mt-2 text-center">Tersedia 24/7 untuk konsultasi</p>
      </div>
    ),
  },
  {
    title: "Kunjungi Showroom Kami",
    description:
      "Datang langsung ke showroom Honda Permata Serpong untuk melihat semua model Honda terbaru. Rasakan langsung kualitas dan fitur-fitur canggih mobil Honda. Tim kami akan memberikan penjelasan detail dan test drive gratis untuk Anda.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/section-gallery/Showroom-Honda-Permata-Serpong.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-md"
          alt="Honda Permata Serpong Showroom"
        />
      </div>
    ),
  },
  {
    title: "Jam Operasional",
    description:
      "Honda Permata Serpong melayani Anda dengan jam operasional yang fleksibel. Kami buka setiap hari dengan layanan service 24 jam untuk kenyamanan Anda. Kunjungi kami kapan saja sesuai dengan waktu luang Anda.",
    content: (
      <div className="flex h-full w-full flex-col items-center justify-center text-white p-6">
        <Clock className="w-16 h-16 mb-4" />
        <div className="text-center">
          <p className="font-semibold mb-2">Senin - Sabtu</p>
          <p className="text-lg mb-4">08:00 - 21:00</p>
          <p className="font-semibold mb-2">Minggu</p>
          <p className="text-lg mb-4">08:00 - 20:00</p>
          <p className="text-sm bg-white/20 px-3 py-1 rounded-full">Service 24 Jam</p>
        </div>
      </div>
    ),
  },
  {
    title: "WhatsApp Consultation",
    description:
      "Chat langsung dengan sales consultant kami melalui WhatsApp untuk konsultasi yang lebih personal dan cepat. Dapatkan informasi harga, promo terbaru, dan jadwalkan test drive dengan mudah melalui WhatsApp kami yang responsif.",
    content: (
      <div className="flex h-full w-full flex-col items-center justify-center text-white p-6">
        <MessageCircle className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
        <p className="text-lg font-semibold mb-2">+62 812-8888-1234</p>
        <p className="text-sm text-center bg-white/20 px-3 py-1 rounded-full">Respon dalam 5 menit</p>
      </div>
    ),
  },
]

export default function HondaContactStickyScroll() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  )
}
