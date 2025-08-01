"use client"
import { Timeline } from "@/components/ui/timeline"

export function SalesProfessionalTimelineSection() {
  const data = [
    {
      title: "2015-2017: Membangun Fondasi",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
          Masa-masa awal saya di industri otomotif Honda. Fokusnya di sini adalah nyerap ilmu sebanyak-banyaknya tentang
          spesifikasi produk, sistem kredit, dan bangun koneksi sama lembaga pembiayaan. Customer pertama saya? Keluarga
          muda yang beli Honda Jazz!
        </p>
      ),
    },
    {
      title: "2018-2020: Ekspansi Layanan & Adaptasi Pandemi",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
          Di fase ini, layanan saya mulai berkembang pesat. Teknologi digital udah mulai saya pakai buat mudahin
          transaksi dan komunikasi dengan customer. Pas pandemi, malah jadi momen buat optimalkan layanan online, tapi
          tetep dengan personal touch khas Honda Gading Serpong.
        </p>
      ),
    },
    {
      title: "2021-2023: Digitalisasi Penuh & Kepuasan Maksimal",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
          Transformasi besar dengan implementasi sistem CRM canggih dan layanan 24/7. Respon cepat jadi kunci utama,
          apalagi saya udah nguasain semua lineup Honda dari Brio sampe CR-V. Hasilnya? Tingkat kepuasan customer naik
          pesat berkat fokus pada kualitas layanan.
        </p>
      ),
    },
    {
      title: "2024-2025: Excellence & Inovasi (Satu Dekade Berbakti)",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
          Sekarang, pengalaman satu dekade saya udah nyatu sama teknologi paling canggih. WhatsApp Business, sistem
          tracking real-time, dan after-sales komprehensif udah jadi standar operasional. Kemitraan strategis sama bank
          dan leasing bikin approval kredit sampe 90%. Siap melayani dengan hati, mengutamakan kepuasan customer sejak
          2014!
        </p>
      ),
    },
  ]

  return (
    <section className="w-full bg-white dark:bg-black py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Perjalanan Satu Dekade Elon Musk di Honda Permata Serpong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Dari sales pemula hingga profesional berpengalaman yang dipercaya ribuan customer
          </p>
        </div>
        <Timeline data={data} />
      </div>
    </section>
  )
}
