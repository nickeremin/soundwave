"use client"

import React from "react"
import { notFound } from "next/navigation"
import { useLayoutStore } from "@/providers/bound-store-provider"

import { type DiscographyType } from "@/shared/types/artist"
import DiscographyAlbum from "@/widgets/album/discography-album"
import MainFooter from "@/widgets/layout/footers/main-footer"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import ArtistEmptyDiscography from "@/entities/artist/artist-empty-discography"
import { discographyTypes } from "@/shared/constants/artist"
import { trpc } from "@/shared/trpc/client"

interface DiscographyPageProps {
  params: {
    artistId: string
    discographyType: DiscographyType
  }
}

function DiscographyPage({
  params: { artistId, discographyType },
}: DiscographyPageProps) {
  const columns = useLayoutStore((state) => state.columnsCount)
  const discographyLayout = useLayoutStore((state) => state.discographyLayout)

  const { data } = trpc.artistRouter.getArtistAlbums.useInfiniteQuery(
    { artistId, include_groups: [discographyType] },
    {
      enabled: discographyTypes.includes(discographyType),
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )

  if (!discographyTypes.includes(discographyType)) {
    return notFound()
  }

  if (!data) return null

  const isEmpty = data.pages[0]?.artistAlbums.length === 0

  return (
    <React.Fragment>
      <div className="min-h-[calc(100vh-104px)]">
        <main>
          {isEmpty ? (
            <ArtistEmptyDiscography discographyType={discographyType} />
          ) : (
            <React.Fragment>
              {discographyLayout === "list" && (
                <div className="space-y-8 pt-8">
                  {data.pages.map((page) =>
                    page?.artistAlbums.map((album) => (
                      <DiscographyAlbum key={album.id} album={album} />
                    ))
                  )}
                </div>
              )}
              {discographyLayout === "grid" && (
                <div
                  style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  }}
                  className="mx-3 mt-4 grid"
                >
                  {data.pages.map((page) =>
                    page?.artistAlbums.map((album) => (
                      <AlbumPreviewCard key={album.id} album={album} withType />
                    ))
                  )}
                </div>
              )}
            </React.Fragment>
          )}
        </main>
      </div>
      <MainFooter />
    </React.Fragment>
  )
}

export default DiscographyPage
