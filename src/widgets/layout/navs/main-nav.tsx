"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import CreatePlaylistButton from "@/features/playlist/create-playlist-button"
import PlaylistList from "@/entities/playlist/playlist-list"
import { LucideIcon } from "@/shared/components/icons"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

const imageUrl =
  "https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

function MainNav() {
  const pathname = usePathname()
  const { data: playlists } = trpc.playlistRouter.getPlaylists.useQuery()

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
          <li className="flex h-12 items-center justify-between rounded-md px-3">
            <div className="flex items-center gap-3">
              <LucideIcon name="Disc3" strokeWidth={2} className="size-6" />
              Your Library
            </div>
            <CreatePlaylistButton />
          </li>
        </div>
        <li className="flex flex-col">
          {playlists ? <PlaylistList playlists={playlists} /> : null}
        </li>
      </ul>
    </nav>
  )
}

export default MainNav
