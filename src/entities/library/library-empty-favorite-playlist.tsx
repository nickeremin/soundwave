"use client"

import React from "react"
import Link from "next/link"
import { ListMusic } from "lucide-react"

import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function LibraryEmptyFavoritePlaylist() {
  return (
    <div className="flex h-[40vh] flex-col items-center justify-center gap-4">
      <ListMusic className="size-12" />
      <h1 className="text-[2rem] font-bold">Songs you like will appear here</h1>
      <p className="font-medium">Save songs by tapping the heart icon.</p>
      <Link
        href="/search"
        className={cn(
          buttonVariants({
            size: "lg",
            className: "rounded-full font-bold",
          })
        )}
      >
        Find songs
      </Link>
    </div>
  )
}

export default LibraryEmptyFavoritePlaylist
