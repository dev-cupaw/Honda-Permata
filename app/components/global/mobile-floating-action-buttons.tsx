"use client"

import Link from "next/link"
import { Phone, MapPin, FileText, MessageSquare } from "lucide-react"

export function MobileFloatingActionButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 lg:hidden">
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <Phone className="h-7 w-7" />
      </a>
      <Link
        href="/kontak#map"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-honda-red-primary text-white shadow-lg transition-transform hover:scale-110"
        aria-label="View Location"
      >
        <MapPin className="h-7 w-7" />
      </Link>
      <a
        href="/brosur.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-honda-gray-dark text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Download Brochure"
      >
        <FileText className="h-7 w-7" />
      </a>
      <button
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Let's Chat"
      >
        <MessageSquare className="h-7 w-7" />
      </button>
    </div>
  )
}
