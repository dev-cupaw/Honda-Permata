import { ParallaxHeroSection } from "@/components/shared/parallax-hero-section"
import { TestimonialSection } from "@/app/components/home/testimonial-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function TestimoniPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <ParallaxHeroSection
        title="Testimoni Pelanggan"
        subtitle="Kepercayaan dan Kepuasan Pelanggan adalah Prioritas Utama Kami"
        description="Dengarkan langsung pengalaman nyata dari ribuan pelanggan yang telah mempercayakan Honda Permata Serpong sebagai partner terbaik dalam memiliki kendaraan impian mereka."
        backgroundImage="/section-testimoni/testimonial-hero-bg.webp"
        height="70vh"
      />

      {/* Testimonial Marquee Section */}
      <TestimonialSection />

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-honda-gray-dark mb-4">
              Mengapa Pelanggan Memilih Honda Permata Serpong?
            </h2>
            <p className="text-lg text-honda-gray max-w-3xl mx-auto">
              Lebih dari 10 tahun melayani masyarakat Tangerang dan sekitarnya dengan komitmen memberikan pelayanan
              terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6 border-honda-gray-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-honda-red-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-honda-red-primary" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-3">Pelayanan Terpercaya</h3>
                <p className="text-honda-gray">
                  Sales profesional dengan pengalaman lebih dari 8 tahun, siap membantu Anda menemukan Honda yang tepat
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-honda-gray-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-honda-red-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-honda-red-primary" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-3">Proses Cepat</h3>
                <p className="text-honda-gray">
                  Approval kredit dengan tingkat persetujuan tinggi dan proses yang efisien, unit bisa langsung dibawa
                  pulang
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-honda-gray-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-honda-red-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-honda-red-primary" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-3">Penawaran Terbaik</h3>
                <p className="text-honda-gray">
                  Dapatkan promo menarik, cashback, dan paket bundling asuransi dengan harga terbaik di kelasnya
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-honda-red-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Bergabung dengan Ribuan Pelanggan Puas Lainnya?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan Honda Anda dengan sales profesional kami dan rasakan pengalaman berbelanja yang tak
            terlupakan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-honda-red-primary hover:bg-gray-100 font-semibold px-8 py-3"
            >
              <Link
                href="https://wa.me/6281280005555?text=Halo%20Elon%20Musk,%20saya%20tertarik%20untuk%20konsultasi%20tentang%20Honda.%20Bisa%20bantu%20saya?"
                target="_blank"
              >
                Konsultasi via WhatsApp
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-honda-red-primary font-semibold px-8 py-3 bg-transparent"
            >
              <Link href="/kontak">Kunjungi Showroom</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
