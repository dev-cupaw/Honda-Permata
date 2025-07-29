import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda STEP WGN e:HEV | Honda Permata Serpong",
  description:
    "Jelajahi Honda STEP WGN e:HEV dengan teknologi hybrid terdepan. Ruang luas, fitur canggih, dan efisiensi bahan bakar terbaik untuk keluarga modern.",
}

export default function CarDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <MobileFloatingActionButtons />
    </>
  )
}
