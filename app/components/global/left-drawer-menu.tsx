"use client"
import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react" // Added MenuIcon import
import { Button } from "@/components/ui/button" // Corrected import
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet" // Added SheetTrigger import

const menuItems = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/promo", label: "Promo" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/kontak", label: "Kontak" },
  { href: "/brochure", label: "Brochures" }, // Added brochure link
]

export function LeftDrawerMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-[80vw] bg-white p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex justify-start">
            <Image
              src="/honda-permata-logo/honda-logo-icon.webp"
              alt="Honda Logo"
              width={120}
              height={120}
              className="h-17 w-17 object-contain"
              priority
            />
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between p-6">
          <nav className="flex flex-col gap-8 text-left">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xl font-medium text-honda-gray-dark transition-colors hover:text-honda-red-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* Assuming MegaMenu is also used here for mobile, if not, remove this line */}
            {/* <MegaMenu isMobile={true} onClose={() => setIsOpen(false)} /> */}
          </nav>
          <Button
            asChild
            variant="destructive"
            size="default"
            className="w-full bg-honda-red-primary text-sm hover:bg-honda-red-dark"
          >
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-4 w-4" /> WhatsApp Elon Musk
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
