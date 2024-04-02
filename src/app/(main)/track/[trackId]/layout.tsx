import React from "react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Track | Soundwave",
}

interface TrackLayoutProps {
  children: React.ReactNode
}

async function TrackLayout({ children }: TrackLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}

export default TrackLayout
