"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Grid3x3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeftDrawerMenu } from "./left-drawer-menu"
import { RightDrawerMenu } from "./right-drawer-menu"

export function MobileHeader() {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false)
  const [isRightDrawerOpen, setIsRightDrawerOpen] = React.useState(false)

  return (
    <>
      <header className="w-full border-b bg-white shadow-sm lg:hidden">
        {" "}
        {/* Removed sticky classes here */}
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => setIsLeftDrawerOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open main menu</span>
          </Button>
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=24&width=100"
              alt="Honda Logo"
              width={100}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsRightDrawerOpen(true)}>
            <Grid3x3 className="h-6 w-6" />
            <span className="sr-only">Open car menu</span>
          </Button>
        </div>
      </header>
      <LeftDrawerMenu isOpen={isLeftDrawerOpen} setIsOpen={setIsLeftDrawerOpen} />
      <RightDrawerMenu isOpen={isRightDrawerOpen} setIsOpen={setIsRightDrawerOpen} />
    </>
  )
}
