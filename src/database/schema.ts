import { relations } from "drizzle-orm"
import { boolean, decimal, pgTable, text } from "drizzle-orm/pg-core"
import { v4 as uuidv4 } from "uuid"

export const playlists = pgTable("playlist", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  user_id: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  duration_ms: decimal("duration_ms").notNull().default("0"),
  total_tracks: decimal("total_tracks").notNull().default("0"),
  image_url: text("image_url"),
  is_favorite: boolean("is_favorite").notNull().default(false),
})

export const playlistRelations = relations(playlists, ({ many }) => ({
  tracks: many(playlistTracks),
}))

export const playlistTracks = pgTable("playlist_track", {
  track_id: text("track_id").notNull().primaryKey(),
  playlist_id: text("playlist_id").notNull(),
})

export const playlistTrackRelations = relations(playlistTracks, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistTracks.playlist_id],
    references: [playlists.id],
  }),
}))

export const favoritePlaylists = pgTable("favorite_playlist", {
  user_id: text("user_id").notNull().primaryKey(),
  total_tracks: decimal("total_tracks").notNull(),
  duration_ms: decimal("duration_ms").notNull(),
})

export const favoriteTracks = pgTable("favorite_track", {
  track_id: text("track_id").notNull().primaryKey(),
  user_id: text("user_id").notNull(),
})

export const followedArtists = pgTable("followed_artist", {
  artist_id: text("artist_id").notNull().primaryKey(),
  user_id: text("user_id").notNull(),
})
