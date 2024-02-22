import React from "react"
import { type Metadata } from "next"

import ArtistHeader from "@/widgets/layout/headers/artist-header"
import PageContextProvider from "@/widgets/providers/page-context-provider"

export const metadata: Metadata = {
  title: "Artist | Soundwave",
}

interface ArtistLayoutProps {
  children: React.ReactNode
}

async function ArtistLayout({ children }: ArtistLayoutProps) {
  return (
    <PageContextProvider>
      <div className="relative">
        <ArtistHeader />
        {children}
      </div>
    </PageContextProvider>
  )
}

export default ArtistLayout
