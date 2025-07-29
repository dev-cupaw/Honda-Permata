import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda e:N1 | Honda Permata Serpong",
  description:
    "Jelajahi Honda e:N1, masa depan mobilitas listrik. Inovasi, efisiensi, dan gaya dalam satu kendaraan listrik canggih.",
}

export default function EN1Layout({
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
