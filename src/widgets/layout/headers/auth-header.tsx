"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AudioWaveformIcon } from "lucide-react"

import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function AuthHeader() {
  const pathname = usePathname()

  //Based on pathname switch button on sign in or sign up
  const title = String(pathname).includes("signup") ? "Sign In" : "Sign Up"
  const href = String(pathname).includes("signup") ? "/signin" : "/signup"

  return (
    <header className="absolute top-0 z-50 flex h-16 w-full items-center px-6">
      <nav className="flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AudioWaveformIcon className="size-7 text-pink" />
          <span className="text-xl font-bold">SoundWave</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            data-shadcnui-button
            href={href}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "h-10 rounded-full font-extrabold",
              })
            )}
          >
            {title}
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default AuthHeader
