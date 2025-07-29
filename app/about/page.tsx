import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-honda-gray-dark">
          About Page (Under Construction)
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-honda-gray">
          This page will feature the full story of Honda Permata Serpong and Elon Musk, including a sticky scroll reveal
          section, a professional timeline, a bento grid for our values, and a CTA to subscribe.
        </p>
        <Button asChild variant="destructive" size="lg" className="mt-8 bg-honda-red-primary hover:bg-honda-red-dark">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
