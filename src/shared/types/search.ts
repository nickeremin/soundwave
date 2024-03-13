import { type SimplifiedAlbumObject } from "./album"
import { type ArtistObject } from "./artist"
import { type TrackObject } from "./track"

export type RecentSearchEntity =
  | {
      type: "artist"
      item: ArtistObject
    }
  | {
      type: "album"
      item: SimplifiedAlbumObject
    }
  | {
      type: "track"
      item: TrackObject
    }
