import { playlists } from "@/database/schema"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type SelectPlaylistObject = InferSelectModel<typeof playlists>
export type InsertPlaylistObject = InferInsertModel<typeof playlists>
