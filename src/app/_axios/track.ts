import { catchAxiosError } from "@/shared/lib/utils"
import { trackSchema } from "@/shared/lib/validations/track"

import { spotifyApiAxios } from "."

export async function getTrack(trackId: string) {
  const { data } = await spotifyApiAxios.get(`/tracks/${trackId}`)
  const track = trackSchema.parse(data)
  return track
}

export async function getRelatedTracks({
  limit = 5,
  seed_tracks,
  seed_artists,
}: {
  limit?: number
  seed_tracks?: string
  seed_artists?: string
}) {
  const { data } = await spotifyApiAxios.get("/recommendations", {
    params: {
      limit,
      seed_tracks,
      seed_artists,
    },
  })
  const relatedTracks = trackSchema.array().parse(data.tracks)
  return relatedTracks
}
