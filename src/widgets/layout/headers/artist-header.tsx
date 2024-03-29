"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import chroma from "chroma-js"

import { ArtistObject } from "@/shared/types/artist"
import { usePageStore } from "@/widgets/providers/page-context-provider"
import BackForwardButtons from "@/features/nav/back-forward-buttons"
import UserNav from "@/features/nav/user-nav"
import PlayButton from "@/features/player/play-button"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface ArtistHeaderProps {
  artist: ArtistObject
  previewEntry: IntersectionObserverEntry | undefined
}

function ArtistHeader({ artist, previewEntry }: ArtistHeaderProps) {
  const mainContainerRef = useLayoutStore((state) => state.mainContainerRef)
  const { backgroundColor } = usePageStore()

  const headerRef = React.useRef<HTMLDivElement | null>(null)
  const playContainerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleScroll() {
      if (
        !mainContainerRef.current ||
        !previewEntry ||
        !headerRef.current ||
        !playContainerRef.current
      )
        return

      const scrollTop = mainContainerRef.current.scrollTop
      const previewHeight = previewEntry.boundingClientRect.height
      const headerHeight = headerRef.current.getBoundingClientRect().height
      const THRESHOLD = previewHeight - headerHeight * 2

      if (scrollTop >= THRESHOLD) {
        const opacity = Math.min(
          (scrollTop - THRESHOLD) / headerHeight,
          1
        ).toFixed(2)
        headerRef.current.style.setProperty("--header-opacity", opacity)
      } else {
        headerRef.current.style.setProperty("--header-opacity", "0")
      }

      if (scrollTop >= previewHeight - headerHeight) {
        playContainerRef.current.style.opacity = "1"
        headerRef.current.classList.add("shadow-boundary")
      } else {
        playContainerRef.current.style.opacity = "0"
        headerRef.current.classList.remove("shadow-boundary")
      }
    }

    mainContainerRef.current?.addEventListener("scroll", handleScroll)

    return () => {
      mainContainerRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [previewEntry])

  return (
    <header
      ref={headerRef}
      style={
        {
          "--header-opacity": 0,
        } as React.CSSProperties
      }
      className="sticky top-0 z-50 w-full transition-shadow"
    >
      <div
        style={{
          opacity: "var(--header-opacity)",
          backgroundColor: backgroundColor
            ? chroma(backgroundColor.hex).saturate().hex()
            : "transparent",
        }}
        className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60"
      />
      <nav className="relative flex h-16 w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <BackForwardButtons />
          <div
            ref={playContainerRef}
            style={{
              opacity: 0,
            }}
            className="flex items-center gap-2 transition-opacity duration-300"
          >
            <PlayButton className="size-12" />
            <span className="text-2xl font-bold">{artist.name}</span>
          </div>
        </div>
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserNav />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "rounded-full font-semibold",
                })
              )}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({
                  size: "lg",
                  className: "rounded-full font-semibold",
                })
              )}
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>
      </nav>
    </header>
  )
}

export default ArtistHeader
