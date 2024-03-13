export type LibraryFilterType = "playlists" | "artists" | undefined

export type LibraryFilter = {
  name: string
  type: LibraryFilterType
}
