import { catchAxiosError } from "@/shared/lib/utils"
import { albumShortSchema } from "@/shared/lib/validations/album"

import { spotifyApiAxios } from "."

export async function getArtistAlbums({
  artistId,
  limit = 10,
  offset = 0,
}: {
  artistId: string
  limit?: number
  offset?: number
}) {
  const { data } = await spotifyApiAxios.get(`/artists/${artistId}/albums`, {
    params: {
      limit,
      offset,
      include_groups: "album,single,compilation",
    },
  })
  const artistAlbums = albumShortSchema.array().parse(data.items)
  return artistAlbums
}
