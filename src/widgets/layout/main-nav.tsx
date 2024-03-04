"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AudioWaveformIcon, HomeIcon, SearchIcon } from "lucide-react"

import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"
import { useLayoutStore } from "@/shared/stores/layout-store"

function MainNav() {
  const pathname = usePathname()
  const isCollapsed = useLayoutStore((state) => state.isCollapsed)

  return (
    <nav className="rounded-lg bg-background-100 px-3 py-2">
      <ul className="flex flex-col">
        <Link href="/" className="w-fit">
          <li className="flex h-12 items-center gap-3 px-3 text-lg font-bold">
            <AudioWaveformIcon className="size-6 text-pink" />
            {!isCollapsed && "SoundWave"}
          </li>
        </Link>
        {isCollapsed ? (
          <Tooltip content="Home" side="right">
            <Link href="/">
              <li
                className={cn(
                  "flex h-12 items-center gap-3 px-3 font-bold text-tertiary transition-colors hover:text-primary",
                  pathname === "/" && "text-primary"
                )}
              >
                <HomeIcon className="size-6" />
              </li>
            </Link>
          </Tooltip>
        ) : (
          <Link href="/">
            <li
              className={cn(
                "flex h-12 items-center gap-3 px-3 font-bold text-tertiary transition-colors hover:text-primary",
                pathname === "/" && "text-primary"
              )}
            >
              <HomeIcon className="size-6" />
              Home
            </li>
          </Link>
        )}

        {isCollapsed ? (
          <Tooltip content="Search" side="right">
            <Link href="/search">
              <li
                className={cn(
                  "flex h-12 items-center gap-3 px-3 font-bold text-tertiary transition-colors hover:text-primary",
                  pathname === "/search" && "text-primary"
                )}
              >
                <SearchIcon className="size-6" />
              </li>
            </Link>
          </Tooltip>
        ) : (
          <Link href="/search">
            <li
              className={cn(
                "flex h-12 items-center gap-3 px-3 font-bold text-tertiary transition-colors hover:text-primary",
                pathname === "/search" && "text-primary"
              )}
            >
              <SearchIcon className="size-6" />
              Search
            </li>
          </Link>
        )}
      </ul>
    </nav>
  )
}

export default MainNav
