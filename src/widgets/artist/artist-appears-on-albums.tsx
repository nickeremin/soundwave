"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { useInView } from "react-intersection-observer"

import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface ArtistAppearsOnAlbumsProps {
  artistId: string
  isPreview?: boolean
}

function ArtistAppearsOnAlbums({
  artistId,
  isPreview,
}: ArtistAppearsOnAlbumsProps) {
  const columns = useLayoutStore((state) => state.columnsCount)

  const {
    data: albums,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.artistRouter.getArtistAlbums.useInfiniteQuery(
    { artistId, include_groups: ["appears_on"] },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("fetching...")
      fetchNextPage()
    }
  }, [inView])

  if (albums && albums.pages[0]?.artistAlbums.length == 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex items-baseline font-bold",
          isPreview && "justify-between"
        )}
      >
        {isPreview ? (
          <React.Fragment>
            <Link
              href={`/artist/${artistId}/appears-on`}
              className="text-2xl decoration-2 hover:underline"
            >
              <h2 className="text-2xl">Appears On</h2>
            </Link>
            {albums && albums.pages[0]!.artistAlbums.length > columns && (
              <Link
                href={`/artist/${artistId}/appears-on`}
                className="text-sm text-tertiary hover:underline"
              >
                Show all
              </Link>
            )}
          </React.Fragment>
        ) : (
          <h2 className="text-2xl">Appears On</h2>
        )}
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="-mx-3 grid"
      >
        {albums
          ? isPreview
            ? albums.pages[0]?.artistAlbums
                .slice(0, columns)
                .map((album) => (
                  <AlbumPreviewCard
                    key={album.id}
                    album={album}
                    withReleaseDate
                    withType
                  />
                ))
            : albums.pages.map((page) =>
                page?.artistAlbums.map((album) => (
                  <AlbumPreviewCard
                    key={album.id}
                    album={album}
                    withMainArtist
                  />
                ))
              )
          : Array.from({ length: isPreview ? columns : 20 }, (_, i) => i).map(
              (_, i) => <AlbumPreviewCardLoading key={i} />
            )}
      </div>
      {/* If this component isn't preview fetch next albums when reach end of the list */}
      {!isPreview && <div ref={ref} />}
    </div>
  )
}

export default ArtistAppearsOnAlbums
