import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "Honda City Hatchback RS | Honda Permata Serpong",
  description:
    "Jelajahi Honda City Hatchback RS dengan desain sporty, ruang luas, dan teknologi canggih. Hatchback premium untuk gaya hidup urban yang dinamis.",
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
