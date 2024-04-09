import { favoritePlaylists, playlists } from "@/database/schema"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type FavoritePlaylistObject = InferSelectModel<typeof favoritePlaylists>
export type PlaylistObject = InferSelectModel<typeof playlists>
export type InsertPlaylistObject = InferInsertModel<typeof playlists>
