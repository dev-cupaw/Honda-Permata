"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function BookingFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    carModel: "Honda HR-V", // Updated car model
    province: "",
    city: "",
    dealer: "",
    purchasePlan: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-16 lg:py-24 bg-honda-light">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-honda-gray-dark text-center mb-12">
            Book Test Drive Honda HR-V
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-honda-gray-dark">
                  Nama Lengkap *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="bg-white border-honda-gray-light"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium text-honda-gray-dark">
                  Nomor HP *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="bg-white border-honda-gray-light"
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
                  className="bg-white border-honda-gray-light"
                  placeholder="contoh@email.com"
                />
              </div>

              {/* Car Model */}
              <div className="space-y-2">
                <Label htmlFor="carModel" className="text-sm font-medium text-honda-gray-dark">
                  Model Mobil
                </Label>
                <Input
                  id="carModel"
                  type="text"
                  value={formData.carModel}
                  readOnly
                  className="bg-honda-light border-honda-gray-light"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-honda-gray-dark">Provinsi *</Label>
                  <Select required onValueChange={(value) => handleInputChange("province", value)}>
                    <SelectTrigger className="bg-white border-honda-gray-light">
                      <SelectValue placeholder="Pilih Provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                      <SelectItem value="banten">Banten</SelectItem>
                      <SelectItem value="jabar">Jawa Barat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-honda-gray-dark">Kota *</Label>
                  <Select required onValueChange={(value) => handleInputChange("city", value)}>
                    <SelectTrigger className="bg-white border-honda-gray-light">
                      <SelectValue placeholder="Pilih Kota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                      <SelectItem value="tangerang">Tangerang</SelectItem>
                      <SelectItem value="bekasi">Bekasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-honda-gray-dark">Dealer *</Label>
                  <Select required onValueChange={(value) => handleInputChange("dealer", value)}>
                    <SelectTrigger className="bg-white border-honda-gray-light">
                      <SelectValue placeholder="Pilih Dealer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permata-serpong">Honda Permata Serpong</SelectItem>
                      <SelectItem value="permata-kelapa-gading">Honda Permata Kelapa Gading</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Purchase Plan */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-honda-gray-dark">Rencana Pembelian</Label>
                <Textarea
                  value={formData.purchasePlan}
                  onChange={(e) => handleInputChange("purchasePlan", e.target.value)}
                  className="bg-white border-honda-gray-light resize-none"
                  rows={3}
                  placeholder="Ceritakan rencana pembelian Anda..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-honda-red-primary hover:bg-honda-red-dark text-white font-semibold py-4 text-lg"
              >
                Kirim Permintaan Test Drive
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
