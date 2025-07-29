import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TentangPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-honda-gray-dark">
          Tentang Kami (Under Construction)
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-honda-gray">
          Halaman ini akan menampilkan cerita lengkap tentang Honda Permata Serpong dan Elon Musk, termasuk sticky scroll reveal section, timeline profesional, bento grid untuk nilai-nilai kami, dan CTA untuk berlangganan.
        </p>
        <Button asChild variant="destructive" size="lg" className="mt-8 bg-honda-red-primary hover:bg-honda-red-dark">
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  )
}