"use client"

import Link from "next/link"
import { Phone, FileText, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { getWhatsAppNumber } from "@/lib/contact-config"

export function DesktopFloatingActionButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const whatsappNumber = getWhatsAppNumber();

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex-col gap-3 hidden lg:flex">
      {isClient && showBackToTop && (
        <button
          onClick={scrollToTop}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-honda-red-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-honda-red-dark animate-in fade-in slide-in-from-bottom-2"
          aria-label="Back to Top"
        >
          <ChevronUp className="h-7 w-7" />
        </button>
      )}

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <Phone className="h-7 w-7" />
      </a>

      <Link
        href="/brochure"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-honda-gray-dark text-white shadow-lg transition-transform hover:scale-110"
        aria-label="View Brochure"
      >
        <FileText className="h-7 w-7" />
      </Link>
    </div>
  );
}