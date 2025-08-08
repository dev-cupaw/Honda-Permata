"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormHandler, validateField } from "@/hooks/use-form-handler"
import { FormErrorSummary, InputWithError, TextareaWithError } from "@/components/ui/form-error"
import type { ContactFormData } from "@/lib/whatsapp-integration"

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    nama: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Form handler with WhatsApp integration
  const { handleSubmit, isSubmitting, errors, clearErrors } = useFormHandler({
    formData,
    formType: "contact",
    onSuccess: () => {
      // Reset form on successful submission
      setFormData({
        nama: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      })
      setFieldErrors({})
    },
    onError: (error) => {
      console.error("Contact form submission error:", error)
    }
  })

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    
    // Clear general errors when user makes changes
    if (errors.length > 0) {
      clearErrors()
    }
  }, [fieldErrors, errors.length, clearErrors])

  const handleFieldBlur = useCallback((field: string, value: string) => {
    const error = validateField(field, value)
    if (error) {
      setFieldErrors(prev => ({ ...prev, [field]: error }))
    }
  }, [])

  return (
    <section
      className="parallax-bg relative min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/section-kontak/Honda-2015.webp')`,
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
              {/* Enhanced Error Display */}
              <FormErrorSummary 
                errors={errors}
                title="Terdapat kesalahan pada form:"
                dismissible={true}
                onDismiss={clearErrors}
              />

              {/* Nama Lengkap */}
              <InputWithError
                id="nama"
                type="text"
                label="Nama Lengkap"
                required
                value={formData.nama}
                onChange={(e) => handleInputChange("nama", e.target.value)}
                onBlur={(e) => handleFieldBlur("nama", e.target.value)}
                error={fieldErrors.nama}
                className="bg-white text-honda-gray-dark placeholder:text-honda-gray focus:ring-honda-red-primary/50 border-honda-gray-light focus:border-honda-red-primary"
                placeholder="Masukkan nama lengkap Anda"
                disabled={isSubmitting}
                helpText="Masukkan nama lengkap sesuai identitas"
              />

              {/* Nomor HP */}
              <InputWithError
                id="phone"
                type="tel"
                label="Nomor HP"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                error={fieldErrors.phone}
                className="bg-white text-honda-gray-dark placeholder:text-honda-gray focus:ring-honda-red-primary/50 border-honda-gray-light focus:border-honda-red-primary"
                placeholder="Contoh: 08123456789 atau +628123456789"
                disabled={isSubmitting}
                helpText="Nomor HP aktif untuk dihubungi via WhatsApp"
              />

              {/* Email */}
              <InputWithError
                id="email"
                type="email"
                label="Email (Opsional)"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={(e) => handleFieldBlur("email", e.target.value)}
                error={fieldErrors.email}
                className="bg-white text-honda-gray-dark placeholder:text-honda-gray focus:ring-honda-red-primary/50 border-honda-gray-light focus:border-honda-red-primary"
                placeholder="contoh@email.com"
                disabled={isSubmitting}
                helpText="Email untuk komunikasi tambahan (opsional)"
              />

              {/* Pilih Layanan */}
              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-medium text-honda-gray-dark">
                  Pilih Layanan (Opsional)
                </Label>
                <Select 
                  value={formData.service || ""} 
                  onValueChange={(value) => handleInputChange("service", value)}
                  disabled={isSubmitting}
                >
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
              <TextareaWithError
                id="message"
                label="Pesan Tambahan"
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                error={fieldErrors.message}
                className="bg-white border-honda-gray-light text-honda-gray-dark placeholder:text-honda-gray focus:border-honda-red-primary focus:ring-honda-red-primary/50 resize-none"
                placeholder="Ceritakan kebutuhan atau pertanyaan Anda lebih detail..."
                disabled={isSubmitting}
                helpText="Jelaskan kebutuhan atau pertanyaan Anda (maksimal 1000 karakter)"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-4 text-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-honda-red-primary hover:bg-honda-red-dark hover:scale-[1.02] hover:shadow-lg hover:shadow-honda-red-primary/25"
                } text-white`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim...
                  </div>
                ) : (
                  "Kirim Pesan via WhatsApp"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
