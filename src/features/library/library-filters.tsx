"use client"

import { useLibraryStore } from "@/providers/bound-store-provider"
import { useLibraryContext } from "@/providers/library-context-provider"
import { XIcon } from "lucide-react"

import LibraryFiltersLoading from "@/entities/library/library-filters-loading"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function LibraryFilters() {
  const currentFilter = useLibraryStore((state) => state.libraryFilter)
  const setLibraryFilter = useLibraryStore((state) => state.setLibraryFilter)

  const { isLoading, totalPlaylists, totalFollowedArtists, totalEntities } =
    useLibraryContext()

  if (isLoading) return <LibraryFiltersLoading />

  if (!isLoading && totalEntities == 0) return null

  return (
    <div className="flex h-12 items-center gap-2 px-4">
      {currentFilter ? (
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted"
          onClick={() => {
            setLibraryFilter(undefined)
          }}
        >
          <XIcon strokeWidth={2} className="size-4" />
        </Button>
      ) : null}
      {totalPlaylists > 0 && (
        <Button
          role="checkbox"
          aria-checked={currentFilter === "playlists"}
          variant="none"
          size="none"
          className={cn(
            "h-8 rounded-full bg-muted px-3 text-sm font-medium hover:bg-accent",
            currentFilter === "playlists" &&
              "bg-primary font-semibold text-gray-dark hover:bg-primary"
          )}
          onClick={() => {
            setLibraryFilter("playlists")
          }}
        >
          Playlists
        </Button>
      )}
      {totalFollowedArtists > 0 && (
        <Button
          role="checkbox"
          aria-checked={currentFilter === "artists"}
          variant="none"
          size="none"
          className={cn(
            "h-8 rounded-full bg-muted px-3 text-sm font-medium hover:bg-accent",
            currentFilter === "artists" &&
              "bg-primary font-semibold text-gray-dark hover:bg-primary"
          )}
          onClick={() => {
            setLibraryFilter("artists")
          }}
        >
          Artists
        </Button>
      )}
    </div>
  )
}

export default LibraryFilters
