import { type AlbumShort } from "@/shared/types/album"
import { type Artist } from "@/shared/types/artist"
import { artistSchema } from "@/shared/lib/validations/artist"

import { spotifyApiAxios } from "."
import { getArtistAlbums } from "./album"
import { getTrack } from "./track"

export async function getTrackArtists(trackId: string) {
  const track = await getTrack(trackId)
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

export async function getRelatedArtists(trackId: string) {
  const track = await getTrack(trackId)
  const mainArtist = track.artists[0]
  const { data } = await spotifyApiAxios(
    `/artists/${mainArtist!.id}/related-artists`
  )
  const relatedArtists = artistSchema.array().parse(data.artists)
  return relatedArtists
}
