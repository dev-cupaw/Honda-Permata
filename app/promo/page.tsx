import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ParallaxHeroSection } from "@/components/shared/parallax-hero-section"
import HondaPromoTracingBeam from "@/components/ui/honda-promo-tracing-beam"
import { getWhatsAppNumber } from "@/lib/contact-config"

export default function PromoPage() {
  const whatsappNumber = getWhatsAppNumber()
  
  return (
    <>
      <ParallaxHeroSection
        title="Promo Eksklusif Honda"
        subtitle="Jelajahi penawaran terbaru dan deal spesial untuk model Honda favorit Anda."
      />

      {/* TracingBeam Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-honda-gray-dark mb-4">
              Penawaran Terbaik Bulan Ini
            </h2>
            <p className="text-lg text-honda-gray max-w-2xl mx-auto">
              Dapatkan kesempatan emas untuk memiliki Honda impian dengan berbagai promo menarik dan benefit eksklusif
            </p>
          </div>

          <HondaPromoTracingBeam />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-honda-red-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Tertarik dengan Promo Kami?</h3>
          <p className="text-honda-red-light mb-8 max-w-2xl mx-auto">
            Hubungi Elon Musk sekarang juga untuk mendapatkan informasi lengkap dan konsultasi gratis mengenai promo
            Honda terbaru
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="bg-white text-honda-red-primary hover:bg-gray-100">
              <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                WhatsApp Sekarang
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-honda-red-primary bg-transparent"
            >
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
