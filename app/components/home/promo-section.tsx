"use client"
import { HeroParallax } from "@/components/ui/hero-parallax"

const promos = [
  {
    title: "DP Ringan Honda Brio & Jazz",
    link: "/promo/dp-ringan",
    thumbnail: "/section-promosi/Cashback-Puluhan-Juta.webp",
  },
  {
    title: "Cicilan Super Ringan HR-V & BR-V",
    link: "/promo/cicilan-ringan",
    thumbnail: "/section-promosi/Cicilan-Super-Ringan.webp",
  },
  {
    title: "Program Trade-In Terbaik",
    link: "/promo/trade-in",
    thumbnail: "/section-promosi/Program-Trade-In-Terbaik.webp",
  },
  {
    title: "Promo Spesial CR-V & Accord",
    link: "/promo/luxury-class",
    thumbnail: "/section-promosi/Promo-Spesial-CRV-Accord.webp",
  },
  {
    title: "Gratis Biaya Service Berkala",
    link: "/promo/free-service",
    thumbnail: "/section-promosi/Gratis-Biaya-Service-Berkala.webp",
  },
  {
    title: "Bunga 0% Tenor Tertentu",
    link: "/promo/bunga-nol-persen",
    thumbnail: "/section-promosi/Bunga-0-Tenor-Tertentu.webp",
  },
  {
    title: "Cashback Puluhan Juta",
    link: "/promo/cashback",
    thumbnail: "/section-promosi/Cashback-Puluhan-Juta.webp",
  },
  {
    title: "Free Aksesoris Pilihan",
    link: "/promo/free-aksesoris",
    thumbnail: "/section-promosi/Free-Aksesoris-Pilihan.webp",
  },
  {
    title: "Paket Bundling Asuransi",
    link: "/promo/asuransi",
    thumbnail: "/section-promosi/Paket-Bundling-Asuransi.webp",
  },
  {
    title: "Prioritas Pengiriman Unit",
    link: "/promo/prioritas-unit",
    thumbnail: "/section-promosi/Prioritas-Pengiriman-Unit.webp",
  },
  {
    title: "Taksiran Harga Fair & Transparan",
    link: "/promo/taksiran-fair",
    thumbnail: "/section-promosi/Program-Trade-In-Terbaik.webp",
  },
  {
    title: "Layanan Darurat 24/7",
    link: "/promo/layanan-darurat",
    thumbnail: "/section-promosi/Layanan-Darurat-24-7.webp",
  },
  {
    title: "Diskon Khusus Pembelian Kredit",
    link: "/promo/diskon-kredit",
    thumbnail: "/section-promosi/Diskon-Khusus-Pembelian-Kredit.webp",
  },
  {
    title: "Free Kaca Film V-Kool",
    link: "/promo/free-vkool",
    thumbnail: "/section-promosi/Free-Aksesoris-Pilihan.webp",
  },
  {
    title: "Approval Rate Tinggi",
    link: "/promo/approval-tinggi",
    thumbnail: "/section-promosi/Approval-Rate-Tinggi.webp",
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
