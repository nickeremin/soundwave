import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import { boolean, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const playlists = pgTable("playlist", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
})

export const playlistTracks = pgTable("playlist_track", {
  trackId: text("track_id").notNull().primaryKey(),
  playlistId: text("playlist_id").notNull(),
})

export const followedArtists = pgTable("followed_artist", {
  artistId: text("artist_id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
})
