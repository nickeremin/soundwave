import React from "react"

import { DiscographyFilterType } from "@/shared/types/artist"
import { trpc } from "@/shared/trpc/client"

export function useDiscographyExistedFilters(artistId: string) {
  const { data: albums } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId,
    include_groups: ["album"],
  })
  const { data: singles } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId,
    include_groups: ["single"],
  })
  const { data: compilations } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId,
    include_groups: ["compilation"],
  })

  const isLoading = !albums || !singles || !compilations

  if (isLoading) return { isLoading, existedFilters: undefined }

  const existedFilters: { [key in DiscographyFilterType]: boolean } = {
    all: true,
    album: albums.artistAlbums.length > 0,
    single: singles.artistAlbums.length > 0,
    compilation: compilations.artistAlbums.length > 0,
  }

  return { isLoading, existedFilters }
}

export default useDiscographyExistedFilters
