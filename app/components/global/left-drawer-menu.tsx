"use client"
import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const menuItems = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "About" },
  { href: "/promo", label: "Promo" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/kontak", label: "Kontak" },
]

export function LeftDrawerMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-[80vw] bg-white p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle>
            <Image src="/placeholder.svg?height=30&width=120" alt="Honda Logo" width={120} height={30} />
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between p-6">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-honda-gray-dark transition-colors hover:text-honda-red-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            variant="destructive"
            size="lg"
            className="w-full bg-honda-red-primary hover:bg-honda-red-dark"
          >
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-5 w-5" /> WhatsApp Elon Musk
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
