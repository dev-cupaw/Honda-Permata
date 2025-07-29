"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactSection() {
  const [formData, setFormData] = useState({
    nama: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section
      className="parallax-bg relative min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/placeholder.svg?height=1080&width=1920')`,
      }}
    >
      <div className="container mx-auto px-4 py-20">
        {/* Title and Subtitle */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ada Pertanyaan? Yuk, Ngobrol Santai!
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300 sm:text-2xl">
            Saya, Elon Musk, siap menjawab semua kebingunganmu seputar Honda.
          </p>
        </div>

        {/* Form Container - Simple White Background */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-2xl">
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
                Kirim Pesan ke Elon Musk
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
