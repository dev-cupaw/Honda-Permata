"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell } from "lucide-react"
import { toast } from "sonner"

export function SubscriptionSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.warn("Subscribe email:", email)
    toast.success(`Terima kasih! Anda akan menerima update terbaru di ${email}`)
    setEmail("")
  }

  return (
    <section className="py-16 lg:py-24 bg-honda-red-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Bell className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Dapatkan Update Terbaru</h2>
          <p className="text-honda-red-light mb-8 text-lg">
            Jadilah yang pertama mengetahui informasi terbaru, penawaran eksklusif, dan promo menarik Honda e:N1.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-honda-gray-dark bg-white border-0 focus:ring-2 focus:ring-white/50"
              required
            />
            <Button
              type="submit"
              className="bg-white text-honda-red-primary hover:bg-honda-red-primary hover:text-white px-6 py-3 font-semibold whitespace-nowrap border border-white hover:border-honda-red-primary"
            >
              Berlangganan
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
