import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda Civic RS | Honda Permata Serpong",
  description:
    "Jelajahi Honda Civic RS terbaru dengan desain sporty, performa turbo yang bertenaga, dan teknologi canggih. Sedan premium untuk pengalaman berkendara yang tak terlupakan.",
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
