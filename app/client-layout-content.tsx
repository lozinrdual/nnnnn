"use client"

import type React from "react"
import { Footer } from "@/components/footer"
import { DesktopHeader } from "@/components/desktop-header"
import { SiteHeader } from "@/components/site-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"

export function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isGalleryRoute = pathname.startsWith("/gallery")

  return (
    <>
      {!isGalleryRoute && (
        <>
          <div className="hidden lg:block">
            <DesktopHeader />
          </div>
          <div className="lg:hidden">
            <SiteHeader />
          </div>
        </>
      )}
      {children}
      <Footer />
      <ThemeToggle />
    </>
  )
}
