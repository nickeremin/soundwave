import React from "react"
import { type Metadata } from "next"

import MainHeader from "@/widgets/layout/headers/main-header"
import PageContextProvider from "@/widgets/providers/page-context-provider"

export const metadata: Metadata = {
  title: "Album | SoundWave",
}

interface AlbumLayoutProps {
  children?: React.ReactNode
}

function AlbumLayout({ children }: AlbumLayoutProps) {
  return (
    <PageContextProvider>
      <div className="relative">
        <MainHeader />
        <div className="-mt-16">{children}</div>
      </div>
    </PageContextProvider>
  )
}

export default AlbumLayout
