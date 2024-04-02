import React from "react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Album | SoundWave",
}

interface AlbumLayoutProps {
  children?: React.ReactNode
}

function AlbumLayout({ children }: AlbumLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}

export default AlbumLayout
