"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"

import { cn } from "@/shared/lib/utils"

interface HeaderWrapperProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

function HeaderWrapper({
  children,
  className,
  as: Comp = "header",
}: HeaderWrapperProps) {
  const mainContainerRef = useLayoutStore((state) => state.mainContainerRef)
  const headerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleScroll() {
      if (!mainContainerRef.current) return

      const scrollTop = mainContainerRef.current.scrollTop

      if (scrollTop !== 0) {
        headerRef.current?.classList.add("shadow-boundary")
      } else {
        headerRef.current?.classList.remove("shadow-boundary")
      }
    }

    mainContainerRef.current?.addEventListener("scroll", handleScroll)

    return () => {
      mainContainerRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Comp
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 flex w-full items-center rounded-t-lg bg-background-100/80 backdrop-blur-xl backdrop-saturate-200",
        className
      )}
    >
      {children}
    </Comp>
  )
}

export default HeaderWrapper
