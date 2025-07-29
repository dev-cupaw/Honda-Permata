import type React from "react"
import type { Metadata } from "next"
import { MobileFloatingActionButtons } from "../../components/global/mobile-floating-action-buttons"

export const metadata: Metadata = {
  title: "All New Honda Accord | Honda Permata Serpong",
  description:
    "Jelajahi All New Honda Accord, sedan premium dengan desain elegan, performa dinamis, dan teknologi canggih untuk pengalaman berkendara yang superior.",
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
