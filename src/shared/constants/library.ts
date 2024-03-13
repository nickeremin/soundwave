import { type Variants } from "framer-motion"

import { type LibraryFilter } from "../types/library"

export const libraryFilters: LibraryFilter[] = [
  {
    name: "Playlists",
    type: "playlists",
  },
  {
    name: "Artists",
    type: "artists",
  },
]

export const librarySearhInputVariants: Variants = {
  closed: {
    width: "32px",
    opacity: 0,
  },
  open: {
    width: "180px",
    opacity: 1,
  },
}
