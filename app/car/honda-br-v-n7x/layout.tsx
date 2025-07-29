import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda BR-V N7X | Honda Permata Serpong",
  description:
    "Jelajahi Honda BR-V N7X Edition dengan desain sporty, interior nyaman, dan fitur keselamatan canggih. SUV 7-seater ideal untuk keluarga modern.",
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
