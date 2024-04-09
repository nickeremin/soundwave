import React from "react"
import Link from "next/link"
import { AudioWaveformIcon } from "lucide-react"

import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function RootNotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background-100">
      <div className="flex flex-col items-center p-6">
        <AudioWaveformIcon className="size-12 text-pink" />
        <div className="mb-10 mt-6 flex flex-col items-center">
          <h1 className="text-[3rem] font-bold">Page not found</h1>
          <p className="font-medium text-tertiary">
            We can’t seem to find the page you are looking for.
          </p>
        </div>
        <Link
          href="/"
          className={cn(
            buttonVariants({
              size: "lg",
              className: "rounded-full font-bold",
            })
          )}
        >
          Home
        </Link>
      </div>
    </div>
  )
}

export default RootNotFound
