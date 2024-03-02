import React from "react"
import { type Metadata } from "next"

import MainHeader from "@/widgets/layout/headers/main-header"
import PageContextProvider from "@/widgets/providers/page-context-provider"

export const metadata: Metadata = {
  title: "Playlist | Soundwave",
}

interface PlaylistLayoutProps {
  children?: React.ReactNode
}

function PlaylistLayout({ children }: PlaylistLayoutProps) {
  return (
    // <PageContextProvider>
    <div className="relative">
      <MainHeader />
      <div className="">{children}</div>
    </div>
    // </PageContextProvider>
  )
}

export default PlaylistLayout
