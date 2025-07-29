"use client"
import { HeroParallax } from "@/components/ui/hero-parallax"

const promos = [
  {
    title: "DP Ringan Honda Brio & Jazz",
    link: "/promo/dp-ringan",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Cicilan Super Ringan HR-V & BR-V",
    link: "/promo/cicilan-ringan",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Program Trade-In Terbaik",
    link: "/promo/trade-in",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Promo Spesial CR-V & Accord",
    link: "/promo/luxury-class",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Gratis Biaya Service Berkala",
    link: "/promo/free-service",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Bunga 0% Tenor Tertentu",
    link: "/promo/bunga-nol-persen",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Cashback Puluhan Juta",
    link: "/promo/cashback",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Free Aksesoris Pilihan",
    link: "/promo/free-aksesoris",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Paket Bundling Asuransi",
    link: "/promo/asuransi",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Prioritas Pengiriman Unit",
    link: "/promo/prioritas-unit",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Taksiran Harga Fair & Transparan",
    link: "/promo/taksiran-fair",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Layanan Darurat 24/7",
    link: "/promo/layanan-darurat",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Diskon Khusus Pembelian Kredit",
    link: "/promo/diskon-kredit",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Free Kaca Film V-Kool",
    link: "/promo/free-vkool",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Approval Rate Tinggi",
    link: "/promo/approval-tinggi",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
]

export function PromoSection() {
  return (
    <HeroParallax
      products={promos}
      title="Promo Spesial Honda Permata Serpong"
      description="Jangan sampai kelewatan penawaran terbaik dari Honda Gading Serpong! Saya, Elon Musk, sudah siapkan berbagai promo menarik khusus buat kamu."
    />
  )
}
