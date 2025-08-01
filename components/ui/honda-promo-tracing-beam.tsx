"use client"
import { TracingBeam } from "@/components/ui/tracing-beam"
import Image from "next/image"

export default function HondaPromoTracingBeam() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {promoContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-honda-red-primary text-white rounded-full text-sm w-fit px-4 py-1 mb-4">{item.badge}</h2>
            <p className="text-xl mb-4 font-bold text-honda-gray-dark">{item.title}</p>
            <div className="text-sm prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  height={400}
                  width={600}
                  className="rounded-lg mb-6 object-cover w-full"
                />
              )}
              <div className="text-honda-gray">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  )
}

const promoContent = [
  {
    title: "Promo Spesial Honda CR-V & Accord",
    description: (
      <>
        <p className="mb-4">
          Dapatkan kesempatan emas untuk memiliki Honda CR-V dan Accord dengan penawaran istimewa! Nikmati cashback
          hingga puluhan juta rupiah, cicilan super ringan, dan berbagai benefit eksklusif lainnya.
        </p>
        <p className="mb-4">
          Program ini terbatas dan hanya berlaku untuk pembelian dalam periode tertentu. Jangan lewatkan kesempatan
          untuk mendapatkan mobil impian Anda dengan harga terbaik.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Cashback hingga Rp 50 juta</li>
          <li>DP mulai dari 20%</li>
          <li>Bunga 0% untuk tenor tertentu</li>
          <li>Free aksesoris pilihan</li>
        </ul>
      </>
    ),
    badge: "Promo Terbatas",
    image: "/section-promosi/Promo-Spesial-CRV-Accord.webp",
  },
  {
    title: "Program Trade-In Terbaik",
    description: (
      <>
        <p className="mb-4">
          Tukar tambah mobil lama Anda dengan Honda terbaru! Kami memberikan taksiran harga yang fair dan transparan
          untuk kendaraan lama Anda, sehingga Anda bisa upgrade ke Honda impian dengan lebih mudah.
        </p>
        <p className="mb-4">
          Tim ahli kami akan melakukan penilaian menyeluruh terhadap kondisi kendaraan Anda dan memberikan penawaran
          terbaik di pasaran.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Taksiran harga fair & transparan</li>
          <li>Proses cepat dan mudah</li>
          <li>Bonus trade-in hingga Rp 10 juta</li>
          <li>Semua merek kendaraan diterima</li>
        </ul>
      </>
    ),
    badge: "Trade-In",
    image: "/section-promosi/Program-Trade-In-Terbaik.webp",
  },
  {
    title: "Paket Bundling Asuransi",
    description: (
      <>
        <p className="mb-4">
          Lindungi investasi Honda Anda dengan paket asuransi komprehensif yang kami tawarkan. Dapatkan perlindungan
          menyeluruh dengan premi yang terjangkau dan klaim yang mudah.
        </p>
        <p className="mb-4">
          Paket ini mencakup asuransi all risk, extended warranty, dan layanan darurat 24/7 yang siap membantu Anda
          kapan saja dan di mana saja.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Asuransi all risk dengan coverage lengkap</li>
          <li>Extended warranty hingga 5 tahun</li>
          <li>Layanan darurat 24/7</li>
          <li>Premi kompetitif dan fleksibel</li>
        </ul>
      </>
    ),
    badge: "Asuransi",
    image: "/section-promosi/Paket-Bundling-Asuransi.webp",
  },
  {
    title: "Cicilan Super Ringan",
    description: (
      <>
        <p className="mb-4">
          Wujudkan impian memiliki Honda dengan cicilan yang sangat terjangkau! Kami bekerja sama dengan berbagai
          lembaga pembiayaan terpercaya untuk memberikan solusi kredit terbaik sesuai kemampuan finansial Anda.
        </p>
        <p className="mb-4">
          Dengan approval rate tinggi dan proses yang cepat, Anda bisa segera membawa pulang Honda impian tanpa perlu
          menunggu lama.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Cicilan mulai dari Rp 3 jutaan</li>
          <li>Tenor fleksibel hingga 7 tahun</li>
          <li>Approval rate tinggi 95%</li>
          <li>Proses persetujuan dalam 24 jam</li>
        </ul>
      </>
    ),
    badge: "Kredit Mudah",
    image: "/section-promosi/Cicilan-Super-Ringan.webp",
  },
]
