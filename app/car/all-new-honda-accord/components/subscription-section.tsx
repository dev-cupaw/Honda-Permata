"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import type React from "react"

export function SubscriptionSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    console.log("Subscribe email:", email)
    toast.success(`Terima kasih telah berlangganan dengan ${email}!`)
    e.currentTarget.reset()
  }

  return (
    <section className="py-16 lg:py-24 bg-honda-red-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Bell icon changed to white */}
          <Bell className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Dapatkan Penawaran Terbaik</h2>
          <p className="text-honda-red-light mb-8 text-lg">
            Daftar sekarang untuk menerima informasi terbaru, penawaran eksklusif, dan promo menarik tentang All New
            Honda Accord langsung ke inbox Anda.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              name="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <Button
              type="submit"
              className="bg-white text-honda-red-primary hover:bg-gray-100 px-6 py-3 rounded-md font-semibold"
            >
              Berlangganan
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
