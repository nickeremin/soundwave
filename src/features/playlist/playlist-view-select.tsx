"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { AlignJustifyIcon, ListIcon, LucideIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

type PlaylistViewType = "list" | "compact"

type PlaylistView = {
  name: string
  type: PlaylistViewType
  icon: LucideIcon
}

const playlistViews: PlaylistView[] = [
  { name: "Compact", type: "compact", icon: AlignJustifyIcon },
  { name: "List", type: "list", icon: ListIcon },
]

function PlaylistViewSelect() {
  const playlistView = useLayoutStore((state) => state.playlistView)
  const setPlaylistView = useLayoutStore((state) => state.setPlaylistView)

  const Icon = playlistViews.find((view) => view.type == playlistView)!.icon

  return (
    <Select
      value={playlistView}
      onValueChange={(value) => setPlaylistView(value as PlaylistViewType)}
    >
      <SelectTrigger className="gap-2">
        <SelectValue />
        <Icon className="size-5" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel>View as</SelectLabel>
          {playlistViews.map((view) => (
            <SelectItem key={view.type} value={view.type}>
              {view.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default PlaylistViewSelect
