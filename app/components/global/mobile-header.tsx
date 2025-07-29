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
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => setIsLeftDrawerOpen(true)} className="h-12 w-12">
            <Menu className="h-8 w-8 !size-8" />
            <span className="sr-only">Open main menu</span>
          </Button>
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/honda-permata-logo/logo-hondapermata.svg"
              alt="Honda Permata Serpong Logo"
              width={100}
              height={28}
              className="h-6 w-auto object-contain"
            />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsRightDrawerOpen(true)} className="h-12 w-12">
            <Grid3x3 className="h-8 w-8 !size-8" />
            <span className="sr-only">Open car menu</span>
          </Button>
        </div>
      </header>
      <LeftDrawerMenu isOpen={isLeftDrawerOpen} setIsOpen={setIsLeftDrawerOpen} />
      <RightDrawerMenu isOpen={isRightDrawerOpen} setIsOpen={setIsRightDrawerOpen} />
    </>
  )
}
