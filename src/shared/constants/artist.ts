import { DiscographyFilterType, type DiscographyFilter } from "../types/artist"

export const discographyFilterTypes: DiscographyFilterType[] = [
  "all",
  "album",
  "single",
  "compilation",
]

export const discographyFilters: DiscographyFilter[] = [
  { name: "All", type: "all" },
  { name: "Albums", type: "album" },
  { name: "Single and EPs", type: "single" },
  { name: "Compilations", type: "compilation" },
]
