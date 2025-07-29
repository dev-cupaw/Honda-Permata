import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda WR-V | Honda Permata Serpong",
  description:
    "Jelajahi Honda WR-V, SUV kompak stylish dengan performa tangguh dan fitur canggih. Ideal untuk petualangan urban dan gaya hidup aktif Anda.",
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
