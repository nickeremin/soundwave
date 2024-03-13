"use client"

import React from "react"
import Link from "next/link"
import {
  useLayoutStore,
  useSearchStore,
} from "@/providers/bound-store-provider"
import { XIcon } from "lucide-react"

import AlbumPreviewCard from "@/entities/album/album-preview-card"
import ArtistPreviewCard from "@/entities/artist/artist-preview-card"
import { Button } from "@/shared/components/ui/button"

interface RecentSearchesProps {
  preview?: boolean
}

function RecentSearches({ preview }: RecentSearchesProps) {
  const columns = useLayoutStore((state) => state.columnsCount)
  const recentSearches = useSearchStore((state) => state.recentSearches)
  const clearRecentSearches = useSearchStore(
    (state) => state.clearRecentSearches
  )

  if (recentSearches.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        {preview ? (
          <React.Fragment>
            {recentSearches.length > columns ? (
              <Link
                href="/recent-searches"
                className="select-none decoration-2 hover:underline"
              >
                <h2 className="text-2xl font-bold">Recent searches</h2>
              </Link>
            ) : (
              <h2 className="text-2xl font-bold">Recent searches</h2>
            )}

            {recentSearches.length > columns && (
              <Link
                href="/recent-searches"
                className="select-none text-sm font-bold text-tertiary hover:underline"
              >
                Show all
              </Link>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2 className="text-2xl font-bold">Recent searches</h2>

            <Button
              variant="ghost"
              onClick={clearRecentSearches}
              className="select-none text-sm font-bold text-tertiary"
            >
              Clear recent searches
            </Button>
          </React.Fragment>
        )}
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="grid"
      >
        {recentSearches
          .slice(0, preview ? columns : recentSearches.length)
          .map(({ type, item }, i) => {
            if (type === "artist") {
              return (
                <DeleteFromRecentSearchesWrapper
                  key={i}
                  id={item.id}
                  type="artist"
                >
                  <ArtistPreviewCard key={i} artist={item} />
                </DeleteFromRecentSearchesWrapper>
              )
            } else if (type === "album") {
              return (
                <DeleteFromRecentSearchesWrapper
                  key={i}
                  id={item.id}
                  type="album"
                >
                  <AlbumPreviewCard key={i} album={item} withType />
                </DeleteFromRecentSearchesWrapper>
              )
            } else return null
          })}
      </div>
    </section>
  )
}

interface DeleteFromRecentSearchesWrapperProps {
  children: React.ReactNode
  id: string
  type: "artist" | "album" | "track"
}

function DeleteFromRecentSearchesWrapper({
  children,
  id,
  type,
}: DeleteFromRecentSearchesWrapperProps) {
  const deleteFromRecentSearches = useSearchStore(
    (state) => state.deleteRecentSearch
  )

  return (
    <div className="relative">
      {children}
      <div className="absolute right-2 top-2 z-20 inline-flex size-7 items-center justify-center rounded-full bg-black/60 shadow-md transition-colors hover:bg-accent">
        <Button
          variant="none"
          size="icon"
          className="size-7"
          onClick={() => {
            deleteFromRecentSearches({
              id,
              type,
            })
          }}
        >
          <XIcon className="size-5" />
        </Button>
      </div>
    </div>
  )
}

export default RecentSearches
