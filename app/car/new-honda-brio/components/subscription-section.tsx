import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SubscriptionSection() {
  return (
    <section className="py-16 lg:py-24 bg-honda-red-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Bell className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-honda-red-light mb-8 text-lg">
            Dapatkan informasi terbaru tentang New Honda Brio, promo menarik, dan berita otomotif lainnya langsung di
            inbox Anda.
          </p>
          <Button
            size="lg"
            className="bg-white text-honda-red-primary hover:bg-honda-red-primary hover:text-white px-8 py-4 text-lg border border-white hover:border-honda-red-primary"
          >
            Be a Subscriber
          </Button>
        </div>
      </div>
    </section>
  )
}
