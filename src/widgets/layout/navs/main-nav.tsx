"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { LucideIcon } from "@/shared/components/icons"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { cn } from "@/shared/lib/utils"

function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex h-full flex-col gap-2">
      <ul className="flex flex-col rounded-lg bg-background-100 px-3 py-2">
        <Link href="/" className="w-fit">
          <li className="flex h-12 items-center px-3">
            <PageHeading
              variant="gradient"
              size="logo"
              className="font-extrabold"
            >
              SoundWave
            </PageHeading>
          </li>
        </Link>
        <div className="flex flex-col font-semibold text-tertiary">
          <Link href="/">
            <li
              className={cn(
                "flex h-12 items-center gap-3 rounded-md px-3 transition hover:bg-accent hover:text-primary",
                pathname === "/" && "text-primary"
              )}
            >
              <LucideIcon
                name="AudioLines"
                strokeWidth={2}
                className="size-6"
              />
              Home
            </li>
          </Link>
          <Link href="/search">
            <li
              className={cn(
                "flex h-12 items-center gap-3 rounded-md px-3 transition hover:bg-accent hover:text-primary",
                pathname.includes("/search") && "text-primary"
              )}
            >
              <LucideIcon name="Search" strokeWidth={2} className="size-6" />
              Search
            </li>
          </Link>
        </div>
      </ul>
      <ul className="flex flex-1 flex-col rounded-lg bg-background-100 px-3 py-2">
        <div className="flex flex-col font-semibold text-tertiary">
          <li className="flex h-12 items-center gap-3 rounded-2xl px-3 transition hover:bg-accent hover:text-primary">
            <LucideIcon name="Disc3" strokeWidth={2} className="size-6" />
            Your Library
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default MainNav
