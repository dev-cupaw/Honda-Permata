"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ParallaxHeroSection } from "@/components/shared/parallax-hero-section"
import HondaContactStickyScroll from "@/components/ui/honda-contact-sticky-scroll"
import { Phone, MapPin, Clock, Mail, MessageCircle, Car } from "lucide-react"

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.warn("Form submitted:", formData)
    // Handle form submission logic here
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <ParallaxHeroSection
        title="Hubungi Kami"
        subtitle="Tim Honda Permata Serpong siap membantu Anda menemukan mobil Honda impian dengan pelayanan terbaik dan penawaran menarik."
      />

      {/* Sticky Scroll Reveal Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-honda-gray-dark mb-4">
              Cara Menghubungi Kami
            </h2>
            <p className="text-lg text-honda-gray max-w-2xl mx-auto">
              Pilih cara yang paling nyaman untuk Anda berkomunikasi dengan tim Honda Permata Serpong
            </p>
          </div>
          <HondaContactStickyScroll />
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-honda-gray-dark mb-4">
              Informasi Kontak Lengkap
            </h2>
            <p className="text-lg text-honda-gray">
              Semua informasi yang Anda butuhkan untuk menghubungi Honda Permata Serpong
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Phone Contact */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-honda-red-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-honda-red-primary" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-2">Telepon</h3>
                <p className="text-honda-gray mb-4">Hubungi sales consultant kami</p>
                <div className="space-y-2">
                  <p className="font-semibold text-honda-gray-dark">Sales: 0812-8888-1234</p>
                  <p className="font-semibold text-honda-gray-dark">Service: 0812-8888-5678</p>
                  <p className="text-sm text-honda-gray">Tersedia 24/7</p>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Contact */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-2">WhatsApp</h3>
                <p className="text-honda-gray mb-4">Chat langsung dengan sales</p>
                <div className="space-y-2">
                  <p className="font-semibold text-honda-gray-dark">+62 812-8888-1234</p>
                  <p className="text-sm text-honda-gray">Respon dalam 5 menit</p>
                  <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
                    <Link href="https://wa.me/6281288881234" target="_blank">
                      Chat WhatsApp
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-2">Lokasi</h3>
                <p className="text-honda-gray mb-4">Kunjungi showroom kami</p>
                <div className="space-y-2">
                  <p className="font-semibold text-honda-gray-dark">Honda Permata Serpong</p>
                  <p className="text-sm text-honda-gray">Jl. Raya Serpong, Gading Serpong</p>
                  <p className="text-sm text-honda-gray">Tangerang Selatan, Banten</p>
                  <Button asChild variant="outline" className="mt-4 bg-transparent">
                    <Link href="https://maps.google.com" target="_blank">
                      Lihat di Maps
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-2">Jam Operasional</h3>
                <p className="text-honda-gray mb-4">Waktu pelayanan kami</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Senin - Sabtu:</span>
                    <span className="font-semibold">08:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu:</span>
                    <span className="font-semibold">08:00 - 20:00</span>
                  </div>
                  <p className="text-honda-red-primary font-semibold mt-2">Service 24 Jam</p>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-2">Email</h3>
                <p className="text-honda-gray mb-4">Kirim pertanyaan via email</p>
                <div className="space-y-2">
                  <p className="font-semibold text-honda-gray-dark">info@hondapermataserpong.com</p>
                  <p className="text-sm text-honda-gray">Respon dalam 24 jam</p>
                  <Button asChild variant="outline" className="mt-4 bg-transparent">
                    <Link href="mailto:info@hondapermataserpong.com">Kirim Email</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Drive */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-honda-red-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-honda-red-primary" />
                </div>
                <h3 className="text-xl font-semibold text-honda-gray-dark mb-2">Test Drive</h3>
                <p className="text-honda-gray mb-4">Jadwalkan test drive</p>
                <div className="space-y-2">
                  <p className="text-sm text-honda-gray">Rasakan pengalaman berkendara Honda</p>
                  <p className="text-sm text-honda-gray">Gratis & tanpa komitmen</p>
                  <Button asChild className="mt-4 bg-honda-red-primary hover:bg-honda-red-dark">
                    <Link
                      href="https://wa.me/6281288881234?text=Halo,%20saya%20ingin%20jadwal%20test%20drive"
                      target="_blank"
                    >
                      Jadwalkan Test Drive
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-honda-gray-dark mb-4">
              Kirim Pesan Kepada Kami
            </h2>
            <p className="text-lg text-honda-gray max-w-2xl mx-auto">
              Isi form di bawah ini dan tim Honda Permata Serpong akan menghubungi Anda dalam waktu 24 jam
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <Label htmlFor="nama" className="text-sm font-medium text-honda-gray-dark">
                      Nama Lengkap *
                    </Label>
                    <Input
                      id="nama"
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => handleInputChange("nama", e.target.value)}
                      className="bg-white border-honda-gray-light text-honda-gray-dark placeholder:text-honda-gray focus:border-honda-red-primary focus:ring-honda-red-primary/50"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>

                  {/* Nomor HP */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-honda-gray-dark">
                      Nomor HP *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-white border-honda-gray-light text-honda-gray-dark placeholder:text-honda-gray focus:border-honda-red-primary focus:ring-honda-red-primary/50"
                      placeholder="Contoh: 08123456789"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-honda-gray-dark">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white border-honda-gray-light text-honda-gray-dark placeholder:text-honda-gray focus:border-honda-red-primary focus:ring-honda-red-primary/50"
                      placeholder="contoh@email.com"
                    />
                  </div>

                  {/* Pilih Layanan */}
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-medium text-honda-gray-dark">
                      Pilih Layanan *
                    </Label>
                    <Select required onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="bg-white border-honda-gray-light text-honda-gray-dark focus:border-honda-red-primary focus:ring-honda-red-primary/50">
                        <SelectValue placeholder="Pilih layanan yang Anda butuhkan" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-honda-gray-light">
                        <SelectItem
                          value="simulasi-kredit"
                          className="text-honda-gray-dark hover:bg-honda-light focus:bg-honda-light"
                        >
                          Simulasi Kredit
                        </SelectItem>
                        <SelectItem
                          value="trade-in"
                          className="text-honda-gray-dark hover:bg-honda-light focus:bg-honda-light"
                        >
                          Trade In
                        </SelectItem>
                        <SelectItem
                          value="test-drive"
                          className="text-honda-gray-dark hover:bg-honda-light focus:bg-honda-light"
                        >
                          Test Drive
                        </SelectItem>
                        <SelectItem
                          value="konsultasi-pembelian"
                          className="text-honda-gray-dark hover:bg-honda-light focus:bg-honda-light"
                        >
                          Konsultasi Pembelian
                        </SelectItem>
                        <SelectItem
                          value="informasi-promo"
                          className="text-honda-gray-dark hover:bg-honda-light focus:bg-honda-light"
                        >
                          Informasi Promo
                        </SelectItem>
                        <SelectItem
                          value="service-maintenance"
                          className="text-honda-gray-dark hover:bg-honda-light focus:bg-honda-light"
                        >
                          Service & Maintenance
                        </SelectItem>
                        <SelectItem
                          value="lainnya"
                          className="text-honda-gray-dark hover:bg-honda-light focus:bg-honda-light"
                        >
                          Lainnya
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pesan Tambahan */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-honda-gray-dark">
                      Pesan Tambahan
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-white border-honda-gray-light text-honda-gray-dark placeholder:text-honda-gray focus:border-honda-red-primary focus:ring-honda-red-primary/50 resize-none"
                      placeholder="Ceritakan kebutuhan atau pertanyaan Anda lebih detail..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-honda-red-primary hover:bg-honda-red-dark text-white font-semibold py-4 text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-honda-red-primary/25"
                  >
                    Kirim Pesan
                  </Button>

                  {/* Alternative Contact */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-honda-gray mb-3">Atau hubungi kami langsung:</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild variant="outline" size="sm" className="bg-transparent">
                        <Link href="tel:081288881234">
                          <Phone className="w-4 h-4 mr-2" />
                          Telepon
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                        <Link
                          href="https://wa.me/6281288881234?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20Honda"
                          target="_blank"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Link>
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-honda-red-primary to-honda-red-dark">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Menemukan Honda Impian Anda?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tim Honda Permata Serpong siap membantu Anda dengan pelayanan terbaik dan penawaran menarik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-honda-red-primary hover:bg-gray-100">
              <Link
                href="https://wa.me/6281288881234?text=Halo,%20saya%20tertarik%20dengan%20mobil%20Honda"
                target="_blank"
              >
                Konsultasi WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-honda-red-primary bg-transparent"
            >
              <Link href="/">Lihat Semua Mobil</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
