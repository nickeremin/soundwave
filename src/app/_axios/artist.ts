import { AlbumShort } from "@/shared/types/album"
import { Artist, ArtistShort } from "@/shared/types/artist"
import { Track } from "@/shared/types/track"
import { catchAxiosError } from "@/shared/lib/utils"
import { artistSchema } from "@/shared/lib/validations/artist"

import { spotifyApiAxios } from "."
import { getArtistAlbums } from "./album"

export async function getTrackArtists(track: Track) {
  const trackArtists: {
    artist: Artist
    albums: AlbumShort[]
  }[] = []
  for (const artist of track.artists) {
    const { data } = await spotifyApiAxios.get(`/artists/${artist.id}`)
    const trackArtist = artistSchema.parse(data)
    const artistAlbums = await getArtistAlbums({
      artistId: artist.id,
      limit: 4,
    })
    trackArtists.push({
      artist: trackArtist,
      albums: artistAlbums,
    })
  }
  return trackArtists
}

export async function getRelatedArtists(trackArtists: ArtistShort[]) {
  const mainArtist = trackArtists[0]
  const { data } = await spotifyApiAxios(
    `/artists/${mainArtist!.id}/related-artists`
  )
  const relatedArtists = artistSchema.array().parse(data.artists)
  return relatedArtists
}
