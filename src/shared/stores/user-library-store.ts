import { create } from "zustand"

export type FilterType = "playlists" | "artists" | undefined

type State = {
  search: string
  filter: FilterType
}

type Action = {
  setSearch: (search: string) => void
  setFilter: (filter: FilterType) => void
}

export const useUserLibraryStore = create<State & Action>((set) => ({
  search: "",
  filter: undefined,
  setSearch: (search) => set(() => ({ search })),
  setFilter: (filter) => set(() => ({ filter })),
}))
