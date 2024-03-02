import { create } from "zustand"

type State = {
  isCollapsed: boolean
  columnsCount: number | undefined
}

type Action = {
  toggleIsCollapsed: () => void
  setColumnsCount: (columnsCount: number) => void
}

export const useLayoutStore = create<State & Action>((set) => ({
  isCollapsed: false,
  columnsCount: undefined,
  toggleIsCollapsed: () =>
    set((state) => ({ isCollapsed: !state.isCollapsed })),
  setColumnsCount: (columnsCount) => set(() => ({ columnsCount })),
}))

// if (width < 512) return 2
//   if (width >= 512 && width < 768) return 3
//   if (width >= 768 && width < 1024) return 4
//   if (width >= 1024 && width < 1280) return 5
//   if (width >= 1280 && width < 1400) return 6
//   if (width >= 1400) return 7
