import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PromoPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-honda-gray-dark">
          Promo Page (Under Construction)
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-honda-gray">
          This page will showcase all current promotions with a parallax carousel of clickable brochures that open in a
          modal.
        </p>
        <Button asChild variant="destructive" size="lg" className="mt-8 bg-honda-red-primary hover:bg-honda-red-dark">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
