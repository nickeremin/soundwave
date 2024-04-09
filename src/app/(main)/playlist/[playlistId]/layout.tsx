import React from "react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Playlist | Soundwave",
}

interface PlaylistLayoutProps {
  children: React.ReactNode
}

function PlaylistLayout({ children }: PlaylistLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}

export default PlaylistLayout
