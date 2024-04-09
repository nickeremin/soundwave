import React from "react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Liked Songs | SoundWave",
}

interface CollectionTracksLayoutProps {
  children: React.ReactNode
}

function CollectionTracksLayout({ children }: CollectionTracksLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}

export default CollectionTracksLayout
