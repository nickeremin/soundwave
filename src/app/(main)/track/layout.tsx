import React from "react"
import { type Metadata } from "next"

import MainHeader from "@/widgets/layout/headers/main-header"

export const metadata: Metadata = {
  title: "Track | Soundwave",
}

interface TrackLayoutProps {
  children: React.ReactNode
}

async function TrackLayout({ children }: TrackLayoutProps) {
  return (
    <div className="">
      <MainHeader />
      {children}
    </div>
  )
}

export default TrackLayout
