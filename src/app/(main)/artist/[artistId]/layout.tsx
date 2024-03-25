import React from "react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Artist | Soundwave",
}

interface ArtistLayoutProps {
  children: React.ReactNode
}

async function ArtistLayout({ children }: ArtistLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}

export default ArtistLayout
