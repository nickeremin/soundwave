import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import { boolean, numeric, pgTable, text } from "drizzle-orm/pg-core"
import { v4 as uuidv4 } from "uuid"

export const playlists = pgTable("playlist", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  user_id: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  duration_ms: numeric("duration_ms").notNull().default("0"),
  total_tracks: numeric("total_tracks").notNull().default("0"),
  image_url: text("image_url"),
})

export const playlistTracks = pgTable("playlist_track", {
  trackId: text("track_id").notNull().primaryKey(),
  playlistId: text("playlist_id").notNull(),
})

export const followedArtists = pgTable("followed_artist", {
  artistId: text("artist_id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
})
